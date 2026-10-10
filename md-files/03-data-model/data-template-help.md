# Guide to the Baldre Product Data Template

This document explains the fields found in the `sample-product-template.json` file. It is designed to help you (and your data entry team) gather and organize all 300 products *before* we design the final website. 

Having this data structured first ensures that our UI design perfectly matches the information we actually have.

## How to use the JSON template
The JSON file represents a single "perfect" lighting product. You can use it as a checklist when asking your suppliers, factory, or team for product information.

### 🌐 Bilingual Requirements (CRITICAL)
Because the Baldre website is fully bilingual (Farsi & English), almost all textual fields in the template end with either `_en` or `_fa`. 
*   **DO NOT** translate technical values like "IP20" or "3000K". 
*   **DO** provide translations for fields like `name`, `description`, `materials`, `finish_color`, and `mounting_type`. Ensure the Farsi text reads naturally and uses appropriate industry terminology.

---

## Glossary of Key Lighting Terms

If you are gathering data from factories or catalogs, you will need to find the following specific metrics:

### 1. `electrical_and_lighting` (The most important section for Architects)
*   **Light Source:** Does the lamp have an `Integrated LED` (you cannot change the bulb), or does it take a standard bulb like `E27`, `GU10`, or `G9`?
*   **Wattage (W):** The power consumption. 
*   **Luminous Flux (lm):** How much actual light is emitted. (e.g., 1000 lm).
*   **Color Temperature (CCT):** The "color" of the white light.
    *   *2700K:* Very warm, cozy (like a traditional incandescent bulb).
    *   *3000K:* Warm white (standard for modern residential/hospitality).
    *   *4000K:* Cool white (standard for offices).
*   **Color Rendering Index (CRI):** How accurately the light shows colors compared to sunlight. For luxury lighting, this should always be `>90` or `>95`.
*   **Beam Angle:** How wide the light spreads. (e.g., `15°` is a tight spotlight, `120°` is a wide wash).
*   **Dimmability:** Very important for high-end projects. Can it be dimmed? If so, by what system? (`DALI`, `Phase-cut/Triac`, `1-10V`, `Casambi`).

### 2. `physical_specs`
*   **Dimensions:** Always standardize your measurements. We recommend using millimeters (`mm`) for accuracy, as is standard in architectural plans.
*   **Mounting Type:** How does it attach to the architecture? (`Surface mounted`, `Recessed / توکار`, `Suspended / آویز`, `Track / ریلی`).

### 3. `compliance`
*   **IP Rating:** Tells you where the light can be installed safely.
    *   `IP20`: Standard indoor use (dry areas).
    *   `IP44`: Bathroom safe (splash-proof).
    *   `IP65 / IP67`: Outdoor safe (waterproof).

### 4. `professional_downloads`
To compete with brands like Artemide and Flos, you should try to gather these files from your manufacturers:
*   **Data Sheet (PDF):** A 1-2 page document summarizing all technical specs.
*   **Photometric / IES File:** A digital file ending in `.ies` or `.ldt`. Lighting designers load these into software (like DIALux) to simulate how your lamp will illuminate a room before they buy it.
*   **3D / CAD File:** Files (`.step`, `.dwg`, `.rfa`) that interior designers can drop straight into their 3D renders (like 3ds Max or Revit).

---

## Next Steps for You
1. Review the `sample-product-template.json` file.
2. Select **one real product** from your Baldre catalog.
3. Try to gather all the information requested in the template for that specific product. 
4. Once you see how much data you *actually* have, we can design the UI/UX to perfectly showcase it!
