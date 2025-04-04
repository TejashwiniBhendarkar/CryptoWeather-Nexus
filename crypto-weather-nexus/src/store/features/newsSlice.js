// store/features/newsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// The API route that acts as a proxy to fetch news articles
const API_URL = "/api/news"; // Internal API route

export const fetchCryptoNews = createAsyncThunk("news/fetchCryptoNews", async () => {
  const response = await axios.get(API_URL); // Make the request to the internal API route
  return response.data; // Return the top 5 news articles
});

const newsSlice = createSlice({
  name: "news",
  initialState: { articles: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCryptoNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchCryptoNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
