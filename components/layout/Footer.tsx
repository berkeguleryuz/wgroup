"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LinkedInIcon, InstagramIcon } from "@/components/icons";

/* ---------- Link data ---------- */

const divisionLinks = [
  { key: "wquality", href: "/w-quality" },
  { key: "wdigilab", href: "/w-digilab" },
  { key: "wstudio", href: "/w-studio" },
] as const;

const productLinks = [
  { key: "individualProducts", href: "/products/automotive-professionals" },
  {
    key: "corporateProducts",
    href: "/products/automotive-professionals-corporate",
  },
  { key: "digitautopivot", href: "/products/digitautopivot" },
  { key: "eduarttransform", href: "/products/eduarttransform" },
  { key: "auditmastermind", href: "/products/auditmastermind" },
  { key: "autopathwayNavigator", href: "/products/autopathway-navigator" },
  { key: "supplierelevatePro", href: "/products/supplierelevate-pro" },
  { key: "evolvementor", href: "/products/evolvementor" },
] as const;

const companyLinks = [
  { key: "about", href: "/about" },
  { key: "whatWeDo", href: "/what-we-do" },
  { key: "ourDivisions", href: "/our-divisions" },
  { key: "ourStory", href: "/our-story" },
  { key: "ourVision", href: "/our-vision" },
  { key: "career", href: "/career" },
  { key: "socialResponsibility", href: "/social-responsibility" },
  { key: "faq", href: "/faq" },
] as const;

const legalLinks = [
  { key: "impressum", href: "/impressum" },
  { key: "datenschutz", href: "/datenschutz" },
  { key: "agb", href: "/agb" },
  { key: "cookiePolicy", href: "/cookie-policy" },
] as const;

/* ========== Footer ========== */

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-secondary">
      {/* ---------- Main columns ---------- */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/images/wgroup-logo.png"
            alt="WGroup"
            width={160}
            height={74}
            className="h-10 w-auto opacity-80"
          />
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t("company")}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t("divisions")}
            </h3>
            <ul className="space-y-2.5">
              {divisionLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t("products")}
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t("legal")}
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t("followUs")}
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/wgroup-gmbh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/wgroupgmbh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="border-t border-white/6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 text-center text-xs text-white/40 sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span>{t("phone")}</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>{t("email")}</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>{t("registeredAddress")}</span>
          </div>
          <span>{t("copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
