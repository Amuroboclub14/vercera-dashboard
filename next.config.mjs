/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["amuroboclub.pockethost.io"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
