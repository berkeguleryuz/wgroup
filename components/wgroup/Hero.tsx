"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import MorphButton from "@/components/ui/MorphButton";

gsap.registerPlugin(ScrollTrigger);

/* ---- Animated Brain Visual (Left=Analytical, Right=Creative) ---- */
function BrainVisual() {
  return (
    <div className="brain-visual pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] lg:h-[700px] lg:w-[700px]">
        {/* Left hemisphere - Analytical (blue, geometric) */}
        <div className="brain-left absolute left-0 top-1/2 h-[85%] w-[50%] -translate-y-1/2 overflow-hidden rounded-l-full">
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(ellipse at 70% 50%, rgba(30,109,181,0.25) 0%, rgba(30,109,181,0.08) 50%, transparent 80%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(30,109,181,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30,109,181,0.4) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="brain-node absolute left-[20%] top-[25%] h-2 w-2 rounded-full bg-primary/60" />
          <div className="brain-node absolute left-[40%] top-[45%] h-3 w-3 rounded-full bg-primary/40" />
          <div className="brain-node absolute left-[15%] top-[65%] h-2 w-2 rounded-full bg-primary/50" />
          <div className="brain-node absolute left-[55%] top-[30%] h-1.5 w-1.5 rounded-full bg-accent-teal/60" />
          <div className="brain-node absolute left-[35%] top-[75%] h-2.5 w-2.5 rounded-full bg-primary/30" />
        </div>

        {/* Right hemisphere - Creative (purple, organic) */}
        <div className="brain-right absolute right-0 top-1/2 h-[85%] w-[50%] -translate-y-1/2 overflow-hidden rounded-r-full">
          <div
            className="h-full w-full"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0.08) 50%, transparent 80%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.5) 2px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.4) 3px, transparent 3px), radial-gradient(circle at 50% 80%, rgba(99,102,241,0.3) 2px, transparent 2px)",
              backgroundSize: "60px 60px, 80px 80px, 50px 50px",
            }}
          />
          <div className="brain-blob absolute right-[20%] top-[20%] h-12 w-12 rounded-full bg-accent-purple/20 blur-md" />
          <div className="brain-blob absolute right-[40%] top-[50%] h-16 w-16 rounded-full bg-[#a855f7]/15 blur-lg" />
          <div className="brain-blob absolute right-[15%] top-[70%] h-10 w-10 rounded-full bg-accent-purple/20 blur-md" />
        </div>

        {/* Center divider line */}
        <div className="absolute left-1/2 top-[10%] h-[80%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

        {/* Outer glow ring */}
        <div
          className="brain-ring absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(30,109,181,0.15), rgba(99,102,241,0.15), rgba(30,109,181,0.15))",
            filter: "blur(40px)",
          }}
        />

        {/* Labels */}
        <span
          className="absolute left-[8%] top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary/40 sm:text-xs"
          style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
        >
          Analytical
        </span>
        <span
          className="absolute right-[8%] top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent-purple/40 sm:text-xs"
          style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
        >
          Creative
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.to(".brain-node", {
        scale: 1.5,
        opacity: 0.8,
        duration: 2,
        stagger: { each: 0.4, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });

      gsap.to(".brain-blob", {
        x: "random(-10, 10)",
        y: "random(-10, 10)",
        duration: 3,
        stagger: { each: 0.5, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });

      gsap.to(".brain-ring", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      gsap.from(".brain-left", {
        x: -30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".brain-right", {
        x: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4,
      });

      const tl = gsap.timeline({ delay: 0.6 });

      tl.from(".hero-line-1", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      tl.from(
        ".hero-line-2",
        { y: 50, opacity: 0, duration: 0.9, ease: "power3.out" },
        "-=0.6"
      );

      tl.from(
        ".hero-sub",
        { y: 30, opacity: 0, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      );

      tl.from(
        ".hero-cta-group",
        { y: 20, opacity: 0, scale: 0.95, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );

      tl.from(
        ".hero-scroll-hint",
        { opacity: 0, duration: 0.5 },
        "-=0.2"
      );

      gsap.to(".hero-scroll-hint", {
        y: 6,
        duration: 1.4,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".hero-content-wrapper", {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden bg-background"
      >
        <BrainVisual />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="hero-content-wrapper absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
          <h1
            className="hero-line-1 text-center text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            {t("titleLine1")}
          </h1>

          <h1
            className="hero-line-2 mt-2 text-center text-[clamp(2.5rem,7vw,5.5rem)] leading-[1] text-white"
            style={{
              fontFamily: "var(--font-instrument), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            {t("titleLine2")}
          </h1>

          <p
            className="hero-sub mt-8 max-w-lg text-center text-base text-white/60 sm:text-lg"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontWeight: 500,
            }}
          >
            {t("subtitle")}
          </p>

          <div className="hero-cta-group mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/about" className="group">
              <MorphButton
                className="inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-background shadow-lg shadow-white/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:shadow-white/20 sm:text-base"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontWeight: 600,
                }}
                fillColor="var(--background)"
                textColor="var(--background)"
                textColorHover="#ffffff"
              >
                <span className="flex items-center gap-2">
                  {t("aboutUs")}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </MorphButton>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex h-14 items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.12] sm:text-base"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              {t("contactUs")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>


      <h1 className="pointer-events-none absolute bottom-5 right-5 z-[5] select-none text-[8vw] font-black tracking-tight text-foreground/[0.03]">
        WGroup
      </h1>
    </div>
  );
}
