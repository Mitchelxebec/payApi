import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  icon: ReactNode;
  color: string; 
}

const StatCard = ({ label, value, sub, icon, color }: StatCardProps) => {
  return (
    <div
      className={`bg-[#1A1A22] border-l-4 ${color} p-4 rounded-xl flex flex-col justify-between h-32`}
    >
      <div className="flex justify-between items-start text-gray-500">
        <div className="p-1.5 bg-black/20 rounded-lg">{icon}</div>
        <span className="text-[10px] font-bold tracking-tighter uppercase">
          {sub}
        </span>
      </div>
      <div>
        <p className="text-[10px] text-gray-500 font-bold mb-1 uppercase">
          {label}
        </p>
        <p className="text-xl font-bold truncate">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
