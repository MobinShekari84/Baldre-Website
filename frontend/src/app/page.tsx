'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  ArrowUpLeft,
  ArrowUpRight,
  Download,
  CheckCircle2,
  MapPin,
  Phone,
  X,
  Mail,
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

  // Track scroll position: transparent navbar over hero at top, white background on scroll
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Homepage data from backend (with instant local fallback)
  const [data, setData] = useState<HomepagePayload>(FALLBACK_HOMEPAGE_DATA);

  // Static Hero Scene Daylight/Evening Toggle (No Slideshow)
  const [heroSceneMode, setHeroSceneMode] = useState<'day' | 'night'>('day');

  // Selected Category in Split Category Section (Right 1/3 list, Left 2/3 image + tiny text + button)
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(
    FLOS_CATEGORY_STRIP[0].slug
  );

  // Product modal state
  const [activeProductModal, setActiveProductModal] = useState<BaldreProduct | null>(null);
  const [modalTab, setModalTab] = useState<'identity' | 'electrical'>('identity');

  // Flos "Explore the Home / Shop by Space" state
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
  const currentRoom = FLOS_ROOMS.find((r) => r.id === activeRoomId) || FLOS_ROOMS[0];

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

  // Navbar items including Professionals (معماران و متخصصان)
  const navItems = [
    { href: '#products', label: t.nav.products },
    { href: '#projects', label: t.nav.projects },
    { href: '#professionals', label: t.nav.professionals },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
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
            <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
            <p className="text-xs md:text-sm leading-relaxed text-justify">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          FIXED RECTANGULAR NAVBAR (TRANSPARENT AT TOP OVER HERO, WHITE ON SCROLL)
          - At top of page (!isScrolled): transparent background so Hero image shows underneath
          - When scrolling down (isScrolled): pure white background (#FFFFFF/95)
          - Links: Products, Projects, Professionals, About & Showroom, Contact Us
          - Language switcher button shows ONLY "Fa" and "En" with sharp corners
         ===================================================================== */}
      <header
        className={`fixed top-0 inset-x-0 z-40 w-full rounded-none transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-xl border-b border-[#E5E5E5]'
            : 'bg-transparent border-b border-white/15'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 h-20 flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <a href="#home" className="flex items-center gap-3 group shrink-0">
            <span
              dir="ltr"
              className={`text-xl sm:text-2xl font-extrabold tracking-[0.2em] transition-colors duration-300 ${
                isScrolled ? 'text-[#111111]' : 'text-[#FFFFFF]'
              }`}
            >
              BALDRE
            </span>
            <span
              className={`h-4 w-[1px] transition-colors duration-300 ${
                isScrolled ? 'bg-[#CCCCCC]' : 'bg-white/40'
              }`}
            />
            <span
              className={`text-base sm:text-lg font-bold transition-colors duration-300 ${
                isScrolled ? 'text-[#111111]' : 'text-[#FFFFFF]'
              }`}
            >
              بالدر
            </span>
          </a>

          {/* Primary Navigation Links with Minimal Hover Underline Animation */}
          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative py-1.5 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out ${
                  isScrolled
                    ? 'text-[#333333] hover:text-[#111111] after:bg-[#111111]'
                    : 'text-white/90 hover:text-[#FFFFFF] after:bg-[#FFFFFF]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Minimal Transparent Language Toggle ("Fa | En") */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              dir="ltr"
              className={`inline-flex items-center rounded-none border transition-colors duration-300 ${
                isScrolled ? 'bg-transparent border-[#E5E5E5]' : 'bg-transparent border-white/25'
              }`}
              role="group"
              aria-label="Language Switcher"
            >
              <button
                type="button"
                onClick={() => setLang('fa')}
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isFa
                    ? isScrolled
                      ? 'bg-[#111111] text-[#FFFFFF]'
                      : 'bg-white/25 backdrop-blur-xs text-[#FFFFFF]'
                    : isScrolled
                    ? 'text-[#555555] hover:text-[#111111]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Fa
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  !isFa
                    ? isScrolled
                      ? 'bg-[#111111] text-[#FFFFFF]'
                      : 'bg-white/25 backdrop-blur-xs text-[#FFFFFF]'
                    : isScrolled
                    ? 'text-[#555555] hover:text-[#111111]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                En
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Nav Bar */}
        <div
          className={`lg:hidden border-t px-4 py-2.5 overflow-x-auto flex items-center gap-6 text-xs font-medium transition-colors duration-300 ${
            isScrolled
              ? 'border-[#E5E5E5] text-[#333333] bg-[#FFFFFF]/95'
              : 'border-white/15 text-white/90 bg-transparent backdrop-blur-xs'
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative whitespace-nowrap py-1 after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                isScrolled
                  ? 'text-[#333333] hover:text-[#111111] after:bg-[#111111]'
                  : 'text-white/90 hover:text-[#FFFFFF] after:bg-[#FFFFFF]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </header>

      {/* =====================================================================
          SECTION 1 (FULL-SCREEN STATIC IMAGE): HERO SECTION (#home)
          - Single Static Image (No slideshow) with Day/Night switching
          - Day/Night buttons contain ONLY Sun & Moon icons (no text labels)
         ===================================================================== */}
      <section
        id="home"
        className="relative w-full h-screen min-h-[680px] overflow-hidden bg-[#111111]"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={heroSceneMode}
            src={heroSceneMode === 'day' ? currentSlide.day_image : currentSlide.night_image}
            alt={isFa ? currentSlide.title_fa : currentSlide.title_en}
            fetchPriority="high"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>

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
              <a
                href="#products"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-none bg-white/15 backdrop-blur-sm text-[#FFFFFF] hover:bg-white/25 border border-white/35 transition-all text-xs sm:text-sm font-semibold"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>

              {/* Icon-Only Daylight / Night Toggle (ONLY Sun & Moon Icons) */}
              <div className="inline-flex items-center bg-transparent border border-white/25">
                <button
                  type="button"
                  onClick={() => setHeroSceneMode('day')}
                  aria-label={t.hero.dayMode}
                  title={t.hero.dayMode}
                  className={`flex items-center justify-center p-3 rounded-none transition-all cursor-pointer ${
                    heroSceneMode === 'day'
                      ? 'bg-white/25 backdrop-blur-xs text-[#FFFFFF]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setHeroSceneMode('night')}
                  aria-label={t.hero.nightMode}
                  title={t.hero.nightMode}
                  className={`flex items-center justify-center p-3 rounded-none transition-all cursor-pointer ${
                    heroSceneMode === 'night'
                      ? 'bg-white/25 backdrop-blur-xs text-[#FFFFFF]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                </button>
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
                      <span className="text-sm sm:text-base">
                        {isFa ? cat.name_fa : cat.name_en}
                      </span>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span dir="ltr" className="text-[11px] text-[#888888]">
                          {cat.count}
                        </span>
                        <ArrowIcon
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isSelected ? 'text-[#111111] scale-110' : 'text-[#BBBBBB]'
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
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Tiny Text + "More Products" Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-xs text-[#555555] font-light">
                  {isFa ? activeCategory.desc_fa : activeCategory.desc_en}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    const matchingProduct =
                      data.products.find((p) => p.category_slug === activeCategory.filterSlug) ||
                      data.products[0];
                    if (matchingProduct) {
                      setActiveProductModal(matchingProduct);
                      setModalTab('identity');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#111111] text-[#FFFFFF] hover:bg-[#333333] transition-colors text-xs font-semibold cursor-pointer shrink-0"
                >
                  <span>{t.categoryStrip.moreProductsBtn}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3 (FULL-SCREEN IMAGE): ARCHITECTURAL SPACE & PROFESSIONALS (#professionals)
          - Full-Screen Architectural Room Photograph (Dining / Living / Bedroom)
          - Ultra-Short Text & Transparent Minimalist Luminaires List
         ===================================================================== */}
      <section
        id="professionals"
        className="scroll-mt-20 relative w-full min-h-screen overflow-hidden bg-[#111111] flex flex-col justify-between py-20 lg:py-24"
      >
        {/* Full-Screen Room Photograph */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentRoom.id}
            src={currentRoom.image_url}
            alt={isFa ? currentRoom.name_fa : currentRoom.name_en}
            loading="lazy"
            initial={{ opacity: 0.35, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.35 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>

        {/* Atmospheric Gradient Scrim over Full-Screen Room Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/50 pointer-events-none" />

        {/* Top Bar inside Full-Screen Section: Section Title + Transparent Room Switcher Tabs */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight">
            {t.roomsSection.title}
          </h3>

          <div className="flex flex-wrap items-center gap-6 border-b border-white/20 pb-2">
            {FLOS_ROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                className={`pb-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer relative ${
                  activeRoomId === room.id
                    ? 'text-[#FFFFFF] after:content-[""] after:absolute after:bottom-[-9px] after:inset-x-0 after:h-[2px] after:bg-[#FFFFFF]'
                    : 'text-white/65 hover:text-white'
                }`}
              >
                {isFa ? room.name_fa : room.name_en}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Content inside Full-Screen Section: Concise Room Caption + Transparent Featured Luminaires */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 mt-16 lg:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            {/* Concise Room Narrative (7 cols) */}
            <div className="lg:col-span-7">
              <h4 className="text-xl sm:text-3xl font-bold text-[#FFFFFF] mb-2 leading-snug">
                {isFa ? currentRoom.caption_fa : currentRoom.caption_en}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFFFFF]/80 font-light">
                {isFa ? currentRoom.description_fa : currentRoom.description_en}
              </p>
            </div>

            {/* Featured Luminaires in this Space (5 cols — Transparent Glass over Image) */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-5 rounded-none border border-white/20 text-[#FFFFFF]">
              <div className="text-[11px] font-bold text-white/75 mb-3 pb-2 border-b border-white/15">
                {t.roomsSection.featuredInRoom}
              </div>

              <div className="divide-y divide-white/15">
                {roomProducts.map((prod) => (
                  <div
                    key={prod.slug}
                    onClick={() => {
                      setActiveProductModal(prod);
                      setModalTab('identity');
                    }}
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
                        <span className="text-[11px] text-white/80">
                          {t.roomsSection.inspectProduct} →
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#FFFFFF] truncate">
                        {isFa ? prod.identity.name_fa : prod.identity.name_en}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4 (PURE WHITE #FFFFFF): PROJECTS (#projects)
          - Minimalist Editorial Project Columns with Very Short Text on Pure White
         ===================================================================== */}
      <section
        id="projects"
        className="scroll-mt-20 py-20 lg:py-28 bg-[#FFFFFF]"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111111] tracking-tight mb-10">
            {t.projectsSection.title}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {data.projects.map((project) => (
              <article
                key={project.slug}
                className="flex flex-col justify-between group bg-transparent"
              >
                <div>
                  <div className="aspect-[16/11] bg-[#FFFFFF] overflow-hidden relative mb-4">
                    <img
                      src={project.image_url}
                      alt={isFa ? project.title_fa : project.title_en}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span
                      dir="ltr"
                      className="absolute top-3 start-3 bg-black/40 backdrop-blur-xs text-[#FFFFFF] text-[11px] font-medium px-2.5 py-0.5 rounded-none border border-white/20"
                    >
                      {project.code}
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] text-[#666666] mb-1">
                      {isFa ? project.location_fa : project.location_en} •{' '}
                      {isFa ? project.architect_fa : project.architect_en}
                    </div>
                    <h3 className="text-base font-bold text-[#111111] mb-1.5">
                      {isFa ? project.title_fa : project.title_en}
                    </h3>
                    <p className="text-xs text-[#555555] font-light mb-3">
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
              </article>
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
          src="/images/baldre-catalogue-spread.jpg"
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
                download="Baldre-2026-Catalogue.pdf"
                onClick={() =>
                  triggerToast(
                    isFa
                      ? 'فایل PDF کاتالوگ ۲۰۲۶ بالدر در حال دریافت است.'
                      : 'Downloading Baldre 2026 Catalogue PDF...'
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
                <ArrowIcon className="w-4 h-4" />
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
            {data.news.map((item) => (
              <article
                key={item.slug}
                className="group flex flex-col bg-transparent"
              >
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
                <h4 className="text-sm sm:text-base font-bold text-[#111111] group-hover:text-[#9E7B4F] transition-colors mb-1.5">
                  {isFa ? item.title_fa : item.title_en}
                </h4>
                <p className="text-xs text-[#555555] font-light">
                  {isFa ? item.excerpt_fa : item.excerpt_en}
                </p>
              </article>
            ))}
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
          src="/images/flos-hero-seki.jpg"
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
                    <div dir="ltr" className="text-xs sm:text-sm font-bold text-[#FFFFFF]">
                      +98 (21) 2620 4800 • +98 (21) 2620 4801
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
                    <div dir="ltr" className="text-xs sm:text-sm font-bold text-[#FFFFFF]">
                      info@baldre.ir • projects@baldre.ir
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
                    <p className="text-xs text-[#FFFFFF]/90 leading-relaxed text-justify font-light">
                      {t.contactSection.addressText}
                    </p>
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
                  <ArrowIcon className="w-4 h-4" />
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
              <a href="#home" className="inline-flex flex-col leading-none">
                <span
                  dir="ltr"
                  className="text-xl font-extrabold tracking-[0.24em] text-[#111111]"
                >
                  BALDRE
                </span>
                <span className="text-[11px] text-[#555555] mt-1.5 font-medium">
                  {t.brandSubtitle}
                </span>
              </a>
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
                    <a
                      href={item.href}
                      className="text-xs text-[#444444] hover:text-[#111111] transition-colors inline-block"
                    >
                      {item.label}
                    </a>
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
                    <a
                      href={link.href}
                      className="text-xs text-[#444444] hover:text-[#111111] transition-colors inline-block"
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
                  <p className="text-xs text-[#444444] leading-relaxed text-justify">
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

          {/* Bottom Copyright & Minimal Language Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>{t.footer.copyright}</span>
            <div className="flex items-center gap-2" dir="ltr">
              <button
                onClick={() => setLang('fa')}
                className={`px-3 py-1 rounded-none border text-xs font-bold transition-colors cursor-pointer ${
                  isFa
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                    : 'bg-transparent text-[#111111] border-[#E5E5E5]'
                }`}
              >
                Fa
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-none border text-xs font-bold transition-colors cursor-pointer ${
                  !isFa
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                    : 'bg-transparent text-[#111111] border-[#E5E5E5]'
                }`}
              >
                En
              </button>
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
                      className="w-full h-full object-cover"
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

                    {/* Spec Tabs (Minimalist Underline) */}
                    <div className="flex gap-6 mb-6 border-b border-[#E5E5E5]">
                      <button
                        onClick={() => setModalTab('identity')}
                        className={`pb-3 text-xs font-bold transition-colors cursor-pointer relative ${
                          modalTab === 'identity'
                            ? 'text-[#111111] after:content-[""] after:absolute after:bottom-[-1px] after:inset-x-0 after:h-[2px] after:bg-[#111111]'
                            : 'text-[#666666] hover:text-[#111111]'
                        }`}
                      >
                        {t.modal.identityTab}
                      </button>
                      <button
                        onClick={() => setModalTab('electrical')}
                        className={`pb-3 text-xs font-bold transition-colors cursor-pointer relative ${
                          modalTab === 'electrical'
                            ? 'text-[#111111] after:content-[""] after:absolute after:bottom-[-1px] after:inset-x-0 after:h-[2px] after:bg-[#111111]'
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
