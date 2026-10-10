---
name: django-backend-guidelines
description: >-
  Specific rules and patterns for writing the Python Django REST Framework backend for the Baldre project, handling 300+ products, bilingual data, and S3 media storage.
---

# Baldre Django Backend Guidelines

When tasked with writing backend code (Python/Django) for Baldre, strictly follow these rules:

## 1. Bilingual Data Modeling
The site serves Farsi (FA) and English (EN). 
*   Always use a robust translation approach for textual data (e.g., `name_en`, `name_fa`, `description_en`, `description_fa` on the model, or use `django-modeltranslation`).
*   The Django Admin panel must cleanly expose both languages to the store managers.

## 2. API Responses (Django REST Framework)
*   APIs must be read-only for the public (`baldre.ir`).
*   API endpoints must accept a language header (e.g., `Accept-Language: fa`) or query param (`?lang=en`) and return the appropriately localized text to the Next.js frontend to minimize payload size.
*   Implement robust caching (e.g., Redis or DRF cache) because fetching 300 products with heavy relations (images, downloads, specs) can be slow.

## 3. Media & File Storage
*   Remember that the app will deploy to Liara Cloud (ephemeral file system).
*   ALL `ImageField` and `FileField` (for PDFs, IES files, CAD files) MUST be configured to use `django-storages` and `boto3` uploading to an S3-compatible bucket. Never rely on local storage.
*   Ensure image uploads are optimized (use Pillow to compress images before saving to S3).

## 4. Product Model Structure
*   Always refer to `md-files/03-data-model/Product_Data_Model_Plan.md` for the exhaustive list of physical, electrical, and compliance fields. Do not miss technical specs like CRI, CCT, and Lumens.
