"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

const PARTNERS = ["berlinPartner", "retranetz", "ihk", "bbb"] as const;

/* ---------- 3D tilt partner card ---------- */
function PartnerCard({
  name,
  description,
}: {
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
        className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] p-8 shadow-xl shadow-black/20 transition-shadow duration-300 will-change-transform hover:shadow-2xl hover:shadow-black/30"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[300px] w-[300px] rounded-full opacity-0"
          style={{
            background:
              "radial-gradient(circle, rgba(30,109,181,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className={`shimmer-border pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <div style={{ transform: "translateZ(15px)" }}>
          <h2 className="mb-3 text-xl font-bold text-foreground">{name}</h2>
          <p className="leading-relaxed text-muted">{description}</p>
        </div>
      </div>
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
    <PageLayout title={t("title")} subtitle={t("subtitle")} heroImage="/images/company/partners.webp">
      <div ref={sectionRef}>
        <p className="page-content-block mb-10 text-lg leading-relaxed text-muted">
          {t("description")}
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          {PARTNERS.map((key) => (
            <PartnerCard
              key={key}
              name={t(`${key}.name`)}
              description={t(`${key}.description`)}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
