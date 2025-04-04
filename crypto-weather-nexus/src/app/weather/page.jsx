"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../store/features/weatherSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { cities, status, error } = useSelector((state) => state.weather);

  const predefinedCities = ["New York", "London", "Tokyo"];

  useEffect(() => {
    predefinedCities.forEach((city) => {
      dispatch(fetchWeather(city));
    });

    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];
    setFavorites(storedFavorites);

    // Simulate one mock weather alert
    const mockAlert = {
      city: "New York",
      message: " Weather Alert for New York: Severe conditions expected!",
      type: "heatwave",
    };

    setTimeout(() => {
      setAlerts((prev) => [...prev, mockAlert]);
      toast.warning(mockAlert.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }, 4000);
  }, [dispatch]);

  const handleFetchWeather = () => {
    if (city.trim() !== "") {
      dispatch(fetchWeather(city));
      setCity("");
    }
  };

  const handleCityClick = (cityName) => {
    router.push(`/weather/${encodeURIComponent(cityName)}`);
  };

  const toggleFavorite = (cityName) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(cityName)
        ? prevFavorites.filter((fav) => fav !== cityName)
        : [...prevFavorites, cityName];

      localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 p-6 text-white">
      <ToastContainer />
      
      <motion.h1 
        className="text-4xl font-extrabold mb-6 text-center drop-shadow-md mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌦️ Weather Dashboard
      </motion.h1>
      
      <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-3 rounded-lg text-gray-900 outline-none w-full shadow-md"
        />
        <button
          onClick={handleFetchWeather}
          className="bg-white text-blue-600 px-5 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-500 hover:text-white transition duration-300 w-full sm:w-auto"
        >
          Get Weather
        </button>
      </div>

      {status === "loading" && (
        <div className="flex items-center space-x-2 text-lg text-white">
          <Loader2 className="animate-spin" />
          <span>Fetching weather data...</span>
        </div>
      )}
      {status === "failed" && (
        <p className="mt-4 text-red-300 text-lg">❌ {error}</p>
      )}
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.values(cities).map((weatherData) => (
          <motion.div 
            key={weatherData.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-gray-900 p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform relative"
            onClick={() => handleCityClick(weatherData.name)}
          >
            <button
              className="absolute top-2 right-2 text-yellow-500 text-xl"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering city click event
                toggleFavorite(weatherData.name);
              }}
            >
              {favorites.includes(weatherData.name) ? "⭐" : "☆"}
            </button>
            <h2 className="text-2xl font-bold mb-2">{weatherData.name}</h2>
            <p className="text-lg"> Temperature: {weatherData.main.temp}°C</p>
            <p className="text-lg"> Humidity: {weatherData.main.humidity}%</p>
            <p className="text-lg"> Condition: {weatherData.weather[0].description}</p>
          </motion.div>
        ))}
      </div>

      {favorites.length > 0 && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center">⭐ Favorite Cities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {favorites.map((favCity) => (
              <div
                key={favCity}
                className="bg-white text-gray-900 p-4 rounded-lg shadow-md text-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleCityClick(favCity)}
              >
                {favCity}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
