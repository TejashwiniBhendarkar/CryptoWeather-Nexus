import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : { cities: [], cryptos: [] };
  }
  return { cities: [], cryptos: [] };
};

const saveFavorites = (favorites) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadFavorites(),
  reducers: {
    toggleFavoriteCity: (state, action) => {
      const city = action.payload;
      if (state.cities.includes(city)) {
        state.cities = state.cities.filter((c) => c !== city);
      } else {
        state.cities.push(city);
      }
      saveFavorites(state);
    },
    toggleFavoriteCrypto: (state, action) => {
      const crypto = action.payload;
      if (state.cryptos.includes(crypto)) {
        state.cryptos = state.cryptos.filter((c) => c !== crypto);
      } else {
        state.cryptos.push(crypto);
      }
      saveFavorites(state);
    },
  },
});

export const { toggleFavoriteCity, toggleFavoriteCrypto } = favoritesSlice.actions;
export default favoritesSlice.reducer;
