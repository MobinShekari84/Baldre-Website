# Product Data Model & Requirements Plan

## Goal Description
To achieve a professional, world-class standard (like Artemide, Flos, and Louis Poulsen), the Baldre Django database must be able to store highly detailed technical, physical, and marketing information for each of the 300 lighting products. This document outlines the exhaustive list of data fields required to build a comprehensive Product model.

---

## The Exhaustive Lighting Product Data Model

To cater to both regular consumers and professional architects/lighting designers, we must capture data across 6 distinct categories.

### 1. Core Identity & Marketing (Bilingual)
This is the basic information that identifies the product and sells its story. **ALL textual fields must be bilingual.**
*   **Product Name** (`name_en`, `name_fa`)
*   **SKU / Article Number** (Unique identifier)
*   **Slug** (URL-friendly name)
*   **Category** (e.g., Pendant, Floor)
*   **Collection / Family** 
*   **Designer Name** (`designer_en`, `designer_fa`)
*   **Year of Design**
*   **Short Description** (`short_description_en`, `short_description_fa`)
*   **Long Description** (`long_description_en`, `long_description_fa`)

### 2. Physical & Material Specifications
Architects need precise physical dimensions to ensure the fixture fits the space.
*   **Materials** (e.g., Blown glass, Extruded aluminum, Brass, Polycarbonate)
*   **Finishes / Colors** (e.g., Matte Black, Brushed Brass, Opal White)
*   **Dimensions** (Width, Height, Depth, Diameter in `mm` or `cm`)
*   **Weight** (in `kg`)
*   **Cable / Suspension Length** (Maximum drop for pendants)
*   **Mounting Type** (Surface, Recessed, Suspended, Track)

### 3. Electrical & Photometric Specifications (CRITICAL)
This is what separates a professional lighting site from a generic furniture site. Lighting designers look specifically for these metrics:
*   **Light Source Type** (e.g., Integrated LED, E27, G9, GU10, COB)
*   **Wattage / System Power** (e.g., `12W`)
*   **Luminous Flux** (Lumens - Delivered vs. Source, e.g., `1200 lm`)
*   **Color Temperature (CCT)** (e.g., `2700K`, `3000K`, `Dim-to-Warm`, `Tunable White`)
*   **Color Rendering Index (CRI)** (e.g., `>90`, `>95` - vital for high-end spaces)
*   **Beam Angle** (e.g., `15° Spot`, `36° Flood`, `Diffuse`, `Asymmetric`)
*   **Dimmability / Control Protocol** (e.g., `Phase-cut (Triac)`, `DALI`, `0-10V`, `Casambi`, `Non-dimmable`)
*   **Voltage** (e.g., `220-240V`, `48V DC`, `24V DC`)
*   **Driver / Power Supply** (e.g., `Included in canopy`, `Remote driver required`)

### 4. Environment & Compliance
Safety and usage environments.
*   **IP Rating** (Ingress Protection - e.g., `IP20` for indoor, `IP65` for outdoor/bathroom)
*   **IK Rating** (Impact Resistance - e.g., `IK08`)
*   **Insulation Class** (Class I, II, III)
*   **Energy Efficiency Class** (e.g., `A+`, `F` based on new EU labels)

### 5. Media Assets (Images & Video)
A heavy visual focus is required for the "Minimal Modern" aesthetic.
*   **Hero Image** (High-res product cut-out on a pure white or transparent background)
*   **Gallery Images** (Multiple lifestyle shots showing the light in a real architectural space)
*   **Detail Shots** (Close-ups of textures, joints, and switches)
*   **Dimension Diagram / Blueprint** (Line drawing showing exact measurements)
*   **Product Video** (Optional link to a showcase film)

### 6. Downloads (For Professionals)
To attract B2B clients (Architects and Interior Designers), the site must offer professional files.
*   **Technical Data Sheet (PDF)**
*   **Assembly / Installation Manual (PDF)**
*   **Photometric Files (LDT / IES)** (Used in DIALux/Relux software to calculate light levels in a room)
*   **3D / CAD Models** (e.g., `.dwg`, `.step`, Revit `.rfa`, SketchUp)

---

## Proposed Django Implementation Structure

To manage this efficiently without making the admin panel an absolute nightmare, we will structure the Django models relationally:

### [NEW] `products/models.py`
We will use a relational approach:
1.  **`Category` Model:** (Indoor, Outdoor, etc.)
2.  **`Designer` Model:** (Name, Bio, Photo)
3.  **`Product` Model:** (Contains all the scalar fields like Title, Description, Watts, Lumens, IP Rating, CRI, etc.)
4.  **`ProductVariant` Model (Optional but recommended):** (If one lamp comes in 3 colors or 2 sizes, the variant holds the specific SKU, Color, and Dimension).
5.  **`ProductImage` Model:** (Foreign key to Product - allows uploading infinite gallery images per product).
6.  **`ProductDownload` Model:** (Foreign key to Product - allows uploading PDFs, IES files, and 3D files categorised by type).

---

## Open Questions
> [!IMPORTANT]
> **User Review Required**
> 1. Looking at this massive list, are there any fields that Baldre *will not* have (e.g., do you have 3D models or IES photometric files for your products, or should we skip those for now?)
> 2. Do your products come in multiple sizes/colors under the same name (requiring a `Variant` system), or is every size/color treated as its own unique product?
