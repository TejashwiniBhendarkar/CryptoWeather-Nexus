// pages/api/news.js

import axios from "axios";

const NEWS_API_URL = `https://newsdata.io/api/1/news`;

export default async function handler(req, res) {
  try {
    const { data } = await axios.get(NEWS_API_URL, {
      params: {
        apikey: process.env.NEXT_PUBLIC_NEWSDATA_API_KEY,
        q: "cryptocurrency",
        language: "en",
      },
    });
    // Return top 5 articles
    res.status(200).json(data.results.slice(0, 5));
  } catch (error) {
    console.error("News API Error:", error); // Log error for debugging
    res.status(500).json({ error: error.message || "Failed to fetch news articles" });
  }
  
}
