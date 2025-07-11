/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // domains: ['shafcoapi.augursapps.com','testshafcoapi.augursapps.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shafcoapi.augursapps.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'testshafcoapi.augursapps.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
