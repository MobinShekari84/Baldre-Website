'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpLeft,
  ArrowUpRight,
  Download,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';
import {
  Lang,
  HomepagePayload,
  BaldrProduct,
  FALLBACK_HOMEPAGE_DATA,
  UI_TEXT,
} from '@/data/baldrData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

interface TypologyItem {
  id: string;
  slug: string;
  name_fa: string;
  name_en: string;
  tagline_fa: string;
  tagline_en: string;
  image_url: string;
  studio_image: string;
  wide_image: string;
  sku: string;
  count: number;
}

const BALDR_TYPOLOGIES: TypologyItem[] = [
  {
    id: '01',
    slug: 'pendant',
    name_fa: 'چراغ‌های آویز و خطی',
    name_en: 'Suspension & Linear',
    tagline_fa: 'خطوط خالص نور معلق در فضا با خیرگی صفر (UGR <16)',
    tagline_en: 'Pure weightless suspended lines with zero glare optics',
    image_url: '/images/baldr-prod-pendant-arch.webp',
    studio_image: '/images/baldr-prod-pendant-studio.webp',
    wide_image: '/images/baldr-wide-pendant.webp',
    sku: 'BAL-VEC-SUS-01',
    count: 86,
  },
  {
    id: '02',
    slug: 'ceiling',
    name_fa: 'توکار و دان‌لایت وکتور R',
    name_en: 'Recessed Downlights',
    tagline_fa: 'تلفیق مقعر در سقف معماری با تفکیک رنگ استثنایی CRI >95',
    tagline_en: 'Architectural recessed ceiling flush with CRI >95 clarity',
    image_url: '/images/baldr-prod-ceiling-arch.webp',
    studio_image: '/images/baldr-prod-ceiling-studio.webp',
    wide_image: '/images/baldr-wide-ceiling.webp',
    sku: 'BAL-VEC-REC-02',
    count: 52,
  },
  {
    id: '03',
    slug: 'surface',
    name_fa: 'روکار استوانه‌ای وکتور SM',
    name_en: 'Surface Mounted Cylinders',
    tagline_fa: 'پروفیل یکپارچه آلومینیوم آنودایز شده بدون اتصالات نمایان',
    tagline_en: 'Seamless machined aluminum extrusion without visible fasteners',
    image_url: '/images/baldr-prod-surface-arch.webp',
    studio_image: '/images/baldr-prod-surface-studio.webp',
    wide_image: '/images/baldr-wide-surface.webp',
    sku: 'BAL-VEC-SM-03',
    count: 48,
  },
  {
    id: '04',
    slug: 'systems',
    name_fa: 'سیستم ریل مگنتی ۴۸V',
    name_en: '48V Magnetic Track Systems',
    tagline_fa: 'چیدمان ماژولار با پروتکل هوشمند DALI-2 و تغییر منعطف موقعیت',
    tagline_en: 'Modular magnetic track ecosystems with DALI-2 smart control',
    image_url: '/images/baldr-prod-systems-arch.webp',
    studio_image: '/images/baldr-prod-systems-studio.webp',
    wide_image: '/images/baldr-wide-systems.webp',
    sku: 'BAL-TRK-MAG-04',
    count: 64,
  },
  {
    id: '05',
    slug: 'table',
    name_fa: 'رومیزی تندیس‌گون آرلیا',
    name_en: 'Sculptural Table Lamps',
    tagline_fa: 'هم‌نشینی برنز تراش‌خورده و شیشه اپال دست‌ساز با دیمر لمسی',
    tagline_en: 'Hand-blown opal glass paired with milled bronze and tactile dimming',
    image_url: '/images/baldr-prod-table-arch.webp',
    studio_image: '/images/baldr-prod-table-studio.webp',
    wide_image: '/images/baldr-wide-table.webp',
    sku: 'BAL-AUR-TAB-05',
    count: 42,
  },
  {
    id: '06',
    slug: 'floor',
    name_fa: 'ایستاده مونولیت تراورتن',
    name_en: 'Monolith Floor Lamps',
    tagline_fa: 'تندیس صامت سنگ تراورتن طبیعی با بازتاب نرم نور بر دیوار',
    tagline_en: 'Natural travertine stone monolith radiating soft ambient grazing',
    image_url: '/images/baldr-prod-floor-arch.webp',
    studio_image: '/images/baldr-prod-floor-studio.webp',
    wide_image: '/images/baldr-wide-floor.webp',
    sku: 'BAL-MON-FLR-06',
    count: 34,
  },
  {
    id: '07',
    slug: 'wall',
    name_fa: 'دیواری و وال‌واشر اکلیپس',
    name_en: 'Wall Sconces & Washers',
    tagline_fa: 'هاله نور غیرمستقیم محاط بر هندسه دیوار و بافت‌های معماری',
    tagline_en: 'Atmospheric halo grazing sculpting wall relief and masonry',
    image_url: '/images/baldr-prod-wall-arch.webp',
    studio_image: '/images/baldr-prod-wall-studio.webp',
    wide_image: '/images/baldr-wide-wall.webp',
    sku: 'BAL-ECL-WAL-07',
    count: 48,
  },
  {
    id: '08',
    slug: 'outdoor',
    name_fa: 'محوطه و پرتابل ترا IP65',
    name_en: 'Landscape & Outdoor Bollards',
    tagline_fa: 'آلومینیوم مقاوم در برابر شرایط اقلیمی با باطری لیتیومی یکپارچه',
    tagline_en: 'All-weather architectural IP65 bollards with integrated battery',
    image_url: '/images/baldr-prod-outdoor-arch.webp',
    studio_image: '/images/baldr-prod-outdoor-studio.webp',
    wide_image: '/images/baldr-wide-outdoor.webp',
    sku: 'BAL-TER-OUT-08',
    count: 38,
  },
];

