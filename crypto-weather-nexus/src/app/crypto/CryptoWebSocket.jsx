"use client";
import { useState, useEffect } from "react";

export default function CryptoWebSocket() {
  const [cryptos, setCryptos] = useState([]);
  const [priceChanges, setPriceChanges] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch initial crypto data
  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://api.coincap.io/v2/assets?limit=10");
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      const data = await res.json();

      // Initialize previousPrice for correct first-time updates
      const formattedData = data.data.map((coin) => ({
        ...coin,
        previousPrice: parseFloat(coin.priceUsd),
      }));

      setCryptos(formattedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();

    // WebSocket connection
    const socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,dogecoin");

    socket.onopen = () => console.log("✅ WebSocket connected");
    socket.onerror = (error) => console.error("🚨 WebSocket Error:", error);
    socket.onclose = () => console.log("🔴 WebSocket disconnected");

    socket.onmessage = (event) => {
      const updatedPrices = JSON.parse(event.data);

      setCryptos((prevCryptos) => {
        return prevCryptos.map((coin) => {
          const newPrice = updatedPrices[coin.id];

          if (newPrice) {
            return {
              ...coin,
              previousPrice: coin.priceUsd || coin.previousPrice, // Keep first known price
              priceUsd: newPrice, // Update to new price
            };
          }
          return coin;
        });
      });

      // Update price change indicators
      setPriceChanges((prevChanges) => {
        const newChanges = { ...prevChanges };

        Object.entries(updatedPrices).forEach(([coinId, newPrice]) => {
          const oldPrice =
            prevChanges[coinId] || cryptos.find((c) => c.id === coinId)?.priceUsd;
          if (oldPrice) {
            newChanges[coinId] =
              parseFloat(newPrice) > parseFloat(oldPrice) ? "up" : "down";
          }
        });

        return newChanges;
      });
    };

    return () => {
      socket.onclose = null;
      socket.close();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Live Crypto Prices</h2>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Market Cap</th>
              <th className="p-3">Change (24Hr)</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.length > 0 ? (
              cryptos.map((coin) => {
                const priceClass =
                  priceChanges[coin.id] === "up"
                    ? "text-green-500 animate-pulse"
                    : priceChanges[coin.id] === "down"
                    ? "text-red-500 animate-pulse"
                    : "";

                return (
                  <tr key={coin.id} className="border-b">
                    <td className="p-3 flex items-center">
                      <img
                        src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                        alt={coin.name}
                        className="w-6 h-6 mr-2"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/crypto.png"; // Default image
                        }}
                      />
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </td>
                    <td className={`p-3 font-semibold ${priceClass}`}>
                      ${Number(coin.priceUsd).toFixed(2)}
                    </td>
                    <td className="p-3">${(Number(coin.marketCapUsd) / 1e9).toFixed(2)}B</td>
                    <td
                      className={`p-3 ${
                        Number(coin.changePercent24Hr) < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {Number(coin.changePercent24Hr).toFixed(2)}%
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
