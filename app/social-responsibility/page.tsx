"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Leaf, Globe } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  { key: "genderEquality", icon: Heart, color: "#e11d48" },
  { key: "sustainability", icon: Leaf, color: "#16a34a" },
  { key: "environment", icon: Globe, color: "#0891b2" },
] as const;

function PillarCard({
  icon: Icon,
  color,
  title,
  description,
}: {
  icon: React.ElementType;
  color: string;
  title: string;
  description: string;
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
        rotateX: ((y - centerY) / centerY) * -6,
        rotateY: ((x - centerX) / centerX) * 6,
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
      className="sr-card"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl p-8 shadow-xl transition-shadow duration-500 will-change-transform hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          background: `linear-gradient(135deg, rgba(255,255,255,0.04), ${color}10, rgba(255,255,255,0.03))`,
          backdropFilter: "blur(12px)",
          border: `1px solid rgba(255,255,255,0.07)`,
          boxShadow: `0 10px 40px -10px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Corner glow */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
          style={{ background: `linear-gradient(135deg, ${color}15, transparent)` }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0 blur-3xl"
          style={{ background: `${color}20` }}
        />

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex gap-6" style={{ transform: "translateZ(15px)" }}>
          <div
            className="sr-icon flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${color}15` }}
          >
            <Icon className="h-7 w-7" style={{ color }} />
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold text-foreground">{title}</h2>
            <p className="leading-relaxed text-muted">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SocialResponsibilityPage() {
  const t = useTranslations("socialResponsibility");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sr-card", {
        y: 60,
        opacity: 0,
        rotationX: -12,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".sr-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".sr-icon").forEach((icon) => {
        gsap.to(icon, {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.from(".sr-conclusion", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".sr-conclusion",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout title={t("title")} subtitle={t("subtitle")} heroImage="/images/company/social-responsibility.webp">
      <div ref={sectionRef}>
        <p className="page-content-block mb-12 text-lg leading-relaxed text-muted">
          {t("description")}
        </p>

        <div className="space-y-6">
          {PILLARS.map(({ key, icon, color }) => (
            <PillarCard
              key={key}
              icon={icon}
              color={color}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
            />
          ))}
        </div>

        <div
          className="sr-conclusion relative mt-12 overflow-hidden rounded-2xl p-10 shadow-xl"
          style={{
            background: "linear-gradient(135deg, #1E6DB5, #0891b2)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <p className="relative z-10 text-center text-lg leading-relaxed text-white/90">
            {t("conclusion")}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
