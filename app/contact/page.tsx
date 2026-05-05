"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Linkedin, Instagram, Send } from "@/components/icons";
import { gsap } from "@/lib/gsap";
import PageLayout from "@/components/layout/PageLayout";

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
      gsap.from(".contact-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-reveal",
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
    <PageLayout title={t("title")} eyebrow={t("eyebrow")} titleHighlight={t("titleHighlight")}>
      <div ref={sectionRef} className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="contact-reveal lg:col-span-3">
          <div className="relative rounded-2xl p-[1.5px]" style={{ overflow: "hidden" }}>
            <div
              className="pointer-events-none absolute inset-[-50%] animate-[borderSpin_4s_linear_infinite]"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, #1E6DB5 12%, #1E6DB580 25%, transparent 37%, transparent 62%, #1E6DB580 75%, #1E6DB5 87%, transparent 100%)",
              }}
            />

            <div
              className="relative rounded-2xl"
              style={{ background: "var(--background)" }}
            >
              <div className="p-8 sm:p-10">
              <h3 className="mb-1 text-xl font-bold text-foreground">{t("formTitle")}</h3>
              <p className="mb-8 text-sm text-muted">{t("building")} &middot; {t("city")}</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                      {t("formName")}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-transparent p-3.5 text-sm text-foreground placeholder:text-muted transition-all duration-300 focus:border-primary/40 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                      {t("formEmail")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-lg border border-border bg-transparent p-3.5 text-sm text-foreground placeholder:text-muted transition-all duration-300 focus:border-primary/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
                    {t("formMessage")}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full resize-none rounded-lg border border-border bg-transparent p-3.5 text-sm text-foreground placeholder:text-muted transition-all duration-300 focus:border-primary/40 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="group relative inline-flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-lg bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                  >
                    <span className="relative z-10">{t("formSend")}</span>
                    <Send className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </button>

                  {submitted && (
                    <p className="text-sm font-medium text-green-400">{tc("successMessage")}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
          </div>

          <style jsx global>{`
            @keyframes borderSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>

        <div className="lg:col-span-2 space-y-10">
          <div className="contact-reveal">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("officeTitle")}</h3>
            <div className="space-y-1">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(t("address"))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-lg px-3 py-3 -mx-3 transition-colors duration-200 hover:bg-foreground/[0.03]"
              >
                <MapPin className="h-4 w-4 flex-shrink-0 text-primary/60" />
                <div>
                  <p className="text-sm text-foreground">{t("address")}</p>
                  <p className="text-xs text-muted">{t("building")}</p>
                </div>
              </a>

              <a
                href={`mailto:${t("email")}`}
                className="group flex items-center gap-4 rounded-lg px-3 py-3 -mx-3 transition-colors duration-200 hover:bg-foreground/[0.03]"
              >
                <Mail className="h-4 w-4 flex-shrink-0 text-primary/60" />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">{t("email")}</span>
              </a>

              <a
                href={`tel:${t("phone").replace(/\s/g, "")}`}
                className="group flex items-center gap-4 rounded-lg px-3 py-3 -mx-3 transition-colors duration-200 hover:bg-foreground/[0.03]"
              >
                <Phone className="h-4 w-4 flex-shrink-0 text-primary/60" />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">{t("phone")}</span>
              </a>
            </div>
          </div>

          <div className="contact-reveal h-px w-full bg-gradient-to-r from-border via-border to-transparent" />

          <div className="contact-reveal">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("followUs")}</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/company/wgroup-gmbh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: "1px solid var(--card-border)",
                }}
              >
                <Linkedin className="h-4.5 w-4.5 text-primary/70 transition-colors group-hover:text-primary" />
                <span className="text-sm text-foreground">LinkedIn</span>
                <span className="ml-auto text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">&rarr;</span>
              </a>
              <a
                href="https://www.instagram.com/wgroupgmbh"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: "1px solid var(--card-border)",
                }}
              >
                <Instagram className="h-4.5 w-4.5 text-primary/70 transition-colors group-hover:text-primary" />
                <span className="text-sm text-foreground">Instagram</span>
                <span className="ml-auto text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
