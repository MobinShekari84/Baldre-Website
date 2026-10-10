# Technical Architecture Brainstorming & Implementation Plan

## Goal Description
The objective is to determine the best technical stack and project structure for **Baldre Lighting**. The site must achieve a world-class, ultra-modern, and minimal design (inspired by Louis Poulsen, Moooi, and Davide Groppi) while managing a substantial catalog of 200–300 products. Each product requires robust data modeling for catalogs, technical information, and multiple high-resolution images.

---

## 5 Architecture Options for Baldre

Managing 300 products with heavy imagery while maintaining smooth, cinematic UI transitions (like Davide Groppi) requires a careful choice of technology. Here are 5 distinct technical structures we can use to build this, ranging from purely Python-driven to heavy JavaScript architectures.

### Option 1: The "Classic Monolith" (Django + Django Templates + Alpine.js + Tailwind CSS)
*   **How it works:** We write pure Python for the backend (Django). The frontend is rendered by the server using standard HTML templates. We sprinkle in a tiny JS library (Alpine.js) for interactions like image sliders or mobile menus.
*   **Pros:** 
    *   **Extremely fast to build.** You get the legendary Django Admin panel instantly, which is perfect for managing 300 products, their catalogs, and image galleries.
    *   Single codebase. Easy to deploy and maintain.
    *   Perfect SEO out of the box.
*   **Cons:** Traditional page loads. Achieving the seamless, buttery-smooth page transitions seen on high-end luxury sites is harder when the browser has to load a new HTML page every click.

### Option 2: The "Headless CMS + App-Like Frontend" (Django REST Framework + Next.js + Framer Motion)
*   **How it works:** We split the app in two. We use Python/Django purely as a backend API and admin dashboard. We build a separate frontend using JavaScript/React (Next.js) and use a library like Framer Motion to animate it.
*   **Pros:**
    *   **The absolute best UX.** This is how you achieve the cinematic, fade-in, zooming transitions found on sites like Moooi and Foscarini. 
    *   The frontend feels like a native app.
*   **Cons:** We have to maintain two codebases (Python and JS). It takes significantly longer to build and requires deploying to two different servers (e.g., Vercel for frontend, Liara for backend).

### Option 3: The "Modern Monolith" (Django + HTMX + Tailwind CSS)
*   **How it works:** Similar to Option 1, but we use a modern tool called **HTMX**. HTMX allows us to swap parts of the page without a full reload, using only HTML attributes.
*   **Pros:** 
    *   Single Python codebase, but it *feels* like a modern JavaScript app. 
    *   No page reloads when browsing the 300 products, making it feel very fast and premium.
*   **Cons:** Complex, physics-based animations are harder to implement than in Option 2.

### Option 4: The "Static Site" (Next.js SSG + Strapi or Sanity CMS)
*   **How it works:** We ditch Django completely. We use a cloud-based Headless CMS (like Sanity) or Strapi to manage the 300 products. We build a Next.js frontend that pre-compiles all 300 product pages into static HTML files before deployment.
*   **Pros:**
    *   **Blazing fast performance.** Because the pages are pre-built, images load instantly, which is critical for a highly visual portfolio.
    *   Extremely cheap to host the frontend.
*   **Cons:** The admin panel (Sanity/Strapi) can be expensive or complex to self-host compared to Django's free built-in admin.

### Option 5: The "Pure Frontend + BaaS" (Vue.js / Nuxt 3 + Supabase)
*   **How it works:** We write everything in JavaScript/TypeScript using Vue.js (Nuxt). For the database and backend, we use Supabase (a Backend-as-a-Service).
*   **Pros:**
    *   Very fast frontend development. Nuxt provides incredible page transitions natively.
    *   No need to write backend API code; Supabase handles it.
*   **Cons:** We lose the highly customizable Django Admin panel. Managing 300 products with multiple relationships (Product -> Category -> Images -> Catalogs) can become clunky in generic BaaS dashboards.

---

## 🏆 My Recommendation

Given your request for an **ultra-modern, minimal design (Davide Groppi style)** combined with a **large catalog (300 products)**, I highly recommend **Option 2 (Headless Django + Next.js)**, or if you want to move faster, **Option 3 (Django + HTMX)**.

*   **Why Option 2?** Luxury lighting websites rely heavily on **micro-interactions** (hover effects, page transition fades, smooth scrolling). Next.js + Framer Motion is the industry standard for this. You still get to keep Django for the admin panel, which is unmatched for managing the 300 items.

---

## Open Questions

> [!IMPORTANT]
> **User Review Required: Which path should we take?**
> 1. **Do you prioritize speed of development (Option 1/3) or the absolute highest quality, cinematic user experience (Option 2)?**
> 2. Are you comfortable with us maintaining two separate folders/codebases (a Python API and a Next.js Frontend) if we choose Option 2?

## Proposed Changes (If Option 2 is selected)

### 1. Backend Architecture (Django)
*   **App 1: `products`**
    *   Models: `Category`, `Product` (Title, Description, Specs), `ProductImage` (for galleries), `ProductCatalog` (PDF uploads).
*   **App 2: `core`**
    *   Models: `AboutUs`, `ContactSettings` (to manage site-wide text).
*   **API:** Implement Django REST Framework to serve JSON data to the frontend.

### 2. Frontend Architecture (Next.js)
*   **Framework:** Next.js (App Router) using React.
*   **Styling:** Tailwind CSS for minimal, utility-first styling.
*   **Animations:** Framer Motion for page transitions and hover effects.
*   **State Management:** React Query for fetching the 300 products efficiently from the Django API with caching.
