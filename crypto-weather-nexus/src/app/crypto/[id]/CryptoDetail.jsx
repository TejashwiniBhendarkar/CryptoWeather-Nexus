// app/crypto/[id]/CryptoDetail.jsx
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CryptoDetail({ initialData }) {
  const [crypto, setCrypto] = useState(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("wss://ws.coincap.io/prices?assets=" + crypto.id);

    socket.onmessage = (event) => {
      const updatedPrice = JSON.parse(event.data)[crypto.id];
      if (updatedPrice) {
        setCrypto((prev) => ({
          ...prev,
          priceUsd: updatedPrice,
        }));
        toast.info(`🔔 ${crypto.name} updated: $${parseFloat(updatedPrice).toFixed(2)}`);
      }
    };

    return () => socket.close();
  }, [crypto.id]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800">{crypto.name} ({crypto.symbol.toUpperCase()})</h1>
      <p className="text-lg text-gray-600">Market Cap: ${Number(crypto.marketCapUsd).toFixed(2)}</p>
      <p className="text-lg text-gray-600">24h Change: {Number(crypto.changePercent24Hr).toFixed(2)}%</p>
      <p className="text-xl font-bold text-blue-500">Current Price: ${parseFloat(crypto.priceUsd).toFixed(2)}</p>
    </div>
  );
}
