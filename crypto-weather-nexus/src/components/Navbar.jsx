"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import "../styles/globals.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-gray-200 bg-white shadow-md fixed w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          {/* <img src="/logo.svg" className="h-8" alt="Logo" /> */}
          <span className="self-center text-2xl font-semibold text-blue-600">
            CryptoWeatherNexus
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-700 rounded-lg md:hidden hover:bg-gray-200 transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium mt-4 md:mt-0">
            {["Weather", "Crypto", "News"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="block py-2 px-3 md:p-0 text-gray-800 hover:text-blue-600 transition font-medium"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white shadow-md rounded-lg py-4 px-6 text-center border-t border-gray-200"
          >
            {["Weather", "Crypto", "News"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block py-2 text-lg font-medium text-gray-800 hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
