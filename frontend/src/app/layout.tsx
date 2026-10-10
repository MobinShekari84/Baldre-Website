import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const yekanBakh = localFont({
  src: [
    { path: '../../public/fonts/Yekan Bakh Fa 01 Hairline.woff2', weight: '100', style: 'normal' },
    { path: '../../public/fonts/Yekan Bakh Fa 02 Thin.woff2', weight: '200', style: 'normal' },
    { path: '../../public/fonts/Yekan Bakh Fa 03 Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Yekan Bakh Fa 04 Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Yekan Bakh Fa 05 Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Yekan Bakh Fa 06 Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/Yekan Bakh Fa 07 Heavy.woff2', weight: '800', style: 'normal' },
    { path: '../../public/fonts/Yekan Bakh Fa 08 Fat.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-yekan-bakh',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BALDRE | بالدر — طراحی و مهندسی روشنایی مدرن تهران',
  description:
    'استودیو طراحی و مهندسی روشنایی بالدر (Baldre Lighting). کلکسیون چراغ‌های دکوراتیو، آویزهای خطی، سیستم‌های مگنتی ۴۸ ولت و چراغ‌های معماری با استاندارد CRI >97.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={yekanBakh.variable} suppressHydrationWarning>
      <body
        className={`${yekanBakh.className} font-farsi bg-[#FFFFFF] text-[#111111] selection:bg-[#111111] selection:text-[#FFFFFF] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
