"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteCrypto } from "../../store/features/favoritesSlice";
import Link from "next/link";

export default function CryptoPage() {
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceChanges, setPriceChanges] = useState({});
  const [limit, setLimit] = useState(100);

  const dispatch = useDispatch();
  const favoriteCryptos = useSelector((state) => state.favorites.cryptos);

  const fetchCryptoData = async (newLimit) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`https://api.coincap.io/v2/assets?limit=${newLimit}`);

      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setCryptos(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData(limit);

    // WebSocket for real-time updates
    const socket = new WebSocket("wss://ws.coincap.io/prices?assets=all");

    socket.onmessage = (event) => {
      const updatedPrices = JSON.parse(event.data);

      setCryptos((prevCryptos) =>
        prevCryptos.map((coin) => {
          const newPrice = updatedPrices[coin.id];
          if (newPrice) {
            return {
              ...coin,
              previousPrice: coin.priceUsd,
              priceUsd: newPrice,
            };
          }
          return coin;
        })
      );

      // Update price changes for coloring
      setPriceChanges((prevChanges) => {
        const newChanges = { ...prevChanges };
        Object.keys(updatedPrices).forEach((coinId) => {
          if (prevChanges[coinId] !== undefined) {
            newChanges[coinId] =
              parseFloat(updatedPrices[coinId]) > parseFloat(prevChanges[coinId])
                ? "up"
                : "down";
          }
          newChanges[coinId] = updatedPrices[coinId];
        });
        return newChanges;
      });
    };

    // Auto-refresh data every 60 seconds
    const interval = setInterval(() => {
      fetchCryptoData(limit);
    }, 60000);

    return () => {
      socket.close();
      clearInterval(interval); // Cleanup to prevent memory leaks
    };
  }, [limit]);

  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + 100);
  };

  const filteredCryptos = cryptos.filter((coin) =>
    coin.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 mt-4">
      <h2 className="text-3xl font-bold text-gray-800 text-center mt-10">
        Live Cryptocurrency Prices
      </h2>
      <input
        type="text"
        placeholder="Search crypto..."
        className="w-full p-2 border rounded-md mt-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">Rank</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Market Cap</th>
              <th className="p-3">VWAP (24Hr)</th>
              <th className="p-3">Supply</th>
              <th className="p-3">Volume (24Hr)</th>
              <th className="p-3">Change (24Hr)</th>
              <th className="p-3">Favorite</th>
            </tr>
          </thead>
          <tbody>
            {filteredCryptos.length > 0 ? (
              filteredCryptos.map((coin) => {
                const priceClass =
                  priceChanges[coin.id] === "up"
                    ? "text-green-500 animate-pulse"
                    : priceChanges[coin.id] === "down"
                    ? "text-red-500 animate-pulse"
                    : "";

                return (
                  <tr key={coin.id} className="border-b">
                    <td className="p-3">{coin.rank}</td>
                    <td className="p-3 flex items-center">
                      <img
                        src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                        alt={coin.name}
                        className="w-6 h-6 mr-2"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/crypto.png";
                        }}
                      />
                      <Link href={`/crypto/${coin.id}`} className="text-blue-600 hover:underline">
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </Link>
                    </td>
                    <td className={`p-3 font-semibold ${priceClass}`}>
                      ${Number(coin.priceUsd).toFixed(2)}
                    </td>
                    <td className="p-3">${(Number(coin.marketCapUsd) / 1e9).toFixed(2)}B</td>
                    <td className="p-3">${Number(coin.vwap24Hr).toFixed(2)}</td>
                    <td className="p-3">{(Number(coin.supply) / 1e6).toFixed(2)}M</td>
                    <td className="p-3">${(Number(coin.volumeUsd24Hr) / 1e9).toFixed(2)}B</td>
                    <td
                      className={`p-3 ${
                        Number(coin.changePercent24Hr) < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {Number(coin.changePercent24Hr).toFixed(2)}%
                    </td>
                    <td className="p-3">
                      <button onClick={() => dispatch(toggleFavoriteCrypto(coin.id))}>
                        {favoriteCryptos.includes(coin.id) ? "⭐" : "☆"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  Reload...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={loadMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
