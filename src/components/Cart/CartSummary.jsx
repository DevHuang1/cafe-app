"use client";

import React, { useState, useMemo } from "react";
import {
  Tag, ReceiptText, Check, Truck, CreditCard,
  Coins, Coffee, ShoppingCart, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

const CartSummary = ({ cartItems = [] }) => {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [checked, setChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardInfo, setCardInfo] = useState({ number: "", expiry: "", cvv: "" });
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const subtotal = useMemo(
    () => cartItems.reduce((t, i) => t + i.price * i.quantity, 0),
    [cartItems]
  );
  const discount = useMemo(() => applied ? subtotal * 0.2 : 0, [applied, subtotal]);
  const afterDiscount = Math.max(subtotal - discount, 0);
  const tax = afterDiscount * 0.05;
  const deliveryFee = afterDiscount > 50000 ? 1000 : 3000;
  const total = afterDiscount + tax + deliveryFee;

  const applyCode = () => {
    setChecked(true);
    const c = code.trim().toUpperCase();
    if (!c) { setApplied(false); return; }
    if (c === "SAVE20" && subtotal >= 50000) {
      setApplied(true);
    } else {
      setApplied(false);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "card") {
      if (!cardInfo.number || !cardInfo.expiry || !cardInfo.cvv) {
        alert("Please fill in all card details!");
        return;
      }
    }
    clearCart();
    router.push(`/success?total=${total.toFixed(0)}&method=${paymentMethod}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-[72px] flex items-center justify-center"
        style={{ background: "#FDFCFB" }}>
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(139,94,60,0.1)" }}>
            <ShoppingCart size={36} className="text-[#8B5E3C]" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#3E2723] mb-2">Cart is empty</h2>
          <p className="text-[#957261] mb-6">Add items from the menu first</p>
          <a href="/menu" className="px-8 py-3 rounded-xl font-bold text-white inline-block"
            style={{ background: "#8B5E3C" }}>
            Browse Menu
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .sum-input {
          width: 100%;
          padding: 12px 16px;
          background: white;
          border: 1.5px solid #E8E2DA;
          border-radius: 12px;
          color: #3E2723;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .sum-input::placeholder { color: #c4b5a5; }
        .sum-input:hover { border-color: #C08A5D; }
        .sum-input:focus {
          border-color: #8B5E3C;
          box-shadow: 0 0 0 3px rgba(139,94,60,0.1);
        }
        .pay-radio {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1.5px solid #E8E2DA;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          background: white;
        }
        .pay-radio:hover { border-color: #C08A5D; background: #fffaf7; }
        .pay-radio.selected {
          border-color: #8B5E3C;
          background: rgba(139,94,60,0.06);
        }
        .place-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(to right, #B08968, #8B5E3C);
          color: white;
          font-size: 16px;
          font-weight: 700;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 6px 20px rgba(139,94,60,0.35);
        }
        .place-btn:hover { opacity: 0.92; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(139,94,60,0.4); }
        .place-btn:active { transform: scale(0.98); box-shadow: none; }
      `}</style>

      <div className="min-h-screen pt-[72px] pb-16" style={{ background: "#FDFCFB" }}>
        <div className="max-w-lg mx-auto px-4 py-10">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3"
              style={{ background: "rgba(139,94,60,0.1)" }}>
              <ReceiptText size={26} className="text-[#8B5E3C]" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#3E2723]">Order Summary</h1>
            <div className="flex items-center justify-center gap-2 mt-2 text-[#957261] text-sm">
              <Coffee size={14} />
              <span>MyCafe · Yangon</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8E2DA] overflow-hidden"
            style={{ boxShadow: "0 8px 32px rgba(139,94,60,0.1)" }}>

            {/* Items */}
            <div className="p-6 border-b border-[#F0E8DE]">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#C08A5D] mb-4">
                Your Items
              </h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#F5F0EA] flex items-center justify-center flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-sm">☕</span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-[#3E2723]">
                        {item.name}
                        <span className="text-[#957261] ml-1">× {item.quantity}</span>
                      </span>
                    </div>
                    <span className="text-sm font-bold text-[#8B5E3C]">
                      {(item.price * item.quantity).toLocaleString()} MMK
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo code */}
            <div className="p-6 border-b border-[#F0E8DE]">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#C08A5D] mb-4 flex items-center gap-2">
                <Tag size={13} /> Promo Code
              </h3>
              <div className="flex gap-2">
                <input
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setChecked(false); }}
                  placeholder='Try "SAVE20"'
                  className="sum-input flex-1"
                />
                <button
                  onClick={applyCode}
                  className="px-5 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-95 shrink-0"
                  style={{ background: "#8B5E3C" }}
                >
                  Apply
                </button>
              </div>
              <AnimatePresence>
                {checked && code.trim() && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-2 text-xs font-semibold flex items-center gap-1 ${applied ? "text-green-600" : "text-red-500"}`}
                  >
                    {applied ? <><Check size={12} /> 20% discount applied!</> : <><X size={12} /> Invalid code or min. 50,000 MMK required</>}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Price breakdown */}
            <div className="p-6 border-b border-[#F0E8DE]">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#C08A5D] mb-4">
                Price Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#957261]">Subtotal</span>
                  <span className="font-semibold text-[#3E2723]">{subtotal.toLocaleString()} MMK</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (20%)</span>
                    <span className="font-semibold">−{discount.toLocaleString()} MMK</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#957261]">Tax (5%)</span>
                  <span className="font-semibold text-[#3E2723]">{Math.round(tax).toLocaleString()} MMK</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#957261] flex items-center gap-1.5">
                    <Truck size={13} /> Delivery
                  </span>
                  <span className="font-semibold text-[#3E2723]">{deliveryFee.toLocaleString()} MMK</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#F0E8DE]">
                  <span className="font-bold text-[#3E2723] text-base">Total</span>
                  <span className="font-bold text-[#8B5E3C] text-xl">{Math.round(total).toLocaleString()} MMK</span>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="p-6 border-b border-[#F0E8DE]">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#C08A5D] mb-4">
                Payment Method
              </h3>
              <div className="space-y-3">
                <label
                  className={`pay-radio ${paymentMethod === "cod" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="accent-[#8B5E3C]" />
                  <Coins size={18} className="text-[#8B5E3C]" />
                  <div>
                    <p className="font-semibold text-[#3E2723] text-sm">Cash on Delivery</p>
                    <p className="text-xs text-[#957261]">Pay when you receive</p>
                  </div>
                </label>

                <label
                  className={`pay-radio ${paymentMethod === "card" ? "selected" : ""}`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <input type="radio" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="accent-[#8B5E3C]" />
                  <CreditCard size={18} className="text-[#8B5E3C]" />
                  <div>
                    <p className="font-semibold text-[#3E2723] text-sm">Credit / Debit Card</p>
                    <p className="text-xs text-[#957261]">Visa, Mastercard accepted</p>
                  </div>
                </label>

                <AnimatePresence>
                  {paymentMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      <input
                        type="text"
                        placeholder="Card Number (16 digits)"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                        className="sum-input"
                      />
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          className="sum-input"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          className="sum-input"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Place order */}
            <div className="p-6">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handlePlaceOrder}
                className="place-btn"
              >
                Place Order · {Math.round(total).toLocaleString()} MMK
              </motion.button>
              <p className="text-center text-xs text-[#C4A882] mt-3">
                🔒 Secure checkout · Free cancellation within 5 mins
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CartSummary;