import { Search, FileText, Activity, Box, CreditCard } from "lucide-react";
import type { ReactNode } from "react";

interface Transaction {
  id: string;
  service: string;
  amount: string;
  method: "crypto" | "card";
  status: "Success" | "Pending" | "Failed";
  hash: string;
  timestamp: string;
  icon: ReactNode;
}

const TransactionTable = () => {
  const transactions: Transaction[] = [
    {
      id: "1",
      service: "AI Search API",
      amount: "0.05 XLM",
      method: "crypto",
      status: "Success",
      hash: "0x7a2...4f9d",
      timestamp: "2 mins ago",
      icon: <Search size={16} />,
    },
    {
      id: "2",
      service: "News Data API",
      amount: "0.12 XLM",
      method: "card",
      status: "Success",
      hash: "0x3b1...2e1a",
      timestamp: "14 mins ago",
      icon: <FileText size={16} />,
    },
    {
      id: "3",
      service: "Crypto Rates API",
      amount: "0.05 XLM",
      method: "crypto",
      status: "Success",
      hash: "0x9c4...11b2",
      timestamp: "45 mins ago",
      icon: <Activity size={16} />,
    },
  ];

  return (
    <div className="bg-[#1A1A22] rounded-2xl border border-white/5 p-6 w-full font-space-grotesk">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold tracking-tight text-white">
          Recent Micro-Payments
        </h3>
        <button className="text-brand-cyan text-sm font-bold hover:underline cursor-pointer">
          View All Activity
        </button>
      </div>

      {/* Table Wrapper for Horizontal Scroll on Mobile */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-200">
          <thead>
            <tr className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase border-b border-white/5">
              <th className="pb-4 font-bold">Service</th>
              <th className="pb-4 font-bold">Amount</th>
              <th className="pb-4 font-bold text-center">Method</th>
              <th className="pb-4 font-bold text-center">Status</th>
              <th className="pb-4 font-bold">Tx Hash</th>
              <th className="pb-4 font-bold text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="group hover:bg-white/2 transition-colors"
              >
                {/* Service Name */}
                <td className="py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#0D0D12] rounded-lg border border-white/5 flex items-center justify-center text-brand-cyan">
                      {tx.icon}
                    </div>
                    <span className="text-sm font-bold text-white">
                      {tx.service}
                    </span>
                  </div>
                </td>

                {/* Amount */}
                <td className="py-5 text-sm font-bold text-white">
                  {tx.amount}
                </td>

                {/* Method Icon */}
                <td className="py-5">
                  <div className="flex justify-center text-gray-500">
                    {tx.method === "crypto" ? (
                      <Box size={18} />
                    ) : (
                      <CreditCard size={18} />
                    )}
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-5 text-center">
                  <span className="px-4 py-1 rounded-full bg-green-500/10 text-green-500 text-[11px] font-bold border border-green-500/20">
                    {tx.status}
                  </span>
                </td>

                {/* Hash */}
                <td className="py-5 text-sm font-mono text-gray-500">
                  {tx.hash}
                </td>

                {/* Timestamp */}
                <td className="py-5 text-sm text-gray-500 text-right">
                  {tx.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
