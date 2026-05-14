import { useState, useContext, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Key,
  Menu,
  X,
  Trash2,
  Loader2,
  FlaskConical,
} from "lucide-react";
import { Link } from "react-router-dom";
import SidebarLink from "../components/dashboardComponents/SidebarLink";
import { WalletConnect } from "../components/WalletConnect";
import { WalletContext } from "../context/WalletContext";
import logo from "../assets/logo.png";

const API_BASE = import.meta.env.VITE_API_URL;

interface ApiKey {
  _id: string;
  service: string;
  status: string;
  keyHash: string;
  limits: { daily: number; monthly: number };
  usage: { daily: number; monthly: number };
  createdAt: string;
}

const SERVICE_COLORS: Record<string, string> = {
  "Crypto API": "bg-cyan-700 text-cyan-100",
  "News API": "bg-purple-600 text-purple-100",
  "AI Search API": "bg-green-700 text-green-100",
};

const ApiKeys = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);

  const wallet = useContext(WalletContext);
  const address = wallet?.address ?? null;

  const toggleSidebar = () => setIsSidebarOpen((p) => !p);

  useEffect(() => {
    if (!address) return;

    fetch(`${API_BASE}/api/v1/auth/keys`, {
      headers: { "x-wallet-address": address },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setKeys(data.data);
      })
      .catch(console.error)
      .finally(() => setFetched(true));
  }, [address]);

  const loading = address && !fetched;

  const handleRevoke = async (key: ApiKey) => {
    if (!address) return;
    setRevoking(key._id);
    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/keys/revoke`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: address, service: key.service }),
      });
      const data = await res.json();
      if (data.success)
        setKeys((prev) => prev.filter((k) => k._id !== key._id));
    } catch (err) {
      console.error(err);
    } finally {
      setRevoking(null);
    }
  };

  if (!wallet) return null;

  return (
    <div className="flex min-h-screen bg-[#0b0e11] text-white font-space-grotesk overflow-x-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0b0e11] border-r border-white/5 flex flex-col p-6 transition-transform duration-300 lg:sticky lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
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
            <Link to="/playground">
              <SidebarLink icon={<FlaskConical size={20} />} label="API Playground" />
            </Link>
          </Link>
          <SidebarLink icon={<Key size={20} />} label="API Keys" active />
          <Link to="/docs">
            <SidebarLink icon={<FileText size={20} />} label="Docs" />
          </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 lg:px-8 py-5 bg-[#0b0e11]/50 backdrop-blur sticky top-0 z-30">
          <button className="lg:hidden" onClick={toggleSidebar}>
            <Menu size={28} />
          </button>
          <div className="flex-1" />
          <WalletConnect />
        </header>

        <div className="p-4 lg:p-10 max-w-5xl w-full mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white">API Keys</h1>
            <p className="text-gray-400 text-sm mt-1 max-w-md">
              Manage your API keys and control access to services.
            </p>
          </div>

          {/* ACTIVE KEYS */}
          <div className="bg-[#111418] rounded-2xl border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Active Keys ({keys.length})
              </span>
            </div>

            <div className="divide-y divide-white/5">
              {loading && (
                <div className="flex items-center gap-2 px-6 py-8 text-gray-500">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Loading keys...</span>
                </div>
              )}
              {!loading && !address && (
                <p className="text-gray-500 text-sm px-6 py-8">
                  Connect your wallet to view keys.
                </p>
              )}
              {!loading && address && keys.length === 0 && (
                <div className="px-6 py-8 text-center">
                  <p className="text-gray-500 text-sm mb-4">No active keys.</p>
                  <Link
                    to="/dashboard"
                    className="text-cyan-400 text-sm hover:underline"
                  >
                    Go to Dashboard to purchase a service →
                  </Link>
                </div>
              )}
              {keys.map((key) => (
                <div
                  key={key._id}
                  className="flex items-center justify-between px-6 py-5 hover:bg-white/2 transition-colors"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-white text-sm">
                        {key.service}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${SERVICE_COLORS[key.service] ?? "bg-gray-700 text-gray-100"}`}
                      >
                        {key.service}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      <span className="text-xs font-mono">
                        {key.keyHash.slice(0, 8)}••••••••{key.keyHash.slice(-4)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 ml-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Created
                      </p>
                      <p className="text-xs text-gray-300 mt-0.5">
                        {new Date(key.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRevoke(key)}
                      disabled={revoking === key._id}
                      className="p-2 bg-[#1c2127] rounded-lg border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 transition-colors text-gray-400 hover:text-red-400 disabled:opacity-50"
                    >
                      {revoking === key._id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* USAGE */}
          {keys.length > 0 && (
            <div className="bg-[#111418] rounded-2xl border border-white/5 p-6">
              <h3 className="text-white font-bold text-sm mb-6">
                Usage & Limits
              </h3>
              <div className="space-y-6">
                {keys.map((key) => {
                  const dailyPct = Math.min(
                    (key.usage.daily / key.limits.daily) * 100,
                    100,
                  );
                  const monthlyPct = Math.min(
                    (key.usage.monthly / key.limits.monthly) * 100,
                    100,
                  );
                  return (
                    <div key={key._id}>
                      <p className="text-xs font-bold text-gray-400 mb-3">
                        {key.service}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500">Daily</span>
                            <span className="text-gray-300 font-mono">
                              {key.usage.daily} / {key.limits.daily}
                            </span>
                          </div>
                          <div className="h-1.5 bg-[#0b0e11] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${dailyPct >= 100 ? "bg-red-500" : dailyPct > 70 ? "bg-amber-400" : "bg-cyan-400"}`}
                              style={{ width: `${dailyPct}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500">Monthly</span>
                            <span className="text-gray-300 font-mono">
                              {key.usage.monthly} / {key.limits.monthly}
                            </span>
                          </div>
                          <div className="h-1.5 bg-[#0b0e11] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${monthlyPct >= 100 ? "bg-red-500" : monthlyPct > 70 ? "bg-amber-400" : "bg-purple-400"}`}
                              style={{ width: `${monthlyPct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ApiKeys;
