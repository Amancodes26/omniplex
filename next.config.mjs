import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Force Firebase Storage to use its browser build instead of the Node-specific build.
      config.resolve.alias[
        "@firebase/storage/dist/node-esm/index.node.esm.js"
      ] = path.resolve(
        __dirname,
        "node_modules/@firebase/storage/dist/index.esm.js"
      );
      // Also, in case undici is still imported anywhere on the client, tell webpack to ignore it.
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
      };
    }
    return config;
  },
};

export default nextConfig;
