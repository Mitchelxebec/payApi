interface FeatureProps {
  title: string;
  desc: string;
  icon: string | React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const FeatureCard = ({
  title,
  desc,
  icon,
  className = "",
  children,
}: FeatureProps) => (
  <div
    className={`bg-[#1c1c24] border border-gray-800 rounded-2xl p-6 flex flex-col overflow-hidden group ${className}`}
  >
    <div>
      {/* Icon Circle */}
      <div className="w-10 h-10 bg-[#2d2d39] rounded-xl flex items-center justify-center mb-6 border border-gray-700/30 text-gray-400 group-hover:text-white transition-colors">
        {icon}
      </div>
      {/* Text Content */}
      <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed max-w-70">
        {desc}
      </p>
    </div>

    {/* Media Slot - Reduced top margin from mt-10 to mt-6 */}
    <div className="mt-6 relative overflow-hidden rounded-xl">{children}</div>
  </div>
);

export default FeatureCard;
