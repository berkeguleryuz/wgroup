"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Linkedin, Instagram, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Premium info card with gradient bg, glow, 3D tilt ---------- */
function InfoCard({
  children,
  color = "#1E6DB5",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - 100,
          y: y - 100,
          opacity: 0.7,
          duration: 0.3,
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
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  return (
    <div
      className="contact-card"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl p-8 shadow-xl transition-shadow duration-500 will-change-transform hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          background: `linear-gradient(135deg, rgba(255,255,255,0.04), ${color}10, rgba(255,255,255,0.03))`,
          backdropFilter: "blur(12px)",
          border: `1px solid rgba(255,255,255,0.07)`,
          boxShadow: `0 10px 40px -10px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Corner glow */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
          style={{ background: `${color}15` }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0 blur-3xl"
          style={{ background: `${color}20` }}
        />

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10" style={{ transform: "translateZ(15px)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const tc = useTranslations("common");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".form-field", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".form-field",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-card", {
        y: 60,
        rotationX: -12,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".contact-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <PageLayout title={t("title")}>
      <div ref={sectionRef} className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: Contact Form */}
        <div className="page-content-block">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-field">
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                {t("formName")}
              </label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                placeholder={t("formName")}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.06] p-4 text-white placeholder:text-white/30 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/10 focus:outline-none"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                {t("formEmail")}
              </label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                placeholder={t("formEmail")}
                className="w-full rounded-xl border border-white/[0.1] bg-white/[0.06] p-4 text-white placeholder:text-white/30 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/10 focus:outline-none"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                {t("formMessage")}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                placeholder={t("formMessage")}
                className="w-full resize-none rounded-xl border border-white/[0.1] bg-white/[0.06] p-4 text-white placeholder:text-white/30 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/10 focus:outline-none"
              />
            </div>

            <div className="form-field">
              <button
                type="submit"
                className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 sm:w-auto"
              >
                <span className="relative z-10">{t("formSend")}</span>
                <Send className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </div>

            {submitted && (
              <div className="form-field rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                <p className="font-medium text-green-400">{tc("successMessage")}</p>
              </div>
            )}
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="space-y-6">
          <InfoCard>
            <h3 className="mb-1 text-lg font-bold text-foreground">
              {t("city")} {t("hqLab")}
            </h3>
            <p className="mb-6 text-sm text-muted">{t("building")}</p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <span className="mt-2 text-muted">{t("address")}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <a
                  href={`mailto:${t("email")}`}
                  className="font-medium text-primary transition-colors hover:text-primary-hover"
                >
                  {t("email")}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <a
                  href={`tel:${t("phone").replace(/\s/g, "")}`}
                  className="font-medium text-primary transition-colors hover:text-primary-hover"
                >
                  {t("phone")}
                </a>
              </div>
            </div>
          </InfoCard>

          <InfoCard color="#0891b2">
            <h3 className="mb-4 text-lg font-bold text-foreground">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/wgroupgmbh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl px-5 py-3 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(10,102,194,0.08), rgba(10,102,194,0.04))",
                  border: "1px solid rgba(10,102,194,0.15)",
                }}
              >
                <Linkedin className="h-5 w-5 text-[#0A66C2] transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium text-foreground">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/wgroupgmbh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl px-5 py-3 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(228,64,95,0.08), rgba(193,53,132,0.04))",
                  border: "1px solid rgba(228,64,95,0.15)",
                }}
              >
                <Instagram className="h-5 w-5 text-[#E4405F] transition-transform duration-300 group-hover:scale-110" />
                <span className="font-medium text-foreground">Instagram</span>
              </a>
            </div>
          </InfoCard>
        </div>
      </div>
    </PageLayout>
  );
}
