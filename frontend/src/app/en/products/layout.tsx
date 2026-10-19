import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architectural Luminaires & Products | Baldre Lighting',
  description:
    'Explore the complete Baldre Lighting collection: linear suspension systems, sculptural chandeliers, wall & floor luminaires, 48V magnetic track lights, and IP65 outdoor bollards with CAD/IES downloads.',
  alternates: {
    canonical: '/en/products',
    languages: {
      'fa-IR': '/products',
      'en-US': '/en/products',
      'x-default': '/products',
    },
  },
  openGraph: {
    title: 'Architectural Luminaires & Products | Baldre Lighting',
    description:
      'Browse Baldre architectural lighting collections with photometric filters (CCT, CRI, IP rating, DALI-2) and B2B CAD/IES files.',
    locale: 'en_US',
    alternateLocale: 'fa_IR',
    type: 'website',
  },
};

export default function BaldreEnglishProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
