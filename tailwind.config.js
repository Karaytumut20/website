/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // GÖVDE (Küçük Yazılar): Neue Montreal
        // Tailwind'de 'font-sans' varsayılandır. Artık tüm site varsayılan olarak Neue Montreal kullanacak.
        sans: ['var(--font-neue-montreal)', 'sans-serif'],
        
        // BAŞLIK (Büyük Kısımlar): Apercu
        // Büyük başlıklar için 'font-heading' sınıfını kullanacağız.
        heading: ['var(--font-apercu)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};