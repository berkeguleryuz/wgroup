"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   BentoTilt – RAF-based 3D tilt
   ============================================================ */
function BentoTilt({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width;
        const relY = (e.clientY - rect.top) / rect.height;
        const tiltX = (relY - 0.5) * 5;
        const tiltY = (relX - 0.5) * -5;
        cardRef.current.style.transform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;
        cardRef.current.style.willChange = "transform";
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cancelAnimationFrame(rafRef.current);
    cardRef.current.style.transform = "";
    cardRef.current.style.willChange = "auto";
  }, []);

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="h-full w-full transition-transform duration-200"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   BentoCard – dark glass card
   ============================================================ */
function BentoCard({
  title,
  description,
  accentColor,
  children,
}: {
  title: string;
  description?: string;
  accentColor: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="bento-card group relative h-full overflow-hidden rounded-2xl p-6 shadow-lg transition-shadow duration-500 hover:shadow-2xl lg:p-8"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* accent glow blob */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[80px]"
        style={{ background: `${accentColor}12` }}
      />

      {/* hover shimmer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* bottom shine line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {children}

      {/* text content */}
      <div className="relative z-10 flex h-full flex-col justify-end">
        <h3 className="text-xl font-bold text-white lg:text-2xl">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-white/50">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Features Section – dark (Apres-inspired)
   ============================================================ */
export default function Features() {
  const t = useTranslations("features");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-card", {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0d1424] py-28"
    >
      {/* subtle bg pattern */}
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
          title="Expl<b>o</b>re Our<br />Capabilit<b>i</b>es"
          containerClass="mb-6 text-center !text-white"
        />
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-white/50">
          {t("subtitle")}
        </p>

        {/* bento grid */}
        <div className="bento-grid grid auto-rows-[280px] grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {/* large card – Automotive Professionals */}
          <BentoTilt className="md:col-span-2 md:row-span-2">
            <div
              className="bento-card group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl p-6 lg:p-8"
              style={{
                background: "linear-gradient(135deg, #0a0f1e, #131a2e)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-[80px]" />
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/home/feature-main.webp"
                  alt="Automotive Professionals"
                  fill
                  className="object-cover opacity-20 transition-opacity duration-700 group-hover:opacity-30"
                  sizes="50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white lg:text-2xl">{t("card1Title")}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{t("card1Desc")}</p>
              </div>
            </div>
          </BentoTilt>

          {/* Quality Management */}
          <BentoTilt className="md:col-span-2">
            <BentoCard title={t("card2Title")} description={t("card2Desc")} accentColor="#0d9488" />
          </BentoTilt>

          {/* Digital Academy */}
          <BentoTilt>
            <BentoCard title={t("card3Title")} description={t("card3Desc")} accentColor="#6366f1">
              <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
                <span className="text-xl font-black text-white/15">W</span>
              </div>
            </BentoCard>
          </BentoTilt>

          {/* Innovation Lab – gradient card */}
          <BentoTilt>
            <div
              className="bento-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 lg:p-8"
              style={{
                background: "linear-gradient(135deg, #1E6DB5, #6366f1)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:bg-white/15" />
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/home/digitalization.webp"
                  alt="Innovation Lab"
                  fill
                  className="object-cover opacity-15 mix-blend-overlay"
                  sizes="25vw"
                />
              </div>
              <h3 className="relative z-10 max-w-48 text-xl font-bold text-white lg:text-2xl">
                {t("card4Title")}
              </h3>
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </BentoTilt>

          {/* Global Consulting */}
          <BentoTilt className="md:col-span-2">
            <BentoCard title={t("card5Title")} description={t("card5Desc")} accentColor="#0891b2" />
          </BentoTilt>

          {/* Software Solutions */}
          <BentoTilt className="md:col-span-2">
            <BentoCard title={t("card6Title")} description={t("card6Desc")} accentColor="#f59e0b">
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/[0.03]" />
                <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full border border-white/[0.02]" />
              </div>
            </BentoCard>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
}
