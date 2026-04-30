// import type React from "react";

export interface Transaction {
  id: string;
  service: string;
  amount: string;
  method: "crypto" | "card";
  status: "Success" | "Pending" | "Failed";
  hash: string;
  timestamp: string;
  icon: "search" | "credit" | "activity";
}

export interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  clearTransactions: () => void;
}
