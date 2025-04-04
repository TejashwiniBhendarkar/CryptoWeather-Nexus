
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchWeatherHistory } from "../../../store/features/weatherSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";

export default function WeatherDetail({ params }) {
  const { city } = params;
  const decodedCity = decodeURIComponent(city);

  const dispatch = useDispatch();
  const history = useSelector((state) => state.weather.history[decodedCity]);
  const status = useSelector((state) => state.weather.status);
  const error = useSelector((state) => state.weather.error);
  const router = useRouter();

  useEffect(() => {
    if (decodedCity) dispatch(fetchWeatherHistory(decodedCity));
  }, [decodedCity, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <button
        onClick={() => router.push("/weather")}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        {decodedCity} - Weather Details
      </h1>

      {/* Loading State */}
      {status === "loading" && (
        <div className="flex items-center space-x-2 text-lg text-blue-500">
          <Loader2 className="animate-spin w-6 h-6" />
          <span>Loading history...</span>
        </div>
      )}

      {/* Error State */}
      {status === "failed" && (
        <p className="text-red-500 text-lg">❌ Error: {error}</p>
      )}

      {/* Display Weather Data */}
      {history && history.length > 0 && (
        <div className="w-full max-w-2xl bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Temperature Trend (Next 5 Days)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history.slice(0, 10)}>
              <XAxis dataKey="dt_txt" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="main.temp"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* No Data Available */}
      {!history && status !== "loading" && !error && (
        <p className="text-gray-500">No historical data available.</p>
      )}
    </div>
  );
}