import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Baldre Lighting | Luxury Architectural & Sculptural Lighting in Tehran',
  description:
    'Baldre Lighting Studio — Bespoke architectural luminaires, linear suspension systems, 48V magnetic tracks, and CAD/BIM/IES engineering resources for architects and interior designers.',
  keywords: [
    'Baldre Lighting',
    'Architectural Lighting Tehran',
    'Luxury Chandeliers Iran',
    'Linear Suspension Luminaires',
    '48V Magnetic Track Lighting',
    'IES Photometric Files',
    'Bespoke Lighting Design',
  ],
  alternates: {
    canonical: '/en',
    languages: {
      'fa-IR': '/',
      'en-US': '/en',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'Baldre Lighting | Luxury Architectural Lighting',
    description:
      'Bespoke architectural lighting, sculptural luminaires, and technical CAD/IES documentation for luxury residential and commercial spaces.',
    locale: 'en_US',
    alternateLocale: 'fa_IR',
    type: 'website',
  },
};

export default function BaldreEnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
