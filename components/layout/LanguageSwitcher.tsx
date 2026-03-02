"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
  { code: "de", label: "DE" },
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

  function switchLocale(locale: Locale) {
    document.cookie = `locale=${locale};path=/;max-age=31536000;samesite=lax`;
    localStorage.setItem("locale", locale);
    setIsOpen(false);
    window.location.reload();
  }

  const currentLabel =
    languages.find((l) => l.code === current)?.label ?? "EN";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
          dark
            ? "text-white/70 hover:text-white hover:bg-white/10"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {currentLabel}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-50 mt-2 min-w-[90px] overflow-hidden rounded-xl py-1 shadow-2xl"
          style={{
            background: "rgba(15, 20, 35, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              className={`block w-full px-4 py-2 text-left text-sm transition-all duration-200 hover:bg-white/10 ${
                current === lang.code
                  ? "font-semibold text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
