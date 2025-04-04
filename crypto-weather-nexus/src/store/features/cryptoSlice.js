import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch initial crypto prices from API
export const fetchCryptos = createAsyncThunk("crypto/fetchCryptos", async () => {
  const res = await fetch("https://api.coincap.io/v2/assets?limit=10");
  const data = await res.json();
  return data.data.map((coin) => ({
    ...coin,
    previousPrice: parseFloat(coin.priceUsd), // Store initial price
  }));
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    cryptos: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateCryptoPrice: (state, action) => {
      const { id, price } = action.payload;
      const coin = state.cryptos.find((c) => c.id === id);
      if (coin) {
        coin.previousPrice = coin.priceUsd;
        coin.priceUsd = price;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cryptos = action.payload;
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateCryptoPrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;
