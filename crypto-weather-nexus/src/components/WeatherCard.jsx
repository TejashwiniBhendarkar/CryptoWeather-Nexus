"use client";
import Link from "next/link";

export default function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const { name, main, weather } = weatherData;

  return (
    <Link href={`/weather/${encodeURIComponent(name)}`}>
      <div className="p-4 border rounded-lg shadow-lg w-64 text-center bg-white hover:scale-105 transition-transform cursor-pointer">
        <h2 className="text-xl font-bold text-black">{name}</h2>
        <p className="text-lg text-black">{main.temp}°C</p>
        <p className="text-gray-700">{weather[0].description}</p>
      </div>
    </Link>
  );
}
