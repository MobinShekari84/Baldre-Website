# Baldre Lighting Website Project Plan

## Goal Description
The objective is to design, develop, and launch a modern, professional website for **Baldre**, a lighting business based in Tehran, Iran. This document outlines the market research, project strategy, implementation phases, and timeline to establish Baldre's digital footprint and showcase its products/services effectively.

## Market Research & Context

### Global Lighting Market Context
The top global lighting design companies and brands (e.g., Arup, BPI, Flos, Artemide, Louis Poulsen) succeed by focusing on a few key pillars:
*   **Aesthetics & Innovation:** Blending technology with art to create modern classics and visually captivating environments.
*   **Human-Centric Design:** Focusing on how light affects mood, well-being, and architectural spaces.
*   **High-Quality Imagery:** Their websites are highly visual, relying on stunning photography of their fixtures and completed architectural projects.

### Iranian Lighting Market Context (Tehran)
The local Iranian market is composed of both large-scale industrial manufacturers and specialized decorative lighting brands:
*   **Industrial/Commercial:** Companies like Mazinoor, Shoa Industrial Group, and Pars Shahab dominate large-scale, commercial, and street lighting.
*   **Decorative/Luxury:** Brands like Lampa Industrial Group and Asefian focus on luxury home accessories, chandeliers, and artistic designs.
*   **Location Hubs:** Lalehzar Street in Tehran is the historical heart of the lighting and electrical equipment market. 

### Baldre Lighting Context
Based on web research, "Baldre" does not currently have a widely recognized online presence in the lighting sector. This indicates that this project is likely a **brand establishment** or **digital transformation** effort for a new or local business. The website will be crucial in defining Baldre's market position—whether as a luxury decorative brand, a modern architectural lighting firm, or a commercial distributor.

> [!IMPORTANT] 
> **Defined Project Scope**
> *   **Primary Function:** A professional portfolio/catalog site to showcase projects and lighting fixtures. (No payment gateway needed at this time).
> *   **Content Management:** A robust admin panel is required for the Baldre team to easily add, remove, and edit projects and site content.
> *   **Design Vibe:** Minimal, modern design. High focus on layout, whitespace, and letting the product photography stand out.

---

## Proposed Implementation Plan

The project will be broken down into five core phases:

### Phase 1: Discovery & Strategy (Weeks 1-2)
*   **Brand Identity:** Finalize logo, brand colors (minimalist palette), typography, and visual language.
*   **Architecture:** Map out the portfolio structure, project categories, and admin panel requirements.
*   **Sitemap & UX Strategy:** Define the site structure (Home, Portfolio/Projects, About Us, Contact).

### Phase 2: UI/UX Design (Weeks 3-4)
*   **Wireframing:** Create the structural layout focusing on minimal, modern grids.
*   **Visual Design:** Design high-fidelity mockups. Emphasize whitespace, elegant typography, and high-quality image placeholders.
*   **Prototyping:** Interactive prototypes for client approval.

### Phase 3: Development (Weeks 5-8)
*   **Backend & Admin (Django):** Leverage Django to build the backend logic and utilize the built-in Django Admin interface to create a powerful, out-of-the-box content management system for projects and site text.
*   **Frontend Development:** Build the user-facing site. (Can be done using Django Templates with Tailwind CSS for speed, or as a Headless setup with React/Next.js for a highly interactive, app-like feel).
*   **Localization:** Implement full Persian (Farsi) language support with proper RTL (Right-to-Left) layout structuring.

### Phase 4: Content & SEO (Week 9)
*   **Portfolio Uploads:** Populate the site with high-quality project images and descriptions via the Django admin.
*   **SEO Optimization:** Optimize for local search terms (e.g., "نورپردازی معماری مدرن تهران") to compete in the Tehran market.

### Phase 5: Testing & Launch (Week 10)
*   **QA Testing:** Cross-browser and mobile responsiveness testing.
*   **Launch:** Deploy to production servers (e.g., Liara, ArvanCloud, or a standard VPS) and monitor performance.

---

## Skills and Automation Strategy

To accelerate development and ensure consistency, I will create custom Antigravity skills specifically for this workspace. 

#### [NEW] `.agents/skills/baldre-project-context/SKILL.md`
A skill that injects the brand guidelines, target audience, and technology stack into the agent's context whenever working on this project. This ensures the agent always remembers we are building an RTL-optimized lighting website for the Iranian market.

#### [NEW] `.agents/skills/generate-product-component/SKILL.md`
A reusable workflow to quickly generate frontend components (like product cards, hero sections) that adhere to Baldre's specific design system.
