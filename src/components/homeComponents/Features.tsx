import { Globe, Zap, Code2, BarChart3 } from "lucide-react";
import FeatureCard from "./Featurecard";
import world from "../../assets/the-world.png";

const Features = () => {
  return (
    <section className="bg-[#1a1a21] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
            Engineered for Scale
          </h2>
          <p className="text-gray-500 max-w-xl text-base">
            We built PayAPI to solve the subscription fatigue in the developer
            ecosystem.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <FeatureCard
            className="lg:col-span-7"
            icon={<Globe size={18} />}
            title="Global Scalability"
            desc="Our edge-optimized network ensures sub-50ms latency across 42 global regions, powered by decentralized settlement nodes."
          >
            <div className="relative overflow-hidden rounded-xl h-24">
              <img
                src={world}
                alt="Global Network"
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </FeatureCard>

          <FeatureCard
            className="lg:col-span-5"
            icon={<Zap size={18} />}
            title="Gasless Transactions"
            desc="Utilize our internal credit-ledger system to perform thousands of micro-calls without paying network gas fees for every single request."
          >
            <div className="mt-4 pb-2">
              <div className="flex justify-between text-[10px] mb-2 font-mono tracking-widest">
                <span className="text-gray-400 uppercase">Network Savings</span>
                <span className="text-orange-400 font-bold">99.2%</span>
              </div>
              <div className="h-1.5 bg-gray-900 rounded-full border border-gray-800 p-px overflow-hidden">
                <div className="h-full bg-orange-400/90 w-[98%] rounded-full shadow-[0_0_8px_rgba(251,146,60,0.3)]" />
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            className="lg:col-span-4"
            icon={<Code2 size={18} />}
            title="Monetize Your API"
            desc="Wrap any endpoint with PayAPI and start accepting crypto payments instantly. No billing setup, no subscriptions, just pay-per-use access."
          >
            <div className="bg-dark-bg p-3 rounded-lg border border-gray-800 font-mono text-[10px] mt-2 space-y-1">
              <p className="text-gray-500">// Add to any endpoint</p>
              <p className="text-cyan-400">x-api-key: <span className="text-gray-400">sk_live_xxx</span></p>
              <p className="text-green-400">✓ Access granted</p>
            </div>
          </FeatureCard>

          <FeatureCard
            className="lg:col-span-8 overflow-hidden relative"
            icon={<BarChart3 size={18} />}
            title="Real-time Settlement"
            desc="Watch your API usage and costs update in real-time on your dashboard. Complete transparency for every single byte processed."
          >
            <div className="mt-4 space-y-2">
              {[
                { label: "Crypto API", value: "72%", color: "bg-cyan-400" },
                { label: "News API", value: "45%", color: "bg-purple-400" },
                { label: "AI Search", value: "89%", color: "bg-orange-400" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-[10px] mb-1 font-mono text-gray-500">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-1 bg-gray-900 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.value }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="h-12 absolute bottom-0 right-0 w-1/2 bg-linear-to-l from-blue-500/10 to-transparent pointer-events-none" />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default Features;