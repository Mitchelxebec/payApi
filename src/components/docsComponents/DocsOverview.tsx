const DocsOverview = () => {
  return (
    <div className="max-w-4xl px-8 py-12 text-white">
      {/* Header Section */}
      <h1 className="text-5xl lg:text-6xl font-bold mb-6">
        PayAPI <span className="text-brand-cyan">Overview</span>
      </h1>

      <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mb-12">
        The ultra-fast micro-payment gateway for the autonomous economy. PayAPI
        enables high-frequency, low-latency transactions between software
        agents, APIs, and humans.
      </p>

      {/* The Core Logic Section */}
      <div className="relative bg-[#0A101D] border border-white/5 rounded-xl p-8 overflow-hidden max-w-md lg:max-w-none mx-auto lg:mx-0">
        {/* Left Accent Bar */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2/3 w-0.75 bg-brand-cyan rounded-r-full shadow-[0_0_15px_#4FD1C5]" />

        <h3 className="text-brand-cyan text-xs font-bold tracking-[0.2em] uppercase mb-10 text-center lg:text-left">
          The Core Logic
        </h3>

        {/* Flow Diagram: Vertical on mobile, Horizontal on desktop */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-6 lg:gap-4">
          {/* Request */}
          <div className="bg-[#1A202C] px-6 py-2 rounded text-sm text-gray-300 border border-white/5 w-32 text-center lg:w-auto">
            Request
          </div>

          {/* Desktop Arrow (Right) / Mobile Arrow (Down) */}
          <span className="text-gray-600 font-bold rotate-90 lg:rotate-0 transition-transform">
            →
          </span>

          {/* Auth */}
          <div className="bg-transparent px-6 py-2 rounded text-sm text-white border border-white/20 w-32 text-center lg:w-auto">
            Auth
          </div>

          {/* Divider Symbol */}
          <span className="text-gray-600 font-bold text-lg">+</span>

          {/* Payment */}
          <div className="bg-transparent px-6 py-2 rounded text-sm text-purple-400 border border-purple-500/30 w-32 text-center lg:w-auto">
            Payment
          </div>

          {/* Desktop Arrow (Right) / Mobile Arrow (Down) */}
          <span className="text-gray-600 font-bold rotate-90 lg:rotate-0 transition-transform">
            →
          </span>

          {/* Response Box - Full width on desktop, fixed on mobile */}
          <div className="w-32 lg:flex-1 bg-brand-cyan px-6 py-2 rounded text-sm text-black font-bold text-center shadow-[0_0_15px_rgba(79,209,197,0.3)]">
            Response
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsOverview;
