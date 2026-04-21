import { useState } from "react";
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
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import UsageAnalytics from "../components/dashboardComponents/UsageAnalytics";
import TransactionTable from "../components/dashboardComponents/TransactionTable";
import SpendingTrends from "../components/dashboardComponents/SpendingTrends";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-dark-bg text-white font-space-grotesk overflow-x-hidden">
      {/* --- MOBILE OVERLAY --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside
        className={`
    fixed inset-y-0 left-0 z-50 w-64 bg-dark-bg border-r border-white/5 flex flex-col p-6 transition-transform duration-300 
    lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="payApi-logo" className="h-8 w-auto" />
            <h1 className="text-xl font-bold tracking-tight">
              <Link to="/">PayAPI</Link>
            </h1>
          </div>
          {/* Close button for mobile */}
          <button className="lg:hidden text-gray-400" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
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

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-brand-cyan to-brand-purple" />
          <div>
            <p className="text-sm font-bold">PayAPI Admin</p>
            <p className="text-xs text-gray-500">Verified Entity</p>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 lg:px-8 lg:py-8 bg-dark-bg/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            {/* Hamburger Icon */}
            <button
              className="lg:hidden p-2 text-brand-cyan"
              onClick={toggleSidebar}
            >
              <Menu size={28} />
            </button>

            <div className="relative w-full max-w-md hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#1A1A22] border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-cyan/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <Bell size={20} className="text-gray-400 cursor-pointer xs:block" />
            <button className="bg-[#363636] text-[#00DBE7] hover:brightness-110 active:scale-95 cursor-pointer px-4 lg:px-6 py-2 border-[#00DBE7] border rounded-lg font-semibold transition-all text-xs lg:text-sm whitespace-nowrap">
              Connect Wallet
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-4 lg:p-8 space-y-8 overflow-y-auto">
          {/* Stats Row - Swiping on mobile, Grid on desktop */}
          <div className="flex overflow-x-auto pb-4 gap-4 lg:grid lg:grid-cols-5 lg:overflow-visible no-scrollbar">
            {[
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
                sub: "~",
                icon: <CheckCircle size={16} />,
                color: "border-green-500",
              },
              {
                label: "FAILED REQUESTS",
                value: "24",
                sub: "-2%",
                icon: <AlertCircle size={16} />,
                color: "border-red-500",
                textColor: "text-red-500",
              },
              {
                label: "WALLET BALANCE",
                value: "1,240.5 XLM",
                sub: "STELLAR",
                icon: <Wallet size={16} />,
                color: "border-brand-cyan",
              },
            ].map((stat, idx) => (
              <div key={idx} className="min-w-50 lg:min-w-0 flex-1">
                <StatCard {...stat} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Usage Analytics */}
            <UsageAnalytics />

            {/* Available Services */}
            <div className="bg-[#1A1A22] rounded-2xl border border-white/5 p-6">
              <div className="flex items-center gap-2 mb-6 text-brand-cyan">
                <div className="w-1 h-4 bg-brand-cyan" />
                <h3 className="font-bold text-sm tracking-widest uppercase">
                  Available Services
                </h3>
              </div>
              <div className="space-y-4">
                <ServiceActionCard
                  name="AI Search API"
                  price="$0.01 / req"
                  icon={<Search size={18} />}
                />
                <ServiceActionCard
                  name="News Data API"
                  price="$0.02 / req"
                  icon={<FileText size={18} />}
                />
                <ServiceActionCard
                  name="Crypto Rates API"
                  price="$0.01 / req"
                  icon={<Activity size={18} />}
                />
              </div>
            </div>
          </div>

          {/* TRANSACTION TABLE */}
          <TransactionTable />

          {/* SPENDING TRENDS */}
          <SpendingTrends />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
