import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderSuccessPage from "./components/OrderSuccessPage";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
