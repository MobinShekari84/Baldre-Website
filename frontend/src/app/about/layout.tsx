import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'درباره ما | استودیو طراحی و مهندسی روشنایی بالدر',
  description:
    'آشنایی با فلسفه طراحی، استانداردهای اپتیکی موزه‌ای (CRI >97) و مهندسی دقیق چراغ‌های معماری استودیو بالدر در تهران.',
  alternates: {
    canonical: '/about',
    languages: {
      'fa-IR': '/about',
      'en-US': '/en/about',
      'x-default': '/about',
    },
  },
  openGraph: {
    title: 'درباره ما | استودیو طراحی و مهندسی روشنایی بالدر',
    description:
      'خلق راهکارهای نوری مینیمال و ماندگار با تلفیق متریال‌های اصیل و تکنولوژی اپتیکال پیشرفته در استودیو بالدر.',
    locale: 'fa_IR',
    alternateLocale: 'en_US',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
