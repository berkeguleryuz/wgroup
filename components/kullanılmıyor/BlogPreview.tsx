"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import { ArrowRight } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    slug: "iatf16949-modern-approaches",
    translationKey: "iatf16949-modern-approaches",
    categoryKey: "knowledge" as const,
    color: "#1E6DB5",
    image: "/images/blog/knowledge.webp",
  },
  {
    slug: "secrets-of-digitization",
    translationKey: "secrets-of-digitization",
    categoryKey: "digitalization" as const,
    color: "#0891b2",
    image: "/images/blog/digitalization.webp",
  },
  {
    slug: "electric-transformation",
    translationKey: "electric-transformation",
    categoryKey: "qualityManagement" as const,
    color: "#6366f1",
    image: "/images/blog/quality-management.webp",
  },
];

/* ---------- dark glass blog card ---------- */
function BlogCard({
  slug,
  title,
  excerpt,
  category,
  readMore,
  color,
  image,
}: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMore: string;
  color: string;
  image: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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
          opacity: 0.5,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    },
    []
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
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl p-7 shadow-xl transition-shadow duration-500 will-change-transform hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Cover image */}
        <div className="relative mb-5 h-40 w-full overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Corner glow */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
          style={{ background: `${color}12` }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0 blur-3xl"
          style={{ background: `${color}15` }}
        />

        {/* Bottom shine */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10" style={{ transform: "translateZ(15px)" }}>
          <span
            className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
            style={{
              color,
              background: `${color}10`,
              border: `1px solid ${color}20`,
            }}
          >
            {category}
          </span>

          <h3 className="mt-5 text-lg font-bold leading-snug text-white">
            {title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/50">
            {excerpt}
          </p>

          <Link
            href={`/blog/${slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
            style={{ color }}
          >
            {readMore}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BlogPreview Section – dark bg
   ============================================================ */
export default function BlogPreview() {
  const t = useTranslations("blogPreview");
  const tBlog = useTranslations("blog");
  const tCat = useTranslations("categories");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        y: 60,
        opacity: 0,
        rotationX: -12,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".blog-cards-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0d1424] py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <AnimatedTitle
          title="Stay up to D<b>a</b>te"
          containerClass="mb-6 text-center !text-white"
        />
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-white/50">
          {t("description")}
        </p>

        <div className="blog-cards-grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard
              key={article.slug}
              slug={article.slug}
              title={tBlog(`articles.${article.translationKey}.title`)}
              excerpt={tBlog(`articles.${article.translationKey}.p1`)}
              category={tCat(article.categoryKey)}
              readMore={t("seeMore")}
              color={article.color}
              image={article.image}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/blog"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-10 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <span className="relative z-10">{t("seeMore")}</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>
      </div>
    </section>
  );
}
