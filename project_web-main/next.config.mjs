/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure static files are properly served
  async rewrites() {
    return [
      {
        source: '/static/:path*',
        destination: '/public/static/:path*',
      },
    ];
  },
};

export default nextConfig;
