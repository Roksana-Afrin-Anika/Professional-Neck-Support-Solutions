/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false, // Set to true temporarily if needed
  },
  images: {
    domains: ["localhost"], // Add your production domain when ready
  },
};

module.exports = nextConfig;
