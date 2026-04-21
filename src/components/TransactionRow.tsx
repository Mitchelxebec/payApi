interface RowProps {
  name: string;
  address: string;
  amount: string;
  status: "Confirmed" | "Pending";
  accentColor: string;
  icon: string | React.ReactNode;
  isActive?: boolean;
}

const TransactionRow = ({
  name,
  address,
  amount,
  status,
  accentColor,
  icon,
  isActive,
}: RowProps) => (
  <div
    className={`flex justify-between items-center p-4 rounded-xl border transition-all ${
      isActive
        ? "bg-[#1e1e26] border-gray-700"
        : "bg-dark-bg border-gray-800/50"
    } border-l-2`}
    style={{ borderLeftColor: accentColor }}
  >
    <div className="flex items-center gap-4">
      <div style={{ color: accentColor }} className="text-xl font-mono">
        {icon}
      </div>
      <div>
        <p
          className={`text-sm font-bold ${isActive ? "text-white" : "text-gray-300"}`}
        >
          {name}
        </p>
        <p className="text-[10px] text-gray-600 font-mono">{address}</p>
      </div>
    </div>
    <div className="text-right">
      <p
        className="text-sm font-bold"
        style={{ color: isActive ? accentColor : "#d1d5db" }}
      >
        {amount}
      </p>
      <p
        className={`text-[10px] uppercase tracking-tighter ${status === "Pending" ? "italic text-gray-700" : "text-gray-600"}`}
      >
        {status}
      </p>
    </div>
  </div>
);

export default TransactionRow;
