import Image from "next/image";
import type { Settings } from "@/lib/types";

export function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="bg-ink pb-7 pt-16 text-white/70">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <Image
                src={settings.logoUrl}
                alt={settings.companyName}
                width={34}
                height={34}
                className="h-8.5 w-8.5 rounded object-cover brightness-0 invert"
              />
              <span className="font-display text-lg font-bold text-white">{settings.companyName}</span>
            </div>
            <p className="max-w-[280px] text-[13.5px] leading-loose">
              Premium software studio crafting elegant, high-performance digital products.
            </p>
          </div>

          <FooterCol title="Company" links={[["About", "#about"], ["Services", "#services"], ["Portfolio", "#portfolio"], ["Contact", "#contact"]]} />
          <FooterCol title="Services" links={[["Web Development", "#services"], ["Flutter Apps", "#services"], ["Firebase Integration", "#services"], ["UI/UX Design", "#services"]]} />

          <div>
            <h4 className="mb-4.5 text-[14.5px] font-semibold text-white">Get in touch</h4>
            <ul className="flex flex-col gap-3 text-[13.5px]">
              <li>{settings.email}</li>
              <li>{settings.phone}</li>
              <li>{settings.address}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[12.5px]">
          <span>© {new Date().getFullYear()} {settings.companyName}. All rights reserved.</span>
          <span>Crafted with care in India</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-4.5 text-[14.5px] font-semibold text-white">{title}</h4>
      <ul className="flex flex-col gap-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-[13.5px] transition-colors hover:text-primary">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
