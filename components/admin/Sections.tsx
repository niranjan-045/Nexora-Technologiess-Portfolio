"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, Check, Plus } from "lucide-react";
import { useToast } from "@/lib/ToastProvider";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { auth, updatePassword } from "@/lib/firebase";
import type { Project, Service, Skill, ProcessStep, Faq, Review, Settings } from "@/lib/types";

function Topbar({ title, desc, action }: { title: string; desc: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-[22px] font-bold">{title}</h1>
        <p className="text-[13px] text-ink-2">{desc}</p>
      </div>
      {action}
    </div>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="mb-6 rounded-3xl border border-border bg-white p-6 shadow-soft">{children}</div>;
}

function AddBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-primary to-secondary px-5 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
    >
      <Plus size={16} /> {children}
    </button>
  );
}

function IconBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 text-ink-2 transition-colors hover:bg-primary hover:text-white"
    >
      {children}
    </button>
  );
}

function Empty({ colSpan, children }: { colSpan: number; children: React.ReactNode }) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-8 text-center text-ink-2">
        {children}
      </td>
    </tr>
  );
}

/* =================== DASHBOARD HOME =================== */
export function DashboardHome({
  portfolio,
  services,
  reviews,
}: {
  portfolio: Project[];
  services: Service[];
  reviews: Review[];
}) {
  const pending = reviews.filter((r) => !r.approved).length;
  const stats = [
    ["Total Projects", portfolio.length],
    ["Total Services", services.length],
    ["Total Reviews", reviews.length],
    ["Pending Reviews", pending],
  ] as const;

  return (
    <>
      <Topbar title="Welcome back, Admin 👋" desc="Here's what's happening with your website." />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-border bg-white p-5 shadow-soft">
            <b className="font-display text-3xl">{value}</b>
            <span className="mt-1.5 block text-[12.5px] text-ink-2">{label}</span>
          </div>
        ))}
      </div>
      <Panel>
        <h3 className="mb-4 text-[17px] font-bold">Recent Reviews</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-2">
                <th className="py-2.5">Name</th>
                <th className="py-2.5">Rating</th>
                <th className="py-2.5">Message</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 && <Empty colSpan={4}>No reviews yet.</Empty>}
              {reviews.slice(0, 5).map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="py-3">{r.name}</td>
                  <td className="py-3 text-primary">{"★".repeat(r.rating || 5)}</td>
                  <td className="py-3">{(r.message || "").slice(0, 60)}</td>
                  <td className="py-3">
                    <Badge ok={r.approved} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function Badge({ ok, yes = "Approved", no = "Pending" }: { ok: boolean; yes?: string; no?: string }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[11.5px] font-bold ${
        ok ? "bg-green-500/10 text-green-600" : "bg-surface-2 text-ink-2"
      }`}
    >
      {ok ? yes : no}
    </span>
  );
}

/* =================== PORTFOLIO =================== */
export function PortfolioSection({
  portfolio,
  onAdd,
  onEdit,
  onDelete,
}: {
  portfolio: Project[];
  onAdd: () => void;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <Topbar title="Portfolio Management" desc="Add, edit or remove project case studies." action={<AddBtn onClick={onAdd}>Add New Project</AddBtn>} />
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-2">
                <th className="py-2.5">Image</th>
                <th className="py-2.5">Title</th>
                <th className="py-2.5">Category</th>
                <th className="py-2.5">Featured</th>
                <th className="py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.length === 0 && <Empty colSpan={5}>No projects yet — click &quot;Add New Project&quot; to get started.</Empty>}
              {portfolio.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="py-3">
                    {p.image ? (
                      <Image src={p.image} alt="" width={42} height={42} unoptimized className="h-10 w-10 rounded-lg object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-surface-2" />
                    )}
                  </td>
                  <td className="py-3">{p.title}</td>
                  <td className="py-3">{p.category}</td>
                  <td className="py-3">
                    <Badge ok={!!p.featured} yes="Yes" no="No" />
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <IconBtn onClick={() => onEdit(p)}>
                        <Pencil size={14} />
                      </IconBtn>
                      <IconBtn onClick={() => p.id && onDelete(p.id)}>
                        <Trash2 size={14} />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

/* =================== SERVICES =================== */
export function ServicesSection({
  services,
  onAdd,
  onEdit,
  onDelete,
}: {
  services: Service[];
  onAdd: () => void;
  onEdit: (s: Service) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <Topbar title="Services Management" desc="Manage the services shown on your website." action={<AddBtn onClick={onAdd}>Add Service</AddBtn>} />
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-2">
                <th className="py-2.5">Icon</th>
                <th className="py-2.5">Title</th>
                <th className="py-2.5">Description</th>
                <th className="py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 && <Empty colSpan={4}>No services yet.</Empty>}
              {services.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="py-3 text-xl">{s.icon || "✦"}</td>
                  <td className="py-3">{s.title}</td>
                  <td className="py-3">{(s.desc || "").slice(0, 60)}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <IconBtn onClick={() => onEdit(s)}>
                        <Pencil size={14} />
                      </IconBtn>
                      <IconBtn onClick={() => s.id && onDelete(s.id)}>
                        <Trash2 size={14} />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

/* =================== SKILLS =================== */
export function SkillsSection({
  skills,
  onAdd,
  onEdit,
  onDelete,
}: {
  skills: Skill[];
  onAdd: () => void;
  onEdit: (s: Skill) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <Topbar title="Skills" desc="Technologies displayed with progress rings." action={<AddBtn onClick={onAdd}>Add Skill</AddBtn>} />
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-2">
                <th className="py-2.5">Name</th>
                <th className="py-2.5">Proficiency</th>
                <th className="py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.length === 0 && <Empty colSpan={3}>No skills yet.</Empty>}
              {skills.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="py-3">{s.name}</td>
                  <td className="py-3">{s.pct}%</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <IconBtn onClick={() => onEdit(s)}>
                        <Pencil size={14} />
                      </IconBtn>
                      <IconBtn onClick={() => s.id && onDelete(s.id)}>
                        <Trash2 size={14} />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

/* =================== PROCESS =================== */
export function ProcessSection({
  process,
  onAdd,
  onEdit,
  onDelete,
}: {
  process: ProcessStep[];
  onAdd: () => void;
  onEdit: (p: ProcessStep) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <Topbar title="Process Steps" desc="Your working process timeline." action={<AddBtn onClick={onAdd}>Add Step</AddBtn>} />
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-2">
                <th className="py-2.5">#</th>
                <th className="py-2.5">Title</th>
                <th className="py-2.5">Description</th>
                <th className="py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {process.length === 0 && <Empty colSpan={4}>No steps yet.</Empty>}
              {process.map((p, i) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="py-3">{i + 1}</td>
                  <td className="py-3">{p.title}</td>
                  <td className="py-3">{p.desc}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <IconBtn onClick={() => onEdit(p)}>
                        <Pencil size={14} />
                      </IconBtn>
                      <IconBtn onClick={() => p.id && onDelete(p.id)}>
                        <Trash2 size={14} />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

/* =================== FAQ =================== */
export function FaqSection({
  faq,
  onAdd,
  onEdit,
  onDelete,
}: {
  faq: Faq[];
  onAdd: () => void;
  onEdit: (f: Faq) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <Topbar title="FAQ" desc="Frequently asked questions." action={<AddBtn onClick={onAdd}>Add FAQ</AddBtn>} />
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-2">
                <th className="py-2.5">Question</th>
                <th className="py-2.5">Answer</th>
                <th className="py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faq.length === 0 && <Empty colSpan={3}>No FAQs yet.</Empty>}
              {faq.map((f) => (
                <tr key={f.id} className="border-b border-border last:border-0">
                  <td className="py-3">{f.q}</td>
                  <td className="py-3">{(f.a || "").slice(0, 70)}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <IconBtn onClick={() => onEdit(f)}>
                        <Pencil size={14} />
                      </IconBtn>
                      <IconBtn onClick={() => f.id && onDelete(f.id)}>
                        <Trash2 size={14} />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

/* =================== REVIEWS =================== */
export function ReviewsSection({
  reviews,
  onApprove,
  onDelete,
}: {
  reviews: Review[];
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <>
      <Topbar title="Reviews & Testimonials" desc="Approve reviews before they go live on the site." />
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-ink-2">
                <th className="py-2.5">Name</th>
                <th className="py-2.5">Rating</th>
                <th className="py-2.5">Message</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 && <Empty colSpan={5}>No reviews submitted yet.</Empty>}
              {reviews.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="py-3">
                    {r.name}
                    <br />
                    <span className="text-[11.5px] text-ink-2">{r.role}</span>
                  </td>
                  <td className="py-3 text-primary">{"★".repeat(r.rating || 5)}</td>
                  <td className="max-w-[280px] py-3">{(r.message || "").slice(0, 90)}</td>
                  <td className="py-3">
                    <Badge ok={r.approved} />
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      {!r.approved && (
                        <IconBtn onClick={() => r.id && onApprove(r.id)}>
                          <Check size={14} />
                        </IconBtn>
                      )}
                      <IconBtn onClick={() => r.id && onDelete(r.id)}>
                        <Trash2 size={14} />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

/* =================== WEBSITE SETTINGS =================== */
export function SettingsSection({
  settings,
  onSave,
}: {
  settings: Partial<Settings>;
  onSave: (data: Partial<Settings>) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [form, setForm] = useState<Partial<Settings>>({});
  const [files, setFiles] = useState<{ logo?: File; favicon?: File; hero?: File; about?: File }>({});
  const [previews, setPreviews] = useState<{ logo?: string; favicon?: string; hero?: string; about?: string }>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      companyName: settings.companyName || "Nexora Technologies",
      whatsapp: settings.whatsapp || "",
      email: settings.email || "",
      phone: settings.phone || "",
      address: settings.address || "",
      heroDesc: settings.heroDesc || "",
      aboutBio: settings.aboutBio || "",
      heroRoles: settings.heroRoles || [],
      primaryColor: settings.primaryColor || "#FF6B00",
      secondaryColor: settings.secondaryColor || "#FF8C32",
    });
    setPreviews({
      logo: settings.logoUrl,
      favicon: settings.faviconUrl,
      hero: settings.heroImage,
      about: settings.aboutImage,
    });
  }, [settings]);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function pickFile(kind: keyof typeof files, file?: File) {
    if (!file) return;
    setFiles((f) => ({ ...f, [kind]: file }));
    setPreviews((p) => ({ ...p, [kind]: URL.createObjectURL(file) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const logoUrl = files.logo ? await uploadToCloudinary(files.logo, "settings") : settings.logoUrl;
      const faviconUrl = files.favicon ? await uploadToCloudinary(files.favicon, "settings") : settings.faviconUrl;
      const heroImage = files.hero ? await uploadToCloudinary(files.hero, "settings") : settings.heroImage;
      const aboutImage = files.about ? await uploadToCloudinary(files.about, "settings") : settings.aboutImage;

      await onSave({
        ...form,
        logoUrl: logoUrl || "",
        faviconUrl: faviconUrl || "",
        heroImage: heroImage || "",
        aboutImage: aboutImage || "",
      });
      showToast("Settings saved successfully.");
    } catch (err) {
      console.error(err);
      showToast("Error saving settings.");
    } finally {
      setSaving(false);
    }
  }

  const inputCls = "rounded-xl border border-border px-3.5 py-3 text-[13.5px] transition focus:border-primary focus:outline-none";

  return (
    <>
      <Topbar title="Website Settings" desc="Company info, logo, hero content & theme colors." />
      <Panel>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <LabeledInput label="Company Name" value={form.companyName || ""} onChange={(v) => update("companyName", v)} required className={inputCls} />
          <LabeledInput label="WhatsApp Number (with country code, no +)" value={form.whatsapp || ""} onChange={(v) => update("whatsapp", v)} placeholder="919876543210" required className={inputCls} />
          <LabeledInput label="Contact Email" type="email" value={form.email || ""} onChange={(v) => update("email", v)} required className={inputCls} />
          <LabeledInput label="Contact Phone" value={form.phone || ""} onChange={(v) => update("phone", v)} required className={inputCls} />
          <div className="sm:col-span-2">
            <LabeledInput label="Address" value={form.address || ""} onChange={(v) => update("address", v)} className={inputCls} />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-ink-2">Hero Description</label>
            <textarea value={form.heroDesc || ""} onChange={(e) => update("heroDesc", e.target.value)} className={`${inputCls} min-h-[80px]`} />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-ink-2">About Bio</label>
            <textarea value={form.aboutBio || ""} onChange={(e) => update("aboutBio", e.target.value)} className={`${inputCls} min-h-[80px]`} />
          </div>
          <div className="sm:col-span-2">
            <LabeledInput
              label="Hero Rotating Roles (comma separated)"
              value={(form.heroRoles || []).join(", ")}
              onChange={(v) => update("heroRoles", v.split(",").map((r) => r.trim()).filter(Boolean))}
              placeholder="Software Developer, Firebase Expert, UI/UX Designer"
              className={inputCls}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-ink-2">Primary Color</label>
            <input type="color" value={form.primaryColor || "#FF6B00"} onChange={(e) => update("primaryColor", e.target.value)} className="h-11 w-full rounded-xl border border-border" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-ink-2">Secondary Color</label>
            <input type="color" value={form.secondaryColor || "#FF8C32"} onChange={(e) => update("secondaryColor", e.target.value)} className="h-11 w-full rounded-xl border border-border" />
          </div>

          <FileField label="Website Logo" preview={previews.logo} onPick={(f) => pickFile("logo", f)} />
          <FileField label="Favicon" preview={previews.favicon} onPick={(f) => pickFile("favicon", f)} />
          <FileField label="Hero Image" preview={previews.hero} onPick={(f) => pickFile("hero", f)} />
          <FileField label="About Image" preview={previews.about} onPick={(f) => pickFile("about", f)} />

          <div className="sm:col-span-2 mt-2">
            <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-br from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft disabled:opacity-60">
              {saving ? "Saving…" : "Save Settings"}
            </button>
          </div>
        </form>
      </Panel>
    </>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-semibold text-ink-2">{label}</label>
      <input type={type} required={required} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={className} />
    </div>
  );
}

function FileField({ label, preview, onPick }: { label: string; preview?: string; onPick: (f?: File) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-semibold text-ink-2">{label}</label>
      <input type="file" accept="image/*" onChange={(e) => onPick(e.target.files?.[0])} className="text-xs" />
      {preview && (
        <Image src={preview} alt="" width={56} height={56} unoptimized className="mt-1 h-12 w-12 rounded-lg object-cover" />
      )}
    </div>
  );
}

/* =================== SOCIAL LINKS =================== */
export function SocialSection({
  settings,
  onSave,
}: {
  settings: Partial<Settings>;
  onSave: (socials: Settings["socials"]) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [socials, setSocials] = useState<Settings["socials"]>({});

  useEffect(() => {
    setSocials(settings.socials || {});
  }, [settings]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(socials);
    showToast("Social links saved.");
  }

  const inputCls = "rounded-xl border border-border px-3.5 py-3 text-[13.5px] transition focus:border-primary focus:outline-none";

  return (
    <>
      <Topbar title="Social Links" desc="Shown in the footer and contact section." />
      <Panel>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(["linkedin", "github", "instagram", "youtube"] as const).map((key) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-semibold capitalize text-ink-2">{key}</label>
              <input
                type="url"
                value={socials?.[key] || ""}
                onChange={(e) => setSocials((s) => ({ ...s, [key]: e.target.value }))}
                placeholder={`https://${key}.com/...`}
                className={inputCls}
              />
            </div>
          ))}
          <div className="sm:col-span-2 mt-2">
            <button type="submit" className="rounded-xl bg-gradient-to-br from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft">
              Save Links
            </button>
          </div>
        </form>
      </Panel>
    </>
  );
}

/* =================== ADMIN PROFILE =================== */
export function ProfileSection({ email }: { email: string }) {
  const { showToast } = useToast();
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) {
      showToast("Enter a new password to update it.");
      return;
    }
    try {
      if (auth.currentUser) await updatePassword(auth.currentUser, password);
      showToast("Password updated successfully.");
      setPassword("");
    } catch (err) {
      console.error(err);
      showToast("Please log out and back in, then retry (security requirement).");
    }
  }

  const inputCls = "rounded-xl border border-border px-3.5 py-3 text-[13.5px] transition focus:border-primary focus:outline-none";

  return (
    <>
      <Topbar title="Admin Profile" desc="Update your login credentials." />
      <div className="max-w-[480px] rounded-3xl border border-border bg-white p-6 shadow-soft">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-ink-2">Logged in as</label>
            <input disabled value={email} className={`${inputCls} bg-surface-2 text-ink-2`} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12.5px] font-semibold text-ink-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current"
              className={inputCls}
            />
          </div>
          <button type="submit" className="self-start rounded-xl bg-gradient-to-br from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
}
