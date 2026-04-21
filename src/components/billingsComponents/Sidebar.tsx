import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Key,
  CreditCard,
  Activity,
  Network,
  X,
} from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();

  // Navigation items exactly from the billing image
  const navItems = [
    { label: "Dashboard", icon: <LayoutGrid size={20} />, path: "/dashboard" },
    { label: "API Keys", icon: <Key size={20} />, path: "/api-keys" },
    { label: "Billing", icon: <CreditCard size={20} />, path: "/billing" },
    { label: "Activity", icon: <Activity size={20} />, path: "/activity" },
    { label: "Network", icon: <Network size={20} />, path: "/network" },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#0b0e11] border-r border-white/5 flex flex-col p-6 transition-transform duration-300
        lg:sticky lg:top-0 lg:h-full lg:translate-x-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Header with Close Button for Mobile */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-cyan/20 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-brand-cyan rounded-sm shadow-[0_0_10px_#4FD1C5]" />
          </div>
          <span className="text-xs font-mono text-gray-400">0x71...C42</span>
        </div>
        <button className="lg:hidden text-gray-400" onClick={toggleSidebar}>
          <X size={20} />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`relative flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-brand-cyan/10 text-brand-cyan shadow-[inset_0_0_15px_rgba(79,209,197,0.05)]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <span
                className={
                  isActive
                    ? "text-brand-cyan"
                    : "text-gray-500 group-hover:text-gray-300"
                }
              >
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>

              {/* The Cyan Right Indicator from the image */}
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-0.75 bg-brand-cyan rounded-l-full shadow-[0_0_10px_#4FD1C5]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-brand-cyan to-brand-purple" />
        <div>
          <p className="text-sm font-bold text-white">PayAPI Admin</p>
          <p className="text-xs text-gray-500">Verified Entity</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
