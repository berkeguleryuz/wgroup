"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

let engineReady = false;
let enginePromise: Promise<void> | null = null;

interface SparklesProps {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  background?: string;
  options?: Record<string, unknown>;
}

export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent",
  options = {},
}: SparklesProps) {
  const [isReady, setIsReady] = useState(engineReady);

  useEffect(() => {
    if (engineReady) {
      setIsReady(true);
      return;
    }
    if (!enginePromise) {
      enginePromise = initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        engineReady = true;
      });
    }
    enginePromise.then(() => setIsReady(true));
  }, []);

  const id = useId();

  const particleOptions = useMemo(
    () => ({
      background: { color: { value: background } },
      fullScreen: { enable: false, zIndex: 1 },
      fpsLimit: 120,
      particles: {
        color: { value: color },
        move: {
          enable: true,
          direction: "none" as const,
          speed: { min: minSpeed || speed / 10, max: speed },
          straight: false,
        },
        number: { value: density },
        opacity: {
          value: { min: minOpacity || opacity / 10, max: opacity },
          animation: { enable: true, sync: false, speed: opacitySpeed },
        },
        size: { value: { min: minSize || size / 2.5, max: size } },
      },
      detectRetina: true,
      ...options,
    }),
    [background, color, density, minOpacity, minSize, minSpeed, opacity, opacitySpeed, size, speed, options]
  );

  if (!isReady) return null;

  return (
    <Particles
      id={id}
      options={particleOptions}
      className={className}
    />
  );
}
