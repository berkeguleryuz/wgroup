"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Leaf, Globe } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  { key: "genderEquality", icon: Heart },
  { key: "sustainability", icon: Leaf },
  { key: "environment", icon: Globe },
] as const;

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const color = "rgba(30,109,181,0.4)";
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    tr: { top: 0, right: 0, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` },
    bl: { bottom: 0, left: 0, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    br: { bottom: 0, right: 0, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
  };
  return <span className="pointer-events-none absolute h-6 w-6" style={styles[position]} />;
}

function PillarCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0, rotateY: 0, scale: 1,
        duration: 0.6, ease: "elastic.out(1, 0.5)",
      });
    }
  }, []);

  return (
    <div className="pillar-block" style={{ perspective: "800px" }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div
        ref={cardRef}
        className="group relative h-full p-8 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Corner brackets — all primary */}
        <CornerBracket position="tl" />
        <CornerBracket position="tr" />
        <CornerBracket position="bl" />
        <CornerBracket position="br" />

        {/* Corner glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex flex-col items-center text-center" style={{ transform: "translateZ(20px)" }}>
          {/* Icon with CSS shimmer */}
          <div className="pillar-icon relative mb-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
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
          <h2 className="mb-3 text-lg font-bold text-foreground">{title}</h2>
          <p className="text-sm leading-relaxed text-muted">{description}</p>
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
      gsap.from(".pillar-block", {
        y: 60,
        opacity: 0,
        rotationX: -12,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".pillar-block",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
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
    <PageLayout title={t("title")} subtitle={t("subtitle")} eyebrow={t("eyebrow")} titleHighlight={t("titleHighlight")} heroImage="/images/company/social-responsibility.webp">
      <div ref={sectionRef}>
        <p className="page-content-block mb-12 text-lg leading-relaxed text-muted">
          {t("description")}
        </p>

        {/* Pillar cards - 3-column grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PILLARS.map(({ key, icon }) => (
            <PillarCard
              key={key}
              icon={icon}
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
