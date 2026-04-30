import { createContext } from "react";
import { signTransaction, signAuthEntry } from "@stellar/freighter-api";
import type { FundingState } from "../hooks/useWalletFunding";

export interface WalletClient {
  address: string;
  signTransaction: typeof signTransaction;
  signAuthEntry: typeof signAuthEntry;
}

export interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  network: string | null;
  walletClient: WalletClient | null;
  isConnecting: boolean;
  error: string | null;

  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;

  // 🔥 FUNDING SYSTEM
  fundWallet: (address: string) => Promise<void>;
  fundingState: FundingState;
  fundingError: string | null;

  // 🔥 BALANCE SYSTEM (NEW)
  balance: string | null;
  isBalanceLoading: boolean;
  refreshBalance: () => Promise<void>;
}

export const WalletContext = createContext<WalletContextType | undefined>(
  undefined,
);
