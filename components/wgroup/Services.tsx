"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  Shield,
  Cpu,
  Users,
  BookOpen,
  BarChart3,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: GraduationCap,
    title: "Training & Education",
    description:
      "Professional development programs for automotive industry experts, from individual courses to corporate training packages.",
    color: "#1E6DB5",
  },
  {
    icon: Shield,
    title: "Quality Consulting",
    description:
      "IATF 16949, VDA, ASPICE consulting and audit preparation to ensure your organization meets the highest standards.",
    color: "#0891b2",
  },
  {
    icon: Cpu,
    title: "Digital Transformation",
    description:
      "Custom digital solutions that modernize automotive processes and drive efficiency through technology.",
    color: "#6366f1",
  },
  {
    icon: Users,
    title: "Corporate Programs",
    description:
      "Tailored corporate training and consulting packages designed for automotive suppliers and OEMs.",
    color: "#f59e0b",
  },
  {
    icon: BookOpen,
    title: "Knowledge Management",
    description:
      "Systems and methodologies to capture, organize, and leverage organizational knowledge effectively.",
    color: "#10b981",
  },
  {
    icon: BarChart3,
    title: "Process Optimization",
    description:
      "Data-driven approaches to optimize manufacturing and business processes across the value chain.",
    color: "#ef4444",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".service-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".service-card",
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
      className="relative overflow-hidden bg-[#0a0f1e] py-24 sm:py-32"
    >
      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="services-heading mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            What We Do
          </p>
          <h2
            className="services-heading text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            Comprehensive{" "}
            <span
              className="text-primary"
              style={{
                fontFamily: "var(--font-instrument), Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Solutions
            </span>
          </h2>
          <p className="services-heading mt-6 text-lg leading-relaxed text-white/50">
            From training and consulting to digital tools, we provide
            end-to-end solutions for the automotive industry.
          </p>
        </div>

        {/* Service cards */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${service.color}15, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <service.icon
                    className="h-5 w-5"
                    style={{ color: service.color }}
                  />
                </div>
                <h3
                  className="mb-3 text-base font-bold text-white"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/45">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
