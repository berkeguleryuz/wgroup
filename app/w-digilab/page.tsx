"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "@/components/icons";
import MorphButton from "@/components/ui/MorphButton";
import FeatureDefinition from "@/components/layout/FeatureDefinition";

export default function WDigiLabPage() {
  const t = useTranslations("wdigilabPage");
  const tCommon = useTranslations("common");
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero text entrance */
      const heroTl = gsap.timeline({ delay: 0.3 });
      heroTl.from(".dv-hero-title", { y: 60, opacity: 0, duration: 0.9, ease: "power3.out" });
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

      gsap.utils.toArray<HTMLElement>(".dv-approach-block").forEach((el, i) => {
        gsap.from(el, {
          y: 40, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "power2.out",
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
        <div className="absolute inset-0">
          <Image
            src="/w-new/W-Digilab.png"
            alt=""
            fill
            className="object-cover opacity-[0.12]"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-background/70 to-background" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
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
      <FeatureDefinition
        meta={[
          { label: tCommon("focusLabel"), value: t("subtitle"), italic: true },
        ]}
        eyebrow={t("whatWeDoTitle")}
        rightChip={t("eyebrow")}
        lead={t("whatWeDo1")}
        leadCite={t("eyebrow")}
        body={[t("whatWeDo2"), t("whatWeDo3")].filter(Boolean).join(" ")}
      />

      {/* ===== CORE CAPABILITIES ===== */}
      <section className="relative py-28 sm:py-36" style={{ background: "var(--background)" }}>
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="dv-fade mb-16 flex items-center gap-4">
            <div className="h-[3px] w-12 rounded-full" style={{ background: "linear-gradient(to right, var(--primary), var(--accent-teal))" }} />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
              {t("capTitle")}
            </h2>
          </div>

          {/* Vertical list cards with corner brackets */}
          <div className="mx-auto max-w-3xl space-y-6">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="dv-cap-card group relative flex items-center gap-8 px-10 py-8 transition-all duration-400 hover:bg-white/[0.02]"
              >
                {/* Corner brackets */}
                <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/30 transition-colors duration-300 group-hover:border-primary" />
                <span className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-primary/30 transition-colors duration-300 group-hover:border-primary" />
                <span className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-primary/30 transition-colors duration-300 group-hover:border-primary" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/30 transition-colors duration-300 group-hover:border-primary" />

                {/* Number */}
                <span className="shrink-0 text-3xl font-black text-primary/20 transition-colors duration-300 group-hover:text-primary/40"
                  style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Divider */}
                <div className="h-10 w-px shrink-0 bg-white/8 transition-colors duration-300 group-hover:bg-primary/30" />

                {/* Text */}
                <h3 className="flex-1 text-lg font-semibold leading-snug text-white/80 transition-colors duration-300 group-hover:text-white sm:text-xl"
                  style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
                  {cap}
                </h3>

                {/* Logo on hover */}
                <img
                  src="/wgroup/logo.png"
                  alt=""
                  className="h-6 w-auto shrink-0 opacity-0 transition-all duration-500 group-hover:opacity-15"
                />
              </div>
            ))}
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

          <div className="space-y-6">
            {[t("approach1"), t("approach2"), t("approach3")].filter(Boolean).map((text, i) => (
              <div key={i} className="dv-approach-block relative rounded-2xl p-8 sm:p-10"
                style={{
                  background: "linear-gradient(135deg, rgba(30,109,181,0.06), rgba(8,145,178,0.03))",
                  border: "1px solid rgba(30,109,181,0.1)",
                }}
              >
                <div className="flex items-start gap-6">
                  <span className="hidden shrink-0 text-[56px] font-black leading-none sm:block"
                    style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      background: "linear-gradient(135deg, var(--primary), var(--accent-teal))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      opacity: 0.2,
                    }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="flex-1 text-base leading-[1.8] sm:text-lg"
                    style={{
                      fontFamily: "var(--font-geist), system-ui, sans-serif",
                      fontWeight: 400,
                      color: "#2a3444",
                    }}>
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
