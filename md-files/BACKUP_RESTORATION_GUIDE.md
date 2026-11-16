# راهنمای جامع پشتیبان‌گیری و بازگردانی نسخه تم روشن بالدر (Backup & Restoration Guide)

**تاریخ ایجاد پشتیبان:** ۱۶ نوامبر ۲۰۲۶ (۲۶ آبان ۱۴۰۵)  
**نسخه پروژه:** تم سفید گالری مینیمال Flos (Flos Gallery White Theme - v1.0)  
**دلیل ایجاد پشتیبان:** درخواست کارفرما جهت تغییر و بازطراحی تم سایت (قبل از اعمال تغییرات بصری جدید).

---

## ۱. لایه‌های سه‌گانه پشتیبان‌گیری (Triple Backup Architecture)

برای اطمینان ۱۰۰٪ از عدم از بین رفتن حتی یک خط کد، فایل متنی یا تصویر، پشتیبان در سه لایه مستقل و افزونه (Redundant) ذخیره شد:

### لایه اول: برنچ و تگ گیت در فضای ابری GitHub
* **تگ دائمی گیت (Git Tag):**
  ```bash
  backup-light-theme-v1.0
  ```
* **شاخه پشتیبان گیت (Git Branch):**
  ```bash
  backup/flos-light-theme-v1
  ```
* **وضعیت روی گیت‌هاب:** کاملاً Push شده و روی ریپازیتوری آنلاین در دسترس است:
  [`https://github.com/MobinShekari84/Baldre-Website/tree/backup/flos-light-theme-v1`](https://github.com/MobinShekari84/Baldre-Website/tree/backup/flos-light-theme-v1)

### لایه دوم: پوشه مستقیم و فشرده‌نشده محلی (Uncompressed Local Snapshot)
یک کپی آینه‌ای کامل و آماده از تمام فایل‌ها در مسیر زیر قرار گرفته است که بدون نیاز به اکسترکت کردن می‌توانید محتویات آن را بررسی کنید:
* **مسیر پوشه:**
  ```text
  backups/light-theme-v1-snapshot/
  ```

### لایه سوم: آرشیو فشرده و مستقل (Compressed Tarball Archive)
یک فایل فشرده با فشرده‌سازی استاندارد Gzip از کل ساختار کد، اسناد و دارایی‌ها:
* **مسیر فایل:**
  ```text
  backups/baldr-light-theme-backup-2026-11-16.tar.gz
  ```
* **حجم فایل فشرده:** ۱۰۰ مگابایت (حاوی کلیه تصاویر WebP، ویدیوی ۱۰۸۰p، کاتالوگ ۶۰ مگابایتی و کدهای بک‌اند و فرانت‌اند).

---

## ۲. فهرست اقلام پشتیبان‌گیری‌شده (Inventory of Backed-up Assets)

1. **تمامی اسناد پوشه `md-files/`:**
   * مستندات معماری، نقشه سایت، استراتژی و برندینگ
   * سند انتقال کانتکست (`SESSION_HANDOVER.md`)
   * گزارش ادغام دارایی‌ها (`Final_Assets_Integration_Log_FA.md`)
   * راهنمای پنل ادمین جنگو و قرارداد رسمی بالدر
2. **کدهای فرانت‌اند (`frontend/`):**
   * صفحات Next.js 15 App Router دوزبانه (فارسی و انگلیسی)
   * فایل جامع داده‌های بالدر (`baldrData.ts`) شامل ۸ محصول معتبر و مشخصات فوتومتریک
   * استایل‌ها و پیکربندی Tailwind CSS v4
   * ویدیوی لوپ ۱۰۸۰p معمارانه هیرو (`/videos/baldr-screen-loop.mp4`)
   * کاتالوگ جامع ۱۵۱ صفحه‌ای بالدر (`/downloads/Baldr-2026-Catalogue.pdf`)
   * نقشه‌های مقاطع فنی CAD (`/diagrams/baldr-vector-*.webp`)
   * کلیه تصاویر با فرمت بهینه `.webp` (`baldr-prod-*-studio.webp`, `baldr-prod-*-arch.webp`, `baldr-wide-*.webp`)
3. **کدهای بک‌اند جنگو (`backend/`):**
   * اپلیکیشن کاتالوگ، مدل‌ها، ویوها و سریالایزرها
   * دیتابیس لوکال SQLite (`db.sqlite3`) همراه با آخرین سید پایدار
   * اسکریپت سید اختصاصی `seed_baldr.py`
4. **تنظیمات ایجنت و مهارت‌ها (`.agents/`):**
   * تمام مهارت‌های تخصصی بالدر در `.agents/skills/`
   * قوانین اجباری وب‌پی و گردش کار در `.agents/rules/`
5. **فونت‌های محلی (`fonts/`):**
   * ۸ وزن کامل فونت یکان‌بخ فارسی (`Yekan Bakh Fa`) به فرمت woff2

---

## ۳. دستورالعمل بازگردانی (How to Restore)

در صورتی که در آینده بخواهید به این نسخه (تم گالری سفید Flos) بازگردید، می‌توانید از هر یک از ۳ روش زیر استفاده کنید:

### روش ۱: بازگردانی از طریق شاخه گیت (سریع‌ترین روش)
```bash
# رفتن به شاخه تم سفید پشتیبان
git checkout backup/flos-light-theme-v1

# یا بازگردانی شاخه main به این تگ
git checkout main
git reset --hard backup-light-theme-v1.0
```

### روش ۲: بازگردانی از پوشه اسنپ‌شات محلی
```bash
rsync -av --delete backups/light-theme-v1-snapshot/ ./
```

### روش ۳: اکسترکت کردن از فایل فشرده
```bash
tar -xzf backups/baldr-light-theme-backup-2026-11-16.tar.gz -C ./
```
