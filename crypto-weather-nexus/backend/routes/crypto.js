import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const API_KEY = process.env.CRYPTO_API_KEY;
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Crypto data fetch failed" });
  }
});

export default router;
