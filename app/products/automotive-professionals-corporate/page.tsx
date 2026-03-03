"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "@/components/icons";
import gsap from "gsap";
import ProductLayout from "@/components/layout/ProductLayout";

const courses = [
  { key: "wautostart", id: "wautostart" },
  { key: "wautopilot", id: "wautopilot" },
  { key: "wautocore", id: "wautocore" },
  { key: "wautosync", id: "wautosync" },
  { key: "wautoauditpro", id: "wautoauditpro" },
  { key: "wautoeco", id: "wautoeco" },
] as const;

export default function AutomotiveProfessionalsCorporatePage() {
  const t = useTranslations("productsCorporate");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleItem = useCallback((id: string) => {
    setOpenItems((prev) => {
      const isOpen = prev.includes(id);
      const el = contentRefs.current[id];
      if (el) {
        if (isOpen) {
          gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
        } else {
          gsap.set(el, { height: "auto" });
          const h = el.offsetHeight;
          gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.3, ease: "power2.inOut" });
        }
      }
      return isOpen ? prev.filter((i) => i !== id) : [...prev, id];
    });
  }, []);

  return (
    <ProductLayout
      title={t("title")}
      brand="WEdu Factory"
      category={t("category")}
      contactPricing={t("contactPricing")}
      heroImage="/images/products/corporate.webp"
      description={
        <div className="space-y-6">
          <p className="text-lg text-muted leading-relaxed">{t("p1")}</p>
          <p className="text-lg text-muted leading-relaxed">{t("p2")}</p>
          <p className="text-lg text-muted leading-relaxed">{t("p3")}</p>
        </div>
      }
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">{t("productsTitle")}</h2>
        {courses.map((course) => {
          const isOpen = openItems.includes(course.id);
          const hasModules = true;
          return (
            <div
              key={course.id}
              className="bg-card-bg rounded-xl border border-card-border shadow-sm"
            >
              <button
                onClick={() => toggleItem(course.id)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
              >
                <h3 className="font-bold text-lg text-foreground">
                  {t(`${course.key}.title`)}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                ref={(el) => { contentRefs.current[course.id] = el; }}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <div className="px-6 pb-6">
                  <p className="text-muted leading-relaxed mb-4">
                    {t(`${course.key}.description`)}
                  </p>
                  {hasModules && (
                    <>
                      <h4 className="font-medium text-foreground mb-2">
                        {t("modulesTitle")}
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-muted">
                        {(t.raw(`${course.key}.modules`) as string[]).map(
                          (module, idx) => (
                            <li key={idx}>{module}</li>
                          )
                        )}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ProductLayout>
  );
}
