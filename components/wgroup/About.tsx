"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Lightbulb, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Target,
    title: "Quality Management",
    description:
      "We help automotive companies implement world-class quality management systems that meet and exceed industry standards.",
    color: "#1E6DB5",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Driving digital transformation through cutting-edge solutions tailored to the automotive sector.",
    color: "#6366f1",
  },
  {
    icon: TrendingUp,
    title: "Excellence",
    description:
      "Transforming knowledge into measurable results with proven methodologies and expert guidance.",
    color: "#0891b2",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-text", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-image-wrapper", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-image-wrapper",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".pillar-card", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".pillar-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="about-heading mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            About WGroup
          </p>
          <h2
            className="about-heading text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            The Art of Transforming{" "}
            <span
              className="text-primary"
              style={{
                fontFamily: "var(--font-instrument), Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Knowledge
            </span>
          </h2>
          <p className="about-text mt-6 text-lg leading-relaxed text-gray-600">
            WGroup GmbH is a leading consultancy specializing in innovation,
            quality management, and digital transformation within the automotive
            industry. We bridge the gap between knowledge and excellence.
          </p>
        </div>

        {/* Image + content split */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="about-image-wrapper relative overflow-hidden rounded-3xl">
            <Image
              src="/images/company/company-team.webp"
              alt="WGroup team"
              width={640}
              height={440}
              className="h-auto w-full object-cover"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10" />
          </div>

          <div>
            <p className="about-text text-base leading-relaxed text-gray-600">
              With deep expertise in automotive standards including IATF 16949,
              VDA, and ASPICE, we deliver comprehensive training programs,
              consulting services, and digital tools that empower organizations
              to achieve operational excellence.
            </p>
            <p className="about-text mt-4 text-base leading-relaxed text-gray-600">
              Our mission is to be the bridge between traditional automotive
              expertise and the digital future, creating lasting value for our
              clients across the global automotive supply chain.
            </p>
          </div>
        </div>

        {/* Pillar cards */}
        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="pillar-card group rounded-2xl border border-gray-100 bg-gray-50/50 p-8 transition-all duration-300 hover:border-gray-200 hover:shadow-lg"
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${pillar.color}15` }}
              >
                <pillar.icon
                  className="h-6 w-6"
                  style={{ color: pillar.color }}
                />
              </div>
              <h3
                className="mb-3 text-lg font-bold text-gray-900"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                }}
              >
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
