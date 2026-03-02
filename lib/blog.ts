export interface BlogArticle {
  slug: string;
  translationKey: string;
  category: string;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "iatf16949-modern-approaches",
    translationKey: "iatf16949-modern-approaches",
    category: "knowledge",
  },
  {
    slug: "secrets-of-digitization",
    translationKey: "secrets-of-digitization",
    category: "digitalization",
  },
  {
    slug: "electric-transformation",
    translationKey: "electric-transformation",
    category: "qualityManagement",
  },
  {
    slug: "iatf16949-ev-manufacturing",
    translationKey: "iatf16949-ev-manufacturing",
    category: "qualityManagement",
  },
  {
    slug: "retranetz-bb",
    translationKey: "retranetz-bb",
    category: "news",
  },
  {
    slug: "ces-2024",
    translationKey: "ces-2024",
    category: "news",
  },
];
