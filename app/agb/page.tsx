"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import PageLayout from "@/components/layout/PageLayout";

const sections = [
  { titleKey: "scopeTitle", textKey: "scopeText" },
  { titleKey: "contractTitle", textKey: "contractText" },
  { titleKey: "servicesTitle", textKey: "servicesText" },
  { titleKey: "pricesTitle", textKey: "pricesText" },
  { titleKey: "liabilityTitle", textKey: "liabilityText" },
  { titleKey: "dataProtectionTitle", textKey: "dataProtectionText" },
  { titleKey: "finalTitle", textKey: "finalText" },
  { titleKey: "severabilityTitle", textKey: "severabilityText" },
] as const;

export default function AGBPage() {
  const t = useTranslations("agb");
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
        {sections.map((section) => (
          <div key={section.titleKey} className="legal-section page-content-block space-y-2 rounded-2xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
            <h2 className="text-xl font-bold text-foreground">{t(section.titleKey)}</h2>
            <p className="text-lg leading-relaxed text-muted">{t(section.textKey)}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
