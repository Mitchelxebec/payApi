import { Link } from "react-router-dom";
import Features from "../components/homeComponents/Features";
import Footer from "../components/homeComponents/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  // We define these hex codes once so they are easy to change
  const darkBg = "#131318";
  const purple = "#8884FF";

  return (
    <div>
      <Navbar />

      <main
        style={{ backgroundColor: darkBg }}
        className="min-h-screen text-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-6">
          {/* Status Badge */}
          <div className="w-fit border border-gray-700 bg-gray-800/40 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live on Mainnet
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-tight">
            Pay per use. <br />
            <span style={{ color: purple }}>No subscriptions.</span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-xl">
            Access high-performance APIs with instant micro-payments. No monthly
            commitments.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/dashboard"
              style={{ backgroundColor: purple }}
              className="px-6 py-3 text-black font-bold rounded-md active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Explore Services
            </Link>
            <Link
              to="/docs"
              className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-md active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Read Documentation
            </Link>
          </div>
        </div>

        {/* FEATURES GRID */}
        <Features />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
