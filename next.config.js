/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Fix for Windows symlink issues, especially with OneDrive
  experimental: {
    outputFileTracingRoot: require('path').join(__dirname),
  },
  // Disable symlinks to prevent Windows/OneDrive issues
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.symlinks = false;
    }
    return config;
  },
}

module.exports = nextConfig

