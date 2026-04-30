import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";
import { Menu } from "lucide-react"; // Import Menu icon
import { WalletConnect } from "./WalletConnect";

interface NavbarProps {
  toggleSidebar?: () => void; // Made optional so it doesn't break other pages
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["Dashboard", "Docs", "Billing"];

  const activeStyle = ({ isActive }: NavLinkRenderProps): string =>
    isActive
      ? "text-brand-cyan border-b-2 border-brand-cyan pb-1"
      : "text-gray-400 hover:text-brand-cyan pb-1";

  return (
    <header className="sticky top-0 z-40 bg-dark-bg border-b border-white/5 w-full py-4 px-6 text-white">
      <nav className="flex items-center justify-between mx-auto">
        {/* Left Side: Sidebar Toggle (Mobile/Tablet) + Logo */}
        <div className="flex items-center gap-4">
          {toggleSidebar && (
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-brand-cyan"
            >
              <Menu size={24} />
            </button>
          )}

          <div className="flex items-center gap-3">
            <img src={logo} alt="payApi-logo" className="h-8 w-auto" />
            <h1 className="text-xl font-bold font-space-grotesk tracking-tight hidden sm:block">
              <Link to="/">PayAPI</Link>
            </h1>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
          {navLinks.map((item) => (
            <li key={item}>
              <NavLink to={`/${item.toLowerCase()}`} className={activeStyle}>
                {item}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side: Button + Mobile Nav Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <WalletConnect />
          </div>

          {/* Hamburger Icon for Mobile Overlay Menu */}
          <button
            className="md:hidden text-brand-cyan focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`absolute top-full left-0 w-full bg-dark-bg border-b border-white/5 px-6 py-8 md:hidden transition-all duration-300 ease-in-out shadow-2xl ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-6">
          {navLinks.map((item) => (
            <li key={item} onClick={() => setIsOpen(false)}>
              <NavLink
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-lg block font-bold tracking-widest uppercase ${
                    isActive ? "text-brand-cyan" : "text-gray-400"
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
          <div className="pt-4 border-t border-white/5">
            <WalletConnect />
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
