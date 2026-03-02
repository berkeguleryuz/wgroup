"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "@/components/layout/PageLayout";
import {
  Globe,
  Award,
  Users,
  Target,
  ArrowRight,
} from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

/* ---------- 3D tilt stat card ---------- */
function StatItem({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(cardRef.current, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
        overwrite: "auto",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - 100,
          y: y - 100,
          opacity: 1,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    setIsHovered(false);
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
      force3D: true,
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  return (
    <div
      className="about-stat"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] p-8 text-center shadow-xl shadow-black/20 transition-shadow duration-300 will-change-transform hover:shadow-2xl hover:shadow-black/30"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* mouse-follow glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0"
          style={{
            background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          }}
        />

        {/* shimmer border */}
        <div
          className={`shimmer-border pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className="stat-icon mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl"
          style={{
            background: `${color}15`,
            transform: "translateZ(30px)",
          }}
        >
          <Icon className="h-7 w-7" style={{ color }} />
        </div>
        <div style={{ transform: "translateZ(20px)" }}>
          <p className="text-3xl font-extrabold text-foreground">{value}</p>
          <p className="mt-1 text-sm font-medium text-muted">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* stat cards stagger */
      gsap.from(".about-stat", {
        y: 80,
        rotationX: -15,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".about-stat",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* floating icon bounce */
      gsap.utils.toArray<HTMLElement>(".stat-icon").forEach((icon) => {
        gsap.to(icon, {
          y: -6,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      /* text paragraphs stagger */
      gsap.from(".about-paragraph", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-paragraph",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* CTA button reveal */
      gsap.from(".about-cta", {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".about-cta",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout title={t("title")} subtitle={t("p1")} heroImage="/images/company/about.webp">
      <div ref={sectionRef}>
        {/* Stats grid */}
        <div className="page-content-block mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          <StatItem
            icon={Globe}
            value="40+"
            label="Countries"
            color="#1E6DB5"
          />
          <StatItem
            icon={Award}
            value="2015"
            label="Founded"
            color="#0891b2"
          />
          <StatItem
            icon={Users}
            value="500+"
            label="Clients"
            color="#0d9488"
          />
          <StatItem
            icon={Target}
            value="IATF"
            label="16949 Certified"
            color="#6366f1"
          />
        </div>

        {/* Content paragraphs */}
        <div className="page-content-block space-y-6">
          <p className="about-paragraph text-lg leading-relaxed text-muted">
            {t("p2")}
          </p>
          <p className="about-paragraph text-lg leading-relaxed text-muted">
            {t("p3")}
          </p>
          <p className="about-paragraph text-lg leading-relaxed text-muted">
            {t("p4")}
          </p>
          <p className="about-paragraph text-lg leading-relaxed text-muted">
            {t("p5")}
          </p>
          <p className="about-paragraph text-lg leading-relaxed text-muted">
            {t("p6")}
          </p>
        </div>

        {/* CTA */}
        <div className="about-cta mt-16 text-center">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-primary px-10 py-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10">{t("contactUs")}</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
