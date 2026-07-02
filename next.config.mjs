/** @type {import('next').NextConfig} */
const nextConfig = {
  // /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  allowedDevOrigins: ['10.10.20.247','192.168.1.10','192.168.0.185','10.0.3.55','172.20.10.6', 'localhost:3000', 'localhost:3001','local-origin.dev', '*.local-origin.dev'],
};

export default nextConfig;
