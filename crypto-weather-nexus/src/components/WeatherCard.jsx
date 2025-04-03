'use client';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function WeatherCard({ city }) {
  const weatherData = useSelector(state => state.weather.cities[city]);

  if (!weatherData) return <div className="p-4 border rounded-lg shadow-lg">Loading...</div>;

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-semibold">{city}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Conditions: {weatherData.weather[0].description}</p>
      <Link href={`/weather/${city.toLowerCase()}`} className="text-blue-500 mt-2 block">
        View Details
      </Link>
    </div>
  );
}
