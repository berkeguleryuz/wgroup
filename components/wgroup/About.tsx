"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
const Sparkles = dynamic(
  () => import("@/components/ui/Sparkles").then((mod) => mod.Sparkles),
  { ssr: false }
);

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
      const pillarCards = gsap.utils.toArray<HTMLElement>(".pillar-card");
      if (pillarCards.length) {
        gsap.set(pillarCards, { opacity: 0, y: 60 });
        ScrollTrigger.create({
          trigger: pillarCards[0],
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(pillarCards, {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              duration: 0.8,
              ease: "back.out(1.2)",
            });
          },
        });
      }

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
    <>
      {/* ---- Curved top edge: sits OUTSIDE section to avoid overflow-hidden clip ---- */}
      <div className="relative z-20 -mt-50 overflow-visible">
        <svg
          className="block w-full h-50"
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path d="M0 80 Q720 0 1440 80 V84 H0 Z" fill="#0a0f1e" />
        </svg>
        {/* Glow */}
        <div
          className="pointer-events-none absolute left-1/2 bottom-0 h-25 w-175 -translate-x-1/2 rounded-full blur-[80px]"
        />
        {/* Sparkles covering the curve area */}
        <div className="pointer-events-none absolute inset-0">
          <Sparkles
            className="h-full w-full"
            density={60}
            size={1}
            speed={0.3}
            opacity={0.4}
            opacitySpeed={1.2}
            color="#ffffff"
          />
        </div>
      </div>

      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-secondary py-28"
      >

      {/* ---- Horizon arc + glow + sparkles ---- */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-105">
        {/* Purple / blue glow behind the arc */}
        <div
          className="absolute bottom-0 left-1/2 h-65 w-225 -translate-x-1/2 rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.25) 0%, rgba(30,109,181,0.12) 50%, transparent 80%)",
          }}
        />

        {/* Curved horizon line */}
        <svg
          className="absolute bottom-0 left-1/2 w-[120%] max-w-350 -translate-x-1/2"
          viewBox="0 0 1400 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120 Q700 0 1400 120"
            stroke="url(#horizon-grad)"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        {/* Sparkles above the arc */}
        <Sparkles
          className="absolute inset-0"
          density={100}
          size={1.2}
          speed={0.3}
          opacity={0.4}
          opacitySpeed={1.2}
          color="#ffffff"
        />
      </div>

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"

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
            className="relative mx-auto h-[50vh] w-full overflow-hidden rounded-3xl will-change-clip-path"
          >
            <Image
              src="/w-new/w1.webp"
              alt="WGroup"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent" />
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

        {/* Body block — animated convergence + editorial typography */}
        <div className="relative mx-auto mt-24 max-w-5xl">
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated convergence network SVG */}
            <ConvergenceNetwork />

            {/* Decorative trio dots */}
            <div className="about-text mt-2 flex items-center gap-2">
              <span
                className="block h-1 w-1 rounded-full"
                style={{ background: "var(--primary)" }}
              />
              <span
                className="block h-1 w-1 rounded-full"
                style={{ background: "var(--accent-teal)", opacity: 0.7 }}
              />
              <span
                className="block h-1 w-1 rounded-full"
                style={{ background: "var(--accent-purple)", opacity: 0.45 }}
              />
            </div>

            {/* Editorial lead pull-quote */}
            <p
              className="about-text mt-10 max-w-3xl text-center text-2xl leading-[1.4] text-white/85 sm:text-[28px] sm:leading-[1.32] lg:text-[32px] lg:leading-[1.28]"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 400,
                letterSpacing: "-0.014em",
                fontVariationSettings: "'SOFT' 30, 'opsz' 144",
              }}
            >
              {t("body1")}
            </p>

            {/* Hairline divider with diamond ornament */}
            <div className="about-text mt-12 flex w-full max-w-2xl items-center gap-4">
              <span className="block h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/15" />
              <span
                aria-hidden
                className="block h-1.5 w-1.5 rotate-45"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), var(--accent-teal))",
                }}
              />
              <span className="block h-px flex-1 bg-gradient-to-r from-white/15 via-white/15 to-transparent" />
            </div>

            {/* Three division blurbs */}
            <div className="mt-12 grid w-full grid-cols-1 gap-8 text-center sm:grid-cols-3 sm:gap-10 sm:text-left">
              <DivisionBlurb
                label="W-Quality"
                color="var(--primary)"
                text={t("qualityLine")}
              />
              <DivisionBlurb
                label="W-DigiLab"
                color="var(--accent-purple)"
                text={t("digilabLine")}
              />
              <DivisionBlurb
                label="W-Studio"
                color="var(--accent-teal)"
                text={t("studioLine")}
              />
            </div>

            {/* Closing tagline */}
            <p
              className="about-text mt-14 max-w-2xl text-center text-base text-white/55 sm:text-lg"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: "-0.005em",
              }}
            >
              {t("body2")}
            </p>
          </div>
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
    </>
  );
}

