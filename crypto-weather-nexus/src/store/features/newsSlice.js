import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
const NEWS_API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=cryptocurrency&language=en`;

export const fetchCryptoNews = createAsyncThunk("news/fetchCryptoNews", async () => {
  const response = await axios.get(NEWS_API_URL);
  return response.data.results.slice(0, 5); // Get top 5 news articles
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
