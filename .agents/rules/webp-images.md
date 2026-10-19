---
trigger: always_on
---

# WebP Image Format Requirement (Mandatory)

Every single photograph and raster image displayed anywhere on the Baldre Lighting website (`frontend/public/images/` and backend media URLs) MUST be in `.webp` format (`image/webp`).
- NEVER add or reference `.jpg`, `.jpeg`, or `.png` photographs in frontend components, data files (`baldreData.ts`), or backend seed data (`seed_baldre.py`).
- Whenever a new image is generated or added to the project, immediately convert it to `.webp` (e.g., using `sharp` in `frontend/node_modules/sharp`) before placing it in `frontend/public/images/` and referencing it in code.
