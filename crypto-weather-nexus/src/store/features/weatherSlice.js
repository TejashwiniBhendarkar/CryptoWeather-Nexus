import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

// Fetch Current Weather
export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  return { city, ...data };
});

// Fetch Weather History (Last 5 Days)
export const fetchWeatherHistory = createAsyncThunk("weather/fetchWeatherHistory", async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  return { city, history: data.list };
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: { cities: {}, history: {}, alerts: [], status: "idle", error: null },
  reducers: {
    addWeatherAlert: (state, action) => {
      state.alerts.push(action.payload);
    },
    removeWeatherAlert: (state, action) => {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.cities[action.payload.city] = action.payload;
      })
      .addCase(fetchWeatherHistory.fulfilled, (state, action) => {
        state.history[action.payload.city] = action.payload.history;
      })
      .addCase(fetchWeatherHistory.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { addWeatherAlert, removeWeatherAlert } = weatherSlice.actions;
export default weatherSlice.reducer;
