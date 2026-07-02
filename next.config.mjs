/** @type {import('next').NextConfig} */
const nextConfig = {
  // /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rawcig.xyz',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['192.168.1.6','local-origin.dev', '*.local-origin.dev','**'],
};

export default nextConfig;
