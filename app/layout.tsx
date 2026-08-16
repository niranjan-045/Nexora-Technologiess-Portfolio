import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/lib/ToastProvider";

// Fonts are loaded via a <link> tag below instead of next/font/google, since
// next/font needs build-time access to fonts.googleapis.com which may be
// blocked in some hosting/sandbox network setups. Swap to next/font freely
// once deployed somewhere with open network access.

export const metadata: Metadata = {
  title: "Nexora Technologies — Software Development Studio",
  description:
    "Nexora Technologies builds premium web, mobile & Firebase-powered digital products.",
  icons: { icon: "/assets/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/devicon.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css" />
      </head>
      <body className="font-body antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
