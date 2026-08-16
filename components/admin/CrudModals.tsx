"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Modal, Field, inputCls } from "./Modal";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useToast } from "@/lib/ToastProvider";
import type { Project, Service, Skill, ProcessStep, Faq } from "@/lib/types";

const CATEGORY_OPTIONS = ["Mobile Apps", "Websites", "Dashboards", "Landing Pages"];

/* ---------------- PROJECT MODAL ---------------- */
export function ProjectModal({
  open,
  onClose,
  editing,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  editing: Project | null;
  onSave: (id: string | null, data: Omit<Project, "id">) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [featured, setFeatured] = useState(false);
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(editing?.title || "");
      setCategory(editing?.category || CATEGORY_OPTIONS[0]);
      setDescription(editing?.description || "");
      setTech((editing?.tech || []).join(", "));
      setFeatured(!!editing?.featured);
      setGithub(editing?.github || "");
      setWebsite(editing?.website || "");
      setImagePreview(editing?.image || "");
      setImageFile(null);
      setVideoFile(null);
    }
  }, [open, editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const imageUrl = imageFile ? await uploadToCloudinary(imageFile, "portfolio") : imagePreview;
      const videoUrl = videoFile ? await uploadToCloudinary(videoFile, "portfolio") : editing?.video || "";
      await onSave(editing?.id || null, {
        title: title.trim(),
        category,
        description: description.trim(),
        tech: tech.split(",").map((t) => t.trim()).filter(Boolean),
        featured,
        github: github.trim(),
        website: website.trim(),
        image: imageUrl || "",
        video: videoUrl || "",
      });
      showToast("Project saved successfully.");
      onClose();
    } catch (err) {
      console.error(err);
      showToast("Error saving project.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit Project" : "Add New Project"}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Project Title">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Category">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Description">
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputCls} min-h-[90px]`} />
          </Field>
        </div>
        <Field label="Technologies (comma separated)">
          <input value={tech} onChange={(e) => setTech(e.target.value)} placeholder="Flutter, Firebase" className={inputCls} />
        </Field>
        <Field label="Featured?">
          <select value={featured ? "true" : "false"} onChange={(e) => setFeatured(e.target.value === "true")} className={inputCls}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </Field>
        <Field label="GitHub Link">
          <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Live Website Link">
          <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} className={inputCls} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Project Image">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setImageFile(f);
                  setImagePreview(URL.createObjectURL(f));
                }
              }}
              className="text-xs"
            />
            {imagePreview && (
              <div className="mt-2.5 h-16 w-16 overflow-hidden rounded-xl bg-surface-2">
                <Image src={imagePreview} alt="" width={64} height={64} className="h-full w-full object-cover" unoptimized />
              </div>
            )}
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Project Video (optional)">
            <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="text-xs" />
          </Field>
        </div>
        <div className="mt-2 flex gap-2.5 sm:col-span-2">
          <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-br from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft disabled:opacity-60">
            {saving ? "Saving…" : "Save Project"}
          </button>
          <button type="button" onClick={onClose} className="rounded-xl border border-border px-6 py-3 text-sm font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* ---------------- SERVICE MODAL ---------------- */
export function ServiceModal({
  open,
  onClose,
  editing,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  editing: Service | null;
  onSave: (id: string | null, data: Omit<Service, "id">) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (open) {
      setIcon(editing?.icon || "");
      setTitle(editing?.title || "");
      setDesc(editing?.desc || "");
    }
  }, [open, editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(editing?.id || null, { icon: icon.trim(), title: title.trim(), desc: desc.trim() });
    showToast("Service saved.");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit Service" : "Add Service"}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <Field label="Icon (emoji)">
          <input required value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="🌐" className={inputCls} />
        </Field>
        <Field label="Title">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Description">
          <textarea required value={desc} onChange={(e) => setDesc(e.target.value)} className={`${inputCls} min-h-[90px]`} />
        </Field>
        <div className="mt-2 flex gap-2.5">
          <button type="submit" className="rounded-xl bg-gradient-to-br from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft">
            Save Service
          </button>
          <button type="button" onClick={onClose} className="rounded-xl border border-border px-6 py-3 text-sm font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* ---------------- SKILL MODAL ---------------- */
export function SkillModal({
  open,
  onClose,
  editing,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  editing: Skill | null;
  onSave: (id: string | null, data: Omit<Skill, "id">) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (open) {
      setName(editing?.name || "");
      setPct(editing?.pct ?? 0);
    }
  }, [open, editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(editing?.id || null, { name: name.trim(), pct: +pct });
    showToast("Skill saved.");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit Skill" : "Add Skill"}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Technology Name">
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Proficiency (%)">
          <input required type="number" min={0} max={100} value={pct} onChange={(e) => setPct(+e.target.value)} className={inputCls} />
        </Field>
        <div className="mt-2 flex gap-2.5 sm:col-span-2">
          <button type="submit" className="rounded-xl bg-gradient-to-br from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft">
            Save Skill
          </button>
          <button type="button" onClick={onClose} className="rounded-xl border border-border px-6 py-3 text-sm font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* ---------------- PROCESS STEP MODAL ---------------- */
export function ProcessModal({
  open,
  onClose,
  editing,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  editing: ProcessStep | null;
  onSave: (id: string | null, data: Omit<ProcessStep, "id">) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(editing?.title || "");
      setDesc(editing?.desc || "");
    }
  }, [open, editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(editing?.id || null, { title: title.trim(), desc: desc.trim() });
    showToast("Step saved.");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit Process Step" : "Add Process Step"}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Title">
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Description">
          <input required value={desc} onChange={(e) => setDesc(e.target.value)} className={inputCls} />
        </Field>
        <div className="mt-2 flex gap-2.5 sm:col-span-2">
          <button type="submit" className="rounded-xl bg-gradient-to-br from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft">
            Save Step
          </button>
          <button type="button" onClick={onClose} className="rounded-xl border border-border px-6 py-3 text-sm font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* ---------------- FAQ MODAL ---------------- */
export function FaqModal({
  open,
  onClose,
  editing,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  editing: Faq | null;
  onSave: (id: string | null, data: Omit<Faq, "id">) => Promise<void>;
}) {
  const { showToast } = useToast();
  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  useEffect(() => {
    if (open) {
      setQ(editing?.q || "");
      setA(editing?.a || "");
    }
  }, [open, editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(editing?.id || null, { q: q.trim(), a: a.trim() });
    showToast("FAQ saved.");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit FAQ" : "Add FAQ"}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <Field label="Question">
          <input required value={q} onChange={(e) => setQ(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Answer">
          <textarea required value={a} onChange={(e) => setA(e.target.value)} className={`${inputCls} min-h-[90px]`} />
        </Field>
        <div className="mt-2 flex gap-2.5">
          <button type="submit" className="rounded-xl bg-gradient-to-br from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft">
            Save FAQ
          </button>
          <button type="button" onClick={onClose} className="rounded-xl border border-border px-6 py-3 text-sm font-semibold">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
