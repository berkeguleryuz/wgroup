"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Globe, Sparkles, GraduationCap, Briefcase, ArrowRight } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: Users, key: "p1" },
  { icon: Globe, key: "p2" },
  { icon: Sparkles, key: "p3" },
  { icon: GraduationCap, key: "p4" },
  { icon: Briefcase, key: "p5" },
];

function FeaturedCard({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      gsap.to(cardRef.current, {
        rotateX: ((y - centerY) / centerY) * -5,
        rotateY: ((x - centerX) / centerX) * 5,
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
          opacity: 0.6,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    },
    []
  );

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
      className="career-block"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl p-8 sm:p-10 shadow-xl will-change-transform hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, rgba(30,109,181,0.07), rgba(255,255,255,0.05), rgba(30,109,181,0.04))",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 15px 50px -10px rgba(0,0,0,0.4)",
        }}
      >
        {/* Corner glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-primary/8 blur-3xl" />

        {/* Mouse glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0 blur-3xl"
          style={{ background: "rgba(30,109,181,0.15)" }}
        />

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10" style={{ transform: "translateZ(15px)" }}>
          {/* Icon with CSS shimmer */}
          <div className="career-icon relative mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-primary/10">
            <Icon className="relative z-10 h-8 w-8 text-primary" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(105deg, transparent 30%, rgba(30,109,181,0.25) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: "iconShimmer 3s ease-in-out infinite",
              }}
            />
          </div>
          <p className="text-lg leading-relaxed text-muted">{text}</p>
        </div>
      </div>
    </div>
  );
}

function GridCard({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      gsap.to(cardRef.current, {
        rotateX: ((y - centerY) / centerY) * -5,
        rotateY: ((x - centerX) / centerX) * 5,
        transformPerspective: 800,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    []
  );

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
  }, []);

  return (
    <div
      className="career-block"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="group relative h-full overflow-hidden rounded-2xl p-6 shadow-xl will-change-transform hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(30,109,181,0.06), rgba(255,255,255,0.03))",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)",
        }}
      >
        {/* Corner glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div
          className="relative z-10 flex flex-col items-center text-center"
          style={{ transform: "translateZ(15px)" }}
        >
          {/* Icon with CSS shimmer */}
          <div className="career-icon relative mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
            <Icon className="relative z-10 h-7 w-7 text-primary" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(105deg, transparent 30%, rgba(30,109,181,0.25) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: "iconShimmer 3s ease-in-out infinite",
              }}
            />
          </div>
          <p className="text-base leading-relaxed text-muted">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function CareerPage() {
  const t = useTranslations("career");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".career-block", {
        y: 60,
        opacity: 0,
        rotationX: -12,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".career-block",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".career-cta", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".career-cta",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout title={t("title")} subtitle={t("subtitle")} eyebrow={t("eyebrow")} titleHighlight={t("titleHighlight")} heroImage="/images/company/career.webp">
      <div ref={sectionRef} className="space-y-6">
        {/* Featured first card */}
        <FeaturedCard icon={highlights[0].icon} text={t(highlights[0].key)} />

        {/* Gradient divider */}
        <div className="mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* 2x2 Grid for remaining cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {highlights.slice(1).map(({ icon, key }) => (
            <GridCard key={key} icon={icon} text={t(key)} />
          ))}
        </div>

        {/* CTA banner — links to contact page */}
        <div
          className="career-cta relative mt-14 overflow-hidden rounded-2xl p-10 text-center shadow-xl"
          style={{
            background: "linear-gradient(135deg, #1E6DB5, #0891b2)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10">
            <p className="mb-6 text-lg font-bold text-white">{t("contactLabel")}</p>
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white/10 px-8 py-3 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <span className="relative z-10">{t("contactCta")}</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>

        {/* Keyframes */}
        <style jsx global>{`
          @keyframes iconShimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    </PageLayout>
  );
}
