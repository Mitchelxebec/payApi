import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWallet } from "../../context/useWallet";

const API_BASE = "https://payapi-backend-production.up.railway.app";
const PAGE_SIZE = 5;

interface ActivityLog {
  _id: string;
  service: string;
  endpoint: string;
  createdAt: string;
}

const TransactionSection = () => {
  const { address } = useWallet();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!address) return;

    const fetchActivity = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/auth/activity`, {
          headers: { "x-wallet-address": address },
        });
        const data = await res.json();
        if (data.success) setLogs(data.data);
      } catch (err) {
        console.error("Failed to fetch activity", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [address]);

  if (loading)
    return <p className="text-gray-500 text-sm">Loading activity...</p>;
  if (!address)
    return <p className="text-gray-500 text-sm">Connect your wallet to view activity.</p>;
  if (!logs.length)
    return <p className="text-gray-500 text-sm">No activity yet.</p>;

  const totalPages = Math.ceil(logs.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginated = logs.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {paginated.map((log) => (
          <div
            key={log._id}
            className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5 text-sm"
          >
            <div>
              <p className="font-bold text-white">{log.service}</p>
              <p className="text-[10px] text-gray-500 font-mono">{log.endpoint}</p>
            </div>
            <p className="text-[10px] text-gray-500 shrink-0 ml-4">
              {new Date(log.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-[10px] text-gray-500">
            {start + 1}–{Math.min(start + PAGE_SIZE, logs.length)} of {logs.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-white/5 bg-[#1c2127] text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-xs text-gray-400 font-mono">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-white/5 bg-[#1c2127] text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionSection;
