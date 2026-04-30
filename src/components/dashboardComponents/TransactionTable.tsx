import { Activity, Box, CreditCard, Search } from "lucide-react";
import { useTransactions } from "../../context/transactions/useTransaction";

const TransactionTable = () => {
  const context = useTransactions();
  const transactions = context?.transactions ?? [];

  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const isEmpty = safeTransactions.length === 0;

  console.log(context);

  const icons = {
  search: <Search size={16} />,
  credit: <CreditCard size={16} />,
  activity: <Activity size={16} />,
};
  
  return (
    <div className="bg-[#1A1A22] rounded-2xl border border-white/5 p-6 w-full font-space-grotesk">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold tracking-tight text-white">
          Recent Micro-Payments
        </h3>

        <button className="text-brand-cyan text-sm font-bold hover:underline">
          View All Activity
        </button>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
            <Activity size={18} className="text-gray-500" />
          </div>

          <p className="text-gray-400 text-sm font-medium">
            No transactions yet
          </p>

          <p className="text-gray-600 text-xs mt-1">
            Your API payments will appear here once you start using services
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-50">
            <thead>
              <tr className="text-[10px] text-gray-500 font-bold uppercase border-b border-white/5">
                <th className="pb-4">Service</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4 text-center">Method</th>
                <th className="pb-4 text-center">Status</th>
                <th className="pb-4">Tx Hash</th>
                <th className="pb-4 text-right">Timestamp</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {safeTransactions.map((tx, index) => {
                const shortHash =
                  typeof tx?.hash === "string"
                    ? `${tx.hash.slice(0, 6)}...${tx.hash.slice(-4)}`
                    : "N/A";

                return (
                  <tr
                    key={tx?.id || tx?.hash || `tx-${index}`}
                    className="hover:bg-[#111827] transition-all duration-200"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#0D0D12] border border-white/5 flex items-center justify-center text-brand-cyan">
                          {tx?.icon || <Activity size={16} />}
                        </div>

                        <span className="text-sm font-semibold text-white">
                          {tx?.service || "Unknown"}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 text-sm text-gray-300 font-medium">
                      {tx?.amount || "0"}
                    </td>

                    <td className="py-4 text-center text-gray-400">
                      {tx?.method === "crypto" ? (
                        <Box size={16} />
                      ) : (
                        <CreditCard size={16} />
                      )}
                    </td>

                    <td className="py-4 text-center">
                      <span className="px-3 py-1 text-[10px] font-semibold rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                        {tx?.status || "Unknown"}
                      </span>
                    </td>

                    <td className="py-4 text-xs font-mono text-gray-400">
                      {shortHash}
                    </td>

                    <td className="py-4 text-xs text-gray-500 text-right">
                      {tx?.timestamp || "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
