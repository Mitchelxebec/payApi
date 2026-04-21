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
          {/* Card 1: Reduced height to h-24 */}
          <FeatureCard
            className="lg:col-span-7"
            icon="🌍"
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

          {/* Card 2: Fixed Overflowing Progress Bar */}
          <FeatureCard
            className="lg:col-span-5"
            icon="⚡"
            title="Gasless Transactions"
            desc="Utilize our internal credit-ledger system to perform thousands of micro-calls without paying network gas fees for every single request."
          >
            <div className="mt-4 pb-2">
              <div className="flex justify-between text-[10px] mb-2 font-mono tracking-widest">
                <span className="text-gray-400 uppercase">Network Savings</span>
                <span className="text-orange-400 font-bold">99.2%</span>
              </div>
              {/* FIXED: Reduced width to 98% to prevent border overflow, added padding */}
              <div className="h-1.5 bg-gray-900 rounded-full border border-gray-800 p-px overflow-hidden">
                <div className="h-full bg-orange-400/90 w-[98%] rounded-full shadow-[0_0_8px_rgba(251,146,60,0.3)]" />
              </div>
            </div>
          </FeatureCard>

          {/* Card 3: Reduced mt-4 */}
          <FeatureCard
            className="lg:col-span-4"
            icon="📁"
            title="Developer First"
            desc="Comprehensive SDKs for Go, Rust, and Node.js. Integration is as simple as adding an API key to your header."
          >
            <div className="bg-dark-bg p-3 rounded-lg border border-gray-800 font-mono text-[10px] text-gray-500 mt-2">
              npm install @payapi/sdk
            </div>
          </FeatureCard>

          {/* Card 4: Balanced spacing */}
          <FeatureCard
            className="lg:col-span-8 overflow-hidden relative"
            icon="📊"
            title="Real-time Settlement"
            desc="Watch your API usage and costs update in real-time on your dashboard. Complete transparency for every single byte processed."
          >
            <div className="h-12 absolute bottom-0 right-0 w-1/2 bg-linear-to-l from-blue-500/10 to-transparent pointer-events-none" />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
};

export default Features;
