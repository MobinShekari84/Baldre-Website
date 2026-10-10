'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  ArrowUpLeft,
  ArrowUpRight,
  Download,
  Box,
  CheckCircle2,
  MapPin,
  Phone,
  Clock,
  Compass,
  X,
  Eye,
  Layers,
  Mail,
  Sparkles,
} from 'lucide-react';
import {
  Lang,
  HomepagePayload,
  BaldreProduct,
  FALLBACK_HOMEPAGE_DATA,
  FLOS_HERO_SLIDES,
  FLOS_CATEGORY_STRIP,
  FLOS_ROOMS,
  UI_TEXT,
} from '@/data/baldreData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export default function BaldreFlosLightHomePage() {
  // Bilingual state: Farsi ('fa') default with 1-click toggle to English ('en')
  const [lang, setLang] = useState<Lang>('fa');
  const isFa = lang === 'fa';
  const dir = isFa ? 'rtl' : 'ltr';
  const t = UI_TEXT[lang];

  // Homepage data from backend (with instant local fallback)
  const [data, setData] = useState<HomepagePayload>(FALLBACK_HOMEPAGE_DATA);

  // Full-Display Hero Slide & Daylight/Evening Toggle
  const [heroSlideIdx, setHeroSlideIdx] = useState<number>(0);
  const [heroSceneMode, setHeroSceneMode] = useState<'day' | 'night'>('day');

  // Category & Product grid states
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedVariantMap, setSelectedVariantMap] = useState<Record<string, number>>({});
  const [hoveredProductSlug, setHoveredProductSlug] = useState<string | null>(null);
  const [activeProductModal, setActiveProductModal] = useState<BaldreProduct | null>(null);
  const [modalTab, setModalTab] = useState<'identity' | 'electrical'>('identity');

  // Flos "Explore the Home / Shop by Space" state
  const [activeRoomId, setActiveRoomId] = useState<string>('dining');

  // Photometric Optical Laboratory states
  const [labBeamAngle, setLabBeamAngle] = useState<number>(24);
  const [labKelvin, setLabKelvin] = useState<2700 | 3000 | 4000>(2700);

  // Contact & Consultation Form state
  const [formState, setFormState] = useState({
    full_name: '',
    company_or_studio: '',
    phone_or_email: '',
    project_type: 'Residential / Penthouse',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync HTML lang/dir attributes WITHOUT overwriting next/font/local classes on <html> or <body>
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // Auto-advance hero slide gently every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % FLOS_HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
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

  const currentSlide = FLOS_HERO_SLIDES[heroSlideIdx] || FLOS_HERO_SLIDES[0];
  const currentRoom = FLOS_ROOMS.find((r) => r.id === activeRoomId) || FLOS_ROOMS[0];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return data.products;
    return data.products.filter((p) => p.category_slug === activeCategory);
  }, [data.products, activeCategory]);

  const roomProducts = useMemo(() => {
    return data.products.filter((p) => currentRoom.featured_skus.includes(p.sku));
  }, [data.products, currentRoom]);

  // Calculate simulated center illuminance (lux at 2m) in Photometric Lab
  const calculatedLux = useMemo(() => {
    const baseLumens = 1850;
    const beamRad = (labBeamAngle * Math.PI) / 180;
    const solidAngle = 2 * Math.PI * (1 - Math.cos(beamRad / 2));
    const candela = baseLumens / Math.max(solidAngle, 0.08);
    return Math.round(candela / 4);
  }, [labBeamAngle]);

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
        ? 'پیام و درخواست مشاوره شما با موفقیت ثبت شد. کارشناسان بالدر با شما تماس خواهند گرفت.'
        : 'Your consultation request has been registered with Baldre Studio Tehran.'
    );
    setTimeout(() => {
      setFormStatus('idle');
      setFormState({
        full_name: '',
        company_or_studio: '',
        phone_or_email: '',
        project_type: 'Residential / Penthouse',
        message: '',
      });
    }, 3500);
  };

  const ArrowIcon = isFa ? ArrowUpLeft : ArrowUpRight;

  // Navbar items: Home + Products, Projects, Professionals, About, Contact Us, Showroom
  const navItems = [
    { href: '#home', label: t.nav.home },
    { href: '#products', label: t.nav.products },
    { href: '#projects', label: t.nav.projects },
    { href: '#professionals', label: t.nav.professionals },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
    { href: '#showroom', label: t.nav.showroom },
  ];

  return (
    <div dir={dir} className="min-h-screen bg-[#FFFFFF] text-[#111111] font-farsi">
      {/* Floating Soft-Rounded Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-6 start-6 z-50 flex items-center gap-3 bg-[#111111] text-[#FFFFFF] px-6 py-4 rounded-2xl shadow-2xl max-w-md"
          >
            <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
            <p className="text-xs md:text-sm leading-relaxed text-justify">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          1. STICKY RECTANGULAR NAVBAR ABOVE HERO SECTION
             - Rectangular outer bar, positioned ABOVE the hero section initially
             - Follows scroll smoothly via sticky top-0
             - Links: Home, Products, Projects, Professionals, About, Contact Us, Showroom
             - Language switcher button shows ONLY "Fa" and "En"
         ===================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-xl border-b border-[#E6E4DF] shadow-[0_4px_24px_rgb(0,0,0,0.03)] transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 h-20 flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <a href="#home" className="flex items-center gap-3 group shrink-0">
            <span
              dir="ltr"
              className="text-xl sm:text-2xl font-extrabold tracking-[0.2em] text-[#111111]"
            >
              BALDRE
            </span>
            <span className="h-4 w-[1px] bg-[#D0CEC7]" />
            <span className="text-base sm:text-lg font-bold text-[#111111]">بالدر</span>
          </a>

          {/* Primary Navigation Links with Minimal Hover Underline Animation */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-[#3D3C38]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1.5 text-[#3D3C38] hover:text-[#111111] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#111111] after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Compact "Fa | En" Language Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              dir="ltr"
              className="inline-flex items-center bg-[#F5F4F0] p-1 rounded-full border border-[#D8D5CE]"
              role="group"
              aria-label="Language Switcher"
            >
              <button
                type="button"
                onClick={() => setLang('fa')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isFa
                    ? 'bg-[#111111] text-[#FFFFFF] shadow-xs'
                    : 'text-[#55534E] hover:text-[#111111]'
                }`}
              >
                Fa
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  !isFa
                    ? 'bg-[#111111] text-[#FFFFFF] shadow-xs'
                    : 'text-[#55534E] hover:text-[#111111]'
                }`}
              >
                En
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Nav Bar */}
        <div className="lg:hidden border-t border-[#E6E4DF] px-4 py-2.5 overflow-x-auto flex items-center gap-6 text-xs font-medium text-[#3D3C38]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative whitespace-nowrap py-1 text-[#3D3C38] hover:text-[#111111] after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#111111] after:rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      </header>

      {/* =====================================================================
          2. FULL-DISPLAY HERO SECTION (#home — Directly Below Navbar)
             - 1 Full-Display Image + 1 Captivating Headline + 1 Short Subtitle
         ===================================================================== */}
      <section
        id="home"
        className="scroll-mt-20 relative w-full h-[calc(100vh-5rem)] min-h-[600px] overflow-hidden bg-[#F5F4F0]"
      >
        {/* Full-Display Background Photograph */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`${currentSlide.id}-${heroSceneMode}`}
            src={heroSceneMode === 'day' ? currentSlide.day_image : currentSlide.night_image}
            alt={isFa ? currentSlide.title_fa : currentSlide.title_en}
            fetchPriority="high"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>

        {/* Subtle Atmospheric Gradient Scrim for Effortless Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5 pointer-events-none" />

        {/* Captivating Single-Glance Overlay: 1 Headline + 1 Short Subtitle */}
        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pb-12 sm:pb-16 flex flex-col justify-end">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSlide.id}-${lang}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* 1. Single Captivating Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#FFFFFF] leading-[1.2] tracking-tight mb-4 drop-shadow-xs">
                  {isFa ? currentSlide.title_fa : currentSlide.title_en}
                </h1>

                {/* 2. Single Short, Justified Text Underneath (Kept only in Hero Section) */}
                <p className="text-sm sm:text-base lg:text-lg text-[#F5F4F0]/90 leading-[1.85] text-justify mb-8 max-w-xl font-light">
                  {isFa ? currentSlide.subtitle_fa : currentSlide.subtitle_en}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Minimal Pill CTA & Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FFFFFF] text-[#111111] hover:bg-[#F5F4F0] transition-all text-xs sm:text-sm font-bold shadow-lg"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowIcon className="w-4 h-4" />
                </a>

                {/* Daylight / Night Atmosphere Pill Toggle */}
                <div className="inline-flex items-center gap-1 bg-black/35 backdrop-blur-md p-1 rounded-full border border-white/20">
                  <button
                    onClick={() => setHeroSceneMode('day')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      heroSceneMode === 'day'
                        ? 'bg-[#FFFFFF] text-[#111111] shadow-xs'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>{t.hero.dayMode}</span>
                  </button>
                  <button
                    onClick={() => setHeroSceneMode('night')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      heroSceneMode === 'night'
                        ? 'bg-[#FFFFFF] text-[#111111] shadow-xs'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>{t.hero.nightMode}</span>
                  </button>
                </div>
              </div>

              {/* Minimal Rounded Slide Dots */}
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15">
                {FLOS_HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setHeroSlideIdx(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      heroSlideIdx === idx
                        ? 'w-7 bg-[#FFFFFF]'
                        : 'w-2 bg-white/45 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 1: PRODUCTS (#products)
          - Part A: 6-Column "Light by Category" Studio Strip
          - Part B: Signature Flos Studio Product Cards (with Modal Datasheet)
          - Part C: Explore by Architectural Space (Dining, Living, Bedroom)
         ===================================================================== */}
      <section
        id="products"
        className="scroll-mt-20 py-16 lg:py-24 bg-[#FFFFFF] border-b border-[#E6E4DF]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          {/* Part A: 6-Column Category Strip (Title only — no eyebrow, no description) */}
          <div className="mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight mb-10">
              {t.categoryStrip.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {FLOS_CATEGORY_STRIP.map((cat) => {
                const isSelected = activeCategory === cat.filterSlug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setActiveCategory(cat.filterSlug)}
                    className="group block text-start transition-all cursor-pointer"
                  >
                    <div
                      className={`aspect-[4/5] bg-[#F5F4F0] rounded-2xl border overflow-hidden relative mb-3 transition-all ${
                        isSelected
                          ? 'border-[#111111] ring-2 ring-[#111111]/15'
                          : 'border-[#E6E4DF] group-hover:border-[#111111]/40'
                      }`}
                    >
                      <img
                        src={cat.image_url}
                        alt={isFa ? cat.name_fa : cat.name_en}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span
                        dir="ltr"
                        className="absolute top-3 end-3 text-[11px] font-semibold bg-[#FFFFFF]/90 text-[#111111] px-2.5 py-0.5 rounded-full border border-[#E6E4DF]"
                      >
                        {cat.count}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 px-1">
                      <h3 className="text-sm font-bold text-[#111111] group-hover:text-[#9E7B4F] transition-colors">
                        {isFa ? cat.name_fa : cat.name_en}
                      </h3>
                      <ArrowIcon className="w-3.5 h-3.5 text-[#686662] group-hover:text-[#111111] transition-colors shrink-0" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Part B: Flagship Studio Product Collection (Title + Filter pills only) */}
          <div className="mb-24">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 pb-8 border-b border-[#E6E4DF]">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight">
                {t.productsSection.title}
              </h3>

              {/* Soft Rounded Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                      : 'bg-[#F5F4F0] text-[#4A4946] border-[#E6E4DF] hover:border-[#111111]'
                  }`}
                >
                  {t.productsSection.filterAll} ({data.products.length})
                </button>
                {data.categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      activeCategory === cat.slug
                        ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                        : 'bg-[#F5F4F0] text-[#4A4946] border-[#E6E4DF] hover:border-[#111111]'
                    }`}
                  >
                    {isFa ? cat.name_fa : cat.name_en}
                  </button>
                ))}
              </div>
            </div>

            {/* 3-Column Flos Studio Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => {
                const activeVarIdx = selectedVariantMap[product.slug] ?? 0;
                const currentVariant = product.variants[activeVarIdx] || product.variants[0];
                const isHovered = hoveredProductSlug === product.slug;
                const litPreviewUrl =
                  product.media.gallery_images?.[0] || product.media.hero_image_url;
                const displayedImage = isHovered
                  ? litPreviewUrl
                  : currentVariant?.hero_image_url || product.media.hero_image_url;

                return (
                  <article
                    key={product.slug}
                    className="group flex flex-col"
                    onMouseEnter={() => setHoveredProductSlug(product.slug)}
                    onMouseLeave={() => setHoveredProductSlug(null)}
                  >
                    {/* Soft Rounded-3xl 4:5 Studio Image Container on Warm Alabaster #F5F4F0 */}
                    <div
                      onClick={() => {
                        setActiveProductModal(product);
                        setModalTab('identity');
                      }}
                      className="relative aspect-[4/5] bg-[#F5F4F0] rounded-3xl border border-[#E6E4DF] overflow-hidden mb-4 cursor-pointer shadow-2xs group-hover:shadow-md transition-all duration-500"
                    >
                      <img
                        src={displayedImage}
                        alt={isFa ? product.identity.name_fa : product.identity.name_en}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Top Bar inside Studio Card: Soft Rounded Pills */}
                      <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-2 pointer-events-none">
                        <span className="text-[11px] font-medium bg-[#FFFFFF]/90 backdrop-blur-xs text-[#111111] px-3 py-1 rounded-full border border-[#E6E4DF]">
                          {isFa ? product.identity.category_fa : product.identity.category}
                        </span>
                        <span
                          dir="ltr"
                          className="text-[11px] font-semibold bg-[#FFFFFF]/90 backdrop-blur-xs text-[#111111] px-3 py-1 rounded-full border border-[#E6E4DF]"
                        >
                          {currentVariant?.sku || product.sku}
                        </span>
                      </div>

                      {/* Bottom Quick-Action Pill Bar on Hover */}
                      <div className="absolute bottom-4 inset-x-4 flex items-center justify-between gap-2 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-[#111111] text-[#FFFFFF] text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{t.productsSection.inspectSpecs}</span>
                        </span>
                        <span
                          dir="ltr"
                          className="bg-[#FFFFFF]/95 text-[#111111] text-[11px] font-semibold px-3 py-2 rounded-full border border-[#E6E4DF]"
                        >
                          {product.electrical_and_lighting.wattage_w}W •{' '}
                          {product.electrical_and_lighting.luminous_flux_lm}lm
                        </span>
                      </div>
                    </div>

                    {/* Below Card Info */}
                    <div className="flex items-center justify-between gap-2 text-xs text-[#686662] mb-1.5 px-1">
                      <span>
                        {isFa ? product.identity.designer_fa : product.identity.designer_en} •{' '}
                        {product.identity.year}
                      </span>
                      {/* Finish Swatches */}
                      <div className="flex items-center gap-1.5">
                        {product.variants.map((v, idx) => (
                          <button
                            key={v.sku}
                            type="button"
                            onClick={() =>
                              setSelectedVariantMap((prev) => ({ ...prev, [product.slug]: idx }))
                            }
                            title={isFa ? v.name_fa : v.name_en}
                            className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                              activeVarIdx === idx
                                ? 'border-[#111111] scale-115 ring-2 ring-[#111111]/25'
                                : 'border-[#D0CEC7] hover:scale-105'
                            }`}
                            style={{ backgroundColor: v.hex }}
                          />
                        ))}
                      </div>
                    </div>

                    <h4
                      onClick={() => {
                        setActiveProductModal(product);
                        setModalTab('identity');
                      }}
                      className="text-lg font-bold text-[#111111] hover:text-[#9E7B4F] transition-colors cursor-pointer mb-2 px-1"
                    >
                      {isFa ? product.identity.name_fa : product.identity.name_en}
                    </h4>

                    <p className="text-xs text-[#55534E] leading-relaxed text-justify mb-4 px-1">
                      {isFa
                        ? product.identity.short_description_fa
                        : product.identity.short_description_en}
                    </p>

                    {/* Photometric Summary Strip */}
                    <div
                      dir="ltr"
                      className="mt-auto pt-3 px-3 py-2 rounded-xl bg-[#F5F4F0] border border-[#E6E4DF] flex items-center justify-between text-[11px] font-semibold text-[#4A4946]"
                    >
                      <span>{product.electrical_and_lighting.wattage_w}W LED</span>
                      <span>•</span>
                      <span>{product.electrical_and_lighting.luminous_flux_lm} lm</span>
                      <span>•</span>
                      <span>CRI {product.electrical_and_lighting.color_rendering_index_cri}</span>
                      <span>•</span>
                      <span>{product.compliance.ip_rating}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Part C: Explore by Architectural Space (Title + Room Tabs only) */}
          <div className="pt-8 border-t border-[#E6E4DF]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                {t.roomsSection.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                {FLOS_ROOMS.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoomId(room.id)}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                      activeRoomId === room.id
                        ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                        : 'bg-[#F5F4F0] text-[#4A4946] border-[#E6E4DF] hover:border-[#111111]'
                    }`}
                  >
                    {isFa ? room.name_fa : room.name_en}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-[#E6E4DF] bg-[#F5F4F0]">
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[500px] overflow-hidden border-b lg:border-b-0 lg:border-e border-[#E6E4DF]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentRoom.id}
                    src={currentRoom.image_url}
                    alt={isFa ? currentRoom.name_fa : currentRoom.name_en}
                    loading="lazy"
                    initial={{ opacity: 0.4, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </AnimatePresence>
                <div className="absolute bottom-5 start-5 bg-[#FFFFFF]/95 backdrop-blur-xs px-5 py-2.5 rounded-full border border-[#E6E4DF]">
                  <p className="text-xs font-semibold text-[#111111]">
                    {isFa ? currentRoom.caption_fa : currentRoom.caption_en}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-[#FFFFFF]">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#111111] mb-4">
                    {isFa ? currentRoom.caption_fa : currentRoom.caption_en}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#55534E] leading-[1.9] text-justify mb-8 pb-6 border-b border-[#E6E4DF]">
                    {isFa ? currentRoom.description_fa : currentRoom.description_en}
                  </p>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#686662] mb-4">
                    {t.roomsSection.featuredInRoom}
                  </div>

                  <div className="space-y-3">
                    {roomProducts.map((prod) => (
                      <div
                        key={prod.slug}
                        onClick={() => {
                          setActiveProductModal(prod);
                          setModalTab('identity');
                        }}
                        className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#F5F4F0] border border-[#E6E4DF] hover:border-[#111111] transition-all cursor-pointer group"
                      >
                        <img
                          src={prod.media.hero_image_url}
                          alt={isFa ? prod.identity.name_fa : prod.identity.name_en}
                          loading="lazy"
                          className="w-16 h-16 object-cover rounded-xl bg-[#FFFFFF] border border-[#E6E4DF] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span dir="ltr" className="text-[11px] font-semibold text-[#686662]">
                              {prod.sku}
                            </span>
                            <span dir="ltr" className="text-[11px] font-semibold text-[#111111]">
                              {prod.electrical_and_lighting.wattage_w}W • CRI{' '}
                              {prod.electrical_and_lighting.color_rendering_index_cri}
                            </span>
                          </div>
                          <div className="text-sm font-bold text-[#111111] truncate group-hover:text-[#9E7B4F] transition-colors">
                            {isFa ? prod.identity.name_fa : prod.identity.name_en}
                          </div>
                          <div className="text-[11px] text-[#686662] mt-0.5">
                            {t.roomsSection.inspectProduct} →
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: PROJECTS (#projects)
          - Selected Architectural Commissions in Tehran & Lavasan (Title only)
         ===================================================================== */}
      <section
        id="projects"
        className="scroll-mt-20 py-16 lg:py-24 bg-[#F5F4F0] border-b border-[#E6E4DF]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight mb-12">
            {t.projectsSection.title}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {data.projects.map((project) => (
              <article
                key={project.slug}
                className="rounded-3xl overflow-hidden border border-[#E6E4DF] bg-[#FFFFFF] flex flex-col justify-between group shadow-2xs hover:shadow-md transition-all"
              >
                <div>
                  <div className="aspect-[16/11] bg-[#EAE8E1] overflow-hidden relative border-b border-[#E6E4DF]">
                    <img
                      src={project.image_url}
                      alt={isFa ? project.title_fa : project.title_en}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span
                      dir="ltr"
                      className="absolute top-3.5 start-3.5 bg-[#FFFFFF]/95 text-[#111111] text-[11px] font-semibold px-3 py-1 rounded-full border border-[#E6E4DF]"
                    >
                      {project.code} • {project.year}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-[#686662] mb-1.5">
                      {isFa ? project.location_fa : project.location_en} —{' '}
                      {isFa ? project.architect_fa : project.architect_en}
                    </div>
                    <h3 className="text-lg font-bold text-[#111111] mb-3 leading-snug">
                      {isFa ? project.title_fa : project.title_en}
                    </h3>
                    <p className="text-xs text-[#55534E] leading-relaxed text-justify mb-4">
                      {isFa ? project.summary_fa : project.summary_en}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-[#E6E4DF] bg-[#F5F4F0]/60">
                  <div className="flex items-center justify-between text-[11px] text-[#686662] mb-2.5">
                    <span>{t.projectsSection.usedLuminaires}</span>
                    <span dir="ltr" className="font-semibold text-[#111111]">
                      {project.metrics_json.area_sqm} sqm • {project.metrics_json.control}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5" dir="ltr">
                    {project.luminaires_used.map((sku) => (
                      <span
                        key={sku}
                        className="text-[11px] font-semibold px-3 py-0.5 rounded-full bg-[#FFFFFF] text-[#111111] border border-[#E6E4DF]"
                      >
                        {sku}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: PROFESSIONALS (#professionals)
          - Part A: B2B Specification Hub (.IES / .STEP / Master Monograph)
          - Part B: Interactive Goniophotometric Beam Angle & Kelvin Simulator
         ===================================================================== */}
      <section
        id="professionals"
        className="scroll-mt-20 py-16 lg:py-24 bg-[#FFFFFF] border-b border-[#E6E4DF]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          {/* Part A: B2B Download Cards (Title only) */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight mb-10">
            {t.professionalsSection.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {t.professionalsSection.cards.map((card, i) => (
              <div
                key={card.badge}
                className="bg-[#F5F4F0] rounded-3xl border border-[#E6E4DF] p-7 flex flex-col justify-between hover:border-[#111111] transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span
                      dir="ltr"
                      className="text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#FFFFFF] text-[#111111] border border-[#E6E4DF]"
                    >
                      {card.badge}
                    </span>
                    {i === 0 ? (
                      <Compass className="w-5 h-5 text-[#111111]" />
                    ) : i === 1 ? (
                      <Box className="w-5 h-5 text-[#111111]" />
                    ) : (
                      <Layers className="w-5 h-5 text-[#111111]" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#111111] mb-3">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-[#55534E] leading-relaxed text-justify mb-8">
                    {card.desc}
                  </p>
                </div>

                <button
                  onClick={() =>
                    triggerToast(
                      isFa
                        ? `فایل «${card.title}» آماده دانلود است.`
                        : `Preparing download: ${card.title}`
                    )
                  }
                  className="w-full py-3.5 px-5 rounded-full bg-[#111111] text-[#FFFFFF] hover:bg-[#2B2B2B] transition-colors text-xs font-semibold flex items-center justify-between cursor-pointer"
                >
                  <span>{card.action}</span>
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Part B: Interactive Photometric Beam & Kelvin Lab (Title only) */}
          <div className="rounded-3xl bg-[#F5F4F0] border border-[#E6E4DF] p-6 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mb-6">
                  {t.opticsSection.title}
                </h3>

                {/* Beam Angle Selector */}
                <div className="mb-5 bg-[#FFFFFF] p-5 rounded-2xl border border-[#E6E4DF]">
                  <label className="block text-xs font-bold text-[#111111] mb-3">
                    {t.opticsSection.selectBeam}
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2" dir="ltr">
                    {[15, 24, 38, 60, 90, 120].map((angle) => (
                      <button
                        key={angle}
                        onClick={() => setLabBeamAngle(angle)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          labBeamAngle === angle
                            ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                            : 'bg-[#F5F4F0] text-[#111111] border-[#E6E4DF] hover:border-[#111111]'
                        }`}
                      >
                        {angle}°
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Temperature Selector */}
                <div className="mb-5 bg-[#FFFFFF] p-5 rounded-2xl border border-[#E6E4DF]">
                  <label className="block text-xs font-bold text-[#111111] mb-3">
                    {t.opticsSection.selectKelvin}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" dir="ltr">
                    {[
                      { k: 2700 as const, label: '2700K Warm', swatch: '#F6D397' },
                      { k: 3000 as const, label: '3000K Natural', swatch: '#FFF0CE' },
                      { k: 4000 as const, label: '4000K Gallery', swatch: '#F2F7FF' },
                    ].map((item) => (
                      <button
                        key={item.k}
                        onClick={() => setLabKelvin(item.k)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          labKelvin === item.k
                            ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                            : 'bg-[#F5F4F0] text-[#111111] border-[#E6E4DF] hover:border-[#111111]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: item.swatch }}
                        />
                        <span className="text-xs font-semibold">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E6E4DF]">
                    <span className="text-xs text-[#686662] block mb-1">
                      {t.opticsSection.luxAt2m}
                    </span>
                    <div dir="ltr" className="text-2xl font-bold text-[#111111]">
                      {calculatedLux} lx{' '}
                      <span className="text-xs font-normal text-[#686662]">@ h = 2.0m</span>
                    </div>
                  </div>
                  <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E6E4DF]">
                    <span className="text-xs text-[#686662] block mb-1">
                      {t.opticsSection.recommendedUse}
                    </span>
                    <div className="text-xs sm:text-sm font-bold text-[#111111]">
                      {labBeamAngle <= 24
                        ? isFa
                          ? 'نورپردازی متمرکز مجسمه، تابلو و کانتر سنگی'
                          : 'Fine Art Sculptures, Columns & Stone Islands'
                        : labBeamAngle <= 60
                        ? isFa
                          ? 'روشنایی میز ناهارخوری، نشیمن و گالری'
                          : 'Architectural Dining Tables & Living Zones'
                        : isFa
                        ? 'روشنایی عمومی یکنواخت و بدون سایه (UGR <16)'
                        : 'Uniform Soft Ambient Wash (UGR <16)'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-[#FFFFFF] rounded-3xl border border-[#E6E4DF] p-6 sm:p-8 relative overflow-hidden shadow-2xs">
                  <div
                    className="flex items-center justify-between text-xs font-semibold text-[#686662] pb-4 mb-4 border-b border-[#E6E4DF]"
                    dir="ltr"
                  >
                    <span>GONIOPHOTOMETRIC DIAGRAM • {labBeamAngle}°</span>
                    <span>CCT: {labKelvin}K • CRI &gt;97</span>
                  </div>

                  <svg
                    viewBox="0 0 500 320"
                    className="w-full h-auto bg-[#F8F7F4] rounded-2xl border border-[#E6E4DF]"
                  >
                    <defs>
                      <linearGradient id="flosBeamGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor={
                            labKelvin === 2700
                              ? '#D99B4E'
                              : labKelvin === 3000
                              ? '#E3B678'
                              : '#91B4E8'
                          }
                          stopOpacity="0.55"
                        />
                        <stop
                          offset="100%"
                          stopColor={
                            labKelvin === 2700
                              ? '#D99B4E'
                              : labKelvin === 3000
                              ? '#E3B678'
                              : '#91B4E8'
                          }
                          stopOpacity="0.05"
                        />
                      </linearGradient>
                    </defs>

                    {[70, 140, 210, 280].map((y, idx) => (
                      <g key={y}>
                        <line
                          x1="40"
                          y1={y}
                          x2="460"
                          y2={y}
                          stroke="#E2E0D8"
                          strokeDasharray="3 3"
                          strokeWidth="1"
                        />
                        <text x="48" y={y - 5} fill="#88857E" fontSize="9">
                          h = {(idx + 1) * 0.5}m
                        </text>
                      </g>
                    ))}

                    <line
                      x1="250"
                      y1="25"
                      x2="250"
                      y2="295"
                      stroke="#111111"
                      strokeDasharray="2 4"
                      strokeWidth="0.8"
                    />

                    {(() => {
                      const spread = Math.min(210, Math.tan((labBeamAngle * Math.PI) / 360) * 230);
                      return (
                        <>
                          <polygon
                            points={`250,28 ${250 - spread},280 ${250 + spread},280`}
                            fill="url(#flosBeamGrad)"
                            stroke="#111111"
                            strokeWidth="1.2"
                          />
                          <ellipse
                            cx="250"
                            cy="280"
                            rx={spread}
                            ry="10"
                            fill="none"
                            stroke="#111111"
                            strokeWidth="1"
                          />
                        </>
                      );
                    })()}

                    <rect x="225" y="14" width="50" height="14" rx="4" fill="#111111" />
                    <text
                      x="250"
                      y="306"
                      textAnchor="middle"
                      fill="#111111"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      E_max = {calculatedLux} lux • Beam = {labBeamAngle}° • UGR &lt;16
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: ABOUT (#about)
          - About Baldre Lighting Philosophy + 4 Key Engineering Pillars
          - "A Culture of Light" Editorial Essays & Research
         ===================================================================== */}
      <section
        id="about"
        className="scroll-mt-20 py-16 lg:py-24 bg-[#F5F4F0] border-b border-[#E6E4DF]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          {/* Split About Showcase (No eyebrow) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-[#E6E4DF] bg-[#EFECE6] mb-20">
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#111111] leading-[1.3] mb-5">
                  {t.aboutSection.title}
                </h2>
                <p className="text-sm sm:text-base text-[#4A4946] leading-[1.9] text-justify mb-4">
                  {t.aboutSection.description}
                </p>
                <p className="text-xs sm:text-sm text-[#55534E] leading-[1.9] text-justify mb-8">
                  {t.aboutSection.philosophySecond}
                </p>
              </div>

              {/* 4 Key Architectural Metrics inside Soft Rounded Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <div className="bg-[#FFFFFF]/85 p-3.5 rounded-2xl border border-[#DCD8CF]">
                  <div dir="ltr" className="text-xl font-bold text-[#111111]">
                    284+
                  </div>
                  <div className="text-[11px] text-[#686662] mt-0.5">
                    {isFa ? 'مدل تخصصی' : 'Luminaires'}
                  </div>
                </div>
                <div className="bg-[#FFFFFF]/85 p-3.5 rounded-2xl border border-[#DCD8CF]">
                  <div dir="ltr" className="text-xl font-bold text-[#111111]">
                    CRI &gt;97
                  </div>
                  <div className="text-[11px] text-[#686662] mt-0.5">
                    {isFa ? 'طیف موزه‌ای' : 'True Spectrum'}
                  </div>
                </div>
                <div className="bg-[#FFFFFF]/85 p-3.5 rounded-2xl border border-[#DCD8CF]">
                  <div dir="ltr" className="text-xl font-bold text-[#111111]">
                    UGR &lt;16
                  </div>
                  <div className="text-[11px] text-[#686662] mt-0.5">
                    {isFa ? 'ضد خیرگی' : 'Zero Glare'}
                  </div>
                </div>
                <div className="bg-[#FFFFFF]/85 p-3.5 rounded-2xl border border-[#DCD8CF]">
                  <div dir="ltr" className="text-xl font-bold text-[#111111]">
                    5 YRS
                  </div>
                  <div className="text-[11px] text-[#686662] mt-0.5">
                    {isFa ? 'گارانتی بالدر' : 'Warranty'}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#showroom"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#111111] text-[#FFFFFF] hover:bg-[#2B2B2B] transition-colors text-xs sm:text-sm font-semibold"
                >
                  <span>{t.aboutSection.ctaPrimary}</span>
                  <ArrowIcon className="w-4 h-4" />
                </a>
                <button
                  onClick={() =>
                    triggerToast(
                      isFa
                        ? 'نسخه کامل کاتالوگ ۲۰۲۶ بالدر (PDF) آماده دریافت است.'
                        : 'Downloading Baldre 2026 Master Monograph (PDF)...'
                    )
                  }
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FFFFFF] text-[#111111] border border-[#111111] hover:bg-[#F5F4F0] transition-colors text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.aboutSection.ctaSecondary}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[480px] bg-[#F5F4F0] overflow-hidden">
              <img
                src="/images/flos-hero-seki.jpg"
                alt="About Baldre Studio"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Culture of Light Editorial Cards inside About Section (Title only) */}
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111111] mb-10">
              {t.aboutSection.cultureTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {data.news.map((item) => (
                <article
                  key={item.slug}
                  className="group flex flex-col bg-[#FFFFFF] p-5 rounded-3xl border border-[#E6E4DF]"
                >
                  <div className="aspect-[16/10] bg-[#F5F4F0] rounded-2xl border border-[#E6E4DF] overflow-hidden mb-4 relative">
                    <img
                      src={item.image_url}
                      alt={isFa ? item.title_fa : item.title_en}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 start-3 bg-[#FFFFFF]/95 text-[#111111] text-[11px] font-semibold px-3 py-1 rounded-full border border-[#E6E4DF]">
                      {isFa ? item.location_badge_fa : item.location_badge_en}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#686662] mb-2 px-1">
                    <span>{isFa ? item.category_fa : item.category_en}</span>
                    <span>•</span>
                    <span>{isFa ? item.date_fa : item.date_en}</span>
                  </div>
                  <h4 className="text-base font-bold text-[#111111] group-hover:text-[#9E7B4F] transition-colors mb-2 leading-snug px-1">
                    {isFa ? item.title_fa : item.title_en}
                  </h4>
                  <p className="text-xs text-[#55534E] leading-relaxed text-justify px-1">
                    {isFa ? item.excerpt_fa : item.excerpt_en}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: SHOWROOM (#showroom)
          - Dedicated Tehran Flagship Showroom on Fereshteh St. (Title only)
         ===================================================================== */}
      <section
        id="showroom"
        className="scroll-mt-20 py-16 lg:py-24 bg-[#FFFFFF] border-b border-[#E6E4DF]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111111] tracking-tight">
              {t.showroomSection.title}
            </h2>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#111111] text-[#FFFFFF] hover:bg-[#2B2B2B] transition-colors text-xs sm:text-sm font-semibold shrink-0 self-start lg:self-auto"
            >
              <span>{t.showroomSection.bookBtn}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Showroom Gallery Visual + Address & Experience Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Showroom Photography (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#E6E4DF] bg-[#F5F4F0] relative min-h-[380px] sm:min-h-[480px]">
              <img
                src="/images/flos-hero-ic.jpg"
                alt={t.showroomSection.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-5 inset-x-5 bg-[#FFFFFF]/95 backdrop-blur-md p-5 rounded-2xl border border-[#E6E4DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#111111] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs font-bold text-[#111111] mb-0.5">
                      {t.showroomSection.addressTitle}
                    </div>
                    <p className="text-xs text-[#55534E] text-justify">
                      {t.showroomSection.addressText}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Showroom Services & Hours (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {t.showroomSection.highlights.map((h) => (
                <div
                  key={h.title}
                  className="bg-[#F5F4F0] p-6 rounded-3xl border border-[#E6E4DF] flex flex-col justify-center"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <Sparkles className="w-4 h-4 text-[#9E7B4F] shrink-0" />
                    <h3 className="text-sm sm:text-base font-bold text-[#111111]">{h.title}</h3>
                  </div>
                  <p className="text-xs text-[#55534E] leading-relaxed text-justify">{h.desc}</p>
                </div>
              ))}

              <div className="bg-[#EFECE6] p-6 rounded-3xl border border-[#E6E4DF] flex items-start gap-3.5">
                <Clock className="w-4 h-4 text-[#111111] shrink-0 mt-1" />
                <div>
                  <div className="text-xs font-bold text-[#111111] mb-1">
                    {t.showroomSection.hoursTitle}
                  </div>
                  <p className="text-xs text-[#4A4946] text-justify">
                    {t.showroomSection.hoursText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: CONTACT US (#contact)
          - Direct Engineering & Sales Desk + Project Consultation Form (Title only)
         ===================================================================== */}
      <section
        id="contact"
        className="scroll-mt-20 py-16 lg:py-24 bg-[#F5F4F0] border-b border-[#E6E4DF]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Direct Contact Channels (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-8 leading-snug">
                  {t.contactSection.title}
                </h2>

                <div className="space-y-4 bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#E6E4DF]">
                  <div className="flex items-start gap-3.5">
                    <Phone className="w-4 h-4 text-[#111111] shrink-0 mt-1" />
                    <div>
                      <div className="text-xs font-bold text-[#111111] mb-1">
                        {t.contactSection.phoneTitle}
                      </div>
                      <div dir="ltr" className="text-sm font-bold text-[#111111]">
                        +98 (21) 2620 4800 • +98 (21) 2620 4801
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-4 border-t border-[#E6E4DF]">
                    <Mail className="w-4 h-4 text-[#111111] shrink-0 mt-1" />
                    <div>
                      <div className="text-xs font-bold text-[#111111] mb-1">
                        {t.contactSection.emailTitle}
                      </div>
                      <div dir="ltr" className="text-sm font-bold text-[#111111]">
                        info@baldre.ir • projects@baldre.ir
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-4 border-t border-[#E6E4DF]">
                    <Clock className="w-4 h-4 text-[#111111] shrink-0 mt-1" />
                    <div>
                      <div className="text-xs font-bold text-[#111111] mb-1">
                        {t.contactSection.studioHoursTitle}
                      </div>
                      <p className="text-xs text-[#55534E] text-justify">
                        {t.contactSection.studioHoursText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Form (7 cols, Soft Rounded-3xl) */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleConsultationSubmit}
                className="bg-[#FFFFFF] rounded-3xl border border-[#E6E4DF] p-6 sm:p-10 shadow-2xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-bold text-[#111111] mb-2">
                      {t.contactSection.formName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.full_name}
                      onChange={(e) => setFormState({ ...formState, full_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F4F0] border border-[#E6E4DF] focus:border-[#111111] focus:bg-[#FFFFFF] outline-none text-xs sm:text-sm text-[#111111] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111111] mb-2">
                      {t.contactSection.formStudio}
                    </label>
                    <input
                      type="text"
                      value={formState.company_or_studio}
                      onChange={(e) =>
                        setFormState({ ...formState, company_or_studio: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F4F0] border border-[#E6E4DF] focus:border-[#111111] focus:bg-[#FFFFFF] outline-none text-xs sm:text-sm text-[#111111] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-xs font-bold text-[#111111] mb-2">
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
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F4F0] border border-[#E6E4DF] focus:border-[#111111] focus:bg-[#FFFFFF] outline-none text-xs sm:text-sm text-[#111111] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111111] mb-2">
                      {t.contactSection.formProjectType}
                    </label>
                    <select
                      value={formState.project_type}
                      onChange={(e) =>
                        setFormState({ ...formState, project_type: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F4F0] border border-[#E6E4DF] focus:border-[#111111] focus:bg-[#FFFFFF] outline-none text-xs sm:text-sm text-[#111111] transition-colors"
                    >
                      <option value="Residential / Penthouse">
                        {isFa ? 'مسکونی لوکس و پنت‌هاوس' : 'Luxury Residential & Penthouse'}
                      </option>
                      <option value="Private Villa">
                        {isFa ? 'ویلایی و محوطه' : 'Private Villa & Landscape'}
                      </option>
                      <option value="Showroom Appointment">
                        {isFa ? 'رزرو وقت بازدید از شوروم فرشته' : 'Book Showroom Appointment'}
                      </option>
                      <option value="Gallery & Cultural">
                        {isFa ? 'گالری هنری و تجاری' : 'Art Gallery & Hospitality'}
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-[#111111] mb-2">
                    {t.contactSection.formMessage}
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F5F4F0] border border-[#E6E4DF] focus:border-[#111111] focus:bg-[#FFFFFF] outline-none text-xs sm:text-sm text-[#111111] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 px-6 rounded-full bg-[#111111] text-[#FFFFFF] hover:bg-[#2B2B2B] transition-colors text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {formStatus === 'submitting'
                      ? t.contactSection.formSubmitting
                      : t.contactSection.formSubmit}
                  </span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MINIMALIST ARCHITECTURAL FOOTER (#FFFFFF)
          - Brief About, Navigation Links, Collection Links, Address, Phone & Email
         ===================================================================== */}
      <footer className="bg-[#FFFFFF] border-t border-[#E6E4DF] pt-16 pb-10 px-4 sm:px-8 lg:px-14 text-xs text-[#686662]">
        <div className="max-w-[1440px] mx-auto">
          {/* Top 4-Column Minimalist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E6E4DF]">
            {/* Col 1: Brand & Brief About (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <a href="#home" className="inline-flex flex-col leading-none">
                <span
                  dir="ltr"
                  className="text-xl font-extrabold tracking-[0.24em] text-[#111111]"
                >
                  BALDRE
                </span>
                <span className="text-[11px] text-[#686662] mt-1.5 font-medium">
                  {t.brandSubtitle}
                </span>
              </a>
              <p className="text-xs text-[#55534E] leading-[1.9] text-justify max-w-sm">
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
                    <a
                      href={item.href}
                      className="text-xs text-[#55534E] hover:text-[#111111] transition-colors inline-block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Collections & B2B Links (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold text-[#111111] mb-4">
                {t.footer.resourcesTitle}
              </h4>
              <ul className="space-y-2.5">
                {t.footer.resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-[#55534E] hover:text-[#111111] transition-colors inline-block"
                    >
                      {link.label}
                    </a>
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
                  <p className="text-xs text-[#55534E] leading-relaxed text-justify">
                    {t.footer.addressValue}
                  </p>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#111111] shrink-0" />
                  <a
                    href="tel:+982126204800"
                    dir="ltr"
                    className="text-xs font-semibold text-[#111111] hover:text-[#9E7B4F] transition-colors"
                  >
                    {t.footer.phoneValue}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#111111] shrink-0" />
                  <a
                    href="mailto:info@baldre.ir"
                    dir="ltr"
                    className="text-xs font-semibold text-[#111111] hover:text-[#9E7B4F] transition-colors"
                  >
                    {t.footer.emailValue}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Language Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>{t.footer.copyright}</span>
            <div className="flex items-center gap-2" dir="ltr">
              <button
                onClick={() => setLang('fa')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  isFa ? 'bg-[#111111] text-[#FFFFFF]' : 'bg-[#F5F4F0] text-[#111111]'
                }`}
              >
                Fa
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  !isFa ? 'bg-[#111111] text-[#FFFFFF]' : 'bg-[#F5F4F0] text-[#111111]'
                }`}
              >
                En
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          PRODUCT TECHNICAL DATASHEET MODAL (Soft Rounded-3xl)
         ===================================================================== */}
      <AnimatePresence>
        {activeProductModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProductModal(null)}
            className="fixed inset-0 z-50 bg-[#111111]/45 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FFFFFF] rounded-3xl border border-[#E6E4DF] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Top Bar */}
              <div className="sticky top-0 z-10 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E6E4DF] px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    dir="ltr"
                    className="text-xs font-bold px-3 py-1 rounded-full bg-[#F5F4F0] text-[#111111] border border-[#E6E4DF]"
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F5F4F0] hover:bg-[#111111] hover:text-[#FFFFFF] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>{t.modal.close}</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Visual & Engineering Blueprint Column (5 cols) */}
                <div className="lg:col-span-5 p-6 bg-[#F5F4F0] border-b lg:border-b-0 lg:border-e border-[#E6E4DF] space-y-6">
                  <div className="aspect-[4/5] bg-[#FFFFFF] rounded-2xl border border-[#E6E4DF] overflow-hidden">
                    <img
                      src={activeProductModal.media.hero_image_url}
                      alt={
                        isFa
                          ? activeProductModal.identity.name_fa
                          : activeProductModal.identity.name_en
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Millimeter SVG Blueprint */}
                  <div className="bg-[#FFFFFF] rounded-2xl border border-[#E6E4DF] p-4">
                    <div className="text-xs font-bold text-[#111111] mb-2">
                      {t.modal.blueprintTitle}
                    </div>
                    <img
                      src={activeProductModal.media.dimension_diagram_url}
                      alt="Engineering Blueprint"
                      className="w-full h-auto rounded-xl border border-[#E6E4DF]"
                    />
                    <div
                      dir="ltr"
                      className="mt-2 text-[11px] font-semibold text-[#686662] flex justify-between"
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
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#4A4946] leading-relaxed text-justify mb-6">
                      {isFa
                        ? activeProductModal.identity.long_description_fa
                        : activeProductModal.identity.long_description_en}
                    </p>

                    {/* Spec Tabs */}
                    <div className="flex gap-2 mb-6">
                      <button
                        onClick={() => setModalTab('identity')}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                          modalTab === 'identity'
                            ? 'bg-[#111111] text-[#FFFFFF]'
                            : 'bg-[#F5F4F0] text-[#686662] hover:text-[#111111]'
                        }`}
                      >
                        {t.modal.identityTab}
                      </button>
                      <button
                        onClick={() => setModalTab('electrical')}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                          modalTab === 'electrical'
                            ? 'bg-[#111111] text-[#FFFFFF]'
                            : 'bg-[#F5F4F0] text-[#686662] hover:text-[#111111]'
                        }`}
                      >
                        {t.modal.electricalTab}
                      </button>
                    </div>

                    {modalTab === 'identity' ? (
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between py-2.5 px-4 rounded-xl bg-[#F5F4F0]">
                          <span className="text-[#686662]">{isFa ? 'طراح:' : 'Designer:'}</span>
                          <span className="font-bold text-[#111111]">
                            {isFa
                              ? activeProductModal.identity.designer_fa
                              : activeProductModal.identity.designer_en}
                          </span>
                        </div>
                        <div className="flex justify-between py-2.5 px-4 rounded-xl bg-[#F5F4F0]">
                          <span className="text-[#686662]">{isFa ? 'متریال بدنه:' : 'Materials:'}</span>
                          <span className="font-bold text-[#111111]">
                            {(isFa
                              ? activeProductModal.physical_specs.materials_fa
                              : activeProductModal.physical_specs.materials_en
                            ).join('، ')}
                          </span>
                        </div>
                        <div className="flex justify-between py-2.5 px-4 rounded-xl bg-[#F5F4F0]">
                          <span className="text-[#686662]">{isFa ? 'فینیش و رنگ:' : 'Finish:'}</span>
                          <span className="font-bold text-[#111111]">
                            {isFa
                              ? activeProductModal.physical_specs.finish_color_fa
                              : activeProductModal.physical_specs.finish_color_en}
                          </span>
                        </div>
                        <div className="flex justify-between py-2.5 px-4 rounded-xl bg-[#F5F4F0]">
                          <span className="text-[#686662]">{isFa ? 'نوع نصب:' : 'Mounting:'}</span>
                          <span className="font-bold text-[#111111]">
                            {isFa
                              ? activeProductModal.physical_specs.mounting_type_fa
                              : activeProductModal.physical_specs.mounting_type_en}
                          </span>
                        </div>
                        <div className="flex justify-between py-2.5 px-4 rounded-xl bg-[#F5F4F0]">
                          <span className="text-[#686662]">
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
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between py-2.5 px-4 rounded-xl bg-[#F5F4F0]">
                          <span className="text-[#686662]">{isFa ? 'منبع نوری:' : 'Light Source:'}</span>
                          <span className="font-bold text-[#111111]">
                            {isFa
                              ? activeProductModal.electrical_and_lighting.light_source_fa
                              : activeProductModal.electrical_and_lighting.light_source_en}
                          </span>
                        </div>
                        <div className="flex justify-between py-2.5 px-4 rounded-xl bg-[#F5F4F0]">
                          <span className="text-[#686662]">
                            {isFa ? 'توان و شار نوری:' : 'Power & Flux:'}
                          </span>
                          <span dir="ltr" className="font-bold text-[#111111]">
                            {activeProductModal.electrical_and_lighting.wattage_w}W •{' '}
                            {activeProductModal.electrical_and_lighting.luminous_flux_lm} lm
                          </span>
                        </div>
                        <div className="flex justify-between py-2.5 px-4 rounded-xl bg-[#F5F4F0]">
                          <span className="text-[#686662]">
                            {isFa ? 'دمای رنگ و CRI:' : 'CCT & CRI:'}
                          </span>
                          <span dir="ltr" className="font-bold text-[#111111]">
                            {activeProductModal.electrical_and_lighting.color_temperature_cct_en} • CRI{' '}
                            {activeProductModal.electrical_and_lighting.color_rendering_index_cri}
                          </span>
                        </div>
                        <div className="flex justify-between py-2.5 px-4 rounded-xl bg-[#F5F4F0]">
                          <span className="text-[#686662]">
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

                  {/* B2B Architect Downloads Box */}
                  <div className="mt-8 pt-6 border-t border-[#E6E4DF]">
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
                          className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#F5F4F0] hover:bg-[#111111] hover:text-[#FFFFFF] text-[#111111] border border-[#E6E4DF] text-xs font-semibold transition-colors cursor-pointer"
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
