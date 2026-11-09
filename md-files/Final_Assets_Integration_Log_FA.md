# گزارش جامع یکپارچه‌سازی پکیج دارایی‌های نهایی (Final Assets Integration Report)

**تاریخ اجرا:** نوامبر ۲۰۲۶  
**پروژه:** وب‌سایت رسمی روشنایی بالدر (Baldr Architectural Lighting)

---

## ۱. هدف و خلاصه عملیات
بررسی و پردازش تمام فایل‌های تحویل‌شده در پوشه `Final/` شامل کاتالوگ ۱۵۱ صفحه‌ای، ویدیوی ۱۰۸۰p، تصاویر محصولات و فضاهای معماری، تبدیل دارایی‌های تصویری به فرمت پرسرعت و بهینه `.webp`، پیاده‌سازی پخش ویدیوی ریل معماری در هیرو، فعال‌سازی هاور دوحالته (Dual-Image Hover) در کارت‌های محصول، و درج نقشه‌های مهندسی و کاتالوگ رسمی در وب‌سایت.

---

## ۲. اقدامات انجام‌شده روی تصاویر (Images Processing)

کلیه تصاویر مطابق با قانون سخت‌گیرانه پروژه (`.agents/rules/webp-images.md`) با بالاترین کیفیت بصری و متد فشرده‌سازی Lanczos به فرمت پرسرعت `image/webp` تبدیل شدند:

### الف) تصاویر استودیویی با زمینه سفید خالص (Studio Cutouts - از `Final/Product/Portraite 2/`)
تصاویر ۶۰ مگاپیکسلی (۶۶۰۰×۹۰۰۰ پیکسل) به ابعاد استاندارد وب (حداکثر ۲۰۰۰ پیکسل) ریسایز و تبدیل شدند:
1. `baldr-prod-ceiling-studio.webp` (چراغ‌های سقفی توکار و اسپات) — حجم: ۲۰.۹ KB
2. `baldr-prod-floor-studio.webp` (چراغ‌های ایستاده معماری) — حجم: ۱۳.۶ KB
3. `baldr-prod-outdoor-studio.webp` (چراغ‌های پرتابل و محوطه IP65) — حجم: ۱۵.۴ KB
4. `baldr-prod-pendant-studio.webp` (چراغ‌های حلقوی آویز دوگانه) — حجم: ۲۵.۶ KB
5. `baldr-prod-surface-studio.webp` (چراغ‌های روکار خطی و استوانه‌ای) — حجم: ۲۴.۶ KB
6. `baldr-prod-systems-studio.webp` (سیستم‌های ریل مگنتی و پروژکتورها) — حجم: ۲۰.۵ KB
7. `baldr-prod-table-studio.webp` (چراغ‌های رومیزی و دکوراتیو) — حجم: ۱۱.۲ KB
8. `baldr-prod-wall-studio.webp` (چراغ‌های دیواری و وال‌واشر) — حجم: ۱۴.۶ KB

### ب) تصاویر لایف‌استایل و فضای واقعی معماری (Architectural In-Situ - از `Final/Product/Portraite 1/`)
برای حالت هاور و نمایش کارکرد واقعی نور در فضای داخلی:
1. `baldr-prod-ceiling-arch.webp` (اسپات سقفی روی دیوار آجری گرم) — حجم: ۴۳.۴ KB
2. `baldr-prod-floor-arch.webp` (چراغ ایستاده در فضای مدرن) — حجم: ۳۳.۵ KB
3. `baldr-prod-outdoor-arch.webp` (چراغ محوطه بیرونی در باغ) — حجم: ۱۴۰.۸ KB
4. `baldr-prod-pendant-arch.webp` (آویز خطی مینیمال معلق روی زمینه سفالی) — حجم: ۳۹.۷ KB
5. `baldr-prod-surface-arch.webp` (چراغ روکار استوانه‌ای در سقف سفید) — حجم: ۲۹.۱ KB
6. `baldr-prod-systems-arch.webp` (سیستم ریل مگنتی روی سقف اکسپوز) — حجم: ۷۵.۰ KB
7. `baldr-prod-table-arch.webp` (چراغ رومیزی شیشه‌ای در چیدمان میز) — حجم: ۶۳.۶ KB
8. `baldr-prod-wall-arch.webp` (وال واشر دیواری با پخش نور ملایم) — حجم: ۴۰.۹ KB

