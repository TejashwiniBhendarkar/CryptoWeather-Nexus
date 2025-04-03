import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const API_KEY = process.env.WEATHER_API_KEY;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Weather data fetch failed" });
  }
});

export default router;
