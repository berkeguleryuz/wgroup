"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

interface MorphButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** Fill color for the morph wave (default: current text color mapped) */
  fillColor?: string;
  /** Text color before hover */
  textColor?: string;
  /** Text color after hover */
  textColorHover?: string;
}

const MorphButton = React.forwardRef<HTMLButtonElement, MorphButtonProps>(
  (
    {
      className = "",
      disabled = false,
      children,
      fillColor = "#000000",
      textColor = "#000000",
      textColorHover = "#ffffff",
      ...props
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useGSAP(
      () => {
        const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
        const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

        const tl = gsap.timeline({ paused: true });
        tl.to(".morph-path", {
          morphSVG: start,
          ease: "power2.in",
        }).to(".morph-path", {
          morphSVG: end,
          ease: "power2.out",
        });

        const tl2 = gsap.timeline({ paused: true });
        tl2
          .from(".morph-text", { color: textColor })
          .to(".morph-text", {
            color: textColorHover,
            duration: 0.5,
            scale: 1.02,
            ease: "power2.inOut",
          });

        if (!buttonRef.current) return;

        buttonRef.current.addEventListener("mouseenter", () => {
          tl.play();
          tl2.play();
        });
        buttonRef.current.addEventListener("mouseleave", () => {
          tl.reverse();
          tl2.reverse();
        });
      },
      { scope: buttonRef },
    );

    return (
      <button
        ref={buttonRef}
        disabled={disabled}
        className={`relative cursor-pointer overflow-hidden ${className}`}
        {...props}
      >
        <div className="absolute inset-0">
          <svg
            style={{ width: "100%", height: "100%" }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              className="morph-path"
              fill={fillColor}
              strokeWidth="0px"
              vectorEffect="non-scaling-stroke"
              d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
            />
          </svg>
        </div>
        <div className="morph-text relative z-10">{children}</div>
      </button>
    );
  },
);

MorphButton.displayName = "MorphButton";

export default MorphButton;
