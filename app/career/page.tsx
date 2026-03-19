"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";
import MorphButton from "@/components/ui/MorphButton";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  { titleKey: "pillar1Title", descKey: "pillar1Desc", icon: "01" },
  { titleKey: "pillar2Title", descKey: "pillar2Desc", icon: "02" },
  { titleKey: "pillar3Title", descKey: "pillar3Desc", icon: "03" },
] as const;

export default function CareerPage() {
  const t = useTranslations("careers");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".career-intro", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".career-intro",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".pillar-card").forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(".career-who", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".career-who",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".career-open", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".career-open",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout
      title={t("title")}
      subtitle={t("subtitle")}
      eyebrow={t("eyebrow")}
      titleHighlight={t("titleHighlight")}
      heroImage="/w/company/career.webp"
    >
      <div ref={sectionRef}>
        {/* Intro */}
        <div className="career-intro mb-16 text-center">
          <p
            className="text-xl leading-[1.7] sm:text-2xl"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              color: "#2a3444",
              fontWeight: 400,
            }}
          >
            {t("intro")}
          </p>
        </div>

        {/* Why WGroup — 3 pillars */}
        <div className="mb-16">
          <h2
            className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              color: "#1e293b",
            }}
          >
            {t("whyTitle")}
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {PILLARS.map(({ titleKey, descKey, icon }, i) => (
              <div
                key={i}
                className="pillar-card relative overflow-hidden rounded-2xl p-8"
                style={{
                  background: "rgba(30, 109, 181, 0.04)",
                  border: "1px solid rgba(30, 109, 181, 0.08)",
                }}
              >
                {/* Background number */}
                <span
                  className="pointer-events-none absolute -right-2 -top-4 text-[100px] font-black leading-none"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    background: "linear-gradient(135deg, var(--primary), var(--accent-teal))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    opacity: 0.08,
                  }}
                >
                  {icon}
                </span>

                <div
                  className="mb-5 h-[3px] w-10 rounded-full"
                  style={{
                    background: "linear-gradient(to right, var(--primary), var(--accent-teal))",
                  }}
                />
                <h3
                  className="mb-3 text-lg font-bold"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    color: "#1e293b",
                  }}
                >
                  {t(titleKey)}
                </h3>
                <p
                  className="text-[15px] leading-relaxed"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    color: "#3a4a5c",
                  }}
                >
                  {t(descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Are Looking For */}
        <div className="career-who mb-16">
          <div className="relative overflow-hidden rounded-2xl p-8 sm:p-12">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <h2
              className="mb-6 text-xl font-bold sm:text-2xl"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                color: "#1e293b",
              }}
            >
              {t("whoTitle")}
            </h2>
            <p
              className="text-base leading-[1.9] sm:text-[17px]"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                color: "#3a4a5c",
              }}
            >
              {t("whoDesc")}
            </p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="career-open mb-6">
          <div
            className="overflow-hidden rounded-2xl p-8 sm:p-12"
            style={{
              background: "linear-gradient(135deg, #1E6DB5, #0891b2)",
            }}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <h2
              className="mb-4 text-xl font-bold text-white sm:text-2xl"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
            >
              {t("openTitle")}
            </h2>
            <p
              className="text-base leading-relaxed text-white/80 sm:text-[17px]"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
            >
              {t("openDesc")}
            </p>
            <a
              href={`mailto:${t("contactEmail")}`}
              className="mt-4 inline-block text-lg font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
            >
              {t("contactEmail")}
            </a>
          </div>
        </div>

        {/* Three pillars */}
        <div className="mt-16 mb-6">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            {[t("pillar1Title"), t("pillar2Title"), t("pillar3Title")].map((word, i) => (
              <div key={i} className="flex items-center gap-4 sm:gap-8">
                {i > 0 && (
                  <div
                    className="hidden h-12 w-px sm:block"
                    style={{ background: "linear-gradient(to bottom, transparent, var(--primary), transparent)" }}
                  />
                )}
                <span
                  className="inline-block pb-1 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    background: "linear-gradient(135deg, var(--primary), var(--accent-teal))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Global CTA */}
        <div className="relative mt-14 overflow-hidden rounded-3xl px-8 py-20 sm:px-16 sm:py-24" style={{ background: "#0a0f1e" }}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-[300px] w-[300px] rounded-full bg-primary/15 blur-[100px]" />
            <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent-purple/10 blur-[120px]" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <p
              className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
            >
              {t("ctaEyebrow")}
            </p>
            <h2
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
            >
              {t("ctaTitle")}{" "}
              <span
                className="text-primary"
                style={{ fontFamily: "var(--font-instrument), Georgia, serif", fontStyle: "italic" }}
              >
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
                  fillColor="#0a0f1e"
                  textColor="#0a0f1e"
                  textColorHover="#ffffff"
                >
                  <span className="flex items-center gap-2">
                    {t("contactCta")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </MorphButton>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.12] hover:border-white/30 sm:text-base"
                style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", fontWeight: 600 }}
              >
                {t("ctaLearnMore")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
