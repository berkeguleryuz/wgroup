import Hero from "@/components/wgroup/Hero";
import About from "@/components/wgroup/About";
import Stats from "@/components/wgroup/Stats";
import Services from "@/components/wgroup/Services";
import Brands from "@/components/wgroup/Brands";
import CTA from "@/components/wgroup/CTA";

export default function HomePage() {
  return (
    <>
      {/* Dark - Hero with brain visual */}
      <Hero />
      {/* Light - About section (white bg) */}
      <About />
      {/* Dark - Stats bar */}
      <Stats />
      {/* Dark - Services section */}
      <Services />
      {/* Light - Brands section */}
      <Brands />
      {/* Light container with dark CTA card */}
      <CTA />
    </>
  );
}
