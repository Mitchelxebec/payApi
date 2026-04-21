// 1. Define what the props look like
interface StatCardProps {
  label: string;
  value: string | number;
  color?: string; 
}

// 2. Apply the type directly to the function arguments
function StatCard({ label, value, color = "text-white" }: StatCardProps) {
  return (
    <div className="bg-[#111418] rounded-xl p-4 border border-white/5 flex flex-col justify-between">
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
        {label}
      </span>
      <div className={`text-xl font-bold ${color}`}>
        {value}
      </div>
    </div>
  );
}

export default StatCard