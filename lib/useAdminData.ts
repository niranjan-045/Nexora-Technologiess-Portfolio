"use client";

import { useCallback, useEffect, useState } from "react";
import {
  db,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from "./firebase";
import type { Project, Service, Skill, ProcessStep, Faq, Review, Settings } from "./types";

export function useAdminData() {
  const [portfolio, setPortfolio] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [process, setProcessSteps] = useState<ProcessStep[]>([]);
  const [faq, setFaq] = useState<Faq[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [settings, setSettings] = useState<Partial<Settings>>({});
  const [ready, setReady] = useState(false);

  const loadPortfolio = useCallback(async () => {
    const snap = await getDocs(collection(db, "portfolio"));
    setPortfolio(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Project[]);
  }, []);
  const loadServices = useCallback(async () => {
    const snap = await getDocs(collection(db, "services"));
    setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Service[]);
  }, []);
  const loadSkills = useCallback(async () => {
    const snap = await getDocs(collection(db, "skills"));
    setSkills(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Skill[]);
  }, []);
  const loadProcess = useCallback(async () => {
    const snap = await getDocs(collection(db, "process"));
    setProcessSteps(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as ProcessStep[]);
  }, []);
  const loadFaq = useCallback(async () => {
    const snap = await getDocs(collection(db, "faq"));
    setFaq(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Faq[]);
  }, []);
  const loadReviews = useCallback(async () => {
    const snap = await getDocs(collection(db, "reviews"));
    setReviews(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Review[]);
  }, []);
  const loadSettings = useCallback(async () => {
    const snap = await getDoc(doc(db, "settings", "general"));
    setSettings(snap.exists() ? (snap.data() as Partial<Settings>) : {});
  }, []);

  const loadAll = useCallback(async () => {
    await Promise.all([
      loadPortfolio(),
      loadServices(),
      loadSkills(),
      loadProcess(),
      loadFaq(),
      loadReviews(),
      loadSettings(),
    ]);
    setReady(true);
  }, [loadPortfolio, loadServices, loadSkills, loadProcess, loadFaq, loadReviews, loadSettings]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // ---- Portfolio CRUD ----
  async function saveProject(id: string | null, data: Omit<Project, "id">) {
    if (id) await updateDoc(doc(db, "portfolio", id), { ...data, updatedAt: serverTimestamp() });
    else await addDoc(collection(db, "portfolio"), { ...data, createdAt: serverTimestamp() });
    await loadPortfolio();
  }
  async function deleteProject(id: string) {
    await deleteDoc(doc(db, "portfolio", id));
    await loadPortfolio();
  }

  // ---- Services CRUD ----
  async function saveService(id: string | null, data: Omit<Service, "id">) {
    if (id) await updateDoc(doc(db, "services", id), data);
    else await addDoc(collection(db, "services"), data);
    await loadServices();
  }
  async function deleteService(id: string) {
    await deleteDoc(doc(db, "services", id));
    await loadServices();
  }

  // ---- Skills CRUD ----
  async function saveSkill(id: string | null, data: Omit<Skill, "id">) {
    if (id) await updateDoc(doc(db, "skills", id), data);
    else await addDoc(collection(db, "skills"), data);
    await loadSkills();
  }
  async function deleteSkill(id: string) {
    await deleteDoc(doc(db, "skills", id));
    await loadSkills();
  }

  // ---- Process CRUD ----
  async function saveProcessStep(id: string | null, data: Omit<ProcessStep, "id">) {
    if (id) await updateDoc(doc(db, "process", id), data);
    else await addDoc(collection(db, "process"), data);
    await loadProcess();
  }
  async function deleteProcessStep(id: string) {
    await deleteDoc(doc(db, "process", id));
    await loadProcess();
  }

  // ---- FAQ CRUD ----
  async function saveFaq(id: string | null, data: Omit<Faq, "id">) {
    if (id) await updateDoc(doc(db, "faq", id), data);
    else await addDoc(collection(db, "faq"), data);
    await loadFaq();
  }
  async function deleteFaq(id: string) {
    await deleteDoc(doc(db, "faq", id));
    await loadFaq();
  }

  // ---- Reviews ----
  async function approveReview(id: string) {
    await updateDoc(doc(db, "reviews", id), { approved: true });
    await loadReviews();
  }
  async function deleteReview(id: string) {
    await deleteDoc(doc(db, "reviews", id));
    await loadReviews();
  }

  // ---- Settings ----
  async function saveSettings(data: Partial<Settings>) {
    await setDoc(doc(db, "settings", "general"), { ...data, updatedAt: serverTimestamp() }, { merge: true });
    await loadSettings();
  }
  async function saveSocial(socials: Settings["socials"]) {
    await setDoc(doc(db, "settings", "general"), { socials }, { merge: true });
    await loadSettings();
  }

  return {
    ready,
    portfolio,
    services,
    skills,
    process,
    faq,
    reviews,
    settings,
    saveProject,
    deleteProject,
    saveService,
    deleteService,
    saveSkill,
    deleteSkill,
    saveProcessStep,
    deleteProcessStep,
    saveFaq,
    deleteFaq,
    approveReview,
    deleteReview,
    saveSettings,
    saveSocial,
  };
}
