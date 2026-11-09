---
description: Mandatory 4-step workflow order for every task on the Baldr Lighting project.
trigger: always_on
---

# Baldr Project — Mandatory Execution Workflow (قانون گردش کار اجباری)

Every single time you receive a prompt or task from the user, you MUST ALWAYS follow this exact 4-step sequential pipeline:

```
[۱. خواندن Skillها] ──► [۲. خواندن md-files] ──► [۳. اجرای دقیق Task] ──► [۴. آپدیت همزمان Skill و md-files]
```

---

## گام اول: مطالعه اولیه مهارت‌ها (Step 1 — Read Skills First)
پیش از هرگونه تغییر یا بررسی کد، ابتدا فایل‌های مهارت اختصاصی پروژه در مسیر `.agents/skills/` را با دقت بخوانید:
1. `.agents/skills/baldr-project-context/SKILL.md` (هویت برند، چارچوب فنی، ضوابط کلی)
2. `.agents/skills/nextjs-frontend-guidelines/SKILL.md` (دستورالعمل‌های فرانت‌اند، تایپوگرافی، هندسه تیز، استایل Flos)
3. `.agents/skills/generate-product-component/SKILL.md` (قالب کامپوننت‌های محصول، هاور دوحالته، مشخصات فوتومتریک)
4. `.agents/skills/django-backend-guidelines/SKILL.md` (ساختار مدل‌های دوزبانه بک‌اند و API)

---

## گام دوم: مطالعه اسناد و حافظه پروژه در md-files (Step 2 — Read md-files)
اسناد موجود در پوشه `md-files/` (به‌ویژه سند اصلی انتقال نشست) را بررسی کنید تا آخرین تصمیمات، نیازمندی‌ها و وضعیت پیاده‌سازی را دریافت نمایید:
1. `md-files/SESSION_HANDOVER.md` (سند کانتکست و وضعیت جاری پروژه)
2. اسناد معماری، استراتژی یا لاگ دارایی‌ها (مانند `Final_Assets_Integration_Log_FA.md` و مستندات `02-architecture/`)

---

## گام سوم: اجرای دقیق Task (Step 3 — Execute the Task)
انجام تسک درخواستی کاربر با رعایت کامل ضوابط قطعی:
* **نام رسمی برند:** Baldr (فارسی: بالدر)
* **فرمت تصاویر:** منحصراً `.webp` طبق قانون `webp-images.md`
* **هندسه تیز:** تمام کارت‌ها، اینپوت‌ها و دکمه‌ها بدون گردی (`rounded-none`)
* **تایپوگرافی:** ۸ وزن فونت محلی یکان‌بخ فارسی (`Yekan Bakh Fa`)
* **محصولات معتبر:** استفاده انحصاری از ۸ محصول رسمی دارای تصاویر استودیویی و معماری واقعی
* **دوزبانه بودن:** پشتیبانی همزمان RTL (فارسی) و LTR (انگلیسی)
* **تست لوکال:** اطمینان از سلامت اجرا روی سرور لوکال

---

## گام چهارم: به‌روزرسانی هم‌زمان اسناد md و Skillها (Step 4 — Update md-files & Skills)
پس از انجام هر تسک، بدون استثنا:
1. **به‌روزرسانی اسناد Markdown:** تمامی تغییرات، تصمیمات فنی و گزارش‌ها را بلافاصله در `md-files/SESSION_HANDOVER.md` یا گزارش‌های متناظر در پوشه `md-files/` ثبت کنید.
2. **به‌روزرسانی فایل‌های Skill:** در صورتی که ساختار داده، کامپوننت‌ها، نام‌گذاری دارایی‌ها یا قوانین پروژه تغییر کرده باشد، فایل‌های متناظر در `.agents/skills/` را فوراً به‌روز کنید تا دانش ایجنت همیشه تازه و منطبق بر واقعیت کد باشد.
