import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
  );
  const data = await response.json();
  return { city, ...data };
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { cities: {}, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cities[action.payload.city] = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
