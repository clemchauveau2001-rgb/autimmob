import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.135'],
  // La page de suivi de réparation n'existe plus (Autimmob ne répare pas les véhicules des clients)
  async redirects() {
    return [{ source: '/suivi', destination: '/', permanent: false }]
  },
};

export default nextConfig;
