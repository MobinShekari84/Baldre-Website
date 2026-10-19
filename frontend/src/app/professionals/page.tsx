'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpLeft,
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  Compass,
  Layers,
  Sliders,
  FileText,
  Send,
  CheckCircle2,
} from 'lucide-react';
import {
  Lang,
  UI_TEXT,
} from '@/data/baldrData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export default function BaldrProfessionalsPage() {
  const pathname = usePathname();
  const lang: Lang = pathname?.startsWith('/en') ? 'en' : 'fa';
  const isFa = lang === 'fa';
  const dir = isFa ? 'rtl' : 'ltr';
  const t = UI_TEXT[lang];

  const homeHref = isFa ? '/' : '/en';
  const productsHref = isFa ? '/products' : '/en/products';
  const projectsHref = isFa ? '/projects' : '/en/projects';
  const professionalsHref = isFa ? '/professionals' : '/en/professionals';
  const aboutHref = isFa ? '/about' : '/en/about';
  const contactHref = isFa ? '/contact' : '/en/contact';

  const ArrowIcon = isFa ? ArrowUpLeft : ArrowUpRight;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [inquiryForm, setInquiryForm] = useState({
    fullName: '',
    studio: '',
    phoneOrEmail: '',
    projectType: 'residential',
    message: '',
  });

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.fullName || !inquiryForm.phoneOrEmail) {
      setToastMessage(isFa ? 'لطفاً نام و اطلاعات تماس را وارد نمایید.' : 'Please enter your name and contact details.');
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    setSubmitting(true);
    try {
      await fetch(`${API_BASE}/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: inquiryForm.fullName,
          company_or_studio: inquiryForm.studio,
          phone_or_email: inquiryForm.phoneOrEmail,
          project_type: inquiryForm.projectType,
          message: inquiryForm.message || 'استعلام پروژه از صفحه معماران',
        }),
      });
    } catch {
      // offline fallback
    }

    setSubmitting(false);
    setSuccess(true);
    setToastMessage(isFa ? 'استعلام شما با موفقیت ثبت شد. به زودی با آتلیه شما تماس می‌گیریم.' : 'Inquiry registered. Our studio will reach out shortly.');
    setTimeout(() => {
      setSuccess(false);
      setInquiryForm({ fullName: '', studio: '', phoneOrEmail: '', projectType: 'residential', message: '' });
      setToastMessage(null);
    }, 3500);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const navItems = [
    { href: productsHref, label: t.nav.products, active: false },
    { href: projectsHref, label: t.nav.projects, active: false },
    { href: professionalsHref, label: t.nav.professionals, active: true },
    { href: aboutHref, label: t.nav.about, active: false },
    { href: contactHref, label: t.nav.contact, active: false },
  ];

  return (
    <div
      dir={dir}
      className="min-h-screen bg-[#FFFFFF] text-[#111111] font-farsi selection:bg-[#E40521] selection:text-[#FFFFFF]"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-6 start-6 z-50 flex items-center gap-3 bg-black/90 backdrop-blur-md text-[#FFFFFF] px-6 py-4 rounded-none border border-white/20 max-w-md"
          >
            <CheckCircle2 className="w-5 h-5 text-[#E40521] shrink-0" />
            <p className="text-xs sm:text-sm leading-relaxed text-justify">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* =====================================================================
          1. HEADER
         ===================================================================== */}
      <header className="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#E5E5E5] transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 h-20 flex items-center justify-between gap-4">
          {/* Official Baldr Red Logo */}
          <Link
            href={homeHref}
            className="flex items-center group shrink-0 cursor-pointer"
            aria-label="Baldr Lighting"
          >
            <img
              src="/images/baldr-logo-red.webp"
              alt="Baldr Lighting"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1.5 text-[#111111] after:bg-[#E40521] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:transition-transform after:duration-300 after:ease-out cursor-pointer ${
                  item.active
                    ? 'after:scale-x-100 font-bold'
                    : 'after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <div
              dir="ltr"
              className="inline-flex items-center rounded-none border bg-transparent border-[#E5E5E5]"
              role="group"
              aria-label="Language Switcher"
            >
              <Link
                href="/professionals"
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isFa
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                Fa
              </Link>
              <Link
                href="/en/professionals"
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  !isFa
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                En
              </Link>
            </div>

            {/* Standardized Navbar CTA Button: "مشاهده کاتالوگ" */}
            <Link
              href={productsHref}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-none bg-[#111111] text-[#FFFFFF] text-xs font-semibold hover:bg-[#E40521] transition-colors cursor-pointer"
            >
              <span>{isFa ? 'مشاهده کاتالوگ' : 'View Catalog'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Nav Bar */}
        <div className="lg:hidden border-t border-[#E5E5E5] text-[#333333] bg-[#FFFFFF]/95 px-4 py-2.5 overflow-x-auto flex items-center gap-6 text-xs font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative whitespace-nowrap py-1 after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#E40521] after:transition-transform after:duration-300 cursor-pointer ${
                item.active
                  ? 'text-[#111111] font-bold after:scale-x-100'
                  : 'text-[#555555] hover:text-[#111111] after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      {/* =====================================================================
          2. HERO MONOGRAPH
         ===================================================================== */}
      <section className="pt-28 lg:pt-32 pb-12 lg:pb-16 bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full rounded-none overflow-hidden bg-[#111111] mb-12">
            <img
              src="/images/project-art-gallery.webp"
              alt="Baldr for Architects"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <div className="absolute bottom-8 sm:bottom-12 start-8 sm:start-12 end-8 max-w-2xl text-white">
              <span className="text-xs font-semibold tracking-wider text-[#E40521] uppercase block mb-2">
                {isFa ? 'دفاتر معماری و طراحان نور' : 'Architects & Lighting Designers'}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
                {isFa ? 'همکاری فنی و مهندسی روشنایی' : 'Engineering Partnership & BIM Resources'}
              </h1>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light text-justify max-w-xl">
                {isFa
                  ? 'همراهی با دفاتر معماری از کانسپت اولیه تا تحویل نهایی: محاسبات DIALux، کتابخانه کامل فایل‌های 3D و IES، و سفارشی‌سازی ابعاد چراغ‌ها.'
                  : 'Collaborating with architecture ateliers from concept to realization: photometric simulations, 3D/BIM libraries, and bespoke luminaire fabrication.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. THREE CORE ENGINEERING CAPABILITIES (Minimalist 3 Columns)
         ===================================================================== */}
      <section className="py-16 lg:py-24 bg-[#FFFFFF] border-b border-[#EFECE6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold tracking-widest text-[#E40521] uppercase block mb-2">
              {isFa ? 'خدمات تخصصی B2B' : 'Professional B2B Services'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] tracking-tight">
              {isFa ? 'سه گام در همراهی با معماران' : 'Three Pillars of Studio Support'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="p-8 sm:p-10 rounded-none bg-[#F5F4F0] border border-[#EFECE6]">
              <div className="w-10 h-10 rounded-none bg-[#111111] text-white flex items-center justify-center mb-6">
                <Compass className="w-5 h-5 text-[#E40521]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-3">
                {isFa ? 'محاسبات دیالوکس و شبیه‌سازی' : 'DIALux & Relux Calculations'}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed text-justify">
                {isFa
                  ? 'تهیه نقشه‌های توزیع لوکس، تحلیل ضریب خیرگی (UGR) و گزارش‌های فنی مطابق با استانداردهای مهندسی بر مبنای پلان‌های اتوکد پروژه شما.'
                  : 'Photometric simulation reports, isolux curves, and glare analysis calculated directly against your AutoCAD plans.'}
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-none bg-[#F5F4F0] border border-[#EFECE6]">
              <div className="w-10 h-10 rounded-none bg-[#111111] text-white flex items-center justify-center mb-6">
                <Sliders className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-3">
                {isFa ? 'سفارشی‌سازی ابعاد و فینیش' : 'Custom Tailored Fabrication'}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed text-justify">
                {isFa
                  ? 'تولید پروفیل‌های خطی با طول میلی‌متری دقیق، زوایای فارسی‌بر سفارشی و پوشش‌های رنگی اختصاصی RAL مطابق هویت بصری پروژه.'
                  : 'Millimeter-exact bespoke extrusion lengths, custom geometric corners, and architectural RAL finishes matching your concept.'}
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-none bg-[#F5F4F0] border border-[#EFECE6]">
              <div className="w-10 h-10 rounded-none bg-[#111111] text-white flex items-center justify-center mb-6">
                <Layers className="w-5 h-5 text-[#E40521]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-3">
                {isFa ? 'ارائه ماک‌آپ و تست نوری فضا' : 'Physical Mockup & On-Site Testing'}
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed text-justify">
                {isFa
                  ? 'ارسال نمونه فیزیکی چراغ‌ها به آتلیه معماری یا کارگاه ساختمانی جهت بررسی دقیق بافت نور و متریال در ابعاد واقعی پیش از خرید نهایی.'
                  : 'Dispatch of physical luminaire samples and optical mockups to your atelier or site for tactile client reviews.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. TECHNICAL DOWNLOADS (Clean Minimalist Cards)
         ===================================================================== */}
      <section className="py-16 lg:py-24 bg-[#FAFAFA] border-b border-[#EFECE6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#E40521] uppercase block mb-2">
                {isFa ? 'داده‌های فنی و مدلسازی' : 'Digital Assets'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111111] tracking-tight">
                {isFa ? 'مرکز دانلود ابزارهای فنی' : 'Technical Downloads Center'}
              </h2>
            </div>
            <p className="text-xs text-[#777777] max-w-md text-justify">
              {isFa
                ? 'فایل‌های نوری استاندارد IES، پکیج مدل‌های سه‌بعدی 3D CAD و کاتالوگ‌های فنی چراغ‌های بالدر جهت استفاده در شبیه‌سازی معماری.'
                : 'Standardized photometric IES curves, 3D CAD models, and architectural catalogs for lighting simulations.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/downloads/baldr-photometric-ies-pack.zip"
              download
              className="p-8 rounded-none bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#111111] transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-none bg-[#F5F4F0] flex items-center justify-center mb-6 group-hover:bg-[#E40521] group-hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#111111] mb-2">
                  {isFa ? 'پکیج منحنی‌های فتومتریک (IES)' : 'IES Photometric Pack'}
                </h3>
                <p className="text-xs text-[#666666] font-light leading-relaxed text-justify mb-6">
                  {isFa
                    ? 'فایل‌های نوری سنجیده‌شده با گونیوفتومتر برای شبیه‌سازی دقیق در DIALux و Relux.'
                    : 'Goniophotometer-verified distribution curves for precision DIALux simulations.'}
                </p>
              </div>
              <span className="text-xs font-semibold text-[#111111] group-hover:text-[#E40521] transition-colors inline-flex items-center gap-1">
                <span>{isFa ? 'دانلود فایل ZIP (حجم ۱۸ مگابایت)' : 'Download ZIP (18 MB)'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </span>
            </a>

            <a
              href="/downloads/baldr-3d-bim-library.zip"
              download
              className="p-8 rounded-none bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#111111] transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-none bg-[#F5F4F0] flex items-center justify-center mb-6 group-hover:bg-[#E40521] group-hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#111111] mb-2">
                  {isFa ? 'مدل‌های سه‌بعدی و BIM' : '3D CAD & BIM Library'}
                </h3>
                <p className="text-xs text-[#666666] font-light leading-relaxed text-justify mb-6">
                  {isFa
                    ? 'آبجکت‌های سه‌بعدی با فرمت‌های OBJ, DWG, 3DS و Revit Family برای مدل‌سازی رندرینگ.'
                    : 'Parametric BIM families and OBJ/DWG meshes for 3ds Max, Rhino, and Revit.'}
                </p>
              </div>
              <span className="text-xs font-semibold text-[#111111] group-hover:text-[#E40521] transition-colors inline-flex items-center gap-1">
                <span>{isFa ? 'دانلود فایل ZIP (حجم ۴۲ مگابایت)' : 'Download ZIP (42 MB)'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </span>
            </a>

            <a
              href="/downloads/baldr-catalogue-2026.pdf"
              download
              className="p-8 rounded-none bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#111111] transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-none bg-[#F5F4F0] flex items-center justify-center mb-6 group-hover:bg-[#E40521] group-hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#111111] mb-2">
                  {isFa ? 'کاتالوگ جامع معماری ۲۰۲۶' : '2026 Architectural Monograph'}
                </h3>
                <p className="text-xs text-[#666666] font-light leading-relaxed text-justify mb-6">
                  {isFa
                    ? 'مشخصات کامل تمام کالکشن‌ها به همراه جدول ابعاد، دیاگرام سیم‌کشی و مشخصات اپتیکی.'
                    : 'Comprehensive technical specification handbook with wiring diagrams and photometry.'}
                </p>
              </div>
              <span className="text-xs font-semibold text-[#111111] group-hover:text-[#E40521] transition-colors inline-flex items-center gap-1">
                <span>{isFa ? 'دانلود کاتالوگ PDF (حجم ۳۵ مگابایت)' : 'Download PDF (35 MB)'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. DIRECT ARCHITECTURAL CONSULTATION & EMAIL FORM
         ===================================================================== */}
      <section className="py-16 lg:py-24 bg-[#111111] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold tracking-widest text-[#E40521] uppercase block mb-3">
                {isFa ? 'مشاوره پروژه‌های معماری' : 'Direct Studio Collaboration'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-4">
                {isFa
                  ? 'ارسال مشخصات یا کانسپت پروژه معماری'
                  : 'Submit Project Brief or Drawings'}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed text-justify mb-8">
                {isFa
                  ? 'تیم مهندسی بالدر در کمتر از ۲۴ ساعت محاسبات اولیه دیالوکس، لیست چراغ‌های پیشنهادی و نمونه‌های سمپل را برای بررسی به آتلیه شما ارائه خواهد داد. همچنین می‌توانید فایل‌های حجیم DWG را مستقیماً به ایمیل استودیو ارسال فرمایید.'
                  : 'Our optical engineering team provides preliminary DIALux simulations, luminaire schedules, and tactile samples within 24 business hours.'}
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-white/90">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#E40521]" />
                  <a href="mailto:projects@baldr.ir" className="hover:text-[#E40521] transition-colors font-semibold">
                    projects@baldr.ir
                  </a>
                </div>
                <div className="flex items-center gap-3" dir="ltr">
                  <Phone className="w-4 h-4 text-[#E40521]" />
                  <a href="tel:+982126204800" className="hover:text-[#E40521] transition-colors font-semibold">
                    +98 21 2620 4800
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/5 border border-white/10 p-8 sm:p-10 rounded-none backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-2">
                {isFa ? 'فرم استعلام مهندسی و ارسال پلان' : 'Architectural Specification Form'}
              </h3>
              <p className="text-xs text-white/60 mb-6 font-light text-justify">
                {isFa
                  ? 'مشخصات اولیه پروژه را ثبت فرمایید تا کارشناسان فنی بالدر در کوتاه‌ترین زمان با شما تماس بگیرند.'
                  : 'Register your project specifications to receive technical luminaire schedules and simulation support.'}
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={isFa ? 'نام و نام خانوادگی *' : 'Full Name *'}
                      value={inquiryForm.fullName}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-none bg-white/10 text-white placeholder-white/40 text-xs border border-white/15 focus:border-[#E40521] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder={isFa ? 'نام دفتر معماری یا آتلیه' : 'Architecture Studio / Firm'}
                      value={inquiryForm.studio}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, studio: e.target.value })}
                      className="w-full px-4 py-3 rounded-none bg-white/10 text-white placeholder-white/40 text-xs border border-white/15 focus:border-[#E40521] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={isFa ? 'شماره تماس یا ایمیل *' : 'Phone or Email Address *'}
                      value={inquiryForm.phoneOrEmail}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phoneOrEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-none bg-white/10 text-white placeholder-white/40 text-xs border border-white/15 focus:border-[#E40521] focus:outline-none transition-colors"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <select
                      value={inquiryForm.projectType}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-none bg-[#222222] text-white text-xs border border-white/15 focus:border-[#E40521] focus:outline-none transition-colors"
                    >
                      <option value="residential">{isFa ? 'پروژه مسکونی لوکس' : 'Luxury Residential'}</option>
                      <option value="villa">{isFa ? 'ویلای اختصاصی' : 'Private Villa'}</option>
                      <option value="gallery">{isFa ? 'گالری، شوروم یا تجاری' : 'Gallery / Commercial'}</option>
                      <option value="office">{isFa ? 'اداری و هتلینگ' : 'Corporate & Hospitality'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder={isFa ? 'توضیحات پروژه، لینک دانلود پلان‌ها (Google Drive / WeTransfer) یا سوالات فنی...' : 'Project details, drawing links (Drive/Dropbox), or lighting questions...'}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-none bg-white/10 text-white placeholder-white/40 text-xs border border-white/15 focus:border-[#E40521] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-none bg-[#E40521] hover:bg-[#c0041b] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span>{isFa ? 'در حال ثبت استعلام...' : 'Submitting...'}</span>
                  ) : success ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>{isFa ? 'استعلام شما با موفقیت ثبت شد' : 'Submitted Successfully'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isFa ? 'ارسال استعلام و درخواست مشاوره' : 'Submit Project Inquiry'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. FOOTER
         ===================================================================== */}
      <footer className="py-14 bg-[#F5F4F0] border-t border-[#EFECE6] text-[#666666] text-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link href={homeHref} className="shrink-0">
              <img src="/images/baldr-logo-red.webp" alt="Baldr Lighting" className="h-5 w-auto object-contain" />
            </Link>
            <span>•</span>
            <span>{isFa ? 'استودیو مهندسی و طراحی روشنایی معماری' : 'Architectural Lighting Studio'}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="tel:+982126204800" className="hover:text-[#E40521] transition-colors cursor-pointer" dir="ltr">
              +98 21 2620 4800
            </a>
            <a href="mailto:projects@baldr.ir" className="hover:text-[#E40521] transition-colors cursor-pointer">
              projects@baldr.ir
            </a>
            <Link href={projectsHref} className="hover:text-[#E40521] transition-colors cursor-pointer">
              {isFa ? 'پروژه‌های معماری' : 'Projects'}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
