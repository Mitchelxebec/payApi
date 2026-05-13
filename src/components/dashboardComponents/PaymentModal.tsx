import { useState } from "react";
import { X, CreditCard, Bitcoin, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../../context/useWallet";
import { sendPayment } from "../../lib/stellarPayment";
import Toast from "../Toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
  amount: string;
}

type TxState = "idle" | "signing" | "submitting" | "success" | "error";

interface ToastState {
  message: string;
  type: "error" | "info" | "warning";
}

const PaymentModal = ({ isOpen, onClose, service, amount }: PaymentModalProps) => {
  const navigate = useNavigate();
  const { address } = useWallet();

  const [txState, setTxState] = useState<TxState>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"crypto" | "card">("crypto");
  const [toast, setToast] = useState<ToastState | null>(null);

  if (!isOpen) return null;

  const showToast = (message: string, type: ToastState["type"] = "info") => {
    setToast({ message, type });
  };

  const handleProceed = async () => {
    if (paymentMethod !== "crypto") {
      showToast("Card payments are coming soon. Please use Stellar (XLM) for now.", "warning");
      return;
    }

    if (!address) {
      showToast("Please connect your wallet before making a payment.", "error");
      return;
    }

    try {
      setError(null);
      setTxState("signing");

      const hash = await sendPayment({
        from: address,
        to: import.meta.env.VITE_STELLAR_RECEIVER,
        amount,
      });

      setTxState("success");
      setTxHash(hash);

      setTimeout(() => {
        navigate(`/verify-payment?tx=${hash}&service=${encodeURIComponent(service)}`);
        onClose();
      }, 1500);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Payment failed";
      setTxState("error");
      setError(message);
    }
  };

  const renderButtonContent = () => {
    switch (txState) {
      case "signing":
        return (<><Loader2 className="animate-spin" size={18} /> Waiting for signature...</>);
      case "submitting":
        return (<><Loader2 className="animate-spin" size={18} /> Submitting...</>);
      case "success":
        return "Payment Successful 🎉";
      case "error":
        return "Retry Payment";
      default:
        return "Proceed to Payment";
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-[#1c2127] w-full max-w-md rounded-3xl p-8 border border-white/10 shadow-2xl relative">
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
            <label className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-cyan-400/30 cursor-pointer">
              <div className="flex items-center gap-4">
                <Bitcoin size={24} className="text-cyan-400" />
                <div>
                  <p className="text-sm font-bold text-white">Crypto Assets</p>
                  <p className="text-[10px] text-gray-500">XLM via Stellar</p>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "crypto"}
                onChange={() => setPaymentMethod("crypto")}
                className="w-4 h-4 accent-cyan-400"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 cursor-pointer">
              <div className="flex items-center gap-4">
                <CreditCard size={24} className="text-gray-400" />
                <div>
                  <p className="text-sm font-bold text-white">Card Payment</p>
                  <p className="text-[10px] text-gray-500">Stripe (coming soon)</p>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="w-4 h-4 accent-cyan-400"
              />
            </label>
          </div>

          <button
            onClick={handleProceed}
            disabled={txState === "signing" || txState === "submitting"}
            className="w-full mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold py-4 rounded-2xl text-sm disabled:opacity-50"
          >
            {renderButtonContent()}
          </button>

          {txHash && (
            <p className="text-green-400 text-xs mt-4 text-center">
              Tx: {txHash.slice(0, 10)}...
            </p>
          )}

          {error && (
            <p className="text-red-400 text-xs mt-4 text-center">{error}</p>
          )}

          <p className="text-[9px] text-gray-600 text-center mt-6 px-4">
            Blockchain transactions are irreversible.
          </p>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
