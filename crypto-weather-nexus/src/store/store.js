import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weatherSlice";
import cryptoReducer from "./features/cryptoSlice";
import newsReducer from "./features/newsSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
  },
});

export default store;
