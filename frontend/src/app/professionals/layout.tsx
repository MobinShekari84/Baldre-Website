import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'معماران و متخصصان نورپردازی | استودیو روشنایی بالدر',
  description:
    'پورتال تخصصی دفاتر معماری و مهندسان؛ دانلود فایل‌های ۳D CAD، فایل‌های فتومتریک IES، محاسبات Dialux و استعلام پروژه‌ای چراغ‌های بالدر.',
  alternates: {
    canonical: '/professionals',
    languages: {
      'fa-IR': '/professionals',
      'en-US': '/en/professionals',
      'x-default': '/professionals',
    },
  },
  openGraph: {
    title: 'پورتال معماران و متخصصان | بالدر',
    description:
      'همکاری با دفاتر معماری و طراحان نورپردازی؛ کتابخانه جامع CAD/IES و مشاوره مهندسی پروژه‌ها.',
    locale: 'fa_IR',
    alternateLocale: 'en_US',
    type: 'website',
  },
};

export default function ProfessionalsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
