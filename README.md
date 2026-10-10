# وب‌سایت رسمی روشنایی بالدر (Baldre Lighting Website)

پروژه فول‌استک وب‌سایت **بالدر (Baldre Architectural Lighting)** شامل فرانت‌اند مدرن و روشن با الهام از طراحی **Flos.com** (بر پایه **Next.js 15 + Tailwind CSS v4 + Framer Motion**) و بک‌اند مدیریت کاتالوگ و API (بر پایه **Python Django + Django REST Framework**).

---

## پیش‌نیازها (Prerequisites)

برای اجرای لوکال پروژه روی سیستم خود (macOS / Windows / Linux)، موارد زیر را نصب داشته باشید:
- **Node.js** (نسخه `18.18+` یا `20+`) و `npm`
- **Python** (نسخه `3.10+`)
- **Git**

---

## ۱. دریافت پروژه (Clone)

```bash
git clone git@github.com:MobinShekari84/Baldre-Website.git
cd Baldre-Website
```

---

## ۲. راه‌اندازی و اجرای لوکال فرانت‌اند (Next.js Frontend)

فرانت‌اند دارای دیتای پیش‌فرض توکار (`FALLBACK_HOMEPAGE_DATA`) است و حتی بدون روشن بودن بک‌اند نیز به‌صورت مستقل کار می‌کند.

### الف) اجرای محیط توسعه (Development Mode)
```bash
cd frontend
npm install
npm run dev
```
سایت روی آدرس زیر در دسترس خواهد بود:
- **آدرس سایت:** `http://localhost:3000`

### ب) بیلد و اجرای نسخه پروداکشن لوکال (Production Local Deploy)
اگر می‌خواهید نسخه نهایی و پرسرعت (Production Build) را روی سیستم خود بالا بیاورید:
```bash
cd frontend
npm install
npm run build
npm run start -- -p 3000
```
- **آدرس سایت:** `http://localhost:3000`

---

## ۳. راه‌اندازی و اجرای لوکال بک‌اند (Django API & Admin Panel)

برای بالا آوردن پنل مدیریت جنگو (جهت ویرایش محصولات، پروژه‌ها، اخبار و مشاهده فرم‌های مشاوره) و اتصال زنده API به فرانت‌اند، در یک ترمینال جداگانه دستورات زیر را اجرا کنید:

### در macOS / Linux:
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# ساخت جداول دیتابیس و بارگذاری دیتای اولیه محصولات بالدر
python manage.py migrate
python manage.py seed_baldre

# اجرای سرور جنگو روی پورت 8000
python manage.py runserver 127.0.0.1:8000
```

### در Windows (PowerShell / CMD):
```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py seed_baldre
python manage.py runserver 127.0.0.1:8000
```

### آدرس‌های بک‌اند و اطلاعات ورود به پنل ادمین:
- **پنل مدیریت جنگو (Admin Panel):** `http://127.0.0.1:8000/admin/`
  - **نام کاربری (Username):** `admin`
  - **رمز عبور (Password):** `baldre2026`
- **آدرس API صفحه اصلی:** `http://127.0.0.1:8000/api/homepage/`
- **آدرس API محصولات:** `http://127.0.0.1:8000/api/products/`
- **آدرس API ثبت فرم مشاوره:** `http://127.0.0.1:8000/api/inquiries/`

---

## ۴. راهنمای دپلوی آنلاین آزمایشی روی Vercel

1. وارد سایت **[vercel.com](https://vercel.com)** شوید و با اکانت GitHub خود لاگین کنید.
2. روی **Add New -> Project** کلیک کنید و مخزن **`Baldre-Website`** را انتخاب (**Import**) نمایید.
3. در بخش **Root Directory** روی **Edit** کلیک کرده و پوشه **`frontend`** را انتخاب کنید.
4. روی دکمه **Deploy** کلیک کنید تا لینک آنلاین سایت در کمتر از ۱ دقیقه آماده شود.

---

## ۵. ساختار پوشه‌های پروژه (Directory Structure)

```text
Baldre-Website/
├── frontend/                  # اپلیکیشن Next.js 15 (فرانت‌اند دو زبانه فارسی/انگلیسی)
│   ├── public/
│   │   ├── fonts/             # فونت‌های محلی Yekan Bakh Fa (8 وزن woff2)
│   │   ├── images/            # تصاویر استودیویی و معماری محصولات و فضاها
│   │   └── diagrams/          # نقشه‌های مهندسی SVG ابعاد چراغ‌ها
│   └── src/
│       ├── app/               # صفحات و استایل‌های اصلی (page.tsx, layout.tsx, globals.css)
│       └── data/              # دیتای ساختاریافته و دیکشنری دو زبانه (baldreData.ts)
├── backend/                   # بک‌اند Django 6.1 + Django REST Framework
│   ├── baldre_api/            # تنظیمات اصلی پروژه جنگو و روتینگ
│   ├── catalog/               # مدل‌ها، سریالایزرها، ویوها، پنل ادمین و اسکریپت seed_baldre
│   └── requirements.txt       # پکیج‌های پایتون مورد نیاز بک‌اند
├── fonts/                     # آرشیو اصلی فونت‌های فارسی یکان بخ (woff2)
├── data-templates/            # قالب استاندارد JSON شناسنامه فنی محصولات
├── md-files/                  # مستندات معماری، استراتژی سئو و قوانین طراحی UI/UX
└── pdf-reports/               # گزارش‌های مدیریتی و فازبندی پروژه (PDF)
```
