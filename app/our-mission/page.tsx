"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Globe, BookOpen, Sparkles, Rocket } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { icon: Target },
  { icon: Globe },
  { icon: BookOpen },
  { icon: Sparkles },
  { icon: Rocket },
];

function TimelineStep({
  number,
  icon: Icon,
  text,
  featured = false,
}: {
  number: number;
  icon: React.ElementType;
  text: string;
  featured?: boolean;
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
        rotateX: ((y - centerY) / centerY) * -6,
        rotateY: ((x - centerX) / centerX) * 6,
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
      className="mission-block relative flex gap-6 sm:gap-8"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left: timeline column */}
      <div className="flex flex-col items-center">
        {/* Numbered badge */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {String(number).padStart(2, "0")}
        </div>
        {/* Vertical line */}
        <div
          className="mt-2 w-px flex-1"
          style={{
            background: "linear-gradient(to bottom, rgba(30,109,181,0.3), transparent)",
          }}
        />
      </div>

      {/* Right: content card */}
      <div
        ref={cardRef}
        className={`group relative flex-1 overflow-hidden rounded-2xl shadow-xl will-change-transform ${featured ? "p-8" : "p-6"} mb-4`}
        style={{
          transformStyle: "preserve-3d",
          background: featured
            ? "linear-gradient(135deg, rgba(30,109,181,0.07), rgba(255,255,255,0.04), rgba(30,109,181,0.04))"
            : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(30,109,181,0.04), rgba(255,255,255,0.03))",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: featured
            ? "0 15px 50px -10px rgba(0,0,0,0.4)"
            : "0 10px 40px -10px rgba(0,0,0,0.3)",
        }}
      >
        {/* Corner glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div
          className="relative z-10 flex items-start gap-4"
          style={{ transform: "translateZ(15px)" }}
        >
          {/* Icon with shimmer animation */}
          <div className="mission-icon relative flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
            <Icon className="relative z-10 h-6 w-6 text-primary" />
            {/* Shimmer sweep overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(105deg, transparent 30%, rgba(30,109,181,0.25) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: "iconShimmer 3s ease-in-out infinite",
              }}
            />
          </div>
          {/* Text */}
          <p
            className={`leading-relaxed text-muted ${featured ? "text-lg" : "text-base"}`}
          >
            {text}
          </p>
        </div>
      </div>

      {/* Keyframes injected via style tag (only once) */}
      {number === 1 && (
        <style jsx global>{`
          @keyframes iconShimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      )}
    </div>
  );
}

export default function OurMissionPage() {
  const t = useTranslations("mission");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mission-block", {
        y: 60,
        opacity: 0,
        rotationX: -12,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".mission-block",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paragraphs = [t("p1"), t("p2"), t("p3"), t("p4"), t("p5")];

  return (
    <PageLayout title={t("title")} eyebrow={t("eyebrow")} titleHighlight={t("titleHighlight")} heroImage="/images/company/our-mission.webp">
      <div ref={sectionRef} className="space-y-0">
        {paragraphs.map((text, i) => (
          <TimelineStep
            key={i}
            number={i + 1}
            icon={items[i].icon}
            text={text}
            featured={i === 0}
          />
        ))}
      </div>
    </PageLayout>
  );
}
