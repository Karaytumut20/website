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
        // 'sans': Tailwind'in varsayılan fontudur (body, p, div, span vs. bunu kullanır)
        sans: ['var(--font-apercu)', 'sans-serif'],
        
        // 'heading': Başlıklar için kullanacağımız özel font ailesi
        heading: ['var(--font-neue-montreal)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};