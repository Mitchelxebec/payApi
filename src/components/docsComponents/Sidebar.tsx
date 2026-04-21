import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Lock,
  CreditCard,
  Code2,
  Terminal,
  ShieldCheck,
  FileText,
  X,
} from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    {
      label: "OVERVIEW",
      icon: <LayoutGrid size={20} />,
      path: "/docs/",
    },
    { label: "AUTH", icon: <Lock size={20} />, path: "/docs/auth" },
    {
      label: "PAYMENTS",
      icon: <CreditCard size={20} />,
      path: "/docs/payments",
    },
    { label: "API REFERENCE", icon: <Terminal size={20} />, path: "/docs/api" },
    { label: "SDK", icon: <Code2 size={20} />, path: "/docs/sdk" },
    { label: "BILLING", icon: <FileText size={20} />, path: "/docs/billing" },
    {
      label: "SECURITY",
      icon: <ShieldCheck size={20} />,
      path: "/docs/security",
    },
    { label: "DASHBOARD", icon: <LayoutGrid size={20} />, path: "/dashboard" },
  ];

  return (
    <aside
      className={` 
      fixed inset-y-0 left-0 z-50 w-64 bg-dark-bg border-r border-white/5 flex flex-col p-6 transition-transform duration-300 
      lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    `}
    >
      {/* Header section from image */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-brand-cyan text-[10px] font-bold tracking-[0.2em] uppercase">
            Developer Portal
          </h2>
          <button className="lg:hidden text-gray-400" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <div className="h-px w-full bg-white/10" />
      </div>

      {/* Navigation items from image */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          // Check if the current route matches the item path
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`
                relative flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group
                ${
                  isActive
                    ? "bg-brand-cyan/10 text-brand-cyan shadow-[inset_0_0_10px_rgba(79,209,197,0.05)]"
                    : "text-gray-500 hover:text-gray-300"
                }
                /* The Cyan Right Indicator from the image */
                ${isActive ? "after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-8 after:w-0.75 after:bg-brand-cyan after:rounded-l-full after:shadow-[0_0_10px_#4FD1C5]" : ""}
              `}
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
              <span className="text-xs font-bold tracking-widest uppercase">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile (Your original template style) */}
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
