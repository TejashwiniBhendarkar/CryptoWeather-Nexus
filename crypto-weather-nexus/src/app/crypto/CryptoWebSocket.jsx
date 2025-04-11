"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CryptoWebSocket() {
  const [cryptos, setCryptos] = useState([]);
  const [priceChanges, setPriceChanges] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCryptoData = async () => {
    try {
      setError(null);
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      const data = await res.json();

      // Price alerts for significant changes
      data.forEach((coin) => {
        const prev = previousPrices[coin.id];
        const curr = coin.current_price;

        if (prev && Math.abs((curr - prev) / prev) * 100 >= 2) {
          toast.warn(`${coin.symbol.toUpperCase()} price changed significantly!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      });

      // Set changes
      setPriceChanges((prevChanges) => {
        const updated = {};
        data.forEach((coin) => {
          const prev = previousPrices[coin.id];
          const curr = coin.current_price;
          if (prev !== undefined) {
            updated[coin.id] = curr > prev ? "up" : curr < prev ? "down" : prevChanges[coin.id];
          }
        });
        return updated;
      });

      setPreviousPrices(
        data.reduce((acc, coin) => {
          acc[coin.id] = coin.current_price;
          return acc;
        }, {})
      );

      setCryptos(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
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
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6 mr-2"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/crypto.png";
                        }}
                      />
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </td>
                    <td className={`p-3 font-semibold ${priceClass}`}>
                      ${coin.current_price.toFixed(2)}
                    </td>
                    <td className="p-3">
                      ${(coin.market_cap / 1e9).toFixed(2)}B
                    </td>
                    <td
                      className={`p-3 ${
                        coin.price_change_percentage_24h < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
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
