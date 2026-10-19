import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'کالکشن محصولات و چراغ‌های معماری | صنایع روشنایی بالدر (Baldr)',
  description:
    'مشاهده و فیلتر تخصصی کالکشن چراغ‌های معماری و دکوراتیو بالدر (آویزهای خطی، لوسترهای مجسمه‌ای، چراغ‌های دیواری و دفنی، سیستم‌های مگنتی ۴۸ ولت و چراغ‌های پارکی IP65) همراه با دانلود فایل‌های فنی CAD و IES.',
  alternates: {
    canonical: '/products',
    languages: {
      'fa-IR': '/products',
      'en-US': '/en/products',
      'x-default': '/products',
    },
  },
  openGraph: {
    title: 'کالکشن محصولات و چراغ‌های معماری | بالدر (Baldr Lighting)',
    description:
      'کالکشن کامل چراغ‌های معماری بالدر با فیلتر فنی دمای رنگ، پروتکل DALI-2، درجه حفاظت IP و دانلود مستقیم فایل‌های مهندسی.',
    locale: 'fa_IR',
    alternateLocale: 'en_US',
    type: 'website',
  },
};

export default function BaldrFarsiProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
