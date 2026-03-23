"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import PageLayout from "@/components/layout/PageLayout";

export default function CookiePolicyPage() {
  const t = useTranslations("cookiePolicy");
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
        {/* What are cookies */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("whatTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("whatText")}</p>
        </div>

        {/* Which cookies */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("whichTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("whichText")}</p>
        </div>

        {/* Necessary cookies */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h3 className="text-lg font-semibold text-foreground">{t("necessaryTitle")}</h3>
          <p className="text-lg leading-relaxed text-muted">{t("necessaryText")}</p>
        </div>

        {/* Analytics cookies */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h3 className="text-lg font-semibold text-foreground">{t("analyticsTitle")}</h3>
          <p className="text-lg leading-relaxed text-muted">{t("analyticsText")}</p>
        </div>

        {/* Managing cookies */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("manageTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("manageText")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("manageBrowsers")}</p>
        </div>

        {/* Contact */}
        <div className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
          <h2 className="text-xl font-bold text-foreground">{t("contactTitle")}</h2>
          <p className="text-lg leading-relaxed text-muted">{t("contactText")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("contactEmail")}</p>
          <p className="text-lg leading-relaxed text-muted">{t("contactPhone")}</p>
        </div>
      </div>
    </PageLayout>
  );
}
