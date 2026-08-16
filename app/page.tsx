"use client";

import { useSiteData } from "@/lib/useSiteData";
import { Preloader } from "@/components/site/Preloader";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Trusted } from "@/components/site/Trusted";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Skills } from "@/components/site/Skills";
import { Portfolio } from "@/components/site/Portfolio";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsappFloat } from "@/components/site/WhatsappFloat";
import { CursorGlow } from "@/components/site/CursorGlow";

export default function HomePage() {
  const data = useSiteData();

  return (
    <>
      <Preloader hide={!data.loading} />
      <CursorGlow />
      <Navbar companyName={data.settings.companyName} logoUrl={data.settings.logoUrl} />
      <main>
        <Hero settings={data.settings} techIcons={data.techIcons} />
        <Trusted techIcons={data.techIcons} />
        <About settings={data.settings} />
        <Services services={data.services} />
        <Skills skills={data.skills} />
        <Portfolio portfolio={data.portfolio} />
        <Process process={data.process} />
        <Testimonials testimonials={data.testimonials} />
        <Faq faq={data.faq} />
        <Contact settings={data.settings} />
      </main>
      <Footer settings={data.settings} />
      <WhatsappFloat whatsapp={data.settings.whatsapp} />
    </>
  );
}
