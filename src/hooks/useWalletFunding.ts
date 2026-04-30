import { useState, useCallback, useRef } from "react";

export type FundingState = "idle" | "funding" | "success" | "error";

export function useWalletFunding() {
  const [state, setState] = useState<FundingState>("idle");
  const [error, setError] = useState<string | null>(null);

  // 🔒 hard request lock (prevents double-click + race conditions)
  const isLocked = useRef(false);

  // 🧠 prevents multiple Friendbot calls per wallet
  const fundedAddresses = useRef<Set<string>>(new Set());

  const fundWallet = useCallback(async (publicKey: string) => {
    if (!publicKey) {
      setState("error");
      setError("No wallet connected");
      return;
    }

    // ❌ prevent duplicate funding for same wallet
    if (fundedAddresses.current.has(publicKey)) {
      setState("success");
      return;
    }

    // ❌ hard lock (prevents spam clicks + race conditions)
    if (isLocked.current) return;

    isLocked.current = true;
    setState("funding");
    setError(null);

    try {
      const res = await fetch(
        `https://friendbot.stellar.org?addr=${publicKey}`,
      );

      if (!res.ok) {
        const text = await res.text();

        // Friendbot specific case
        if (text.includes("already funded")) {
          setState("success");
          fundedAddresses.current.add(publicKey);
          return;
        }
        throw new Error("Funding failed");
      }

      // mark as funded only AFTER success
      fundedAddresses.current.add(publicKey);

      setState("success");

      // optional UX reset
      setTimeout(() => {
        setState("idle");
      }, 3000);
    } catch (err: unknown) {
      setState("error");

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Funding failed");
      }
    } finally {
      isLocked.current = false;
    }
  }, []);

  return {
    state,
    error,
    fundWallet,

    // helpers for UI
    isIdle: state === "idle",
    isFunding: state === "funding",
    isSuccess: state === "success",
    isError: state === "error",
  };
}
