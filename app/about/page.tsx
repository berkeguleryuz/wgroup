"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import PageLayout from "@/components/layout/PageLayout";
import { ArrowRight } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

const statLotties = [
  "/lottie/target.json",
  "/lottie/lightbulb.json",
  "/lottie/trending-up.json",
  "/lottie/target.json",
] as const;

/* ---------- Corner bracket ---------- */
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

/* ---------- 3D tilt stat card with Lottie + corner brackets ---------- */
function StatItem({
  lottie,
  value,
  label,
}: {
  lottie: string;
  value: string;
  label: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lottieWrapRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch(lottie)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {});
  }, [lottie]);

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
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
        overwrite: "auto",
      });

      if (lottieWrapRef.current) {
        gsap.to(lottieWrapRef.current, {
          scale: 1.15,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
      force3D: true,
    });
    if (lottieWrapRef.current) {
      gsap.to(lottieWrapRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div
      className="about-stat"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative h-full p-8 text-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <CornerBracket position="tl" />
        <CornerBracket position="tr" />
        <CornerBracket position="bl" />
        <CornerBracket position="br" />

        <div
          ref={lottieWrapRef}
          className="stat-icon mx-auto mb-4 h-14 w-14"
          style={{ transform: "translateZ(30px)" }}
        >
          {animationData && (
            <Lottie animationData={animationData} loop autoplay className="h-full w-full" />
          )}
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
    <PageLayout title={t("title")} subtitle={t("p1")} eyebrow={t("eyebrow")} titleHighlight={t("titleHighlight")} heroImage="/images/company/about.webp">
      <div ref={sectionRef}>
        {/* Stats grid */}
        <div className="page-content-block mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {[
            { value: "40+", label: "Countries" },
            { value: "2015", label: "Founded" },
            { value: "500+", label: "Clients" },
            { value: "IATF", label: "16949 Certified" },
          ].map((stat, i) => (
            <StatItem
              key={i}
              lottie={statLotties[i]}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>

        {/* Content paragraphs - alternating style */}
        <div className="page-content-block space-y-6">
          {[t("p2"), t("p3"), t("p4"), t("p5"), t("p6")].map((text, i) =>
            i % 2 === 1 ? (
              /* Highlighted card with spinning border */
              <div key={i} className="about-paragraph">
                <div className="relative rounded-2xl p-[1px] overflow-hidden">
                  <div
                    className="pointer-events-none absolute inset-[-50%] animate-[borderSpin_6s_linear_infinite]"
                    style={{
                      background: "conic-gradient(from 0deg, transparent 0%, #1E6DB540 15%, #1E6DB5 30%, transparent 45%, transparent 55%, #1E6DB5 70%, #1E6DB540 85%, transparent 100%)",
                    }}
                  />
                  <div className="relative rounded-2xl bg-[var(--background)] py-6 px-7 sm:px-8">
                    <p className="text-lg leading-relaxed text-muted">{text}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p key={i} className="about-paragraph text-lg leading-relaxed text-muted">{text}</p>
            )
          )}
        </div>

        {/* Gradient divider before CTA */}
        <div className="mx-auto my-10 h-px w-2/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

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

        <style jsx global>{`
          @keyframes borderSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </PageLayout>
  );
}
