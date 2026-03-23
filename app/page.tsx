import dynamic from "next/dynamic";
import Hero from "@/components/wgroup/Hero";

const FrameAnimation = dynamic(
  () => import("@/components/wgroup/FrameAnimation")
);
const About = dynamic(() => import("@/components/wgroup/About"));
const Brands = dynamic(() => import("@/components/wgroup/Brands"));
const CTA = dynamic(() => import("@/components/wgroup/CTA"));

export default function HomePage() {
  return (
    <>
      <Hero />
      <FrameAnimation />
      <About />
      <Brands />
      <CTA />
    </>
  );
}
