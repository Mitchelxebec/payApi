import { useState, useContext } from "react";
import {
  LayoutDashboard,
  FileText,
  Key,
  Menu,
  X,
  Pencil,
  Trash2,
  Copy,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import SidebarLink from "../components/dashboardComponents/SidebarLink";
import { WalletConnect } from "../components/WalletConnect";
import { WalletContext } from "../context/WalletContext";
import logo from "../assets/logo.png";

interface ApiKey {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  maskedKey: string;
  createdAt: string;
}

const MOCK_KEYS: ApiKey[] = [
  {
    id: "1",
    name: "Main Payments Service",
    tag: "PAYMENTS API",
    tagColor: "bg-purple-600 text-purple-100",
    maskedKey: "sk-pay_••••••••4f2x",
    createdAt: "Oct 12, 2023",
  },
  {
    id: "2",
    name: "Neural Processing Unit",
    tag: "AI SERVICE",
    tagColor: "bg-cyan-700 text-cyan-100",
    maskedKey: "sk-ai_•••••••••99q1",
    createdAt: "Nov 04, 2023",
  },
];

const USAGE_STATS = [
  { label: "AI Requests", used: 12071, total: 1000, unit: "req" },
  { label: "Payment Calls", used: 2300, total: 10000, unit: "req" },
  { label: "Crypto Lookups", used: 10, total: 100, unit: "k req" },
];

const ApiKeys = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [keys, setKeys] = useState<ApiKey[]>(MOCK_KEYS);

  const wallet = useContext(WalletContext);
  if (!wallet) return null;

  const toggleSidebar = () => setIsSidebarOpen((p) => !p);

  const handleCopy = (key: ApiKey) => {
    navigator.clipboard.writeText(key.maskedKey);
    setCopiedId(key.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
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
            <img src={logo} className="h-8" alt="logo" />
            <h1 className="text-xl font-bold">
              <Link to="/">PayAPI</Link>
            </h1>
          </div>
          <button className="lg:hidden" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          <Link to="/dashboard">
            <SidebarLink
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
            />
          </Link>
          <SidebarLink icon={<Key size={20} />} label="API Keys" active />
          <Link to="/docs">
            <SidebarLink icon={<FileText size={20} />} label="Docs" />
          </Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {/* HEADER */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 lg:px-8 bg-[#0b0e11]/50 backdrop-blur sticky top-0 z-30">
          <button className="lg:hidden" onClick={toggleSidebar}>
            <Menu size={28} />
          </button>
          <div className="flex-1" />
          <WalletConnect />
        </header>

        {/* CONTENT */}
        <div className="p-4 lg:p-10 max-w-5xl w-full mx-auto space-y-8">
          {/* PAGE TITLE */}
          <div>
            <h1 className="text-3xl font-bold text-white">API Keys</h1>
            <p className="text-gray-400 text-sm mt-1 max-w-md">
              Manage your API keys and control access to services. Create unique
              identifiers for each of your applications to track performance and
              security.
            </p>
          </div>

          {/* ACTIVE KEYS */}
          <div className="bg-[#111418] rounded-2xl border border-white/5 overflow-hidden">
            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Active Keys ({keys.length})
              </span>
              {/* filter icon */}
              <button className="text-gray-500 hover:text-gray-300 transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="11" y1="18" x2="13" y2="18" />
                </svg>
              </button>
            </div>

            {/* Key rows */}
            <div className="divide-y divide-white/5">
              {keys.length === 0 && (
                <p className="text-gray-500 text-sm px-6 py-8">
                  No active keys.
                </p>
              )}
              {keys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between px-6 py-5 hover:bg-white/2 transition-colors"
                >
                  {/* Left: name + masked key */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-white text-sm">
                        {key.name}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${key.tagColor}`}
                      >
                        {key.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="text-xs font-mono">{key.maskedKey}</span>
                      <button
                        onClick={() => handleCopy(key)}
                        className="hover:text-gray-300 transition-colors"
                      >
                        {copiedId === key.id ? (
                          <Check size={12} className="text-green-400" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Right: date + actions */}
                  <div className="flex items-center gap-6 shrink-0 ml-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Created
                      </p>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {key.createdAt}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-[#1c2127] rounded-lg border border-white/5 hover:bg-[#252a32] transition-colors text-gray-400 hover:text-white">
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(key.id)}
                        className="p-2 bg-[#1c2127] rounded-lg border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 transition-colors text-gray-400 hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* USAGE & GLOBAL LIMITS */}
          <div className="bg-[#111418] rounded-2xl border border-white/5 p-6">
            <div className="flex items-center gap-2 mb-6">
              {/* usage icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <h3 className="text-white font-bold text-sm">
                Usage & Global Limits
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {USAGE_STATS.map((stat) => {
                const pct = Math.min((stat.used / stat.total) * 100, 100);
                const isOver = pct >= 100;
                return (
                  <div key={stat.label} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-medium">
                        {stat.label}
                      </span>
                      <span
                        className={`font-mono font-bold ${isOver ? "text-red-400" : "text-gray-300"}`}
                      >
                        {stat.used.toLocaleString()} /{" "}
                        {stat.total.toLocaleString()} {stat.unit}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#0b0e11] rounded-full overflow-hidden border border-white/5">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isOver
                            ? "bg-red-500"
                            : pct > 70
                              ? "bg-amber-400"
                              : "bg-cyan-400"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiKeys;