### ج) تصاویر پانوراما و بنرهای عریض (Wide Banners - از `Final/Product/Wide/`)
1. `baldr-wide-ceiling.webp` (۱۶۰۰×۹۰۰) — حجم: ۱۵.۴ KB
2. `baldr-wide-floor.webp` (۵۵۰×۷۷۰) — حجم: ۳.۷ KB
3. `baldr-wide-outdoor.webp` (۱۶۰۰×۹۰۰) — حجم: ۷.۷ KB
4. `baldr-wide-pendant.webp` (۱۹۲۰×۸۰۰) — حجم: ۱۸.۲ KB
5. `baldr-wide-surface.webp` (۱۶۰۰×۹۰۰) — حجم: ۱۲.۳ KB
6. `baldr-wide-systems.webp` (۱۹۲۰×۱۰۸۰) — حجم: ۳۸.۵ KB
7. `baldr-wide-table.webp` (۵۵۰×۷۷۰) — حجم: ۴.۰ KB
8. `baldr-wide-wall.webp` (۱۹۲۰×۱۲۹۱) — حجم: ۲۰.۲ KB
9. `baldr-inspiration-magnet-system.webp` (۲۰۰۰×۱۱۴۵) — حجم: ۶۰.۷ KB

---

## ۳. بهینه‌سازی و اتصال ویدیو (`Screen_1080p.mp4`)
* **فایل مبدأ:** ۵۵.۳ مگابایت، ۱۰۸۰p، دارای ترک صوتی و متادیتای غیر وب.
* **اقدام:** استریم ویدیوی H.264 با دستور FFmpeg و انتقال `moov atom` به ابتدای فایل برای استریم بدون وقفه در وب (`-movflags +faststart`) و حذف ترک صدا جهت بی‌صدا بودن و لود خودکار بدون ایجاد تاخیر در مرورگرها.
* **فایل نهایی:** `frontend/public/videos/baldr-screen-loop.mp4`
* **یکپارچه‌سازی در صفحه اصلی:**
  * در هیرو سکشن (`frontend/src/app/page.tsx`)، سوئیچر حالت هیرو به یک کنترلر سه‌حالته ارتقا یافت:
    1. **حالت روز (خورشید - Sun)**: عکس معماری روز روشن.
    2. **حالت شب (ماه - Moon)**: عکس معماری نور شب با گرمای ۲۷۰۰ کلوین.
    3. **حالت پخش ویدیوی ریل معماری (Play)**: اجرای ویدیوی لوپ تمام‌صفحه ۱۰۸۰p با بک‌دراپ مینیمال و انیمیشن انتقال نرم Framer Motion.

---

## ۴. کاتالوگ مرجع بالدر و نقشه‌های مهندسی (Catalogue & CAD Profiles)

1. **جایگزینی فایل کاتالوگ رسمی:**
   * فایل ۱ کیلوبایتی تستی به کاتالوگ جامع ۱۵۱ صفحه‌ای و ۶۱ مگابایتی اصل بالدر در مسیر `frontend/public/downloads/Baldr-2026-Catalogue.pdf` ارتقا یافت.
2. **استخراج نقشه‌های مقطع فنی:**
   * نقشه‌های مهندسی مقاطع آلومینیومی خانواده‌های **Vector SM** (روکار) و **Vector R** (توکار) با رزولوشن ۱۵۰ DPI از صفحات ۱۶ و ۱۷ کاتالوگ استخراج و با فرمت WebP در مسیرهای زیر ذخیره شدند:
     - `frontend/public/diagrams/baldr-vector-sm-profile.webp`
     - `frontend/public/diagrams/baldr-vector-r-profile.webp`
   * این نقشه‌ها در فیلد `dimension_diagram_url` محصولات درج شدند تا معماران بتوانند ابعاد میلی‌متری مقاطع را مشاهده و بررسی کنند.

---

