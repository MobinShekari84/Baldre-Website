# Liara Deployment & Architecture Guide for Baldre

This document outlines the architecture, deployment strategy, and technical setup for **Baldre Lighting** using **Option 2: Headless Django + Next.js** on **Liara Cloud Platform** (Iran).

---

## 1. High-Level Architecture Overview

```
                      [ Client / Visitor ]
                               │
               (https://baldre.ir / www.baldre.ir)
                               ▼
                ┌─────────────────────────────┐
                │   Frontend: Next.js App     │  ← Liara NodeJS Platform
                └──────────────┬──────────────┘
                               │ (REST API calls)
                               ▼
                ┌─────────────────────────────┐
                │    Backend: Django REST     │  ← Liara Python Platform
                │    (https://api.baldre.ir)  │
                └──────┬───────────────┬──────┘
                       │               │
     (Model/Data sync) │               │ (File uploads via Boto3)
                       ▼               ▼
    ┌─────────────────────────┐   ┌───────────────────────────────┐
    │  Database: PostgreSQL   │   │ Storage: Liara Object Storage │
    │   (Liara Managed DB)    │   │      (S3-compatible bucket)   │
    └─────────────────────────┘   └───────────────────────────────┘
```

---

## 2. Service Breakdown on Liara

### A. Backend App (`api.baldre.ir`)
*   **Platform:** Python (Django 5+)
*   **Web Server:** Gunicorn + Whitenoise (for static files in admin)
*   **Libraries:** 
    *   `djangorestframework`
    *   `django-cors-headers` (to allow requests from `baldre.ir`)
    *   `django-storages[boto3]` (for S3 object storage upload)
    *   `pillow` (image processing)
*   **Features:**
    *   Built-in Admin dashboard at `/admin/`
    *   Endpoints for categories, products, image galleries, and downloadable PDF catalogs.

### B. Frontend App (`baldre.ir`)
*   **Platform:** Node.js (Next.js 14+ App Router)
*   **Design & UI:**
    *   Tailwind CSS (monochromatic, dark/minimalist aesthetic)
    *   Framer Motion (smooth page transitions, staggered gallery fade-ins)
    *   Vazirmatn / Yekan Bakh Persian fonts
    *   RTL Layout support

### C. Database (PostgreSQL)
*   **Provider:** Liara Managed Database
*   **Features:** Auto backups, high reliability, direct connection strings.

### D. Object Storage (S3)
*   **Bucket Name:** e.g., `baldre-media`
*   **Purpose:** Stores all 300+ lighting fixture photos, high-res lifestyle shots, and PDF catalogs.
*   **Advantage:** Fast CDN delivery within Iran, persistent storage unaffected by app redeployments.

---

## 3. Key Configuration Checklist

1.  **CORS Configuration in Django:**
    ```python
    CORS_ALLOWED_ORIGINS = [
        "https://baldre.ir",
        "https://www.baldre.ir",
        "http://localhost:3000",
    ]
    ```

2.  **S3 / Liara Storage Integration in `settings.py`:**
    ```python
    AWS_ACCESS_KEY_ID = env('LIARA_STORAGE_ACCESS_KEY')
    AWS_SECRET_ACCESS_KEY = env('LIARA_STORAGE_SECRET_KEY')
    AWS_STORAGE_BUCKET_NAME = env('LIARA_STORAGE_BUCKET_NAME')
    AWS_S3_ENDPOINT_URL = env('LIARA_STORAGE_ENDPOINT')
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    ```

3.  **Deployment Method:**
    *   Using `liara-cli` or Liara GitHub Actions integration for automated CI/CD.
