---
name: django-backend-guidelines
description: >-
  Specific rules and patterns for writing the Python Django REST Framework backend for the Baldr project, handling bilingual data, S3 media storage, and the authentic 8-product catalogue.
---

# Baldr Django Backend Guidelines

When tasked with writing backend code (Python/Django) for Baldr (`baldr_api`), strictly follow these guidelines:

## 1. Bilingual Data Modeling
The site serves Farsi (`fa`) and English (`en`).
* All textual data must feature bilingual fields (e.g. `name_fa`, `name_en`, `short_description_fa`, `short_description_en`).
* The Django Admin panel exposes both languages with clear grouping for store managers.

## 2. API Responses (Django REST Framework)
* Endpoints are read-only for public catalog:
  - `/api/homepage/` (consolidated payload for the Next.js homepage)
  - `/api/products/` and `/api/products/<slug>/`
  - `/api/projects/` and `/api/projects/<slug>/`
  - `/api/news/`
  - `/api/inquiries/` (POST for consultation form submissions)
* Standardized serializer representations must match the frontend schema defined in `baldrData.ts`.

## 3. Media & File Storage
* Format rule: Images referenced in seed data or uploaded must be `.webp`.
* Files are configured for ephemeral cloud deployment (Liara S3 Object Storage) using `django-storages` and `boto3`.
* Official catalogue path: `/downloads/Baldr-2026-Catalogue.pdf`.
* CAD profile diagrams: `/diagrams/baldr-vector-sm-profile.webp` and `/diagrams/baldr-vector-r-profile.webp`.

## 4. The 8 Authentic Products Seed Data
The database seed command (`python manage.py seed_baldr`) seeds exclusively the 8 authentic Baldr fixtures with their real studio & architectural `.webp` image assets:
- `BAL-VEC-SUS-01` (Vector Suspended)
- `BAL-VEC-REC-02` (Vector R Recessed)
- `BAL-VEC-SM-03` (Vector SM Surface Mounted)
- `BAL-TRK-MAG-04` (Tracking Magnet 48V)
- `BAL-AUR-TAB-05` (Aurelia Table)
- `BAL-MON-FLR-06` (Monolith Floor)
- `BAL-ECL-WAL-07` (Eclipse Wall Sconce)
- `BAL-TER-OUT-08` (Terra Bollard IP65)
