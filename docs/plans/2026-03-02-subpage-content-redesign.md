# Sub-Page Content Section Redesign

## Problem
All 7 sub-pages use the same monotonous pattern: "icon left + text right" cards in a vertical stack. No visual hierarchy, no information architecture, no variety between pages.

## Solution
Each page gets a tailored layout pattern based on its content type. Draws from homepage patterns (corner brackets, numbered badges, gradient dividers, alternating directions).

## Pages & Designs

### 1. Our Mission — Numbered Timeline Stepper
- Each of 5 paragraphs becomes a numbered step with left vertical gradient line + numbered badge (01-05)
- Each step has its existing accent color
- First paragraph is larger/featured (full width, different bg)
- Thin gradient divider between steps

### 2. Career — Featured First + 2x2 Grid
- 1st card: full-width, larger, icon top-left corner, subtle glow bg
- Cards 2-5: `grid-cols-2`, more compact, icon top-center, text below (centered layout)
- Existing gradient CTA banner preserved

### 3. About — Stats Preserved + Alternating Text Blocks
- 4 stat card grid untouched (already good)
- 5 paragraphs: alternating highlight blocks — odd paragraphs normal, even paragraphs with primary tinted bg + left border accent (pullquote style)
- Gradient divider before CTA

### 4. Social Responsibility — 3-Column Grid with Corner Brackets
- Intro paragraph stays as-is
- 3 pillar cards: move to `sm:grid-cols-3` grid + corner bracket frame pattern (open brackets at corners instead of full border)
- Floating icon animation
- Conclusion banner preserved

### 5. Warticode — Enhanced Grid Cards
- Keep 2-col grid (already good base)
- Add numbered badge (01-04) to each card's top-left corner
- Cards already have title-only — add subtitle translation key for short descriptions
- Add action button to CTA banner

### 6. WEdu Factory — Alternating Direction Cards
- Cards alternate direction: odd cards icon-left, even cards icon-right
- Thin horizontal gradient divider between cards
- "Why" heading block gets subtitle text + corner bracket frame
- Dual CTA buttons preserved

### 7. WQualitySphere — Full-Width Feature Cards
- Top icon badge preserved
- Intro text card preserved
- 3 cards: full-width horizontal, thick colored accent border on left, title + new description text
- Subtle primary glow blob in each card

## Shared Visual Improvements (all pages)
- Gradient dividers: `h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent`
- Numbered badges: `w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold`
- 3D tilt preserved on existing cards
- Scroll reveal animations preserved (only layout changes)

## Files to Modify
- `app/our-mission/page.tsx`
- `app/career/page.tsx`
- `app/about/page.tsx`
- `app/social-responsibility/page.tsx`
- `app/warticode/page.tsx`
- `app/wedu-factory/page.tsx`
- `app/wqualitysphere/page.tsx`
- Translation files (for warticode subtitle keys if needed)
