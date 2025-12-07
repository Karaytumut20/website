import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Varsayılan dil
  defaultLocale: 'en',
  // Desteklenen diller
  locales: ['en', 'tr'],
  // URL her zaman /en veya /tr ile başlasın
  localePrefix: 'always'
});

export const config = {
  // Sistem dosyaları hariç tüm istekleri yakala
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};