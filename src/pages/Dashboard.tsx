import { useState, useContext, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Search,
  Bell,
  Activity,
  Menu,
  X,
  Key,
  Copy,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import StatCard from "../components/dashboardComponents/StatCard";
import SidebarLink from "../components/dashboardComponents/SidebarLink";
import ServiceActionCard from "../components/dashboardComponents/ServiceActionCard";
import TransactionSection from "../components/dashboardComponents/TransactionSection";
import { WalletConnect } from "../components/WalletConnect";
import { fetchServices } from "../lib/api";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { WalletContext } from "../context/WalletContext";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedAddr, setCopiedAddr] = useState(false);

  const wallet = useContext(WalletContext);
  const [services, setServices] = useState<
    { name: string; priceInXLM: string }[]
  >([]);

  useEffect(() => {
    fetchServices().then(setServices).catch(console.error);
  }, []);

  if (!wallet) return null;

  const { address, balance, isBalanceLoading, fundWallet, fundingState } =
    wallet;

  const toggleSidebar = () => setIsSidebarOpen((p) => !p);
  const isRich = balance !== null && Number(balance) > 1000;

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopiedAddr(true);
    setTimeout(() => setCopiedAddr(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#0b0e11] text-white font-space-grotesk overflow-x-hidden">
      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0b0e11] border-r border-white/5 flex flex-col p-6 transition-transform duration-300 lg:sticky lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src={logo} className="h-8" />
            <h1 className="text-xl font-bold">
              <Link to="/">PayAPI</Link>
            </h1>
          </div>
          <button className="lg:hidden" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active
          />
          <Link to="/api-keys">
            <SidebarLink icon={<Key size={20} />} label="API Keys" />
          </Link>
          <Link to="/docs">
            <SidebarLink icon={<FileText size={20} />} label="Docs" />
          </Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {/* HEADER */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 lg:px-8 bg-[#0b0e11]/50 backdrop-blur sticky top-0 z-30 p-5">
          <div className="flex items-center gap-4 flex-1">
            <button className="lg:hidden" onClick={toggleSidebar}>
              <Menu size={28} />
            </button>
            <div className="relative w-full max-w-md hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                placeholder="Search..."
                className="w-full bg-[#1A1A22] border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-gray-400" />
            <WalletConnect />
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-4 lg:p-10 space-y-8 max-w-6xl mx-auto w-full">
          {/* ACTIVE BALANCE + STAT CARDS */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Active Balance Hero */}
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
                    {address && (
                      <span className="text-4xl font-bold text-cyan-400">
                        XLM
                      </span>
                    )}
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
                      <Copy className="w-3 h-3 text-gray-500" />
                    )}
                  </div>
                </div>

                <button
                  onClick={() => address && fundWallet(address)}
                  disabled={fundingState === "funding" || !address || isRich}
                  className="bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-black font-bold py-3 px-6 rounded-xl transition-all"
                >
                  {fundingState === "funding" && "Funding..."}
                  {fundingState === "success" && "Funded ✓"}
                  {fundingState === "error" && "Retry"}
                  {fundingState === "idle" &&
                    (isRich ? "Wallet Funded" : "Fund Wallet")}
                </button>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Total Spent"
                value="$1,248.62"
                sub="SPENT"
                icon={<CreditCard size={16} />}
                color="border-brand-purple"
              />
              <StatCard
                label="API Calls"
                value="842k"
                sub="24H"
                icon={<Activity size={16} />}
                color="border-brand-cyan"
              />
              <StatCard
                label="Success"
                value="99.8%"
                sub="STABLE"
                icon={<CheckCircle size={16} />}
                color="border-green-500"
              />
              <StatCard
                label="Failed"
                value="24"
                sub="MINOR"
                icon={<AlertCircle size={16} />}
                color="border-red-500"
              />{" "}
            </div>
          </div>

          {/* AVAILABLE SERVICES */}
          <div className="bg-[#111418] rounded-2xl border border-white/5 p-6">
            <h3 className="text-brand-cyan font-bold mb-6">
              Available Services
            </h3>
            <div className="space-y-3">
              {services.length === 0 ? (
                <p className="text-gray-500 text-sm">Loading services...</p>
              ) : (
                services.map((svc) => (
                  <ServiceActionCard
                    key={svc.name}
                    name={svc.name}
                    price={`${svc.priceInXLM} XLM / req`}
                    priceInXLM={svc.priceInXLM}
                    icon={
                      svc.name === "AI Search API" ? (
                        <Search size={18} />
                      ) : svc.name === "News API" ? (
                        <FileText size={18} />
                      ) : (
                        <Activity size={18} />
                      )
                    }
                  />
                ))
              )}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-[#111418] rounded-2xl border border-white/5 p-6">
            <h3 className="text-brand-cyan font-bold mb-6">Recent Activity</h3>
            <TransactionSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
