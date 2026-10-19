import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Baldre Lighting Design & Engineering Studio',
  description:
    'Discover the philosophy, museum-grade optical engineering (CRI >97), and architectural craftsmanship of Baldre Lighting in Tehran.',
  alternates: {
    canonical: '/en/about',
    languages: {
      'fa-IR': '/about',
      'en-US': '/en/about',
      'x-default': '/about',
    },
  },
  openGraph: {
    title: 'About Us | Baldre Lighting Studio',
    description:
      'Pure geometric forms, timeless materiality, and bespoke architectural luminaires engineered for contemporary spaces.',
    locale: 'en_US',
    alternateLocale: 'fa_IR',
    type: 'website',
  },
};

export default function EnglishAboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
