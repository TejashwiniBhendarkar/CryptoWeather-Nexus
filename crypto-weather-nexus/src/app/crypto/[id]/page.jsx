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
        const res = await fetch(`https://api.coincap.io/v2/assets/${id}`, {
          cache: "no-store",
        });
        const data = await res.json();
        console.log("Crypto Details Response:", data); // Debugging
        setCrypto(data.data || null);
      } catch (err) {
        console.error("Error fetching crypto details:", err);
        setCrypto(null);
      }
    };

    const fetchHistoricalData = async () => {
      try {
        const res = await fetch(
          `https://api.coincap.io/v2/assets/${id}/history?interval=d1`,
          { cache: "no-store" }
        );
        const data = await res.json();
        console.log("Historical Data Response:", data); // Debugging

        if (Array.isArray(data.data)) {
          setHistoricalData(data.data);
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
        {crypto.name} Details
      </h2>

      {/* Current Price Section */}
      <div className="bg-gray-100 p-4 rounded-lg text-center mb-6">
        <p className="text-lg font-medium text-gray-600">Current Price</p>
        <p className="text-2xl font-bold text-green-500">
          ${crypto?.priceUsd ? Number(crypto.priceUsd).toFixed(2) : "Reload again..."}
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
              historicalData.slice(-7).map((entry, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3">
                    {entry?.time
                      ? new Date(entry.time).toISOString().split("T")[0]
                      : "N/A"}
                  </td>
                  <td className="p-3 font-semibold text-blue-500">
                    ${entry?.priceUsd ? Number(entry.priceUsd).toFixed(2) : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center p-4 text-gray-500">
                  reload....
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
