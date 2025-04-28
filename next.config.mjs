/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this if you're having API route issues
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
