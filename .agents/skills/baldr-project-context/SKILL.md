---
name: baldr-project-context
description: >-
  Provides core context about the Baldr Lighting website project, including target audience, brand identity, bilingual requirements, and the specific Headless Django + Next.js tech stack.
---

# Baldr Lighting Project Context

This project is a website for **Baldr** (بالدر), a high-end lighting business located in Tehran, Iran, offering a catalog of roughly 200-300 lighting fixtures.

## Brand Identity & Market
*   **Industry:** Luxury & Architectural Lighting.
*   **Market:** Iran (Tehran) and international clients.
*   **Vibe:** Ultra-minimalist, modern, architectural (Inspired by Flos, Davide Groppi, Moooi, Artemide).
*   **UI Focus:** Clean, sharp-cornered gallery design (`rounded-none`), bright light-mode gallery aesthetic with vibrant red accent `#E40521`.

## Technical Architecture (Option 2)
*   **Hosting:** Liara Cloud Platform (Iran).
*   **Backend:** Python + Django REST Framework (DRF) acting as a Headless CMS (`baldr_api`). Uses PostgreSQL/SQLite and Liara S3 Object Storage for media.
*   **Frontend:** JavaScript/TypeScript + Next.js (React) + Tailwind CSS + Framer Motion.

## Bilingual Guidelines (CRITICAL)
*   **Languages:** The site is strictly **Bilingual (Farsi + English)**.
*   **Layouts:** The frontend MUST dynamically support RTL (Right-to-Left) for Farsi and LTR (Left-to-Right) for English. 
*   **Backend Data:** Django models account for bilingual fields (`title_fa`, `title_en`, etc.).

## When to use this skill
Activate this skill whenever you are designing UI, writing frontend/backend code, or configuring servers for the Baldr project to ensure alignment with the core project goals.
