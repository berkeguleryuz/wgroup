"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Lightbulb, Handshake } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { key: "servicesTitle", icon: Code2, color: "#0891b2" },
  { key: "visualApproach", icon: Palette, color: "#6366f1" },
  { key: "innovation", icon: Lightbulb, color: "#f59e0b" },
  { key: "togetherSuccess", icon: Handshake, color: "#0d9488" },
] as const;

function ServiceCard({
  icon: Icon,
  color,
  title,
}: {
  icon: React.ElementType;
  color: string;
  title: string;
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
        rotateX: ((y - centerY) / centerY) * -8,
        rotateY: ((x - centerX) / centerX) * 8,
        transformPerspective: 800,
        scale: 1.04,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - 80,
          y: y - 80,
          opacity: 0.7,
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
      className="wc-card"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl p-8 text-center shadow-xl transition-shadow duration-500 will-change-transform hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          background: `linear-gradient(135deg, rgba(255,255,255,0.04), ${color}12, rgba(255,255,255,0.03))`,
          backdropFilter: "blur(12px)",
          border: `1px solid rgba(255,255,255,0.07)`,
          boxShadow: `0 10px 40px -10px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Corner glow */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
          style={{ background: `${color}15` }}
        />
        <div
          className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full blur-3xl opacity-50"
          style={{ background: `${color}10` }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[160px] w-[160px] rounded-full opacity-0 blur-3xl"
          style={{ background: `${color}20` }}
        />

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          <div
            className="wc-icon mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: `${color}15` }}
          >
            <Icon className="h-8 w-8" style={{ color }} />
          </div>
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default function WarticodePage() {
  const t = useTranslations("warticode");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wc-card", {
        y: 60,
        opacity: 0,
        rotationY: -15,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".wc-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".wc-icon").forEach((icon) => {
        gsap.to(icon, {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.from(".wc-cta", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".wc-cta",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout title={t("title")} subtitle={t("subtitle")} heroImage="/images/brands/warticode.webp">
      <div ref={sectionRef}>
        <p className="page-content-block mb-12 text-lg leading-relaxed text-muted">
          {t("p1")}
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map(({ key, icon, color }) => (
            <ServiceCard key={key} icon={icon} color={color} title={t(key)} />
          ))}
        </div>

        <div
          className="wc-cta relative mt-14 overflow-hidden rounded-2xl p-10 text-center shadow-xl"
          style={{
            background: "linear-gradient(135deg, #0891b2, #6366f1)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <p className="relative z-10 text-lg font-medium italic leading-relaxed text-white/90">
            {t("cta")}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
