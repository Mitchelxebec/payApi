import React, { useState, useEffect, useCallback } from "react";
import {
  isConnected,
  isAllowed,
  setAllowed,
  getAddress,
  getNetwork,
  signTransaction,
  signAuthEntry,
} from "@stellar/freighter-api";
import { Horizon } from "@stellar/stellar-sdk";

import { WalletContext } from "./WalletContext";
import type { WalletClient } from "./WalletContext";
import { useWalletFunding } from "../hooks/useWalletFunding";

const server = new Horizon.Server("https://horizon-testnet.stellar.org");

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);
  const [isConnectedState, setIsConnectedState] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔥 FUNDING HOOK
  const {
    state: fundingState,
    error: fundingError,
    fundWallet,
  } = useWalletFunding();

  // 🔥 BALANCE STATE (GLOBAL)
  const [balance, setBalance] = useState<string | null>(null);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

  // ✅ FETCH BALANCE (stable + reusable)
  const fetchBalance = useCallback(async (addr: string) => {
    try {
      setIsBalanceLoading(true);

      const account = await server.loadAccount(addr);

      const xlmBalance = account.balances.find(
        (b) => b.asset_type === "native",
      );

      setBalance(xlmBalance?.balance ?? "0");
    } catch (err) {
      console.error("Balance fetch failed:", err);
    } finally {
      setIsBalanceLoading(false);
    }
  }, []);

  // ✅ POLLING (no flicker, no reset)
  useEffect(() => {
    if (!address) return;

    fetchBalance(address);

    const interval = setInterval(() => {
      fetchBalance(address);
    }, 15000);

    return () => clearInterval(interval);
  }, [address, fetchBalance]);

  // ✅ MANUAL REFRESH (after funding)
  const refreshBalance = async () => {
    if (!address) return;
    await fetchBalance(address);
  };

  // ✅ RESTORE SESSION
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const allowed = await isAllowed();

    if (!allowed.isAllowed) {
      setAddress(null);
      setIsConnectedState(false);
      return;
    }

    const addr = await getAddress();
    if (addr.error) return;

    const net = await getNetwork();
    if (net.error) {
      setError(net.error);
      return;
    }

    setAddress(addr.address);
    setNetwork(net.network);
    setWalletClient({
      address: addr.address,
      signTransaction,
      signAuthEntry,
    });
    setIsConnectedState(true);
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const wallet = await isConnected();
      if (!wallet.isConnected) throw new Error("Freighter not installed");

      const allowed = await setAllowed();
      if (!allowed.isAllowed) throw new Error("Access denied");

      const net = await getNetwork();
      if (net.error) throw new Error(net.error);

      const addr = await getAddress();
      if (addr.error) throw new Error(addr.error);

      setAddress(addr.address);
      setNetwork(net.network);
      setWalletClient({
        address: addr.address,
        signTransaction,
        signAuthEntry,
      });
      setIsConnectedState(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Connection failed");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setNetwork(null);
    setWalletClient(null);
    setIsConnectedState(false);
    setError(null);
    setBalance(null);
  };

  // 🔥 FUND + AUTO REFRESH BALANCE
  const handleFundWallet = async (addr: string) => {
    await fundWallet(addr);

    // wait for blockchain sync
    setTimeout(() => {
      refreshBalance();
    }, 3000);
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected: isConnectedState,
        address,
        network,
        walletClient,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet,

        fundWallet: handleFundWallet,
        fundingState,
        fundingError,

        balance,
        isBalanceLoading,
        refreshBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};