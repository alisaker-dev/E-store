import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const CartPage = () => {
  const { items, total, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <main className="p-4 sm:p-8">
        <h2 className="mb-4 text-2xl">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 underline">
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="p-4 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl">Shopping Cart</h2>
        <Link
          to="/"
          className="text-blue-600 hover:bg-blue-100 p-2 border rounded"
        >
          Continue shopping
        </Link>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="surface-card flex flex-wrap items-center gap-4 rounded border p-4"
          >
            <img
              src={item.images[0]}
              alt={item.title}
              className="h-20 w-20 object-contain"
            />
            <div className="min-w-40 flex-1">
              <h3>{item.title}</h3>
              <span>${item.price.toFixed(2)}</span>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(event) =>
                updateQuantity(item.id, Number(event.target.value))
              }
              className="w-20 rounded border p-2"
              aria-label={`Quantity for ${item.title}`}
            />
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 underline cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-4">
        <strong className="text-xl">Total: ${total.toFixed(2)}</strong>
        <button
          onClick={() => navigate("/checkout")}
          className="primary-action rounded px-5 py-3 text-white"
        >
          Buy now
        </button>
      </div>
    </main>
  );
};

export default CartPage;
