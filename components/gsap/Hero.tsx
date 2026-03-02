"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

/* ---------- floating stat card (glass) ---------- */
function StatCard({
  label,
  value,
  index,
}: {
  label: string;
  value: string;
  index: number;
}) {
  return (
    <div
      className={`floating-stat group relative overflow-hidden rounded-2xl px-6 py-5 backdrop-blur-xl shadow-lg transition-transform duration-300 hover:scale-105`}
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
      <p className="floating-stat-header text-sm font-medium text-white/60">
        {label}
      </p>
      <p className="floating-stat-body mt-1 text-xl font-extrabold text-white">
        {value}
      </p>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLDivElement>(null);

  const title = t("title");
  const words = title.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* clipPath scroll animation */
      gsap.set("#video-frame", {
        clipPath: "polygon(28% 0%, 76% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0 0 50% 50%",
      });
      gsap.from("#video-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0 0 0 0",
        ease: "none",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "center center",
          end: "bottom center",
          scrub: 0.5,
          fastScrollEnd: true,
        },
      });

      /* entry animation timeline */
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(".hero-title-word", {
        y: 100,
        opacity: 0,
        rotationX: -80,
        stagger: 0.08,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      tl.from(
        ".hero-tagline",
        { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      tl.from(
        ".hero-description",
        { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

      tl.from(
        ".hero-cta",
        {
          y: 20,
          opacity: 0,
          scale: 0.9,
          stagger: 0.15,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );

      /* floating stat cards */
      gsap.from(".floating-stat", {
        x: 120,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.8,
      });

      /* scroll indicator bounce */
      gsap.to(".scroll-indicator", {
        y: 8,
        duration: 1.2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* parallax background text */
      gsap.to(".hero-big", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* stat text color transition */
      gsap.to(".floating-stat-header", {
        color: "var(--foreground)",
        ease: "none",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".floating-stat-body", {
        color: "var(--foreground)",
        ease: "none",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative h-dvh w-screen overflow-x-hidden">
      {/* full-viewport video frame */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-[#060b18]"
      >
        {/* animated fallback background */}
        <div className="pointer-events-none absolute inset-0">
          {/* Animated gradient blobs */}
          <div className="absolute inset-0 bg-[#060b18]" />
          <div className="hero-blob absolute -left-32 top-0 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
          <div
            className="hero-blob absolute right-0 top-1/4 h-[700px] w-[700px] rounded-full bg-[#6366f1]/15 blur-[140px]"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          />
          <div
            className="hero-blob absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[#0891b2]/10 blur-[100px]"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          />
          <div
            className="hero-blob absolute top-1/2 right-1/4 h-[400px] w-[400px] rounded-full bg-[#f59e0b]/5 blur-[120px]"
            style={{ animationDelay: "3s", animationDuration: "6s" }}
          />
          {/* mesh grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Hero background image */}
          <div className="absolute inset-0">
            <img
              src="/images/home/hero-poster.webp"
              alt=""
              className="h-full w-full object-cover opacity-[0.12]"
            />
          </div>
          {/* gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060b18]/80 via-[#060b18]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060b18]/50 via-transparent to-transparent" />
        </div>

        {/* parallax background text */}
        <h1 className="hero-big pointer-events-none absolute bottom-5 right-5 z-40 select-none text-[8vw] font-black tracking-tight text-white/[0.04] sm:right-20 lg:right-40 lg:text-[6vw]">
          WGroup
        </h1>

        {/* foreground content */}
        <div className="absolute left-0 top-0 z-40 flex size-full items-center">
          <div className="px-5 sm:px-10 lg:px-16">
            {/* tagline above title */}
            <p className="hero-tagline mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/60 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Innovation &middot; Quality &middot; Excellence
            </p>

            {/* title */}
            <h1
              className="mb-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl"
              style={{ perspective: "800px" }}
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  className="hero-title-word mr-[0.25em] inline-block will-change-transform"
                  style={{
                    transformStyle: "preserve-3d",
                    display: "inline-block",
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* description */}
            <p className="hero-description mb-10 max-w-lg text-base leading-relaxed text-white/50 sm:text-lg">
              {t("subtitle")}
            </p>

            {/* CTA buttons - pill shaped like Apres */}
            <div className="pointer-events-auto flex flex-col gap-4 sm:flex-row">
              <Link
                href="/about"
                className="hero-cta group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[#0891b2] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                <span className="relative z-10">{t("aboutUs")}</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <Link
                href="/contact"
                className="hero-cta inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.12] hover:-translate-y-0.5"
              >
                {t("contactUs")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* right-side floating stat cards */}
      <div className="absolute right-8 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
        <StatCard label={t("statGlobalLabel")} value={t("statGlobalValue")} index={0} />
        <StatCard label={t("statExpertLabel")} value={t("statExpertValue")} index={1} />
        <StatCard label={t("statAutoLabel")} value={t("statAutoValue")} index={2} />
      </div>

      {/* decorative text below video */}
      <h1 className="pointer-events-none absolute bottom-5 right-5 z-[5] select-none text-[8vw] font-black tracking-tight text-foreground/[0.03]">
        Excellence
      </h1>

      {/* scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs font-medium uppercase tracking-widest">
            {t("scrollText")}
          </span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
