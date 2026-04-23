"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";

const DIVISIONS = [
  { key: "wquality", color: "var(--primary)", href: "/w-quality" },
  { key: "wdigilab", color: "var(--accent-teal)", href: "/w-digilab" },
  { key: "wstudio", color: "var(--accent-purple)", href: "/w-studio" },
] as const;

function DivisionCard({
  number,
  name,
  description,
  color,
  href,
  isLast,
}: {
  number: number;
  name: string;
  description: string;
  color: string;
  href: string;
  isLast: boolean;
}) {
  return (
    <>
      <Link
        href={href}
        className="division-card group relative grid gap-6 rounded-2xl py-12 px-2 transition-all duration-300 hover:bg-primary/[0.03] first:pt-0 lg:grid-cols-[260px_1fr] lg:gap-14 lg:px-6"
      >
        {/* Left: identity */}
        <div>
          <span
            className="text-5xl font-bold tracking-tight sm:text-6xl"
            style={{
              color,
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
            }}
          >
            {String(number).padStart(2, "0")}
          </span>
          <h2
            className="mt-3 text-xl font-bold text-foreground sm:text-2xl"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            {name}
          </h2>
          <div
            className="mt-4 h-[2px] w-12 rounded-full"
            style={{ background: color }}
          />
        </div>

        {/* Right: description + arrow */}
        <div className="flex items-start">
          <div
            className="mr-5 mt-1 hidden w-[2px] self-stretch rounded-full lg:block"
            style={{
              background: `linear-gradient(to bottom, ${color}, transparent)`,
              opacity: 0.25,
            }}
          />
          <div className="flex-1">
            <p
              className="text-base leading-[1.9] text-muted sm:text-[17px]"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
            >
              {description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100"
              style={{ color, fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
              Explore
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>

      {!isLast && (
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      )}
    </>
  );
}

export default function OurDivisionsPage() {
  const t = useTranslations("partner");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".division-card");
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: cards[0],
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              duration: 0.9,
              ease: "power3.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout
      title={t("title")}
      subtitle={t("subtitle")}
      eyebrow={t("eyebrow")}
      titleHighlight={t("titleHighlight")}
      heroImage="/w-new/w3.png"
    >
      <div ref={sectionRef}>
        {/* Intro paragraphs */}
        <div className="page-content-block mb-12 space-y-4">
          <p className="text-lg leading-relaxed text-muted" style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
            {t("p1")}
          </p>
          <p className="text-lg leading-relaxed text-muted" style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
            {t("p2")}
          </p>
          <p className="text-lg leading-relaxed text-muted" style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
            {t("p3")}
          </p>
        </div>

        {DIVISIONS.map(({ key, color, href }, i) => (
          <DivisionCard
            key={key}
            number={i + 1}
            name={t(`${key}.name`)}
            description={t(`${key}.description`)}
            color={color}
            href={href}
            isLast={i === DIVISIONS.length - 1}
          />
        ))}
      </div>
    </PageLayout>
  );
}
