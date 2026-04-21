import React from "react";
import { Share2, Download, Search, Newspaper } from "lucide-react";

interface Transaction {
  id: string;
  service: string;
  icon: React.ReactNode;
  date: string;
  amount: string;
  status: "Success" | "Pending" | "Failed";
}

const transactions: Transaction[] = [
  {
    id: "1",
    service: "AI Search",
    icon: <Search size={14} className="text-purple-400" />,
    date: "Oct 24, 14:02",
    amount: "0.01 XLM",
    status: "Success",
  },
  {
    id: "2",
    service: "News API",
    icon: <Newspaper size={14} className="text-cyan-400" />,
    date: "Oct 24, 13:45",
    amount: "0.05 XLM",
    status: "Success",
  },
  {
    id: "3",
    service: "AI Search",
    icon: <Search size={14} className="text-purple-400" />,
    date: "Oct 23, 11:20",
    amount: "0.01 XLM",
    status: "Success",
  },
];

export default function TransactionSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 text-white">
      {/* 1. RECENT TRANSACTIONS TABLE */}
      <div className="lg:col-span-2 bg-[#111418] rounded-2xl p-6 border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-gray-200">
            Recent Transactions
          </h3>
          <button className="text-[10px] font-bold text-cyan-400 hover:underline">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
                <th className="pb-4 font-bold">Service</th>
                <th className="pb-4 font-bold">Date</th>
                <th className="pb-4 font-bold">Amount</th>
                <th className="pb-4 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="group border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors"
                >
                  <td className="py-4 flex items-center gap-3">
                    <div className="p-2 bg-[#1c2127] rounded-lg border border-white/5">
                      {tx.icon}
                    </div>
                    <span className="font-bold text-gray-300">
                      {tx.service}
                    </span>
                  </td>
                  <td className="py-4 text-gray-500">{tx.date}</td>
                  <td className="py-4 font-mono font-bold">{tx.amount}</td>
                  <td className="py-4 text-right">
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-md text-[10px] font-bold">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. SELECTED RECEIPT VIEW */}
      <div className="bg-[#111418] rounded-2xl p-6 border border-white/5 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-sm font-bold text-gray-200">Selected Receipt</h3>
          <Share2
            size={16}
            className="text-gray-500 cursor-pointer hover:text-white transition-colors"
          />
        </div>

        {/* Receipt Visual */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 border border-purple-500/20">
            <Search className="text-purple-400" size={24} />
          </div>
          <div className="text-2xl font-bold">0.01 XLM</div>
          <p className="text-[10px] text-gray-500 mt-1 font-mono">
            Transaction: 8k2j...L91p
          </p>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Service</span>
            <span className="text-gray-200 font-bold">AI Search Pro</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Token Usage</span>
            <span className="text-gray-200 font-bold">4,102 tokens</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Network Fee</span>
            <span className="text-gray-200 font-bold">0.0001 XLM</span>
          </div>
          <div className="pt-4 border-t border-white/5 flex justify-between">
            <span className="text-sm font-bold text-gray-200">Total Paid</span>
            <span className="text-sm font-bold text-cyan-400">0.0101 XLM</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="mt-auto w-full bg-[#1c2127] hover:bg-[#252a32] text-gray-300 py-3 rounded-xl border border-white/5 flex items-center justify-center gap-2 text-xs font-bold transition-all">
          <Download size={14} />
          Download PDF Receipt
        </button>
      </div>
    </div>
  );
}
