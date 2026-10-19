import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Baldr Architectural Lighting Studio',
  description:
    'Connect with Baldr Lighting Studio in Tehran. Direct phone lines, project engineering emails, and Fereshteh showroom address with Google Maps directions.',
  alternates: {
    canonical: '/en/contact',
    languages: {
      'fa-IR': '/contact',
      'en-US': '/en/contact',
      'x-default': '/contact',
    },
  },
  openGraph: {
    title: 'Contact Us | Baldr Lighting Tehran',
    description:
      'Direct contact channels and showroom visit inquiries for architects, designers, and clients.',
    locale: 'en_US',
    alternateLocale: 'fa_IR',
    type: 'website',
  },
};

export default function EnglishContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
