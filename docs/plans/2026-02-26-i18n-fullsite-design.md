# WGroup GmbH - i18n Full Site Design

**Date:** 2026-02-26
**Status:** Approved

## Overview

Build the complete WGroup GmbH website with i18n support (EN/TR/DE) on Next.js 16 + React 19 + Tailwind v4. Light blue theme (#F7FDFF), GSAP animations, no URL language prefixes, localStorage-based language persistence.

## i18n Strategy

- **Library:** next-intl (URL prefix-free mode)
- **Languages:** English (default), Turkish, German
- **Detection flow:** localStorage -> Accept-Language geo-detect -> fallback EN
- **Germany visitors:** auto-detect German
- **Persistence:** localStorage `locale` key
- **URLs:** Always English, no prefix (`/about`, `/contact`, not `/de/about`)
- **Translations:** JSON files in `messages/` directory (en.json, tr.json, de.json)

## Color Palette

- Background: `#F7FDFF`
- Primary: `#1E6DB5`
- Secondary: `#E8F4FD`
- Text: `#1A2332`
- Muted: `#64748B`
- Border: `#D0E5F5`
- White: `#FFFFFF`
- No gradients

## Architecture

```
app/
├── layout.tsx                    # Root layout - i18n provider, fonts
├── page.tsx                      # Homepage
├── about/page.tsx
├── our-mission/page.tsx
├── partner/page.tsx
├── social-responsibility/page.tsx
├── career/page.tsx
├── contact/page.tsx
├── faq/page.tsx
├── wedu-factory/page.tsx
├── warticode/page.tsx
├── wqualitysphere/page.tsx
├── products/
│   ├── automotive-professionals/page.tsx
│   ├── automotive-professionals-corporate/page.tsx
│   ├── digitautopivot/page.tsx
│   ├── eduarttransform/page.tsx
│   ├── auditmastermind/page.tsx
│   ├── autopathway-navigator/page.tsx
│   ├── supplierelevate-pro/page.tsx
│   └── evolvementor/page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/page.tsx
components/
├── layout/                       # Navbar, Footer, LanguageSwitcher
├── gsap/                         # GSAP animated sections
├── ui/                           # Buttons, cards, tabs
messages/
├── en.json
├── tr.json
└── de.json
```

## Homepage Sections

1. **Hero** - Full screen, word-by-word title animation, CTA buttons
2. **What We Do** - Brief description, fade-in
3. **Brands** - 3 brand cards, stagger animation
4. **Products Tabs** - 4 tabs (Individual, Corporate, WArtiCode, WQualitySphere)
5. **Blog** - Recent posts grid, scroll-trigger reveal
6. **Categories** - Knowledge, Digitalization, Quality Management
7. **Contact CTA** - Call to action section
8. **Footer** - Links, social media, contact info

## Pages

- **Company:** About, Mission, Partner, Social Responsibility, Career
- **Brands:** WEdu Factory, WArtiCode, WQualitySphere
- **Products:** 8 product detail pages
- **Blog:** Listing + [slug] detail
- **Other:** FAQ (accordion), Contact (form + info)

## GSAP

- @gsap/react + useGSAP hook
- ScrollTrigger for section reveals
- Hero word-by-word animation
- Card stagger fade-in
- Navbar scroll hide/show
- force3D: true for performance

## Responsive

- Mobile-first with Tailwind breakpoints
- Hamburger menu on mobile
- Grids collapse to single column

## Content

- 29 content files from wgroupgmbh-content
- All translated to EN/TR/DE via AI
- Organized in flat JSON namespace per page
