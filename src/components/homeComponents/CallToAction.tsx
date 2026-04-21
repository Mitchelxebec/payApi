import { Link } from "react-router-dom";
import Button from "../Button";

const CTA = () => {
  return (
    <section className="bg-dark-bg py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Card Container */}
        <div className="bg-[#1c1c24] border border-gray-800 rounded-4xl md:rounded-[2.5rem] p-8 md:p-20 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b from-[#8884FF]/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            {/* Heading: text-2xl for tiny phones, md:text-5xl for desktop */}
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight px-2">
              Stop overpaying for <br className="sm:hidden" /> idle capacity.
            </h2>

            {/* Subtext: text-xs/sm for mobile */}
            <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-md mx-auto mb-8 md:mb-10 leading-relaxed px-4">
              Join 2,400+ developers building the future of autonomous
              micro-services on the most efficient API layer ever created.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4">
              <Link
                to="/dashboard"
                className="w-fit min-w-50 px-8 py-4 bg-[#8884FF] text-black font-bold rounded border-none hover:bg-[#7772e6] whitespace-nowrap text-sm md:text-base"
              >
                Get Started for Free
              </Link>

              <Button
                buttonColor="bg-transparent"
                textColor="text-white"
                className="w-fit min-w-50 px-8 py-4 border-white hover:text-gray-300 transition-colors whitespace-nowrap text-sm md:text-base"
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
