"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import Lottie from "lottie-react";

gsap.registerPlugin(ScrollTrigger);

const pillarLotties = ["/lottie/target.json", "/lottie/lightbulb.json", "/lottie/trending-up.json"] as const;
const pillarColors = ["var(--primary)", "var(--accent-purple)", "var(--accent-teal)"] as const;

/* ---------- Corner Bracket ---------- */
const bracketSize = 24;
const bracketWidth = 2;

function CornerBracket({ position, color }: { position: "tl" | "tr" | "bl" | "br"; color: string }) {
  const posMap = {
    tl: { top: 0, left: 0, borderTop: `${bracketWidth}px solid ${color}`, borderLeft: `${bracketWidth}px solid ${color}` },
    tr: { top: 0, right: 0, borderTop: `${bracketWidth}px solid ${color}`, borderRight: `${bracketWidth}px solid ${color}` },
    bl: { bottom: 0, left: 0, borderBottom: `${bracketWidth}px solid ${color}`, borderLeft: `${bracketWidth}px solid ${color}` },
    br: { bottom: 0, right: 0, borderBottom: `${bracketWidth}px solid ${color}`, borderRight: `${bracketWidth}px solid ${color}` },
  };

  return (
    <span
      className="pointer-events-none absolute"
      style={{
        width: bracketSize,
        height: bracketSize,
        ...posMap[position],
      }}
    />
  );
}

/* ---------- Pillar Card with 3D tilt + Corner Brackets ---------- */
function PillarCard({
  lottie,
  title,
  description,
  color,
}: {
  lottie: string;
  title: string;
  description: string;
  color: string;
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
        rotateX: ((y - centerY) / centerY) * -6,
        rotateY: ((x - centerX) / centerX) * 6,
        transformPerspective: 800,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (lottieWrapRef.current) {
        gsap.to(lottieWrapRef.current, {
          scale: 1.15,
          duration: 0.3,
          ease: "power2.out",
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
      className="pillar-card"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative h-full p-8 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Corner brackets — unified color */}
        <CornerBracket position="tl" color="var(--primary)" />
        <CornerBracket position="tr" color="var(--primary)" />
        <CornerBracket position="bl" color="var(--primary)" />
        <CornerBracket position="br" color="var(--primary)" />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col items-center text-center"
          style={{ transform: "translateZ(20px)" }}
        >
          <div ref={lottieWrapRef} className="pillar-icon mb-6 h-14 w-14">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop
                autoplay
                style={{ width: 56, height: 56 }}
                rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
              />
            )}
          </div>

          <h3
            className="mb-3 text-lg font-bold text-white"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
            }}
          >
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-white/50">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   About Section
   ============================================================ */
export default function About() {
  const t = useTranslations("whatWeDo");
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* heading entrance */
      gsap.from(".about-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-text", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* expanding clip-path image */
      if (imageRef.current) {
        gsap.set(imageRef.current, {
          clipPath: "polygon(38% 30%, 62% 30%, 62% 70%, 38% 70%)",
        });
        gsap.to(imageRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
      }

      /* pillar cards – 3D entrance */
      gsap.from(".pillar-card", {
        y: 60,
        rotationX: -12,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".pillar-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* floating icon animation */
      gsap.utils.toArray<HTMLElement>(".pillar-icon").forEach((icon) => {
        gsap.to(icon, {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-secondary py-28"
    >
      {/* Background effects */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="about-heading mb-3 text-sm font-semibold tracking-[0.2em] text-primary"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            {t("label")}
          </p>
          <h2
            className="about-heading text-4xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            {t("title")}{" "}
            <span
              className="text-primary"
              style={{
                fontFamily: "var(--font-instrument), Georgia, serif",
                fontStyle: "italic",
              }}
            >
              {t("titleHighlight")}
            </span>
          </h2>
          <p
            className="about-text mt-6 text-lg leading-relaxed text-white/50"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            {t("description")}
          </p>
        </div>

        {/* Expanding image */}
        <div className="mt-16">
          <div
            ref={imageRef}
            className="relative mx-auto h-[50vh] w-full overflow-hidden rounded-3xl will-change-[clip-path]"
          >
            <Image
              src="/images/company/about.webp"
              alt="WGroup Berlin Office"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 z-10">
              <span
                className="text-sm font-semibold tracking-widest text-white/60"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                }}
              >
                {t("imageCaption")}
              </span>
            </div>
          </div>
        </div>

        {/* Body text */}
        <div className="mx-auto mt-16 max-w-3xl space-y-4 text-center">
          <p className="about-text text-base leading-relaxed text-white/50">
            {t("body1")}
          </p>
          <p className="about-text text-base leading-relaxed text-white/50">
            {t("body2")}
          </p>
        </div>

        {/* Pillar cards */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((n, i) => (
            <PillarCard
              key={n}
              lottie={pillarLotties[i]}
              title={t(`pillar${n}Title`)}
              description={t(`pillar${n}Desc`)}
              color={pillarColors[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
