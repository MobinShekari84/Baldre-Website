---
name: nextjs-frontend-guidelines
description: >-
  Complete frontend architecture, Flos-inspired light gallery design system, bilingual RTL/LTR rules, Yekan Bakh typography setup, and UI/UX specifications tailored for the Baldre Lighting website (Next.js App Router + Tailwind CSS + Framer Motion).
---

# Baldre Lighting — Specific Frontend Engineering & Design Skill

Activate this skill whenever you are planning, scaffolding, styling, or coding the Next.js frontend for **Baldre Lighting**. Every page and component must strictly follow this blueprint.

---

## 1. Mandatory Client UI/UX Rules (Non-Negotiable)

1.  **Bright, Modern, Minimal Light Gallery Aesthetic (Inspired by Flos.com):**
    *   Primary background: Gallery White (`#FFFFFF`) paired with Warm Stone/Alabaster (`#F5F4F0`) and Soft Travertine (`#EFECE6`).
    *   Primary ink: Deep Carbon (`#111111`) and Muted Stone (`#55534E` / `#686662`).
2.  **Full-Display Hero Section (`عکس Full Display با یک تیتر و یک متن کوتاه زیرش`):**
    *   The Hero section MUST be a full-viewport (`min-h-[88vh]` / `h-[92vh]`) atmospheric photograph with **one bold headline (یک تیتر)** and **one short subtitle underneath (یک متن کوتاه زیرش)** so the visitor is captivated in a single glance (`توی یک نگاه مخاطب جذبش بشه`).
3.  **Local Persian Font from `/fonts/` Folder (`Yekan Bakh Fa`):**
    *   Load all 8 weights of `Yekan Bakh Fa` (`01 Hairline` to `08 Fat`) directly from `/Users/mobin_shekari/Documents/Baldre lightening website/fonts/` via `next/font/local` in `layout.tsx` AND `@font-face` in `globals.css`.
    *   Ensure `Yekan Bakh Fa` is applied across all elements (headings, body, buttons, nav, numbers, badges) without being overridden by `font-mono` or system fallbacks.
4.  **Soft Rounded Geometry — Never Use Sharp Corners (`از مستطیل های گوشه سخت و تیز استفاده نکن`):**
    *   **FORBIDDEN:** Sharp 90-degree corners (`rounded-none`).
    *   **REQUIRED:** Soft, modern rounded corners everywhere (`rounded-2xl`, `rounded-3xl` for cards/containers/modals/images, and `rounded-full` or `rounded-xl` for buttons/pills/inputs).
5.  **All Texts Must Be Justified (`همه تکست ها باید justify باشن`):**
    *   All paragraphs (`p`), product descriptions, project summaries, editorial stories, and multi-line text blocks MUST use `text-justify` (`text-align: justify`).
6.  **Attractive Modern Navbar with Minimal Hover Underline Animation:**
    *   Use a sleek, modern glassmorphic navbar (`backdrop-blur-md`) where hovering over any nav link triggers a smooth, minimal underline animation (`after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`).
7.  **Zero Backend / Debug Text in UI (`بخش های live django اینارو همش حذف کن`):**
    *   Never display developer/backend strings such as `"DJANGO REST API LIVE"`, `"Baldre API"`, or server status badges anywhere in the UI.

---

## 2. Typography & Local Font Setup (`Yekan Bakh Fa`)

The workspace includes the complete **Yekan Bakh Fa** `.woff2` family in `/fonts/`:
*   `Yekan Bakh Fa 01 Hairline.woff2` (`weight: '100'`)
*   `Yekan Bakh Fa 02 Thin.woff2` (`weight: '200'`)
*   `Yekan Bakh Fa 03 Light.woff2` (`weight: '300'`)
*   `Yekan Bakh Fa 04 Regular.woff2` (`weight: '400'`)
*   `Yekan Bakh Fa 05 Medium.woff2` (`weight: '500'`)
*   `Yekan Bakh Fa 06 Bold.woff2` (`weight: '700'`)
*   `Yekan Bakh Fa 07 Heavy.woff2` (`weight: '800'`)
*   `Yekan Bakh Fa 08 Fat.woff2` (`weight: '900'`)

Configure these via `next/font/local` in `src/app/layout.tsx` pointing directly to `../../../fonts/Yekan Bakh Fa ...woff2` and bind the CSS variable `--font-yekan` to `html` and `body`.

### Technical Metrics in RTL (`lang="fa"`)
Wrap technical values (`CRI >95`, `220-240V AC`, `1200 × 35 × 40 mm`, `BAL-LS-01-BRS`, `3000K`, `IP20`) in `dir="ltr"` while keeping `Yekan Bakh Fa` as the font family so numbers and symbols align cleanly without switching to an ugly monospace courier font.

---

## 3. Logical CSS & Bilingual Support (`fa` & `en`)
*   **Default Language:** Persian (`fa`, `dir="rtl"`), with a 1-click toggle to English (`en`, `dir="ltr"`).
*   **Logical Properties:** Always use `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*` instead of `left`/`right`.
