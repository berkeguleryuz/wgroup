"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "@/components/icons";
import { gsap } from "@/lib/gsap";
import PageLayout from "@/components/layout/PageLayout";
import { blogArticles } from "@/lib/blog";

const categories = [
  { key: "all", label: "allArticles" },
  { key: "knowledge", label: "knowledge" },
  { key: "digitalization", label: "digitalization" },
  { key: "qualityManagement", label: "qualityManagement" },
  { key: "news", label: "news" },
] as const;

const categoryImages: Record<string, string> = {
  knowledge: "/w-new/wn3.webp",
  digitalization: "/w-new/wn2.webp",
  qualityManagement: "/w-new/wn1.webp",
};

const categoryColors: Record<string, string> = {
  knowledge: "#1E6DB5",
  digitalization: "#0891b2",
  qualityManagement: "#6366f1",
  news: "#f59e0b",
};

/* ---------- Premium blog card with gradient, glow, 3D tilt ---------- */
function BlogCard({
  href,
  category,
  categoryKey,
  title,
  excerpt,
  readMore,
  image,
}: {
  href: string;
  category: string;
  categoryKey: string;
  title: string;
  excerpt: string;
  readMore: string;
  image?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const color = categoryColors[categoryKey] || "#1E6DB5";

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      gsap.to(cardRef.current, {
        rotateX: ((y - centerY) / centerY) * -8,
        rotateY: ((x - centerX) / centerX) * 8,
        transformPerspective: 800,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - 100,
          y: y - 100,
          opacity: 0.7,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    },
    [color]
  );

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  return (
    <div
      className="blog-card"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={href} className="block h-full">
        <div
          ref={cardRef}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 shadow-xl transition-shadow duration-500 will-change-transform hover:shadow-2xl"
          style={{
            transformStyle: "preserve-3d",
            background: `linear-gradient(135deg, var(--card-bg), ${color}10, var(--card-bg))`,
            backdropFilter: "blur(12px)",
            border: `1px solid var(--card-border)`,
            boxShadow: `0 10px 40px -10px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Corner glow */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
            style={{ background: `linear-gradient(135deg, ${color}15, transparent)` }}
          />

          {/* Mouse-follow glow */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0 blur-3xl"
            style={{ background: `${color}20` }}
          />

          {/* Hover shimmer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-10 flex flex-1 flex-col" style={{ transform: "translateZ(15px)" }}>
            {image && (
              <div className="relative mb-4 h-36 w-full overflow-hidden rounded-xl">
                <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}

            <span
              className="mb-4 inline-block self-start rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
              style={{ color, background: `${color}20`, border: `1px solid ${color}30` }}
            >
              {category}
            </span>

            <h3 className="mb-3 text-lg font-bold leading-snug text-foreground line-clamp-2">
              {title}
            </h3>

            <p className="mb-5 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
              {excerpt}
            </p>

            <span
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
              style={{ color }}
            >
              {readMore}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function BlogPage() {
  const t = useTranslations("blog");
  const tc = useTranslations("categories");
  const tCommon = useTranslations("common");
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredArticles =
    activeCategory === "all"
      ? blogArticles
      : blogArticles.filter((a) => a.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        y: 60,
        opacity: 0,
        rotationX: -12,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".blog-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <PageLayout title={t("title")} eyebrow={t("eyebrow")} titleHighlight={t("titleHighlight")}>
      <div ref={sectionRef}>
        {/* Category Filter */}
        <div className="page-content-block mb-10 flex flex-wrap gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            const catColor = categoryColors[cat.key] || "#1E6DB5";
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-lg"
                    : "text-muted hover:-translate-y-0.5"
                }`}
                style={
                  isActive
                    ? {
                        background: `linear-gradient(135deg, ${catColor}, ${catColor}cc)`,
                        boxShadow: `0 4px 15px -3px ${catColor}40`,
                      }
                    : {
                        background: `linear-gradient(135deg, var(--card-bg), ${catColor}08)`,
                        border: `1px solid var(--card-border)`,
                      }
                }
              >
                {cat.key === "all" ? t("allArticles") : tc(cat.label)}
              </button>
            );
          })}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <BlogCard
              key={article.slug}
              href={`/blog/${article.slug}`}
              category={t(`articles.${article.translationKey}.category`)}
              categoryKey={article.category}
              title={t(`articles.${article.translationKey}.title`)}
              excerpt={t(`articles.${article.translationKey}.p1`)}
              readMore={tCommon("readMore")}
              image={categoryImages[article.category]}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
