---
name: generate-product-component
description: >-
  Generates luxury lighting UI components (Product Cards with dual-image hover, Interactive Light On/Off Hero, Photometric Spec Tables, Variant Finish Swatches, and B2B CAD/IES Download Drawers) tailored for the bilingual Baldre Lighting frontend.
---

# Baldre Lighting — UI Component Generator Skill

Activate this skill whenever creating or modifying React/Next.js UI components for products, projects, or technical lighting specifications on the Baldre website.

---

## 1. TypeScript Data Interface (Matches `sample-product-template.json`)

Every product component must type-safely consume this exact bilingual schema:

```ts
export interface BaldreProduct {
  identity: {
    name_en: string;
    name_fa: string;
    sku: string;
    slug: string;
    category: string;
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
      length_mm?: number;
      width_mm?: number;
      height_mm?: number;
      diameter_mm?: number;
    };
    weight_kg: number;
    suspension_cable_max_mm?: number;
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
    installation_manual_pdf_en: string;
    installation_manual_pdf_fa: string;
    photometric_ies_file: string;
    cad_3d_file: string;
  };
  variants: Array<{
    name_en: string;
    name_fa: string;
    sku: string;
    finish_color_en: string;
    finish_color_fa: string;
    hero_image_url: string;
  }>;
}
```

---

## 2. Core Component Blueprints

### A. Architectural Product Card (`ProductCard.tsx`)
*   **Visual Structure:** Exposed `1px` border (`border-white/10`), obsidian background (`#0E0E0E`), aspect ratio `4:5`.
*   **Dual-Image Illumination Hover:**
    *   Default state shows `media.hero_image_url` (minimal fixture cutout) with a subtle dark background.
    *   Hover state smoothly cross-fades (`duration-700`) to `media.gallery_images[0]` (illuminated lifestyle context) or activates a warm `3000K` radial glow behind the fixture.
*   **Quick Photometric Strip:** At the bottom of the card, display a compact, `dir="ltr"` monospace bar:
    `36W  •  3200 lm  •  3000K  •  CRI >95  •  IP20`

### B. Interactive "Light On / Light Off" Product Showcase (`ProductIlluminationStage.tsx`)
*   **Purpose:** On the Product Detail page, allow architects and clients to toggle the fixture between **Unlit (Studio View)** and **Lit (3000K Warm Ambient Glow)** using a sleek minimal toggle switch.
*   **Finish Swatches:** Render circular material swatches (e.g., Matte Black `#1A1A1A`, Matte White `#F2F2F0`, Brushed Brass `#C5A059`). Clicking a swatch updates the displayed SKU and hero image.

### C. Precision Technical Spec Matrix (`TechnicalSpecsTable.tsx`)
*   **Layout:** Two-column architectural grid with hairline horizontal dividers (`border-b border-white/10 py-3.5`).
*   **RTL Safety:** Labels align to `text-start` in the active language (`fa` or `en`), while technical values (`1200 × 35 × 40 mm`, `>95`, `220-240V AC`, `IP20`) ALWAYS render inside `<span dir="ltr" className="font-mono tabular-nums text-white">`.

### D. B2B Architect Downloads Bar (`ProfessionalDownloads.tsx`)
*   **Files Exposed:**
    1.  **Datasheet** (`.PDF`)
    2.  **Installation Manual** (`_fa.pdf` when `lang === 'fa'`, `_en.pdf` when `lang === 'en'`)
    3.  **Photometric Data** (`.IES` / `.LDT` for DIALux)
    4.  **3D CAD Model** (`.STEP` / `.DWG`)
*   **Design:** Monochromatic bordered cards (`border-white/15 hover:border-white/50 hover:bg-white/[0.03] transition-colors duration-500`) with file-format badge (`PDF`, `IES`, `STEP`) and download arrow icon.