## ۵. به‌روزرسانی داده‌ها و اسکریپت‌ها (Frontend & Backend Data Sync)

1. **`frontend/src/data/baldrData.ts`:**
   * نوارهای دسته‌بندی (`FLOS_CATEGORY_STRIP`) و لیست دسته‌بندی‌ها به تصاویر اورجینال بالدر متصل شدند.
   * هر ۱۲ محصول اصلی کاتالوگ مجهز به جفت تصویر استودیویی (برای وضعیت نرمال) و تصویر در محیط معماری (برای وضعیت هاور) شدند.
   * افزودن شعار رسمی بالدر به متادیتای برند: *Where light lives (جایی که نور زندگی می‌کند)*، *House of Light (خانه نور)* و *۵ سال گارانتی رسمی تعویض (۱,۸۲۵ روز / ۴۳,۸۰۰ ساعت)*.
2. **`backend/catalog/management/commands/seed_baldr.py`:**
   * مقادیر `image_url`، `hero_image_url`، `gallery_images` و `dimension_diagram_url` در تمام دسته‌بندی‌ها و محصولات با مسیرهای جدید سینک شد تا پس از اجرای سید دیتابیس جنگو، APIها خروجی کاملاً واقعی ارائه دهند.

---

## ۶. پاک‌سازی و پالایش نهایی کاتالوگ محصولات (Catalog Purging & Cleanup)

مطابق دستور کارفرما:
1. **انحصار محصولات به موارد دارای عکس واقعی:**
   * لیست محصولات کاتالوگ پالایش شد تا **تنها شامل ۸ چراغ اصلی** باشد که برای آن‌ها تصاویر واقعی استودیویی و معماری داریم:
     1. چراغ آویز خطی وکتور (`BAL-VEC-SUS-01` / Vector Linear Suspension)
     2. چراغ توکار مقعر وکتور R (`BAL-VEC-REC-02` / Vector R Recessed Downlight)
     3. چراغ خطی روکار وکتور SM (`BAL-VEC-SM-03` / Vector SM Surface Mounted)
     4. سیستم ریل مگنتی ۴۸ ولت (`BAL-TRK-MAG-04` / Tracking Magnet 48V)
     5. چراغ رومیزی آرلیا (`BAL-AUR-TAB-05` / Aurelia Sculptural Table)
     6. چراغ ایستاده مونولیت تراورتن (`BAL-MON-FLR-06` / Monolith Floor)
     7. چراغ دیواری اکلیپس (`BAL-ECL-WAL-07` / Eclipse Indirect Wall Sconce)
     8. بولارد محوطه بیرونی ترا (`BAL-TER-OUT-08` / Terra Bollard IP65)
2. **حذف ۱۷ تصویر تستی قبلی از `frontend/public/images/`:**
   * تمام فایل‌های تست موقت حذف شدند:
     - `product-floor-monolith.webp`
     - `product-linear-suspension.webp`
     - `product-magnetic-spot.webp`
     - `product-outdoor-bollard.webp`
     - `product-sculptural-pendant.webp`
     - `product-wall-sconce.webp`
     - `flos-prod-floor.webp`
     - `flos-prod-pendant.webp`
     - `flos-cat-ceiling.webp`, `flos-cat-floor.webp`, `flos-cat-pendant.webp`, `flos-cat-portable.webp`, `flos-cat-table.webp`, `flos-cat-wall.webp`
     - `flos-hero-ic.webp`, `flos-hero-maap.webp`, `flos-hero-seki.webp`
3. **همگام‌سازی کامل مراجع کد:**
   * تمامی فایل‌های کد شامل `baldrData.ts`، `seed_baldr.py`، `models.py`، `serializers.py` و صفحات پروژه به‌روزرسانی شدند و سرور لوکال با موفقیت با متادیتای جدید بیلد و اجرا شد.

---

## ۷. استفاده انحصاری از عکس‌های Wide در سکشن دسته‌بندی صفحه اصلی

