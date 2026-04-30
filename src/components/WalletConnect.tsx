import { useWallet } from "../context/useWallet";

export const WalletConnect = () => {
  const {
    isConnected,
    address,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={disconnectWallet}
          className="bg-[#363636] text-[#00DBE7] hover:brightness-110 active:scale-95 cursor-pointer px-4 lg:px-6 py-2 border-[#00DBE7] border rounded-lg font-semibold transition-all text-xs lg:text-sm whitespace-nowrap"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        className="bg-[#363636] text-[#00DBE7] hover:brightness-110 active:scale-95 cursor-pointer px-4 lg:px-6 py-2 border-[#00DBE7] border rounded-lg font-semibold transition-all text-xs lg:text-sm whitespace-nowrap"
        onClick={connectWallet}
        disabled={isConnecting}
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
};
