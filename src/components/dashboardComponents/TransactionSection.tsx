import { useEffect, useState } from "react";
import { useWallet } from "../../context/useWallet";

const API_BASE = "https://payapi-backend-production.up.railway.app";

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
  if (!logs.length)
    return <p className="text-gray-500 text-sm">No activity yet.</p>;

  return (
    <div className="space-y-2">
      {logs.map((log) => (
        <div
          key={log._id}
          className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5 text-sm"
        >
          <div>
            <p className="font-bold text-white">{log.service}</p>
            <p className="text-[10px] text-gray-500 font-mono">
              {log.endpoint}
            </p>
          </div>
          <p className="text-[10px] text-gray-500">
            {new Date(log.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TransactionSection;