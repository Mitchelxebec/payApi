// Reusable Step component for the Payment Flow
interface FlowStepProps {
  number: string;
  label: string;
  color: string;
  isActive?: boolean;
}

function FlowStep({ number, label, color, isActive = false }: FlowStepProps) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all
          ${isActive ? `${color} border-current shadow-[0_0_10px_rgba(34,211,238,0.2)]` : "border-gray-700 text-gray-500"}`}
        >
          {number}
        </div>
        {/* Connector line - hidden for the last item */}
        {number !== "04" && <div className="w-px h-6 bg-gray-800 my-1" />}
      </div>
      <span
        className={`text-sm font-medium mb-7 ${isActive ? "text-gray-200" : "text-gray-500"}`}
      >
        {label}
      </span>
    </div>
  );
}

export default FlowStep;
