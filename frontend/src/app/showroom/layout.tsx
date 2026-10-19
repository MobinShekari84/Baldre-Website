import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'شوروم مرکزی فرشته تهران | استودیو روشنایی بالدر',
  description:
    'بازدید از شوروم مرکزی بالدر در خیابان فرشته تهران؛ تجربه زنده نورپردازی معماری در مقیاس ۱:۱، تست دیمینگ هوشمند و رزرو وقت مشاوره خصوصی.',
  alternates: {
    canonical: '/showroom',
    languages: {
      'fa-IR': '/showroom',
      'en-US': '/en/showroom',
      'x-default': '/showroom',
    },
  },
  openGraph: {
    title: 'شوروم مرکزی فرشته تهران | بالدر',
    description:
      'فضای تخصصی نمایش چراغ‌های معماری بالدر در الهیه تهران با امکان رزرو وقت اختصاصی معماران و کارفرمایان.',
    locale: 'fa_IR',
    alternateLocale: 'en_US',
    type: 'website',
  },
};

export default function ShowroomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
