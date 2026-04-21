import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <section className="bg-dark-bg min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
        {/* Huge Decorative 404 */}
        <h1 className="text-[150px] md:text-[200px] font-bold font-space-grotesk leading-none bg-brand-gradient bg-clip-text text-transparent opacity-20 absolute">
          404
        </h1>
        <div className="relative z-10">
          <h2 className="text-white text-4xl md:text-6xl font-bold font-space-grotesk mb-4">
            Lost in the Ether?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved to a
            different block.
          </p>
          {/* Link back to Home */}
          <Link
            to="/"
            className="bg-brand-gradient text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform inline-block shadow-[0_0_20px_rgba(153,247,255,0.3)]"
          >
            Return to Mission Control
          </Link>
        </div>
        {/* Subtle Background Glow */}
        <div className="absolute w-96 h-96 bg-brand-cyan/10 blur-[120px] rounded-full -z-10"></div>
      </section>
    </>
  );
};

export default NotFound;
