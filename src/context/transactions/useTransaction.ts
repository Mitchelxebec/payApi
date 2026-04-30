import { useContext } from "react";
import { TransactionContext } from "./TransactionContext";

export const useTransactions = () => {
  const ctx = useContext(TransactionContext);

  if (!ctx) {
    throw new Error("useTransactions must be used inside TransactionProvider");
  }

  return ctx;
};