export default function BaldrFoscariniEditorialHomePage() {
  const pathname = usePathname();
  const lang: Lang = pathname?.startsWith('/en') ? 'en' : 'fa';
  const isFa = lang === 'fa';
  const dir = isFa ? 'rtl' : 'ltr';
  const t = UI_TEXT[lang];

  // Scroll state for floating header
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Mega menu and mobile drawer states
  const [isVisualMegaMenuOpen, setIsVisualMegaMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Category grid pagination state (4 categories per row on desktop, 2 sets of 4)
  const [categoryPage, setCategoryPage] = useState<number>(0);

  // Visible 4 categories based on active page
  const visibleCategories = useMemo(() => {
    const start = categoryPage * 4;
    return BALDR_TYPOLOGIES.slice(start, start + 4);
  }, [categoryPage]);

  // Product modal state
  const [activeProductModal, setActiveProductModal] = useState<BaldrProduct | null>(null);
  const [modalTab, setModalTab] = useState<'identity' | 'electrical'>('identity');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Homepage data from backend with instant fallback
  const [data, setData] = useState<HomepagePayload>(FALLBACK_HOMEPAGE_DATA);

  // Arrow icons matching language direction
  const ActionArrow = isFa ? ArrowUpLeft : ArrowUpRight;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let mounted = true;
    fetch(`${API_BASE}/homepage/`)
      .then((res) => {
        if (!res.ok) throw new Error('Offline');
        return res.json();
      })
      .then((payload: HomepagePayload) => {
        if (mounted && payload?.products?.length) {
          setData(payload);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const productsBase = isFa ? '/products' : '/en/products';
  const projectsHref = isFa ? '/projects' : '/en/projects';
  const professionalsHref = isFa ? '/professionals' : '/en/professionals';
  const aboutHref = isFa ? '/about' : '/en/about';
  const contactHref = isFa ? '/contact' : '/en/contact';

  const findProductBySku = (sku: string): BaldrProduct | undefined => {
    return data.products.find((p) => p.sku === sku);
  };

  return (
    <div dir={dir} className="min-h-screen bg-[#FBFBFA] text-[#141416] font-farsi selection:bg-[#141416] selection:text-[#FFFFFF]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 start-6 z-50 flex items-center gap-3 bg-[#141416] text-white px-5 py-3.5 rounded-none border border-white/10 text-xs shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4 text-[#E40521] shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          QUIET FLOATING LUXURY HEADER (Foscarini Benchmark)
          - Translucent background with crisp micro borders
          - Red Baldr mark + 3 clean editorial links
          - Visual Mega Menu with authentic photographs
          - Minimal Fa/En toggle + subtle PDF link (NO loud button pills)
         ===================================================================== */}
      <header
        className={`fixed top-0 inset-x-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBFBFA]/90 dark:bg-[#0D0D0E]/90 backdrop-blur-md border-b border-[#EBEAE6] dark:border-white/10 text-[#141416] dark:text-white shadow-xs'
            : 'bg-transparent text-white border-b border-white/15'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link href={isFa ? '/' : '/en'} className="flex items-center group shrink-0 cursor-pointer">
            <img
              src="/images/baldr-logo-red.webp"
              alt="Baldr Lighting"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </Link>

          {/* Center: 3 Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-10 text-[13px] tracking-wide font-medium">
            <button
              type="button"
              onClick={() => setIsVisualMegaMenuOpen(!isVisualMegaMenuOpen)}
              className="group inline-flex items-center gap-1.5 transition-colors cursor-pointer hover:text-[#E40521]"
            >
              <span>{isFa ? 'محصولات' : 'Product'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-transform duration-300 ${
                  isVisualMegaMenuOpen ? 'rotate-180 text-[#E40521]' : ''
                }`}
              />
            </button>
            <Link href="#manifesto" className="transition-colors hover:text-[#E40521] cursor-pointer">
              {isFa ? 'جهان بالدر' : 'World of Baldr'}
            </Link>
            <Link href="#projects-spread" className="transition-colors hover:text-[#E40521] cursor-pointer">
              {isFa ? 'معماران و پروژه‌ها' : 'Professionals & Projects'}
            </Link>
          </nav>

          {/* End: Utilities (Subtle Language Switcher & PDF Archive) */}
          <div className="flex items-center gap-5 shrink-0">
            {/* Minimal Language Switcher */}
            <div dir="ltr" className="flex items-center gap-2 text-xs font-medium">
              <Link
                href="/"
                className={`transition-colors cursor-pointer ${
                  isFa
                    ? 'font-bold text-[#E40521]'
                    : isScrolled
                    ? 'text-[#666666] hover:text-[#141416]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Fa
              </Link>
              <span className={`text-[10px] ${isScrolled ? 'text-[#CCCCCC]' : 'text-white/30'}`}>|</span>
              <Link
                href="/en"
                className={`transition-colors cursor-pointer ${
                  !isFa
                    ? 'font-bold text-[#E40521]'
                    : isScrolled
                    ? 'text-[#666666] hover:text-[#141416]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                En
              </Link>
            </div>

            {/* Subtle Catalogue Archive Link */}
            <a
              href="/downloads/Baldr-2026-Catalogue.pdf"
              download
              className={`hidden sm:inline-flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                isScrolled
                  ? 'text-[#444444] hover:text-[#E40521]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-[#E40521]" />
              <span>{isFa ? 'کاتالوگ ۲۰۲۶ (PDF)' : 'Catalogue 2026'}</span>
            </a>

            {/* Mobile Menu Icon */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ===================================================================
            VISUAL MEGA MENU (DESKTOP)
            - 8 authentic Baldr categories with real photography
            - Clean editorial layout with zero button clutter
           =================================================================== */}
        <AnimatePresence>
          {isVisualMegaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute top-full inset-x-0 bg-[#0F0F10] text-white border-b border-white/10 shadow-2xl z-50"
            >
              <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8">
                {/* Header row */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="text-xs uppercase tracking-widest text-[#888888] font-mono">
                    {isFa ? 'کالکشن جامع چراغ‌های معماری بالدر ۲۰۲۶' : 'BALDR ARCHITECTURAL LUMINAIRES — 2026 COLLECTION'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsVisualMegaMenuOpen(false)}
                    className="text-xs text-[#888888] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{isFa ? 'بستن' : 'Close'}</span>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 8 Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {BALDR_TYPOLOGIES.map((item) => (
                    <Link
                      key={item.id}
                      href={`${productsBase}?category=${item.slug}`}
                      onClick={() => setIsVisualMegaMenuOpen(false)}
                      className="group flex flex-col bg-[#161618] border border-white/10 hover:border-[#E40521] transition-all duration-300 rounded-none overflow-hidden"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden bg-black relative">
                        <img
                          src={item.image_url}
                          alt={isFa ? item.name_fa : item.name_en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        <span className="absolute bottom-2 start-2 text-[10px] text-white/70 font-mono">
                          {item.count} {isFa ? 'محصول' : 'SKUs'}
                        </span>
                      </div>
                      <div className="p-3">
                        <h4 className="text-xs font-medium text-white group-hover:text-[#E40521] transition-colors leading-snug">
                          {isFa ? item.name_fa : item.name_en}
                        </h4>
                        <p className="text-[11px] text-[#888888] mt-1 line-clamp-1">
                          {isFa ? item.tagline_fa : item.tagline_en}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Fullscreen Visual Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: isFa ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isFa ? 100 : -100 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-[#0F0F10] text-white flex flex-col overflow-y-auto lg:hidden"
            >
              <div className="px-6 h-20 flex items-center justify-between border-b border-white/10 shrink-0">
                <img src="/images/baldr-logo-red.webp" alt="Baldr" className="h-7 w-auto" />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex flex-col gap-4">
                <span className="text-[11px] uppercase tracking-widest text-[#888888] font-mono">
                  {isFa ? 'جهان بالدر' : 'WORLD OF BALDR'}
                </span>
                <Link
                  href={productsBase}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-lg font-medium border-b border-white/10 flex items-center justify-between"
                >
                  <span>{isFa ? 'کالکشن محصولات' : 'Products & Luminaires'}</span>
                  <ActionArrow className="w-4 h-4 text-[#E40521]" />
                </Link>
                <Link
                  href="#manifesto"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-lg font-medium border-b border-white/10 flex items-center justify-between"
                >
                  <span>{isFa ? 'فلسفه فرم و نور' : 'Philosophy of Light'}</span>
                  <ActionArrow className="w-4 h-4 text-[#E40521]" />
                </Link>
                <Link
                  href={projectsHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-lg font-medium border-b border-white/10 flex items-center justify-between"
                >
                  <span>{isFa ? 'پروژه‌های معماری' : 'Architectural Projects'}</span>
                  <ActionArrow className="w-4 h-4 text-[#E40521]" />
                </Link>
                <Link
                  href={professionalsHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-lg font-medium border-b border-white/10 flex items-center justify-between"
                >
                  <span>{isFa ? 'معماران و همکاران فنی' : 'For Professionals & CAD'}</span>
                  <ActionArrow className="w-4 h-4 text-[#E40521]" />
                </Link>
                <Link
                  href={contactHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-lg font-medium border-b border-white/10 flex items-center justify-between"
                >
                  <span>{isFa ? 'شوروم و ارتباط' : 'Showroom & Contact'}</span>
                  <ActionArrow className="w-4 h-4 text-[#E40521]" />
                </Link>

                <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#888888]">{isFa ? 'تغییر زبان:' : 'Language:'}</span>
                  <div dir="ltr" className="flex items-center gap-3 font-semibold">
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={isFa ? 'text-[#E40521]' : 'text-white/60'}
                    >
                      فارسی
                    </Link>
                    <span className="text-white/30">|</span>
                    <Link
                      href="/en"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={!isFa ? 'text-[#E40521]' : 'text-white/60'}
                    >
                      English
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =====================================================================
          SPREAD 0: CINEMATIC ARCHITECTURAL HERO
          - Full viewport architectural scene with 1080p ambient video loop
          - Pure typographic quiet manifesto in the corner + single red arrow link
         ===================================================================== */}
      <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#0A0A0B]">
        <video
          src="/videos/baldr-screen-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute inset-0 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none" />

        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pb-16 sm:pb-20 flex flex-col justify-end">
          <div className="max-w-2xl">
            {/* Layer 1: Kicker */}
            <span className="block text-xs uppercase tracking-widest text-white/70 font-mono mb-3">
              {isFa ? 'استودیو روشنایی معماری بالدر — تهران ۲۰۲۶' : 'BALDR ARCHITECTURAL LIGHTING — 2026'}
            </span>

            {/* Layer 2 & 3: Headline with Red Arrow */}
            <Link
              href={productsBase}
              className="group inline-flex items-start gap-3 text-white cursor-pointer mb-4"
            >
              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-medium leading-[1.2] tracking-tight group-hover:text-white/90 transition-colors">
                {isFa
                  ? 'جایی که نور زندگی می‌کند — روشنایی به مثابه تندیس معماری'
                  : 'With people in mind, we sculpt light that transforms architectural space.'}
              </h1>
              <ActionArrow className="w-6 sm:w-8 h-6 sm:h-8 text-[#E40521] shrink-0 mt-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            {/* Layer 4: Narrative Body */}
            <p className="text-[15px] sm:text-base text-white/80 leading-relaxed font-light max-w-xl text-justify">
              {isFa
                ? 'طراحی و مهندسی چراغ‌های معمارانه با خلوص فرم، سنگ‌های طبیعی و اپتیک بدون خیرگی (UGR <16) برای فضاهای شاخص معاصر.'
                : 'Purity of form, natural stones, and glare-free optical precision engineered for visionary contemporary spaces.'}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SPREAD 1: EDITORIAL PHILOSOPHY (Foscarini Section 1 Formula)
          - 1/3 Text Column on one side, 2/3 Architectural Image on the other
          - Exact 4-layer typographic hierarchy (12px kicker, red ↗, 24px title, 15px body)
         ===================================================================== */}
      <section id="manifesto" className="scroll-mt-24 py-24 sm:py-32 bg-[#FBFBFA] border-b border-[#EBEAE6]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* 1/3 Text Column (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                {/* Layer 1: Kicker */}
                <span className="block text-xs uppercase tracking-widest text-[#777777] font-mono mb-4">
                  {isFa ? 'فلسفه نور و فرم | PHILOSOPHY' : 'COMMUNICATION | PHILOSOPHY'}
                </span>

                {/* Layer 2 & 3: Red Arrow + Headline */}
                <Link
                  href={aboutHref}
                  className="group inline-flex items-start gap-3 text-[#141416] hover:text-[#E40521] transition-colors mb-4 cursor-pointer"
                >
                  <h2 className="text-xl sm:text-2xl font-medium leading-snug tracking-tight">
                    {isFa
                      ? 'چراغ چیست؟ — گفتگوی سکوت، متریال اصیل و روح فضا'
                      : "What's in a Lamp? — Dialogue of stillness, authentic materials, and space"}
                  </h2>
                  <ActionArrow className="w-5 h-5 text-[#E40521] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                {/* Layer 4: Narrative Body */}
                <p className="text-[15px] text-[#444444] leading-relaxed text-justify font-light mb-6">
                  {isFa
                    ? 'چراغ برای بالدر هرگز یک کالای مصرفی نبوده است؛ بلکه تندیسی نوری است که در سکوت روز فضا را می‌آراید و با فرارسیدن شامگاه، احساسات انسان و اتمسفر معماری را بیدار می‌سازد.'
                    : 'To Baldr, a lamp is never a commodity; it is a sculpted presence that inhabits space in daytime stillness and awakens the soul of architecture at dusk.'}
                </p>

                {/* Poetic Footnote */}
                <div className="pt-4 border-t border-[#E5E4E0] text-xs text-[#888888] font-light">
                  {isFa ? 'طیف گرمای نور: ۲۷۰۰K طلایی | ۳۰۰۰K گرم معمارانه | CRI >95' : 'Spectral Warmth: 2700K Gold | 3000K Gallery Soft | CRI >95'}
                </div>
              </div>
            </div>

            {/* 2/3 Image Column (8 cols) */}
            <div className="lg:col-span-8">
              <Link href={aboutHref} className="group block relative overflow-hidden bg-black/5 cursor-pointer">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src="/images/baldr-inspiration-magnet-system.webp"
                    alt="Baldr Lighting Philosophy"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-[#888888]">
                  <span>{isFa ? 'سیستم ریل مگنتی ۴۸V وکتور در فضای معماری مدرن' : 'Vector 48V Magnetic Track System in Minimal Architecture'}</span>
                  <span className="font-mono text-[11px]">TEHRAN, 2026</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SPREAD 2: ICONIC ARCHITECTURAL PROJECT (Foscarini Section 2 Formula)
          - Asymmetric layout: Tall portrait photo + wide landscape photo + story
          - Real lived-in spaces (Tehran Penthouse & Art Gallery)
         ===================================================================== */}
      <section id="projects-spread" className="scroll-mt-24 py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#EBEAE6]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Side: Tall Vertical Photo (5 cols) */}
            <div className="lg:col-span-5">
              <Link href={projectsHref} className="group block relative overflow-hidden bg-black/5 cursor-pointer">
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img
                    src="/images/project-tehran-penthouse.webp"
                    alt="Tehran Contemporary Residence"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>
                <div className="mt-3 text-xs text-[#888888]">
                  <span>{isFa ? 'پنت‌هاوس معاصر تهران — همنشینی سنگ، چوب گردو و نور وکتور' : 'Tehran Contemporary Residence — Travertine, Walnut & Vector'}</span>
                </div>
              </Link>
            </div>

            {/* Right Side: Landscape Photo + Typographic Story Block (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <Link href={projectsHref} className="group block relative overflow-hidden bg-black/5 cursor-pointer">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src="/images/project-art-gallery.webp"
                    alt="Contemporary Art Gallery"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>
              </Link>

              {/* 4-Layer Story Block */}
              <div>
                <span className="block text-xs uppercase tracking-widest text-[#777777] font-mono mb-3">
                  {isFa ? 'پروژه‌های شاخص معماری | PROJECTS' : 'ARCHITECTURE & CASE STUDIES | PROJECTS'}
                </span>

                <Link
                  href={projectsHref}
                  className="group inline-flex items-start gap-3 text-[#141416] hover:text-[#E40521] transition-colors mb-3 cursor-pointer"
                >
                  <h2 className="text-xl sm:text-2xl font-medium leading-snug tracking-tight">
                    {isFa
                      ? 'زیست‌بوم نور در فضا — تعامل خطوط نوری با مقیاس‌های بزرگ معماری'
                      : 'Living With Light — Interplay of linear clarity and architectural volumes'}
                  </h2>
                  <ActionArrow className="w-5 h-5 text-[#E40521] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <p className="text-[15px] text-[#444444] leading-relaxed text-justify font-light">
                  {isFa
                    ? 'پروژه‌هایی که در آن‌ها نورهای بدون خیرگی (UGR <16) محوریت فضا را تعریف کرده و چراغ‌های معلق وکتور، مرز میان سکوت درون و روشنایی بیرون را بازتعریف می‌کنند.'
                    : 'Spaces where glare-free precision (UGR <16) anchors spatial rhythm, framing the quiet dialogue between interior life and illuminated architecture.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SPREAD 3: FULL-BLEED PRODUCT IN-SITU INTERLUDE (Foscarini Section 3 Formula)
          - Deep velvet dark background (#121214)
          - Suspended linear fixture in authentic interior
          - Floating 24px headline + subtle micro-spec footnote
         ===================================================================== */}
      <section className="relative w-full py-28 sm:py-36 bg-[#121214] text-white overflow-hidden border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Big Architectural Image (7 cols) */}
            <div className="lg:col-span-7">
              <Link href={`${productsBase}?category=pendant`} className="group block relative overflow-hidden border border-white/10 cursor-pointer">
                <div className="aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src="/images/baldr-wide-pendant.webp"
                    alt="Vector Linear Suspension"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </Link>
            </div>

            {/* Floating Editorial Narrative (5 cols) */}
            <div className="lg:col-span-5">
              <span className="block text-xs uppercase tracking-widest text-[#888888] font-mono mb-4">
                {isFa ? 'محصول شاخص | PRODUCT' : 'PRODUCT | ARCHITECTURAL SUSPENSION'}
              </span>

              <Link
                href={`${productsBase}?category=pendant`}
                className="group inline-flex items-start gap-3 text-white hover:text-white/90 transition-colors mb-4 cursor-pointer"
              >
                <h2 className="text-xl sm:text-2xl font-medium leading-snug tracking-tight">
                  {isFa
                    ? 'وکتور — نهایت خلوص فرم در خدمت نور معلق'
                    : 'Vector — Pure weightless geometry serving architectural light'}
                </h2>
                <ActionArrow className="w-5 h-5 text-[#E40521] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <p className="text-[15px] text-white/70 leading-relaxed text-justify font-light mb-8">
                {isFa
                  ? 'اکستروژن دقیق آلومینیوم ۶۰۶۳-T6 با محفظه اپتیکال مقعر ضد خیرگی. طراحی‌شده برای آرامش چشم، حذف آلودگی نوری و تجسم هندسه معلق در فضاهای معاصر.'
                  : 'Precision-extruded architectural 6063-T6 aluminum with recessed optical chamber. Eliminating visible glare while anchoring space with minimal suspended grace.'}
              </p>

              {/* Engineering Micro Footnote */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs font-mono text-white/60">
                <div>
                  <span className="block text-white font-medium text-sm">CRI &gt;95</span>
                  <span>{isFa ? 'وضوح رنگ' : 'Color Fidelity'}</span>
                </div>
                <div>
                  <span className="block text-white font-medium text-sm">UGR &lt;16</span>
                  <span>{isFa ? 'بدون خیرگی' : 'Zero Glare'}</span>
                </div>
                <div>
                  <span className="block text-white font-medium text-sm">5 Years</span>
                  <span>{isFa ? 'گارانتی رسمی' : 'Guarantee'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SPREAD 4: CRAFTSMANSHIP & MATERIALITY (Foscarini "Maestrie" Formula)
          - Reversed rhythm: 2/3 Image on Left, 1/3 Text on Right
          - Macro tactile materiality (Natural stone, machined brass, optical acrylic)
         ===================================================================== */}
      <section className="py-24 sm:py-32 bg-[#FBFBFA] border-b border-[#EBEAE6]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* 2/3 Image Column (8 cols) */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <div className="aspect-[16/10] w-full overflow-hidden bg-black/5 relative group border border-[#EBEAE6]">
                <img
                  src="/images/ai-docs/baldr-artistic-atelier.webp"
                  alt="Baldr Materiality & Craftsmanship"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 start-3 text-xs text-white/80 font-mono">
                  {isFa ? 'آتلیه متریال و پرتوهای نور کیاروسکورو' : 'Atelier of Chiaroscuro & Tactile Materials'}
                </span>
              </div>
            </div>

            {/* 1/3 Text Column (4 cols) */}
            <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col justify-between">
              <div>
                <span className="block text-xs uppercase tracking-widest text-[#777777] font-mono mb-4">
                  {isFa ? 'صنعتگری و اصالت متریال | MAESTRIE' : 'CRAFTSMANSHIP & MATERIALITY | MAESTRIE'}
                </span>

                <Link
                  href={aboutHref}
                  className="group inline-flex items-start gap-3 text-[#141416] hover:text-[#E40521] transition-colors mb-4 cursor-pointer"
                >
                  <h2 className="text-xl sm:text-2xl font-medium leading-snug tracking-tight">
                    {isFa
                      ? 'تراش سنگ طبیعی، آلومینیوم آنودایز و اپتیک اپال'
                      : 'Carved natural travertine, anodized alloy, and opal optics'}
                  </h2>
                  <ActionArrow className="w-5 h-5 text-[#E40521] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <p className="text-[15px] text-[#444444] leading-relaxed text-justify font-light mb-6">
                  {isFa
                    ? 'هر چراغ بالدر حاصل هم‌نشینی متریال‌های طبیعی و صنایع دقیق مهندسی است. پایه‌های تراورتن دست‌تراش، بدنه‌های آلومینیوم با کیفیت هوافضا و چیپ‌های نوری اروپایی Citizen و Osram.'
                    : 'Every Baldr fixture is born from the meeting of tactile raw earth and aeronautical engineering: hand-honed travertine, aerospace-grade aluminum, and European Citizen/Osram LED engines.'}
                </p>

                <div className="pt-4 border-t border-[#E5E4E0] text-xs text-[#888888] font-light">
                  {isFa ? 'تراشکاری دقیق CNC ۶۰۶۳ — لنزهای میکروپریزماتیک بدون زردشدگی' : 'CNC-Milled 6063 Aluminum — Non-yellowing micro-prismatic optics'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SPREAD 5: 4-CATEGORY ARCHITECTURAL GRID (Desktop 4-in-a-Row + Subdued <> Slider)
          - 4 categories in one row on desktop (lg:grid-cols-4)
          - Subdued pale <> button pair for smooth set switching
          - Dual-image hover: high-res architectural in-situ context + studio cutout
          - Direct collection filtering link to /products?category=...
         ===================================================================== */}
      <section className="py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#EBEAE6]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Header Row: Kicker, Title and Subdued <> Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="block text-xs uppercase tracking-widest text-[#777777] font-mono mb-2">
                {isFa ? 'کاتالوگ و دسته‌بندی‌ها | ARCHITECTURAL TYPOLOGIES' : 'COLLECTIONS & TYPOLOGIES | ARCHITECTURAL FAMILIES'}
              </span>
              <h2 className="text-xl sm:text-3xl font-medium text-[#141416] tracking-tight">
                {isFa ? 'کاوش در ۸ خانواده چراغ‌های بالدر' : 'Explore the 8 Baldr Luminaire Collections'}
              </h2>
              <p className="text-xs sm:text-sm text-[#777777] mt-1.5 font-light">
                {isFa
                  ? (categoryPage === 0
                      ? 'مجموعه اول: چراغ‌های آویز و خطی، دان‌لایت توکار، روکار استوانه‌ای و سیستم ریل مگنتی ۴۸V'
                      : 'مجموعه دوم: رومیزی تندیس‌گون، ایستاده مونولیت تراورتن، دیواری اکلیپس و پرتابل محوطه IP65')
                  : (categoryPage === 0
                      ? 'Collection 01: Suspensions, recessed downlights, surface cylinders & 48V magnetic tracks'
                      : 'Collection 02: Sculptural table lamps, travertine monoliths, wall sconces & landscape bollards')}
              </p>
            </div>

            {/* Subdued page indicator + Pale <> button group */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-[#888888] tracking-widest select-none">
                {categoryPage === 0 ? '01 / 02' : '02 / 02'}
              </span>

              {/* Subdued pale <> buttons */}
              <div className="inline-flex items-center border border-[#141416]/15 bg-white divide-x divide-[#141416]/15 rtl:divide-x-reverse">
                <button
                  type="button"
                  onClick={() => setCategoryPage((prev) => (prev === 0 ? 1 : 0))}
                  aria-label={isFa ? 'دسته‌بندی‌های قبلی' : 'Previous categories'}
                  title={isFa ? 'جابه‌جایی دسته‌بندی‌ها' : 'Switch categories'}
                  className="w-10 h-10 flex items-center justify-center text-[#141416]/35 hover:text-[#141416] hover:bg-[#141416]/5 transition-colors cursor-pointer rounded-none active:scale-95"
                >
                  <ChevronRight className="w-4 h-4 rtl:inline ltr:hidden" />
                  <ChevronLeft className="w-4 h-4 rtl:hidden ltr:inline" />
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryPage((prev) => (prev === 0 ? 1 : 0))}
                  aria-label={isFa ? 'دسته‌بندی‌های بعدی' : 'Next categories'}
                  title={isFa ? 'جابه‌جایی دسته‌بندی‌ها' : 'Switch categories'}
                  className="w-10 h-10 flex items-center justify-center text-[#141416]/35 hover:text-[#141416] hover:bg-[#141416]/5 transition-colors cursor-pointer rounded-none active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 rtl:inline ltr:hidden" />
                  <ChevronRight className="w-4 h-4 rtl:hidden ltr:inline" />
                </button>
              </div>
            </div>
          </div>

          {/* 4-Category Grid on Desktop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={categoryPage}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {visibleCategories.map((item) => (
                <Link
                  key={item.id}
                  href={`${productsBase}?category=${item.slug}`}
                  className="group block bg-[#FFFFFF] border border-[#EBEAE6] hover:border-[#141416]/40 transition-all duration-500 rounded-none overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  {/* Top: 4/5 Portrait Image with Dual-Image Architectural Hover */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F6F5F2]">
                    {/* Architectural context photo */}
                    <img
                      src={item.image_url}
                      alt={isFa ? item.name_fa : item.name_en}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Studio cutout crossfade reveal on hover */}
                    <img
                      src={item.studio_image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain p-6 bg-white/95 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      loading="lazy"
                    />
                    {/* Subtle bottom vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity pointer-events-none" />

                    {/* Micro badges: SKU & Count */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between text-[11px] font-mono pointer-events-none">
                      <span className="bg-black/50 backdrop-blur-xs text-white/90 px-2 py-0.5 border border-white/15">
                        {item.sku}
                      </span>
                      <span className="bg-black/50 backdrop-blur-xs text-white/90 px-2 py-0.5 border border-white/15">
                        {item.count} {isFa ? 'مدل' : 'Models'}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Typography Info Box */}
                  <div className="p-5 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      <span className="block text-[11px] uppercase tracking-widest text-[#888888] font-mono mb-2">
                        {item.id} / 08 • {isFa ? 'خانواده نوری' : 'COLLECTION'}
                      </span>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-medium text-[#141416] group-hover:text-[#E40521] transition-colors leading-snug">
                          {isFa ? item.name_fa : item.name_en}
                        </h3>
                        <ActionArrow className="w-4 h-4 text-[#E40521] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#555555] font-light leading-relaxed text-justify line-clamp-2">
                        {isFa ? item.tagline_fa : item.tagline_en}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#F0EFEA] flex items-center justify-between text-[11px] font-mono text-[#888888]">
                      <span>{isFa ? 'مشاهده کاتالوگ' : 'View Catalog'}</span>
                      <span className="text-[#E40521] group-hover:underline">
                        {isFa ? 'ورود به کالکشن ←' : 'Explore All →'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Subdued Pagination Indicator Dots/Lines */}
          <div className="mt-10 flex items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setCategoryPage(0)}
              aria-label={isFa ? 'مجموعه اول' : 'Collection 01'}
              className={`h-1 transition-all duration-300 cursor-pointer rounded-none ${
                categoryPage === 0 ? 'w-10 bg-[#E40521]' : 'w-4 bg-[#141416]/20 hover:bg-[#141416]/40'
              }`}
            />
            <button
              type="button"
              onClick={() => setCategoryPage(1)}
              aria-label={isFa ? 'مجموعه دوم' : 'Collection 02'}
              className={`h-1 transition-all duration-300 cursor-pointer rounded-none ${
                categoryPage === 1 ? 'w-10 bg-[#E40521]' : 'w-4 bg-[#141416]/20 hover:bg-[#141416]/40'
              }`}
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          SPREAD 6: THE 151-PAGE ARCHITECTURAL CATALOGUE (Foscarini Collezioni)
          - Physical monograph photo spread (baldr-catalogue-spread.webp)
          - Single clean download link with red ↗
         ===================================================================== */}
      <section className="py-24 sm:py-32 bg-[#FBFBFA] border-b border-[#EBEAE6]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Catalog Open Spread Photo (7 cols) */}
            <div className="lg:col-span-7">
              <a
                href="/downloads/Baldr-2026-Catalogue.pdf"
                download
                className="group block relative overflow-hidden bg-black/5 cursor-pointer border border-[#EBEAE6]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-white">
                  <img
                    src="/images/baldr-catalogue-spread.webp"
                    alt="Baldr 2026 Official Catalogue"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>
              </a>
            </div>

            {/* Typographic Monograph Block (5 cols) */}
            <div className="lg:col-span-5">
              <span className="block text-xs uppercase tracking-widest text-[#777777] font-mono mb-4">
                {isFa ? 'مرجع فنی معماران | ARCHITECTURAL MONOGRAPH' : 'TECHNICAL MONOGRAPH | DOWNLOAD'}
              </span>

              <a
                href="/downloads/Baldr-2026-Catalogue.pdf"
                download
                className="group inline-flex items-start gap-3 text-[#141416] hover:text-[#E40521] transition-colors mb-4 cursor-pointer"
              >
                <h2 className="text-xl sm:text-2xl font-medium leading-snug tracking-tight">
                  {isFa
                    ? 'کاتالوگ جامع بالدر ۲۰۲۶ — ۱۵۱ صفحه مشخصات فوتومتریک و دیاگرام‌های CAD'
                    : 'Official 2026 Catalogue — 151 pages of photometric data and CAD drawings'}
                </h2>
                <ActionArrow className="w-5 h-5 text-[#E40521] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <p className="text-[15px] text-[#444444] leading-relaxed text-justify font-light mb-6">
                {isFa
                  ? 'مرجع کامل و جامع فنی برای معماران، دفاتر نورپردازی و مهندسین پروژه؛ شامل جدول‌های فوتومتری، منحنی‌های قطبی نور، دیاگرام‌های مقطع آلومینیوم و پروتکل‌های کنترل DALI-2.'
                  : 'A rigorous specification resource for architects and lighting designers, containing complete polar luminous intensity curves, dimensional CAD profiles, and DALI-2 protocol integration schemas.'}
              </p>

              {/* Single understated link */}
              <a
                href="/downloads/Baldr-2026-Catalogue.pdf"
                download
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#E40521] hover:underline"
              >
                <Download className="w-4 h-4" />
                <span>{isFa ? 'دانلود مستقیم کاتالوگ (PDF — ۶۱ مگابایت) ↗' : 'Download Complete PDF Catalogue (61 MB) ↗'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          QUIET MINIMALIST FOOTER
          - Clean 3-column layout
          - Red Baldr mark + copyright + subtle contact lines
         ===================================================================== */}
      <footer className="py-16 sm:py-20 bg-[#141416] text-white/80 border-t border-white/10 text-xs font-light">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand Info (5 cols) */}
            <div className="md:col-span-5">
              <img
                src="/images/baldr-logo-red.webp"
                alt="Baldr Lighting"
                className="h-7 w-auto object-contain mb-4"
              />
              <p className="text-white/60 leading-relaxed max-w-sm text-justify">
                {isFa
                  ? 'استودیو طراحی و مهندسی روشنایی معماری بالدر — تهران. خلق تندیس‌های نوری پایدار و بدون خیرگی برای پروژه‌های شاخص معاصر.'
                  : 'Baldr Architectural Lighting Studio — Tehran. Crafting timeless glare-free sculptural luminaires for visionary contemporary architecture.'}
              </p>
              <div className="mt-4 text-[11px] text-[#888888] font-mono">
                {isFa ? 'شعار رسمی: جایی که نور زندگی می‌کند' : 'Official Motto: Where Light Lives'}
              </div>
            </div>

            {/* Col 2: Navigation (3 cols) */}
            <div className="md:col-span-3">
              <span className="block text-xs uppercase tracking-widest text-white font-medium mb-4">
                {isFa ? 'ناوبری' : 'Navigation'}
              </span>
              <ul className="space-y-2 text-white/70">
                <li><Link href={productsBase} className="hover:text-[#E40521] transition-colors">{isFa ? 'محصولات و کالکشن‌ها' : 'Products'}</Link></li>
                <li><Link href={projectsHref} className="hover:text-[#E40521] transition-colors">{isFa ? 'پروژه‌های معماری' : 'Projects'}</Link></li>
                <li><Link href={aboutHref} className="hover:text-[#E40521] transition-colors">{isFa ? 'فلسفه و جهان بالدر' : 'About & Philosophy'}</Link></li>
                <li><Link href={professionalsHref} className="hover:text-[#E40521] transition-colors">{isFa ? 'معماران و مدارک CAD' : 'For Professionals'}</Link></li>
                <li><Link href={contactHref} className="hover:text-[#E40521] transition-colors">{isFa ? 'شوروم و ارتباط' : 'Contact & Showroom'}</Link></li>
              </ul>
            </div>

            {/* Col 3: Contact & Atelier (4 cols) */}
            <div className="md:col-span-4">
              <span className="block text-xs uppercase tracking-widest text-white font-medium mb-4">
                {isFa ? 'شوروم و دفتر مرکزی' : 'Showroom & Studio'}
              </span>
              <address className="not-italic space-y-2 text-white/70">
                <p>{isFa ? 'تهران، الهیه، خیابان فرشته، پلاک ۱۴۲' : 'No. 142, Fereshteh St., Elahiyeh, Tehran'}</p>
                <p dir="ltr" className="text-start font-mono">+98 (21) 2620 4800</p>
                <p className="font-mono">info@baldr.ir</p>
                <p className="text-[#888888] text-[11px] pt-2">
                  {isFa ? 'ساعات کاری: شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰' : 'Saturday to Wednesday: 09:00 — 18:00'}
                </p>
              </address>
            </div>
          </div>

          {/* Bottom Copyright & Language Switch */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
            <span>© ۲۰۲۶ {isFa ? 'استودیو روشنایی بالدر. تمامی حقوق محفوظ است.' : 'Baldr Architectural Lighting Studio. All rights reserved.'}</span>
            <div dir="ltr" className="flex items-center gap-3">
              <Link href="/" className={isFa ? 'text-[#E40521] font-bold' : 'hover:text-white'}>فارسی</Link>
              <span>|</span>
              <Link href="/en" className={!isFa ? 'text-[#E40521] font-bold' : 'hover:text-white'}>English</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
