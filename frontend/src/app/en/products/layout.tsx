import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architectural Luminaires & Products | Baldr Lighting',
  description:
    'Explore the complete Baldr Lighting collection: linear suspension systems, sculptural chandeliers, wall & floor luminaires, 48V magnetic track lights, and IP65 outdoor bollards with CAD/IES downloads.',
  alternates: {
    canonical: '/en/products',
    languages: {
      'fa-IR': '/products',
      'en-US': '/en/products',
      'x-default': '/products',
    },
  },
  openGraph: {
    title: 'Architectural Luminaires & Products | Baldr Lighting',
    description:
      'Browse Baldr architectural lighting collections with photometric filters (CCT, CRI, IP rating, DALI-2) and B2B CAD/IES files.',
    locale: 'en_US',
    alternateLocale: 'fa_IR',
    type: 'website',
  },
};

export default function BaldrEnglishProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
