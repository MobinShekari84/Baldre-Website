'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpLeft,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Send,
  CheckCircle2,
} from 'lucide-react';
import {
  Lang,
  UI_TEXT,
} from '@/data/baldrData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export default function BaldrAboutPage() {
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

  const [showroomForm, setShowroomForm] = useState({
    name: '',
    phoneOrEmail: '',
    purpose: 'visit',
    message: '',
  });

  const handleShowroomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showroomForm.name || !showroomForm.phoneOrEmail) {
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
          full_name: showroomForm.name,
          phone_or_email: showroomForm.phoneOrEmail,
          project_type: showroomForm.purpose,
          message: showroomForm.message || 'درخواست هماهنگی بازدید از شوروم فرشته',
        }),
      });
    } catch {
      // offline fallback
    }

    setSubmitting(false);
    setSuccess(true);
    setToastMessage(isFa ? 'درخواست شما با موفقیت ثبت شد. به زودی جهت هماهنگی با شما تماس می‌گیریم.' : 'Request registered. We will contact you shortly.');
    setTimeout(() => {
      setSuccess(false);
      setShowroomForm({ name: '', phoneOrEmail: '', purpose: 'visit', message: '' });
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
    { href: professionalsHref, label: t.nav.professionals, active: false },
    { href: aboutHref, label: t.nav.about, active: true },
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
          1. MINIMAL GLASSMORPHIC HEADER
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
                href="/about"
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isFa
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                Fa
              </Link>
              <Link
                href="/en/about"
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
          2. HERO MONOGRAPH (Clean Atmospheric Visual)
         ===================================================================== */}
      <section className="pt-28 lg:pt-32 pb-12 lg:pb-16 bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full rounded-none overflow-hidden bg-[#111111] mb-12">
            <img
              src="/images/flos-hero-seki.webp"
              alt="Baldr Studio Narrative"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <div className="absolute bottom-8 sm:bottom-12 start-8 sm:start-12 end-8 max-w-2xl text-white">
              <span className="text-xs font-semibold tracking-wider text-[#E40521] uppercase block mb-2">
                {isFa ? 'استودیو طراحی و مهندسی بالدر' : 'Baldr Studio Narrative'}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
                {isFa ? 'نور، هندسه ناب و آرامش معماری' : 'Light, Pure Geometry & Spatial Serenity'}
              </h1>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light text-justify max-w-xl">
                {isFa
                  ? 'خلق سامانه‌های روشنایی که فراتر از منابع نور، به عنوان عنصر پیونددهنده فضا، ماده و احساس در معماری معاصر عمل می‌کنند.'
                  : 'Crafting architectural luminaires engineered as seamless instruments uniting tactile materials, museum-grade optics, and pure form.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. DESIGN PHILOSOPHY & HONEST MATERIALS (Airy & Minimal)
         ===================================================================== */}
      <section className="py-16 lg:py-24 bg-[#FFFFFF] border-b border-[#EFECE6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold tracking-widest text-[#E40521] uppercase block mb-3">
                {isFa ? 'فلسفه طراحی' : 'Design Philosophy'}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] tracking-tight leading-snug">
                {isFa
                  ? 'سکوت بصری، متریال اصیل و هم‌نشینی نور با سایه'
                  : 'Visual Silence, Honest Craft & Subtle Shadows'}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#444444] leading-relaxed text-justify font-light">
              <p>
                {isFa
                  ? 'در بالدر، چراغ‌ها برای جلب توجه کاذب طراحی نمی‌شوند؛ بلکه هدف بنیادین ما نامرئی‌سازی منبع آزاردهنده نور و خلق حسی از آرامش عمیق در فضا است. ما نور را نه به عنوان عنصری تزیینی، بلکه به عنوان ساختاردهنده اصلی اتمسفر و ادراک حجم‌ها در معماری تعریف می‌کنیم.'
                  : 'At Baldr, luminaires are not designed for intrusive spectacle. Our core pursuit is eliminating aggressive glare to reveal the serene intimacy of space. Light is treated not as mere decor, but as the essential catalyst defining volume and materiality.'}
              </p>
              <p>
                {isFa
                  ? 'تمامی محصولات از متریال‌های اصیل همچون شیشه اپال دمیده‌شده دست‌ساز، سنگ مرمر طبیعی کارارا و نجف‌آباد، برنج برس‌خورده و آلومینیوم آلیاژی اکسترود ۶۰۶۳ ساخته می‌شوند. هر اتصال، بدون پیچ‌های نمایان و با دقت میکرونی مهندسی شده است تا طول عمری فراتر از چند دهه داشته باشد.'
                  : 'Every piece is composed from honest substances: mouth-blown triplex opal glass, solid honed marble, satin brass, and precision 6063 aerospace aluminum. Seams remain concealed and tolerances calibrated to the micron.'}
              </p>
            </div>
          </div>

          {/* Three Quiet Material Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 lg:pt-20">
            <div className="p-8 rounded-none bg-[#F5F4F0] border border-[#EFECE6]">
              <span className="text-xs font-mono text-[#777777] block mb-3">01 / MATERIALITY</span>
              <h3 className="text-base font-bold text-[#111111] mb-2">
                {isFa ? 'شیشه و سنگ طبیعی' : 'Tactile Matter'}
              </h3>
              <p className="text-xs text-[#555555] font-light leading-relaxed text-justify">
                {isFa
                  ? 'هم‌نشینی لطافت شیشه اپال با سنگینی و اصالت سنگ‌های مرمر طبیعی تراش‌خورده.'
                  : 'Mouth-blown opaline diffusers harmonized with the tactile weight of solid natural stone.'}
              </p>
            </div>

            <div className="p-8 rounded-none bg-[#F5F4F0] border border-[#EFECE6]">
              <span className="text-xs font-mono text-[#777777] block mb-3">02 / OPTICS</span>
              <h3 className="text-base font-bold text-[#111111] mb-2">
                {isFa ? 'کیفیت نوری موزه‌ای (CRI >97)' : 'Museum Optical Fidelity'}
              </h3>
              <p className="text-xs text-[#555555] font-light leading-relaxed text-justify">
                {isFa
                  ? 'بازتولید بی‌نقص رنگ‌ها با ضریب R9 بالای ۹۰ و کنترل کامل خیرگی برای آرامش چشم.'
                  : 'Flawless spectral fidelity (R9 >90) with dark-light reflectors maintaining UGR <13.'}
              </p>
            </div>

            <div className="p-8 rounded-none bg-[#F5F4F0] border border-[#EFECE6]">
              <span className="text-xs font-mono text-[#777777] block mb-3">03 / CONTROL</span>
              <h3 className="text-base font-bold text-[#111111] mb-2">
                {isFa ? 'دیمینگ نرم و DALI-2' : 'Intelligent Dimming'}
              </h3>
              <p className="text-xs text-[#555555] font-light leading-relaxed text-justify">
                {isFa
                  ? 'یکپارچه‌سازی بی‌سیم Casambi و DALI-2 با سناریوهای نوری روز و شب.'
                  : 'Seamless Casambi Bluetooth mesh and DALI-2 architecture for warm circadian dimming.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. THE TEHRAN SHOWROOM (Integrated & Serene)
         ===================================================================== */}
      <section id="showroom" className="scroll-mt-24 py-16 lg:py-24 bg-[#FAFAFA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Showroom Visual */}
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-none overflow-hidden bg-[#F5F4F0]">
                <img
                  src="/images/project-art-gallery.webp"
                  alt="Baldr Tehran Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Showroom Details & Booking Form */}
            <div className="lg:col-span-6 bg-[#FFFFFF] p-8 sm:p-10 rounded-none border border-[#E5E0D8]">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#E40521] uppercase block mb-1">
                  {isFa ? 'شوروم مرکزی' : 'Flagship Studio'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#111111] tracking-tight mb-2">
                  {isFa ? 'هماهنگی بازدید از شوروم فرشته' : 'Schedule a Showroom Visit'}
                </h2>
                <p className="text-xs text-[#666666] leading-relaxed text-justify font-light mb-6">
                  {isFa
                    ? 'جهت رزرو جلسه حضوری، مشاهده رفتار نور در مقیاس واقعی و مشاوره پروژه‌ای، فرم زیر را ارسال فرمایید یا مستقیماً تماس حاصل فرمایید.'
                    : 'To schedule a private walk-through or project review at our Fereshteh studio, please submit the form or reach out directly.'}
                </p>
              </div>

              {/* Showroom Form */}
              <form onSubmit={handleShowroomSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={isFa ? 'نام و نام خانوادگی *' : 'Full Name *'}
                      value={showroomForm.name}
                      onChange={(e) => setShowroomForm({ ...showroomForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-none bg-[#F5F4F0] text-xs text-[#111111] placeholder-[#888888] border border-[#E5E0D8] focus:border-[#111111] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder={isFa ? 'شماره تماس یا ایمیل *' : 'Phone or Email *'}
                      value={showroomForm.phoneOrEmail}
                      onChange={(e) => setShowroomForm({ ...showroomForm, phoneOrEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-none bg-[#F5F4F0] text-xs text-[#111111] placeholder-[#888888] border border-[#E5E0D8] focus:border-[#111111] focus:outline-none transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <select
                    value={showroomForm.purpose}
                    onChange={(e) => setShowroomForm({ ...showroomForm, purpose: e.target.value })}
                    className="w-full px-4 py-3 rounded-none bg-[#F5F4F0] text-xs text-[#111111] border border-[#E5E0D8] focus:border-[#111111] focus:outline-none transition-colors"
                  >
                    <option value="visit">{isFa ? 'هماهنگی بازدید حضوری از شوروم' : 'Private Showroom Visit'}</option>
                    <option value="architectural">{isFa ? 'مشاوره نورپردازی پروژه معماری' : 'Architectural Project Consultation'}</option>
                    <option value="samples">{isFa ? 'درخواست سمپل و تست محصولات' : 'Product Samples & Mockup'}</option>
                    <option value="general">{isFa ? 'سایر پرسش‌ها یا همکاری' : 'General Inquiry'}</option>
                  </select>
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder={isFa ? 'زمان یا تاریخ پیشنهادی بازدید یا توضیحات بیشتر...' : 'Preferred date/time or details...'}
                    value={showroomForm.message}
                    onChange={(e) => setShowroomForm({ ...showroomForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-none bg-[#F5F4F0] text-xs text-[#111111] placeholder-[#888888] border border-[#E5E0D8] focus:border-[#111111] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-none bg-[#111111] hover:bg-[#E40521] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span>{isFa ? 'در حال ثبت...' : 'Submitting...'}</span>
                  ) : success ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>{isFa ? 'درخواست ثبت شد' : 'Registered Successfully'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isFa ? 'ارسال درخواست هماهنگی' : 'Submit Visit Request'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Direct Quick Lines */}
              <div className="pt-6 border-t border-[#EFECE6] flex flex-wrap items-center justify-between gap-4 text-xs text-[#666666]">
                <div className="flex items-center gap-4" dir="ltr">
                  <a href="tel:+982126204800" className="flex items-center gap-1.5 font-bold text-[#111111] hover:text-[#E40521] transition-colors">
                    <Phone className="w-3.5 h-3.5 text-[#E40521]" />
                    <span>+98 21 2620 4800</span>
                  </a>
                  <a href="mailto:showroom@baldr.ir" className="flex items-center gap-1.5 font-bold text-[#111111] hover:text-[#E40521] transition-colors">
                    <Mail className="w-3.5 h-3.5 text-[#E40521]" />
                    <span>showroom@baldr.ir</span>
                  </a>
                </div>

                <a
                  href="https://maps.google.com/?q=Tehran+Elahiyeh+Fereshteh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#E40521] hover:underline inline-flex items-center gap-1"
                >
                  <span>{isFa ? 'گوگل‌مپ' : 'Google Maps'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. FOOTER
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
            <a href="mailto:info@baldr.ir" className="hover:text-[#E40521] transition-colors cursor-pointer">
              info@baldr.ir
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
