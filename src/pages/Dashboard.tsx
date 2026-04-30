import { useState, useContext } from "react";
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  Search,
  Bell,
  Wallet,
  Activity,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";

import StatCard from "../components/dashboardComponents/StatCard";
import SidebarLink from "../components/dashboardComponents/SidebarLink";
import ServiceActionCard from "../components/dashboardComponents/ServiceActionCard";
import UsageAnalytics from "../components/dashboardComponents/UsageAnalytics";
// import TransactionTable from "../components/dashboardComponents/TransactionTable";
import SpendingTrends from "../components/dashboardComponents/SpendingTrends";
import { WalletConnect } from "../components/WalletConnect";

import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { WalletContext } from "../context/WalletContext";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const wallet = useContext(WalletContext);
  if (!wallet) return null;

  const { address, balance, isBalanceLoading } = wallet;

  const toggleSidebar = () => setIsSidebarOpen((p) => !p);

  const balanceDisplay = !address
    ? "Connect Wallet"
    : isBalanceLoading && balance === null
      ? "Syncing..."
      : `${balance ?? "0"} XLM`;

  const stats = [
    {
      label: "TOTAL API CALLS",
      value: "1.2M",
      sub: "24H",
      icon: <Activity size={16} />,
      color: "border-brand-cyan",
    },
    {
      label: "TOTAL SPENT",
      value: "$452.10",
      sub: "SPENT",
      icon: <CreditCard size={16} />,
      color: "border-brand-purple",
    },
    {
      label: "SUCCESS RATE",
      value: "99.8%",
      sub: "STABLE",
      icon: <CheckCircle size={16} />,
      color: "border-green-500",
    },
    {
      label: "FAILED REQUESTS",
      value: "24",
      sub: "MINOR",
      icon: <AlertCircle size={16} />,
      color: "border-red-500",
    },
    {
      label: "WALLET BALANCE",
      value: balanceDisplay,
      sub: "STELLAR",
      icon: <Wallet size={16} />,
      color: "border-brand-cyan",
    },
  ];

  return (
    <div className="flex min-h-screen bg-dark-bg text-white font-space-grotesk overflow-x-hidden">
      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark-bg border-r border-white/5 flex flex-col p-6 transition-transform duration-300 lg:sticky lg:translate-x-0 ${
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
          <Link to="/billing">
            <SidebarLink icon={<CreditCard size={20} />} label="Billing" />
          </Link>
          <Link to="/docs">
            <SidebarLink icon={<FileText size={20} />} label="Docs" />
          </Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {/* HEADER */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 lg:px-8 bg-dark-bg/50 backdrop-blur sticky top-0 z-30 p-4">
          <div className="flex items-center gap-4 flex-1">
            <button className="lg:hidden" onClick={toggleSidebar}>
              <Menu size={28} />
            </button>

            <div className="relative w-full max-w-md hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2"
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
        <div className="p-4 lg:p-8 space-y-8">
          {/* STATS */}
          <div className="grid lg:grid-cols-5 gap-4">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* GRID */}
          <div className="grid xl:grid-cols-3 gap-8">
            <UsageAnalytics />

            <div className="bg-[#1A1A22] rounded-2xl border border-white/5 p-6">
              <h3 className="text-brand-cyan font-bold mb-6">
                Available Services
              </h3>

              <ServiceActionCard
                name="AI Search API"
                price="$0.01 / req"
                icon={<Search size={18} />}
              />
              <ServiceActionCard
                name="News API"
                price="$0.02 / req"
                icon={<FileText size={18} />}
              />
              <ServiceActionCard
                name="Crypto API"
                price="$0.01 / req"
                icon={<Activity size={18} />}
              />
            </div>
          </div>

          {/* TRANSACTIONS */}
          {/* <TransactionTable /> */}

          <SpendingTrends />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
