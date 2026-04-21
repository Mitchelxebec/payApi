import {
  Check,
  ExternalLink,
  RefreshCw,
  Copy,
  Wallet,
  CheckCheck,
} from "lucide-react";
import { useState } from "react"; // Added useState
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const [copied, setCopied] = useState(false);

  // The JSON data from your image
  const jsonData = {
    status: "success",
    request_id: "req_92k8fL90xz",
    data: {
      transaction_hash: "0x71c765...669140",
      gas_fee_usd: 0.0042,
      timestamp: 1715428901,
      payload_delivered: true,
    },
    message: "The Kinetic Ether call executed at 12ms latency.",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] p-6 lg:p-10 text-slate-900">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* LEFT SECTION: Success Message */}
        <div className="flex-1 bg-white rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-xl">
          <div className="w-24 h-24 bg-cyan-100 rounded-full flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20" />
            <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-500/40">
              <Check size={32} strokeWidth={3} />
            </div>
          </div>
          <h1 className="text-3xl font-black mb-4 tracking-tight">
            Payment Successful!
          </h1>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-10">
            Your API call has been authorized and the gasless transaction was
            successfully processed on-chain.
          </p>
          <div className="flex gap-4 w-full max-w-sm">
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
              <ExternalLink size={16} /> View Explorer
            </button>
            <Link to="/dashboard" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200">
              <RefreshCw size={16} /> New Request
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION: Receipt Details */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-cyan-400 to-indigo-500" />
            <h3 className="font-bold text-sm mb-8">Receipt Details</h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider">
                  Service
                </span>
                <span className="font-bold text-gray-800">Neural Mesh API</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider">
                  Amount Paid
                </span>
                <span className="font-bold text-cyan-600">0.0024 ETH</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider">
                  Method
                </span>
                <div className="flex items-center gap-1.5 font-bold text-gray-800">
                  <Wallet size={12} className="text-orange-400" />{" "}
                  <span>MetaMask...f2e3</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-bold uppercase tracking-wider">
                  Status
                </span>
                <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-full text-[10px] font-black">
                  {" "}
                  ● Success{" "}
                </span>
              </div>
              <div className="pt-4">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block mb-2">
                  {" "}
                  Transaction ID{" "}
                </span>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 flex items-center justify-between group">
                  <span className="text-[10px] font-mono text-gray-500 truncate">
                    {" "}
                    PAY-882-X9B-LUMINA-441-PX{" "}
                  </span>
                  <Copy
                    size={12}
                    className="text-gray-300 cursor-pointer hover:text-gray-600"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-br from-gray-200 to-gray-300 rounded-2xl h-32 flex items-center justify-center p-6 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 opacity-50">
              {" "}
              Confirming Your Transaction{" "}
            </p>
          </div>
        </div>
      </div>

      {/* JSON RESULT BLOCK - Updated with logic from image */}
      <div className="max-w-5xl mx-auto mt-6 bg-[#f8fafc] rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gray-100/50 px-6 py-3 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
            <span className="text-blue-500">{"<>"}</span> Result
          </div>
          <button
            onClick={handleCopy}
            className="text-[10px] font-bold text-gray-500 hover:text-blue-600 flex items-center gap-2 transition-colors"
          >
            {copied ? "Copied!" : "Copy JSON"}
            {copied ? (
              <CheckCheck size={12} className="text-green-500" />
            ) : (
              <Copy size={12} />
            )}
          </button>
        </div>
        <div className="p-6 overflow-x-auto">
          <pre className="text-xs font-mono text-blue-900 leading-relaxed">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
