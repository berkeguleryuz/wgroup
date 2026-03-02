"use client";

import { useTranslations } from "next-intl";
import ProductLayout from "@/components/layout/ProductLayout";

export default function AutoPathWayNavigatorPage() {
  const t = useTranslations("autopathwayNavigator");

  return (
    <ProductLayout
      title={t("title")}
      brand={t("brand")}
      category={t("category")}
      contactPricing={t("contactPricing")}
      heroImage="/images/products/autopathway-navigator.webp"
      description={
        <div className="space-y-6">
          <p className="text-lg text-muted leading-relaxed">{t("p1")}</p>
        </div>
      }
    />
  );
}
