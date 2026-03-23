"use client";

import { use, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import { ArrowLeft } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";
import { blogArticles } from "@/lib/blog";

const categoryImages: Record<string, string> = {
  knowledge: "/w/blog/knowledge.webp",
  digitalization: "/w/blog/digitalization.webp",
  qualityManagement: "/w/blog/quality-management.webp",
};

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const t = useTranslations("blog");
  const sectionRef = useRef<HTMLDivElement>(null);

  const article = blogArticles.find((a) => a.slug === slug);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".blog-block", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".blog-block",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!article) {
    return (
      <PageLayout title="Article Not Found">
        <div className="py-12 text-center">
          <p className="mb-6 text-lg text-muted">
            The article you are looking for does not exist.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </PageLayout>
    );
  }

  const key = article.translationKey;

  const paragraphs: { heading?: string; text: string }[] = [];
  paragraphs.push({ text: t(`articles.${key}.p1`) });

  for (let i = 2; i <= 8; i++) {
    const pKey = `articles.${key}.p${i}`;
    const hKey = `articles.${key}.p${i}h`;
    if (!t.has(pKey)) break;
    const text = t(pKey);
    const heading = t.has(hKey) ? t(hKey) : undefined;
    paragraphs.push({ heading, text });
  }

  return (
    <PageLayout title={t(`articles.${key}.title`)}>
      <div ref={sectionRef}>
        <div className="page-content-block mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-hover"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {categoryImages[article.category] && (
          <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl">
            <Image
              src={categoryImages[article.category]}
              alt={t(`articles.${key}.title`)}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        )}

        <div className="page-content-block mb-8">
          <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary">
            {t(`articles.${key}.category`)}
          </span>
        </div>

        <div className="space-y-8">
          {paragraphs.map((p, idx) => (
            <div key={idx} className="blog-block">
              {p.heading && (
                <h2 className="mb-3 text-2xl font-bold text-foreground">
                  {p.heading}
                </h2>
              )}
              <p className="text-lg leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-hover"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
