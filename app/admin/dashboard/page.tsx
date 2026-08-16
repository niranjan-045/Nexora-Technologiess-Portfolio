"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { useAdminData } from "@/lib/useAdminData";
import { auth, signOut } from "@/lib/firebase";
import { Sidebar, SECTIONS, type SectionId } from "@/components/admin/Sidebar";
import {
  DashboardHome,
  PortfolioSection,
  ServicesSection,
  SkillsSection,
  ProcessSection,
  FaqSection,
  ReviewsSection,
  SettingsSection,
  SocialSection,
  ProfileSection,
} from "@/components/admin/Sections";
import { ProjectModal, ServiceModal, SkillModal, ProcessModal, FaqModal } from "@/components/admin/CrudModals";
import type { Project, Service, Skill, ProcessStep, Faq } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const { user, checking } = useAdminAuth(true);
  const data = useAdminData();

  const [section, setSection] = useState<SectionId>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [projectModal, setProjectModal] = useState<{ open: boolean; editing: Project | null }>({ open: false, editing: null });
  const [serviceModal, setServiceModal] = useState<{ open: boolean; editing: Service | null }>({ open: false, editing: null });
  const [skillModal, setSkillModal] = useState<{ open: boolean; editing: Skill | null }>({ open: false, editing: null });
  const [processModal, setProcessModal] = useState<{ open: boolean; editing: ProcessStep | null }>({ open: false, editing: null });
  const [faqModal, setFaqModal] = useState<{ open: boolean; editing: Faq | null }>({ open: false, editing: null });

  async function handleLogout() {
    await signOut(auth);
    router.replace("/admin");
  }

  if (checking || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface text-ink-2">
        Checking access…
      </div>
    );
  }

  const activeLabel = SECTIONS.find((s) => s.id === section)?.label || "";

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar active={section} onSelect={(id) => { setSection(id); setSidebarOpen(false); }} open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />

      <main className="min-w-0 flex-1 px-5 pb-16 pt-6 md:px-9">
        <div className="mb-5 flex items-center gap-3.5 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="rounded-lg border border-border p-2">
            <Menu size={18} />
          </button>
          <b className="text-sm">{activeLabel}</b>
        </div>

        {!data.ready ? (
          <div className="py-24 text-center text-ink-2">Loading dashboard…</div>
        ) : (
          <>
            {section === "dashboard" && (
              <DashboardHome portfolio={data.portfolio} services={data.services} reviews={data.reviews} />
            )}
            {section === "portfolio" && (
              <PortfolioSection
                portfolio={data.portfolio}
                onAdd={() => setProjectModal({ open: true, editing: null })}
                onEdit={(p) => setProjectModal({ open: true, editing: p })}
                onDelete={async (id) => {
                  if (confirm("Delete this project? This cannot be undone.")) await data.deleteProject(id);
                }}
              />
            )}
            {section === "services" && (
              <ServicesSection
                services={data.services}
                onAdd={() => setServiceModal({ open: true, editing: null })}
                onEdit={(s) => setServiceModal({ open: true, editing: s })}
                onDelete={async (id) => {
                  if (confirm("Delete this service?")) await data.deleteService(id);
                }}
              />
            )}
            {section === "skills" && (
              <SkillsSection
                skills={data.skills}
                onAdd={() => setSkillModal({ open: true, editing: null })}
                onEdit={(s) => setSkillModal({ open: true, editing: s })}
                onDelete={async (id) => {
                  if (confirm("Delete this skill?")) await data.deleteSkill(id);
                }}
              />
            )}
            {section === "process" && (
              <ProcessSection
                process={data.process}
                onAdd={() => setProcessModal({ open: true, editing: null })}
                onEdit={(p) => setProcessModal({ open: true, editing: p })}
                onDelete={async (id) => {
                  if (confirm("Delete this step?")) await data.deleteProcessStep(id);
                }}
              />
            )}
            {section === "faq" && (
              <FaqSection
                faq={data.faq}
                onAdd={() => setFaqModal({ open: true, editing: null })}
                onEdit={(f) => setFaqModal({ open: true, editing: f })}
                onDelete={async (id) => {
                  if (confirm("Delete this FAQ?")) await data.deleteFaq(id);
                }}
              />
            )}
            {section === "reviews" && (
              <ReviewsSection
                reviews={data.reviews}
                onApprove={data.approveReview}
                onDelete={async (id) => {
                  if (confirm("Delete this review?")) await data.deleteReview(id);
                }}
              />
            )}
            {section === "settings" && <SettingsSection settings={data.settings} onSave={data.saveSettings} />}
            {section === "social" && <SocialSection settings={data.settings} onSave={data.saveSocial} />}
            {section === "profile" && <ProfileSection email={user.email || ""} />}
          </>
        )}
      </main>

      <ProjectModal
        open={projectModal.open}
        editing={projectModal.editing}
        onClose={() => setProjectModal({ open: false, editing: null })}
        onSave={data.saveProject}
      />
      <ServiceModal
        open={serviceModal.open}
        editing={serviceModal.editing}
        onClose={() => setServiceModal({ open: false, editing: null })}
        onSave={data.saveService}
      />
      <SkillModal
        open={skillModal.open}
        editing={skillModal.editing}
        onClose={() => setSkillModal({ open: false, editing: null })}
        onSave={data.saveSkill}
      />
      <ProcessModal
        open={processModal.open}
        editing={processModal.editing}
        onClose={() => setProcessModal({ open: false, editing: null })}
        onSave={data.saveProcessStep}
      />
      <FaqModal
        open={faqModal.open}
        editing={faqModal.editing}
        onClose={() => setFaqModal({ open: false, editing: null })}
        onSave={data.saveFaq}
      />
    </div>
  );
}
