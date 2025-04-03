export default function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const { name, main, weather } = weatherData;
  return (
    <div className="p-4 border rounded-lg shadow-lg w-64 text-center">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-lg">{main.temp}°C</p>
      <p>{weather[0].description}</p>
    </div>
  );
}
