import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Docs from "./pages/docs/Docs";
import Billing from "./pages/Billing";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
