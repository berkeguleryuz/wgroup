"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { ArrowRight } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

/* ---- Inline brand icons ---- */
function GradCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5L2 10l10 5 10-5-10-5z" />
      <path d="M6 12.3v4.7c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.7" />
      <path d="M22 10v5" />
    </svg>
  );
}

function CodeBracketsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 18l6-6-6-6" />
      <path d="M8 6l-6 6 6 6" />
      <path d="M14.5 4l-5 16" />
    </svg>
  );
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const brands = [
  {
    key: "weduFactory",
    slug: "/wedu-factory",
    image: "/images/brands/wedu-factory.webp",
    colorHex: "#1E6DB5",
    Icon: GradCapIcon,
  },
  {
    key: "warticode",
    slug: "/warticode",
    image: "/images/brands/warticode.webp",
    colorHex: "#6366f1",
    Icon: CodeBracketsIcon,
  },
  {
    key: "wqualitysphere",
    slug: "/wqualitysphere",
    image: "/images/brands/wqualitysphere.webp",
    colorHex: "#0891b2",
    Icon: ShieldCheckIcon,
  },
];

/* ---- SVG Tree Connector ---- */
function TreeConnector({
  direction,
}: {
  direction: "converge" | "diverge";
}) {
  const isConverge = direction === "converge";

  return (
    <svg
      className="tree-line mx-auto hidden w-full max-w-4xl lg:block"
      viewBox="0 0 100 10"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      {isConverge ? (
        <>
          <path
            d="M 16 0 C 16 7, 50 7, 50 10"
            stroke="var(--primary)"
            strokeWidth="0.18"
            strokeDasharray="0.7 0.45"
            opacity="0.4"
          />
          <path
            d="M 50 0 L 50 10"
            stroke="var(--primary)"
            strokeWidth="0.18"
            strokeDasharray="0.7 0.45"
            opacity="0.4"
          />
          <path
            d="M 84 0 C 84 7, 50 7, 50 10"
            stroke="var(--primary)"
            strokeWidth="0.18"
            strokeDasharray="0.7 0.45"
            opacity="0.4"
          />
          <circle cx="16" cy="0.4" r="0.45" fill="var(--primary)" opacity="0.5" />
          <circle cx="50" cy="0.4" r="0.45" fill="var(--primary)" opacity="0.5" />
          <circle cx="84" cy="0.4" r="0.45" fill="var(--primary)" opacity="0.5" />
          <circle cx="50" cy="9.8" r="0.6" fill="var(--primary)" opacity="0.7" />
        </>
      ) : (
        <>
          <circle cx="50" cy="0.2" r="0.6" fill="var(--primary)" opacity="0.7" />
          <path
            d="M 50 0.5 C 50 3.5, 16 3.5, 16 10"
            stroke="var(--primary)"
            strokeWidth="0.18"
            strokeDasharray="0.7 0.45"
            opacity="0.4"
          />
          <path
            d="M 50 0.5 L 50 10"
            stroke="var(--primary)"
            strokeWidth="0.18"
            strokeDasharray="0.7 0.45"
            opacity="0.4"
          />
          <path
            d="M 50 0.5 C 50 3.5, 84 3.5, 84 10"
            stroke="var(--primary)"
            strokeWidth="0.18"
            strokeDasharray="0.7 0.45"
            opacity="0.4"
          />
          <circle cx="16" cy="9.6" r="0.45" fill="var(--primary)" opacity="0.5" />
          <circle cx="50" cy="9.6" r="0.45" fill="var(--primary)" opacity="0.5" />
          <circle cx="84" cy="9.6" r="0.45" fill="var(--primary)" opacity="0.5" />
        </>
      )}
    </svg>
  );
}

/* ========== Brands Section ========== */
export default function Brands() {
  const t = useTranslations("brands");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Icon circles pop-in */
      gsap.from(".brand-icon-circle", {
        scale: 0,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".brand-icon-circle",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* Tree connector lines fade in */
      gsap.from(".tree-line", {
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tree-line",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      /* Heading entrance */
      gsap.from(".brands-heading > *", {
        y: 25,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".brands-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* Card entrance */
      const cards = gsap.utils.toArray<HTMLElement>(".brand-card");
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: cards[0],
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              duration: 0.8,
              ease: "power3.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f8f9fb] py-24 sm:py-32"
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* ---- Brand Icon Circles ---- */}
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div key={brand.key} className="flex flex-col items-center">
              <div
                className="brand-icon-circle relative flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20"
                style={{
                  background: `${brand.colorHex}0A`,
                  border: `1.5px solid ${brand.colorHex}20`,
                }}
              >
                {/* Subtle glow behind icon */}
                <div
                  className="absolute -inset-3 rounded-full opacity-20 blur-2xl"
                  style={{ background: brand.colorHex }}
                />
                <brand.Icon
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  style={{ color: brand.colorHex }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ---- Top Connector (converge to center) ---- */}
        <TreeConnector direction="converge" />

        {/* Mobile: simple vertical line */}
        <div className="mx-auto my-4 h-10 w-px border-l border-dashed border-primary/30 lg:hidden" />

        {/* ---- Center Heading ---- */}
        <div className="brands-heading mx-auto max-w-2xl py-6 text-center lg:py-3">
          <p
            className="mb-3 text-sm font-semibold tracking-[0.2em] text-primary"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            {t("label")}
          </p>
          <h2
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            {t("title")}{" "}
            <span
              className="text-primary"
              style={{
                fontFamily: "var(--font-instrument), Georgia, serif",
                fontStyle: "italic",
              }}
            >
              {t("titleHighlight")}
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500">
            {t("description")}
          </p>
        </div>

        {/* Mobile: simple vertical line */}
        <div className="mx-auto my-4 h-10 w-px border-l border-dashed border-primary/30 lg:hidden" />

        {/* ---- Bottom Connector (diverge to cards) ---- */}
        <TreeConnector direction="diverge" />

        {/* ---- Brand Cards ---- */}
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand.key}
              href={brand.slug}
              className="brand-card group block"
            >
              <div className="h-full overflow-hidden rounded-2xl border border-gray-200/60 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-900/[0.06]">
                {/* Image */}
                <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src={brand.image}
                    alt={t(`${brand.key}Name`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Icon + Name */}
                <div className="mb-2.5 flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${brand.colorHex}12` }}
                  >
                    <brand.Icon
                      className="h-4 w-4"
                      style={{ color: brand.colorHex }}
                    />
                  </div>
                  <h3
                    className="text-lg font-bold text-gray-900"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    }}
                  >
                    {t(`${brand.key}Name`)}
                  </h3>
                </div>

                {/* Description */}
                <p className="mb-5 text-sm leading-relaxed text-gray-500">
                  {t(`${brand.key}Desc`)}
                </p>

                {/* CTA */}
                <div
                  className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                  style={{
                    color: brand.colorHex,
                    fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  }}
                >
                  {t("learnMore")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
