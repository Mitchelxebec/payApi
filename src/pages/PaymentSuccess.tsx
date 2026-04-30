import {
  Check,
  RefreshCw,
  Copy,
  Wallet,
  CheckCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTransactions } from "../context/transactions/useTransaction";

const PaymentSuccess = () => {
  const [copiedTx, setCopiedTx] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const [params] = useSearchParams();
  const txHash = params.get("tx");

  const { addTransaction } = useTransactions();

  // ✅ prevents duplicate inserts (NO re-render loop)
  const hasAddedRef = useRef(false);

  const shortTx = txHash
    ? `${txHash.slice(0, 6)}...${txHash.slice(-4)}`
    : null;

  const jsonData = {
    status: "success",
    request_id: "req_92k8fL90xz",
    data: {
      transaction_hash: txHash ?? "N/A",
      gas_fee_usd: 0.0042,
      timestamp: 1715428901,
      payload_delivered: true,
    },
    message: "The Kinetic Ether call executed at 12ms latency.",
  };

  // ✅ THIS is the ONLY thing needed for dashboard update
  useEffect(() => {
    if (!txHash || hasAddedRef.current) return;

    addTransaction({
      id: txHash,
      service: "Neural Mesh API",
      amount: "1 XLM",
      method: "crypto",
      status: "Success",
      hash: txHash,
      timestamp: new Date().toLocaleString(),
      icon: <Check size={18} />,
    });

    hasAddedRef.current = true;
  }, [txHash, addTransaction]);

  const handleCopyJson = () => {
    if (!txHash) return;
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleCopyTx = () => {
    if (!txHash) return;
    navigator.clipboard.writeText(txHash);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] p-6 lg:p-10 text-slate-900">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* LEFT SECTION */}
        <div className="flex-1 bg-white rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-xl">
          <div className="w-24 h-24 bg-cyan-100 rounded-full flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20" />
            <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center text-white shadow-lg">
              <Check size={32} strokeWidth={3} />
            </div>
          </div>

          <h1 className="text-3xl font-black mb-4 tracking-tight">
            Payment Successful!
          </h1>

          <p className="text-gray-500 text-sm max-w-xs mb-10">
            Your API call has been processed successfully.
          </p>

          <div className="flex gap-4 w-full max-w-sm">
            <a
              href={
                txHash
                  ? `https://stellar.expert/explorer/testnet/tx/${txHash}`
                  : "#"
              }
              target="_blank"
              className="flex-1 text-center font-bold py-3 rounded-xl text-sm bg-gray-100"
            >
              View Explorer
            </a>

            <Link
              to="/dashboard"
              className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} /> Dashboard
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-sm mb-8">Receipt Details</h3>

            <div className="space-y-5">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Service</span>
                <span className="font-bold">Neural Mesh API</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Amount</span>
                <span className="font-bold text-cyan-600">1 XLM</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Method</span>
                <div className="flex items-center gap-1">
                  <Wallet size={12} />
                  Freighter Wallet
                </div>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Status</span>
                <span className="text-green-600 font-bold">Success</span>
              </div>

              <div className="pt-4">
                <span className="text-gray-400 text-[10px]">Tx ID</span>

                <div
                  onClick={handleCopyTx}
                  className="bg-gray-50 p-3 flex justify-between cursor-pointer"
                >
                  <span className="text-xs font-mono">
                    {shortTx ?? "N/A"}
                  </span>

                  {copiedTx ? (
                    <CheckCheck size={12} />
                  ) : (
                    <Copy size={12} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON BLOCK */}
      <div className="max-w-5xl mx-auto mt-6 bg-white rounded-2xl border p-6">
        <button onClick={handleCopyJson} className="text-sm text-blue-500">
          {copiedJson ? "Copied!" : "Copy JSON"}
        </button>

        <pre className="text-xs mt-4">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default PaymentSuccess;