"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-content",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(".cta-blob", {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: 4,
        stagger: { each: 0.5, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f8f9fb] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#060b18] px-8 py-20 sm:px-16 sm:py-24">
          {/* Background blobs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="cta-blob absolute -left-20 top-0 h-[300px] w-[300px] rounded-full bg-primary/15 blur-[100px]" />
            <div className="cta-blob absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#6366f1]/10 blur-[120px]" />
          </div>

          {/* Mesh */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Content */}
          <div className="cta-content relative z-10 mx-auto max-w-2xl text-center">
            <p
              className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
              }}
            >
              Get Started
            </p>
            <h2
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
              }}
            >
              Ready to Transform{" "}
              <span
                className="text-primary"
                style={{
                  fontFamily: "var(--font-instrument), Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                Your Business?
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/50">
              Let&apos;s discuss how WGroup can help your organization achieve
              operational excellence and drive innovation.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#060b18] shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 sm:text-base"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontWeight: 600,
                }}
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.12] hover:border-white/30 sm:text-base"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontWeight: 600,
                }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
