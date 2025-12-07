import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // WebGL shader dosyalarını import edebilmek için
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader'],
    });
    return config;
  },
};

export default withNextIntl(nextConfig);