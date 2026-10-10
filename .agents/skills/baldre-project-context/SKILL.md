---
name: baldre-project-context
description: >-
  Provides core context about the Baldre Lighting website project, including target audience, brand identity, bilingual requirements, and the specific Headless Django + Next.js tech stack.
---

# Baldre Lighting Project Context

This project is a website for **Baldre**, a high-end lighting business located in Tehran, Iran, offering a catalog of roughly 200-300 lighting fixtures.

## Brand Identity & Market
*   **Industry:** Luxury & Architectural Lighting.
*   **Market:** Iran (Tehran) and international clients.
*   **Vibe:** Ultra-minimalist, modern, architectural (Inspired by Davide Groppi, Moooi, Artemide).
*   **UI Focus:** The interface should be "invisible" (monochromatic, dark mode, strict grids). The product photography provides the color.

## Technical Architecture (Option 2)
*   **Hosting:** Liara Cloud Platform (Iran).
*   **Backend:** Python + Django REST Framework (DRF) acting as a Headless CMS. Uses PostgreSQL and Liara S3 Object Storage for media (High-res images + PDF catalogs).
*   **Frontend:** JavaScript/TypeScript + Next.js (React) + Tailwind CSS + Framer Motion (for cinematic transitions).

## Bilingual Guidelines (CRITICAL)
*   **Languages:** The site is strictly **Bilingual (Farsi + English)**.
*   **Layouts:** The frontend MUST dynamically support RTL (Right-to-Left) for Farsi and LTR (Left-to-Right) for English. 
*   **Backend Data:** Django models must account for bilingual fields (e.g., `title_fa`, `title_en`, `description_fa`, `description_en` or via translation packages).

## When to use this skill
Activate this skill whenever you are designing UI, writing frontend/backend code, or configuring servers for the Baldre project to ensure alignment with the core project goals.
