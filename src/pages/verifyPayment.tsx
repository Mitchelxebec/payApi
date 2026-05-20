import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useWallet } from "../context/useWallet";
import { Copy, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const API_BASE = "https://payapi-backend-production.up.railway.app";
const SERVICES = ["Crypto API", "News API", "AI Search API"];

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { address } = useWallet();

  const txHash = searchParams.get("tx") ?? "";
  const serviceFromUrl = searchParams.get("service") ?? SERVICES[0];

  const [service, setService] = useState(serviceFromUrl);
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerify = async () => {
    if (!address || !txHash) return;
    setStatus("loading");

    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: address, txHash, service }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setApiKey(data.apiKey);
      setStatus("success");

      // Store in sessionStorage — key never goes in the URL
      if (data.apiKey) {
        sessionStorage.setItem("payapi_key", data.apiKey);
        sessionStorage.setItem("payapi_service", service);
        setTimeout(() => navigate("/playground"), 1500);
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Verification failed");
      setStatus("error");
    }
  };

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyHash = () => {
    if (!txHash) return;
    navigator.clipboard.writeText(txHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyKey = () => {
    if (!apiKey) return;
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const maskValue = (val: string) =>
    val.length > 12 ? `${val.slice(0, 6)}...${val.slice(-4)}` : val;

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center">
            <CheckCircle className="text-green-400" size={32} />
          </div>
          <h1 className="text-2xl font-bold">Payment Verified</h1>
          <p className="text-gray-400 text-sm">Your API key has been generated</p>
          <span className="text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-full">
            {service}
          </span>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Wallet Address</label>
            <div className="flex items-center justify-between bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3">
              <span className="font-mono text-sm text-cyan-400">
                {address ? maskValue(address) : "No wallet connected"}
              </span>
              <button onClick={handleCopyAddress}>
                {copiedAddress ? <span className="text-[10px] text-green-400">Copied!</span> : <Copy size={14} className="text-gray-500 hover:text-white transition-colors" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Transaction Hash (TxHash)</label>
            <div className="flex items-center justify-between bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3">
              <span className="font-mono text-sm text-cyan-400">{maskValue(txHash)}</span>
              <button onClick={handleCopyHash}>
                {copiedHash ? <span className="text-[10px] text-green-400">Copied!</span> : <Copy size={14} className="text-gray-500 hover:text-white transition-colors" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Service</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-cyan-500/50 transition-colors"
            >
              {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
          <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-400 leading-relaxed">
            Save this key now. It will never be shown again for security reasons. Store it in a secure vault.
          </p>
        </div>

        {status === "success" && apiKey && (
          <div className="mb-6 space-y-3">
            <div className="bg-[#0d1117] border border-green-500/20 rounded-xl p-4">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Your API Key</p>
              <p className="font-mono text-xs text-green-400 break-all">{apiKey}</p>
            </div>
            <button
              onClick={handleCopyKey}
              className="flex items-center justify-center gap-2 w-full py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm hover:bg-green-500/20 transition-all"
            >
              <Copy size={14} />
              {copiedKey ? "Copied!" : "Copy API Key"}
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-sm text-red-400">{errorMsg}</p>
          </div>
        )}

        <div className="space-y-3">
          {status !== "success" && (
            <button
              onClick={handleVerify}
              disabled={status === "loading" || !address || !txHash}
              className="w-full py-3 bg-[#8884FF] text-black font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" ? <><Loader2 size={16} className="animate-spin" /> Verifying on Stellar...</> : "Verify Payment"}
            </button>
          )}
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-3 bg-transparent border border-[#30363d] rounded-xl text-sm text-gray-400 hover:text-white hover:border-gray-600 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPayment;
