"use client";

import { useEffect, useState } from "react";
import {
  db,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "./firebase";
import {
  FALLBACK_SETTINGS,
  FALLBACK_SERVICES,
  FALLBACK_SKILLS,
  FALLBACK_PROCESS,
  FALLBACK_FAQ,
  FALLBACK_PORTFOLIO,
  FALLBACK_TESTIMONIALS,
  FALLBACK_TECH_ICONS,
} from "./fallback-data";
import type { Settings, Service, Skill, ProcessStep, Faq, Project, Review } from "./types";

export interface SiteData {
  settings: Settings;
  services: Service[];
  skills: Skill[];
  process: ProcessStep[];
  faq: Faq[];
  portfolio: Project[];
  testimonials: Review[];
  techIcons: typeof FALLBACK_TECH_ICONS;
  loading: boolean;
}

function withTimeout<T>(promise: Promise<T>, ms: number, fallbackValue: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallbackValue), ms)),
  ]);
}

async function fetchCollectionSafe<T>(name: string, fallback: T[]): Promise<T[]> {
  try {
    const snap = await getDocs(collection(db, name));
    if (snap.empty) return fallback;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as T[];
  } catch (e) {
    console.warn(`Firestore "${name}" unavailable, using fallback.`, e);
    return fallback;
  }
}

async function fetchSettingsSafe(): Promise<Settings> {
  try {
    const snap = await getDoc(doc(db, "settings", "general"));
    if (snap.exists()) return { ...FALLBACK_SETTINGS, ...(snap.data() as Partial<Settings>) };
    return FALLBACK_SETTINGS;
  } catch (e) {
    console.warn("Firestore settings unavailable, using fallback.", e);
    return FALLBACK_SETTINGS;
  }
}

async function fetchTestimonialsSafe(): Promise<Review[]> {
  try {
    const q = query(collection(db, "reviews"), where("approved", "==", true));
    const snap = await getDocs(q);
    if (snap.empty) return FALLBACK_TESTIMONIALS;
    return snap.docs.map((d) => d.data() as Review);
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export function useSiteData(): SiteData {
  const [data, setData] = useState<SiteData>({
    settings: FALLBACK_SETTINGS,
    services: FALLBACK_SERVICES,
    skills: FALLBACK_SKILLS,
    process: FALLBACK_PROCESS,
    faq: FALLBACK_FAQ,
    portfolio: FALLBACK_PORTFOLIO,
    testimonials: FALLBACK_TESTIMONIALS,
    techIcons: FALLBACK_TECH_ICONS,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    const TIMEOUT = 6000;

    (async () => {
      try {
        const [settings, services, skills, portfolio, faq, process_, testimonials] =
          await Promise.all([
            withTimeout(fetchSettingsSafe(), TIMEOUT, FALLBACK_SETTINGS),
            withTimeout(fetchCollectionSafe<Service>("services", FALLBACK_SERVICES), TIMEOUT, FALLBACK_SERVICES),
            withTimeout(fetchCollectionSafe<Skill>("skills", FALLBACK_SKILLS), TIMEOUT, FALLBACK_SKILLS),
            withTimeout(fetchCollectionSafe<Project>("portfolio", FALLBACK_PORTFOLIO), TIMEOUT, FALLBACK_PORTFOLIO),
            withTimeout(fetchCollectionSafe<Faq>("faq", FALLBACK_FAQ), TIMEOUT, FALLBACK_FAQ),
            withTimeout(fetchCollectionSafe<ProcessStep>("process", FALLBACK_PROCESS), TIMEOUT, FALLBACK_PROCESS),
            withTimeout(fetchTestimonialsSafe(), TIMEOUT, FALLBACK_TESTIMONIALS),
          ]);

        if (!cancelled) {
          setData({
            settings,
            services,
            skills,
            portfolio,
            faq,
            process: process_,
            testimonials,
            techIcons: FALLBACK_TECH_ICONS,
            loading: false,
          });
        }
      } catch (err) {
        console.error("Init error — falling back to defaults:", err);
        if (!cancelled) setData((d) => ({ ...d, loading: false }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
