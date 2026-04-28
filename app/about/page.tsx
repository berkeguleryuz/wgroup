"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import Lottie from "lottie-react";
import PageLayout from "@/components/layout/PageLayout";
import { ArrowRight } from "@/components/icons";
import MorphButton from "@/components/ui/MorphButton";

const statLotties = [
  "/lottie/lightbulb.json",
  "/lottie/calendar.json",
  "/lottie/trending-up.json",
  "/lottie/target.json",
] as const;

const BRAND_PILLS: { name: string; color: string; tint: string }[] = [
  { name: "WQuality", color: "var(--primary)", tint: "rgba(30, 109, 181, 0.1)" },
  { name: "WDigiLab", color: "var(--accent-teal)", tint: "rgba(8, 145, 178, 0.1)" },
  { name: "WStudio", color: "var(--accent-purple)", tint: "rgba(99, 102, 241, 0.1)" },
];

/* ---------- Render p3 paragraph with brand-name highlight pills ---------- */
function renderWithBrandPills(text: string) {
  const pattern = new RegExp(
    `(${BRAND_PILLS.map((b) => b.name).join("|")})`,
    "g"
  );
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const brand = BRAND_PILLS.find((b) => b.name === part);
    if (!brand) return <span key={i}>{part}</span>;
    return (
      <span
        key={i}
        className="mx-[1px] inline-block rounded-md px-2 py-[2px] font-bold"
        style={{
          background: brand.tint,
          color: brand.color,
          fontFamily: "var(--font-barlow), system-ui, sans-serif",
          letterSpacing: "-0.005em",
        }}
      >
        {part}
      </span>
    );
  });
}

/* ---------- Corner bracket ---------- */
function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const color = "rgba(30,109,181,0.4)";
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    tr: { top: 0, right: 0, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` },
    bl: { bottom: 0, left: 0, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    br: { bottom: 0, right: 0, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
  };
  return <span className="pointer-events-none absolute h-6 w-6" style={styles[position]} />;
}

/* ---------- 3D tilt stat card with Lottie + corner brackets ---------- */
function StatItem({
  lottie,
  value,
  label,
}: {
  lottie: string;
  value: string;
  label: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lottieWrapRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch(lottie)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {});
  }, [lottie]);

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
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
        overwrite: "auto",
      });

      if (lottieWrapRef.current) {
        gsap.to(lottieWrapRef.current, {
          scale: 1.15,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
      force3D: true,
    });
    if (lottieWrapRef.current) {
      gsap.to(lottieWrapRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div
      className="about-stat"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative h-full p-8 text-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <CornerBracket position="tl" />
        <CornerBracket position="tr" />
        <CornerBracket position="bl" />
        <CornerBracket position="br" />

        <div
          ref={lottieWrapRef}
          className="stat-icon mx-auto mb-4 h-14 w-14"
          style={{ transform: "translateZ(30px)" }}
        >
          {animationData && (
            <Lottie animationData={animationData} loop autoplay className="h-full w-full" />
          )}
        </div>
        <div style={{ transform: "translateZ(20px)" }}>
          <p className="text-3xl font-extrabold text-foreground">{value}</p>
          <p className="mt-1 text-sm font-medium text-muted">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-stat", {
        y: 80,
        rotationX: -15,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".about-stat",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-paragraph", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-paragraph",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-cta", {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".about-cta",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout title={t("title")} subtitle={t("p1")} eyebrow={t("eyebrow")} titleHighlight={t("titleHighlight")} heroImage="/w-new/w1.webp">
      <div ref={sectionRef}>
        {/* Stats grid */}
        <div className="page-content-block mb-16 grid grid-cols-3 gap-6">
          {[
            { value: "40+", label: t("statCountries") },
            { value: "2015", label: t("statFounded") },
            { value: "500+", label: t("statClients") },
          ].map((stat, i) => (
            <StatItem
              key={i}
              lottie={statLotties[i]}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>

        {/* Content — editorial spread: large lead statement + structured body with brand pills */}
        <div className="page-content-block">
          {/* p2 — display lead, restrained typography */}
          <div className="about-paragraph relative mx-auto max-w-[58ch]">
            <span
              aria-hidden
              className="mb-7 inline-block text-2xl leading-none"
              style={{
                color: "var(--primary)",
                fontFamily: "var(--font-instrument), Georgia, serif",
                fontStyle: "italic",
              }}
            >
              &lowast;
            </span>

            <p
              className="text-[26px] leading-[1.4] tracking-[-0.015em] sm:text-[34px] sm:leading-[1.32] lg:text-[38px]"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                color: "#0f172a",
                fontWeight: 500,
              }}
            >
              {t("p2")}
            </p>
          </div>

          {/* divider — generous space, single hairline */}
          <div className="about-paragraph mx-auto my-16 flex max-w-[58ch] items-center gap-4 sm:my-20">
            <span className="h-px flex-1 bg-[rgba(15,23,42,0.08)]" />
            <span className="flex items-center gap-1.5" aria-hidden>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--primary)" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent-teal)" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent-purple)" }}
              />
            </span>
            <span className="h-px flex-1 bg-[rgba(15,23,42,0.08)]" />
          </div>

          {/* p3 — body with inline brand pills */}
          <div className="about-paragraph relative mx-auto max-w-[58ch]">
            <p
              className="text-base leading-[1.95] sm:text-[18px] sm:leading-[1.85]"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                color: "#3a4a5c",
              }}
            >
              {renderWithBrandPills(t("p3"))}
            </p>
          </div>
        </div>

        {/* Global CTA */}
        <div className="about-cta relative mt-16 overflow-hidden rounded-3xl px-8 py-20 sm:px-16 sm:py-24" style={{ background: "#0a0f1e" }}>
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
              className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
            >
              {t("ctaEyebrow")}
            </p>
            <h2
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
            >
              {t("ctaTitle")}{" "}
              <span
                className="text-primary"
                style={{ fontFamily: "var(--font-instrument), Georgia, serif", fontStyle: "italic" }}
              >
                {t("ctaHighlight")}
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/50">
              {t("ctaDesc")}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact" className="group">
                <MorphButton
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-background shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-0.5 sm:text-base"
                  style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", fontWeight: 600 }}
                  fillColor="#0a0f1e"
                  textColor="#0a0f1e"
                  textColorHover="#ffffff"
                >
                  <span className="flex items-center gap-2">
                    {t("contactUs")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </MorphButton>
              </Link>
              <Link
                href="/our-divisions"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.12] hover:border-white/30 sm:text-base"
                style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif", fontWeight: 600 }}
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
