/** @type {import('next').NextConfig} */

// https://zenn.dev/toono_f/articles/bd50ddd0a7bc76
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
        },
      ],
    });
    return config;
  },
  images: {
    disableStaticImages: true, // importした画像の型定義設定を無効にする
  },
};

export default nextConfig;
