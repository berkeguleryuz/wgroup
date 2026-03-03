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

export default function CareerPage() {
  const t = useTranslations("career");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".career-paragraph", {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".career-paragraph",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".career-cta", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".career-cta",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout title={t("title")} subtitle={t("subtitle")} eyebrow={t("eyebrow")} titleHighlight={t("titleHighlight")} heroImage="/images/company/career.webp">
      <div ref={sectionRef}>
        <div className="space-y-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <p key={i} className="career-paragraph text-lg leading-relaxed text-muted">
              {t(`p${i}`)}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div className="career-cta relative mt-14 overflow-hidden rounded-3xl px-8 py-20 sm:px-16 sm:py-24" style={{ background: "#0a0f1e" }}>
          {/* Background blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="cta-blob absolute -left-20 top-0 h-[300px] w-[300px] rounded-full bg-primary/15 blur-[100px]" />
            <div className="cta-blob absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent-purple/10 blur-[120px]" />
          </div>

          {/* Mesh */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Content */}
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
