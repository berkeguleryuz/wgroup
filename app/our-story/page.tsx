"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";
import MorphButton from "@/components/ui/MorphButton";

const FONT_BODY = "var(--font-barlow), system-ui, sans-serif";
const FONT_EDITORIAL = "var(--font-fraunces), Georgia, serif";
const FONT_MONO = "var(--font-jetbrains), ui-monospace, monospace";

function Diamond({
  size = 6,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      style={{ display: "inline-block" }}
    >
      <path d="M4 0 L8 4 L4 8 L0 4 Z" fill={color} />
    </svg>
  );
}

function Standfirst({
  label,
  align = "center",
  variant = "light",
}: {
  label: string;
  align?: "left" | "right" | "center";
  variant?: "light" | "dark";
}) {
  const justify =
    align === "center"
      ? "justify-center"
      : align === "right"
        ? "justify-end"
        : "justify-start";
  const ruleColor = variant === "dark" ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.22)";
  const labelColor = variant === "dark" ? "rgba(255,255,255,0.78)" : "#1a2332";
  const diamondColor = variant === "dark" ? "rgba(255,255,255,0.7)" : "var(--primary)";

  return (
    <div className={`flex items-center gap-3 ${justify}`}>
      <span className="block h-px w-10 sm:w-14" style={{ background: ruleColor }} />
      <span style={{ color: diamondColor }}>
        <Diamond size={6} />
      </span>
      <span
        className="text-[11px] font-bold"
        style={{
          fontFamily: FONT_MONO,
          color: labelColor,
          letterSpacing: "0.42em",
        }}
      >
        {label}
      </span>
      <span style={{ color: diamondColor }}>
        <Diamond size={6} />
      </span>
      <span className="block h-px w-10 sm:w-14" style={{ background: ruleColor }} />
    </div>
  );
}

function HeroStatement({ text, label }: { text: string; label: string }) {
  return (
    <section className="story-chapter relative py-14 sm:py-20">
      <div className="story-anim">
        <Standfirst label={label} align="center" />
      </div>
      <p
        className="story-anim mx-auto mt-9 max-w-3xl px-2 text-center text-[26px] leading-[1.45] sm:text-[34px] sm:leading-[1.32] lg:text-[40px] lg:leading-[1.22]"
        style={{
          fontFamily: FONT_EDITORIAL,
          fontWeight: 400,
          color: "#0f172a",
          letterSpacing: "-0.018em",
        }}
      >
        {text}
      </p>
      <div className="story-anim mt-10 flex items-center justify-center gap-2">
        <Diamond size={6} color="var(--primary)" />
        <Diamond size={6} color="var(--accent-teal)" />
        <Diamond size={6} color="var(--accent-purple)" />
      </div>
    </section>
  );
}

