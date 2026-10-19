import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تماس با ما | استودیو طراحی و مهندسی روشنایی بالدر',
  description:
    'راه‌های ارتباط با استودیو روشنایی بالدر؛ شماره‌های تماس مستقیم، ایمیل‌های دپارتمان مهندسی و آدرس شوروم مرکزی در خیابان فرشته تهران.',
  alternates: {
    canonical: '/contact',
    languages: {
      'fa-IR': '/contact',
      'en-US': '/en/contact',
      'x-default': '/contact',
    },
  },
  openGraph: {
    title: 'تماس با استودیو بالدر | تهران',
    description:
      'ارتباط مستقیم با تیم مهندسی نور و رزرو وقت مشاوره در شوروم فرشته تهران.',
    locale: 'fa_IR',
    alternateLocale: 'en_US',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
