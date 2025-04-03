import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL (Replace with a real API)
const NEWS_API_URL = "https://newsdata.io/api/1/news?apikey=YOUR_API_KEY&q=crypto";

// Async Thunk to Fetch News
export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await fetch(NEWS_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  const data = await response.json();
  return data.results; // Adjust based on API response structure
});

// News Slice
const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
