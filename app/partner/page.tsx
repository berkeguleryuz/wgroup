"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Handshake, Globe, BookOpen, Shield } from "@/components/icons";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

const PARTNERS = [
  { key: "berlinPartner", icon: Handshake },
  { key: "retranetz", icon: Globe },
  { key: "ihk", icon: BookOpen },
  { key: "bbb", icon: Shield },
] as const;

function PartnerCard({
  number,
  icon: Icon,
  name,
  description,
}: {
  number: number;
  icon: React.ElementType;
  name: string;
  description: string;
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

      gsap.to(cardRef.current, {
        rotateX: ((y - centerY) / centerY) * -6,
        rotateY: ((x - centerX) / centerX) * 6,
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
        overwrite: "auto",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - 150,
          y: y - 150,
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
      className="partner-card"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] p-8 shadow-xl shadow-black/20 transition-shadow duration-300 will-change-transform hover:shadow-2xl hover:shadow-black/30"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[300px] w-[300px] rounded-full opacity-0"
          style={{
            background:
              "radial-gradient(circle, rgba(30,109,181,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Corner glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

        {/* Hover shimmer */}
        <div
          className={`shimmer-border pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative z-10 flex items-start gap-5" style={{ transform: "translateZ(15px)" }}>
          {/* Left column: number + icon */}
          <div className="flex flex-col items-center gap-3">
            {/* Numbered badge */}
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {String(number).padStart(2, "0")}
            </div>
            {/* Icon with shimmer */}
            <div className="partner-icon relative flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary/10">
              <Icon className="relative z-10 h-6 w-6 text-primary" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(30,109,181,0.25) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                  animation: "iconShimmer 3s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          {/* Right: content */}
          <div className="flex-1">
            <h2 className="mb-2 text-xl font-bold text-foreground">{name}</h2>
            <p className="leading-relaxed text-muted">{description}</p>
          </div>
        </div>
      </div>

      {/* Keyframes (once) */}
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

export default function PartnerPage() {
  const t = useTranslations("partner");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".partner-card", {
        y: 60,
        rotationX: -10,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".partner-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout title={t("title")} subtitle={t("subtitle")} eyebrow={t("eyebrow")} titleHighlight={t("titleHighlight")} heroImage="/images/company/partners.webp">
      <div ref={sectionRef}>
        <p className="page-content-block mb-10 text-lg leading-relaxed text-muted">
          {t("description")}
        </p>

        <div className="space-y-5">
          {PARTNERS.map(({ key, icon }, i) => (
            <PartnerCard
              key={key}
              number={i + 1}
              icon={icon}
              name={t(`${key}.name`)}
              description={t(`${key}.description`)}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
