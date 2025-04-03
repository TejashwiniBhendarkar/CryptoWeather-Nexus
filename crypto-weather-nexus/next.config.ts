const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_WEATHER_API_KEY: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
    NEXT_PUBLIC_CRYPTO_API_KEY: process.env.NEXT_PUBLIC_CRYPTO_API_KEY,
    NEXT_PUBLIC_NEWS_API_KEY: process.env.NEXT_PUBLIC_NEWS_API_KEY,
  },
};

export default nextConfig;
