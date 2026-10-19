import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tehran Flagship Showroom | Baldre Lighting Studio',
  description:
    'Visit Baldre Flagship Showroom on Fereshteh St., Tehran. Experience bespoke architectural luminaires at 1:1 scale, test DALI dimming, and book a private consultation.',
  alternates: {
    canonical: '/en/showroom',
    languages: {
      'fa-IR': '/showroom',
      'en-US': '/en/showroom',
      'x-default': '/showroom',
    },
  },
  openGraph: {
    title: 'Tehran Flagship Showroom | Baldre Lighting',
    description:
      'Private architectural lighting gallery in Elahiyeh, Tehran. Book appointments and explore museum-grade optics.',
    locale: 'en_US',
    alternateLocale: 'fa_IR',
    type: 'website',
  },
};

export default function EnglishShowroomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