function Fragment({
  text,
  label,
  side = "left",
}: {
  text: string;
  label: string;
  side?: "left" | "right";
}) {
  const firstChar = text.charAt(0);
  const rest = text.slice(1);

  const margin = (
    <aside className="hidden sm:block">
      <div
        className={`flex flex-col items-${side === "left" ? "end" : "start"} gap-4 pt-2`}
        style={{ textAlign: side === "left" ? "right" : "left" }}
      >
        <div className="flex items-center gap-2">
          {side === "right" && (
            <span style={{ color: "var(--primary)" }}>
              <Diamond size={6} />
            </span>
          )}
          <span
            className="text-[11px] font-bold"
            style={{
              fontFamily: FONT_MONO,
              color: "#1a2332",
              letterSpacing: "0.42em",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
          {side === "left" && (
            <span style={{ color: "var(--primary)" }}>
              <Diamond size={6} />
            </span>
          )}
        </div>
        <span
          className="block h-px w-12"
          style={{
            background:
              side === "left"
                ? "linear-gradient(to right, transparent, var(--primary))"
                : "linear-gradient(to left, transparent, var(--primary))",
          }}
        />
      </div>
    </aside>
  );

  const content = (
    <div className="relative">
      <div className="mb-5 sm:hidden">
        <Standfirst label={label} align={side} />
      </div>
      <p
        className="text-base leading-[1.95] sm:text-[18px] sm:leading-[1.85]"
        style={{
          fontFamily: FONT_BODY,
          color: "#2a3444",
          fontWeight: 400,
        }}
      >
        <span
          className="float-left mr-3 mt-2"
          style={{
            fontFamily: FONT_EDITORIAL,
            fontSize: "68px",
            lineHeight: "0.85",
            color: "var(--primary)",
            fontWeight: 400,
          }}
        >
          {firstChar}
        </span>
        {rest}
      </p>
    </div>
  );

  return (
    <section className="story-chapter relative py-10 sm:py-14">
      <div
        className={`story-anim grid gap-x-8 ${
          side === "left"
            ? "sm:grid-cols-[170px_minmax(0,1fr)]"
            : "sm:grid-cols-[minmax(0,1fr)_170px]"
        }`}
      >
        {side === "left" ? (
          <>
            {margin}
            {content}
          </>
        ) : (
          <>
            {content}
            {margin}
          </>
        )}
      </div>
    </section>
  );
}

function CinematicBreak({ text, label }: { text: string; label: string }) {
  return (
    <section
      className="story-chapter relative my-10 overflow-hidden rounded-2xl px-7 py-14 sm:my-12 sm:px-12 sm:py-20"
      style={{
        background:
          "linear-gradient(135deg, rgba(30,109,181,0.06) 0%, rgba(8,145,178,0.06) 100%)",
        border: "1px solid rgba(30,109,181,0.14)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(30,109,181,0.18) 0.6px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute -left-16 -top-12 h-56 w-56 rounded-full bg-primary/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-16 h-56 w-56 rounded-full bg-accent-teal/[0.04] blur-3xl" />

      <div className="relative">
        <div className="story-anim">
          <Standfirst label={label} align="center" />
        </div>
        <p
          className="story-anim mx-auto mt-9 max-w-3xl text-center text-2xl leading-[1.5] sm:text-[30px] sm:leading-[1.4] lg:text-[36px] lg:leading-[1.28]"
          style={{
            fontFamily: FONT_EDITORIAL,
            fontWeight: 400,
            color: "#0f172a",
            letterSpacing: "-0.016em",
          }}
        >
          {text}
        </p>
        <div className="story-anim mt-9 flex items-center justify-center gap-1.5">
          <span className="h-px w-6 bg-foreground/15" />
          <Diamond size={5} color="var(--primary)" />
          <span className="h-px w-6 bg-foreground/15" />
        </div>
      </div>
    </section>
  );
}

function Closing({ text, label }: { text: string; label: string }) {
  return (
    <section
      className="story-closing story-chapter relative my-12 overflow-hidden rounded-3xl px-8 py-20 text-center sm:my-16 sm:px-16 sm:py-24"
      style={{
        background: "linear-gradient(135deg, #0a1428 0%, #1E6DB5 60%, #0891b2 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="story-anim relative">
        <Standfirst label={label} align="center" variant="dark" />
      </div>
      <p
        className="story-anim relative mx-auto mt-9 max-w-3xl text-2xl leading-[1.42] text-white sm:text-[34px] sm:leading-[1.3] lg:text-[42px] lg:leading-[1.22]"
        style={{
          fontFamily: FONT_EDITORIAL,
          fontWeight: 400,
          letterSpacing: "-0.018em",
        }}
      >
        {text}
      </p>
      <div className="story-anim relative mt-10 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-white/40" />
        <span
          className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/65"
          style={{ fontFamily: FONT_MONO }}
        >
          WGroup
        </span>
        <span className="h-px w-10 bg-white/40" />
      </div>
    </section>
  );
}

export default function OurStoryPage() {
  const t = useTranslations("socialResponsibility");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".story-chapter").forEach((chapter) => {
        const items = chapter.querySelectorAll<HTMLElement>(".story-anim");
        if (!items.length) return;
        gsap.from(items, {
          y: 36,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: chapter,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(".story-cta", {
        y: 40,
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".story-cta",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout
      title={t("title")}
      subtitle={t("subtitle")}
      titleHighlight={t("titleHighlight")}
      heroImage="/w-new/wn10.webp"
    >
      <div ref={sectionRef}>
        <HeroStatement text={t("p1")} label={t("labelBelief")} />
        <Fragment text={t("p2")} label={t("labelMoment")} side="left" />
        <Fragment text={t("p3")} label={t("labelVision")} side="right" />
        <CinematicBreak text={t("p4")} label={t("labelOrigin")} />
        <Fragment text={t("p5")} label={t("labelSynthesis")} side="left" />
        <Fragment text={t("p6")} label={t("labelToday")} side="right" />
        <Closing text={t("p7")} label={t("labelCoda")} />

        <div
          className="story-cta relative mt-4 overflow-hidden rounded-3xl px-8 py-20 sm:px-16 sm:py-24"
          style={{ background: "#0a0f1e" }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-[300px] w-[300px] rounded-full bg-primary/15 blur-[100px]" />
            <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent-purple/10 blur-[120px]" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <p
              className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary"
              style={{ fontFamily: FONT_MONO }}
            >
              {t("ctaEyebrow")}
            </p>
            <h2
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: FONT_BODY }}
            >
              {t("ctaTitle")}{" "}
              <span
                className="text-primary"
                style={{ fontFamily: FONT_EDITORIAL, fontWeight: 400 }}
              >
                {t("ctaHighlight")}
              </span>
            </h2>
            <p
              className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/50"
              style={{ fontFamily: FONT_BODY }}
            >
              {t("ctaDesc")}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact" className="group">
                <MorphButton
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-background shadow-lg transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl sm:text-base"
                  style={{ fontFamily: FONT_BODY, fontWeight: 600 }}
                  fillColor="#0a0f1e"
                  textColor="#0a0f1e"
                  textColorHover="#ffffff"
                >
                  <span className="flex items-center gap-2">
                    {t("contactCta")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </MorphButton>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12] sm:text-base"
                style={{ fontFamily: FONT_BODY, fontWeight: 600 }}
              >
                {t("ctaLearnMore")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
