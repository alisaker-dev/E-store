import { Link } from "react-router-dom";

const OrderSuccessPage = () => (
  <main className="p-4 sm:p-8">
    <h2 className="mb-3 text-2xl">Thank you for your purchase!</h2>
    <p className="mb-4">Your order has been placed successfully.</p>
    <Link to="/" className="text-blue-600 underline">
      Back to store
    </Link>
  </main>
);

export default OrderSuccessPage;
