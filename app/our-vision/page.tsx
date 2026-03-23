"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";
import MorphButton from "@/components/ui/MorphButton";

export default function OurVisionPage() {
  const t = useTranslations("career");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vision-intro", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".vision-intro",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".vision-card").forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(".vision-pillars", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".vision-pillars",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".pillar-word").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          delay: 0.15 * i,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".vision-pillars",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = t("p5").split(".");

  return (
    <PageLayout
      title={t("title")}
      subtitle={t("subtitle")}
      eyebrow={t("eyebrow")}
      titleHighlight={t("titleHighlight")}
      heroImage="/w/company/career.webp"
    >
      <div ref={sectionRef}>
        {/* Opening — full width large text */}
        <div className="vision-intro mb-16 text-center">
          <p
            className="text-xl leading-[1.7] sm:text-2xl"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              color: "#2a3444",
              fontWeight: 400,
            }}
          >
            {t("p1")}
          </p>
        </div>

        {/* Content cards — alternating layout */}
        <div className="space-y-8">
          {[t("p2"), t("p3"), t("p4")].map((text, i) => (
            <div
              key={i}
              className={`vision-card flex flex-col gap-6 sm:flex-row sm:gap-10 ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}
            >
              {/* Number side */}
              <div className="flex shrink-0 items-start justify-center sm:w-28">
                <span
                  className="text-[72px] font-black leading-none sm:text-[96px]"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    background: "linear-gradient(135deg, var(--primary), var(--accent-teal))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Text side */}
              <div
                className="flex-1 rounded-2xl p-8 sm:p-10"
                style={{
                  background: "rgba(30, 109, 181, 0.04)",
                  border: "1px solid rgba(30, 109, 181, 0.08)",
                }}
              >
                <div
                  className="mb-5 h-[3px] w-12 rounded-full"
                  style={{
                    background: i % 2 === 0
                      ? "linear-gradient(to right, var(--primary), var(--accent-teal))"
                      : "linear-gradient(to right, var(--accent-teal), var(--primary))",
                  }}
                />
                <p
                  className="text-base leading-[1.9] sm:text-[17px]"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    color: "#3a4a5c",
                  }}
                >
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Three pillars */}
        <div className="vision-pillars mt-20 mb-6">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            {pillars.filter(Boolean).map((word, i) => (
              <div key={i} className="pillar-word flex items-center gap-4 sm:gap-8">
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
                  {word.trim()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Global CTA */}
        <div className="relative mt-16 overflow-hidden rounded-3xl px-8 py-20 sm:px-16 sm:py-24" style={{ background: "#0a0f1e" }}>
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
