/** @type {import('next').NextConfig} */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

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
  transpilePackages: [
    'firebase',
    '@firebase/auth',
    '@firebase/app',
    '@firebase/firestore',
    '@firebase/storage',
    'undici',
    'zod',
    'zod-to-json-schema',
    '@ai-sdk/ui-utils'
  ],
  experimental: {
    esmExternals: false
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "utf-8-validate": false,
      bufferutil: false,
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      'zod': require.resolve('zod'),
      '@ai-sdk/ui-utils': require.resolve('@ai-sdk/ui-utils')
    };

    // Handle undici and other packages with private fields
    config.module.rules.push({
      test: /\.m?js$/,
      include: /node_modules/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });

    // Add comprehensive Babel rule for packages with private class fields
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      include: [
        /node_modules\/undici/,
        /node_modules\/firebase/,
        /node_modules\/@firebase/,
        /node_modules\/react-syntax-highlighter/,
        /node_modules\/parse-entities/,
        /node_modules\/character-entities-legacy/,
        /node_modules\/zod/,
        /node_modules\/zod-to-json-schema/,
        /node_modules\/@ai-sdk/,
        /node_modules\/ai/
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: isServer ? { node: '18' } : { browsers: ['> 1%', 'last 2 versions'] },
              modules: false,
              loose: true
            }]
          ],
          plugins: [
            ['@babel/plugin-transform-private-methods', { loose: true }],
            ['@babel/plugin-transform-private-property-in-object', { loose: true }],
            ['@babel/plugin-transform-class-properties', { loose: true }],
            ['@babel/plugin-transform-class-static-block']
          ],
          cacheDirectory: true,
          sourceType: 'unambiguous'
        }
      }
    });

    return config;
  }
};

export default nextConfig;
