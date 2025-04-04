import CryptoNews from "@/components/CryptoNews";

export default function Dashboard() {
  return (
    <div className="bg-[#EFF1F3] min-h-screen flex flex-col items-center p-6 mt-10">
      <div className="bg-[#DDE1E6] text-[#2C3E50] p-4 rounded-lg shadow-md border border-[#C1C7D0] hover:bg-[#BDC3C7] transition">
        {/* <h2 className="text-[#1F2937] font-semibold">Crypto News</h2> */}
        <CryptoNews />
      </div>
    </div>
  );
}
