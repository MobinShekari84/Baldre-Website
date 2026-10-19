'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, usePathname } from 'next/navigation';
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
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Lang,
  BaldrProduct,
  FALLBACK_HOMEPAGE_DATA,
  FLOS_CATEGORY_STRIP,
  UI_TEXT,
} from '@/data/baldreData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export default function BaldrProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const pathname = usePathname();
  const slug = params?.slug || '';

  // Bilingual state: Farsi ('fa') at /products/[slug] or English ('en') at /en/products/[slug]
  const lang: Lang = pathname?.startsWith('/en') ? 'en' : 'fa';
  const isFa = lang === 'fa';
  const dir = isFa ? 'rtl' : 'ltr';
  const t = UI_TEXT[lang];
  const homeHref = isFa ? '/' : '/en';
  const productsBase = isFa ? '/products' : '/en/products';

  // All products (for related products & fallback lookup)
  const [allProducts, setAllProducts] = useState<BaldrProduct[]>(FALLBACK_HOMEPAGE_DATA.products);

  // Current product state (instant lookup from fallback, updated from Django API)
  const [product, setProduct] = useState<BaldrProduct | null>(() => {
    return (
      FALLBACK_HOMEPAGE_DATA.products.find((p) => p.slug === slug) ||
      FALLBACK_HOMEPAGE_DATA.products[0]
    );
  });
  const [notFound, setNotFound] = useState<boolean>(false);

  // Selected finish variant index
  const [selectedVariantIdx, setSelectedVariantIdx] = useState<number>(0);

  // Active gallery view: 'day' (primary/variant photo), 'night' (secondary lit photo), or 'blueprint'
  const [visualMode, setVisualMode] = useState<'day' | 'night' | 'blueprint'>('day');

  // Active specification tab on the product page
  const [activeTab, setActiveTab] = useState<'physical' | 'electrical' | 'blueprint' | 'downloads'>(
    'physical'
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync HTML lang/dir attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // Fetch live product detail & product list from Django REST API (so Admin edits/creations work live)
  useEffect(() => {
    if (!slug) return;
    let mounted = true;

    // 1. Check local fallback first for instant render
    const localMatch = FALLBACK_HOMEPAGE_DATA.products.find((p) => p.slug === slug);
    if (localMatch) {
      setProduct(localMatch);
      setNotFound(false);
    }

    // 2. Fetch live product detail from Django backend
    fetch(`${API_BASE}/products/${slug}/`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found in API');
        return res.json();
      })
      .then((apiProduct: BaldrProduct) => {
        if (mounted && apiProduct?.sku) {
          setProduct(apiProduct);
          setNotFound(false);
        }
      })
      .catch(() => {
        if (mounted && !localMatch) {
          setNotFound(true);
        }
      });

    // 3. Fetch full product list for Related Products section
    fetch(`${API_BASE}/products/`)
      .then((res) => {
        if (!res.ok) throw new Error('Offline');
        return res.json();
      })
      .then((apiList: BaldrProduct[]) => {
        if (mounted && Array.isArray(apiList) && apiList.length > 0) {
          setAllProducts(apiList);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, [slug]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const sameCategory = allProducts.filter(
      (p) => p.category_slug === product.category_slug && p.slug !== product.slug
    );
    const others = allProducts.filter(
      (p) => p.category_slug !== product.category_slug && p.slug !== product.slug
    );
    return [...sameCategory, ...others].slice(0, 3);
  }, [allProducts, product]);

  const ArrowIcon = isFa ? ArrowUpLeft : ArrowUpRight;
  const BreadcrumbChevron = isFa ? ChevronLeft : ChevronRight;

  const projectsHref = isFa ? '/projects' : '/en/projects';
  const professionalsHref = isFa ? '/professionals' : '/en/professionals';
  const aboutHref = isFa ? '/about' : '/en/about';
  const contactHref = isFa ? '/contact' : '/en/contact';

  // Navbar items (Showroom is housed inside About Us)
  const navItems = [
    { href: productsBase, label: t.nav.products, active: true },
    { href: projectsHref, label: t.nav.projects, active: false },
    { href: professionalsHref, label: t.nav.professionals, active: false },
    { href: aboutHref, label: t.nav.about, active: false },
    { href: contactHref, label: t.nav.contact, active: false },
  ];

  if (notFound || !product) {
    return (
      <div dir={dir} className="min-h-screen bg-[#FFFFFF] text-[#111111] font-farsi flex flex-col justify-between">
        <div className="pt-36 pb-24 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {isFa ? 'محصول مورد نظر یافت نشد.' : 'Luminaire not found.'}
          </h1>
          <Link
            href={productsBase}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-[#111111] text-[#FFFFFF] text-xs font-semibold cursor-pointer"
          >
            <span>{isFa ? 'بازگشت به کالکشن محصولات' : 'Back to Products'}</span>
            <ArrowIcon className="w-4 h-4 text-[#E40521]" />
          </Link>
        </div>
      </div>
    );
  }

  const faProductHref = `/products/${product.slug}`;
  const enProductHref = `/en/products/${product.slug}`;

  const activeVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const primaryImage = activeVariant ? activeVariant.hero_image_url : product.media.hero_image_url;
  const secondaryImage = product.media.gallery_images[0] || product.media.hero_image_url;
  const activeSku = activeVariant ? activeVariant.sku : product.sku;
  const activeFinishName = activeVariant
    ? isFa
      ? activeVariant.name_fa
      : activeVariant.name_en
    : isFa
    ? product.physical_specs.finish_color_fa
    : product.physical_specs.finish_color_en;

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
          FIXED RECTANGULAR NAVBAR (PURE WHITE OVER PRODUCT DETAIL PAGE)
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
                href={faProductHref}
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isFa ? 'bg-[#111111] text-[#FFFFFF]' : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                Fa
              </Link>
              <Link
                href={enProductHref}
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  !isFa ? 'bg-[#111111] text-[#FFFFFF]' : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                En
              </Link>
            </div>

            {/* Standardized Navbar CTA Button: "مشاهده کاتالوگ" */}
            <Link
              href={productsBase}
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
          SECTION 1 (PURE WHITE #FFFFFF): PRODUCT ARCHITECTURAL MONOGRAPH & SPECS
         ===================================================================== */}
      <main className="pt-28 lg:pt-32 pb-20 lg:pb-28 bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          {/* Minimalist Breadcrumb Bar */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-[#666666] pb-8 mb-10 border-b border-[#E5E5E5]"
          >
            <Link href={homeHref} className="hover:text-[#E40521] transition-colors cursor-pointer">
              {isFa ? 'بالدر' : 'Baldr'}
            </Link>
            <BreadcrumbChevron className="w-3.5 h-3.5 text-[#E40521]" />
            <Link href={productsBase} className="hover:text-[#E40521] transition-colors cursor-pointer">
              {t.nav.products}
            </Link>
            <BreadcrumbChevron className="w-3.5 h-3.5 text-[#E40521]" />
            <Link
              href={`${productsBase}?category=${product.category_slug}`}
              className="hover:text-[#E40521] transition-colors cursor-pointer"
            >
              {isFa ? product.identity.category_fa : product.identity.category}
            </Link>
            <BreadcrumbChevron className="w-3.5 h-3.5 text-[#E40521]" />
            <span className="text-[#111111] font-bold">
              {isFa ? product.identity.name_fa : product.identity.name_en}
            </span>
          </nav>

          {/* 2-Column Split: Visual Gallery (7 cols) + Technical Configurator & Tabs (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT / VISUAL COLUMN (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/5] w-full bg-[#FFFFFF] border border-[#E5E5E5] rounded-none overflow-hidden">
                <AnimatePresence mode="wait">
                  {visualMode === 'blueprint' ? (
                    <motion.div
                      key="blueprint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full flex flex-col items-center justify-center p-8 sm:p-14 bg-[#FFFFFF]"
                    >
                      <img
                        src={product.media.dimension_diagram_url}
                        alt="Engineering Blueprint"
                        className="w-full max-h-[75%] object-contain"
                      />
                      <div
                        dir="ltr"
                        className="mt-6 pt-4 border-t border-[#E5E5E5] w-full flex items-center justify-between text-xs font-semibold text-[#111111]"
                      >
                        <span>
                          L: {product.physical_specs.dimensions.length_mm}mm × W:{' '}
                          {product.physical_specs.dimensions.width_mm}mm × H:{' '}
                          {product.physical_specs.dimensions.height_mm}mm
                        </span>
                        <span>{product.physical_specs.weight_kg} kg</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.img
                      key={`${visualMode}-${primaryImage}`}
                      src={visualMode === 'night' ? secondaryImage : primaryImage}
                      alt={isFa ? product.identity.name_fa : product.identity.name_en}
                      initial={{ opacity: 0.35 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.35 }}
                      transition={{ duration: 0.45 }}
                      className="w-full h-full object-cover"
                    />
                  )}
                </AnimatePresence>

                {/* Top SKU & IP Badge */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                  <span
                    dir="ltr"
                    className="px-3 py-1 bg-black/65 backdrop-blur-xs text-[#FFFFFF] text-xs font-bold tracking-wider"
                  >
                    {activeSku}
                  </span>
                  <span
                    dir="ltr"
                    className="px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[#111111] text-xs font-bold border border-[#E5E5E5]"
                  >
                    {product.compliance.ip_rating}
                  </span>
                </div>

                {/* Bottom-End Icon-Only Daylight / Night Scene Toggle */}
                <div className="absolute bottom-4 end-4 inline-flex items-center bg-black/60 backdrop-blur-md border border-white/25">
                  <button
                    type="button"
                    onClick={() => setVisualMode('day')}
                    aria-label={t.hero.dayMode}
                    title={t.hero.dayMode}
                    className={`p-3 rounded-none transition-colors cursor-pointer ${
                      visualMode === 'day'
                        ? 'bg-[#FFFFFF] text-[#111111]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisualMode('night')}
                    aria-label={t.hero.nightMode}
                    title={t.hero.nightMode}
                    className={`p-3 rounded-none transition-colors cursor-pointer ${
                      visualMode === 'night'
                        ? 'bg-[#FFFFFF] text-[#111111]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip (Daylight Studio, Evening Lit, and Millimeter Blueprint) */}
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setVisualMode('day')}
                  className={`aspect-[16/10] rounded-none overflow-hidden border transition-all cursor-pointer relative ${
                    visualMode === 'day' ? 'border-[#111111] ring-1 ring-[#111111]' : 'border-[#E5E5E5]'
                  }`}
                >
                  <img
                    src={primaryImage}
                    alt={t.hero.dayMode}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1.5 start-1.5 px-2 py-0.5 bg-black/60 text-[#FFFFFF] text-[10px]">
                    {t.hero.dayMode}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setVisualMode('night')}
                  className={`aspect-[16/10] rounded-none overflow-hidden border transition-all cursor-pointer relative ${
                    visualMode === 'night'
                      ? 'border-[#111111] ring-1 ring-[#111111]'
                      : 'border-[#E5E5E5]'
                  }`}
                >
                  <img
                    src={secondaryImage}
                    alt={t.hero.nightMode}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1.5 start-1.5 px-2 py-0.5 bg-black/60 text-[#FFFFFF] text-[10px]">
                    {t.hero.nightMode}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setVisualMode('blueprint')}
                  className={`aspect-[16/10] rounded-none overflow-hidden border transition-all cursor-pointer relative bg-[#FFFFFF] flex items-center justify-center p-2 ${
                    visualMode === 'blueprint'
                      ? 'border-[#111111] ring-1 ring-[#111111]'
                      : 'border-[#E5E5E5]'
                  }`}
                >
                  <img
                    src={product.media.dimension_diagram_url}
                    alt={t.modal.blueprintTitle}
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute bottom-1.5 start-1.5 px-2 py-0.5 bg-[#111111] text-[#FFFFFF] text-[10px]">
                    {t.modal.blueprintTitle}
                  </span>
                </button>
              </div>
            </div>

            {/* RIGHT / SPECIFICATION & TABS COLUMN (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Category & Designer Meta */}
                <div className="flex items-center justify-between gap-2 text-xs text-[#666666] mb-2">
                  <span>{isFa ? product.identity.category_fa : product.identity.category}</span>
                  <span>
                    {isFa ? product.identity.designer_fa : product.identity.designer_en} •{' '}
                    {product.identity.year}
                  </span>
                </div>

                {/* Product Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] leading-snug mb-4">
                  {isFa ? product.identity.name_fa : product.identity.name_en}
                </h1>

                {/* Long Architectural Description */}
                <p className="text-xs sm:text-sm text-[#444444] leading-[1.9] text-justify mb-6">
                  {isFa
                    ? product.identity.long_description_fa || product.identity.short_description_fa
                    : product.identity.long_description_en || product.identity.short_description_en}
                </p>

                {/* Interactive Finish / Variant Selector */}
                {product.variants.length > 0 && (
                  <div className="py-5 border-t border-b border-[#E5E5E5] mb-6">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-[#666666]">{t.modal.selectVariant}</span>
                      <span className="font-bold text-[#111111]">{activeFinishName}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {product.variants.map((v, idx) => {
                        const isSelected = selectedVariantIdx === idx;
                        return (
                          <button
                            key={`${product.sku}-${v.sku}-${idx}`}
                            type="button"
                            onClick={() => {
                              setSelectedVariantIdx(idx);
                              if (visualMode === 'blueprint') setVisualMode('day');
                            }}
                            className={`flex items-center gap-2.5 px-3.5 py-2 rounded-none border text-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#111111] bg-[#111111] text-[#FFFFFF] font-bold'
                                : 'border-[#E5E5E5] bg-transparent text-[#333333] hover:border-[#111111]'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-none border border-white/40 shrink-0"
                              style={{ backgroundColor: v.hex }}
                            />
                            <span>{isFa ? v.name_fa : v.name_en}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4-Column Quick Photometric Telemetry Strip */}
                <div
                  dir="ltr"
                  className="grid grid-cols-4 border border-[#E5E5E5] divide-x divide-[#E5E5E5] mb-8 text-center"
                >
                  <div className="py-3 px-2">
                    <div className="text-[10px] text-[#777777] uppercase">Power</div>
                    <div className="text-xs sm:text-sm font-bold text-[#111111] mt-0.5">
                      {product.electrical_and_lighting.wattage_w}W
                    </div>
                  </div>
                  <div className="py-3 px-2">
                    <div className="text-[10px] text-[#777777] uppercase">Flux</div>
                    <div className="text-xs sm:text-sm font-bold text-[#111111] mt-0.5">
                      {product.electrical_and_lighting.luminous_flux_lm} lm
                    </div>
                  </div>
                  <div className="py-3 px-2">
                    <div className="text-[10px] text-[#777777] uppercase">CRI</div>
                    <div className="text-xs sm:text-sm font-bold text-[#111111] mt-0.5">
                      {product.electrical_and_lighting.color_rendering_index_cri}
                    </div>
                  </div>
                  <div className="py-3 px-2">
                    <div className="text-[10px] text-[#777777] uppercase">Beam</div>
                    <div className="text-xs sm:text-sm font-bold text-[#111111] mt-0.5">
                      {product.electrical_and_lighting.beam_angle_degrees}°
                    </div>
                  </div>
                </div>

                {/* =========================================================
                    INTERACTIVE SPECIFICATION TABS (Physical / Optical / Blueprint / Downloads)
                   ========================================================= */}
                <div className="flex items-center gap-5 border-b border-[#E5E5E5] mb-6 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'physical', label: t.modal.identityTab },
                    { id: 'electrical', label: t.modal.electricalTab },
                    { id: 'blueprint', label: t.modal.blueprintTitle },
                    { id: 'downloads', label: isFa ? 'فایل‌های فنی (CAD/IES)' : 'CAD / IES Files' },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() =>
                          setActiveTab(
                            tab.id as 'physical' | 'electrical' | 'blueprint' | 'downloads'
                          )
                        }
                        className={`pb-3 text-xs font-bold whitespace-nowrap transition-colors cursor-pointer relative ${
                          isActive
                            ? 'text-[#111111] after:content-[""] after:absolute after:bottom-[-1px] after:inset-x-0 after:h-[2px] after:bg-[#E40521]'
                            : 'text-[#666666] hover:text-[#111111]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab 1: Physical Specifications */}
                {activeTab === 'physical' && (
                  <div className="divide-y divide-[#E5E5E5] text-xs mb-8">
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">{isFa ? 'کد فنی (SKU):' : 'SKU:'}</span>
                      <span dir="ltr" className="font-bold text-[#111111]">
                        {activeSku}
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">{isFa ? 'متریال بدنه:' : 'Materials:'}</span>
                      <span className="font-bold text-[#111111]">
                        {(isFa
                          ? product.physical_specs.materials_fa
                          : product.physical_specs.materials_en
                        ).join('، ')}
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">{isFa ? 'فینیش و رنگ:' : 'Finish:'}</span>
                      <span className="font-bold text-[#111111]">{activeFinishName}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">{isFa ? 'نحوه نصب:' : 'Mounting:'}</span>
                      <span className="font-bold text-[#111111]">
                        {isFa
                          ? product.physical_specs.mounting_type_fa
                          : product.physical_specs.mounting_type_en}
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">
                        {isFa ? 'ابعاد (طول × عرض × ارتفاع):' : 'Dimensions (L × W × H):'}
                      </span>
                      <span dir="ltr" className="font-bold text-[#111111]">
                        {product.physical_specs.dimensions.length_mm} ×{' '}
                        {product.physical_specs.dimensions.width_mm} ×{' '}
                        {product.physical_specs.dimensions.height_mm} mm
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">{isFa ? 'وزن خالص:' : 'Net Weight:'}</span>
                      <span dir="ltr" className="font-bold text-[#111111]">
                        {product.physical_specs.weight_kg} kg
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">
                        {isFa ? 'درجه حفاظت و عایق:' : 'Compliance:'}
                      </span>
                      <span dir="ltr" className="font-bold text-[#111111]">
                        {product.compliance.ip_rating} • {product.compliance.insulation_class_en} •{' '}
                        {product.compliance.energy_class}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Electrical & Photometric Specifications */}
                {activeTab === 'electrical' && (
                  <div className="divide-y divide-[#E5E5E5] text-xs mb-8">
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">{isFa ? 'منبع نوری:' : 'Light Source:'}</span>
                      <span className="font-bold text-[#111111]">
                        {isFa
                          ? product.electrical_and_lighting.light_source_fa
                          : product.electrical_and_lighting.light_source_en}
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">
                        {isFa ? 'توان مصرفی و شار نوری:' : 'Power & Luminous Flux:'}
                      </span>
                      <span dir="ltr" className="font-bold text-[#111111]">
                        {product.electrical_and_lighting.wattage_w}W •{' '}
                        {product.electrical_and_lighting.luminous_flux_lm} lm
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">
                        {isFa ? 'دمای رنگ (CCT):' : 'Color Temperature (CCT):'}
                      </span>
                      <span className="font-bold text-[#111111]">
                        {isFa
                          ? product.electrical_and_lighting.color_temperature_cct_fa
                          : product.electrical_and_lighting.color_temperature_cct_en}
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">
                        {isFa ? 'شاخص نمود رنگ و زاویه تابش:' : 'CRI & Beam Angle:'}
                      </span>
                      <span dir="ltr" className="font-bold text-[#111111]">
                        CRI {product.electrical_and_lighting.color_rendering_index_cri} •{' '}
                        {product.electrical_and_lighting.beam_angle_degrees}°
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">
                        {isFa ? 'پروتکل دیم و کنترل:' : 'Control & Dimming:'}
                      </span>
                      <span className="font-bold text-[#111111]">
                        {isFa
                          ? product.electrical_and_lighting.dimmability_fa
                          : product.electrical_and_lighting.dimmability_en}
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-[#555555]">
                        {isFa ? 'ولتاژ ورودی و محل درایور:' : 'Voltage & Driver:'}
                      </span>
                      <span className="font-bold text-[#111111]">
                        {product.electrical_and_lighting.input_voltage} —{' '}
                        {isFa
                          ? product.electrical_and_lighting.driver_location_fa
                          : product.electrical_and_lighting.driver_location_en}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tab 3: Engineering Blueprint */}
                {activeTab === 'blueprint' && (
                  <div className="border border-[#E5E5E5] p-5 mb-8">
                    <img
                      src={product.media.dimension_diagram_url}
                      alt="Engineering Blueprint"
                      className="w-full h-auto mb-4"
                    />
                    <div
                      dir="ltr"
                      className="pt-3 border-t border-[#E5E5E5] flex items-center justify-between text-xs font-semibold text-[#111111]"
                    >
                      <span>
                        L: {product.physical_specs.dimensions.length_mm}mm × W:{' '}
                        {product.physical_specs.dimensions.width_mm}mm × H:{' '}
                        {product.physical_specs.dimensions.height_mm}mm
                      </span>
                      <span>
                        {product.physical_specs.suspension_cable_max_mm > 0
                          ? `Cable Max: ${product.physical_specs.suspension_cable_max_mm}mm`
                          : `${product.physical_specs.weight_kg} kg`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Tab 4: B2B Architect Downloads (CAD / IES / PDF) */}
                {activeTab === 'downloads' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {[
                      {
                        label: t.modal.datasheetBtn,
                        file: product.professional_downloads.data_sheet_pdf,
                      },
                      {
                        label: t.modal.manualBtn,
                        file: product.professional_downloads.installation_manual_pdf_fa,
                      },
                      {
                        label: t.modal.iesBtn,
                        file: product.professional_downloads.photometric_ies_file,
                      },
                      {
                        label: t.modal.cadBtn,
                        file: product.professional_downloads.cad_3d_file,
                      },
                    ].map((d) => (
                      <a
                        key={d.label}
                        href={d.file}
                        download
                        onClick={() =>
                          triggerToast(
                            isFa
                              ? `در حال دانلود ${d.label} (${activeSku})`
                              : `Downloading ${d.label} (${activeSku})`
                          )
                        }
                        className="flex items-center justify-between px-4 py-3.5 rounded-none bg-transparent hover:bg-[#111111] hover:text-[#FFFFFF] text-[#111111] border border-[#E5E5E5] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <span>{d.label}</span>
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Primary CTA Buttons (Showroom / Project Inquiry & Back to Catalog) */}
              <div className="pt-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row gap-3">
                <Link
                  href={contactHref}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-none bg-[#111111] text-[#FFFFFF] hover:bg-[#222222] transition-colors text-xs font-bold cursor-pointer"
                >
                  <span>
                    {isFa
                      ? 'استعلام پروژه و رزرو بازدید شوروم'
                      : 'Project Inquiry & Showroom Visit'}
                  </span>
                  <ArrowIcon className="w-4 h-4 text-[#E40521]" />
                </Link>
                <Link
                  href={productsBase}
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-none bg-transparent text-[#111111] hover:border-[#111111] border border-[#E5E5E5] transition-colors text-xs font-semibold cursor-pointer"
                >
                  <span>{isFa ? 'همه محصولات' : 'All Products'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =====================================================================
          SECTION 2 (PURE WHITE #FFFFFF): RELATED LUMINAIRES IN COLLECTION
         ===================================================================== */}
      {relatedProducts.length > 0 && (
        <section className="py-20 lg:py-24 bg-[#FFFFFF] border-t border-[#E5E5E5]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-[#111111]">
                {isFa ? 'محصولات مشابه در این کالکشن' : 'Related Luminaires'}
              </h2>
              <Link
                href={productsBase}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] hover:opacity-75 transition-opacity cursor-pointer"
              >
                <span>{isFa ? 'مشاهده همه محصولات' : 'View All Luminaires'}</span>
                <ArrowIcon className="w-3.5 h-3.5 text-[#E40521]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.sku}
                  href={`${productsBase}/${rel.slug}`}
                  className="group block bg-[#FFFFFF] rounded-none cursor-pointer"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FFFFFF] rounded-none mb-4">
                    <img
                      src={rel.media.hero_image_url}
                      alt={isFa ? rel.identity.name_fa : rel.identity.name_en}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <span
                      dir="ltr"
                      className="absolute top-3 start-3 px-2.5 py-1 bg-black/55 text-[#FFFFFF] text-[10px] font-semibold"
                    >
                      {rel.sku}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#111111] group-hover:text-[#E40521] transition-colors mb-1">
                    {isFa ? rel.identity.name_fa : rel.identity.name_en}
                  </h3>
                  <div
                    dir="ltr"
                    className="text-[11px] text-[#666666] pt-2 border-t border-[#E5E5E5]"
                  >
                    {rel.electrical_and_lighting.wattage_w}W •{' '}
                    {rel.electrical_and_lighting.luminous_flux_lm}lm • CRI{' '}
                    {rel.electrical_and_lighting.color_rendering_index_cri}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 3 (FULL-SCREEN IMAGE): OPEN CATALOGUE & BIM LIBRARY
         ===================================================================== */}
      <section className="relative w-full min-h-[70vh] overflow-hidden bg-[#111111] flex items-end py-20 lg:py-24">
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
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-none bg-[#FFFFFF] text-[#111111] hover:bg-[#EAEAEA] transition-colors text-xs font-bold"
              >
                <Download className="w-4 h-4" />
                <span>{t.catalogueSection.downloadPdfBtn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4 (PURE WHITE #FFFFFF): MINIMALIST ARCHITECTURAL FOOTER
         ===================================================================== */}
      <footer className="bg-[#FFFFFF] border-t border-[#E5E5E5] pt-16 pb-10 px-4 sm:px-8 lg:px-14 text-xs text-[#555555]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E5E5E5]">
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

            <div className="lg:col-span-3">
              <h4 className="text-xs font-bold text-[#111111] mb-4">
                {t.footer.resourcesTitle}
              </h4>
              <ul className="space-y-2.5">
                {FLOS_CATEGORY_STRIP.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`${productsBase}?category=${cat.filterSlug}`}
                      className="text-xs text-[#444444] hover:text-[#E40521] transition-colors inline-block cursor-pointer"
                    >
                      {isFa ? cat.name_fa : cat.name_en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

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

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span>{t.footer.copyright}</span>
            <div className="flex items-center gap-2" dir="ltr">
              <Link
                href={faProductHref}
                className={`px-3 py-1 rounded-none border text-xs font-bold transition-colors cursor-pointer ${
                  isFa
                    ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                    : 'bg-transparent text-[#111111] border-[#E5E5E5] hover:border-[#111111]'
                }`}
              >
                Fa
              </Link>
              <Link
                href={enProductHref}
                className={`px-3 py-1 rounded-none border text-xs font-bold transition-colors cursor-pointer ${
                  !isFa
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'bg-transparent text-[#111111] border-[#E5E5E5] hover:border-[#111111]'
                }`}
              >
                En
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


