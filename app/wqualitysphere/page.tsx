"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, CheckCircle2, Wrench, Handshake, ArrowRight } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

const blocks = [
  { key: "servicesTitle", icon: Wrench, color: "#1E6DB5" },
  { key: "whyTitle", icon: CheckCircle2, color: "#0d9488" },
  { key: "letsWorkTogether", icon: Handshake, color: "#6366f1" },
] as const;

function QualityCard({
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
        rotateX: ((y - centerY) / centerY) * -6,
        rotateY: ((x - centerX) / centerX) * 6,
        transformPerspective: 800,
        scale: 1.03,
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
      className="wq-block"
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

        <div className="relative z-10 flex items-center gap-5" style={{ transform: "translateZ(15px)" }}>
          <div
            className="wq-icon flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${color}15` }}
          >
            <Icon className="h-7 w-7" style={{ color }} />
          </div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default function WQualitySpherePage() {
  const t = useTranslations("wqualitysphere");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wq-block", {
        y: 60,
        opacity: 0,
        rotationX: -12,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".wq-block",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".wq-icon").forEach((icon) => {
        gsap.to(icon, {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.from(".wq-cta", {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".wq-cta",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout title={t("title")} subtitle={t("subtitle")} heroImage="/images/brands/wqualitysphere.webp">
      <div ref={sectionRef}>
        <div className="page-content-block mb-10 flex justify-center">
          <div
            className="inline-flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: "rgba(30,109,181,0.1)" }}
          >
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div
          className="wq-block mb-10 relative overflow-hidden rounded-2xl p-8 shadow-xl"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(30,109,181,0.08), rgba(255,255,255,0.03))",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)",
          }}
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <p className="relative z-10 text-lg leading-relaxed text-muted">{t("p1")}</p>
        </div>

        <div className="space-y-6">
          {blocks.map(({ key, icon, color }) => (
            <QualityCard key={key} icon={icon} color={color} title={t(key)} />
          ))}
        </div>

        <div className="wq-cta mt-14 text-center">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-10 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <span className="relative z-10">{t("getStarted")}</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
