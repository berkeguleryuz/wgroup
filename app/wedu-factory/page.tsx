"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, BookOpen, Users, Award, Lightbulb, ArrowRight } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { icon: BookOpen, color: "#1E6DB5", key: "p1" },
  { icon: Users, color: "#0891b2", key: "p2" },
  { icon: GraduationCap, color: "#6366f1", key: "p3" },
  { icon: Award, color: "#0d9488", key: "p4" },
  { icon: Lightbulb, color: "#f59e0b", key: "p5" },
];

function ContentCard({
  icon: Icon,
  color,
  text,
  reverse = false,
}: {
  icon: React.ElementType;
  color: string;
  text: string;
  reverse?: boolean;
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
      className="wf-block"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl p-7 shadow-xl will-change-transform hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          background: `linear-gradient(${reverse ? '225deg' : '135deg'}, rgba(255,255,255,0.04), ${color}10, rgba(255,255,255,0.03))`,
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)",
        }}
      >
        {/* Corner glow - position depends on direction */}
        <div
          className={`pointer-events-none absolute ${reverse ? '-left-12 -top-12' : '-right-12 -top-12'} h-40 w-40 rounded-full blur-3xl`}
          style={{ background: `${color}15` }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0 blur-3xl"
          style={{ background: `${color}20` }}
        />

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className={`relative z-10 flex gap-5 ${reverse ? 'flex-row-reverse text-right' : ''}`} style={{ transform: "translateZ(15px)" }}>
          <div
            className="wf-icon flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${color}15` }}
          >
            <Icon className="h-7 w-7" style={{ color }} />
          </div>
          <p className="text-lg leading-relaxed text-muted">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function WeduFactoryPage() {
  const t = useTranslations("weduFactory");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wf-block", {
        y: 60,
        opacity: 0,
        rotationX: -12,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".wf-block",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".wf-icon").forEach((icon) => {
        gsap.to(icon, {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.from(".wf-why", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".wf-why",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".wf-cta", {
        y: 30,
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".wf-cta",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout title={t("title")} eyebrow={t("eyebrow")} titleHighlight={t("titleHighlight")} heroImage="/images/brands/wedu-factory.webp">
      <div ref={sectionRef}>
        <div className="space-y-2">
          {sections.map(({ icon, color, key }, i) => (
            <div key={key}>
              <ContentCard
                icon={icon}
                color={color}
                text={t(key)}
                reverse={i % 2 === 1}
              />
              {/* Gradient divider between cards (not after last) */}
              {i < sections.length - 1 && (
                <div className="mx-auto my-4 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Why section with corner brackets */}
        <div className="wf-why relative mt-12 mb-8 mx-auto max-w-2xl p-10">
          {/* Corner brackets */}
          <span className="pointer-events-none absolute left-0 top-0 h-6 w-6" style={{ borderTop: "2px solid var(--primary)", borderLeft: "2px solid var(--primary)" }} />
          <span className="pointer-events-none absolute right-0 top-0 h-6 w-6" style={{ borderTop: "2px solid var(--primary)", borderRight: "2px solid var(--primary)" }} />
          <span className="pointer-events-none absolute left-0 bottom-0 h-6 w-6" style={{ borderBottom: "2px solid var(--primary)", borderLeft: "2px solid var(--primary)" }} />
          <span className="pointer-events-none absolute right-0 bottom-0 h-6 w-6" style={{ borderBottom: "2px solid var(--primary)", borderRight: "2px solid var(--primary)" }} />

          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            {t("whyTitle")}
          </h2>
          <p className="mt-3 text-center text-base text-muted">
            {t("letsWorkTogether")}
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/products/automotive-professionals"
            className="wf-cta group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-10 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <span className="relative z-10">{t("checkIndividual")}</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
          <Link
            href="/products/automotive-professionals-corporate"
            className="wf-cta group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/10 px-10 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
          >
            <span>{t("checkCorporate")}</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
