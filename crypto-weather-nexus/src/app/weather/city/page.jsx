'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../../../store/features/weatherSlice';
import { useParams } from 'next/navigation';

export default function CityWeatherPage() {
  const dispatch = useDispatch();
  const { city } = useParams();
  const weatherData = useSelector(state => state.weather.cities[city]);

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [dispatch, city]);

  if (!weatherData) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{city} Weather</h1>
      <p className="text-lg">Temperature: {weatherData.main.temp}°C</p>
      <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
      <p className="text-lg">Conditions: {weatherData.weather[0].description}</p>
    </div>
  );
}
