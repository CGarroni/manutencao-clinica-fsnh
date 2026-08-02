const withPWA = require('next-pwa')({

dest: 'public',

register: true,

skipWaiting: true,

disable: process.env.NODE_ENV === 'development', // Desativa em desenvolvimento para facilitar seus testes locais

});

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = withPWA(nextConfig);
