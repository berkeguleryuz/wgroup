"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";
import MorphButton from "@/components/ui/MorphButton";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Cinematic statement (italic, centered) ---------- */
function StatementBlock({ text }: { text: string }) {
  return (
    <div className="story-statement relative py-16 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="relative z-10 text-center">
        <p
          className="text-xl leading-[1.6] sm:text-2xl lg:text-[28px]"
          style={{
            fontFamily: "var(--font-instrument), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#1e293b",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

/* ---------- Quote block (number + accent line + text) ---------- */
function QuoteBlock({ text, index }: { text: string; index: number }) {
  return (
    <div className="story-quote relative py-10 sm:py-14">
      <div className="flex items-start gap-5 sm:gap-8">
        {/* Large decorative number */}
        <span
          className="hidden shrink-0 text-[80px] font-black leading-none sm:block"
          style={{
            fontFamily: "var(--font-barlow), system-ui, sans-serif",
            background: "linear-gradient(135deg, var(--primary), var(--accent-teal))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: 0.25,
          }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex-1">
          <div
            className="mb-6 h-[3px] w-14 rounded-full"
            style={{
              background:
                index % 2 === 1
                  ? "linear-gradient(to right, var(--primary), transparent)"
                  : "linear-gradient(to right, var(--accent-teal), transparent)",
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
    </div>
  );
}

export default function OurStoryPage() {
  const t = useTranslations("socialResponsibility");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".story-statement").forEach((el) => {
        gsap.from(el.querySelector("p"), {
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".story-quote").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(".story-closing", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".story-closing",
          start: "top 75%",
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
      heroImage="/w/wstory.webp"
    >
      <div ref={sectionRef}>
        {/* P1 — Opening statement */}
        <StatementBlock text={t("p1")} />

        {/* P2 */}
        <QuoteBlock text={t("p2")} index={1} />

        {/* P3 */}
        <QuoteBlock text={t("p3")} index={2} />

        {/* P4 — Founders highlight */}
        <StatementBlock text={t("p4")} />

        {/* P5 */}
        <QuoteBlock text={t("p5")} index={3} />

        {/* P6 */}
        <QuoteBlock text={t("p6")} index={4} />

        {/* P7 — Closing cinematic */}
        <div className="story-closing relative mt-10 overflow-hidden rounded-2xl px-8 py-14 text-center sm:px-12 sm:py-20"
          style={{
            background: "linear-gradient(135deg, #1E6DB5, #0891b2)",
          }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/8 blur-2xl" />
          <p
            className="relative z-10 text-xl leading-[1.6] text-white sm:text-2xl lg:text-3xl"
            style={{
              fontFamily: "var(--font-instrument), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            {t("p7")}
          </p>
        </div>

        {/* Global CTA */}
        <div className="story-cta relative mt-14 overflow-hidden rounded-3xl px-8 py-20 sm:px-16 sm:py-24" style={{ background: "#0a0f1e" }}>
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
