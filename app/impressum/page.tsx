"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import PageLayout from "@/components/layout/PageLayout";

export default function ImpressumPage() {
  const t = useTranslations("impressum");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".legal-section", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".legal-section",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageLayout title={t("title")} subtitle={t("subtitle")} eyebrow={t("eyebrow")}>
      <div ref={sectionRef} className="space-y-10">
        {/* Company Info */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("companyTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("companyName")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("companyAddress")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("companyCountry")}</p>
        </div>

        {/* Representative */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("representativeTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("representativeName")}</p>
        </div>

        {/* Contact */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("contactTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("contactPhone")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("contactEmail")}</p>
        </div>

        {/* Register */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("registerTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("registerCourt")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("registerNumber")}</p>
        </div>

        {/* VAT */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("vatTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("vatDescription")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("vatNumber")}</p>
        </div>

        {/* Responsible for content */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("responsibleTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("responsibleName")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("responsibleAddress")}</p>
        </div>

        {/* Disclaimer */}
        <div className="legal-section page-content-block space-y-6 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("disclaimerTitle")}</h2>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">{t("disclaimerContentTitle")}</h3>
            <p className="text-lg leading-relaxed text-muted">{t("disclaimerContentText")}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">{t("disclaimerLinksTitle")}</h3>
            <p className="text-lg leading-relaxed text-muted">{t("disclaimerLinksText")}</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("copyrightTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("copyrightText")}</p>
        </div>
      </div>
    </PageLayout>
  );
}
