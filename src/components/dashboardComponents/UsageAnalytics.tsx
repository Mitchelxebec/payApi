import { useState } from "react";

interface ChartData {
  h: number;
  day: string;
  active?: boolean;
}

const UsageAnalytics = () => {
  // 1. State to track if we are viewing 'daily' or 'monthly'
  const [view, setView] = useState<"daily" | "monthly">("daily");

  // 2. Data for both views
  const data: Record<"daily" | "monthly", ChartData[]> = {
    daily: [
      { h: 45, day: "MON" },
      { h: 65, day: "" },
      { h: 50, day: "TUE" },
      { h: 85, day: "" },
      { h: 60, day: "WED" },
      { h: 95, day: "" },
      { h: 75, day: "THU" },
      { h: 68, day: "" },
      { h: 55, day: "FRI" },
      { h: 45, day: "" },
      { h: 65, day: "SAT" },
      { h: 100, day: "SUN", active: true },
    ],
    monthly: [
      { h: 30, day: "JAN" },
      { h: 45, day: "FEB" },
      { h: 60, day: "MAR" },
      { h: 55, day: "APR" },
      { h: 80, day: "MAY", active: true },
      { h: 70, day: "JUN" },
      { h: 90, day: "JUL" },
      { h: 85, day: "AUG" },
      { h: 65, day: "SEP" },
      { h: 50, day: "OCT" },
      { h: 40, day: "NOV" },
      { h: 35, day: "DEC" },
    ],
  };

  return (
    <div className="xl:col-span-2 bg-[#1A1A22] rounded-2xl border border-white/5 p-4 lg:p-6 min-h-87.5 flex flex-col font-space-grotesk">
      {/* Header Section */}
      <div className="flex flex-row justify-between items-start mb-10">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white">
            Usage Analytics
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {view === "daily" ? "Daily" : "Monthly"} API call distribution
            across regions
          </p>
        </div>

        {/* Switchable Toggle */}
        <div className="flex bg-[#0D0D12] p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setView("daily")}
            className={`px-4 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all duration-300 ${
              view === "daily"
                ? "bg-[#1E1E26] text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-4 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all duration-300 ${
              view === "monthly"
                ? "bg-[#1E1E26] text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-end justify-between gap-2 md:gap-3 lg:gap-4 px-2">
          {data[view].map((item, i) => (
            <div
              key={`${view}-${i}`}
              className="flex-1 flex flex-col items-center gap-4 h-full justify-end"
            >
              <div className="w-full relative group flex flex-col justify-end h-full">
                {/* Active Tooltip */}
                {item.active && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-cyan text-black px-3 py-1 rounded text-[11px] font-bold shadow-[0_0_15px_rgba(0,219,231,0.4)] whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {view === "daily" ? "32k" : "840k"}
                  </div>
                )}

                {/* The Bar */}
                <div
                  style={{ height: `${item.h}%` }}
                  className={`w-full rounded-t-lg transition-all duration-700 ease-out ${
                    item.active
                      ? "bg-brand-cyan shadow-[0_0_20px_rgba(0,219,231,0.3)]"
                      : "bg-[#112F3D] hover:bg-[#163d4f]"
                  }`}
                />
              </div>

              {/* Day/Month Labels */}
              <span className="text-[10px] font-bold text-gray-600 tracking-wider h-4 uppercase">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsageAnalytics;
