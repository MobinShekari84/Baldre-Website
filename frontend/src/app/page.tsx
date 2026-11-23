'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Download,
  CheckCircle2,
  MapPin,
  Phone,
  X,
  Mail,
  Menu,
  Sparkles,
  Sliders,
  Sun,
  Flame,
  Maximize2,
} from 'lucide-react';
import {
  Lang,
  HomepagePayload,
  BaldrProduct,
  FALLBACK_HOMEPAGE_DATA,
  FLOS_HERO_SLIDES,
  FLOS_CATEGORY_STRIP,
  FLOS_ROOMS,
  UI_TEXT,
} from '@/data/baldrData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

interface VisualNavCategory {
  slug: string;
  name_fa: string;
  name_en: string;
  tagline_fa: string;
  tagline_en: string;
  studio_image: string;
  arch_image: string;
  href: string;
  productCount: number;
}

const BALDR_VISUAL_NAV_CATEGORIES: VisualNavCategory[] = [
  {
    slug: 'pendant',
    name_fa: 'آویز و خطی وکتور',
    name_en: 'Vector Suspension & Linear',
    tagline_fa: 'خطوط معلق بدون خیرگی (UGR <16)',
    tagline_en: 'Weightless glare-free architectural lines',
    studio_image: '/images/baldr-prod-pendant-studio.webp',
    arch_image: '/images/baldr-prod-pendant-arch.webp',
    href: '/products?category=pendant',
    productCount: 86,
  },
  {
    slug: 'ceiling',
    name_fa: 'توکار و دان‌لایت وکتور R',
    name_en: 'Vector R Recessed Downlights',
    tagline_fa: 'تلفیق مقعر در سقف با CRI >95',
    tagline_en: 'Flush architectural ceiling aperture',
    studio_image: '/images/baldr-prod-ceiling-studio.webp',
    arch_image: '/images/baldr-prod-ceiling-arch.webp',
    href: '/products?category=ceiling',
    productCount: 52,
  },
  {
    slug: 'surface',
    name_fa: 'روکار استوانه‌ای وکتور SM',
    name_en: 'Vector SM Surface Mounted',
    tagline_fa: 'پروفیل یکپارچه آلومینیوم آنودایز',
    tagline_en: 'Monolithic cylindrical architectural extrusion',
    studio_image: '/images/baldr-prod-surface-studio.webp',
    arch_image: '/images/baldr-prod-surface-arch.webp',
    href: '/products?category=surface',
    productCount: 48,
  },
  {
    slug: 'systems',
    name_fa: 'سیستم ریل مگنتی ۴۸V',
    name_en: '48V Magnetic Track Systems',
    tagline_fa: 'ماژولار و تحت کنترل هوشمند DALI-2',
    tagline_en: 'Modular magnetic track ecosystems',
    studio_image: '/images/baldr-prod-systems-studio.webp',
    arch_image: '/images/baldr-prod-systems-arch.webp',
    href: '/products?category=systems',
    productCount: 64,
  },
  {
    slug: 'table',
    name_fa: 'رومیزی تندیس‌گون آرلیا',
    name_en: 'Aurelia Sculptural Table',
    tagline_fa: 'تراش برنز و شیشه دست‌ساز اپال',
    tagline_en: 'Artisanal blown glass & machined bronze',
    studio_image: '/images/baldr-prod-table-studio.webp',
    arch_image: '/images/baldr-prod-table-arch.webp',
    href: '/products?category=table',
    productCount: 42,
  },
  {
    slug: 'floor',
    name_fa: 'ایستاده مونولیت تراورتن',
    name_en: 'Monolith Travertine Floor',
    tagline_fa: 'تندیس سنگ طبیعی با پخش نور غیرمستقیم',
    tagline_en: 'Natural travertine stone monolithic beacon',
    studio_image: '/images/baldr-prod-floor-studio.webp',
    arch_image: '/images/baldr-prod-floor-arch.webp',
    href: '/products?category=floor',
    productCount: 34,
  },
  {
    slug: 'wall',
    name_fa: 'دیواری و وال‌واشر اکلیپس',
    name_en: 'Eclipse Indirect Wall Sconce',
    tagline_fa: 'هاله نوری محاط بر معماری دیواری',
    tagline_en: 'Atmospheric indirect grazing & halo optics',
    studio_image: '/images/baldr-prod-wall-studio.webp',
    arch_image: '/images/baldr-prod-wall-arch.webp',
    href: '/products?category=wall',
    productCount: 48,
  },
  {
    slug: 'outdoor',
    name_fa: 'محوطه و پرتابل ترا IP65',
    name_en: 'Terra Landscape Bollard IP65',
    tagline_fa: 'مقاومت اقلیمی پایدار و باتری لیتیومی',
    tagline_en: 'IP65 weather-sealed architectural bollard',
    studio_image: '/images/baldr-prod-outdoor-studio.webp',
    arch_image: '/images/baldr-prod-outdoor-arch.webp',
    href: '/products?category=outdoor',
    productCount: 38,
  },
];

