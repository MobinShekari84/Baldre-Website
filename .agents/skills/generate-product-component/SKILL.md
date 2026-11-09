---
name: generate-product-component
description: >-
  Generates luxury lighting UI components (Product Cards with dual-image hover, Interactive Light On/Off Hero, Photometric Spec Tables, Variant Finish Swatches, and B2B CAD/IES Download Drawers) tailored for the bilingual Baldr Lighting frontend.
---

# Baldr Lighting — UI Component Generator Skill

Activate this skill whenever creating or modifying React/Next.js UI components for products, projects, or technical lighting specifications on the Baldr website.

---

## 1. Design Rules & Geometry
* **Corners:** Strict sharp rectangular corners (`rounded-none`). No `rounded-md` or `rounded-xl`.
* **Colors:** Gallery White (`#FFFFFF`), Carbon (`#111111`), Subtle Border (`#E5E5E5`), Accent Red (`#E40521`).
* **Images:** Format must always be `.webp`.
* **Hover Interaction:** Dual-image cross-fade (`duration-700`):
  - Primary: `/images/baldr-prod-*-studio.webp` (Daylight studio cutout).
  - Secondary: `/images/baldr-prod-*-arch.webp` (Illuminated in-situ architectural context).

---

## 2. TypeScript Data Interface (Matches `baldrData.ts`)

```ts
export interface BaldrProduct {
  id: number;
  slug: string;
  sku: string;
  category_slug: string;
  identity: {
    name_en: string;
    name_fa: string;
    sku: string;
    slug: string;
    category: string;
    category_fa: string;
    category_slug: string;
    designer_en: string;
    designer_fa: string;
    year: number;
    short_description_en: string;
    short_description_fa: string;
    long_description_en: string;
    long_description_fa: string;
  };
  physical_specs: {
    materials_en: string[];
    materials_fa: string[];
    finish_color_en: string;
    finish_color_fa: string;
    dimensions: {
      length_mm: number;
      width_mm: number;
      height_mm: number;
    };
    weight_kg: number;
    suspension_cable_max_mm: number;
    mounting_type_en: string;
    mounting_type_fa: string;
  };
  electrical_and_lighting: {
    light_source_en: string;
    light_source_fa: string;
    wattage_w: number;
    luminous_flux_lm: number;
    color_temperature_cct_en: string;
    color_temperature_cct_fa: string;
    color_rendering_index_cri: string;
    beam_angle_degrees: number;
    dimmability_en: string;
    dimmability_fa: string;
    input_voltage: string;
    driver_location_en: string;
    driver_location_fa: string;
  };
  compliance: {
    ip_rating: string;
    insulation_class_en: string;
    insulation_class_fa: string;
    energy_class: string;
  };
  media: {
    hero_image_url: string;
    gallery_images: string[];
    dimension_diagram_url: string;
  };
  professional_downloads: {
    data_sheet_pdf: string;
    installation_manual_pdf_fa: string;
    installation_manual_pdf_en: string;
    photometric_ies_file: string;
    cad_3d_file: string;
  };
  variants: Array<{
    name_fa: string;
    name_en: string;
    sku: string;
    finish_color_fa: string;
    finish_color_en: string;
    hex: string;
    hero_image_url: string;
  }>;
}
```

---

## 3. The 8 Authentic Products Reference
All product components must draw from the 8 canonical Baldr models:
1. `BAL-VEC-SUS-01` — Vector Linear Suspension (`pendant`)
2. `BAL-VEC-REC-02` — Vector R Recessed Downlight (`magnetic`)
3. `BAL-VEC-SM-03` — Vector SM Surface Mounted (`magnetic`)
4. `BAL-TRK-MAG-04` — Tracking Magnet 48V Architectural Track (`magnetic`)
5. `BAL-AUR-TAB-05` — Aurelia Sculptural Table Luminaire (`sculptural`)
6. `BAL-MON-FLR-06` — Monolith Architectural Floor Luminaire (`wall-floor`)
7. `BAL-ECL-WAL-07` — Eclipse Indirect Architectural Wall Sconce (`wall-floor`)
8. `BAL-TER-OUT-08` — Terra Landscape Architectural Bollard IP65 (`outdoor`)

---

## 4. Architectural Downloads Bar
Expose the official downloads:
* **Official Catalogue:** `/downloads/Baldr-2026-Catalogue.pdf`
* **CAD Profile Diagrams:** `/diagrams/baldr-vector-sm-profile.webp` and `baldr-vector-r-profile.webp`
* **IES Files:** Photometric data for DIALux / Relux
