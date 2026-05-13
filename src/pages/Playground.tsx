import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check, Play, Loader2, ChevronDown } from "lucide-react";

const API_BASE = "https://payapi-backend-production.up.railway.app";

interface ServiceConfig {
  endpoint: string;
  paramKey: string;
  paramLabel: string;
  defaultParam: string;
  placeholder: string;
  color: string;
  badge: string;
}

const SERVICE_CONFIG: Record<string, ServiceConfig> = {
  "Crypto API": {
    endpoint: "/api/v1/payapi/crypto-price",
    paramKey: "coin",
    paramLabel: "Coin ID",
    defaultParam: "bitcoin",
    placeholder: "e.g. bitcoin, ethereum, solana",
    color: "cyan",
    badge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  "News API": {
    endpoint: "/api/v1/payapi/news",
    paramKey: "q",
    paramLabel: "Search Query",
    defaultParam: "crypto",
    placeholder: "e.g. bitcoin, blockchain, defi",
    color: "purple",
    badge: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  },
  "AI Search API": {
    endpoint: "/api/v1/payapi/ai-search",
    paramKey: "q",
    paramLabel: "Search Query",
    defaultParam: "what is bitcoin",
    placeholder: "e.g. what is blockchain",
    color: "green",
    badge: "bg-green-500/10 border-green-500/30 text-green-400",
  },
};

const Playground = () => {
  const navigate = useNavigate();

  // Read from sessionStorage — key is never exposed in the URL
  const serviceFromStorage = sessionStorage.getItem("payapi_service") ?? "Crypto API";
  const keyFromStorage = sessionStorage.getItem("payapi_key") ?? "";

  const [service] = useState(serviceFromStorage);
  const [apiKey, setApiKey] = useState(keyFromStorage);
  const [param, setParam] = useState(
    SERVICE_CONFIG[serviceFromStorage]?.defaultParam ?? "",
  );
  const [showKey, setShowKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{
    status: number;
    data: unknown;
  } | null>(null);

  const config = SERVICE_CONFIG[service];

  const builtUrl = `${API_BASE}${config.endpoint}?${config.paramKey}=${encodeURIComponent(param)}`;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(builtUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyResponse = () => {
    if (!response) return;
    navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  const handleRun = async () => {
    if (!apiKey || !param) return;
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(builtUrl, {
        headers: { "x-api-key": apiKey },
      });
      const data = await res.json();
      setResponse({ status: res.status, data });
    } catch {
      setResponse({ status: 0, data: { error: "Network error — request failed" } });
    } finally {
      setLoading(false);
    }
  };

  const maskKey = (key: string) =>
    key.length > 12 ? `${key.slice(0, 6)}••••••••••••${key.slice(-4)}` : key;

  const statusColor =
    response?.status === 200
      ? "text-green-400"
      : response?.status === 0
        ? "text-red-400"
        : "text-amber-400";

  const statusLabel =
    response?.status === 200
      ? "200 — OK"
      : response?.status === 0
        ? "Network Error"
        : `${response?.status} — Error`;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center space-y-2 mb-10">
          <span className={`text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 border rounded-full ${config.badge}`}>
            {service}
          </span>
          <h1 className="text-3xl font-bold mt-3">API Playground</h1>
          <p className="text-gray-400 text-sm">
            Try your API key live and see real responses.
          </p>
        </div>

        {/* API Key Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            Your API Key
          </p>
          <div className="flex items-center justify-between bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 gap-3">
            <span className="font-mono text-sm text-green-400 truncate">
              {showKey ? apiKey : maskKey(apiKey)}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowKey((p) => !p)}
                className="text-[10px] text-gray-500 hover:text-white transition-colors border border-white/10 rounded px-2 py-1"
              >
                {showKey ? "Hide" : "Show"}
              </button>
              <button
                onClick={handleCopyKey}
                className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-white transition-colors border border-white/10 rounded px-2 py-1"
              >
                {copiedKey ? (
                  <><Check size={11} className="text-green-400" /> Copied</>
                ) : (
                  <><Copy size={11} /> Copy</>
                )}
              </button>
            </div>
          </div>
          {!apiKey && (
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">
                Paste your API key to get started
              </label>
              <input
                type="text"
                placeholder="Paste your API key here..."
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
              />
            </div>
          )}
          <p className="text-[10px] text-amber-400/70">
            Save this key — it will never be shown again after you leave this page.
          </p>
        </div>

        {/* Request Builder */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            Request
          </p>

          {/* Param input */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">
              {config.paramLabel}
            </label>
            <input
              type="text"
              value={param}
              onChange={(e) => setParam(e.target.value)}
              placeholder={config.placeholder}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          {/* Built URL */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">
              Endpoint URL
            </label>
            <div className="flex items-center justify-between bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 gap-3">
              <span className="font-mono text-xs text-cyan-400 truncate">
                {builtUrl}
              </span>
              <button
                onClick={handleCopyUrl}
                className="shrink-0 flex items-center gap-1 text-[10px] text-gray-500 hover:text-white transition-colors border border-white/10 rounded px-2 py-1"
              >
                {copiedUrl ? (
                  <><Check size={11} className="text-green-400" /> Copied</>
                ) : (
                  <><Copy size={11} /> Copy</>
                )}
              </button>
            </div>
          </div>

          {/* Run button */}
          <button
            onClick={handleRun}
            disabled={loading || !apiKey || !param}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold rounded-xl text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Running...</>
            ) : (
              <><Play size={14} /> Run Request</>
            )}
          </button>
        </div>

        {/* Response */}
        {response && (
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                  Response
                </p>
                <span className={`text-xs font-bold font-mono ${statusColor}`}>
                  {statusLabel}
                </span>
              </div>
              <button
                onClick={handleCopyResponse}
                className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-white transition-colors border border-white/10 rounded px-2 py-1"
              >
                {copiedResponse ? (
                  <><Check size={11} className="text-green-400" /> Copied</>
                ) : (
                  <><Copy size={11} /> Copy</>
                )}
              </button>
            </div>
            <pre className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 text-xs text-green-300 overflow-x-auto max-h-96 overflow-y-auto leading-relaxed">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        )}

        {/* Code snippet */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Use in your app
            </p>
            <ChevronDown size={14} className="text-gray-500" />
          </div>
          <pre className="bg-[#0d1117] border border-[#30363d] rounded-xl p-4 text-xs text-gray-300 overflow-x-auto leading-relaxed">
{`const res = await fetch(
  "${API_BASE}${config.endpoint}?${config.paramKey}=${param}",
  {
    headers: {
      "x-api-key": "YOUR_API_KEY"
    }
  }
);
const data = await res.json();
console.log(data);`}
          </pre>
        </div>

        {/* Nav */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => navigate("/api-keys")}
            className="flex-1 py-3 bg-transparent border border-[#30363d] rounded-xl text-sm text-gray-400 hover:text-white hover:border-gray-600 transition-all"
          >
            View API Keys
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 py-3 bg-transparent border border-[#30363d] rounded-xl text-sm text-gray-400 hover:text-white hover:border-gray-600 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playground;
