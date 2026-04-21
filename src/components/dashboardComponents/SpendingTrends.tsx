const SpendingTrends = () => {
  // Mock coordinates for the smooth SVG path
  // In a real app, you would calculate these based on data points
  const pathData =
    "M 0 80 Q 50 20 100 80 T 200 40 T 300 100 M 350 100 Q 380 20 410 20 L 480 20 Q 510 20 540 100";

  const dates = ["01 Nov", "07 Nov", "14 Nov", "21 Nov", "28 Nov"];

  return (
    <div className="bg-[#1A1A22] rounded-2xl border border-white/5 p-6 w-full font-space-grotesk">
      {/* Header */}
      <h3 className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-8">
        Spending Trends (XLM)
      </h3>

      {/* Chart Area */}
      <div className="relative h-48 w-full">
        <svg
          viewBox="0 0 540 120"
          className="w-full h-full preserve-3d"
          preserveAspectRatio="none"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C067FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C067FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path
            d={`${pathData} L 540 120 L 0 120 Z`}
            fill="url(#lineGradient)"
          />

          {/* Glowing Line */}
          <path
            d={pathData}
            fill="none"
            stroke="#C067FF"
            strokeWidth="3"
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_rgba(192,103,255,0.5)]"
          />
        </svg>

        {/* Date Labels */}
        <div className="flex justify-between mt-4">
          {dates.map((date) => (
            <span key={date} className="text-[10px] font-bold text-white">
              {date}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingTrends;
