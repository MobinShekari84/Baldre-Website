'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ShowroomRedirectPage() {
  const router = useRouter();
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');

  useEffect(() => {
    router.replace(isEn ? '/en/about#showroom' : '/about#showroom');
  }, [router, isEn]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-8 text-center text-xs text-[#555555]">
      <span>{isEn ? 'Redirecting to Showroom...' : 'در حال انتقال به بخش شوروم بالدر...'}</span>
    </div>
  );
}
