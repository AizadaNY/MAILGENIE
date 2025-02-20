/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {}, // Remove 'appDir' since it's enabled by default
  basePath: "", // Ensures no conflicts with API paths
};

module.exports = nextConfig;
