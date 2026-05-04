"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "@/components/icons";

/* ============================================================
   404 — "Off the Grid"
   Industrial editorial 404 page with an animated "lost signal"
   SVG. Single luminous beacon, expanding search rings with broken
   segments, a far-drifting satellite, and a faint dashed line
   reaching out for it. Aligned with the project's brand palette
   (primary blue + accent teal + accent purple) and motif language
   used across product detail pages.
   ============================================================ */

export default function NotFound() {
  const t = useTranslations("notFoundPage");

  return (
    <main
      className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-6 py-24"
      style={{ background: "var(--background)" }}
    >
      {/* Atmospheric backdrop: drafting grid + ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Decorative corner brackets */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Animated SVG */}
        <LostSignalSVG />

        {/* 404 hero glyph */}
        <h1
          className="relative mt-8 leading-[0.92]"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontVariationSettings: "'SOFT' 100, 'opsz' 144, 'WONK' 1",
            fontSize: "clamp(120px, 22vw, 240px)",
            letterSpacing: "-0.04em",
            background:
              "linear-gradient(135deg, var(--primary) 0%, var(--accent-teal) 60%, var(--accent-purple) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          404
        </h1>

        {/* Title */}
        <h2
          className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-[28px]"
          style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
        >
          {t("title")}
        </h2>

        {/* Description */}
        <p
          className="mt-6 max-w-xl text-base leading-[1.75] text-white/55 sm:text-[17px]"
          style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
        >
          {t("description")}
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-background shadow-lg shadow-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/20 sm:text-base"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            {t("homeCta")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex h-14 items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.12] sm:text-base"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            {t("contactCta")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Trio dots footer */}
        <div className="mt-14 flex items-center gap-2">
          <span
            className="block h-1 w-1 rounded-full"
            style={{ background: "var(--primary)", opacity: 0.85 }}
          />
          <span
            className="block h-1 w-1 rounded-full"
            style={{ background: "var(--accent-teal)", opacity: 0.55 }}
          />
          <span
            className="block h-1 w-1 rounded-full"
            style={{ background: "var(--accent-purple)", opacity: 0.35 }}
          />
        </div>
      </div>
    </main>
  );
}

/* ---------- Corner brackets (drafting frame) ---------- */
function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const color = "rgba(30,109,181,0.32)";
  const size = 28;
  const styles: Record<string, React.CSSProperties> = {
    tl: {
      top: 24,
      left: 24,
      borderTop: `1px solid ${color}`,
      borderLeft: `1px solid ${color}`,
    },
    tr: {
      top: 24,
      right: 24,
      borderTop: `1px solid ${color}`,
      borderRight: `1px solid ${color}`,
    },
    bl: {
      bottom: 24,
      left: 24,
      borderBottom: `1px solid ${color}`,
      borderLeft: `1px solid ${color}`,
    },
    br: {
      bottom: 24,
      right: 24,
      borderBottom: `1px solid ${color}`,
      borderRight: `1px solid ${color}`,
    },
  };
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute hidden sm:block"
      style={{ width: size, height: size, ...styles[position] }}
    />
  );
}

