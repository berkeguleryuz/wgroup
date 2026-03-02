"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Mail, ArrowRight, Users, Sparkles, Globe, GraduationCap } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: Users, color: "#1E6DB5", key: "p1" },
  { icon: Globe, color: "#0891b2", key: "p2" },
  { icon: Sparkles, color: "#6366f1", key: "p3" },
  { icon: GraduationCap, color: "#0d9488", key: "p4" },
  { icon: Briefcase, color: "#f59e0b", key: "p5" },
];

function HighlightCard({
  icon: Icon,
  color,
  text,
}: {
  icon: React.ElementType;
  color: string;
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
      className="career-card"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl p-7 shadow-xl transition-shadow duration-500 will-change-transform hover:shadow-2xl"
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
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
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

        <div className="relative z-10 flex gap-5" style={{ transform: "translateZ(15px)" }}>
          <div
            className="career-icon flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${color}15` }}
          >
            <Icon className="h-6 w-6" style={{ color }} />
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
      gsap.from(".career-card", {
        y: 60,
        opacity: 0,
        rotationX: -10,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".career-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".career-icon").forEach((icon) => {
        gsap.to(icon, {
          y: -4,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
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
    <PageLayout title={t("title")} subtitle={t("subtitle")} heroImage="/images/company/career.webp">
      <div ref={sectionRef}>
        <div className="space-y-5">
          {highlights.map(({ icon, color, key }) => (
            <HighlightCard key={key} icon={icon} color={color} text={t(key)} />
          ))}
        </div>

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
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <p className="mb-4 text-lg font-bold text-white">{t("contactLabel")}</p>
            <a
              href={`mailto:${t("contactEmail")}`}
              className="group inline-flex items-center gap-3 rounded-full bg-white/10 px-8 py-3 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              {t("contactEmail")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
