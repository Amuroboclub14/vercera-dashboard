/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [{ hostname: "amuroboclub.pockethost.io" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
