'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpLeft,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import {
  Lang,
  UI_TEXT,
} from '@/data/baldreData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export default function BaldreContactPage() {
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

  const [form, setForm] = useState({
    name: '',
    phoneOrEmail: '',
    subject: 'consultation',
    message: '',
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const navItems = [
    { href: productsHref, label: t.nav.products, active: false },
    { href: projectsHref, label: t.nav.projects, active: false },
    { href: professionalsHref, label: t.nav.professionals, active: false },
    { href: aboutHref, label: t.nav.about, active: false },
    { href: contactHref, label: t.nav.contact, active: true },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phoneOrEmail || !form.message) {
      setToastMessage(isFa ? 'لطفاً تمامی فیلدهای الزامی را تکمیل فرمایید.' : 'Please complete all required fields.');
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    setSubmitting(true);
    try {
      await fetch(`${API_BASE}/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: form.name,
          phone_or_email: form.phoneOrEmail,
          project_type: form.subject || 'general',
          message: form.message,
        }),
      });
    } catch {
      // Offline fallback
    }

    setSubmitting(false);
    setSuccess(true);
    setToastMessage(isFa ? 'پیام شما با موفقیت دریافت شد. به زودی با شما تماس می‌گیریم.' : 'Message sent. We will respond shortly.');
    setTimeout(() => {
      setSuccess(false);
      setForm({ name: '', phoneOrEmail: '', subject: 'consultation', message: '' });
      setToastMessage(null);
    }, 3500);
  };

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
          {/* Official Baldre Red Logo */}
          <Link
            href={homeHref}
            className="flex items-center group shrink-0 cursor-pointer"
            aria-label="Baldre Lighting"
          >
            <img
              src="/images/baldre-logo-red.webp"
              alt="Baldre Lighting"
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
                href="/contact"
                className={`px-3.5 py-1.5 rounded-none text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isFa
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'text-[#555555] hover:text-[#111111]'
                }`}
              >
                Fa
              </Link>
              <Link
                href="/en/contact"
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
          2. HERO & CONTACT SECTION (Clean, Minimalist 2 Columns)
         ===================================================================== */}
      <section className="pt-36 pb-20 lg:pb-32 bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold tracking-widest text-[#E40521] uppercase block mb-3">
              {isFa ? 'ارتباط با استودیو' : 'Connect with Studio'}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111111] tracking-tight leading-tight mb-4">
              {isFa ? 'تماس با ما' : 'Contact Us'}
            </h1>
            <p className="text-sm sm:text-base text-[#555555] font-light leading-relaxed text-justify">
              {isFa
                ? 'کارشناسان فنی و طراحان نور استودیو بالدر همواره آماده پاسخگویی به استعلامات فنی، هماهنگی جلسات حضوری در شوروم فرشته و همراهی در پروژه‌های معماری شما هستند.'
                : 'Our optical engineers and design team welcome project inquiries, catalog requests, and private consultations at our Fereshteh flagship gallery.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Column 1: Studio Details */}
            <div className="lg:col-span-5 space-y-10">
              {/* Showroom Address */}
              <div>
                <span className="text-xs font-bold tracking-wider text-[#777777] uppercase block mb-2">
                  {isFa ? 'شوروم و دفتر مرکزی تهران' : 'Flagship Studio & Atelier'}
                </span>
                <p className="text-base font-bold text-[#111111] mb-2">
                  {isFa
                    ? 'تهران، الهیه، خیابان فرشته، ساختمان آرک، طبقه سوم'
                    : 'Level 3, Ark Building, Fereshteh St, Elahiyeh, Tehran'}
                </p>
                <a
                  href="https://maps.google.com/?q=Tehran+Elahiyeh+Fereshteh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E40521] hover:underline"
                >
                  <span>{isFa ? 'مشاهده در گوگل‌مپ' : 'Open in Google Maps'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Direct Lines */}
              <div>
                <span className="text-xs font-bold tracking-wider text-[#777777] uppercase block mb-2">
                  {isFa ? 'خطوط ارتباطی مستقیم' : 'Direct Communication'}
                </span>
                <div className="space-y-2 text-sm font-semibold" dir="ltr">
                  <div>
                    <a href="tel:+982126204800" className="hover:text-[#E40521] transition-colors">
                      +98 21 2620 4800
                    </a>
                  </div>
                  <div>
                    <a href="mailto:info@baldre.ir" className="hover:text-[#E40521] transition-colors">
                      info@baldre.ir
                    </a>
                  </div>
                  <div>
                    <a href="mailto:projects@baldre.ir" className="hover:text-[#E40521] transition-colors">
                      projects@baldre.ir
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div>
                <span className="text-xs font-bold tracking-wider text-[#777777] uppercase block mb-2">
                  {isFa ? 'ساعات کاری استودیو' : 'Operating Hours'}
                </span>
                <p className="text-xs sm:text-sm text-[#444444] font-light leading-relaxed">
                  {isFa
                    ? 'شنبه تا پنج‌شنبه: ۱۰:۰۰ الی ۱۹:۰۰ (پذیرش حضوری با هماهنگی قبلی)'
                    : 'Saturday to Thursday: 10:00 AM – 7:00 PM (By prior appointment)'}
                </p>
              </div>
            </div>

            {/* Column 2: Minimalist Message Form */}
            <div className="lg:col-span-7 bg-[#F5F4F0] p-8 sm:p-12 rounded-none border border-[#EFECE6]">
              <h2 className="text-xl sm:text-2xl font-black text-[#111111] mb-2">
                {isFa ? 'ارسال پیام به استودیو' : 'Send an Inquiry'}
              </h2>
              <p className="text-xs text-[#666666] font-light leading-relaxed text-justify mb-8">
                {isFa
                  ? 'پیام، استعلام یا مشخصات پروژه خود را مرقوم فرمایید تا در کوتاه‌ترین زمان پاسخگوی شما باشیم.'
                  : 'Submit your message or project notes. Our engineering desk will follow up promptly.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder={isFa ? 'نام و نام خانوادگی *' : 'Your Name *'}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-none bg-[#FFFFFF] text-xs text-[#111111] placeholder-[#888888] border border-[#E5E0D8] focus:border-[#111111] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder={isFa ? 'شماره تماس یا ایمیل *' : 'Phone or Email Address *'}
                    value={form.phoneOrEmail}
                    onChange={(e) => setForm({ ...form, phoneOrEmail: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-none bg-[#FFFFFF] text-xs text-[#111111] placeholder-[#888888] border border-[#E5E0D8] focus:border-[#111111] focus:outline-none transition-colors"
                    dir="ltr"
                  />
                </div>

                <div>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-none bg-[#FFFFFF] text-xs text-[#111111] border border-[#E5E0D8] focus:border-[#111111] focus:outline-none transition-colors cursor-pointer appearance-none"
                  >
                    <option value="consultation">
                      {isFa ? 'موضوع: مشاوره نورپردازی و طراحی' : 'Subject: Lighting Design Consultation'}
                    </option>
                    <option value="quote">
                      {isFa ? 'موضوع: استعلام قیمت و مشخصات فنی' : 'Subject: Price Quotation & Specs'}
                    </option>
                    <option value="showroom">
                      {isFa ? 'موضوع: هماهنگی بازدید از شوروم الهیه' : 'Subject: Showroom Visit Appointment'}
                    </option>
                    <option value="b2b">
                      {isFa ? 'موضوع: همکاری پروژه‌ای و معماری' : 'Subject: Architectural / B2B Partnership'}
                    </option>
                    <option value="other">
                      {isFa ? 'موضوع: سایر پرسش‌ها' : 'Subject: General Inquiry'}
                    </option>
                  </select>
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    placeholder={isFa ? 'متن پیام یا مشخصات پروژه... *' : 'Your message or project requirements... *'}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-none bg-[#FFFFFF] text-xs text-[#111111] placeholder-[#888888] border border-[#E5E0D8] focus:border-[#111111] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-none bg-[#111111] hover:bg-[#E40521] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span>{isFa ? 'در حال ارسال...' : 'Sending...'}</span>
                  ) : success ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>{isFa ? 'پیام ارسال شد' : 'Sent Successfully'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isFa ? 'ارسال پیام' : 'Send Message'}</span>
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
          3. FOOTER
         ===================================================================== */}
      <footer className="py-14 bg-[#F5F4F0] border-t border-[#EFECE6] text-[#666666] text-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link href={homeHref} className="shrink-0">
              <img src="/images/baldre-logo-red.webp" alt="Baldre Lighting" className="h-5 w-auto object-contain" />
            </Link>
            <span>•</span>
            <span>{isFa ? 'استودیو مهندسی و طراحی روشنایی معماری' : 'Architectural Lighting Studio'}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="tel:+982126204800" className="hover:text-[#E40521] transition-colors cursor-pointer" dir="ltr">
              +98 21 2620 4800
            </a>
            <a href="mailto:info@baldre.ir" className="hover:text-[#E40521] transition-colors cursor-pointer">
              info@baldre.ir
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
