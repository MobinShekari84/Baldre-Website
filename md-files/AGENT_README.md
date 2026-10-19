# AGENT PROJECT MEMORY & DIRECTORY INDEX

**AGENT INSTRUCTION:** ALWAYS read this document before generating architectural code, setting up servers, or writing UI components for the Baldre project. This is your core memory of the client's requirements and file locations.

## 1. The Business Context
*   **Client:** Baldre Lighting (Tehran, Iran).
*   **Scope:** A high-end portfolio website showcasing 200-300 luxury lighting products.
*   **Vibe:** Bright, light, modern, minimal gallery aesthetic inspired by **Flos (`flos.com`)**.
*   **Functionality:** Phase 1 & 2 focus on an immersive catalog + admin panel for architects and consumers. Phase 3 expands to full E-Commerce.

## 2. Mandatory UI/UX Design Rules (Explicitly Requested by User)
1.  **Full-Display Hero Section (`عکس Full Display با یک تیتر و یک متن کوتاه زیرش`):**
    *   The Hero section MUST be a full-viewport (`min-h-[88vh]` / `h-[92vh]`) captivating architectural photograph with **one bold headline (یک تیتر)** and **one short subtitle underneath (یک متن کوچیک زیرش)** so the audience is immediately captivated in a single glance (`توی یک نگاه مخاطب جذبش بشه`).
2.  **Local Persian Font from `/fonts/` Folder (`فونت فارسی از داخل پوشه fonts`):**
    *   All Farsi typography MUST be loaded directly from `/Users/mobin_shekari/Documents/Baldre lightening website/fonts/` (`Yekan Bakh Fa 01 Hairline.woff2` through `08 Fat.woff2`) via `next/font/local` and `@font-face`. Never let `font-mono` or system fonts override `Yekan Bakh Fa`.
3.  **Soft Rounded Corners — No Sharp Rectangles (`از مستطیل های گوشه سخت و تیز استفاده نکن`):**
    *   NEVER use sharp 90-degree corners (`rounded-none`). Every card, image container, button, input, badge, and modal must use soft modern curvature (`rounded-2xl`, `rounded-3xl`, `rounded-xl`, `rounded-full`).
4.  **Justified Text Everywhere (`همه تکست ها باید justify باشن`):**
    *   All paragraphs, descriptions, summaries, and multi-line text blocks MUST be justified (`text-justify` / `text-align: justify`).
5.  **Modern Attractive Navbar with Minimal Hover Underline Animation (`navbar جذاب و مدرن با انیمیشن خط زیرین در hover`):**
    *   The Navbar must be sleek, modern, and glassmorphic, with a smooth minimal underline animation (`after:scale-x-0 hover:after:scale-x-100 after:transition-transform`) when hovering over navigation links.
6.  **No "Live Django / API" Debug Labels (`بخش های live django اینارو همش حذف کن`):**
    *   Never show any backend/framework mentions like "Django REST API Live", "Baldre API", etc. anywhere in the UI.

## 3. Live Full-Stack Implementation (`frontend/` + `backend/`)
*   **Frontend (`frontend/`):** Next.js 15 App Router + React 19 + Tailwind CSS v4 + Framer Motion + Lucide Icons.
    *   **URL:** `http://localhost:3000`
    *   **Default Language:** Persian (`fa`, `dir="rtl"`) using all 8 weights of the local **Yekan Bakh Fa (`woff2`)** font from `/fonts/`.
    *   **Bilingual Toggle:** One-click switch between `فارسی` (RTL) and `EN` (LTR) in the top navbar.
*   **Backend (`backend/`):** Python + Django 6.1 + Django REST Framework + CORS Headers.
    *   **API Endpoint:** `http://127.0.0.1:8000/api/homepage/`, `/api/products/`, `/api/projects/`, `/api/news/`, `/api/inquiries/`
    *   **Django Admin Panel:** `http://127.0.0.1:8000/admin/` (Default Superuser: `admin` / `baldre2026`)
    *   **Seed Command:** `python manage.py seed_baldr`

## 4. Organized Workspace File Index
*   **Application Code:**
    *   `frontend/` -> Next.js 15 Bilingual Luxury Frontend (`src/app/page.tsx`, `src/data/baldrData.ts`, `src/app/globals.css`, `src/app/layout.tsx`).
    *   `backend/` -> Django REST Framework API & Admin CMS (`catalog/models.py`, `catalog/serializers.py`, `catalog/views.py`, `catalog/admin.py`, `baldr_api/`).
*   **Strategy & Research (`md-files/01-strategy/`):**
    *   `md-files/01-strategy/Baldr_Lighting_Project_Plan.md`
    *   `md-files/01-strategy/Project_Phases_FA.md`
    *   `md-files/01-strategy/Lighting_Competitor_Analysis.md`
*   **Architecture & UI Rules (`md-files/02-architecture/`):**
    *   `md-files/02-architecture/UI_UX_Design_Rules_FA.md`
    *   `md-files/02-architecture/Technical_Architecture_Plan.md`
    *   `md-files/02-architecture/Liara_Deployment_and_Architecture_Guide.md`
    *   `md-files/02-architecture/Site_Tree_Map_Plan.md`
    *   `md-files/02-architecture/Sitemap_FA.md`
*   **Data Modeling (`md-files/03-data-model/` & `data-templates/`):**
    *   `md-files/03-data-model/Product_Data_Model_Plan.md`
    *   `md-files/03-data-model/data-template-help.md`
    *   `data-templates/sample-product-template.json`
*   **Executive PDF Reports (`pdf-reports/`):**
    *   `pdf-reports/Baldr_Sitemap_FA.pdf`
    *   `pdf-reports/Baldr_Phases_FA.pdf`


---

## 5. راهنمای راه‌اندازی و دپلوی لوکال (Local Deployment Guide)

### ۱) اجرای لوکال فرانت‌اند (Next.js)
```bash
cd frontend
npm install
# حالت توسعه (Development):
npm run dev
# یا حالت پروداکشن لوکال (Production):
npm run build
npm run start -- -p 3000
```
- مشاهده در مرورگر: `http://localhost:3000`

### ۲) اجرای لوکال بک‌اند و پنل ادمین (Django REST API)
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # در ویندوز: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_baldr
python manage.py runserver 127.0.0.1:8000
```
- پنل مدیریت جنگو: `http://127.0.0.1:8000/admin/` (نام کاربری: `admin` / رمز عبور: `baldre2026`)
- آدرس API صفحه اصلی: `http://127.0.0.1:8000/api/homepage/`
