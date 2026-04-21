import AnalyticsSection from "../components/billingsComponents/AnalyticsSection";
import Sidebar from "../components/billingsComponents/Sidebar";
import StatCard from "../components/billingsComponents/StatCard";
import Navbar from "../components/Navbar";
import { Plus, Copy } from "lucide-react";
import { useState } from "react";
import TransactionSection from "../components/billingsComponents/TransactionSection";

const Billing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    // h-screen prevents the whole page from scrolling
    <div className="flex flex-col h-screen bg-[#0b0e11] overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar will now stay put */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* This container will scroll independently */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#0b0e11]">
          <div className="flex flex-col lg:flex-row gap-4 text-white max-w-6xl mx-auto">
            {/* LEFT SIDE: Active Balance Card */}
            <div className="flex-1 bg-[#111418] rounded-2xl p-8 border border-white/5 flex flex-col justify-center">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-4 tracking-widest">
                Active Balance
              </h3>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">1,248</span>
                    <span className="text-4xl font-bold text-cyan-400">
                      XLM
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2 bg-[#1c2127] w-fit px-3 py-1.5 rounded-lg border border-white/5 cursor-pointer hover:bg-[#252a32] transition-colors">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    <span className="text-xs font-mono text-gray-400">
                      8x71...C42
                    </span>
                    <Copy className="w-3 h-3 text-gray-500" />
                  </div>
                </div>

                <button className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-transform active:scale-95 whitespace-nowrap">
                  <Plus className="w-5 h-5" />
                  Fund Wallet
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: Stats Grid */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
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
