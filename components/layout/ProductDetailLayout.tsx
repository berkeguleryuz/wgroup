"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "@/components/icons";
import MorphButton from "@/components/ui/MorphButton";
import FeatureDefinition from "@/components/layout/FeatureDefinition";
import {
  type ProductKey,
  productImages,
  productSlugs,
  productDivision,
  divisionHref,
  relatedProducts,
} from "@/lib/products";

interface UseCase {
  title: string;
  desc: string;
}

interface Props {
  productKey: ProductKey;
}

export default function ProductDetailLayout({ productKey }: Props) {
  const t = useTranslations("wproducts");
  const tCommon = useTranslations("common");
  const pageRef = useRef<HTMLDivElement>(null);

  const item = `items.${productKey}`;
  const title = t(`${item}.title`);
  const tagline = t(`${item}.tagline`);
  const brand = t(`${item}.brand`);
  const definition = t(`${item}.definition`);
  const strategic = t(`${item}.strategicAdvantage`);
  const useCases = t.raw(`${item}.useCases`) as UseCase[];
  const heroImage = productImages[productKey];
  const division = productDivision[productKey];
  const brandUrl = divisionHref[division];
  const related = relatedProducts(productKey);

  const titleWords = title.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      const heroTl = gsap.timeline({ delay: 0.25 });
      heroTl.from(".pd-hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      heroTl.from(
        ".pd-hero-word",
        {
          y: 60,
          opacity: 0,
          rotationX: -45,
          stagger: 0.06,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        "-=0.25"
      );
      heroTl.from(
        ".pd-hero-sub",
        { y: 30, opacity: 0, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      );
      heroTl.from(
        ".pd-hero-line",
        { scaleX: 0, duration: 0.8, ease: "power3.inOut" },
        "-=0.3"
      );

      /* Scroll fade sections */
      gsap.utils.toArray<HTMLElement>(".pd-fade").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      /* Use case card stagger */
      gsap.utils.toArray<HTMLElement>(".pd-case-card").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: (i % 2) * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      /* Approach blocks (strategic advantage) */
      gsap.utils.toArray<HTMLElement>(".pd-approach-block").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [productKey]);

  /* Split definition + strategic into paragraphs for layered typography */
  const definitionParts = definition.split(/(?<=[.!?])\s+/);
  const definitionLead = definitionParts.slice(0, 1).join(" ");
  const definitionRest = definitionParts.slice(1).join(" ");

  return (
    <div ref={pageRef} style={{ background: "var(--background)" }}>
      {/* ================== HERO ================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Hero background image (soft) */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover opacity-[0.12]"
            sizes="100vw"
            priority
          />
        </div>
        {/* Gradient vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-background/70 to-background" />
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-24 top-20 h-[380px] w-[380px] rounded-full blur-[110px]"
            style={{ background: "rgba(30,109,181,0.10)" }}
          />
          <div
            className="absolute right-0 top-1/3 h-[440px] w-[440px] rounded-full blur-[120px]"
            style={{ background: "rgba(8,145,178,0.10)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div className="pd-hero-eyebrow mb-6 flex items-center justify-center">
            <Link
              href={brandUrl}
              className="group relative inline-flex items-baseline leading-none transition-transform duration-300 hover:-translate-y-px"
              aria-label={brand}
            >
              {(() => {
                const dash = brand.indexOf("-");
                const prefix = dash >= 0 ? brand.slice(0, dash + 1) : brand;
                const tail = dash >= 0 ? brand.slice(dash + 1) : "";
                return (
                  <>
                    <span
                      className="text-2xl font-extrabold tracking-tight text-white sm:text-[1.75rem]"
                      style={{
                        fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      }}
                    >
                      {prefix}
                    </span>
                    <span
                      className="text-2xl font-normal italic sm:text-[1.75rem]"
                      style={{
                        fontFamily: "var(--font-instrument), Georgia, serif",
                        background:
                          "linear-gradient(120deg, var(--primary), var(--accent-teal))",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {tail}
                    </span>
                    {/* underline sweep */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-1.5 left-0 right-0 h-[2px] origin-center scale-x-0 rounded-full opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, var(--primary), var(--accent-teal), transparent)",
                      }}
                    />
                  </>
                );
              })()}
            </Link>
          </div>

          <h1
            className="mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{
              perspective: "800px",
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
            }}
          >
            {titleWords.map((word, i) => (
              <span
                key={i}
                className="pd-hero-word mr-[0.22em] inline-block will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            className="pd-hero-sub mx-auto max-w-2xl text-lg text-white/55 sm:text-xl"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            {tagline}
          </p>

          <div className="pd-hero-line mx-auto mt-10 h-[2px] w-20 origin-center bg-primary/60" />
        </div>

        {/* Curved transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="block w-full h-[80px]"
            viewBox="0 0 1440 80"
            fill="none"
            preserveAspectRatio="none"
          >
            <path d="M0 0 Q720 80 1440 0 V80 H0 Z" fill="#f7f9fc" />
          </svg>
        </div>
      </section>

      {/* ================== DEFINITION ================== */}
      <FeatureDefinition
        meta={[
          { label: tCommon("focusLabel"), value: tagline, italic: true },
        ]}
        eyebrow={t("definitionLabel")}
        rightChip={brand}
        lead={definitionLead}
        leadCite={title}
        body={definitionRest || undefined}
      />

      {/* ================== STRATEGIC ADVANTAGE ================== */}
      <section
        className="relative py-28 sm:py-36"
        style={{ background: "var(--background)" }}
      >

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="pd-fade mb-14 flex items-center gap-4">
            <div
              className="h-[3px] w-12 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, var(--primary), var(--accent-teal))",
              }}
            />
            <h2
              className="text-sm font-bold uppercase tracking-[0.2em] text-primary"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
            >
              {t("strategicAdvantageLabel")}
            </h2>
          </div>

          <div
            className="pd-approach-block relative overflow-hidden rounded-3xl p-8 sm:p-14"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,109,181,0.06), rgba(8,145,178,0.03))",
              border: "1px solid rgba(30,109,181,0.14)",
            }}
          >
            <div className="relative z-10 flex items-start gap-6">
              <span
                className="mt-2 hidden shrink-0 self-stretch sm:block"
                style={{
                  width: "3px",
                  borderRadius: "3px",
                  background:
                    "linear-gradient(to bottom, var(--primary), var(--accent-teal))",
                  opacity: 0.8,
                }}
              />
              <p
                className="flex-1 text-lg leading-[1.85] text-white/80 sm:text-xl"
                style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
              >
                {strategic}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================== USE CASES ================== */}
      <section
        className="light-content relative py-28 sm:py-36"
        style={{ background: "#f7f9fc" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--primary) 0.5px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="pd-fade mb-14 flex items-center gap-4">
            <div
              className="h-[3px] w-12 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, var(--primary), var(--accent-teal))",
              }}
            />
            <h2
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                color: "var(--primary)",
              }}
            >
              {t("useCasesLabel")}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {useCases.map((uc, i) => (
              <ProductCard key={i} title={uc.title} desc={uc.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ================== RELATED PRODUCTS ================== */}
      {related.length > 0 && (
        <section
          className="relative py-28 sm:py-36"
          style={{ background: "var(--background)" }}
        >
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="pd-fade mb-14 flex flex-wrap items-end justify-between gap-6">
              <div className="flex items-center gap-4">
                <div
                  className="h-[3px] w-12 rounded-full"
                  style={{
                    background:
                      "linear-gradient(to right, var(--primary), var(--accent-teal))",
                  }}
                />
                <h2
                  className="text-sm font-bold uppercase tracking-[0.2em] text-primary"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  }}
                >
                  {t("relatedProducts")}
                </h2>
              </div>
              <Link
                href={brandUrl}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
                style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
              >
                {t("backToDivision")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {related.map((rk) => (
                <RelatedCard
                  key={rk}
                  href={`/products/${productSlugs[rk]}`}
                  image={productImages[rk]}
                  brand={t(`items.${rk}.brand`)}
                  title={t(`items.${rk}.title`)}
                  tagline={t(`items.${rk}.tagline`)}
                  cta={t("eyebrow")}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================== CTA ================== */}
      <section
        className="relative pb-28 sm:pb-36"
        style={{ background: "#f7f9fc" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--primary) 0.5px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-20 sm:pt-28">
          <div
            className="pd-fade overflow-hidden rounded-3xl px-8 py-20 sm:px-16 sm:py-24"
            style={{ background: "#0a0f1e" }}
          >
            <div className="mx-auto max-w-2xl text-center">
              <p
                className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
                style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
              >
                {t("contactPricing")}
              </p>
              <h2
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
              >
                {t("ctaTitle")}
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/50">
                {t("ctaDesc")}
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/contact" className="group">
                  <MorphButton
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-background shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-0.5 sm:text-base"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontWeight: 600,
                    }}
                    fillColor="#0a0f1e"
                    textColor="#0a0f1e"
                    textColorHover="#ffffff"
                  >
                    <span className="flex items-center gap-2">
                      {t("ctaButton")}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </MorphButton>
                </Link>
                <Link
                  href={brandUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.12] hover:border-white/30 sm:text-base"
                  style={{
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {t("backToDivision")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Use case card (unified theme) ---------- */

function ProductCard({ title, desc }: { title: string; desc: string }) {
  return (
    <article
      className="pd-case-card group relative rounded-2xl bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        border: "1px solid rgba(15,23,42,0.06)",
        boxShadow:
          "0 4px 12px -4px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.04)",
      }}
    >
      <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/25 transition-colors duration-300 group-hover:border-primary" />
      <span className="pointer-events-none absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-primary/25 transition-colors duration-300 group-hover:border-primary" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-primary/25 transition-colors duration-300 group-hover:border-primary" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/25 transition-colors duration-300 group-hover:border-primary" />

      <div className="mb-4 flex items-center gap-3">
        <span className="block h-2 w-2 rounded-full bg-primary" />
        <span
          className="h-[2px] w-10 rounded-full transition-all duration-300 group-hover:w-16"
          style={{
            background:
              "linear-gradient(90deg, var(--primary), var(--accent-teal))",
          }}
        />
      </div>

      <h3
        className="mb-3 text-xl font-bold leading-tight text-[#0f172a]"
        style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
      >
        {title}
      </h3>
      <p
        className="text-[15px] leading-relaxed text-[#475569]"
        style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
      >
        {desc}
      </p>
    </article>
  );
}

/* ---------- Related product card (same theme, with image) ---------- */

function RelatedCard({
  href,
  image,
  brand,
  title,
  tagline,
  cta,
}: {
  href: string;
  image: string;
  brand: string;
  title: string;
  tagline: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="pd-case-card group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 500px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div
          className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/40 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm"
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {brand}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h4
          className="mb-2 text-lg font-bold leading-tight text-white group-hover:text-primary"
          style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
        >
          {title}
        </h4>
        <p
          className="line-clamp-2 text-sm leading-relaxed text-white/55"
          style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
        >
          {tagline}
        </p>
        <div className="mt-auto pt-4">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            {cta}
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
