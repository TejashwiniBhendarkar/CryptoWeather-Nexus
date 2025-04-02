import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_WEATHER_API: process.env.NEXT_PUBLIC_WEATHER_API,
    NEXT_PUBLIC_CRYPTO_API: process.env.NEXT_PUBLIC_CRYPTO_API,
    NEXT_PUBLIC_NEWS_API: process.env.NEXT_PUBLIC_NEWS_API,
  },
};

export default nextConfig;
