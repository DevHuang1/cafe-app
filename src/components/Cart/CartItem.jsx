"use client";

import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

const CartItem = ({ item }) => {
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 mb-4 bg-white rounded-2xl shadow-sm border border-[#e6ccb2] transition-all hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        {/* Image or fallback */}
        <div className="w-16 h-16 bg-[#f5ebe0] rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl">☕</span>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-[#432818] text-lg">{item.name}</h3>
          <p className="text-sm text-gray-500 font-medium">
            {Number(item.price).toLocaleString()} MMK
          </p>
          <p className="text-xs text-[#8B5E3C] font-semibold">
            Subtotal: {(Number(item.price) * item.quantity).toLocaleString()} MMK
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quantity Controls */}
        <div className="flex items-center bg-[#f9f7f5] rounded-full p-1 border border-gray-200 shadow-inner">
          <button
            onClick={() => updateQty(item.id, item.quantity - 1)}
            className="p-1.5 hover:bg-white rounded-full transition-all text-[#8d5b4c] active:scale-90"
          >
            <Minus size={14} strokeWidth={3} />
          </button>
          <span className="mx-4 font-bold text-[#432818] min-w-[1.5rem] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQty(item.id, item.quantity + 1)}
            className="p-1.5 hover:bg-white rounded-full transition-all text-[#8d5b4c] active:scale-90"
          >
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>

        {/* Remove */}
        <button
          onClick={() => removeItem(item.id)}
          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;