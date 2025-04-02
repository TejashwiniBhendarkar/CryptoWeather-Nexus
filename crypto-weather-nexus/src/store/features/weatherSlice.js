import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: [], loading: false, error: null },
  reducers: {
    setWeather: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