/* ---------- Animated "Lost Signal" SVG ----------
   Central beacon with concentric search waves (one segment broken
   per ring), a small drifting satellite far from center, and a
   faint dashed reach-out line that fades in and out trying to
   establish connection. Pure SVG + globals.css keyframes + SMIL.
*/
function LostSignalSVG() {
  return (
    <div
      aria-hidden
      className="relative"
      style={{
        width: "clamp(260px, 32vw, 360px)",
        height: "clamp(260px, 32vw, 360px)",
      }}
    >
      <svg viewBox="0 0 360 360" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="nfBeacon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.95" />
            <stop offset="55%" stopColor="var(--primary)" stopOpacity="0.65" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nfSatellite" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--accent-purple)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="nfRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent-teal)" stopOpacity="0.3" />
          </linearGradient>

          {/* Reach path: from beacon (180,180) toward satellite (305, 80) */}
          <path id="nfReachPath" d="M180 180 L305 80" fill="none" />
        </defs>

        {/* Outer dotted ring — slow rotate */}
        <g
          style={{
            transformOrigin: "center",
            animation: "adv-spin-slow 80s linear infinite",
          }}
        >
          <circle
            cx="180"
            cy="180"
            r="155"
            fill="none"
            stroke="url(#nfRing)"
            strokeWidth="1"
            strokeDasharray="2 8"
            opacity="0.32"
          />
        </g>

        {/* Three concentric search waves with broken segments */}
        {/* Wave A — broken on right side */}
        <g
          style={{
            transformOrigin: "center",
            animation: "adv-pulse-ring 4.4s ease-out infinite",
          }}
        >
          <circle
            cx="180"
            cy="180"
            r="60"
            fill="none"
            stroke="url(#nfRing)"
            strokeWidth="1.2"
            strokeDasharray="180 60"
            strokeDashoffset="40"
            opacity="0.55"
          />
        </g>
        {/* Wave B — broken on lower-left */}
        <g
          style={{
            transformOrigin: "center",
            animation: "adv-pulse-ring 4.4s ease-out infinite",
            animationDelay: "1.5s",
          }}
        >
          <circle
            cx="180"
            cy="180"
            r="60"
            fill="none"
            stroke="url(#nfRing)"
            strokeWidth="1.2"
            strokeDasharray="220 80"
            strokeDashoffset="120"
            opacity="0.45"
          />
        </g>
        {/* Wave C — broken on top */}
        <g
          style={{
            transformOrigin: "center",
            animation: "adv-pulse-ring 4.4s ease-out infinite",
            animationDelay: "3s",
          }}
        >
          <circle
            cx="180"
            cy="180"
            r="60"
            fill="none"
            stroke="url(#nfRing)"
            strokeWidth="1.2"
            strokeDasharray="160 50"
            strokeDashoffset="80"
            opacity="0.35"
          />
        </g>

        {/* Reach-out line (dashed, flickering opacity to suggest weak signal) */}
        <line
          x1="180"
          y1="180"
          x2="305"
          y2="80"
          stroke="var(--accent-purple)"
          strokeWidth="1"
          strokeDasharray="3 6"
          opacity="0.45"
        >
          <animate
            attributeName="opacity"
            values="0.15;0.6;0.15;0.45;0.1"
            dur="3.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-18"
            dur="2s"
            repeatCount="indefinite"
          />
        </line>

        {/* Faint particle traveling along the reach line */}
        <circle r="1.6" fill="white" opacity="0.85">
          <animateMotion dur="3.2s" repeatCount="indefinite">
            <mpath href="#nfReachPath" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;0.85;0.85;0"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Drifting satellite (the lost node) */}
        <g
          style={{
            transformOrigin: "305px 80px",
            animation: "adv-drift 5s ease-in-out infinite",
          }}
        >
          <circle cx="305" cy="80" r="14" fill="url(#nfSatellite)" />
          <circle cx="305" cy="80" r="4" fill="var(--accent-purple)">
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="2.6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="305" cy="80" r="1.6" fill="white" opacity="0.95" />
        </g>

        {/* Central beacon — slow steady pulse (calm, persistent) */}
        <circle cx="180" cy="180" r="32" fill="url(#nfBeacon)">
          <animate
            attributeName="r"
            values="28;36;28"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="180" cy="180" r="10" fill="white" opacity="0.94" />
        <circle cx="180" cy="180" r="3.5" fill="var(--primary)" />

        {/* Crosshair at center (drafting cue) */}
        <line
          x1="180"
          y1="160"
          x2="180"
          y2="200"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.35"
        />
        <line
          x1="160"
          y1="180"
          x2="200"
          y2="180"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.35"
        />

      </svg>
    </div>
  );
}
