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

/* ---- Hero Brain Image — full-bleed background cover ---- */
function BrainVisual() {
  return (
    <div className="brain-visual pointer-events-none absolute inset-0">
      <img
        src="/w/hero.jpg"
        alt=""
        className="brain-img h-full w-full object-cover opacity-40"
        style={{ filter: "brightness(0.7)" }}
      />
      {/* Dark overlay to keep text legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,11,24,0.5) 0%, rgba(6,11,24,0.7) 100%)",
        }}
      />
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("#video-frame", {
        clipPath: "polygon(0 0, 100% 0%, 100% 75%, 0 100%)",
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

      gsap.from(".brain-img", {
        scale: 1.1,
        opacity: 0,
        duration: 2.5,
        ease: "power2.out",
        delay: 0.3,
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
          className="pointer-events-none absolute inset-0 opacity-2"
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
            className="hero-line-2 mt-2 text-center text-[clamp(2.5rem,7vw,5.5rem)] leading-none text-white"
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
              className="group inline-flex h-14 items-center gap-2 rounded-full border border-white/20 bg-white/6 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/12 sm:text-base"
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


      <h1 className="pointer-events-none absolute bottom-5 right-2 z-5 select-none text-[8vw] font-black tracking-tight text-white">
        WGroup
      </h1>
    </div>
  );
}
