export type ProductKey =
  | "operationalExcellence"
  | "wQualityAiAdvisor"
  | "smartOperationalPlatform"
  | "blockchainProducts"
  | "aiContentProduction"
  | "businessflix"
  | "aiSkillPlatform"
  | "talentManagement";

export const productSlugs: Record<ProductKey, string> = {
  operationalExcellence: "integrated-operating-system",
  wQualityAiAdvisor: "ai-quality-process-optimization",
  smartOperationalPlatform: "operational-intelligence-platform",
  blockchainProducts: "blockchain-products",
  aiContentProduction: "corporate-media-engine",
  businessflix: "busyflix",
  aiSkillPlatform: "ai-skill-platform",
  talentManagement: "talent-management",
};

export const productImages: Record<ProductKey, string> = {
  operationalExcellence: "/w-new/n0.webp",
  wQualityAiAdvisor: "/w-new/n1.webp",
  smartOperationalPlatform: "/w-new/n2.webp",
  blockchainProducts: "/w-new/n3.webp",
  aiContentProduction: "/w-new/n4.webp",
  businessflix: "/w-new/n5.webp",
  aiSkillPlatform: "/w-new/n6.webp",
  talentManagement: "/w-new/n8.webp",
};

export const productHeroImages: Record<ProductKey, string> = {
  operationalExcellence: "/w-new/hero-integrated-operating-system.webp",
  wQualityAiAdvisor: "/w-new/hero-ai-quality-process-optimization.webp",
  smartOperationalPlatform: "/w-new/hero-operational-intelligence-platform.webp",
  blockchainProducts: "/w-new/hero-blockchain-products.webp",
  aiContentProduction: "/w-new/hero-corporate-media-engine.webp",
  businessflix: "/w-new/hero-busyflix.webp",
  aiSkillPlatform: "/w-new/hero-ai-skill-platform.webp",
  talentManagement: "/w-new/hero-talent-management.webp",
};

export type Division = "W-DigiLab" | "W-Quality" | "W-Studio";

export const productDivision: Record<ProductKey, Division> = {
  operationalExcellence: "W-Quality",
  wQualityAiAdvisor: "W-Quality",
  smartOperationalPlatform: "W-DigiLab",
  blockchainProducts: "W-DigiLab",
  aiContentProduction: "W-Studio",
  businessflix: "W-Studio",
  aiSkillPlatform: "W-Studio",
  talentManagement: "W-Studio",
};

export const divisionHref: Record<Division, string> = {
  "W-DigiLab": "/w-digilab",
  "W-Quality": "/w-quality",
  "W-Studio": "/w-studio",
};

export const productOrder: ProductKey[] = [
  "operationalExcellence",
  "wQualityAiAdvisor",
  "smartOperationalPlatform",
  "blockchainProducts",
  "aiContentProduction",
  "businessflix",
  "aiSkillPlatform",
  "talentManagement",
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