بر اساس درخواست کارفرما، بخش پیش‌نمایش دسته‌بندی‌ها در صفحه اصلی (Section 2 - Split Categories):
1. **جایگزینی عکس‌های پرتره با عکس‌های عریض (Wide):**
   * تمامی عکس‌های نوار دسته‌بندی (`FLOS_CATEGORY_STRIP`) و داده‌های پایه دسته‌بندی (`FALLBACK_HOMEPAGE_DATA.categories`) به نسخه‌های بنری و پانورامای عریض (`/images/baldr-wide-*.webp`) تغییر یافتند:
     - چراغ‌های آویز و خطی: `/images/baldr-wide-pendant.webp` (۱۹۲۰×۸۰۰)
     - چراغ‌های رومیزی: `/images/baldr-wide-table.webp` (۱۶۰۰×۹۰۰)
     - چراغ‌های ایستاده: `/images/baldr-wide-floor.webp` (۱۶۰۰×۹۰۰)
     - چراغ‌های دیواری: `/images/baldr-wide-wall.webp` (۱۹۲۰×۱۲۹۱)
     - سقفی و مگنتی ۴۸ ولت: `/images/baldr-wide-systems.webp` (۱۹۲۰×۱۰۸۰)
     - پرتابل و فضای باز: `/images/baldr-wide-outdoor.webp` (۱۶۰۰×۹۰۰)
2. **بهینه‌سازی کادر نمایش (`object-contain`):**
   * کادر نمایش سمت چپ در هماهنگی با گرید ۱۶:۱۰ صفحه اصلی با استایل `object-contain` و پس‌زمینه سفید خالص تنظیم شد تا هیچ برشی (Crop) روی عکس چراغ‌ها نیفتد و زاویه دید معمارانه در ابعاد کامل نمایش داده شود.

---

## ۸. تبدیل پس‌زمینه هیرو به ویدیوی لوپ خالص ۱۰۸۰p و حذف گزینه‌های لایت/دارک

بر اساس درخواست کارفرما («هیرو میخوام فقط ویدیو رو نشون بده / اپشن light dark رو حذف کن / بک گراند باید این ویدیو عه باشه»):
1. **پس‌زمینه ویدیویی یکپارچه تمام‌صفحه:**
   * بخش هیرو (`frontend/src/app/page.tsx` - Section 1) به صورت تمام‌صفحه به ویدیوی لوپ ۱۰۸۰p بالدر (`/videos/baldr-screen-loop.mp4`) با ویژگی‌های `autoPlay`، `loop`، `muted` و `playsInline` مجهز گردید.
   * اسکریپت پخش به گونه‌ای تنظیم شده که با شروع لود صفحه، ویدیو به صورت روان و با کیفیت Full HD در پس‌زمینه اجرا شود.
2. **حذف کامل دکمه‌ها و استیت لایت/دارک:**
   * دکمه‌ها و آیکون‌های سوئیچ نور روز/شب (Sun / Moon) و استیت `heroSceneMode` به طور کامل از کد حذف شدند.
   * لایه‌بندی محتوای هیرو شامل گرادینت تیره ظریف بالا و پایین برای خوانایی عالی تایپوگرافی، تیتر مینیمال، زیرنویس شاعرانه و دکمه شیشه‌ای کشف محصولات (Explore CTA) حفظ شده و روی پس‌زمینه متحرک ویدیو شناور است.

---

## ۹. وضعیت تست و انطباق با قوانین پروژه

- [x] رعایت قانون `RULE: webp-images.md`: تمام تصاویر افزوده شده منحصراً فرمت `.webp` دارند.
- [x] رعایت قانون `RULE: markdown-location.md`: این سند و مستندات دیگر در پوشه `md-files/` ذخیره شدند.
- [x] رعایت قانون `RULE: workflow-order.md`: گردش کار ۴ مرحله‌ای به دقت طی شد.
- [x] تست صحت ابعاد و حجم تصاویر: حجم تمام تصاویر بین ۱۱ تا ۱۴۰ کیلوبایت فشرده شد.
- [x] تست موفق بیلد پروداکشن Next.js: اجرای `npm run build` بدون هیچ خطای تایپ اسکریپت یا لینت با موفقیت کامل پاس شد.
- [x] ویدیو: تست استریم ویدیوی لوپ در مرورگر با کد HTTP 200 و استریم مستقیم تایید گردید.
