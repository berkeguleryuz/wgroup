"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "@/components/icons";
import gsap from "gsap";

const languages = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "tr", label: "TR", flag: "🇹🇷" },
  { code: "de", label: "DE", flag: "🇩🇪" },
] as const;

type Locale = (typeof languages)[number]["code"];

function getCurrentLocale(): Locale {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);
    if (match) return match[1] as Locale;
  }
  return "en";
}

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState<Locale>("en");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrent(getCurrentLocale());
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: -6, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  function switchLocale(locale: Locale) {
    document.cookie = `locale=${locale};path=/;max-age=31536000;samesite=lax`;
    localStorage.setItem("locale", locale);
    setIsOpen(false);
    window.location.reload();
  }

  const currentLang = languages.find((l) => l.code === current) ?? languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
          isOpen
            ? "bg-white/15 text-white"
            : dark
              ? "text-white/60 hover:bg-white/10 hover:text-white"
              : "text-white/60 hover:bg-white/10 hover:text-white"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{currentLang.label}</span>
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className="absolute right-0 top-full z-50 mt-3 w-40 overflow-hidden rounded-2xl p-1.5 shadow-2xl"
          style={{
            background: "rgba(12, 17, 30, 0.96)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {languages.map((lang) => {
            const isActive = current === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:bg-white/6 hover:text-white"
                }`}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span className="font-medium">{lang.label}</span>
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
