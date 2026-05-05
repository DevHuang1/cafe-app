"use client";

import React, { useState, useMemo, use } from "react";
import {
  Tag,
  ReceiptText,
  Check,
  Truck,
  CreditCard,
  Coins,
  Coffee,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CartSummary = ({ cartItems = [] }) => {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const discount = useMemo(() => {
    if (!applied) return 0;
    return subtotal * 0.2;
  }, [applied, subtotal]);

  const applyCode = () => {
    const formattedCode = code.trim().toUpperCase();
    setChecked(true);

    if (formattedCode === "SAVE20" && subtotal >= 50000) {
      setApplied(true);
    } else {
      setApplied(false);
      alert("Invalid code or conditions not met!");
    }
  };

  const afterDiscount = Math.max(subtotal - discount, 0);
  const tax = afterDiscount * 0.05;

  const deliveryFee = afterDiscount > 50000 ? 1000 : 3000;
  const total = afterDiscount + tax + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-md items-center text-center mt-20 max-w-md mx-auto">
        <h2 className="text-xl font-semibold">Your cart is empty!</h2>
        <p className="text-gray-500 mt-3">Add items to your cart now!</p>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (paymentMethod === "card") {
        if(!cardInfo.number || !cardInfo.expiry || !cardInfo.cvv) {
            alert("Please fill in all card details!");
            return;
        }
    }
    setCode("");
    setApplied(false);
    setChecked(false);
    setCardInfo({ number: "", expiry: "", cvv: "" });
    alert("Order placed successfully!");
    router.push(
        `/success?total=${total.toFixed(2)}&method=${paymentMethod}`,
    );
  }


  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-5 space-y-4 items-center mt-20 ">
      <div className="flex items-center gap-2 justify-center">
        <Coffee className="w-5 h-5" />
        <h1 className="text-xl font-bold color:brown">Cafe App</h1>
      </div>
      <hr className="flex-1 border-gray-400" />

      <div className="flex items-center gap-2 justify-center">
        <ReceiptText className="w-5 h-5" />
        <h2 className="text-xl font-bold">Order Summary</h2>
      </div>

      <div className="space-y-2">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-700">
              {item.name} x {item.quantity}
            </span>
            <span className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <hr />

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Tag className="w-4 h-4" /> Offers
        </div>
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter promo code"
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
          />
          <button
            onClick={applyCode}
            className="px-3 py-2 rounded-lg border text-sm text-white bg-blue-500 hover:bg-blue-600"
          >
            Apply Now
          </button>
        </div>
        {checked && applied && (
          <p className="text-xs text-green-600 flex gap-2">
            Code Applied
            <Check className="text-green w-5 h-5" />
          </p>
        )}
        {checked && !applied && (
          <p className="text-xs text-red-500">Invalid code!</p>
        )}
      </div>
      <hr />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>SubTotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items=center gap-1">
            <Truck className="w-4 h-4" /> Delivery Fee
          </span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
      </div>
      <hr />

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Payment Method</h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <CreditCard className="w-4 h-4" /> Credit/Debit Card
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Coins className="w-4 h-4" /> Cash on Delivery
          </label>

          {paymentMethod === "card" && (
            <div className="space-y-2 mt-3 border p-3 rounded-lg">
              <h3 className="text-sm font-semibold">Card Details</h3>
              <input
                type="text"
                placeholder="Card Number"
                value={cardInfo.number}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, number: e.target.value })
                }
                className="w-full border px-3 py-2 rounded text-sm"
              />

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  value={cardInfo.expiry}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, expiry: e.target.value })
                  }
                  className="w-1/2 border px-3 py-2 rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cardInfo.cvv}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, cvv: e.target.value })
                  }
                  className="w-1/2 border px-3 py-2 rounded text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <hr />

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handlePlaceOrder}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold shadow"
      >
        Place Order . ${total.toFixed(2)}
      </motion.button>
    </div>
  );
};

export default CartSummary;
