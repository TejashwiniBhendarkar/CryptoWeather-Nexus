import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    prices: {}, // Store WebSocket prices
  },
  reducers: {
    updatePrices: (state, action) => {
      state.prices = action.payload; // Update prices in Redux state
    },
  },
});

export const { updatePrices } = cryptoSlice.actions;
export default cryptoSlice.reducer;
