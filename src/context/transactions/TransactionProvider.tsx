import React, { useState, useEffect } from "react";
import { TransactionContext } from "./TransactionContext";
import type { Transaction, TransactionContextType } from "./types";

const STORAGE_KEY = "payapi_transactions";

// ✅ lazy initializer (fixes your warning)
const getInitialTransactions = (): Transaction[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    getInitialTransactions,
  );

  // persist only (no setState here → safe)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updates } : tx)),
    );
  };

  const clearTransactions = () => {
    setTransactions([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: TransactionContextType = {
    transactions,
    addTransaction,
    updateTransaction,
    clearTransactions,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
