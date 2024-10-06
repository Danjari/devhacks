/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose", 'sharp', 'onnxruntime-node'],
      },
      webpack(config) {
        config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
        }
        config.resolve.alias = {
            ...config.resolve.alias,
            "sharp$": false,
            "onnxruntime-node$": false,
        }
        return config
      }
};

export default nextConfig;
