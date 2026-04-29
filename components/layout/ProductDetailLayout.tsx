"use client";

import { useRef, useEffect, useCallback } from "react";
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
  divisionAccent,
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

  /* Group strategic-advantage sentences into ~3 readable chunks */
  const strategicSentences = strategic
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const strategicChunks: string[] = (() => {
    if (strategicSentences.length <= 3) return strategicSentences;
    const target = 3;
    const perGroup = Math.ceil(strategicSentences.length / target);
    const out: string[] = [];
    for (let i = 0; i < strategicSentences.length; i += perGroup) {
      out.push(strategicSentences.slice(i, i + perGroup).join(" "));
    }
    return out;
  })();

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
        {/* Atmospheric backdrop */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-40 top-16 h-[440px] w-[440px] rounded-full blur-[130px]"
            style={{ background: "rgba(30,109,181,0.07)" }}
          />
          <div
            className="absolute -right-40 bottom-16 h-[400px] w-[400px] rounded-full blur-[130px]"
            style={{ background: "rgba(8,145,178,0.06)" }}
          />
          {/* Drafting grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          {/* Eyebrow */}
          <div className="pd-fade mb-16 flex items-center gap-4">
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
            <div className="h-px flex-1 bg-gradient-to-r from-primary/25 via-white/[0.06] to-transparent" />
            <span
              aria-hidden
              className="hidden items-center gap-1.5 sm:inline-flex"
            >
              <span
                className="block h-1 w-1 rounded-full"
                style={{ background: "var(--primary)" }}
              />
              <span
                className="block h-1 w-1 rounded-full"
                style={{ background: "var(--accent-teal)", opacity: 0.7 }}
              />
              <span
                className="block h-1 w-1 rounded-full"
                style={{ background: "var(--accent-purple)", opacity: 0.4 }}
              />
            </span>
          </div>

          {/* Editorial strata composition */}
          <div className="relative">
            {/* Vertical thread on the left edge — runs through all strata */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-px sm:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(30,109,181,0.45) 18%, rgba(8,145,178,0.45) 82%, transparent 100%)",
              }}
            />
            {strategicChunks.map((chunk, i) => (
              <AdvantageStrata
                key={i}
                index={i}
                text={chunk}
                total={strategicChunks.length}
              />
            ))}
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rk) => (
                <RelatedCard
                  key={rk}
                  href={`/products/${productSlugs[rk]}`}
                  image={productImages[rk]}
                  brand={t(`items.${rk}.brand`)}
                  title={t(`items.${rk}.title`)}
                  tagline={t(`items.${rk}.tagline`)}
                  cta={t("eyebrow")}
                  accentColor={divisionAccent[productDivision[rk]].solid}
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

/* ---------- Strategic-advantage editorial strata ----------
   No cards. A magazine-spread typographic composition where each
   chunk becomes its own asymmetric "strata": animated SVG decoration
   on the outer side (alternating left/right), and Barlow body text.
   Hairline rule dividers + a vertical thread create editorial cadence.
*/

const ADV_DECORATIONS = [StarBurstDecoration, OrbitalDecoration, ConstellationDecoration];

function AdvantageStrata({
  index,
  text,
  total,
}: {
  index: number;
  text: string;
  total: number;
}) {
  const isLast = index === total - 1;
  const flipped = index % 2 === 1;
  const Decoration = ADV_DECORATIONS[index % ADV_DECORATIONS.length];

  const decoration = (
    <div
      className={`pd-approach-block relative flex ${
        flipped ? "sm:justify-end" : "sm:justify-start"
      }`}
    >
      <Decoration />
    </div>
  );

  const body = (
    <div className="pd-approach-block relative max-w-2xl">
      {/* Subtle leading rule */}
      <div
        className={`mb-6 flex items-center gap-3 ${
          flipped ? "sm:justify-end" : ""
        }`}
      >
        <span
          aria-hidden
          className="block h-px w-12"
          style={{
            background: flipped
              ? "linear-gradient(to left, var(--primary), transparent)"
              : "linear-gradient(to right, var(--primary), transparent)",
            order: flipped ? 2 : 0,
          }}
        />
        <span
          aria-hidden
          className="block h-1.5 w-1.5 rotate-45"
          style={{
            background:
              "linear-gradient(135deg, var(--primary), var(--accent-teal))",
          }}
        />
      </div>

      {/* Body */}
      <p
        className={`text-[17px] leading-[1.78] text-white/85 sm:text-[19px] sm:leading-[1.72] ${
          flipped ? "sm:text-right" : ""
        }`}
        style={{
          fontFamily: "var(--font-barlow), system-ui, sans-serif",
          letterSpacing: "-0.003em",
        }}
      >
        {text}
      </p>

      {/* Trailing accent dot row */}
      <div
        className={`mt-7 flex items-center gap-1.5 ${
          flipped ? "sm:justify-end" : ""
        }`}
      >
        <span
          className="block h-1 w-1 rounded-full"
          style={{ background: "var(--primary)", opacity: 0.85 }}
        />
        <span
          className="block h-1 w-1 rounded-full"
          style={{ background: "var(--accent-teal)", opacity: 0.55 }}
        />
        <span
          className="block h-1 w-1 rounded-full"
          style={{ background: "var(--accent-purple)", opacity: 0.35 }}
        />
      </div>
    </div>
  );

  return (
    <div
      className={`relative py-12 sm:py-20 ${
        isLast ? "" : "border-b border-white/[0.06]"
      }`}
    >
      <div
        className={`grid items-center gap-8 sm:gap-14 ${
          flipped
            ? "sm:grid-cols-[minmax(0,1fr)_clamp(160px,18vw,240px)]"
            : "sm:grid-cols-[clamp(160px,18vw,240px)_minmax(0,1fr)]"
        }`}
      >
        {flipped ? (
          <>
            {body}
            {decoration}
          </>
        ) : (
          <>
            {decoration}
            {body}
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Animated SVG decorations (replace numerals) ---------- */

function StarBurstDecoration() {
  return (
    <div
      aria-hidden
      className="relative"
      style={{ width: "clamp(140px, 16vw, 200px)", height: "clamp(140px, 16vw, 200px)" }}
    >
      {/* Soft glow halo */}
      <div
        className="absolute inset-[18%] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 38%, transparent), transparent 70%)",
          animation: "adv-pulse-soft 4.5s ease-in-out infinite",
        }}
      />
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="advGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--accent-teal)" />
          </linearGradient>
          <radialGradient id="advCore1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.95" />
            <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Slow-rotating outer ring */}
        <g style={{ transformOrigin: "center", animation: "adv-spin-slow 40s linear infinite" }}>
          <circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="url(#advGrad1)"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.55"
          />
        </g>

        {/* Counter-rotating star burst */}
        <g style={{ transformOrigin: "center", animation: "adv-spin-rev 28s linear infinite" }}>
          <path
            d="M100 28 L106 92 L168 100 L106 108 L100 172 L94 108 L32 100 L94 92 Z"
            fill="url(#advGrad1)"
            opacity="0.85"
          />
          <path
            d="M100 50 L103 96 L150 100 L103 104 L100 150 L97 104 L50 100 L97 96 Z"
            fill="white"
            opacity="0.18"
          />
        </g>

        {/* Glowing core */}
        <circle cx="100" cy="100" r="14" fill="url(#advCore1)">
          <animate attributeName="r" values="12;16;12" dur="3.2s" repeatCount="indefinite" />
        </circle>

        {/* Twinkling sparkles */}
        <circle cx="40" cy="60" r="1.8" fill="white" style={{ animation: "adv-twinkle 2.4s ease-in-out infinite" }} />
        <circle cx="160" cy="55" r="1.5" fill="white" style={{ animation: "adv-twinkle 3s ease-in-out infinite", animationDelay: "0.6s" }} />
        <circle cx="50" cy="160" r="1.2" fill="white" style={{ animation: "adv-twinkle 2.8s ease-in-out infinite", animationDelay: "1.2s" }} />
        <circle cx="155" cy="150" r="1.6" fill="white" style={{ animation: "adv-twinkle 2.2s ease-in-out infinite", animationDelay: "0.3s" }} />
      </svg>
    </div>
  );
}

function OrbitalDecoration() {
  return (
    <div
      aria-hidden
      className="relative"
      style={{ width: "clamp(140px, 16vw, 200px)", height: "clamp(140px, 16vw, 200px)" }}
    >
      <div
        className="absolute inset-[20%] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-teal) 42%, transparent), transparent 70%)",
          animation: "adv-pulse-soft 5s ease-in-out infinite",
          animationDelay: "0.4s",
        }}
      />
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="advGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent-teal)" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
          <radialGradient id="advCore2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--accent-teal)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Three concentric pulse rings */}
        <circle cx="100" cy="100" r="40" fill="none" stroke="url(#advGrad2)" strokeWidth="1.2" opacity="0.7"
                style={{ transformOrigin: "100px 100px", animation: "adv-pulse-ring 3.4s ease-out infinite" }} />
        <circle cx="100" cy="100" r="40" fill="none" stroke="url(#advGrad2)" strokeWidth="1.2" opacity="0.7"
                style={{ transformOrigin: "100px 100px", animation: "adv-pulse-ring 3.4s ease-out infinite", animationDelay: "1.1s" }} />
        <circle cx="100" cy="100" r="40" fill="none" stroke="url(#advGrad2)" strokeWidth="1.2" opacity="0.7"
                style={{ transformOrigin: "100px 100px", animation: "adv-pulse-ring 3.4s ease-out infinite", animationDelay: "2.2s" }} />

        {/* Counter-rotating orbital ring with two satellite dots */}
        <g style={{ transformOrigin: "center", animation: "adv-spin-slow 18s linear infinite" }}>
          <circle cx="100" cy="100" r="62" fill="none" stroke="url(#advGrad2)" strokeWidth="1" opacity="0.4" />
          <circle cx="100" cy="38" r="3.5" fill="var(--primary)" />
          <circle cx="100" cy="162" r="2.5" fill="var(--accent-teal)" opacity="0.85" />
        </g>

        {/* Outer dotted ring */}
        <g style={{ transformOrigin: "center", animation: "adv-spin-rev 32s linear infinite" }}>
          <circle cx="100" cy="100" r="86" fill="none" stroke="url(#advGrad2)" strokeWidth="1" strokeDasharray="1 5" opacity="0.5" />
        </g>

        {/* Center crosshair */}
        <line x1="100" y1="86" x2="100" y2="114" stroke="white" strokeWidth="1" opacity="0.55" />
        <line x1="86" y1="100" x2="114" y2="100" stroke="white" strokeWidth="1" opacity="0.55" />

        {/* Glowing core */}
        <circle cx="100" cy="100" r="9" fill="url(#advCore2)">
          <animate attributeName="r" values="7;11;7" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function ConstellationDecoration() {
  return (
    <div
      aria-hidden
      className="relative"
      style={{ width: "clamp(140px, 16vw, 200px)", height: "clamp(140px, 16vw, 200px)" }}
    >
      <div
        className="absolute inset-[22%] rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-purple) 38%, transparent), transparent 70%)",
          animation: "adv-pulse-soft 6s ease-in-out infinite",
          animationDelay: "0.8s",
        }}
      />
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="advGrad3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="50%" stopColor="var(--accent-purple)" />
            <stop offset="100%" stopColor="var(--accent-teal)" />
          </linearGradient>
          <radialGradient id="advCore3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Constellation lines (slowly drifting in opacity) */}
        <g
          opacity="0.6"
          style={{
            transformOrigin: "center",
            animation: "adv-spin-slow 60s linear infinite",
          }}
        >
          <line x1="50" y1="60" x2="100" y2="100" stroke="url(#advGrad3)" strokeWidth="0.9" />
          <line x1="100" y1="100" x2="150" y2="60" stroke="url(#advGrad3)" strokeWidth="0.9" />
          <line x1="100" y1="100" x2="155" y2="140" stroke="url(#advGrad3)" strokeWidth="0.9" />
          <line x1="100" y1="100" x2="60" y2="155" stroke="url(#advGrad3)" strokeWidth="0.9" />
          <line x1="50" y1="60" x2="60" y2="155" stroke="url(#advGrad3)" strokeWidth="0.5" opacity="0.6" />
          <line x1="150" y1="60" x2="155" y2="140" stroke="url(#advGrad3)" strokeWidth="0.5" opacity="0.6" />

          {/* Star nodes — twinkling */}
          <circle cx="50" cy="60" r="3" fill="var(--primary)" style={{ animation: "adv-twinkle 2.6s ease-in-out infinite" }} />
          <circle cx="150" cy="60" r="2.5" fill="var(--accent-teal)" style={{ animation: "adv-twinkle 3s ease-in-out infinite", animationDelay: "0.5s" }} />
          <circle cx="155" cy="140" r="2.5" fill="var(--accent-purple)" style={{ animation: "adv-twinkle 2.8s ease-in-out infinite", animationDelay: "1s" }} />
          <circle cx="60" cy="155" r="2.8" fill="var(--primary)" style={{ animation: "adv-twinkle 2.4s ease-in-out infinite", animationDelay: "1.4s" }} />
        </g>

        {/* Hexagonal frame — slowly rotating reverse */}
        <g style={{ transformOrigin: "center", animation: "adv-spin-rev 50s linear infinite" }}>
          <polygon
            points="100,30 160,65 160,135 100,170 40,135 40,65"
            fill="none"
            stroke="url(#advGrad3)"
            strokeWidth="0.8"
            strokeDasharray="1 4"
            opacity="0.45"
          />
        </g>

        {/* Central star */}
        <g style={{ transformOrigin: "center", animation: "adv-drift 4s ease-in-out infinite" }}>
          <path
            d="M100 80 L104 96 L120 100 L104 104 L100 120 L96 104 L80 100 L96 96 Z"
            fill="url(#advGrad3)"
          />
          <circle cx="100" cy="100" r="5" fill="url(#advCore3)" />
        </g>

        {/* Outer scattered sparkles */}
        <circle cx="30" cy="100" r="1.2" fill="white" style={{ animation: "adv-twinkle 2s ease-in-out infinite" }} />
        <circle cx="170" cy="100" r="1.2" fill="white" style={{ animation: "adv-twinkle 2.4s ease-in-out infinite", animationDelay: "0.8s" }} />
        <circle cx="100" cy="30" r="1.2" fill="white" style={{ animation: "adv-twinkle 2.2s ease-in-out infinite", animationDelay: "1.2s" }} />
        <circle cx="100" cy="170" r="1.2" fill="white" style={{ animation: "adv-twinkle 2.6s ease-in-out infinite", animationDelay: "1.6s" }} />
      </svg>
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

/* ---------- Related product card — mirrors blog-card structure ---------- */

function RelatedCard({
  href,
  image,
  brand,
  title,
  tagline,
  cta,
  accentColor,
}: {
  href: string;
  image: string;
  brand: string;
  title: string;
  tagline: string;
  cta: string;
  accentColor: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    gsap.to(cardRef.current, {
      rotateX: ((y - cy) / cy) * -8,
      rotateY: ((x - cx) / cx) * 8,
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
  }, []);

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
      className="pd-case-card"
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
            background: `linear-gradient(135deg, var(--card-bg), ${accentColor}10, var(--card-bg))`,
            backdropFilter: "blur(12px)",
            border: "1px solid var(--card-border)",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)",
          }}
        >
          {/* Corner glow */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
            style={{ background: `linear-gradient(135deg, ${accentColor}15, transparent)` }}
          />

          {/* Mouse-follow glow */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0 blur-3xl"
            style={{ background: `${accentColor}20` }}
          />

          {/* Hover shimmer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div
            className="relative z-10 flex flex-1 flex-col"
            style={{ transform: "translateZ(15px)" }}
          >
            {/* Cover image — contained inside the card with margin */}
            <div className="relative mb-4 h-36 w-full overflow-hidden rounded-xl">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Brand pill */}
            <span
              className="mb-4 inline-block self-start rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
              style={{
                color: accentColor,
                background: `${accentColor}20`,
                border: `1px solid ${accentColor}30`,
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            >
              {brand}
            </span>

            <h3
              className="mb-3 line-clamp-2 text-lg font-bold leading-snug text-foreground"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
            >
              {title}
            </h3>

            <p
              className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
            >
              {tagline}
            </p>

            <span
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
              style={{
                color: accentColor,
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
              }}
            >
              {cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
