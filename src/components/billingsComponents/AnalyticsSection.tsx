import { useMemo, useState } from 'react';
import FlowStep from "./FlowStep";

// Move generation outside to keep the component render "pure"
const generateData = (count: number) => {
  return Array.from({ length: count }).map(() => Math.random() * 60 + 20);
};

const AnalyticsSection = () => {
  const [timeframe, setTimeframe] = useState<'7D' | '30D'>('30D');

  // useMemo now calls the external function
  const chartData = useMemo(() => {
    const barCount = timeframe === '7D' ? 15 : 40;
    return generateData(barCount);
  }, [timeframe]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 text-white">
      <div className="lg:col-span-2 bg-[#111418] rounded-2xl p-6 border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-gray-200">Spending Analytics</h3>
          
          <div className="flex bg-[#0b0e11] p-1 rounded-lg border border-white/5">
            <button 
              onClick={() => setTimeframe('7D')}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                timeframe === '7D' ? 'bg-cyan-400/10 text-cyan-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              7D
            </button>
            <button 
              onClick={() => setTimeframe('30D')}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                timeframe === '30D' ? 'bg-cyan-400/10 text-cyan-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              30D
            </button>
          </div>
        </div>

        <div className="relative h-48 w-full bg-[#0b0e11] rounded-xl overflow-hidden border border-white/5 flex items-end px-4 pb-2">
          {/* Fixed Tailwind class: bg-linear-to-t */}
          <div className="absolute inset-0 bg-linear-to-t from-cyan-500/10 to-transparent" />
          
          <div className="flex items-end gap-1 w-full h-full opacity-30">
            {chartData.map((height, i) => (
              <div 
                key={`${timeframe}-${i}`} 
                className="flex-1 bg-cyan-500 rounded-t-sm transition-all duration-500" 
                style={{ height: `${height}%` }}
              />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-full h-0.5 bg-cyan-400 shadow-[0_0_15px_#22d3ee] rotate-[-5deg] blur-[0.5px]" />
          </div>
        </div>
      </div>

      <div className="bg-[#111418] rounded-2xl p-6 border border-white/5">
        <h3 className="text-sm font-bold text-gray-200 mb-8">Payment Flow</h3>
        <div className="flex flex-col">
          <FlowStep number="01" label="Select" color="text-cyan-400" isActive />
          <FlowStep number="02" label="Pay" color="text-cyan-400" isActive />
          <FlowStep number="03" label="Verify" color="text-purple-500" isActive />
          <FlowStep number="04" label="Access" color="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
