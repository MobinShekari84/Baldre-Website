'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
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
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Lang,
  BaldrProduct,
  FALLBACK_HOMEPAGE_DATA,
  FLOS_CATEGORY_STRIP,
  UI_TEXT,
} from '@/data/baldrData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

function ProductsCatalogContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang: Lang = pathname?.startsWith('/en') ? 'en' : 'fa';
  const isFa = lang === 'fa';
  const dir = isFa ? 'rtl' : 'ltr';
  const t = UI_TEXT[lang];
  const homeHref = isFa ? '/' : '/en';
  const productsBase = isFa ? '/products' : '/en/products';

  // Read URL query parameters (?category=..., ?page=..., etc.)
  const categoryFromUrl = searchParams?.get('category') || 'all';
  const pageParam = searchParams?.get('page');
  const isAllPages = pageParam === 'all';
  const rawPage = parseInt(pageParam || '1', 10);
  const urlPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  // Selected category is directly driven by the URL parameter
  const selectedCategory = categoryFromUrl;

  // Full 12-product catalog (merging any backend products with the full 12 architectural items)
  const [products, setProducts] = useState<BaldrProduct[]>(FALLBACK_HOMEPAGE_DATA.products);

  // Global Card Illumination Mode ('day' = studio photo, 'night' = illuminated secondary photo)
  const [cardLightMode, setCardLightMode] = useState<'day' | 'night'>('day');

  // Active Variant Index per Product SKU
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});

  // =========================================================================
  // MINIMALIST ARCHITECTURAL FILTERS (Flos / Vibia / Davide Groppi Inspired)
  // =========================================================================
  const [searchQuery, setSearchQuery] = useState<string>(() => searchParams?.get('q') || '');
  const [selectedEnv, setSelectedEnv] = useState<'all' | 'IP20' | 'IP65'>(() => {
    const val = searchParams?.get('env');
    return val === 'IP20' || val === 'IP65' ? val : 'all';
  });
  const [selectedCct, setSelectedCct] = useState<'all' | '2700K' | '3000K'>(() => {
    const val = searchParams?.get('cct');
    return val === '2700K' || val === '3000K' ? val : 'all';
  });
  const [selectedControl, setSelectedControl] = useState<'all' | 'dali' | 'dimmer'>(() => {
    const val = searchParams?.get('control');
    return val === 'dali' || val === 'dimmer' ? val : 'all';
  });
  const [selectedMounting, setSelectedMounting] = useState<
    'all' | 'suspended' | 'wall-floor' | 'table' | 'track'
  >(() => {
    const val = searchParams?.get('mounting');
    return ['suspended', 'wall-floor', 'table', 'track'].includes(val || '')
      ? (val as any)
      : 'all';
  });

  // Product Technical Datasheet Modal state
  const [activeProductModal, setActiveProductModal] = useState<BaldrProduct | null>(null);
  const [modalTab, setModalTab] = useState<'identity' | 'electrical'>('identity');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync HTML lang/dir attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // Fetch live product catalog from Django REST API (/api/products/) so Admin edits/additions/deletions work live
  useEffect(() => {
    let mounted = true;
    fetch(`${API_BASE}/products/`)
      .then((res) => {
        if (!res.ok) throw new Error('Offline');
        return res.json();
      })
      .then((apiProducts: BaldrProduct[]) => {
        if (mounted && Array.isArray(apiProducts)) {
          setProducts(apiProducts);
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

  // Helper to classify mounting type for filter
  const matchesMountingFilter = (p: BaldrProduct, mountFilter: string): boolean => {
    if (mountFilter === 'all') return true;
    const mountText =
      `${p.physical_specs.mounting_type_en} ${p.physical_specs.mounting_type_fa} ${p.category_slug}`.toLowerCase();
    if (mountFilter === 'track') {
      return mountText.includes('48v') || mountText.includes('track') || mountText.includes('ریل');
    }
    if (mountFilter === 'suspended') {
      return (
        p.category_slug === 'pendant' ||
        mountText.includes('suspended') ||
        mountText.includes('ceiling') ||
        mountText.includes('آویز') ||
        mountText.includes('سقفی')
      );
    }
    if (mountFilter === 'wall-floor') {
      return (
        p.category_slug === 'wall-floor' ||
        mountText.includes('wall') ||
        mountText.includes('floor') ||
        mountText.includes('دیواری') ||
        mountText.includes('ایستاده')
      );
    }
    if (mountFilter === 'table') {
      return (
        p.category_slug === 'sculptural' ||
        p.category_slug === 'outdoor' ||
        mountText.includes('table') ||
        mountText.includes('portable') ||
        mountText.includes('رومیزی') ||
        mountText.includes('پرتابل')
      );
    }
    return true;
  };

  // Filtered products memo
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Category filter
      if (selectedCategory !== 'all' && p.category_slug !== selectedCategory) {
        return false;
      }

      // 2. Environment / IP rating filter
      if (selectedEnv !== 'all' && p.compliance.ip_rating !== selectedEnv) {
        return false;
      }

      // 3. CCT filter (2700K / 3000K)
      if (selectedCct !== 'all') {
        const cctString = `${p.electrical_and_lighting.color_temperature_cct_en} ${p.electrical_and_lighting.color_temperature_cct_fa}`;
        if (!cctString.includes(selectedCct)) {
          return false;
        }
      }

      // 4. Control / Dimming protocol filter
      if (selectedControl !== 'all') {
        const dimString =
          `${p.electrical_and_lighting.dimmability_en} ${p.electrical_and_lighting.dimmability_fa}`.toLowerCase();
        if (selectedControl === 'dali') {
          if (!dimString.includes('dali') && !dimString.includes('casambi')) return false;
        } else if (selectedControl === 'dimmer') {
          if (
            !dimString.includes('dimmer') &&
            !dimString.includes('touch') &&
            !dimString.includes('warm') &&
            !dimString.includes('دیمر')
          ) {
            return false;
          }
        }
      }

      // 5. Mounting filter
      if (!matchesMountingFilter(p, selectedMounting)) {
        return false;
      }

      // 6. Search query filter (Name, SKU, Material, Designer)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.trim().toLowerCase();
        const haystack = [
          p.sku,
          p.identity.name_fa,
          p.identity.name_en,
          p.identity.short_description_fa,
          p.identity.short_description_en,
          p.physical_specs.finish_color_fa,
          p.physical_specs.finish_color_en,
          ...p.physical_specs.materials_fa,
          ...p.physical_specs.materials_en,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [
    products,
    selectedCategory,
    selectedEnv,
    selectedCct,
    selectedControl,
    selectedMounting,
    searchQuery,
  ]);

  // Count per category
  const getCategoryCount = (catSlug: string) => {
    if (catSlug === 'all') return products.length;
    return products.filter((p) => p.category_slug === catSlug).length;
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedEnv !== 'all' ||
    selectedCct !== 'all' ||
    selectedControl !== 'all' ||
    selectedMounting !== 'all' ||
    searchQuery.trim() !== '';

  // =========================================================================
  // RESPONSIVE PAGINATION (9 products for Laptop/Desktop, 4 for Mobile)
  // URL-driven so opening in a new tab / sharing keeps all products intact
  // =========================================================================
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);

  // Dynamically set items per page based on viewport (4 on mobile < 768px, 9 on desktop/laptop)
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (typeof window !== 'undefined') {
        const isMobileScreen = window.innerWidth < 768;
        setItemsPerPage(isMobileScreen ? 4 : 9);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage, { passive: true });
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const validCurrentPage = Math.min(Math.max(1, urlPage), totalPages);

  const paginatedProducts = useMemo(() => {
    if (isAllPages) {
      return filteredProducts;
    }
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, validCurrentPage, itemsPerPage, isAllPages]);

  // Construct URL preserving existing query filters
  const buildUrl = (overrides?: {
    category?: string | null;
    page?: number | string | null;
    env?: string;
    cct?: string;
    control?: string;
    mounting?: string;
    q?: string;
  }) => {
    const q = new URLSearchParams();

    // Category
    const cat =
      overrides?.category !== undefined
        ? overrides.category === 'all'
          ? null
          : overrides.category
        : selectedCategory === 'all'
        ? null
        : selectedCategory;
    if (cat) q.set('category', cat);

    // Page: if 'all', set page=all; if number > 1, set page=X; if 1 or null, omitted
    const pg =
      overrides?.page !== undefined
        ? overrides.page
        : isAllPages
        ? 'all'
        : validCurrentPage;
    if (pg === 'all') {
      q.set('page', 'all');
    } else if (pg && Number(pg) > 1) {
      q.set('page', String(pg));
    }

    // Secondary filters
    const envVal = overrides?.env !== undefined ? overrides.env : selectedEnv;
    if (envVal && envVal !== 'all') q.set('env', envVal);

    const cctVal = overrides?.cct !== undefined ? overrides.cct : selectedCct;
    if (cctVal && cctVal !== 'all') q.set('cct', cctVal);

    const ctrlVal = overrides?.control !== undefined ? overrides.control : selectedControl;
    if (ctrlVal && ctrlVal !== 'all') q.set('control', ctrlVal);

    const mountVal = overrides?.mounting !== undefined ? overrides.mounting : selectedMounting;
    if (mountVal && mountVal !== 'all') q.set('mounting', mountVal);

    const qVal = overrides?.q !== undefined ? overrides.q : searchQuery.trim();
    if (qVal) q.set('q', qVal);

    const qs = q.toString();
    return qs ? `${productsBase}?${qs}` : productsBase;
  };

  const handleScrollToGrid = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('catalog-grid');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const resetAllFilters = () => {
    setSelectedEnv('all');
    setSelectedCct('all');
    setSelectedControl('all');
    setSelectedMounting('all');
    setSearchQuery('');
    router.push(productsBase, { scroll: false });
  };

  const ArrowIcon = isFa ? ArrowUpLeft : ArrowUpRight;
  const NextChevron = isFa ? ChevronLeft : ChevronRight;
  const PrevChevron = isFa ? ChevronRight : ChevronLeft;

  const projectsHref = isFa ? '/projects' : '/en/projects';
  const professionalsHref = isFa ? '/professionals' : '/en/professionals';
  const aboutHref = isFa ? '/about' : '/en/about';
  const contactHref = isFa ? '/contact' : '/en/contact';

  // Navbar items matching architectural architecture (Showroom is housed inside About Us)
  const navItems = [
    { href: productsBase, label: t.nav.products, active: true },
    { href: projectsHref, label: t.nav.projects, active: false },
    { href: professionalsHref, label: t.nav.professionals, active: false },
    { href: aboutHref, label: t.nav.about, active: false },
    { href: contactHref, label: t.nav.contact, active: false },
  ];

  const faCatalogHref = (() => {
    const url = buildUrl({});
    return url.startsWith('/en/products') ? url.replace('/en/products', '/products') : url;
  })();
  const enCatalogHref = (() => {
    const url = buildUrl({});
    return url.startsWith('/en/products') ? url : url.replace('/products', '/en/products');
  })();

  // Category filter tabs (All + 5 unique categories from FALLBACK_HOMEPAGE_DATA.categories)
  const categoryTabs = [
    {
      slug: 'all',
      name_fa: t.productsSection.filterAll,
      name_en: t.productsSection.filterAll,
    },
    ...FALLBACK_HOMEPAGE_DATA.categories.map((c) => ({
      slug: c.slug,
      name_fa: c.name_fa,
      name_en: c.name_en,
    })),
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
          FIXED RECTANGULAR NAVBAR (PURE WHITE OVER CATALOG PAGE)
         ===================================================================== */}
      <header className="fixed top-0 inset-x-0 z-40 w-full rounded-none bg-[#FFFFFF]/95 backdrop-blur-xl border-b border-[#E5E5E5] transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 h-20 flex items-center justify-between gap-4">
          {/* Official Baldr Red Logo linking back to Home */}
          <Link href={homeHref} className="flex items-center group shrink-0 cursor-pointer">
            <img
              src="/images/baldr-logo-red.webp"
              alt="Baldr Lighting"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </Link>

          {/* Primary Navigation Links */}
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

          {/* Minimal Transparent Language Toggle ("Fa | En") — SEO Route Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              dir="ltr"
              className="inline-flex items-center rounded-none border bg-transparent border-[#E5E5E5]"
              role="group"
              aria-label="Language Switcher"
            >
              <Link
                href={faCatalogHref}
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isFa
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                Fa
              </Link>
              <Link
                href={enCatalogHref}
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
              href="#catalog-grid"
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
              className={`relative whitespace-nowrap py-1 hover:opacity-75 transition-opacity cursor-pointer ${
                item.active ? 'font-bold underline decoration-[#E40521] underline-offset-4' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      {/* =====================================================================
          SECTION 1 (PURE WHITE #FFFFFF): MINIMALIST FILTER ARCHITECTURE & GALLERY
          - No Hero section; starts directly with the catalog header & filters
          - Pure White (#FFFFFF) background, sharp 90° corners, hairline #E5E5E5 borders
         ===================================================================== */}
      <section id="catalog-grid" className="pt-28 lg:pt-32 pb-16 lg:pb-24 bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          {/* -----------------------------------------------------------------
              ROW 1: HORIZONTAL ARCHITECTURAL CATEGORY STRIP
             ----------------------------------------------------------------- */}
          <div className="flex items-center justify-between gap-6 border-b border-[#E5E5E5] pb-0 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6 sm:gap-9">
              {categoryTabs.map((tab) => {
                const isActive = selectedCategory === tab.slug;
                const count = getCategoryCount(tab.slug);
                const href = buildUrl({
                  category: tab.slug === 'all' ? 'all' : tab.slug,
                  page: null,
                });
                return (
                  <Link
                    key={tab.slug}
                    href={href}
                    scroll={false}
                    onClick={handleScrollToGrid}
                    className={`relative pb-4 text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[2px] after:transition-transform after:duration-300 ${
                      isActive
                        ? 'text-[#111111] font-bold after:bg-[#E40521] after:scale-x-100'
                        : 'text-[#666666] hover:text-[#111111] font-medium after:bg-[#E40521] after:scale-x-0'
                    }`}
                  >
                    <span>{isFa ? tab.name_fa : tab.name_en}</span>
                    <span dir="ltr" className="text-[11px] text-[#888888]">
                      ({count})
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Global Card Illumination Mode Toggle (Sun / Moon Icons Only) */}
            <div className="hidden md:flex items-center gap-2 pb-3 shrink-0">
              <div className="inline-flex items-center border border-[#E5E5E5] rounded-none bg-transparent">
                <button
                  type="button"
                  onClick={() => setCardLightMode('day')}
                  aria-label={t.hero.dayMode}
                  title={t.hero.dayMode}
                  className={`p-2 rounded-none transition-colors cursor-pointer ${
                    cardLightMode === 'day'
                      ? 'bg-[#111111] text-[#FFFFFF]'
                      : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCardLightMode('night')}
                  aria-label={t.hero.nightMode}
                  title={t.hero.nightMode}
                  className={`p-2 rounded-none transition-colors cursor-pointer ${
                    cardLightMode === 'night'
                      ? 'bg-[#111111] text-[#FFFFFF]'
                      : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              ROW 2: MINIMALIST MULTI-DIMENSIONAL TECHNICAL FILTER BAR
              (Search + Installation + CCT + Control Protocol + IP Environment)
             ----------------------------------------------------------------- */}
          <div className="py-6 border-b border-[#E5E5E5] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            {/* Search by Name / SKU / Material (4 cols) */}
            <div className="lg:col-span-4 relative flex items-center border-b border-[#CCCCCC] focus-within:border-[#E40521] transition-colors">
              <Search className="w-4 h-4 text-[#666666] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.productsPage.searchPlaceholder}
                className="w-full bg-transparent px-3 py-2 text-xs text-[#111111] placeholder:text-[#888888] focus:outline-none rounded-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[#888888] hover:text-[#111111] p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter 1: Installation / Mounting (2 cols) */}
            <div className="lg:col-span-2">
              <select
                value={selectedMounting}
                onChange={(e) =>
                  setSelectedMounting(
                    e.target.value as 'all' | 'suspended' | 'wall-floor' | 'table' | 'track'
                  )
                }
                aria-label={t.productsPage.filterMounting}
                className="w-full bg-transparent border-b border-[#CCCCCC] focus:border-[#111111] py-2 text-xs text-[#111111] focus:outline-none rounded-none cursor-pointer"
              >
                <option value="all">
                  {t.productsPage.filterMounting}: {t.productsPage.allOption}
                </option>
                <option value="suspended">{t.productsPage.mountSuspended}</option>
                <option value="wall-floor">{t.productsPage.mountWallFloor}</option>
                <option value="table">{t.productsPage.mountTable}</option>
                <option value="track">{t.productsPage.mountTrack}</option>
              </select>
            </div>

            {/* Filter 2: Color Temperature CCT (2 cols) */}
            <div className="lg:col-span-2">
              <select
                value={selectedCct}
                onChange={(e) => setSelectedCct(e.target.value as 'all' | '2700K' | '3000K')}
                aria-label={t.productsPage.filterCct}
                className="w-full bg-transparent border-b border-[#CCCCCC] focus:border-[#111111] py-2 text-xs text-[#111111] focus:outline-none rounded-none cursor-pointer"
              >
                <option value="all">
                  {t.productsPage.filterCct}: {t.productsPage.allOption}
                </option>
                <option value="2700K">{t.productsPage.cct2700}</option>
                <option value="3000K">{t.productsPage.cct3000}</option>
              </select>
            </div>

            {/* Filter 3: Control Protocol (2 cols) */}
            <div className="lg:col-span-2">
              <select
                value={selectedControl}
                onChange={(e) => setSelectedControl(e.target.value as 'all' | 'dali' | 'dimmer')}
                aria-label={t.productsPage.filterControl}
                className="w-full bg-transparent border-b border-[#CCCCCC] focus:border-[#111111] py-2 text-xs text-[#111111] focus:outline-none rounded-none cursor-pointer"
              >
                <option value="all">
                  {t.productsPage.filterControl}: {t.productsPage.allOption}
                </option>
                <option value="dali">{t.productsPage.ctrlDali}</option>
                <option value="dimmer">{t.productsPage.ctrlDimmer}</option>
              </select>
            </div>

            {/* Filter 4: Environment IP Rating + Result Count / Reset (2 cols) */}
            <div className="lg:col-span-2 flex items-center justify-between gap-2">
              <select
                value={selectedEnv}
                onChange={(e) => setSelectedEnv(e.target.value as 'all' | 'IP20' | 'IP65')}
                aria-label={t.productsPage.filterEnvironment}
                className="w-full bg-transparent border-b border-[#CCCCCC] focus:border-[#111111] py-2 text-xs text-[#111111] focus:outline-none rounded-none cursor-pointer"
              >
                <option value="all">
                  {t.productsPage.filterEnvironment}: {t.productsPage.allOption}
                </option>
                <option value="IP20">{t.productsPage.envIndoor}</option>
                <option value="IP65">{t.productsPage.envOutdoor}</option>
              </select>
            </div>
          </div>

          {/* Active Filters & Result Count Bar */}
          <div className="pt-4 pb-10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#666666]">
            <div>
              {totalItems > 0 ? (
                <span>
                  {isAllPages
                    ? isFa
                      ? `نمایش یک‌جای تمام ${totalItems} محصول`
                      : `Showing all ${totalItems} luminaires`
                    : isFa
                    ? `نمایش ${(validCurrentPage - 1) * itemsPerPage + 1} تا ${Math.min(
                        validCurrentPage * itemsPerPage,
                        totalItems
                      )} از ${totalItems} محصول`
                    : `Showing ${(validCurrentPage - 1) * itemsPerPage + 1}–${Math.min(
                        validCurrentPage * itemsPerPage,
                        totalItems
                      )} of ${totalItems} luminaires`}
                </span>
              ) : (
                <span>0 {t.productsPage.resultsCountSuffix}</span>
              )}
            </div>

            {hasActiveFilters && (
              <Link
                href={productsBase}
                scroll={false}
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-[#E40521] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.productsPage.clearFilters}</span>
              </Link>
            )}
          </div>

          {/* -----------------------------------------------------------------
              3-COLUMN UNBOXED ARCHITECTURAL PRODUCT GALLERY GRID
             ----------------------------------------------------------------- */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center border border-[#E5E5E5] rounded-none">
              <p className="text-sm text-[#444444] mb-5">{t.productsPage.noResultsTitle}</p>
              <Link
                href={productsBase}
                scroll={false}
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-[#111111] text-[#FFFFFF] text-xs font-semibold hover:bg-[#333333] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.productsPage.noResultsReset}</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {paginatedProducts.map((product) => {
                const activeVarIdx = selectedVariants[product.sku] ?? 0;
                const activeVariant = product.variants[activeVarIdx] || product.variants[0];
                const primaryImg = activeVariant
                  ? activeVariant.hero_image_url
                  : product.media.hero_image_url;
                const secondaryImg =
                  product.media.gallery_images[0] || product.media.hero_image_url;
                const activeSku = activeVariant ? activeVariant.sku : product.sku;

                return (
                  <motion.article
                    layout
                    key={product.sku}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="group flex flex-col justify-between bg-[#FFFFFF] rounded-none"
                  >
                    <div>
                      {/* Aspect 4:5 Unboxed Architectural Image Container linking to dedicated Product Page */}
                      <Link
                        href={`${productsBase}/${product.slug}`}
                        className="block relative aspect-[4/5] w-full overflow-hidden bg-[#FFFFFF] rounded-none mb-4 cursor-pointer"
                      >
                        {/* Primary Image (Daylight Studio or Variant Image) */}
                        <img
                          src={cardLightMode === 'night' ? secondaryImg : primaryImg}
                          alt={isFa ? product.identity.name_fa : product.identity.name_en}
                          loading="lazy"
                          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-103"
                        />

                        {/* Secondary Image (Hover Cross-Fade to Illuminated View) */}
                        <img
                          src={cardLightMode === 'night' ? primaryImg : secondaryImg}
                          alt={isFa ? product.identity.name_fa : product.identity.name_en}
                          loading="lazy"
                          className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
                        />

                        {/* Top Minimalist SKU & IP Rating Overlay */}
                        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                          <span
                            dir="ltr"
                            className="px-2.5 py-1 bg-black/55 backdrop-blur-xs text-[#FFFFFF] text-[10px] font-semibold tracking-wider"
                          >
                            {activeSku}
                          </span>
                          <span
                            dir="ltr"
                            className="px-2 py-0.5 bg-white/85 backdrop-blur-xs text-[#111111] text-[10px] font-bold"
                          >
                            {product.compliance.ip_rating}
                          </span>
                        </div>
                      </Link>

                      {/* Interactive Finish Variant Swatches + Category Label */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] text-[#777777]">
                          {isFa ? product.identity.category_fa : product.identity.category}
                        </span>

                        {product.variants.length > 0 && (
                          <div className="flex items-center gap-1.5">
                            {product.variants.map((v, idx) => {
                              const isSelected = activeVarIdx === idx;
                              return (
                                <button
                                  key={`${product.sku}-${v.sku}-${idx}`}
                                  type="button"
                                  onClick={() =>
                                    setSelectedVariants((prev) => ({
                                      ...prev,
                                      [product.sku]: idx,
                                    }))
                                  }
                                  title={isFa ? v.name_fa : v.name_en}
                                  aria-label={isFa ? v.name_fa : v.name_en}
                                  className={`w-3.5 h-3.5 rounded-none border transition-transform cursor-pointer ${
                                    isSelected
                                      ? 'border-[#111111] scale-115 ring-1 ring-[#111111] ring-offset-1'
                                      : 'border-[#CCCCCC] hover:border-[#111111]'
                                  }`}
                                  style={{ backgroundColor: v.hex }}
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Product Title & Concise 1-Line Summary */}
                      <Link
                        href={`${productsBase}/${product.slug}`}
                        className="block text-base font-bold text-[#111111] group-hover:text-[#E40521] transition-colors cursor-pointer mb-1"
                      >
                        {isFa ? product.identity.name_fa : product.identity.name_en}
                      </Link>
                      <p className="text-xs text-[#666666] font-light line-clamp-1 mb-4">
                        {isFa
                          ? product.identity.short_description_fa
                          : product.identity.short_description_en}
                      </p>
                    </div>

                    {/* Hairline Technical Photometric Strip & Dedicated Page Link */}
                    <div className="pt-3 border-t border-[#E5E5E5] flex items-center justify-between gap-2">
                      <span
                        dir="ltr"
                        className="text-[11px] font-medium text-[#555555] tracking-tight"
                      >
                        {product.electrical_and_lighting.wattage_w}W •{' '}
                        {product.electrical_and_lighting.luminous_flux_lm}lm •{' '}
                        {product.electrical_and_lighting.color_temperature_cct_en.split(' ')[0]} •
                        CRI {product.electrical_and_lighting.color_rendering_index_cri}
                      </span>

                      <Link
                        href={`${productsBase}/${product.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#111111] hover:text-[#E40521] transition-colors cursor-pointer shrink-0"
                      >
                        <span>{t.productsPage.inspectSpecsBtn}</span>
                        <ArrowIcon className="w-3.5 h-3.5 text-[#E40521]" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* -----------------------------------------------------------------
              PAGINATION BAR (Real Links with ?page=1,2,3... & ?page=all for new tab)
             ----------------------------------------------------------------- */}
          {(totalPages > 1 || isAllPages) && (
            <div className="mt-20 pt-10 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-6" dir={dir}>
              {/* Pagination Info */}
              <div className="text-xs text-[#666666] font-medium">
                {isAllPages
                  ? isFa
                    ? `نمایش یک‌جای تمام ${totalItems} چراغ معماری`
                    : `Displaying all ${totalItems} architectural luminaires`
                  : isFa
                  ? `صفحه ${validCurrentPage} از ${totalPages} (مجموع ${totalItems} چراغ معماری)`
                  : `Page ${validCurrentPage} of ${totalPages} (${totalItems} luminaires)`}
              </div>

              {/* Pagination Controls */}
              <div className="flex flex-wrap items-center justify-center gap-1.5" dir="ltr">
                {/* Previous Page Link */}
                {validCurrentPage > 1 && !isAllPages ? (
                  <Link
                    href={buildUrl({ page: validCurrentPage - 1 })}
                    scroll={false}
                    onClick={handleScrollToGrid}
                    aria-label={isFa ? 'صفحه قبلی' : 'Previous page'}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-none text-xs font-semibold border border-[#E5E5E5] text-[#111111] hover:bg-[#111111] hover:text-[#FFFFFF] transition-all cursor-pointer shrink-0"
                  >
                    <PrevChevron className="w-3.5 h-3.5" />
                    <span>{isFa ? 'قبلی' : 'Prev'}</span>
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-none text-xs font-semibold border border-[#E5E5E5] opacity-35 cursor-not-allowed text-[#999999] shrink-0"
                  >
                    <PrevChevron className="w-3.5 h-3.5" />
                    <span>{isFa ? 'قبلی' : 'Prev'}</span>
                  </span>
                )}

                {/* Numbered Page Links: 1, 2, 3... */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = !isAllPages && pageNum === validCurrentPage;
                  return (
                    <Link
                      key={pageNum}
                      href={buildUrl({ page: pageNum })}
                      scroll={false}
                      onClick={handleScrollToGrid}
                      className={`w-9 h-9 flex items-center justify-center rounded-none text-xs font-bold transition-all cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-[#111111] text-[#FFFFFF] border border-[#111111]'
                          : 'bg-transparent border border-[#E5E5E5] text-[#444444] hover:border-[#111111] hover:text-[#111111]'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}

                {/* "All" / "همه" Page Link: ?page=all */}
                <Link
                  href={buildUrl({ page: 'all' })}
                  scroll={false}
                  onClick={handleScrollToGrid}
                  title={isFa ? 'نمایش تمام محصولات در یک صفحه' : 'View all products on one page'}
                  className={`px-3.5 h-9 flex items-center justify-center rounded-none text-xs font-bold transition-all cursor-pointer shrink-0 ${
                    isAllPages
                      ? 'bg-[#111111] text-[#FFFFFF] border border-[#111111]'
                      : 'bg-transparent border border-[#E5E5E5] text-[#444444] hover:border-[#111111] hover:text-[#111111]'
                  }`}
                >
                  <span>{isFa ? 'همه' : 'All'}</span>
                </Link>

                {/* Next Page Link */}
                {validCurrentPage < totalPages && !isAllPages ? (
                  <Link
                    href={buildUrl({ page: validCurrentPage + 1 })}
                    scroll={false}
                    onClick={handleScrollToGrid}
                    aria-label={isFa ? 'صفحه بعدی' : 'Next page'}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-none text-xs font-semibold border border-[#E5E5E5] text-[#111111] hover:bg-[#111111] hover:text-[#FFFFFF] transition-all cursor-pointer shrink-0"
                  >
                    <span>{isFa ? 'بعدی' : 'Next'}</span>
                    <NextChevron className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-none text-xs font-semibold border border-[#E5E5E5] opacity-35 cursor-not-allowed text-[#999999] shrink-0"
                  >
                    <span>{isFa ? 'بعدی' : 'Next'}</span>
                    <NextChevron className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 3 (FULL-SCREEN IMAGE): OPEN CATALOGUE & BIM LIBRARY
          - Alternates back to Full-Screen Image to match Home's rhythm
         ===================================================================== */}
      <section className="relative w-full min-h-[75vh] overflow-hidden bg-[#111111] flex items-end py-20 lg:py-24">
        <img
          src="/images/baldr-catalogue-spread.webp"
          alt={t.catalogueSection.title}
          loading="lazy"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 sm:px-8 lg:px-14">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#FFFFFF] tracking-tight mb-3">
              {t.catalogueSection.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#FFFFFF]/85 leading-relaxed mb-3 font-light text-justify">
              {t.catalogueSection.description}
            </p>
            <p className="text-[11px] font-semibold text-[#FFFFFF]/85 flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-[#E40521] shrink-0" />
              <span>{t.catalogueSection.specs}</span>
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={t.catalogueSection.pdfUrl}
                download="Baldr-2026-Catalogue.pdf"
                onClick={() =>
                  triggerToast(
                    isFa
                      ? 'در حال دانلود فایل PDF کاتالوگ جامع بالدر ۲۰۲۶...'
                      : 'Downloading Baldr 2026 Master Catalogue PDF...'
                  )
                }
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-none bg-[#FFFFFF] text-[#111111] hover:bg-[#EAEAEA] transition-colors text-xs font-bold"
              >
                <Download className="w-4 h-4" />
                <span>{t.catalogueSection.downloadPdfBtn}</span>
              </a>

              <a
                href={`${homeHref}#about`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-transparent text-[#FFFFFF] hover:bg-white/15 border border-white/35 transition-colors text-xs font-semibold"
              >
                <span>{t.showroomSection.bookBtn}</span>
                <ArrowIcon className="w-3.5 h-3.5 text-[#E40521]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4 (PURE WHITE #FFFFFF): MINIMALIST ARCHITECTURAL FOOTER
          - Matches Homepage Footer 100%
         ===================================================================== */}
      <footer className="bg-[#FFFFFF] border-t border-[#E5E5E5] pt-16 pb-10 px-4 sm:px-8 lg:px-14 text-xs text-[#555555]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E5E5E5]">
            {/* Col 1: Brand & Brief About (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <Link href={homeHref} className="inline-flex flex-col leading-none cursor-pointer">
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
                      className="text-xs text-[#444444] hover:text-[#E40521] transition-colors inline-block cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Collections Filter Links (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold text-[#111111] mb-4">
                {t.footer.resourcesTitle}
              </h4>
              <ul className="space-y-2.5">
                {FLOS_CATEGORY_STRIP.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={buildUrl({ category: cat.filterSlug, page: null })}
                      scroll={false}
                      onClick={handleScrollToGrid}
                      className="text-xs text-[#444444] hover:text-[#E40521] transition-colors inline-block cursor-pointer"
                    >
                      {isFa ? cat.name_fa : cat.name_en}
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
                href={faCatalogHref}
                className={`px-3 py-1 rounded-none border text-xs font-bold transition-colors cursor-pointer ${
                  isFa
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                    : 'bg-transparent text-[#111111] border-[#E5E5E5] hover:border-[#111111]'
                }`}
              >
                Fa
              </Link>
              <Link
                href={enCatalogHref}
                className={`px-3 py-1 rounded-none border text-xs font-bold transition-colors cursor-pointer ${
                  !isFa
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                    : 'bg-transparent text-[#111111] border-[#E5E5E5] hover:border-[#111111]'
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
                          <span className="text-[#555555]">
                            {isFa ? 'متریال بدنه:' : 'Materials:'}
                          </span>
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
                          <span className="text-[#555555]">
                            {isFa ? 'منبع نوری:' : 'Light Source:'}
                          </span>
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
                            {activeProductModal.electrical_and_lighting.color_temperature_cct_en} •
                            CRI {activeProductModal.electrical_and_lighting.color_rendering_index_cri}
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

                  {/* B2B Architect Downloads Box */}
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

export default function BaldrProductsCatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFFFF]" />}>
      <ProductsCatalogContent />
    </Suspense>
  );
}


