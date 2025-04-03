"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative w-full h-[450px] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center px-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            Crypto Weather Nexus
          </h1>
          <p className="text-lg text-gray-300 mt-3 max-w-xl">
            Stay updated with live cryptocurrency prices, real-time weather, and the latest news.
          </p>
          <div className="mt-6 flex space-x-4">
            <Link href="/crypto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Explore Crypto
              </motion.button>
            </Link>
            <Link href="/weather">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Check Weather
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Why Use CryptoWeather Nexus?</h2>
        <p className="text-lg text-gray-600 mt-3">
          Your all-in-one platform for market trends and weather updates.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { title: "Live Crypto Prices", img: "/images/crypto.png", desc: "Track real-time prices of top cryptocurrencies.", link: "/crypto" },
            { title: "Weather Updates", img: "/images/weather.png", desc: "Get live weather conditions for any location.", link: "/weather" },
            { title: "Latest News", img: "/images/news.png", desc: "Stay informed with real-time news alerts.", link: "/news" },
          ].map((feature, index) => (
            <Link href={feature.link} key={index} passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-white p-6 rounded-lg shadow-lg text-center transition hover:shadow-xl"
              >
                <img src={feature.img} alt={feature.title} className="w-16 h-16 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-800 mt-4">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
