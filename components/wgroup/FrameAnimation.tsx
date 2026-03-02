"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 121;
const FRAME_PATH = "/videos/wgroup-frames/frame-";

const CARD_CONFIG = [
  { start: 0.02, end: 0.24 },
  { start: 0.26, end: 0.48 },
  { start: 0.52, end: 0.74 },
  { start: 0.76, end: 0.96 },
];

const cards = [
  {
    label: "01 / Vision",
    title: "Innovation",
    description:
      "Driving digital transformation through cutting-edge solutions tailored to the automotive sector.",
  },
  {
    label: "02 / Quality",
    title: "Quality Management",
    description:
      "Implementing world-class quality management systems that meet and exceed IATF 16949, VDA, and ASPICE standards.",
  },
  {
    label: "03 / Digital",
    title: "Digital Transformation",
    description:
      "Bridging the gap between traditional automotive expertise and the digital future with measurable results.",
  },
  {
    label: "04 / Education",
    title: "Training & Consulting",
    description:
      "Comprehensive training programs and consulting services that empower organizations to achieve excellence.",
  },
];

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

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = framesRef.current[index];
    if (!img) return;

    // White background
    ctx.fillStyle = "#f5f3ef";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Contain mode: fit frame within canvas, centered
    const scale = Math.min(
      canvas.width / img.width,
      canvas.height / img.height
    );
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

    // Single ScrollTrigger that drives everything
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;

        // --- Frame scrubbing ---
        const frameIndex = Math.min(
          Math.floor(p * TOTAL_FRAMES),
          TOTAL_FRAMES - 1
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        // --- Card animations ---
        CARD_CONFIG.forEach(({ start, end }, i) => {
          const card = cardRefs.current[i];
          if (!card) return;

          const fadeInEnd = start + 0.03;
          const fadeOutStart = end - 0.03;

          let opacity = 0;
          let translateY = 30;

          if (p >= start && p <= end) {
            if (p < fadeInEnd) {
              // Fade in
              const t = (p - start) / (fadeInEnd - start);
              opacity = t;
              translateY = 30 * (1 - t);
            } else if (p > fadeOutStart) {
              // Fade out
              const t = (p - fadeOutStart) / (end - fadeOutStart);
              opacity = 1 - t;
              translateY = -20 * t;
            } else {
              // Fully visible
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
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ backgroundColor: "#f5f3ef" }}>
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
            Loading… {progress}%
          </p>
        </div>
      )}

      {/* Animation section — 600vh scroll runway */}
      <section
        ref={sectionRef}
        className="relative"
        style={{ backgroundColor: "#f5f3ef", height: "600vh" }}
      >
        {/* Sticky canvas container */}
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            style={{ maxWidth: "100%", maxHeight: "100vh" }}
          />
        </div>
      </section>

      {/* Fixed info cards — outside the scroll section, toggled by scroll progress */}
      {cards.map((card, i) => {
        // Alternate: card-1 left/bottom, card-2 right/top, card-3 left/bottom, card-4 right/top
        const isLeft = i % 2 === 0;
        const positionClasses = isLeft
          ? "left-6 bottom-[15%] sm:left-12 lg:left-12"
          : "right-6 top-[15%] sm:right-12 lg:right-12";

        return (
          <div
            key={card.label}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`pointer-events-none fixed z-50 w-[calc(100%-48px)] sm:w-[380px] ${positionClasses}`}
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
                {card.label}
              </p>
              <h3
                className="mb-3 text-[28px] font-normal leading-tight text-white"
                style={{
                  fontFamily:
                    "var(--font-instrument), Georgia, serif",
                }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm font-light leading-relaxed text-white/50"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                }}
              >
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
