---
name: baldr-project-context
description: >-
  Provides core context about the Baldr Lighting website project, including target audience, brand identity, bilingual requirements, the 8 authentic products catalogue, and the Headless Django + Next.js tech stack.
---

# Baldr Lighting Project Context

This project is the official luxury website for **Baldr** (بالدر), a premier architectural lighting studio located in Tehran, Iran.

## Brand Identity & Market
* **Brand Name:** Strictly **Baldr** (English) and **بالدر** (Persian).
* **Official Motto:** *"Where light lives"* / *"جایی که نور زندگی می‌کند"*.
* **Industry:** Architectural, Minimalist & Luxury Lighting (Flos / Davide Groppi / Artemide aesthetic).
* **Design Philosophy:** Gallery White aesthetic (`#FFFFFF`), muted concrete dividing lines (`#E5E5E5`), bold red accent (`#E40521`).
* **Geometry:** Sharp rectangular corners everywhere (`rounded-none`). No pill or soft-rounded cards allowed.
* **Guarantee:** Official 5-year replacement guarantee (1,825 days / 43,800 operating hours).

## Technical Architecture
* **Frontend:** Next.js 15 (App Router) + React 19 + Tailwind CSS v4 + Framer Motion.
* **Backend:** Python + Django 6.1 + Django REST Framework (`baldr_api`).
* **Deployment Target:** Liara Cloud (Iran) with S3-compatible Object Storage for media.
* **Database:** SQLite locally / PostgreSQL on production.

## Media & Assets Standards (Mandatory)
* **WebP Only:** Every raster image MUST be `.webp` format in `frontend/public/images/`.
* **Authentic 8 Products Only:** The catalog strictly contains the 8 products with authentic studio cutouts and in-situ architectural photos:
  1. `vector-linear-suspension` (`BAL-VEC-SUS-01`)
  2. `vector-r-recessed-downlight` (`BAL-VEC-REC-02`)
  3. `vector-sm-surface-mounted` (`BAL-VEC-SM-03`)
  4. `tracking-magnet-48v-system` (`BAL-TRK-MAG-04`)
  5. `aurelia-sculptural-table-lamp` (`BAL-AUR-TAB-05`)
  6. `monolith-architectural-floor-lamp` (`BAL-MON-FLR-06`)
  7. `eclipse-architectural-wall-sconce` (`BAL-ECL-WAL-07`)
  8. `terra-landscape-bollard-ip65` (`BAL-TER-OUT-08`)
* **Hero Media:** Supports 3-mode switching: Daylight image, Dusk/Night lighting image, and 1080p looping architectural reel (`/videos/baldr-screen-loop.mp4`).
* **Official Catalogue:** 151-page official PDF (61 MB) served at `/downloads/Baldr-2026-Catalogue.pdf`.
* **CAD Profile Diagrams:** Extracted profile sections stored at `/diagrams/baldr-vector-sm-profile.webp` and `baldr-vector-r-profile.webp`.

## Bilingual Requirements
* Strictly **Bilingual (Farsi + English)**.
* Dynamic RTL support for Persian (`/`) and LTR for English (`/en`).
* Typography: 8 local weights of `Yekan Bakh Fa` (`woff2`).