/* ---------- Division blurb ---------- */
function DivisionBlurb({
  label,
  color,
  text,
}: {
  label: string;
  color: string;
  text: string;
}) {
  return (
    <div className="about-text relative">
      <div className="mb-3 flex items-center justify-center gap-2.5 sm:justify-start">
        <span
          aria-hidden
          className="block h-1.5 w-1.5 rotate-45"
          style={{ background: color }}
        />
        <span
          className="text-[10px] font-bold uppercase tracking-[0.32em]"
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            color,
          }}
        >
          {label}
        </span>
        <span
          aria-hidden
          className="hidden h-px flex-1 sm:block"
          style={{
            background: `linear-gradient(to right, ${color}, transparent)`,
            opacity: 0.6,
          }}
        />
      </div>
      <p
        className="text-[14.5px] leading-[1.7] text-white/65 sm:text-[15px]"
        style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
      >
        {text}
      </p>
    </div>
  );
}

/* ---------- Animated Convergence Network ----------
   Visualizes the WGroup ↔ three-division ecosystem:
   one luminous central hub with three orbital satellites
   connected by flowing dashed lines and traveling particles.
   Pure SVG + CSS keyframes, no JS animations.
*/
function ConvergenceNetwork() {
  const cx = 160;
  const cy = 160;
  const r = 110;
  // Three points equally spaced (120° apart): top, lower-left, lower-right
  const sin60 = Math.sin(Math.PI / 3);
  const cos60 = Math.cos(Math.PI / 3);
  const nodes: { x: number; y: number; color: string; coreId: string; label: string; pathId: string; delay: string }[] = [
    {
      x: cx,
      y: cy - r,
      color: "var(--primary)",
      coreId: "convQualityCore",
      label: "W-Quality",
      pathId: "convPath1",
      delay: "0s",
    },
    {
      x: cx - r * sin60,
      y: cy + r * cos60,
      color: "var(--accent-purple)",
      coreId: "convDigilabCore",
      label: "W-DigiLab",
      pathId: "convPath2",
      delay: "1s",
    },
    {
      x: cx + r * sin60,
      y: cy + r * cos60,
      color: "var(--accent-teal)",
      coreId: "convStudioCore",
      label: "W-Studio",
      pathId: "convPath3",
      delay: "2s",
    },
  ];

  return (
    <div
      aria-hidden
      className="relative mx-auto"
      style={{
        width: "clamp(240px, 30vw, 340px)",
        height: "clamp(240px, 30vw, 340px)",
      }}
    >
      <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="convCoreHub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.95" />
            <stop offset="55%" stopColor="var(--primary)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="convQualityCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="convDigilabCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--accent-purple)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="convStudioCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--accent-teal)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent-teal)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="convLineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--accent-teal)" stopOpacity="0.4" />
          </linearGradient>

          {/* Hidden paths for animateMotion to follow */}
          {nodes.map((n) => (
            <path
              key={n.pathId}
              id={n.pathId}
              d={`M${cx} ${cy} L${n.x} ${n.y}`}
              fill="none"
            />
          ))}
        </defs>

        {/* Outer dotted ring — slow rotation */}
        <g
          style={{
            transformOrigin: "center",
            animation: "adv-spin-slow 70s linear infinite",
          }}
        >
          <circle
            cx={cx}
            cy={cy}
            r="148"
            fill="none"
            stroke="url(#convLineGrad)"
            strokeWidth="1"
            strokeDasharray="2 7"
            opacity="0.35"
          />
        </g>

        {/* Mid orbital ring — counter rotation */}
        <g
          style={{
            transformOrigin: "center",
            animation: "adv-spin-rev 45s linear infinite",
          }}
        >
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="url(#convLineGrad)"
            strokeWidth="0.8"
            strokeDasharray="1 5"
            opacity="0.32"
          />
        </g>

        {/* Connection lines from center to each node */}
        {nodes.map((n, i) => (
          <g key={`line-${i}`}>
            <line
              x1={cx}
              y1={cy}
              x2={n.x}
              y2={n.y}
              stroke={n.color}
              strokeWidth="1.4"
              strokeDasharray="4 5"
              opacity="0.55"
              style={{
                animation: `adv-spin-slow 0s linear infinite`,
              }}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-18"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </line>
          </g>
        ))}

        {/* Traveling particles along each line — bidirectional */}
        {nodes.map((n, i) => (
          <g key={`particle-${i}`}>
            {/* Outward particle (center → node) */}
            <circle r="2.4" fill={n.color}>
              <animateMotion
                dur="3.2s"
                repeatCount="indefinite"
                begin={n.delay}
              >
                <mpath href={`#${n.pathId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="3.2s"
                repeatCount="indefinite"
                begin={n.delay}
              />
            </circle>
            {/* Inward particle (node → center) */}
            <circle r="1.8" fill="white" opacity="0.85">
              <animateMotion
                dur="3.2s"
                repeatCount="indefinite"
                begin={`${parseFloat(n.delay) + 1.6}s`}
                keyPoints="1;0"
                keyTimes="0;1"
              >
                <mpath href={`#${n.pathId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.85;0.85;0"
                dur="3.2s"
                repeatCount="indefinite"
                begin={`${parseFloat(n.delay) + 1.6}s`}
              />
            </circle>
          </g>
        ))}

        {/* Satellite nodes — pulsing core + halo */}
        {nodes.map((n, i) => (
          <g key={`node-${i}`}>
            {/* Halo */}
            <circle
              cx={n.x}
              cy={n.y}
              r="14"
              fill={`url(#${n.coreId})`}
            />
            {/* Solid core */}
            <circle cx={n.x} cy={n.y} r="5" fill={n.color}>
              <animate
                attributeName="r"
                values="4.5;6.5;4.5"
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
              />
            </circle>
            {/* Bright pip */}
            <circle cx={n.x} cy={n.y} r="1.6" fill="white" opacity="0.95" />
          </g>
        ))}

        {/* Center hub — luminous WGroup core */}
        <circle cx={cx} cy={cy} r="26" fill="url(#convCoreHub)">
          <animate
            attributeName="r"
            values="22;30;22"
            dur="3.6s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx={cx} cy={cy} r="9" fill="white" opacity="0.92" />
        <circle cx={cx} cy={cy} r="3" fill="var(--primary)" />

        {/* Scattered ambient sparkles */}
        <circle
          cx="40"
          cy="70"
          r="1.2"
          fill="white"
          style={{ animation: "adv-twinkle 2.6s ease-in-out infinite" }}
        />
        <circle
          cx="280"
          cy="80"
          r="1"
          fill="white"
          style={{
            animation: "adv-twinkle 3s ease-in-out infinite",
            animationDelay: "0.5s",
          }}
        />
        <circle
          cx="50"
          cy="270"
          r="1.4"
          fill="white"
          style={{
            animation: "adv-twinkle 2.4s ease-in-out infinite",
            animationDelay: "1.1s",
          }}
        />
        <circle
          cx="270"
          cy="260"
          r="1.1"
          fill="white"
          style={{
            animation: "adv-twinkle 2.8s ease-in-out infinite",
            animationDelay: "1.7s",
          }}
        />
      </svg>
    </div>
  );
}
