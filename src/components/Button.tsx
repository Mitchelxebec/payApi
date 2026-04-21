interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  buttonColor?: string;
  textColor?: string;
  className?: string;
  type?: "button" | "submit";
}

const Button = ({
  children,
  onClick,
  buttonColor = "bg-[#363636]",
  textColor = "text-[#00DBE7]",
  className = "",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonColor} ${textColor} ${className} 
      hover:brightness-110 active:scale-95 cursor-pointer px-6 py-2.5 
      border-[#00DBE7] border rounded-lg font-semibold transition-all 
      duration-300 font-space-grotesk whitespace-nowrap`}
    >
      {children}
    </button>
  );
};

export default Button;
