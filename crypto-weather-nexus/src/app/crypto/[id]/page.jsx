"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function CryptoDetailsPage() {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await res.json();
        setCrypto(data || null);
      } catch (err) {
        console.error("Error fetching crypto details:", err);
        setCrypto(null);
      }
    };

    const fetchHistoricalData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
        );
        const data = await res.json();
        if (Array.isArray(data.prices)) {
          setHistoricalData(data.prices); // [ [timestamp, price], ... ]
        } else {
          setHistoricalData([]);
        }
      } catch (err) {
        console.error("Error fetching historical data:", err);
        setHistoricalData([]);
      }
    };

    fetchCryptoDetails();
    fetchHistoricalData();
    setLoading(false);
  }, [id]);

  if (loading || !crypto)
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4 mt-8">
        {crypto.name} Details
      </h2>

      {/* Current Price Section */}
      <div className="bg-gray-100 p-4 rounded-lg text-center mb-6">
        <p className="text-lg font-medium text-gray-600">Current Price</p>
        <p className="text-2xl font-bold text-green-500">
          ${crypto.market_data?.current_price?.usd
            ? crypto.market_data.current_price.usd.toFixed(2)
            : "Reload again..."}
        </p>
      </div>

      {/* Historical Prices Section */}
      <h3 className="text-xl font-semibold text-gray-700 text-center mb-3">
        Historical Prices (Last 7 Days)
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {historicalData.length > 0 ? (
              historicalData.map(([timestamp, price], index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3">
                    {new Date(timestamp).toISOString().split("T")[0]}
                  </td>
                  <td className="p-3 font-semibold text-blue-500">
                    ${price.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center p-4 text-gray-500">
                  Reload...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
