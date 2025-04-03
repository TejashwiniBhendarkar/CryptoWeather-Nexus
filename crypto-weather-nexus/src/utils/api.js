export async function fetchWeatherData() {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!API_KEY) {
    console.error("❌ Weather API Key is missing! Check .env.local.");
    return [];
  }

  const cities = ["New York", "London", "Tokyo"];

  try {
    const responses = await Promise.all(
      cities.map(async (city) => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!res.ok) throw new Error(`❌ Failed to fetch weather for ${city}: ${res.statusText}`);
        return res.json();
      })
    );

    return responses.map((data) => ({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
    }));
  } catch (error) {
    console.error("❌ Error fetching weather data:", error);
    return [];
  }
}
