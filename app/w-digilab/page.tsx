"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@/components/icons";
import MorphButton from "@/components/ui/MorphButton";

gsap.registerPlugin(ScrollTrigger);

export default function WDigiLabPage() {
  const t = useTranslations("wdigilabPage");
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero text entrance */
      const heroTl = gsap.timeline({ delay: 0.3 });
      heroTl.from(".dv-hero-eyebrow", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" });
      heroTl.from(".dv-hero-title", { y: 60, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.3");
      heroTl.from(".dv-hero-sub", { y: 30, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4");
      heroTl.from(".dv-hero-line", { scaleX: 0, duration: 0.8, ease: "power3.inOut" }, "-=0.3");
      heroTl.from(".dv-hero-intro", { y: 30, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.3");

      /* Scroll sections */
      gsap.utils.toArray<HTMLElement>(".dv-fade").forEach((el) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".dv-cap-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.7, delay: i * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".dv-approach-item").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -40 : 40, opacity: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const capabilities = [t("cap1"), t("cap2"), t("cap3"), t("cap4"), t("cap5")].filter(Boolean);

  return (
    <div ref={pageRef} style={{ background: "var(--background)" }}>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p className="dv-hero-eyebrow mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-primary"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
            {t("eyebrow")}
          </p>
          <h1 className="dv-hero-title mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>{t("title")}</span>
            <span className="text-primary" style={{ fontFamily: "var(--font-instrument), Georgia, serif", fontStyle: "italic", fontWeight: 400 }}>
              {t("titleHighlight")}
            </span>
          </h1>
          <p className="dv-hero-sub mx-auto max-w-2xl text-lg text-white/50 sm:text-xl"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
            {t("subtitle")}
          </p>
          <div className="dv-hero-line mx-auto mt-8 h-[2px] w-20 origin-center bg-primary/60" />
          <p className="dv-hero-intro mx-auto mt-10 max-w-3xl text-base leading-[1.8] text-white/40 sm:text-lg"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
            {t("intro")}
          </p>
        </div>

        {/* Curved transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="block w-full h-[80px]" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
            <path d="M0 0 Q720 80 1440 0 V80 H0 Z" fill="#f7f9fc" />
          </svg>
        </div>
      </section>

      {/* ===== WHAT WE DO ===== */}
      <section className="relative py-28 sm:py-36" style={{ background: "#f7f9fc" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--primary) 0.5px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="dv-fade mb-14 flex items-center gap-4">
            <div className="h-[3px] w-12 rounded-full" style={{ background: "linear-gradient(to right, var(--primary), var(--accent-teal))" }} />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", color: "var(--primary)" }}>
              {t("whatWeDoTitle")}
            </h2>
          </div>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left: large statement */}
            <div className="dv-fade">
              <p className="text-2xl leading-[1.5] sm:text-3xl"
                style={{ fontFamily: "var(--font-instrument), Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "#1e293b" }}>
                {t("whatWeDo1")}
              </p>
            </div>

            {/* Right: detail paragraphs */}
            <div className="dv-fade space-y-6">
              {[t("whatWeDo2"), t("whatWeDo3")].filter(Boolean).map((text, i) => (
                <p key={i} className="text-base leading-[1.9] sm:text-[17px]"
                  style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", color: "#3a4a5c" }}>
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE CAPABILITIES ===== */}
      <section className="relative py-28 sm:py-36" style={{ background: "var(--background)" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
          <div className="absolute -right-20 bottom-20 h-[300px] w-[300px] rounded-full bg-accent-teal/5 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          {/* Section header */}
          <div className="dv-fade mb-16">
            <div className="flex items-center gap-4">
              <div className="h-[3px] w-12 rounded-full" style={{ background: "linear-gradient(to right, var(--primary), var(--accent-teal))" }} />
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
                {t("capTitle")}
              </h2>
            </div>
          </div>

          {/* Bento grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {capabilities.map((cap, i) => {
              // First 2 cards span 3 cols each, last 3 span 2 cols each
              const colSpan = i < 2 ? "lg:col-span-3" : "lg:col-span-2";

              return (
                <div
                  key={i}
                  className={`dv-cap-card group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1 ${colSpan}`}
                  style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Animated gradient border on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "linear-gradient(135deg, rgba(30,109,181,0.1), transparent 40%, rgba(8,145,178,0.08))" }} />


                  <div className="relative z-10 p-8 sm:p-10">
                    {/* Number + indicator */}
                    <div className="mb-6 flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                        style={{
                          fontFamily: "var(--font-barlow), system-ui, sans-serif",
                          background: "linear-gradient(135deg, rgba(30,109,181,0.15), rgba(8,145,178,0.1))",
                          color: "var(--primary)",
                        }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <img
                        src="/wgroup/logo.png"
                        alt=""
                        className="h-7 w-auto opacity-0 transition-all duration-500 group-hover:opacity-20"
                      />
                    </div>

                    {/* Capability text */}
                    <h3 className="text-lg font-semibold leading-snug text-white/90 sm:text-xl"
                      style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
                      {cap}
                    </h3>

                    {/* Bottom decorative line */}
                    <div className="mt-6 h-[1px] w-0 rounded-full transition-all duration-700 group-hover:w-full"
                      style={{ background: "linear-gradient(to right, var(--primary), transparent)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== APPROACH ===== */}
      <section className="relative py-28 sm:py-36" style={{ background: "#f7f9fc" }}>
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="dv-fade mb-14 flex items-center gap-4">
            <div className="h-[3px] w-12 rounded-full" style={{ background: "linear-gradient(to right, var(--primary), var(--accent-teal))" }} />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", color: "var(--primary)" }}>
              {t("approachTitle")}
            </h2>
          </div>

          <div className="space-y-12">
            {[t("approach1"), t("approach2"), t("approach3")].filter(Boolean).map((text, i) => (
              <div key={i} className={`dv-approach-item flex flex-col gap-6 sm:flex-row sm:gap-12 ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}>
                {/* Number accent */}
                <div className="flex shrink-0 items-start sm:w-24">
                  <span className="text-[64px] font-black leading-none sm:text-[80px]"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      background: "linear-gradient(135deg, var(--primary), var(--accent-teal))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      opacity: 0.15,
                    }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Text */}
                <div className="flex-1">
                  <div className="mb-4 h-[2px] w-10 rounded-full"
                    style={{ background: i % 2 === 0 ? "linear-gradient(to right, var(--primary), transparent)" : "linear-gradient(to right, var(--accent-teal), transparent)" }} />
                  <p className="text-lg leading-[1.8] sm:text-xl"
                    style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", color: "#2a3444", fontWeight: 300 }}>
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative pb-28 sm:pb-36" style={{ background: "#f7f9fc" }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--primary) 0.5px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="dv-fade overflow-hidden rounded-3xl px-8 py-20 sm:px-16 sm:py-24" style={{ background: "#0a0f1e" }}>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
                {t("ctaEyebrow")}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
                {t("ctaTitle")}{" "}
                <span className="text-primary" style={{ fontFamily: "var(--font-instrument), Georgia, serif", fontStyle: "italic" }}>
                  {t("ctaHighlight")}
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/50">
                {t("ctaDesc")}
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/contact" className="group">
                  <MorphButton
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-background shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-0.5 sm:text-base"
                    style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", fontWeight: 600 }}
                    fillColor="#0a0f1e" textColor="#0a0f1e" textColorHover="#ffffff"
                  >
                    <span className="flex items-center gap-2">
                      {t("contactCta")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </MorphButton>
                </Link>
                <Link
                  href="/our-divisions"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.12] hover:border-white/30 sm:text-base"
                  style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", fontWeight: 600 }}
                >
                  {t("ctaLearnMore")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
