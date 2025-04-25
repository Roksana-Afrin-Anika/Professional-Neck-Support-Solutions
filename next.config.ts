/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
      // Add patterns for your actual image domains
      {
        protocol: "https",
        hostname: "**.amazonaws.com", // If you're using AWS
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com", // If using Google images
      },
    ],
    // If you're using local images (like in your category pages)
    domains: ["localhost"], // Add your production domain when you have one
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Better TypeScript support
  typescript: {
    ignoreBuildErrors: false, // Set to true temporarily if needed
  },
  // Output configuration (choose one)
  output: "standalone", // Recommended for Vercel deployments
  // output: 'export', // Only if you're doing static export
};

export default nextConfig;
