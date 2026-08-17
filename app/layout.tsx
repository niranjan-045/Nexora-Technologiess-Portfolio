import type { Metadata } from "next";
import { ToastProvider } from "@/lib/ToastProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexoratechnologiess.in"),

  title: {
    default: "Nexora Technologiess | Software Development Company",
    template: "%s | Nexora Technologiess",
  },

  description:
    "Nexora Technologiess is a software development company building custom websites, mobile apps, SaaS products and digital solutions for businesses and startups.",

  keywords: [
    "software development company India",
    "web development company India",
    "mobile app development company India",
    "Flutter app development company",
    "custom software development",
    "software development company Pune",
    "web development company Pune",
    "app development company Pune",
    "software development company Mumbai",
  ],

  authors: [{ name: "Nexora Technologiess" }],
  creator: "Nexora Technologiess",
  publisher: "Nexora Technologiess",

  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },

  openGraph: {
    title: "Nexora Technologiess | Software Development Company",
    description:
      "Custom web, mobile app, SaaS and software development solutions for startups and businesses.",
    url: "https://nexoratechnologiess.in",
    siteName: "Nexora Technologiess",
    images: [
      {
        url: "/assets/logo.png",
        width: 512,
        height: 512,
        alt: "Nexora Technologiess",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Nexora Technologiess | Software Development Company",
    description:
      "Custom web, mobile app, SaaS and software development solutions.",
    images: ["/assets/logo.png"],
  },

  alternates: {
    canonical: "https://nexoratechnologiess.in",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
        />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css"
        />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css"
        />
      </head>

      <body className="font-body antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}