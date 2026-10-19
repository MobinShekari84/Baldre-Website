'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowUpLeft,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
} from 'lucide-react';
import {
  Lang,
  BaldrProject,
  BaldrProduct,
  FALLBACK_HOMEPAGE_DATA,
  UI_TEXT,
} from '@/data/baldrData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export default function BaldrProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const pathname = usePathname();
  const slug = params?.slug || '';

  const lang: Lang = pathname?.startsWith('/en') ? 'en' : 'fa';
  const isFa = lang === 'fa';
  const dir = isFa ? 'rtl' : 'ltr';
  const t = UI_TEXT[lang];

  const homeHref = isFa ? '/' : '/en';
  const projectsBase = isFa ? '/projects' : '/en/projects';
  const productsBase = isFa ? '/products' : '/en/products';
  const professionalsHref = isFa ? '/professionals' : '/en/professionals';
  const aboutHref = isFa ? '/about' : '/en/about';
  const contactHref = isFa ? '/contact' : '/en/contact';

  const [allProjects, setAllProjects] = useState<BaldrProject[]>(FALLBACK_HOMEPAGE_DATA.projects);
  const [allProducts, setAllProducts] = useState<BaldrProduct[]>(FALLBACK_HOMEPAGE_DATA.products);

  const [project, setProject] = useState<BaldrProject | null>(() => {
    return (
      FALLBACK_HOMEPAGE_DATA.projects.find((p) => p.slug === slug) ||
      FALLBACK_HOMEPAGE_DATA.projects[0]
    );
  });
  const [notFound, setNotFound] = useState<boolean>(false);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    if (!slug) return;
    let mounted = true;

    const localMatch = FALLBACK_HOMEPAGE_DATA.projects.find((p) => p.slug === slug);
    if (localMatch) {
      setProject(localMatch);
      setNotFound(false);
    }

    fetch(`${API_BASE}/projects/${slug}/`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((apiProject: BaldrProject) => {
        if (mounted && apiProject?.slug) {
          setProject(apiProject);
          setNotFound(false);
        }
      })
      .catch(() => {
        if (mounted && !localMatch) {
          setNotFound(true);
        }
      });

    fetch(`${API_BASE}/projects/`)
      .then((res) => res.json())
      .then((apiList: BaldrProject[]) => {
        if (mounted && Array.isArray(apiList) && apiList.length > 0) {
          setAllProjects(apiList);
        }
      })
      .catch(() => {});

    fetch(`${API_BASE}/products/`)
      .then((res) => res.json())
      .then((apiProducts: BaldrProduct[]) => {
        if (mounted && Array.isArray(apiProducts) && apiProducts.length > 0) {
          setAllProducts(apiProducts);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, [slug]);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [slug]);

  const galleryImages = useMemo(() => {
    if (!project) return [];
    if (project.gallery_images && project.gallery_images.length > 0) {
      return project.gallery_images;
    }
    return [project.image_url];
  }, [project]);

  const { prevProject, nextProject } = useMemo(() => {
    if (!project || allProjects.length <= 1) return { prevProject: null, nextProject: null };
    const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
    if (currentIndex === -1) return { prevProject: null, nextProject: null };

    const prev = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
    const next = allProjects[(currentIndex + 1) % allProjects.length];
    return { prevProject: prev, nextProject: next };
  }, [allProjects, project]);

  const specifiedLuminaires = useMemo(() => {
    if (!project || !project.luminaires_used) return [];
    return project.luminaires_used.map((sku) => {
      const matched = allProducts.find((prod) => prod.sku === sku);
      return { sku, product: matched || null };
    });
  }, [project, allProducts]);

  const ArrowIcon = isFa ? ArrowUpLeft : ArrowUpRight;
  const NextChevron = isFa ? ChevronLeft : ChevronRight;
  const PrevChevron = isFa ? ChevronRight : ChevronLeft;

  const navItems = [
    { href: productsBase, label: t.nav.products, active: false },
    { href: projectsBase, label: t.nav.projects, active: true },
    { href: professionalsHref, label: t.nav.professionals, active: false },
    { href: aboutHref, label: t.nav.about, active: false },
    { href: contactHref, label: t.nav.contact, active: false },
  ];

  if (notFound || !project) {
    return (
      <div dir={dir} className="min-h-screen bg-[#FFFFFF] text-[#111111] font-farsi flex flex-col justify-between selection:bg-[#E40521] selection:text-[#FFFFFF]">
        <div className="pt-36 pb-24 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 text-center">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            {isFa ? 'پروژه معماری مورد نظر یافت نشد.' : 'Architectural project not found.'}
          </h1>
          <Link
            href={projectsBase}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-none bg-[#111111] text-[#FFFFFF] text-xs font-semibold hover:bg-[#E40521] transition-colors cursor-pointer"
          >
            <span>{isFa ? 'بازگشت به آرشیو پروژه‌ها' : 'Back to Projects'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      dir={dir}
      className="min-h-screen bg-[#FFFFFF] text-[#111111] font-farsi selection:bg-[#E40521] selection:text-[#FFFFFF]"
    >
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
                href={`/projects/${project.slug}`}
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isFa
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                Fa
              </Link>
              <Link
                href={`/en/projects/${project.slug}`}
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
          2. MINIMAL TOP BAR
         ===================================================================== */}
      <section className="pt-28 pb-4 bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 flex items-center justify-between text-xs text-[#777777]">
          <Link
            href={projectsBase}
            className="inline-flex items-center gap-2 hover:text-[#111111] transition-colors cursor-pointer font-medium"
          >
            <ChevronLeft className={`w-3.5 h-3.5 ${isFa ? '' : 'rotate-180'}`} />
            <span>{isFa ? 'آرشیو تمام پروژه‌ها' : 'All Projects'}</span>
          </Link>

          <div className="flex items-center gap-3" dir="ltr">
            <span className="font-mono text-[#111111] font-semibold">{project.code}</span>
            <span className="text-[#D5D2CD]">•</span>
            <span>{project.year}</span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. HERO SHOT (Atmospheric, Full Width, Clean)
         ===================================================================== */}
      <section className="pb-8 lg:pb-12 bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full rounded-none overflow-hidden bg-[#F5F4F0] mb-8">
            <img
              src={galleryImages[activeImageIdx] || project.image_url}
              alt={isFa ? project.title_fa : project.title_en}
              className="w-full h-full object-cover transition-all duration-700"
            />
          </div>

          {/* Clean Title & Metadata Line */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#EFECE6]">
            <div>
              <span className="text-xs font-semibold text-[#E40521] uppercase tracking-wider block mb-1">
                {isFa ? project.sector_fa : project.sector_en}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight">
                {isFa ? project.title_fa : project.title_en}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#555555]">
              <div>
                <span className="text-[#888888] block text-[11px] mb-0.5">{isFa ? 'معمار' : 'Architect'}</span>
                <span className="font-bold text-[#111111]">{isFa ? project.architect_fa : project.architect_en}</span>
              </div>
              <span className="text-[#E0DDD7] hidden sm:inline">|</span>
              <div>
                <span className="text-[#888888] block text-[11px] mb-0.5">{isFa ? 'موقعیت' : 'Location'}</span>
                <span className="font-bold text-[#111111]">{isFa ? project.location_fa : project.location_en}</span>
              </div>
              <span className="text-[#E0DDD7] hidden sm:inline">|</span>
              <div>
                <span className="text-[#888888] block text-[11px] mb-0.5">{isFa ? 'شاخص فتومتریک' : 'Photometrics'}</span>
                <span className="font-bold text-[#111111]" dir="ltr">{project.metrics_json?.cri || 'CRI >97'} • {project.metrics_json?.control || 'DALI-2'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. EDITORIAL NARRATIVE (Airy & Pure)
         ===================================================================== */}
      <section className="py-12 lg:py-16 bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="max-w-3xl space-y-6 text-sm sm:text-base text-[#444444] font-light leading-relaxed text-justify">
            <p className="text-base sm:text-lg font-normal text-[#111111] leading-relaxed">
              {isFa ? project.summary_fa : project.summary_en}
            </p>
            <p>
              {isFa
                ? project.description_fa ||
                  'در این پروژه، نور به عنوان ماده‌ای نامرئی برای ساختاردهی به فضا و ادراک حجم‌ها عمل می‌کند. خطوط نوری و دیفیوزرهای شیشه‌ای اپال با حذف کامل خیرگی، درخشش نرم و گرمی را بر روی بافت سنگ و چوب طبیعی ساطع می‌نمایند.'
                : project.description_en ||
                  'In this installation, illumination acts as an invisible material sculpting volume and tactile serenity. Linear profiles and opal diffusers eliminate glare, delivering a tranquil glow over natural stone and wood.'}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. SPATIAL GALLERY (Large Minimalist Photos)
         ===================================================================== */}
      {galleryImages.length > 1 && (
        <section className="py-8 lg:py-14 bg-[#FFFFFF]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {galleryImages.slice(1).map((imgUrl, idx) => (
                <div key={imgUrl + idx} className="aspect-[16/11] rounded-none overflow-hidden bg-[#F5F4F0]">
                  <img
                    src={imgUrl}
                    alt={`${isFa ? project.title_fa : project.title_en} - View ${idx + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          6. SPECIFIED LUMINAIRES (Minimal, Elegant Product Strip)
         ===================================================================== */}
      {specifiedLuminaires.length > 0 && (
        <section className="py-16 lg:py-20 bg-[#FAFAFA] border-t border-[#EFECE6]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-black text-[#111111]">
                {isFa ? 'چراغ‌های اجراشده در پروژه' : 'Specified Luminaires'}
              </h2>
              <Link
                href={productsBase}
                className="text-xs font-semibold text-[#111111] hover:text-[#E40521] transition-colors inline-flex items-center gap-1"
              >
                <span>{isFa ? 'مشاهده کاتالوگ' : 'View Catalog'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specifiedLuminaires.map(({ sku, product: matchedProd }) => (
                <Link
                  key={sku}
                  href={matchedProd ? (isFa ? `/products/${matchedProd.slug}` : `/en/products/${matchedProd.slug}`) : productsBase}
                  className="p-5 rounded-none bg-[#FFFFFF] border border-[#E5E0D8] hover:border-[#111111] transition-all flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-none bg-[#F5F4F0] overflow-hidden shrink-0">
                    <img
                      src={matchedProd?.media?.hero_image_url || matchedProd?.media?.gallery_images?.[0] || '/images/flos-prod-pendant.webp'}
                      alt={matchedProd ? (isFa ? matchedProd.identity.name_fa : matchedProd.identity.name_en) : sku}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-[#888888] block">{sku}</span>
                    <h3 className="text-sm font-bold text-[#111111] group-hover:text-[#E40521] transition-colors truncate">
                      {matchedProd ? (isFa ? matchedProd.identity.name_fa : matchedProd.identity.name_en) : sku}
                    </h3>
                    <span className="text-[11px] text-[#666666] block">
                      {matchedProd ? (isFa ? matchedProd.identity.category_fa : matchedProd.identity.category) : (isFa ? 'چراغ معماری بالدر' : 'Baldr Luminaire')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          7. NEXT / PREVIOUS NAVIGATION & SUBTLE CONSULTATION
         ===================================================================== */}
      <section className="py-14 bg-[#FFFFFF] border-t border-[#EFECE6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {prevProject && (
              <Link
                href={isFa ? `/projects/${prevProject.slug}` : `/en/projects/${prevProject.slug}`}
                className="p-6 rounded-none bg-[#F5F4F0] hover:bg-[#EFECE6] transition-colors flex items-center gap-4 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shrink-0 group-hover:bg-[#E40521] group-hover:text-white transition-colors">
                  <PrevChevron className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#777777] block">{isFa ? 'پروژه قبلی' : 'Previous'}</span>
                  <p className="text-sm font-bold text-[#111111] group-hover:text-[#E40521] transition-colors">
                    {isFa ? prevProject.title_fa : prevProject.title_en}
                  </p>
                </div>
              </Link>
            )}

            {nextProject && (
              <Link
                href={isFa ? `/projects/${nextProject.slug}` : `/en/projects/${nextProject.slug}`}
                className="p-6 rounded-none bg-[#F5F4F0] hover:bg-[#EFECE6] transition-colors flex items-center justify-between gap-4 cursor-pointer sm:text-end group"
              >
                <div className="sm:order-2 w-10 h-10 rounded-none bg-white flex items-center justify-center shrink-0 group-hover:bg-[#E40521] group-hover:text-white transition-colors">
                  <NextChevron className="w-5 h-5" />
                </div>
                <div className="sm:order-1">
                  <span className="text-[11px] text-[#777777] block">{isFa ? 'پروژه بعدی' : 'Next'}</span>
                  <p className="text-sm font-bold text-[#111111] group-hover:text-[#E40521] transition-colors">
                    {isFa ? nextProject.title_fa : nextProject.title_en}
                  </p>
                </div>
              </Link>
            )}
          </div>

          {/* Minimal Consultation Line */}
          <div className="p-6 rounded-none bg-[#F5F4F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#555555]">
            <span>
              {isFa
                ? 'استعلام و مشاوره فنی برای اجرای پروژه‌های معماری:'
                : 'Project specification and lighting engineering inquiry:'}
            </span>
            <div className="flex items-center gap-6 font-bold text-[#111111]">
              <a href="mailto:projects@baldr.ir" className="hover:text-[#E40521] transition-colors">
                projects@baldr.ir
              </a>
              <span className="text-[#CCCCCC]">•</span>
              <a href="tel:+982126204800" className="hover:text-[#E40521] transition-colors" dir="ltr">
                +98 21 2620 4800
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. FOOTER
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
            <Link href={projectsBase} className="hover:text-[#E40521] transition-colors cursor-pointer">
              {isFa ? 'آرشیو پروژه‌ها' : 'Projects'}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