export default function BaldrFlosLightHomePage() {
  const pathname = usePathname();
  const lang: Lang = pathname?.startsWith('/en') ? 'en' : 'fa';
  const isFa = lang === 'fa';
  const dir = isFa ? 'rtl' : 'ltr';
  const t = UI_TEXT[lang];
  const productsBase = isFa ? '/products' : '/en/products';

  // Track scroll position: transparent navbar over hero at top, dark glass background on scroll
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Foscarini-Style Visual Mega Menu state (home navbar with photos)
  const [isVisualMegaMenuOpen, setIsVisualMegaMenuOpen] = useState<boolean>(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string>('pendant');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Foscarini Light Mood Spectrum Selector (2700K Sunset / 3000K Gallery / 4000K Pure)
  const [lightMoodCCT, setLightMoodCCT] = useState<'2700K' | '3000K' | '4000K'>('2700K');

  // Homepage data from backend (with instant local fallback)
  const [data, setData] = useState<HomepagePayload>(FALLBACK_HOMEPAGE_DATA);

  // Selected Category in Split Category Section (Right 1/3 list, Left 2/3 image + tiny text + button)
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(
    FLOS_CATEGORY_STRIP[0].slug
  );

  // Product modal state
  const [activeProductModal, setActiveProductModal] = useState<BaldrProduct | null>(null);
  const [modalTab, setModalTab] = useState<'identity' | 'electrical'>('identity');

  // Architectural Spaces ("نور در فضای معماری") Slideshow state
  const [activeRoomId, setActiveRoomId] = useState<string>('dining');

  // Showroom Reservation & Contact Form state
  const [formState, setFormState] = useState({
    full_name: '',
    company_or_studio: '',
    phone_or_email: '',
    project_type: 'Showroom Appointment',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync HTML lang/dir attributes WITHOUT overwriting next/font/local classes on <html> or <body>
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // Listen to window scroll for transparent -> white navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch data silently in the background
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
    setTimeout(() => setToastMessage(null), 4000);
  };

  const currentSlide = FLOS_HERO_SLIDES[0];
  const activeCategory =
    FLOS_CATEGORY_STRIP.find((c) => c.slug === activeCategorySlug) || FLOS_CATEGORY_STRIP[0];

  const currentRoomIndex = Math.max(0, FLOS_ROOMS.findIndex((r) => r.id === activeRoomId));
  const currentRoom = FLOS_ROOMS[currentRoomIndex] || FLOS_ROOMS[0];

  const handleNextRoom = useCallback(() => {
    setActiveRoomId((prevId) => {
      const idx = FLOS_ROOMS.findIndex((r) => r.id === prevId);
      const nextIdx = (idx + 1) % FLOS_ROOMS.length;
      return FLOS_ROOMS[nextIdx].id;
    });
  }, []);

  const handlePrevRoom = useCallback(() => {
    setActiveRoomId((prevId) => {
      const idx = FLOS_ROOMS.findIndex((r) => r.id === prevId);
      const prevIdx = (idx - 1 + FLOS_ROOMS.length) % FLOS_ROOMS.length;
      return FLOS_ROOMS[prevIdx].id;
    });
  }, []);

  const roomProducts = useMemo(() => {
    return data.products.filter((p) => currentRoom.featured_skus.includes(p.sku));
  }, [data.products, currentRoom]);

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.full_name || !formState.phone_or_email) return;
    setFormStatus('submitting');
    try {
      await fetch(`${API_BASE}/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          preferred_language: lang,
        }),
      });
      setFormStatus('success');
    } catch {
      setFormStatus('success');
    }
    triggerToast(
      isFa
        ? 'درخواست رزرو شوروم با موفقیت ثبت شد.'
        : 'Your showroom appointment request has been registered.'
    );
    setTimeout(() => {
      setFormStatus('idle');
      setFormState({
        full_name: '',
        company_or_studio: '',
        phone_or_email: '',
        project_type: 'Showroom Appointment',
        message: '',
      });
    }, 3500);
  };

  const ArrowIcon = isFa ? ArrowUpLeft : ArrowUpRight;
  const NextChevron = isFa ? ChevronLeft : ChevronRight;
  const PrevChevron = isFa ? ChevronRight : ChevronLeft;

  const homeHref = isFa ? '/' : '/en';
  const projectsHref = isFa ? '/projects' : '/en/projects';
  const professionalsHref = isFa ? '/professionals' : '/en/professionals';
  const aboutHref = isFa ? '/about' : '/en/about';
  const contactHref = isFa ? '/contact' : '/en/contact';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#home' || href === homeHref) {
      if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '/en')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Navbar items linking to dedicated architectural pages (Showroom is housed inside About Us)
  const navItems = [
    { href: productsBase, label: t.nav.products },
    { href: projectsHref, label: t.nav.projects },
    { href: professionalsHref, label: t.nav.professionals },
    { href: aboutHref, label: t.nav.about },
    { href: contactHref, label: t.nav.contact },
  ];

  return (
    <div dir={dir} className="min-h-screen bg-[#FFFFFF] text-[#111111] font-farsi">
      {/* Floating Minimalist Transparent-Glass Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-6 start-6 z-50 flex items-center gap-3 bg-black/75 backdrop-blur-md text-[#FFFFFF] px-6 py-4 rounded-none border border-white/20 max-w-md"
          >
            <CheckCircle2 className="w-4 h-4 text-[#E40521] shrink-0" />
            <p className="text-xs md:text-sm leading-relaxed text-justify">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          FOSCARINI-INSPIRED IMAGE-RICH NAVBAR (HOME NAVBAR WITH PHOTOS)
          - Header Bar with live photo thumbnail trigger for Visual Mega Menu
          - Floating Visual Mega Menu showing 8 authentic category photo cards
          - Side editorial highlight with full-bleed photo and catalogue download
          - Full-Screen Mobile Visual Drawer with rich photos for every nav item
          - Minimal bilingual toggle: Fa (RTL) / En (LTR)
         ===================================================================== */}
      <header
        className={`fixed top-0 inset-x-0 z-40 w-full rounded-none transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0D0D0E]/95 backdrop-blur-xl border-b border-white/10 text-white shadow-xl'
            : 'bg-[#0A0A0B]/60 backdrop-blur-md border-b border-white/15 text-white'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 h-20 flex items-center justify-between gap-4">
          {/* Start: Logo + Visual Category Trigger with Photo Thumbnail */}
          <div className="flex items-center gap-5 sm:gap-7 shrink-0">
            {/* Official Baldr Red Logo */}
            <Link
              href={homeHref}
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center group shrink-0 cursor-pointer"
            >
              <img
                src="/images/baldr-logo-red.webp"
                alt="Baldr Lighting"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </Link>

            {/* Visual Navbar Trigger with Photo Thumbnail ('home navbar هم عکس باشه') */}
            <button
              type="button"
              onClick={() => setIsVisualMegaMenuOpen((prev) => !prev)}
              aria-expanded={isVisualMegaMenuOpen}
              className={`hidden md:inline-flex items-center gap-2.5 px-3 py-1.5 rounded-none border transition-all cursor-pointer group ${
                isVisualMegaMenuOpen
                  ? 'bg-white/20 border-[#E40521] text-white shadow-[0_0_15px_rgba(228,5,33,0.3)]'
                  : 'bg-white/10 border-white/25 text-white hover:bg-white/20 hover:border-white/40'
              }`}
            >
              <div className="relative w-7 h-7 overflow-hidden border border-white/30 shrink-0 bg-[#0A0A0A]">
                <img
                  src="/images/baldr-prod-pendant-arch.webp"
                  alt="کالکشن وکتور"
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-300"
                />
                <span className="absolute top-0.5 end-0.5 w-1.5 h-1.5 bg-[#E40521] rounded-full animate-pulse" />
              </div>
              <div className="text-start">
                <span className="block text-[11px] font-bold tracking-tight leading-tight">
                  {isFa ? 'کالکشن‌های نوری' : 'Light Collections'}
                </span>
                <span className="block text-[9px] text-white/70 leading-none">
                  {isFa ? 'کاتالوگ تصویری' : 'Visual Gallery'}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isVisualMegaMenuOpen ? 'rotate-180 text-[#E40521]' : 'opacity-70 group-hover:opacity-100'
                }`}
              />
            </button>
          </div>

          {/* Center: Primary Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wide">
            <button
              type="button"
              onClick={() => setIsVisualMegaMenuOpen((prev) => !prev)}
              className="relative py-1.5 text-white/90 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#E40521] after:scale-x-0 hover:after:scale-x-100 after:transition-transform cursor-pointer"
            >
              {t.nav.products}
            </button>
            <Link
              href={projectsHref}
              onClick={(e) => handleNavClick(e, projectsHref)}
              className="relative py-1.5 text-white/90 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#E40521] after:scale-x-0 hover:after:scale-x-100 after:transition-transform cursor-pointer"
            >
              {t.nav.projects}
            </Link>
            <Link
              href="#manifesto"
              onClick={(e) => handleNavClick(e, '#manifesto')}
              className="relative py-1.5 text-white/90 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#E40521] after:scale-x-0 hover:after:scale-x-100 after:transition-transform cursor-pointer"
            >
              {isFa ? 'فلسفه فرم و نور' : 'Philosophy of Light'}
            </Link>
            <Link
              href={professionalsHref}
              onClick={(e) => handleNavClick(e, professionalsHref)}
              className="relative py-1.5 text-white/90 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#E40521] after:scale-x-0 hover:after:scale-x-100 after:transition-transform cursor-pointer"
            >
              {t.nav.professionals}
            </Link>
            <Link
              href={contactHref}
              onClick={(e) => handleNavClick(e, contactHref)}
              className="relative py-1.5 text-white/90 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#E40521] after:scale-x-0 hover:after:scale-x-100 after:transition-transform cursor-pointer"
            >
              {t.nav.contact}
            </Link>
          </nav>

          {/* End: Language Toggle & CTA Button & Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Minimal Language Toggle ("Fa | En" SEO Route Links) */}
            <div
              dir="ltr"
              className="inline-flex items-center rounded-none border border-white/20 bg-black/40 backdrop-blur-xs"
              role="group"
              aria-label="Language Switcher"
            >
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isFa
                    ? 'bg-[#E40521] text-white shadow-xs'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Fa
              </Link>
              <Link
                href="/en"
                className={`px-3 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  !isFa
                    ? 'bg-[#E40521] text-white shadow-xs'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                En
              </Link>
            </div>

            {/* Navbar CTA Button: "کاتالوگ ۲۰۲۶" */}
            <a
              href="/downloads/Baldr-2026-Catalogue.pdf"
              download
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-none text-xs font-semibold bg-[#E40521] hover:bg-[#c9041d] text-white transition-colors cursor-pointer border border-[#E40521]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isFa ? 'کاتالوگ ۲۰۲۶ (PDF)' : '2026 Catalogue'}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#E40521] border border-white/20 bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ===================================================================
            VISUAL MEGA MENU (DESKTOP)
            - Drops down when isVisualMegaMenuOpen is true
            - Grid of 8 authentic Baldr categories with real photos
            - Side editorial card with wide photo & catalogue download
           =================================================================== */}
        <AnimatePresence>
          {isVisualMegaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute top-full inset-x-0 bg-[#0C0C0D]/98 backdrop-blur-2xl border-b border-white/15 text-white shadow-2xl z-50 overflow-hidden"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-8">
                {/* Header row inside Mega Menu */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#E40521]" />
                    <span className="text-xs uppercase tracking-widest text-white/70 font-semibold">
                      {isFa ? 'کالکشن جامع چراغ‌های معماری بالدر ۲۰۲۶' : 'BALDR ARCHITECTURAL LUMINAIRES — 2026 COLLECTION'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsVisualMegaMenuOpen(false)}
                    className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer px-2 py-1 border border-white/10 hover:border-white/30"
                  >
                    <span>{isFa ? 'بستن' : 'Close'}</span>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Mega Menu Grid: Left 8 Categories (8 cols), Right Editorial Spotlight (4 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Categories Visual Cards (8 columns) */}
                  <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {BALDR_VISUAL_NAV_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={isFa ? cat.href : `/en${cat.href}`}
                        onClick={() => setIsVisualMegaMenuOpen(false)}
                        className="group relative flex flex-col bg-[#141416] border border-white/10 hover:border-[#E40521] transition-all duration-300 rounded-none overflow-hidden"
                      >
                        {/* Image Box */}
                        <div className="aspect-[4/3] w-full overflow-hidden bg-black/60 relative">
                          <img
                            src={cat.arch_image}
                            alt={isFa ? cat.name_fa : cat.name_en}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                          <span className="absolute top-2 start-2 text-[9px] font-bold text-white/90 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 border border-white/20">
                            {cat.productCount} {isFa ? 'محصول' : 'SKUs'}
                          </span>
                        </div>
                        {/* Text Info */}
                        <div className="p-3 flex flex-col justify-between grow">
                          <div>
                            <h4 className="text-xs font-bold text-white group-hover:text-[#E40521] transition-colors leading-snug mb-1">
                              {isFa ? cat.name_fa : cat.name_en}
                            </h4>
                            <p className="text-[10px] text-white/60 line-clamp-1">
                              {isFa ? cat.tagline_fa : cat.tagline_en}
                            </p>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#E40521] font-semibold">
                            <span>{isFa ? 'مشاهده کالکشن' : 'Explore'}</span>
                            <ArrowIcon className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Right Column: Editorial Highlight (Foscarini-style visual card) */}
                  <div className="lg:col-span-4 flex flex-col justify-between bg-[#141416] border border-white/10 p-6 relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#E40521] text-white text-[10px] font-bold uppercase tracking-wider mb-3">
                        {isFa ? 'شاهکار منتخب ماه' : 'FEATURED SPOTLIGHT'}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                        {isFa ? 'سیستم ریل مگنتی ۴۸V وکتور' : 'Vector 48V Magnetic System'}
                      </h3>
                      <p className="text-xs text-white/70 leading-relaxed mb-4 text-justify font-light">
                        {isFa
                          ? 'تلفیق مینیمال خطوط نور و تاریکی با کنترل هوشمند DALI-2 و قابلیت تعویض سریع ماژول‌ها بدون ابزار.'
                          : 'Architectural low-voltage ecosystem with DALI-2 intelligence and toolless luminaire repositioning.'}
                      </p>
                    </div>

                    {/* Wide Image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10 mb-4 bg-black">
                      <img
                        src="/images/baldr-wide-systems.webp"
                        alt="Vector Systems"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="relative z-10 flex items-center gap-3">
                      <Link
                        href={productsBase}
                        onClick={() => setIsVisualMegaMenuOpen(false)}
                        className="flex-1 py-2.5 px-3 bg-[#E40521] hover:bg-[#c9041d] text-white text-xs font-semibold text-center transition-colors"
                      >
                        {isFa ? 'کاتالوگ محصولات' : 'Browse All'}
                      </Link>
                      <a
                        href="/downloads/Baldr-2026-Catalogue.pdf"
                        download
                        className="py-2.5 px-3 border border-white/20 hover:border-white text-white text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isFa ? 'PDF (۱۵۱ ص)' : 'PDF Catalog'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================================================================
            FULL-SCREEN MOBILE VISUAL DRAWER
            - Every navigation item has its own high-resolution photo card
           =================================================================== */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: isFa ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isFa ? 100 : -100 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-0 z-50 bg-[#0A0A0B] text-white flex flex-col overflow-y-auto lg:hidden"
            >
              {/* Drawer Header */}
              <div className="px-6 h-20 flex items-center justify-between border-b border-white/10 shrink-0">
                <img
                  src="/images/baldr-logo-red.webp"
                  alt="Baldr Lighting"
                  className="h-7 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/70 hover:text-white border border-white/20 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Visual Cards */}
              <div className="p-6 flex flex-col gap-3.5 grow">
                <div className="text-[10px] uppercase tracking-widest text-[#E40521] font-bold">
                  {isFa ? 'ناوبری تصویری بالدر' : 'VISUAL NAVIGATION'}
                </div>

                {/* Mobile Visual Card 1: Products */}
                <Link
                  href={productsBase}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative flex items-center gap-4 p-3 bg-[#141416] border border-white/10 hover:border-[#E40521]"
                >
                  <div className="w-16 h-16 shrink-0 overflow-hidden bg-black border border-white/10">
                    <img
                      src="/images/baldr-prod-pendant-arch.webp"
                      alt="Products"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#E40521] transition-colors">
                      {isFa ? 'کالکشن کامل محصولات' : 'Product Collections'}
                    </h4>
                    <p className="text-[11px] text-white/60">
                      {isFa ? '۸ خانواده چراغ شاخص معماری' : '8 Authentic Fixture Families'}
                    </p>
                  </div>
                  <ArrowIcon className="w-4 h-4 text-[#E40521] ms-auto" />
                </Link>

                {/* Mobile Visual Card 2: Projects */}
                <Link
                  href={projectsHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative flex items-center gap-4 p-3 bg-[#141416] border border-white/10 hover:border-[#E40521]"
                >
                  <div className="w-16 h-16 shrink-0 overflow-hidden bg-black border border-white/10">
                    <img
                      src="/images/project-tehran-penthouse.webp"
                      alt="Projects"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#E40521] transition-colors">
                      {isFa ? 'پروژه‌ها و زیست‌بوم نور' : 'Architectural Projects'}
                    </h4>
                    <p className="text-[11px] text-white/60">
                      {isFa ? 'پنت‌هاوس تهران، گالری آرت و ویلاها' : 'Tehran Penthouse & Art Galleries'}
                    </p>
                  </div>
                  <ArrowIcon className="w-4 h-4 text-[#E40521] ms-auto" />
                </Link>

                {/* Mobile Visual Card 3: Manifesto */}
                <Link
                  href="#manifesto"
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    handleNavClick(e, '#manifesto');
                  }}
                  className="group relative flex items-center gap-4 p-3 bg-[#141416] border border-white/10 hover:border-[#E40521]"
                >
                  <div className="w-16 h-16 shrink-0 overflow-hidden bg-black border border-white/10">
                    <img
                      src="/images/ai-docs/baldr-artistic-atelier.webp"
                      alt="Philosophy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#E40521] transition-colors">
                      {isFa ? 'فلسفه فرم و نور (چراغ چیست؟)' : 'Philosophy of Light'}
                    </h4>
                    <p className="text-[11px] text-white/60">
                      {isFa ? 'مانیفست هنری و طیف کلوین بالدر' : 'Artistic Manifesto & CCT Spectrum'}
                    </p>
                  </div>
                  <ArrowIcon className="w-4 h-4 text-[#E40521] ms-auto" />
                </Link>

                {/* Mobile Visual Card 4: Official Catalogue */}
                <a
                  href="/downloads/Baldr-2026-Catalogue.pdf"
                  download
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative flex items-center gap-4 p-3 bg-[#141416] border border-white/10 hover:border-[#E40521]"
                >
                  <div className="w-16 h-16 shrink-0 overflow-hidden bg-black border border-white/10">
                    <img
                      src="/images/baldr-catalogue-spread.webp"
                      alt="Catalogue"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#E40521] transition-colors">
                      {isFa ? 'کاتالوگ جامع ۲۰۲۶ (PDF)' : 'Official 2026 Catalogue'}
                    </h4>
                    <p className="text-[11px] text-white/60">
                      {isFa ? '۱۵۱ صفحه مشخصات فنی و نقشه‌های CAD' : '151 Pages of Technical Drawings'}
                    </p>
                  </div>
                  <Download className="w-4 h-4 text-[#E40521] ms-auto" />
                </a>

                {/* Mobile Visual Card 5: Showroom & Contact */}
                <Link
                  href={contactHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative flex items-center gap-4 p-3 bg-[#141416] border border-white/10 hover:border-[#E40521]"
                >
                  <div className="w-16 h-16 shrink-0 overflow-hidden bg-black border border-white/10">
                    <img
                      src="/images/baldr-prod-systems-arch.webp"
                      alt="Showroom"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#E40521] transition-colors">
                      {isFa ? 'شوروم مرکزی و تماس' : 'Showroom & Contact'}
                    </h4>
                    <p className="text-[11px] text-white/60">
                      {isFa ? 'تهران، خیابان فرشته — رزرو اختصاصی' : 'Fereshteh, Tehran — Private Booking'}
                    </p>
                  </div>
                  <ArrowIcon className="w-4 h-4 text-[#E40521] ms-auto" />
                </Link>

                {/* Language Switcher in Mobile Drawer */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/60 font-medium">
                    {isFa ? 'زبان وب‌سایت' : 'Language'}
                  </span>
                  <div dir="ltr" className="inline-flex items-center border border-white/20">
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-1.5 text-xs font-bold ${isFa ? 'bg-[#E40521] text-white' : 'text-white/70'}`}
                    >
                      فارسی
                    </Link>
                    <Link
                      href="/en"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-1.5 text-xs font-bold ${!isFa ? 'bg-[#E40521] text-white' : 'text-white/70'}`}
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
          SECTION 1 (1080P ARCHITECTURAL VIDEO LOOP): HERO SECTION (#home)
          - Autoplay Looping 1080p Ambient Video Background
          - Bold Headline + Short Subtitle + Minimal Glass CTA Button
         ===================================================================== */}
      <section
        id="home"
        className="relative w-full h-screen min-h-[680px] overflow-hidden bg-[#111111]"
      >
        {/* Full-Screen Looping 1080p Architectural Video */}
        <video
          src="/videos/baldr-screen-loop.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute inset-0"
        />

        {/* Subtle Top & Bottom Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/70 pointer-events-none" />

        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pt-28 pb-12 sm:pb-16 flex flex-col justify-end">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-extrabold text-[#FFFFFF] leading-[1.2] tracking-tight mb-3">
              {isFa ? currentSlide.title_fa : currentSlide.title_en}
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-[#FFFFFF]/85 leading-relaxed mb-7 font-light">
              {isFa ? currentSlide.subtitle_fa : currentSlide.subtitle_en}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {/* Transparent Glass CTA Button */}
              <Link
                href={productsBase}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-none bg-white/15 backdrop-blur-sm text-[#FFFFFF] hover:bg-white/25 border border-white/35 transition-all text-xs sm:text-sm font-semibold cursor-pointer"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowIcon className="w-4 h-4 text-[#E40521]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOSCARINI-INSPIRED ARTISTIC MANIFESTO SECTION (#manifesto)
          - "What's in a Lamp? / چراغ چیست؟"
          - Architectural Chiaroscuro & Emotional Light Spectrum (2700K / 3000K / 4000K)
          - Materiality card featuring baldr-artistic-atelier.webp from ai-docs
         ===================================================================== */}
      <section
        id="manifesto"
        className="scroll-mt-20 py-24 lg:py-32 bg-[#0F0F10] text-[#FFFFFF] relative overflow-hidden border-t border-b border-white/10"
      >
        {/* Subtle Ambient Glow from Selected CCT */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-700 opacity-20 blur-3xl ${
            lightMoodCCT === '2700K'
              ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFB347] via-[#FF8C00] to-transparent'
              : lightMoodCCT === '3000K'
              ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFE4B5] via-[#DEB887] to-transparent'
              : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F0F8FF] via-[#B0C4DE] to-transparent'
          }`}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Right Column: Editorial Poetic Thesis */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/5 border border-white/15 text-white/80 text-[11px] font-bold tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 bg-[#E40521]" />
                <span>{isFa ? 'فلسفه فرم و نور | مانیفست بالدر' : 'PHILOSOPHY OF LIGHT & FORM'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.25] mb-6">
                {isFa
                  ? 'چراغ چیست؟ — گفتگوی سکوت، متریال اصیل و روح روشنایی'
                  : "What's in a Lamp? — The Dialogue of Stillness & Pure Light"}
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed text-justify mb-6 font-light">
                {isFa
                  ? 'چراغ برای بالدر هرگز صرفاً یک ابزار الکتریکی یا وسیله مصرفی روشنایی نبوده است؛ بلکه پیکره‌ای تندیس‌گون در بطن معماری است. در روشنایی روز، با تناسبات خالص هندسی، سنگ‌های طبیعی و برنج تراش‌خورده، سکوت فضا را می‌آراید؛ و با فرا رسیدن شامگاه، با خلوص طیف و پرتوهای بدون خیرگی (UGR <16)، اتمسفر و احساسات زیست‌بوم معمارانه را بازتعریف می‌کند.'
                  : 'To Baldr, a luminaire is never merely an electrical fixture; it is a sculpted presence within architectural space. In daytime stillness, with pure geometric proportions, natural stone, and machined brass, it dignifies silence; at dusk, with glare-free optical precision (UGR <16) and rich spectral depth, it awakens the emotional soul of contemporary architecture.'}
              </p>

              {/* Foscarini Inspired Quote Callout */}
              <div className="p-5 border-s-2 border-[#E40521] bg-white/5 backdrop-blur-xs mb-8">
                <blockquote className="text-xs sm:text-sm text-white/90 italic leading-relaxed text-justify">
                  {isFa
                    ? '«نور، نامرئی‌ترین متریال معماری است؛ اما متریالی است که تمام ماده‌های دیگر را مرئی می‌سازد و به سایه‌ها معنا می‌بخشد.»'
                    : '"Light is the most invisible material in architecture; yet it is the very material that renders all others visible and endows shadows with poetic meaning."'}
                </blockquote>
                <cite className="block text-[10px] text-white/60 not-italic mt-2 font-mono">
                  — {isFa ? 'استودیو طراحی بالدر تهران' : 'Baldr Architectural Lighting Studio'}
                </cite>
              </div>

              {/* Interactive Light Temperature (CCT) Spectrum Switcher */}
              <div>
                <span className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                  {isFa ? 'طیف گرمای نور (شبیه‌ساز اثر نوری در فضا):' : 'Interactive Color Temperature (CCT) Spectrum:'}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    {
                      cct: '2700K',
                      titleFa: '۲۷۰۰K — غروب طلایی',
                      titleEn: '2700K — Sunset Gold',
                      descFa: 'نور گرم و صمیمی، ایده‌آل برای نشیمن و ناهارخوری',
                      descEn: 'Warm intimate glow for living & dining',
                      color: '#FFB347',
                    },
                    {
                      cct: '3000K',
                      titleFa: '۳۰۰۰K — گرم معمارانه',
                      titleEn: '3000K — Gallery Soft',
                      descFa: 'دمای استاندارد گالری‌ها و فضاهای لوکس با CRI >95',
                      descEn: 'Standard museum & luxury clarity with CRI >95',
                      color: '#FFE4B5',
                    },
                    {
                      cct: '4000K',
                      titleFa: '۴۰۰۰K — خنثای مدرن',
                      titleEn: '4000K — Crisp Modern',
                      descFa: 'وضوح خطی مطلق برای دفاتر طراحی و استودیوها',
                      descEn: 'Linear precision for design studios & ateliers',
                      color: '#F0F8FF',
                    },
                  ].map((item) => (
                    <button
                      key={item.cct}
                      type="button"
                      onClick={() => setLightMoodCCT(item.cct as any)}
                      className={`px-4 py-2.5 rounded-none border text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                        lightMoodCCT === item.cct
                          ? 'bg-white/20 border-white text-white shadow-lg'
                          : 'bg-white/5 border-white/20 text-white/70 hover:text-white hover:border-white/40'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{isFa ? item.titleFa : item.titleEn}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Left Column: Visual Atelier Image Card */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/15 bg-black/60 shadow-2xl group">
                <img
                  src="/images/ai-docs/baldr-artistic-atelier.webp"
                  alt="Baldr Architectural Atelier"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute bottom-6 inset-x-6">
                  <div className="flex items-center gap-2 text-[#E40521] text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isFa ? 'آتلیه و هنر متریال بالدر' : 'BALDR ATELIER & MATERIALITY'}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    {isFa ? 'سنگ تراورتن، برنج آنودایز و اپتیک بدون خیرگی' : 'Travertine Stone, Brushed Brass & Optical Clarity'}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-2 text-justify">
                    {isFa
                      ? 'هم‌نشینی دقیق صنعت آلومینیوم ۶۰۶۳ و سنگ‌های طبیعی در تلفیق با چیپ‌های نوری اروپایی Osram و Citizen.'
                      : 'Harmonious fusion of precision 6063 aluminum, natural stone, and European Citizen/Osram LED engines.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2 (PURE WHITE #FFFFFF): PRODUCT CATEGORIES (#products)
          - Right Column (1/3 width): Category List
          - Left Column (2/3 width): Selected Category Image + Very Small Text + "More Products" Button
         ===================================================================== */}
      <section
        id="products"
        className="scroll-mt-20 py-20 lg:py-28 bg-[#FFFFFF]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          {/* Force RTL grid placement on desktop so Right side is always the 1/3 category list and Left side is always the 2/3 photo preview */}
          <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* RIGHT SIDE (1/3 width = 4 of 12 cols): Categories List */}
            <div dir={dir} className="lg:col-span-4 flex flex-col justify-between">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111111] tracking-tight mb-8">
                {t.categoryStrip.title}
              </h2>

              <div className="divide-y divide-[#E5E5E5] border-t border-b border-[#E5E5E5]">
                {FLOS_CATEGORY_STRIP.map((cat) => {
                  const isSelected = activeCategory.slug === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => setActiveCategorySlug(cat.slug)}
                      onMouseEnter={() => setActiveCategorySlug(cat.slug)}
                      className={`w-full py-4 px-2 flex items-center justify-between gap-3 text-start transition-colors cursor-pointer bg-transparent ${
                        isSelected
                          ? 'text-[#111111] font-bold'
                          : 'text-[#666666] hover:text-[#111111] font-medium'
                      }`}
                    >
                      <span className="text-sm sm:text-base flex items-center gap-2.5">
                        {isSelected && (
                          <span className="w-1.5 h-1.5 bg-[#E40521] shrink-0" />
                        )}
                        <span>{isFa ? cat.name_fa : cat.name_en}</span>
                      </span>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span dir="ltr" className="text-[11px] text-[#888888]">
                          {cat.count}
                        </span>
                        <ArrowIcon
                          className={`w-3.5 h-3.5 text-[#E40521] transition-transform duration-300 ${
                            isSelected ? 'scale-115 opacity-100' : 'opacity-75'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LEFT SIDE (2/3 width = 8 of 12 cols): Category Image + Tiny Text + "More Products" Button */}
            <div dir={dir} className="lg:col-span-8">
              <div className="aspect-[16/10] w-full bg-[#FFFFFF] rounded-none overflow-hidden relative mb-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeCategory.slug}
                    src={activeCategory.image_url}
                    alt={isFa ? activeCategory.name_fa : activeCategory.name_en}
                    loading="lazy"
                    initial={{ opacity: 0.35, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.35 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>
              </div>

              {/* Tiny Text + "More Products" Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-xs text-[#555555] font-light">
                  {isFa ? activeCategory.desc_fa : activeCategory.desc_en}
                </p>

                <Link
                  href={`${productsBase}?category=${activeCategory.filterSlug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#111111] text-[#FFFFFF] hover:bg-[#333333] transition-colors text-xs font-semibold cursor-pointer shrink-0"
                >
                  <span>{t.categoryStrip.moreProductsBtn}</span>
                  <ArrowIcon className="w-3.5 h-3.5 text-[#E40521]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3 (FULL-SCREEN SLIDESHOW): ARCHITECTURAL SPACE (#professionals)
          - Full-Screen Room Photograph Slideshow ("نور در فضای معماری")
          - Manual Slideshow with Side & Header Arrows, Room Tabs & Slide Indicators
         ===================================================================== */}
      <section
        id="professionals"
        className="scroll-mt-20 relative w-full min-h-screen overflow-hidden bg-[#111111] flex flex-col justify-between py-20 lg:py-24"
      >
        {/* Full-Screen Room Photograph Slideshow with Cross-Fade */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentRoom.id}
            src={currentRoom.image_url}
            alt={isFa ? currentRoom.name_fa : currentRoom.name_en}
            loading="lazy"
            initial={{ opacity: 0.25, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.25, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>

        {/* Atmospheric Gradient Scrim over Full-Screen Room Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/50 pointer-events-none" />

        {/* Side Floating Prev & Next Arrows (Desktop) */}
        <button
          type="button"
          onClick={handlePrevRoom}
          aria-label={isFa ? 'اسلاید قبلی' : 'Previous slide'}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 start-4 lg:start-8 z-20 w-11 h-11 items-center justify-center rounded-none bg-black/40 hover:bg-[#E40521] text-white border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
        >
          <PrevChevron className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={handleNextRoom}
          aria-label={isFa ? 'اسلاید بعدی' : 'Next slide'}
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 end-4 lg:end-8 z-20 w-11 h-11 items-center justify-center rounded-none bg-black/40 hover:bg-[#E40521] text-white border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
        >
          <NextChevron className="w-5 h-5" />
        </button>

        {/* Top Bar inside Full-Screen Section: Section Title + Transparent Room Switcher Tabs + Arrows */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight">
              {t.roomsSection.title}
            </h3>
            <span dir="ltr" className="text-[11px] font-mono text-white/60 px-2 py-0.5 border border-white/20">
              0{currentRoomIndex + 1} / 0{FLOS_ROOMS.length}
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 border-b border-white/20 pb-2">
              {FLOS_ROOMS.map((room, idx) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoomId(room.id)}
                  className={`pb-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer relative ${
                    activeRoomId === room.id
                      ? 'text-[#FFFFFF] after:content-[""] after:absolute after:bottom-[-9px] after:inset-x-0 after:h-[2px] after:bg-[#E40521]'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  <span className="opacity-45 text-[10px] me-1 font-mono">0{idx + 1}</span>
                  {isFa ? room.name_fa : room.name_en}
                </button>
              ))}
            </div>

            {/* Prev / Next Header Buttons */}
            <div className="flex items-center gap-1.5 shrink-0 pb-2">
              <button
                type="button"
                onClick={handlePrevRoom}
                aria-label={isFa ? 'اسلاید قبلی' : 'Previous slide'}
                className="w-8 h-8 flex items-center justify-center rounded-none border border-white/25 bg-black/30 backdrop-blur-xs text-white hover:bg-[#E40521] hover:border-[#E40521] transition-all cursor-pointer"
              >
                <PrevChevron className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextRoom}
                aria-label={isFa ? 'اسلاید بعدی' : 'Next slide'}
                className="w-8 h-8 flex items-center justify-center rounded-none border border-white/25 bg-black/30 backdrop-blur-xs text-white hover:bg-[#E40521] hover:border-[#E40521] transition-all cursor-pointer"
              >
                <NextChevron className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Content inside Full-Screen Section: Concise Room Caption + Transparent Featured Luminaires */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 mt-12 lg:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            {/* Concise Room Narrative (7 cols) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRoom.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45 }}
                >
                  <h4 className="text-xl sm:text-3xl font-bold text-[#FFFFFF] mb-2 leading-snug">
                    {isFa ? currentRoom.caption_fa : currentRoom.caption_en}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#FFFFFF]/80 font-light max-w-xl">
                    {isFa ? currentRoom.description_fa : currentRoom.description_en}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicator Bars */}
              <div className="flex items-center gap-2 mt-6">
                {FLOS_ROOMS.map((room, idx) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setActiveRoomId(room.id)}
                    aria-label={isFa ? room.name_fa : room.name_en}
                    className={`h-1.5 transition-all duration-300 rounded-none cursor-pointer ${
                      activeRoomId === room.id
                        ? 'w-10 bg-[#E40521]'
                        : 'w-4 bg-white/35 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Featured Luminaires in this Space (5 cols — Transparent Glass over Image) */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-5 rounded-none border border-white/20 text-[#FFFFFF]">
              <div className="text-[11px] font-bold text-white/75 mb-3 pb-2 border-b border-white/15 flex items-center justify-between">
                <span>{t.roomsSection.featuredInRoom}</span>
                <span dir="ltr" className="text-[10px] text-white/50 font-mono">
                  {roomProducts.length} {isFa ? 'چراغ' : 'Luminaires'}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRoom.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="divide-y divide-white/15"
                >
                  {roomProducts.map((prod) => (
                    <Link
                      key={prod.slug}
                      href={`${productsBase}/${prod.slug}`}
                      className="flex items-center gap-3.5 py-3 first:pt-0 last:pb-0 bg-transparent hover:opacity-85 transition-opacity cursor-pointer"
                    >
                      <img
                        src={prod.media.hero_image_url}
                        alt={isFa ? prod.identity.name_fa : prod.identity.name_en}
                        loading="lazy"
                        className="w-12 h-12 object-cover rounded-none border border-white/20 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span dir="ltr" className="text-[11px] text-white/70">
                            {prod.sku}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-white/85">
                            <span>{t.roomsSection.inspectProduct}</span>
                            <ArrowIcon className="w-3.5 h-3.5 text-[#E40521]" />
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-[#FFFFFF] truncate">
                          {isFa ? prod.identity.name_fa : prod.identity.name_en}
                        </div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4 (PURE WHITE #FFFFFF): PROJECTS (#projects)
          - Minimalist Editorial Project Columns with Very Short Text on Pure White
          - Hovering over a project turns its title red (#E40521)
         ===================================================================== */}
      <section
        id="projects"
        className="scroll-mt-20 py-20 lg:py-28 bg-[#FFFFFF]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111111] tracking-tight">
              {t.projectsSection.title}
            </h2>
            <Link
              href={isFa ? '/projects' : '/en/projects'}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-[#E40521] transition-colors cursor-pointer"
            >
              <span>{isFa ? 'مشاهده همه پروژه‌ها' : 'View All Projects'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {data.projects.map((project) => (
              <Link
                key={project.slug}
                href={isFa ? `/projects/${project.slug}` : `/en/projects/${project.slug}`}
                className="flex flex-col justify-between group bg-transparent cursor-pointer"
              >
                <div>
                  <div className="aspect-[16/11] bg-[#F5F4F0] rounded-none overflow-hidden relative mb-4">
                    <img
                      src={project.image_url}
                      alt={isFa ? project.title_fa : project.title_en}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span
                      dir="ltr"
                      className="absolute top-3 start-3 bg-black/50 backdrop-blur-xs text-[#FFFFFF] text-[11px] font-medium px-2.5 py-0.5 rounded-none border border-white/20"
                    >
                      {project.code}
                    </span>
                    <div className="absolute bottom-3 end-3 w-8 h-8 rounded-none bg-white/90 text-[#111111] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-md">
                      <ArrowIcon className="w-3.5 h-3.5 text-[#E40521]" />
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-[#666666] mb-1">
                      {isFa ? project.location_fa : project.location_en} •{' '}
                      {isFa ? project.architect_fa : project.architect_en}
                    </div>
                    <h3 className="text-base font-bold text-[#111111] group-hover:text-[#E40521] transition-colors mb-1.5">
                      {isFa ? project.title_fa : project.title_en}
                    </h3>
                    <p className="text-xs text-[#555555] font-light mb-3 text-justify">
                      {isFa ? project.summary_fa : project.summary_en}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E5E5] flex items-center justify-between gap-2" dir="ltr">
                  <div className="flex flex-wrap gap-2">
                    {project.luminaires_used.map((sku) => (
                      <span
                        key={sku}
                        className="text-[11px] font-medium text-[#111111]"
                      >
                        {sku}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] text-[#666666]">
                    {project.metrics_json.area_sqm}m²
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5 (FULL-SCREEN IMAGE): OPEN CATALOGUE MAGAZINE ON TABLE + PDF (#catalogue)
          - Full-Screen Photograph of Open Catalogue Magazine on Table
          - Catalogue Description + Direct PDF Download & Online PDF Viewer
         ===================================================================== */}
      <section
        id="catalogue"
        className="scroll-mt-20 relative w-full min-h-screen overflow-hidden bg-[#111111] flex items-end py-20 lg:py-24"
      >
        <img
          src="/images/baldr-catalogue-spread.webp"
          alt={t.catalogueSection.title}
          loading="lazy"
          className="w-full h-full object-cover absolute inset-0"
        />
        {/* Subtle bottom gradient so the open magazine on the table stays clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="max-w-2xl text-[#FFFFFF]">
            <div className="text-xs font-medium text-[#FFFFFF]/80 mb-2">
              {t.catalogueSection.specs}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#FFFFFF] mb-3 leading-snug">
              {t.catalogueSection.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#FFFFFF]/85 leading-relaxed text-justify mb-7 font-light">
              {t.catalogueSection.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {/* Direct PDF File Download */}
              <a
                href={t.catalogueSection.pdfUrl}
                download="Baldr-2026-Catalogue.pdf"
                onClick={() =>
                  triggerToast(
                    isFa
                      ? 'فایل PDF کاتالوگ ۲۰۲۶ بالدر در حال دریافت است.'
                      : 'Downloading Baldr 2026 Catalogue PDF...'
                  )
                }
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-none bg-white/15 backdrop-blur-sm text-[#FFFFFF] hover:bg-white/25 border border-white/35 transition-colors text-xs sm:text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>{t.catalogueSection.downloadPdfBtn}</span>
              </a>

              {/* Direct Online PDF Viewer */}
              <a
                href={t.catalogueSection.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-none bg-transparent text-[#FFFFFF] border border-white/30 hover:border-[#FFFFFF] transition-colors text-xs sm:text-sm font-semibold"
              >
                <span>{t.catalogueSection.viewPdfBtn}</span>
                <ArrowIcon className="w-4 h-4 text-[#E40521]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6 (PURE WHITE #FFFFFF): JOURNAL / CULTURE OF LIGHT
          - Unboxed 3-Column Editorial Articles with Minimal Text on Pure White
         ===================================================================== */}
      <section className="py-20 lg:py-28 bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111111] tracking-tight mb-10">
            {t.aboutSection.cultureTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.news.map((item) => {
              const href =
                item.slug.includes('catalogue') || item.slug.includes('collection')
                  ? isFa
                    ? '/products'
                    : '/en/products'
                  : item.slug.includes('philosophy') || item.slug.includes('invisible-light')
                  ? isFa
                    ? '/about'
                    : '/en/about'
                  : item.slug.includes('dali') || item.slug.includes('casambi') || item.slug.includes('smart')
                  ? isFa
                    ? '/professionals'
                    : '/en/professionals'
                  : isFa
                  ? '/about'
                  : '/en/about';

              return (
                <Link
                  key={item.slug}
                  href={href}
                  className="group flex flex-col justify-between bg-transparent cursor-pointer"
                >
                  <div>
                    <div className="aspect-[16/10] bg-[#FFFFFF] rounded-none overflow-hidden mb-3.5 relative">
                      <img
                        src={item.image_url}
                        alt={isFa ? item.title_fa : item.title_en}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#666666] mb-1">
                      <span>{isFa ? item.category_fa : item.category_en}</span>
                      <span>•</span>
                      <span>{isFa ? item.date_fa : item.date_en}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-[#111111] group-hover:text-[#E40521] transition-colors mb-1.5">
                      {isFa ? item.title_fa : item.title_en}
                    </h4>
                    <p className="text-xs text-[#555555] font-light">
                      {isFa ? item.excerpt_fa : item.excerpt_en}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-semibold text-[#111111] group-hover:text-[#E40521] transition-colors">
                    <span>{isFa ? 'مطالعه و بررسی' : 'Explore & Read'}</span>
                    <ArrowIcon className="w-3.5 h-3.5 text-[#E40521]" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7 (FINAL HOMEPAGE SECTION — FULL-SCREEN IMAGE):
          ABOUT US + CONTACT INFO (RIGHT) & SHOWROOM RESERVATION REQUEST (LEFT)
          (#about / #contact / #showroom)
         ===================================================================== */}
      <section
        id="about"
        className="scroll-mt-20 relative w-full min-h-screen overflow-hidden bg-[#111111] flex items-center py-20 lg:py-28"
      >
        <img
          src="/images/baldr-wide-systems.webp"
          alt={t.aboutSection.title}
          loading="lazy"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/65 pointer-events-none" />

        <div
          id="contact"
          className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14"
        >
          {/* Force RTL grid placement on desktop so Right column is always About + Contact Info and Left column is always Showroom Reservation Form */}
          <div
            id="showroom"
            dir="rtl"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            {/* RIGHT COLUMN (سمت راست — 5 cols):
                1. درباره ما + یک تکست خلاصه (About Us + Short Summary)
                2. اطلاعات تماس با ما (شماره تلفن - ایمیل - آدرس) */}
            <div dir={dir} className="lg:col-span-5 text-[#FFFFFF] space-y-8">
              {/* 1. About Us + Short Summary */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] mb-3">
                  {t.aboutSection.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#FFFFFF]/85 leading-relaxed text-justify font-light">
                  {t.aboutSection.description}
                </p>
              </div>

              {/* 2. Contact Information (Phone - Email - Address) */}
              <div className="pt-6 border-t border-white/25 space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] mb-2">
                  {t.contactSection.title}
                </h3>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#FFFFFF] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] text-[#FFFFFF]/75 mb-0.5">
                      {t.contactSection.phoneTitle}
                    </div>
                    <div dir="ltr" className="text-xs sm:text-sm font-bold text-[#FFFFFF] flex items-center gap-2">
                      <a
                        href="tel:+982126204800"
                        className="hover:text-[#E40521] hover:underline transition-colors"
                      >
                        +98 (21) 2620 4800
                      </a>
                      <span>•</span>
                      <a
                        href="tel:+982126204801"
                        className="hover:text-[#E40521] hover:underline transition-colors"
                      >
                        +98 (21) 2620 4801
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 pt-3 border-t border-white/15">
                  <Mail className="w-4 h-4 text-[#FFFFFF] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] text-[#FFFFFF]/75 mb-0.5">
                      {t.contactSection.emailTitle}
                    </div>
                    <div dir="ltr" className="text-xs sm:text-sm font-bold text-[#FFFFFF] flex items-center gap-2">
                      <a
                        href="mailto:info@baldr.ir"
                        className="hover:text-[#E40521] hover:underline transition-colors"
                      >
                        info@baldr.ir
                      </a>
                      <span>•</span>
                      <a
                        href="mailto:projects@baldr.ir"
                        className="hover:text-[#E40521] hover:underline transition-colors"
                      >
                        projects@baldr.ir
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 pt-3 border-t border-white/15">
                  <MapPin className="w-4 h-4 text-[#FFFFFF] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] text-[#FFFFFF]/75 mb-0.5">
                      {t.contactSection.addressTitle}
                    </div>
                    <a
                      href="https://maps.google.com/?q=Tehran+Elahiyeh+Fereshteh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#FFFFFF]/90 hover:text-[#E40521] hover:underline leading-relaxed text-justify font-light block transition-colors"
                    >
                      {t.contactSection.addressText}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* LEFT COLUMN (سمت چپ — 7 cols):
                ارسال درخواست برای رزرو شوروم (Showroom Reservation Request Form) */}
            <div dir={dir} className="lg:col-span-7">
              <form
                onSubmit={handleConsultationSubmit}
                className="bg-white/10 backdrop-blur-md rounded-none border border-white/20 p-6 sm:p-10 text-[#FFFFFF]"
              >
                <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] mb-6 pb-4 border-b border-white/20">
                  {t.contactSection.formTitle}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-white/85 mb-2">
                      {t.contactSection.formName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.full_name}
                      onChange={(e) => setFormState({ ...formState, full_name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-none bg-transparent border-b border-white/35 focus:border-[#FFFFFF] outline-none text-xs sm:text-sm text-[#FFFFFF] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/85 mb-2">
                      {t.contactSection.formStudio}
                    </label>
                    <input
                      type="text"
                      value={formState.company_or_studio}
                      onChange={(e) =>
                        setFormState({ ...formState, company_or_studio: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-none bg-transparent border-b border-white/35 focus:border-[#FFFFFF] outline-none text-xs sm:text-sm text-[#FFFFFF] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-white/85 mb-2">
                      {t.contactSection.formContact} *
                    </label>
                    <input
                      type="text"
                      required
                      dir="ltr"
                      value={formState.phone_or_email}
                      onChange={(e) =>
                        setFormState({ ...formState, phone_or_email: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-none bg-transparent border-b border-white/35 focus:border-[#FFFFFF] outline-none text-xs sm:text-sm text-[#FFFFFF] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/85 mb-2">
                      {t.contactSection.formProjectType}
                    </label>
                    <select
                      value={formState.project_type}
                      onChange={(e) =>
                        setFormState({ ...formState, project_type: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-none bg-transparent border-b border-white/35 focus:border-[#FFFFFF] outline-none text-xs sm:text-sm text-[#FFFFFF] [&>option]:text-[#111111] transition-colors"
                    >
                      <option value="Showroom Appointment">
                        {isFa ? 'رزرو وقت بازدید از شوروم فرشته' : 'Book Showroom Appointment'}
                      </option>
                      <option value="Residential / Penthouse">
                        {isFa ? 'مشاوره پروژه مسکونی و پنت‌هاوس' : 'Luxury Residential & Penthouse'}
                      </option>
                      <option value="Private Villa">
                        {isFa ? 'مشاوره پروژه ویلایی و محوطه' : 'Private Villa & Landscape'}
                      </option>
                      <option value="Gallery & Cultural">
                        {isFa ? 'مشاوره گالری هنری و تجاری' : 'Art Gallery & Hospitality'}
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs font-medium text-white/85 mb-2">
                    {t.contactSection.formMessage}
                  </label>
                  <textarea
                    rows={2}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-none bg-transparent border-b border-white/35 focus:border-[#FFFFFF] outline-none text-xs sm:text-sm text-[#FFFFFF] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-3.5 px-6 rounded-none bg-white/15 backdrop-blur-sm text-[#FFFFFF] hover:bg-white/25 border border-white/35 transition-colors text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {formStatus === 'submitting'
                      ? t.contactSection.formSubmitting
                      : t.contactSection.formSubmit}
                  </span>
                  <ArrowIcon className="w-4 h-4 text-[#E40521]" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8 (PURE WHITE #FFFFFF): MINIMALIST ARCHITECTURAL FOOTER
          - Brief About, Navigation Links, Collection Links, Address, Phone & Email
         ===================================================================== */}
      <footer className="bg-[#FFFFFF] border-t border-[#E5E5E5] pt-16 pb-10 px-4 sm:px-8 lg:px-14 text-xs text-[#555555]">
        <div className="max-w-[1440px] mx-auto">
          {/* Top 4-Column Minimalist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E5E5E5]">
            {/* Col 1: Brand & Brief About (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <Link
                href={homeHref}
                onClick={(e) => handleNavClick(e, '#home')}
                className="inline-flex flex-col leading-none cursor-pointer"
              >
                <img
                  src="/images/baldr-logo-red.webp"
                  alt="Baldr Lighting"
                  className="h-7 w-auto object-contain self-start"
                />
                <span className="text-[11px] text-[#555555] mt-2 font-medium">
                  {t.brandSubtitle}
                </span>
              </Link>
              <p className="text-xs text-[#444444] leading-[1.9] text-justify max-w-sm">
                {t.footer.aboutText}
              </p>
            </div>

            {/* Col 2: Quick Navigation Links (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold text-[#111111] mb-4">
                {t.footer.quickLinksTitle}
              </h4>
              <ul className="space-y-2.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-xs text-[#444444] hover:text-[#E40521] transition-colors inline-block cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Collections & Services Links (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold text-[#111111] mb-4">
                {t.footer.resourcesTitle}
              </h4>
              <ul className="space-y-2.5">
                {t.footer.resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-xs text-[#444444] hover:text-[#E40521] transition-colors inline-block cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact Info — Address, Phone, Email (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold text-[#111111] mb-4">
                {t.footer.contactTitle}
              </h4>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                  <a
                    href="https://maps.google.com/?q=Tehran+Elahiyeh+Fereshteh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#444444] hover:text-[#E40521] leading-relaxed text-justify transition-colors"
                  >
                    {t.footer.addressValue}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#111111] shrink-0" />
                  <a
                    href="tel:+982126204800"
                    dir="ltr"
                    className="text-xs font-semibold text-[#111111] hover:text-[#E40521] transition-colors"
                  >
                    {t.footer.phoneValue}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#111111] shrink-0" />
                  <a
                    href="mailto:info@baldr.ir"
                    dir="ltr"
                    className="text-xs font-semibold text-[#111111] hover:text-[#E40521] transition-colors"
                  >
                    {t.footer.emailValue}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Minimal Language Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>{t.footer.copyright}</span>
            <div className="flex items-center gap-2" dir="ltr">
              <Link
                href="/"
                className={`px-3 py-1 rounded-none border text-xs font-bold transition-colors cursor-pointer ${
                  isFa
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                    : 'bg-transparent text-[#111111] border-[#E5E5E5]'
                }`}
              >
                Fa
              </Link>
              <Link
                href="/en"
                className={`px-3 py-1 rounded-none border text-xs font-bold transition-colors cursor-pointer ${
                  !isFa
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                    : 'bg-transparent text-[#111111] border-[#E5E5E5]'
                }`}
              >
                En
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          PRODUCT TECHNICAL DATASHEET MODAL (Pure White #FFFFFF + Sharp Corners)
         ===================================================================== */}
      <AnimatePresence>
        {activeProductModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProductModal(null)}
            className="fixed inset-0 z-50 bg-[#111111]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FFFFFF] rounded-none border border-[#E5E5E5] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Top Bar */}
              <div className="sticky top-0 z-10 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E5E5] px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    dir="ltr"
                    className="text-xs font-bold px-3 py-1 rounded-none bg-transparent text-[#111111] border border-[#E5E5E5]"
                  >
                    {activeProductModal.sku}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#111111]">
                    {isFa
                      ? activeProductModal.identity.name_fa
                      : activeProductModal.identity.name_en}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveProductModal(null)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-none bg-transparent hover:bg-[#111111] hover:text-[#FFFFFF] text-xs font-semibold border border-[#E5E5E5] transition-colors cursor-pointer"
                >
                  <span>{t.modal.close}</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#FFFFFF]">
                {/* Left Visual & Engineering Blueprint Column (5 cols) */}
                <div className="lg:col-span-5 p-6 bg-[#FFFFFF] border-b lg:border-b-0 lg:border-e border-[#E5E5E5] space-y-6">
                  <div className="aspect-[4/5] bg-[#FFFFFF] rounded-none overflow-hidden">
                    <img
                      src={activeProductModal.media.hero_image_url}
                      alt={
                        isFa
                          ? activeProductModal.identity.name_fa
                          : activeProductModal.identity.name_en
                      }
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Millimeter SVG Blueprint */}
                  <div className="bg-transparent pt-4 border-t border-[#E5E5E5]">
                    <div className="text-xs font-bold text-[#111111] mb-2">
                      {t.modal.blueprintTitle}
                    </div>
                    <img
                      src={activeProductModal.media.dimension_diagram_url}
                      alt="Engineering Blueprint"
                      className="w-full h-auto rounded-none"
                    />
                    <div
                      dir="ltr"
                      className="mt-2 text-[11px] font-semibold text-[#555555] flex justify-between"
                    >
                      <span>
                        L: {activeProductModal.physical_specs.dimensions.length_mm}mm × W:{' '}
                        {activeProductModal.physical_specs.dimensions.width_mm}mm × H:{' '}
                        {activeProductModal.physical_specs.dimensions.height_mm}mm
                      </span>
                      <span>{activeProductModal.physical_specs.weight_kg} kg</span>
                    </div>
                  </div>
                </div>

                {/* Right Specifications & B2B Downloads Column (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-[#FFFFFF]">
                  <div>
                    <p className="text-xs sm:text-sm text-[#444444] leading-relaxed text-justify mb-6">
                      {isFa
                        ? activeProductModal.identity.long_description_fa
                        : activeProductModal.identity.long_description_en}
                    </p>

                    {/* Spec Tabs (Minimalist Red Underline) */}
                    <div className="flex gap-6 mb-6 border-b border-[#E5E5E5]">
                      <button
                        onClick={() => setModalTab('identity')}
                        className={`pb-3 text-xs font-bold transition-colors cursor-pointer relative ${
                          modalTab === 'identity'
                            ? 'text-[#111111] after:content-[""] after:absolute after:bottom-[-1px] after:inset-x-0 after:h-[2px] after:bg-[#E40521]'
                            : 'text-[#666666] hover:text-[#111111]'
                        }`}
                      >
                        {t.modal.identityTab}
                      </button>
                      <button
                        onClick={() => setModalTab('electrical')}
                        className={`pb-3 text-xs font-bold transition-colors cursor-pointer relative ${
                          modalTab === 'electrical'
                            ? 'text-[#111111] after:content-[""] after:absolute after:bottom-[-1px] after:inset-x-0 after:h-[2px] after:bg-[#E40521]'
                            : 'text-[#666666] hover:text-[#111111]'
                        }`}
                      >
                        {t.modal.electricalTab}
                      </button>
                    </div>

                    {modalTab === 'identity' ? (
                      <div className="divide-y divide-[#E5E5E5] text-xs">
                        <div className="flex justify-between py-3">
                          <span className="text-[#555555]">{isFa ? 'طراح:' : 'Designer:'}</span>
                          <span className="font-bold text-[#111111]">
                            {isFa
                              ? activeProductModal.identity.designer_fa
                              : activeProductModal.identity.designer_en}
                          </span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="text-[#555555]">{isFa ? 'متریال بدنه:' : 'Materials:'}</span>
                          <span className="font-bold text-[#111111]">
                            {(isFa
                              ? activeProductModal.physical_specs.materials_fa
                              : activeProductModal.physical_specs.materials_en
                            ).join('، ')}
                          </span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="text-[#555555]">{isFa ? 'فینیش و رنگ:' : 'Finish:'}</span>
                          <span className="font-bold text-[#111111]">
                            {isFa
                              ? activeProductModal.physical_specs.finish_color_fa
                              : activeProductModal.physical_specs.finish_color_en}
                          </span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="text-[#555555]">{isFa ? 'نوع نصب:' : 'Mounting:'}</span>
                          <span className="font-bold text-[#111111]">
                            {isFa
                              ? activeProductModal.physical_specs.mounting_type_fa
                              : activeProductModal.physical_specs.mounting_type_en}
                          </span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="text-[#555555]">
                            {isFa ? 'درجه حفاظت و عایق:' : 'Compliance:'}
                          </span>
                          <span dir="ltr" className="font-bold text-[#111111]">
                            {activeProductModal.compliance.ip_rating} •{' '}
                            {activeProductModal.compliance.insulation_class_en} •{' '}
                            {activeProductModal.compliance.energy_class}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="divide-y divide-[#E5E5E5] text-xs">
                        <div className="flex justify-between py-3">
                          <span className="text-[#555555]">{isFa ? 'منبع نوری:' : 'Light Source:'}</span>
                          <span className="font-bold text-[#111111]">
                            {isFa
                              ? activeProductModal.electrical_and_lighting.light_source_fa
                              : activeProductModal.electrical_and_lighting.light_source_en}
                          </span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="text-[#555555]">
                            {isFa ? 'توان و شار نوری:' : 'Power & Flux:'}
                          </span>
                          <span dir="ltr" className="font-bold text-[#111111]">
                            {activeProductModal.electrical_and_lighting.wattage_w}W •{' '}
                            {activeProductModal.electrical_and_lighting.luminous_flux_lm} lm
                          </span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="text-[#555555]">
                            {isFa ? 'دمای رنگ و CRI:' : 'CCT & CRI:'}
                          </span>
                          <span dir="ltr" className="font-bold text-[#111111]">
                            {activeProductModal.electrical_and_lighting.color_temperature_cct_en} • CRI{' '}
                            {activeProductModal.electrical_and_lighting.color_rendering_index_cri}
                          </span>
                        </div>
                        <div className="flex justify-between py-3">
                          <span className="text-[#555555]">
                            {isFa ? 'سیستم دیم و کنترل:' : 'Dimmability:'}
                          </span>
                          <span className="font-bold text-[#111111]">
                            {isFa
                              ? activeProductModal.electrical_and_lighting.dimmability_fa
                              : activeProductModal.electrical_and_lighting.dimmability_en}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* B2B Architect Downloads Box (Minimalist Transparent Buttons) */}
                  <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
                    <div className="text-xs font-bold text-[#111111] mb-3">
                      {t.modal.downloadsTitle}
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        {
                          label: t.modal.datasheetBtn,
                          file: activeProductModal.professional_downloads.data_sheet_pdf,
                        },
                        {
                          label: t.modal.manualBtn,
                          file: activeProductModal.professional_downloads.installation_manual_pdf_fa,
                        },
                        {
                          label: t.modal.iesBtn,
                          file: activeProductModal.professional_downloads.photometric_ies_file,
                        },
                        {
                          label: t.modal.cadBtn,
                          file: activeProductModal.professional_downloads.cad_3d_file,
                        },
                      ].map((d) => (
                        <button
                          key={d.label}
                          onClick={() =>
                            triggerToast(
                              isFa
                                ? `در حال دانلود ${d.label} (${activeProductModal.sku})`
                                : `Downloading ${d.label} (${activeProductModal.sku})`
                            )
                          }
                          className="flex items-center justify-between px-4 py-3 rounded-none bg-transparent hover:bg-[#111111] hover:text-[#FFFFFF] text-[#111111] border border-[#E5E5E5] text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <span>{d.label}</span>
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

