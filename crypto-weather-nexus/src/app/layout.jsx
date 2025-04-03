"use client";  

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import store from "@/store/store";
import Head from "next/head";
import "../styles/globals.css";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>CryptoWeatherNexus</title>
        <meta name="description" content="Stay updated with live cryptocurrency prices, real-time weather, and the latest news." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Meta Tags (for social media preview) */}
        <meta property="og:title" content="CryptoWeather Nexus" />
        <meta property="og:description" content="Live updates on cryptocurrency, weather, and news." />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CryptoWeather Nexus" />
        <meta name="twitter:description" content="Live updates on cryptocurrency, weather, and news." />
        <meta name="twitter:image" content="/preview.png" />
      </Head>
      
      <body className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        <Provider store={store}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
