"use client";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/Cart/CartItem";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div className="min-h-screen pt-[72px]" style={{ background: "#FDFCFB" }}>
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B5E3C] hover:text-[#6B4226] transition"
          >
            <ArrowLeft size={16} /> Back to Menu
          </Link>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 text-sm text-red-400 hover:text-red-600 transition"
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>

        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl text-white" style={{ background: "#8B5E3C" }}>
            <ShoppingCart size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#432818]">Your Cart</h1>
            <p className="text-sm text-gray-400">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{ background: "rgba(139,94,60,0.1)" }}>
              <ShoppingCart size={40} className="text-[#8B5E3C]" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#3E2723] mb-2">
              Your cart is empty
            </h2>
            <p className="text-[#957261] mb-8">
              Add some items from the menu to get started
            </p>
            <Link
              href="/menu"
              className="px-8 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95 hover:opacity-90"
              style={{ background: "#8B5E3C" }}
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="mb-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Order summary box */}
            <div className="bg-white rounded-3xl border border-[#E8E2DA] p-6"
              style={{ boxShadow: "0 4px 20px rgba(139,94,60,0.08)" }}>
              <h3 className="font-bold text-[#3E2723] text-lg mb-4">Order Summary</h3>

              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-[#957261] mb-2">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{(Number(item.price) * item.quantity).toLocaleString()} MMK</span>
                </div>
              ))}

              <div className="border-t border-[#E8E2DA] mt-4 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#957261]">Subtotal</span>
                  <span className="font-bold text-[#3E2723]">{getTotal().toLocaleString()} MMK</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#957261]">Delivery</span>
                  <span className="font-bold text-[#8B5E3C]">Free</span>
                </div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-bold text-[#3E2723]">Total</span>
                  <span className="text-2xl font-bold text-[#8B5E3C]">
                    {getTotal().toLocaleString()} MMK
                  </span>
                </div>

                <Link
                  href="/order-summary"
                  className="block w-full text-center py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-[1.02] active:scale-[0.98] hover:opacity-90"
                  style={{
                    background: "linear-gradient(to right, #B08968, #8B5E3C)",
                    boxShadow: "0 6px 20px rgba(139,94,60,0.35)",
                  }}
                >
                  Proceed to Order Summary →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}