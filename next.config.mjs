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
  allowedDevOrigins: ['10.10.20.78','local-origin.dev', '*.local-origin.dev','**'],
};

export default nextConfig;
