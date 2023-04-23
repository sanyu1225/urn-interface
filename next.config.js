/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async exportPathMap(defaultPathMap) {
    return defaultPathMap;
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/sounds/',
            outputPath: isServer ? `${__dirname}/server/static/sounds/` : 'static/sounds/',
            name: '[name].[ext]',
            emitFile: !isServer,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
