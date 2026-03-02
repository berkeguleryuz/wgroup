import Hero from "@/components/wgroup/Hero";
import FrameAnimation from "@/components/wgroup/FrameAnimation";
import About from "@/components/wgroup/About";
import Brands from "@/components/wgroup/Brands";
import CTA from "@/components/wgroup/CTA";

export default function HomePage() {
  return (
    <>
      {/* Dark - Hero with brain visual */}
      <Hero />
      {/* Dark - Scroll-driven frame animation */}
      <FrameAnimation />
      {/* Light - About section (white bg) */}
      <About />
      {/* Light - Brands section */}
      <Brands />
      {/* Light container with dark CTA card */}
      <CTA />
    </>
  );
}
