// pages/api/weather.js

export default async function handler(req, res) {
    const city = req.query.city || 'London';  // Default to 'London' if no city is provided
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;  // Access weather API key from env
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
  
      if (data.cod === 200) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: 'City not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  