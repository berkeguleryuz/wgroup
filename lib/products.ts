export type ProductKey =
  | "smartOperationalPlatform"
  | "intelligencePerformancePlatform"
  | "blockchainProducts"
  | "systemArchitectureCompliance"
  | "strategicSupplierDevelopment"
  | "strategicPerformanceManagement"
  | "aiContentProduction"
  | "businessflix"
  | "corporateKnowledgeChannels";

export const productSlugs: Record<ProductKey, string> = {
  smartOperationalPlatform: "smart-operational-platform",
  intelligencePerformancePlatform: "intelligence-performance-platform",
  blockchainProducts: "blockchain-products",
  systemArchitectureCompliance: "system-architecture-compliance",
  strategicSupplierDevelopment: "supplier-development",
  strategicPerformanceManagement: "strategic-performance-management",
  aiContentProduction: "ai-content-production",
  businessflix: "businessflix",
  corporateKnowledgeChannels: "corporate-knowledge-channels",
};

export const productImages: Record<ProductKey, string> = {
  smartOperationalPlatform: "/w-new/wn1.png",
  intelligencePerformancePlatform: "/w-new/wn2.png",
  blockchainProducts: "/w-new/wn3.png",
  systemArchitectureCompliance: "/w-new/wn4.png",
  strategicSupplierDevelopment: "/w-new/wn5.png",
  strategicPerformanceManagement: "/w-new/wn6.png",
  aiContentProduction: "/w-new/wn7.png",
  businessflix: "/w-new/wn8.png",
  corporateKnowledgeChannels: "/w-new/wn9.png",
};

export type Division = "W-DigiLab" | "W-Quality" | "W-Studio";

export const productDivision: Record<ProductKey, Division> = {
  smartOperationalPlatform: "W-DigiLab",
  intelligencePerformancePlatform: "W-DigiLab",
  blockchainProducts: "W-DigiLab",
  systemArchitectureCompliance: "W-Quality",
  strategicSupplierDevelopment: "W-Quality",
  strategicPerformanceManagement: "W-Quality",
  aiContentProduction: "W-Studio",
  businessflix: "W-Studio",
  corporateKnowledgeChannels: "W-Studio",
};

export const divisionHref: Record<Division, string> = {
  "W-DigiLab": "/w-digilab",
  "W-Quality": "/w-quality",
  "W-Studio": "/w-studio",
};

export const productOrder: ProductKey[] = [
  "smartOperationalPlatform",
  "intelligencePerformancePlatform",
  "blockchainProducts",
  "systemArchitectureCompliance",
  "strategicSupplierDevelopment",
  "strategicPerformanceManagement",
  "aiContentProduction",
  "businessflix",
  "corporateKnowledgeChannels",
];

export function relatedProducts(key: ProductKey): ProductKey[] {
  const div = productDivision[key];
  return productOrder.filter((k) => productDivision[k] === div && k !== key);
}

export const divisionAccent: Record<Division, { from: string; to: string; solid: string }> = {
  "W-DigiLab": { from: "#6366f1", to: "#0891b2", solid: "#6366f1" },
  "W-Quality": { from: "#1E6DB5", to: "#0891b2", solid: "#1E6DB5" },
  "W-Studio": { from: "#ec4899", to: "#f97316", solid: "#ec4899" },
};
