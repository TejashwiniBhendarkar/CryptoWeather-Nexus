'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../../store/features/weatherSlice';
import WeatherCard from '../../components/WeatherCard';

export default function WeatherPage() {
  const dispatch = useDispatch();
  const cities = ['New York', 'London', 'Tokyo'];
  
  useEffect(() => {
    cities.forEach(city => dispatch(fetchWeather(city)));
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Weather Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {cities.map(city => (
          <WeatherCard key={city} city={city} />
        ))}
      </div>
    </div>
  );
}
