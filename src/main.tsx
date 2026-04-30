import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { WalletProvider } from "./context/WalletProvider.tsx";
import { TransactionProvider } from "./context/transactions/TransactionProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <TransactionProvider>
          <App />
        </TransactionProvider>
      </WalletProvider>
    </BrowserRouter>
  </StrictMode>,
);
