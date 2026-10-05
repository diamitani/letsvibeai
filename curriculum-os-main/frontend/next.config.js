/** @type {import('next').NextConfig} */
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

const nextConfig = {
  rewrites: async () => [
    {
      source: "/api/backend/:path*",
      destination: `${BACKEND}/api/v1/:path*`,
    },
  ],
};

module.exports = nextConfig;
