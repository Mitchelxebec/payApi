import { useEffect } from "react";
import { AlertCircle, Info, AlertTriangle, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "error" | "info" | "warning";
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, type = "info", onClose, duration = 3500 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const styles: Record<string, string> = {
    error: "bg-[#1c1010] border-red-500/30 text-red-400",
    warning: "bg-[#1c1800] border-amber-500/30 text-amber-400",
    info: "bg-[#0d1a1c] border-cyan-500/30 text-cyan-400",
  };

  const Icon =
    type === "error" ? AlertCircle : type === "warning" ? AlertTriangle : Info;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl max-w-sm w-[90vw] ${styles[type]}`}
    >
      <Icon size={16} className="shrink-0" />
      <p className="text-sm flex-1 leading-snug">{message}</p>
      <button
        onClick={onClose}
        className="shrink-0 opacity-50 hover:opacity-100 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
