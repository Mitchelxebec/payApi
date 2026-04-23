import { useState, type ReactNode } from "react";
import PaymentModal from "./PaymentModal"; // Import the modal

interface ServiceActionCardProps {
  name: string;
  price: string;
  icon: ReactNode;
}

const ServiceActionCard = ({ name, price, icon }: ServiceActionCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-brand-cyan">
            {icon}
          </div>
          <div>
            <p className="text-sm font-bold">{name}</p>
            <p className="text-[10px] text-gray-500">{price}</p>
          </div>
        </div>

        {/* Changed from Link to Button to trigger state */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-[9px] font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-500 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          Pay
        </button>
      </div>

      {/* Render the Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ServiceActionCard;
