import type {
  Settings,
  Service,
  Skill,
  TechIcon,
  ProcessStep,
  Faq,
  Project,
  Review,
} from "./types";

export const FALLBACK_SETTINGS: Settings = {
  companyName: "Nexora Technologies",
  logoUrl: "/assets/logo.png",
  heroImage: "/assets/logo.png",
  aboutImage: "/assets/about-placeholder.svg",
  heroRoles: [
    "Software Development Studio",
    "Firebase Architecture Experts",
    "UI/UX & Product Design",
  ],
  heroDesc:
    "We design and build beautiful, scalable, high-performance web & mobile products that help ambitious businesses grow.",
  aboutBio:
    "Nexora Technologies is a software studio crafting beautiful, functional, high-performance websites and applications for businesses that refuse to look ordinary.",
  email: "hello@nexoratech.dev",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  address: "Pune, Maharashtra, India",
  socials: { linkedin: "#", github: "#", instagram: "#", youtube: "#" },
};

export const FALLBACK_SERVICES: Service[] = [
  { title: "Website Development", desc: "Modern, responsive websites built with the latest web technologies.", icon: "🌐" },
  { title: "Flutter App Development", desc: "Cross-platform mobile apps with beautiful UI & smooth performance.", icon: "📱" },
  { title: "Firebase Integration", desc: "Secure, scalable backend solutions powered by Firebase.", icon: "🔥" },
  { title: "Admin Dashboards", desc: "Powerful admin panels to manage your business, data and content.", icon: "📊" },
  { title: "API Development", desc: "RESTful APIs and third-party service integrations.", icon: "🔗" },
  { title: "UI/UX Design", desc: "Beautiful, user-friendly and conversion-focused design.", icon: "🎨" },
];

export const FALLBACK_SKILLS: Skill[] = [
  { name: "Flutter", pct: 92 },
  { name: "Firebase", pct: 95 },
  { name: "JavaScript", pct: 90 },
  { name: "React", pct: 88 },
  { name: "Node.js", pct: 85 },
  { name: "MongoDB", pct: 80 },
];

export const FALLBACK_TECH_ICONS: TechIcon[] = [
  { name: "Flutter", icon: "devicon-flutter-plain colored" },
  { name: "Firebase", icon: "devicon-firebase-plain colored" },
  { name: "HTML5", icon: "devicon-html5-plain colored" },
  { name: "CSS3", icon: "devicon-css3-plain colored" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "React", icon: "devicon-react-original colored" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
];

export const FALLBACK_PROCESS: ProcessStep[] = [
  { title: "Consultation", desc: "Understanding your requirements" },
  { title: "Planning", desc: "Strategy and planning" },
  { title: "UI Design", desc: "UI/UX design and prototype" },
  { title: "Development", desc: "Development and implementation" },
  { title: "Testing", desc: "Testing and quality check" },
  { title: "Deployment", desc: "Deployment and support" },
];

export const FALLBACK_FAQ: Faq[] = [
  { q: "What services do you offer?", a: "We offer full-stack website & app development, Flutter mobile apps, Firebase backend architecture, admin dashboards, UI/UX design and AI-powered applications." },
  { q: "How long does a project take?", a: "Timelines vary by scope — a landing page can take 1-2 weeks, while a full product with an admin panel typically takes 4-8 weeks." },
  { q: "Do you provide support after delivery?", a: "Yes, every project includes a support window after launch, and we offer ongoing maintenance plans." },
  { q: "What technologies do you work with?", a: "Flutter, Firebase, React, Node.js, MongoDB and modern JavaScript/HTML/CSS." },
  { q: "How do we get started?", a: "Fill out the contact form or message us on WhatsApp with your project details, and we'll schedule a free consultation." },
];

export const FALLBACK_PORTFOLIO: Project[] = [
  { title: "E-Commerce App", category: "Mobile Apps", description: "A full-featured cross-platform shopping app with cart, payments and order tracking.", image: "/assets/logo.png", tech: ["Flutter", "Firebase"], github: "#", website: "#", featured: true },
  { title: "Task Management", category: "Websites", description: "A collaborative task and project management web application.", image: "/assets/logo.png", tech: ["React", "Node.js"], github: "#", website: "#" },
  { title: "Admin Dashboard", category: "Dashboards", description: "A premium analytics dashboard with charts, CRUD and live data.", image: "/assets/logo.png", tech: ["React", "Firebase"], github: "#", website: "#" },
];

export const FALLBACK_TESTIMONIALS: Review[] = [
  { name: "Rahul Sharma", role: "CEO, TechCorp", rating: 5, message: "Nexora delivered a stunning app that exceeded our expectations. Highly recommended!", approved: true },
  { name: "Priya Patel", role: "Marketing Head", rating: 5, message: "Great communication and outstanding work quality. Will work with them again!", approved: true },
  { name: "Amit Verma", role: "Project Manager", rating: 5, message: "Professional, dedicated and always available for support. Amazing experience!", approved: true },
];
