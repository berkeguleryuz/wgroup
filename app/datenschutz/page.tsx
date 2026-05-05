"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import PageLayout from "@/components/layout/PageLayout";

export default function DatenschutzPage() {
  const t = useTranslations("datenschutz");
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
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("introTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("introText")}</p>
        </div>

        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("responsibleTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("responsibleText")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("responsibleName")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("responsibleAddress")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("responsibleRepresentative")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("responsiblePhone")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("responsibleEmail")}</p>
        </div>

        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("collectionTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("collectionText")}</p>
        </div>

        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("cookiesTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("cookiesText")}</p>
        </div>

        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("contactFormTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("contactFormText")}</p>
        </div>

        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("analyticsTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("analyticsText")}</p>
        </div>

        <div className="legal-section page-content-block space-y-4 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("rightsTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("rightsText")}</p>
          <p className="text-lg font-medium text-foreground">{t("rightsListTitle")}</p>
          <ul className="list-disc space-y-2 pl-6">
            <li className="text-lg leading-relaxed text-muted">{t("rightAccess")}</li>
            <li className="text-lg leading-relaxed text-muted">{t("rightRectification")}</li>
            <li className="text-lg leading-relaxed text-muted">{t("rightDeletion")}</li>
            <li className="text-lg leading-relaxed text-muted">{t("rightRestriction")}</li>
            <li className="text-lg leading-relaxed text-muted">{t("rightPortability")}</li>
            <li className="text-lg leading-relaxed text-muted">{t("rightObjection")}</li>
          </ul>
        </div>

        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("sslTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("sslText")}</p>
        </div>
      </div>
    </PageLayout>
  );
}
