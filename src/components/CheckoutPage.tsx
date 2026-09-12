import { Link, useNavigate } from "react-router-dom";
import { Show, SignInButton } from "@clerk/react";
import { useCart } from "../contexts/CartContext";

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <main className="p-4 sm:p-8">
        <h2 className="mb-4 text-2xl">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 underline">
          Return to store
        </Link>
      </main>
    );
  }

  const handlePurchase = () => {
    clearCart();
    navigate("/order-success");
  };

  return (
    <main className="w-full p-4 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className=" text-2xl">Checkout</h2>
        <Link
          to="/"
          className="text-blue-600 hover:bg-blue-100 p-2 border rounded"
        >
          Continue shopping
        </Link>
      </div>
      <Show when="signed-out">
        <div className="rounded border bg-blue-100 p-5">
          <p className="mb-4">
            Please sign in before completing your purchase.
          </p>
          <SignInButton mode="modal" fallbackRedirectUrl="/checkout">
            <button className="w-full rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
              Sign in to continue
            </button>
          </SignInButton>
        </div>
      </Show>
      <Show when="signed-in">
        <div className="rounded border bg-white p-5">
          <p className="mb-4">Items: {items.length}</p>
          <p className="mb-6 text-xl font-bold">Total: ${total.toFixed(2)}</p>
          <button
            onClick={handlePurchase}
            className="w-full rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Confirm purchase
          </button>
        </div>
      </Show>
    </main>
  );
};

export default CheckoutPage;
