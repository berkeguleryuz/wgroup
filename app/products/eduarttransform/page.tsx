"use client";

import { useTranslations } from "next-intl";
import ProductLayout from "@/components/layout/ProductLayout";

export default function EduArtTransformPage() {
  const t = useTranslations("eduarttransform");

  return (
    <ProductLayout
      title={t("title")}
      brand={t("brand")}
      category={t("category")}
      contactPricing={t("contactPricing")}
      heroImage="/images/products/eduarttransform.webp"
      description={
        <div className="space-y-6">
          <p className="text-lg text-muted leading-relaxed">{t("p1")}</p>
        </div>
      }
    />
  );
}
