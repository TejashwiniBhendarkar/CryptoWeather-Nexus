export default function CryptoCard({ coin }) {
  const imageUrl = coin.image || `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
      <img src={imageUrl} alt={coin.name} className="w-16 h-16 mx-auto" />
      <h3 className="text-xl font-semibold text-gray-800 mt-2">{coin.name}</h3>
      <p className="text-gray-600">
        ${coin.current_price ? coin.current_price.toFixed(2) : "N/A"}
      </p>
    </div>
  );
}
