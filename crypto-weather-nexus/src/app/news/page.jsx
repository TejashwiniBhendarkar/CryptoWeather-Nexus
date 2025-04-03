"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "@/store/features/newsSlice";
import NewsCard from "@/components/NewsCard";

const NewsPage = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Latest News
      </h2>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-lg text-gray-600 mt-4">Loading news...</p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-500 mt-4">Error: {error}</p>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.isArray(articles) && articles.length > 0 ? (
          articles.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))
        ) : (
          !loading && <p className="text-center text-gray-600">No news found.</p>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
