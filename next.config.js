/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    console.log("Rewrites called");
    return [{ source: "/api/(.*)", destination: "/api" }];
  },
};

module.exports = nextConfig;
