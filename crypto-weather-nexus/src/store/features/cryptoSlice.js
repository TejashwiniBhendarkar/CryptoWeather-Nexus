import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch initial crypto prices from CoinGecko
export const fetchCryptos = createAsyncThunk("crypto/fetchCryptos", async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );
  const data = await res.json();

  return data.map((coin) => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    image: coin.image,
    current_price: coin.current_price,
    previousPrice: coin.current_price, // for animation or change detection
    market_cap: coin.market_cap,
    market_cap_rank: coin.market_cap_rank,
    total_volume: coin.total_volume,
    circulating_supply: coin.circulating_supply,
    price_change_percentage_24h: coin.price_change_percentage_24h,
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
        coin.previousPrice = coin.current_price;
        coin.current_price = price;
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
