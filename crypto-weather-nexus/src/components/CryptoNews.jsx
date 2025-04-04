"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoNews } from "../store/features/newsSlice";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CryptoNews() {
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchCryptoNews());
  }, [dispatch]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-full max-w-3xl mx-auto">
      <motion.h2 
        className="text-2xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📰 Crypto News
      </motion.h2>

      {status === "loading" && (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin w-6 h-6" />
          <span className="ml-2">Fetching news...</span>
        </div>
      )}
      
      {status === "failed" && <p className="text-red-400 text-center">❌ {error}</p>}

      {status === "succeeded" && (
        <ul className="space-y-4">
          {articles.map((article, index) => (
            <motion.li 
              key={index} 
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 hover:underline">
                {article.title}
              </a>
              <p className="text-gray-400 text-sm mt-1">{article.source_id} - {new Date(article.pubDate).toLocaleDateString()}</p>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
