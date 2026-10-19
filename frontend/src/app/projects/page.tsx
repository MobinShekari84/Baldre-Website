'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Building2,
  Calendar,
  Layers,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  Send,
  CheckCircle2,
} from 'lucide-react';
import {
  Lang,
  BaldrProject,
  FALLBACK_HOMEPAGE_DATA,
  UI_TEXT,
} from '@/data/baldreData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export default function BaldrProjectsPage() {
  const pathname = usePathname();
  const lang: Lang = pathname?.startsWith('/en') ? 'en' : 'fa';
  const isFa = lang === 'fa';
  const dir = isFa ? 'rtl' : 'ltr';
  const t = UI_TEXT[lang];
  const homeHref = isFa ? '/' : '/en';
  const productsBase = isFa ? '/products' : '/en/products';
  const projectsBase = isFa ? '/projects' : '/en/projects';
  const professionalsHref = isFa ? '/professionals' : '/en/professionals';
  const aboutHref = isFa ? '/about' : '/en/about';
  const contactHref = isFa ? '/contact' : '/en/contact';

  const [projects, setProjects] = useState<BaldrProject[]>(FALLBACK_HOMEPAGE_DATA.projects);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync HTML lang/dir
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // Fetch live projects from Django API
  useEffect(() => {
    let mounted = true;
    fetch(`${API_BASE}/projects/`)
      .then((res) => {
        if (!res.ok) throw new Error('Offline');
        return res.json();
      })
      .then((data: BaldrProject[]) => {
        if (mounted && Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  const ArrowIcon = isFa ? ArrowUpLeft : ArrowUpRight;

  const navItems = [
    { href: productsBase, label: t.nav.products, active: false },
    { href: projectsBase, label: t.nav.projects, active: true },
    { href: professionalsHref, label: t.nav.professionals, active: false },
    { href: aboutHref, label: t.nav.about, active: false },
    { href: contactHref, label: t.nav.contact, active: false },
  ];

  const filterTabs = [
    { id: 'all', label_fa: 'همه پروژه‌ها', label_en: 'All Projects' },
    { id: 'residential', label_fa: 'مسکونی مدرن', label_en: 'Residential' },
    { id: 'gallery', label_fa: 'گالری و تجاری', label_en: 'Gallery & Retail' },
    { id: 'villa', label_fa: 'ویلای لوکس', label_en: 'Private Villas' },
  ];

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return projects;
    if (selectedFilter === 'residential') {
      return projects.filter(
        (p) =>
          p.sector_fa.includes('مسکونی') ||
          p.sector_en.toLowerCase().includes('residential')
      );
    }
    if (selectedFilter === 'gallery') {
      return projects.filter(
        (p) =>
          p.sector_fa.includes('گالری') ||
          p.sector_en.toLowerCase().includes('gallery')
      );
    }
    if (selectedFilter === 'villa') {
      return projects.filter(
        (p) =>
          p.sector_fa.includes('ویلا') ||
          p.sector_en.toLowerCase().includes('villa')
      );
    }
    return projects;
  }, [projects, selectedFilter]);

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
          1. NAVIGATION BAR
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

          {/* Desktop Navigation */}
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

          {/* Language Switch */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              dir="ltr"
              className="inline-flex items-center rounded-none border bg-transparent border-[#E5E5E5]"
              role="group"
              aria-label="Language Switcher"
            >
              <Link
                href="/projects"
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isFa
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                Fa
              </Link>
              <Link
                href="/en/projects"
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
          2. HERO SECTION (Minimalist Architectural Header)
         ===================================================================== */}
      <section className="pt-36 pb-14 lg:pb-20 bg-[#FFFFFF] border-b border-[#EFECE6]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-widest text-[#E40521] uppercase block mb-3">
              {isFa ? 'پروژه‌های شاخص معماری' : 'Architectural Portfolio'}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight leading-tight mb-6">
              {isFa ? 'هم‌نشینی نور، فرم و ماده' : 'Light, Form & Tactile Matter'}
            </h1>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed text-justify font-light">
              {isFa
                ? 'مجموعه‌ای از برترین پروژه‌های مسکونی، ویلاها و گالری‌های اختصاصی در تهران و سایر نقاط که با سامانه‌های روشنایی سفارشی، نورپردازی خطی دقیق و مجسمه‌های نوری استودیو بالدر هویت یافته‌اند.'
                : 'A curated showcase of bespoke residences, private galleries, and architectural pavilions sculpted with Baldr precision optics, minimal linear profiles, and mouth-blown luminaires.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-10">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`text-xs font-semibold px-5 py-2.5 rounded-none transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'bg-[#F5F4F0] text-[#555555] hover:bg-[#EFECE6] hover:text-[#111111]'
                }`}
              >
                {isFa ? tab.label_fa : tab.label_en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. PROJECTS GRID (Cards linking to /projects/[slug])
         ===================================================================== */}
      <section className="py-16 lg:py-24 bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {filteredProjects.map((project) => (
              <Link
                key={project.slug}
                href={isFa ? `/projects/${project.slug}` : `/en/projects/${project.slug}`}
                className="group flex flex-col justify-between bg-transparent cursor-pointer"
              >
                <div>
                  {/* Project Image Frame */}
                  <div className="aspect-[16/11] rounded-none overflow-hidden bg-[#F5F4F0] relative mb-5">
                    <img
                      src={project.image_url}
                      alt={isFa ? project.title_fa : project.title_en}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                    <div className="absolute top-4 start-4 flex items-center gap-2">
                      <span
                        dir="ltr"
                        className="px-2.5 py-1 rounded-none bg-black/50 backdrop-blur-md text-[#FFFFFF] text-[11px] font-semibold border border-white/20"
                      >
                        {project.code}
                      </span>
                      <span className="px-2.5 py-1 rounded-none bg-white/90 backdrop-blur-md text-[#111111] text-[11px] font-medium">
                        {isFa ? project.sector_fa : project.sector_en}
                      </span>
                    </div>

                    <div className="absolute bottom-4 end-4 w-9 h-9 rounded-none bg-[#FFFFFF] text-[#111111] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-md">
                      <ArrowIcon className="w-4 h-4 text-[#E40521]" />
                    </div>
                  </div>

                  {/* Metadata & Title */}
                  <div className="text-[11px] text-[#777777] mb-1.5">
                    <span>{isFa ? project.location_fa : project.location_en}</span>
                    <span className="mx-1.5">•</span>
                    <span>{isFa ? project.architect_fa : project.architect_en}</span>
                  </div>

                  <h2 className="text-lg font-bold text-[#111111] group-hover:text-[#E40521] transition-colors mb-2 leading-snug">
                    {isFa ? project.title_fa : project.title_en}
                  </h2>

                  <p className="text-xs text-[#555555] font-light leading-relaxed text-justify mb-4 line-clamp-2">
                    {isFa ? project.summary_fa : project.summary_en}
                  </p>
                </div>

                {/* Bottom Bar: Luminaires used + Area */}
                <div
                  className="pt-3 border-t border-[#EFECE6] flex items-center justify-between gap-2 text-xs"
                  dir="ltr"
                >
                  <div className="flex flex-wrap gap-2">
                    {project.luminaires_used.slice(0, 3).map((sku) => (
                      <span
                        key={sku}
                        className="text-[11px] font-medium text-[#111111] bg-[#F5F4F0] px-2 py-0.5 rounded-none"
                      >
                        {sku}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] text-[#777777] font-semibold">
                    {project.metrics_json?.area_sqm || 400}m²
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. FOOTER
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
            <Link href={productsBase} className="hover:text-[#E40521] transition-colors cursor-pointer">
              {isFa ? 'کالکشن محصولات' : 'Products'}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
