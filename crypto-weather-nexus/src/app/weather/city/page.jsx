"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchWeatherHistory } from "../../../store/features/weatherSlice";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function WeatherDetail({ params }) {
  const { city } = params;
  const dispatch = useDispatch();
  const history = useSelector((state) => state.weather.history[city]);
  const status = useSelector((state) => state.weather.status);
  const error = useSelector((state) => state.weather.error);
  const router = useRouter();

  useEffect(() => {
    if (city) dispatch(fetchWeatherHistory(city));
  }, [city, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <button
        onClick={() => router.push("/weather")}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-700 text-white rounded-lg"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">{city} - Weather Details</h1>

      {status === "loading" && <p className="text-blue-500">Loading history...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {history && (
        <div className="w-full max-w-2xl bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Temperature Trend (Next 5 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history.slice(0, 10)}>
              <XAxis dataKey="dt_txt" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="main.temp" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
