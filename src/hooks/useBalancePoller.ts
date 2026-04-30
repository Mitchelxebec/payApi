import { useEffect, useRef, useState } from "react";
import { Horizon } from "@stellar/stellar-sdk";

const HORIZON_URL = "https://horizon-testnet.stellar.org";

export default function useBalancePoller(
  address: string | null,
  fundingState?: string,
) {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const inFlight = useRef(false);

  const fetchBalance = async (
    wallet: string,
    signal?: AbortSignal,
  ): Promise<void> => {
    if (inFlight.current) return;

    inFlight.current = true;
    setLoading(true);

    try {
      const server = new Horizon.Server(HORIZON_URL);

      const account = await server.loadAccount(wallet);

      const native = account.balances.find(
        (b: { asset_type: string; balance: string }) =>
          b.asset_type === "native",
      );

      if (!signal?.aborted) {
        setBalance(native ? native.balance : "0");
      }
    } catch {
      if (!signal?.aborted) {
        setBalance(null);
      }
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!address) {
      setBalance(null);
      return;
    }

    const controller = new AbortController();

    // immediate fetch
    fetchBalance(address, controller.signal);

    // 🔥 dynamic polling (faster after funding success)
    const intervalTime = fundingState === "success" ? 5000 : 10000;

    intervalRef.current = window.setInterval(() => {
      fetchBalance(address, controller.signal);
    }, intervalTime);

    return () => {
      controller.abort();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [address, fundingState]);

  return {
    balance,
    loading,
  };
}
