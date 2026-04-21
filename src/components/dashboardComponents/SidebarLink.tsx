import type { ReactNode } from "react";

interface SidebarLinkProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
}

const SidebarLink = ({ icon, label, active = false }: SidebarLinkProps) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
      active
        ? "bg-brand-cyan/10 text-brand-cyan"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </div>
);

export default SidebarLink;
