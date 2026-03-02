"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 121;
const FRAME_PATH = "/videos/wgroup-frames/frame-";
const IMAGE_SCALE = 0.72;

const CARD_CONFIG = [
  { start: 0.02, end: 0.24 },
  { start: 0.26, end: 0.48 },
  { start: 0.52, end: 0.74 },
  { start: 0.76, end: 0.96 },
];

const cardKeys = ["card1", "card2", "card3", "card4"] as const;

function padNumber(n: number): string {
  return String(n).padStart(4, "0");
}

export default function FrameAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const t = useTranslations("frameAnimation");

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = framesRef.current[index];
    if (!img) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const scale =
      Math.min(canvas.width / img.width, canvas.height / img.height) *
      IMAGE_SCALE;
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;

    ctx.drawImage(img, x, y, w, h);
  }, []);

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FRAME_PATH}${padNumber(i + 1)}.webp`;
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };
      images[i] = img;
    }

    framesRef.current = images;
  }, []);

  // Setup canvas resize + scroll animation
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    resize();
    drawFrame(0);

    window.addEventListener("resize", resize);

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;

        // Frame scrubbing
        const frameIndex = Math.min(
          Math.floor(p * TOTAL_FRAMES),
          TOTAL_FRAMES - 1
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        // Card animations
        CARD_CONFIG.forEach(({ start, end }, i) => {
          const card = cardRefs.current[i];
          if (!card) return;

          const fadeInEnd = start + 0.03;
          const fadeOutStart = end - 0.03;

          let opacity = 0;
          let translateY = 30;

          if (p >= start && p <= end) {
            if (p < fadeInEnd) {
              const t = (p - start) / (fadeInEnd - start);
              opacity = t;
              translateY = 30 * (1 - t);
            } else if (p > fadeOutStart) {
              const t = (p - fadeOutStart) / (end - fadeOutStart);
              opacity = 1 - t;
              translateY = -20 * t;
            } else {
              opacity = 1;
              translateY = 0;
            }
          }

          card.style.opacity = String(opacity);
          card.style.visibility = opacity > 0.01 ? "visible" : "hidden";
          card.style.transform = `translateY(${translateY}px)`;
        });
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      trigger.kill();
    };
  }, [loaded, drawFrame]);

  return (
    <>
      {/* Loading overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
          <div className="mb-4 h-1 w-48 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p
            className="text-sm text-gray-400"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            {t("loading")}&hellip; {progress}%
          </p>
        </div>
      )}

      {/* Animation section */}
      <section
        ref={sectionRef}
        className="relative bg-white"
        style={{ height: "600vh" }}
      >
        {/* Sticky canvas container */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            style={{ maxWidth: "100%", maxHeight: "100vh" }}
          />
        </div>
      </section>

      {/* Fixed info cards */}
      {cardKeys.map((key, i) => {
        const isLeft = i % 2 === 0;
        const positionClasses = isLeft
          ? "left-6 bottom-[15%] sm:left-12 lg:left-12"
          : "right-6 top-[15%] sm:right-12 lg:right-12";

        return (
          <div
            key={key}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`pointer-events-none fixed z-40 w-[calc(100%-48px)] sm:w-[380px] ${positionClasses}`}
            style={{ opacity: 0, visibility: "hidden" }}
          >
            <div
              className="rounded-2xl border border-white/10 bg-[#1a1a1a]/90 p-8 shadow-[0_4px_40px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
              style={{ borderLeft: "3px solid rgba(255,255,255,0.1)" }}
            >
              <p
                className="mb-3 text-[11px] font-medium uppercase tracking-[2.5px] text-white/40"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                }}
              >
                {t(`${key}Label`)}
              </p>
              <h3
                className="mb-3 text-[28px] font-normal leading-tight text-white"
                style={{
                  fontFamily: "var(--font-instrument), Georgia, serif",
                }}
              >
                {t(`${key}Title`)}
              </h3>
              <p
                className="text-sm font-light leading-relaxed text-white/50"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                }}
              >
                {t(`${key}Desc`)}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
