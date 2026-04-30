import AnalyticsSection from "../components/billingsComponents/AnalyticsSection";
import Sidebar from "../components/billingsComponents/Sidebar";
import StatCard from "../components/billingsComponents/StatCard";
import Navbar from "../components/Navbar";
import { Copy } from "lucide-react";
import { useState, useContext } from "react";
import TransactionSection from "../components/billingsComponents/TransactionSection";
import { WalletContext } from "../context/WalletContext";

const Billing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const wallet = useContext(WalletContext);
  if (!wallet) throw new Error("WalletContext not found");

  const { address, fundWallet, fundingState, balance, isBalanceLoading } =
    wallet;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [copiedAddr, setCopiedAddr] = useState(false);
  const isRich = balance !== null && Number(balance) > 1000;

  const handleCopyAddress = () => {
    if (!address) return;

    navigator.clipboard.writeText(address);
    setCopiedAddr(true);

    setTimeout(() => setCopiedAddr(false), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0b0e11] overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#0b0e11]">
          <div className="flex flex-col lg:flex-row gap-4 text-white max-w-6xl mx-auto">
            <div className="flex-1 bg-[#111418] rounded-2xl p-8 border border-white/5 flex flex-col justify-center">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-4 tracking-widest">
                Active Balance
              </h3>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">
                      {!address
                        ? "Connect Wallet"
                        : isBalanceLoading && !balance
                          ? "Syncing..."
                          : balance}
                    </span>
                    <span className="text-4xl font-bold text-cyan-400">
                      XLM
                    </span>
                  </div>

                  <div
                    onClick={handleCopyAddress}
                    className="mt-4 flex items-center gap-3 bg-[#1c2127] px-4 py-2 rounded-xl border border-white/5 cursor-pointer hover:bg-[#252a32] transition-all w-fit"
                  >
                    <span className="text-xs font-mono text-gray-300">
                      {address
                        ? `${address.slice(0, 6)}...${address.slice(-6)}`
                        : "Not connected"}
                    </span>

                    {copiedAddr ? (
                      <span className="text-green-400 text-[10px] font-bold">
                        Copied
                      </span>
                    ) : (
                      <Copy className="w-3 h-3 text-gray-500 group-hover:text-gray-300" />
                    )}
                  </div>
                </div>
                <button
                  onClick={() => address && fundWallet(address)}
                  disabled={fundingState === "funding" || !address || isRich}
                  className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 px-6 rounded-xl"
                >
                  {fundingState === "funding" && "Funding..."}
                  {fundingState === "success" && "Funded ✓"}
                  {fundingState === "error" && "Retry"}
                  {fundingState === "idle" &&
                    (isRich ? "Wallet Funded" : "Fund Wallet")}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Total Spent" value="$1,248.62" />
              <StatCard label="API Calls" value="842k" />
              <StatCard label="Success" value="99.8%" color="text-green-400" />
              <StatCard label="Failed" value="24" color="text-red-400" />
            </div>
          </div>

          <AnalyticsSection />
          <TransactionSection />
        </main>
      </div>
    </div>
  );
};

export default Billing;
