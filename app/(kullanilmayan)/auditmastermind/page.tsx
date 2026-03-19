"use client";

import { useTranslations } from "next-intl";
import ProductLayout from "@/components/layout/ProductLayout";

export default function AuditMastermindPage() {
  const t = useTranslations("auditmastermind");

  return (
    <ProductLayout
      title={t("title")}
      brand={t("brand")}
      category={t("category")}
      contactPricing={t("contactPricing")}
      heroImage="/w/products/auditmastermind.webp"
      description={
        <div className="space-y-6">
          <p className="text-lg text-muted leading-relaxed">{t("p1")}</p>
          <p className="text-lg text-muted leading-relaxed">{t("p2")}</p>
          <p className="text-lg text-muted leading-relaxed">{t("p3")}</p>
        </div>
      }
    />
  );
}
