import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "@/store/features/weatherSlice"; // Use absolute imports for consistency
import newsReducer from "@/store/features/newsSlice";
import cryptoReducer from "@/store/features/cryptoSlice";
import favoritesReducer from "./features/favoritesSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    news: newsReducer,
    crypto: cryptoReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable state checks for API responses
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools only in development
});

export default store;
