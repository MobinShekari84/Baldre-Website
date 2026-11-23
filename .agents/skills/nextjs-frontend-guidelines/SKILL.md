---
name: nextjs-frontend-guidelines
description: >-
  Complete frontend architecture, Flos-inspired sharp minimalist gallery design system, bilingual RTL/LTR rules, Yekan Bakh typography setup, dual-image hover, and UI specifications tailored for the Baldr Lighting website (Next.js 15 App Router + Tailwind CSS v4 + Framer Motion).
---

# Baldr Lighting — Frontend Engineering & Design Skill

Activate this skill whenever planning, scaffolding, styling, or coding the Next.js frontend for **Baldr Lighting**.

---

## 1. Mandatory Brand UI/UX Rules (Non-Negotiable)

1. **Brand Identity:**
   * Official name: **Baldr** (Persian: **بالدر**).
   * Logo: Always display the red spiral 'B' mark (`/images/baldr-logo-red.webp`).
   * Primary brand accent: `#E40521`.

2. **Bright, Modern, Minimal Light Gallery Aesthetic (Inspired by Flos.com):**
   * Primary background: Gallery White (`#FFFFFF`) paired with Soft Alabaster (`#F5F4F0`) and Muted Grey borders (`#E5E5E5`).
   * Deep Carbon ink (`#111111`) with high readability.

3. **Sharp Rectangular Geometry (`rounded-none`):**
   * **FORBIDDEN:** Soft rounded corners or rounded pills (`rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`).
   * **REQUIRED:** Strict sharp geometric precision (`rounded-none`) across all cards, modals, buttons, image containers, input fields, and category strips. (Only circular swatches for finish colors are round).

4. **Full-Display Hero Section with Seamless 1080p Ambient Video Loop:**
   * Full viewport height (`h-screen min-h-[680px]`).
   * Autoplaying seamless 1080p architectural reel (`/videos/baldr-screen-loop.mp4`) as the sole background (`autoPlay`, `loop`, `muted`, `playsInline`, `object-cover`).
   * Day/Night/Sun/Moon toggle buttons are completely removed per client specification; the clean typographic headline, poetic subtitle, and glass Explore CTA float over the video loop.

5. **Dual-Image Architectural Hover:**
   * Every product card features dual imagery:
     - Normal state: High-resolution studio cutout on pure white (`baldr-prod-*-studio.webp`).
     - Hover state: Smooth cross-fade to illuminated in-situ architectural context (`baldr-prod-*-arch.webp`).

6. **Authentic 8 Products Catalog:**
   * The catalog is restricted exclusively to the 8 authentic Baldr fixtures with genuine photos:
     `vector-linear-suspension`, `vector-r-recessed-downlight`, `vector-sm-surface-mounted`, `tracking-magnet-48v-system`, `aurelia-sculptural-table-lamp`, `monolith-architectural-floor-lamp`, `eclipse-architectural-wall-sconce`, `terra-landscape-bollard-ip65`.

7. **Local Persian Font (`Yekan Bakh Fa`):**
   * Loaded locally across all 8 weights from `/fonts/` via `next/font/local` in `layout.tsx` and bound to `--font-yekan`. Never overridden by system fonts.
   * Technical values (`CRI >95`, `3000K`, `IP20`) wrapped with `dir="ltr"` inside `Yekan Bakh Fa`.

8. **Justified Text Everywhere (`text-justify`):**
   * All paragraphs, product descriptions, editorial stories, and summaries MUST use `text-justify`.

9. **Image-Rich Visual Navbar & Mega Menu (Foscarini Benchmark):**
   * The navbar features visual photo previews (`home navbar هم عکس باشه`):
     - Desktop: Header bar contains a live photo thumbnail button with pulsing crimson indicator that toggles a full-width **Visual Mega Menu**.
     - Visual Mega Menu displays an 8-card grid of authentic categories with high-resolution photography (`baldr-prod-*-arch.webp`), real-time zoom on hover, and an editorial spotlight card linking to the 151-page official catalogue.
     - Mobile: Full-screen visual navigation drawer where every single section card is paired with its authentic high-definition architectural photo.

10. **Foscarini-Inspired Artistic Manifesto & CCT Spectrum:**
    * Features an editorial architectural manifesto section ("چراغ چیست؟ — What's in a Lamp?") establishing luminaires as architectural sculptures.
    * Incorporates an interactive CCT lighting warmth selector (2700K Sunset Gold / 3000K Gallery Soft / 4000K Crisp Modern) demonstrating spectral clarity and changing ambient glow dynamically.
    * AI-generated atmospheric imagery is stored distinctly in `ai-docs/` (WebP in `frontend/public/images/ai-docs/`) to maintain clear segregation from authentic product photos.

11. **Radical Minimalism for Category Displays (Photo + Title Only):**
    * In category grids and homepage product strips, each box must contain ONLY:
      1. A high-resolution architectural photo (`baldr-prod-*-arch.webp` with studio cutout reveal on hover).
      2. A concise Title (`item.name_fa` / `item.name_en`) with subtle red action arrow `↗`.
    * **STRICTLY FORBIDDEN on category cards:** No descriptions, no taglines, no SKU badges, no model counts, no secondary subtitles or verbose explanatory paragraphs beneath section titles. The site must remain strictly minimal and artistic.
    * **Left/Right Flanking Navigation:** Category slider navigation `<>` buttons must flank the row on the left and right sides with a subtle, pale aesthetic (`border-[#141416]/15`, `text-[#141416]/30`).
