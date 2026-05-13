import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Docs from "./pages/docs/Docs";
import VerifyPayment from "./pages/verifyPayment";
import ApiKeys from "./pages/ApiKey";
import Playground from "./pages/Playground";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/verify-payment" element={<VerifyPayment />} />
        <Route path="/api-keys" element={<ApiKeys />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
