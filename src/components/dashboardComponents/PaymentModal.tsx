import { X, CreditCard, Bitcoin } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const navigate = useNavigate(); // 2. Initialize navigate

  if (!isOpen) return null;

  const handleProceed = () => {
    // 3. Logic can go here (e.g., API call), then redirect
    navigate("/payment-success");
    onClose(); // Optional: close modal before navigating
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1c2127] w-full max-w-md rounded-3xl p-8 border border-white/10 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-white mb-1">
          Select Payment Method
        </h2>
        <p className="text-xs text-gray-500 mb-8">
          Add credits to your API consumption vault
        </p>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-cyan-400/30 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center text-cyan-400">
                <Bitcoin size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Crypto Assets</p>
                <p className="text-[10px] text-gray-500">
                  XLM / USDC via Stellar Network
                </p>
              </div>
            </div>
            <input
              type="radio"
              name="payment"
              defaultChecked
              className="w-4 h-4 accent-cyan-400"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 cursor-pointer hover:border-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gray-400">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Credit / Debit Card
                </p>
                <p className="text-[10px] text-gray-500">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
            <input
              type="radio"
              name="payment"
              className="w-4 h-4 accent-cyan-400"
            />
          </label>
        </div>

        {/* 4. Use the handleProceed function here */}
        <button
          onClick={handleProceed}
          className="w-full mt-8 bg-linear-to-r from-cyan-400 to-purple-500 hover:from-cyan-300 hover:to-purple-400 text-black font-bold py-4 rounded-2xl text-sm transition-all active:scale-[0.98] shadow-lg shadow-cyan-500/20"
        >
          Proceed to Payment
        </button>

        <p className="text-[9px] text-gray-600 text-center mt-6 px-4">
          By continuing, you agree to our Terms of Service and acknowledge that
          blockchain transactions are irreversible.
        </p>
      </div>
    </div>
  );
};

export default PaymentModal;
