/** @type {import('next').NextConfig} */

// next.config.js
import withPWA from "next-pwa";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // eslint disble
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
