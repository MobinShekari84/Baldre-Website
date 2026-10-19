import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architects & Professionals Portal | Baldre Lighting',
  description:
    'Dedicated B2B resource portal for architecture firms and MEP consultants. Download 3D CAD (.dwg), photometric IES files, Dialux calculations, and request project mockups.',
  alternates: {
    canonical: '/en/professionals',
    languages: {
      'fa-IR': '/professionals',
      'en-US': '/en/professionals',
      'x-default': '/professionals',
    },
  },
  openGraph: {
    title: 'Architects & Professionals Portal | Baldre Lighting',
    description:
      'Complete CAD/IES downloads library, bespoke profile manufacturing, and project consultation for architects.',
    locale: 'en_US',
    alternateLocale: 'fa_IR',
    type: 'website',
  },
};

export default function EnglishProfessionalsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
