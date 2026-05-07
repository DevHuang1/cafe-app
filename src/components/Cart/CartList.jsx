"use client";

import React from "react";
import CartItem from "./CartItem";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const CartList = ({ cartItems = [] }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-[#432818] p-2.5 rounded-xl text-white shadow-lg">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#432818]">Your Selection</h2>
            <p className="text-sm text-gray-400 font-medium">Review items before checkout</p>
          </div>
        </div>
        <span className="bg-[#e6ccb2] text-[#432818] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
          {cartItems.length} items
        </span>
      </div>

      {/* Cart Items List */}
      {cartItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-[#e6ccb2] shadow-sm"
        >
          <div className="inline-block p-4 bg-[#f5ebe0] rounded-full mb-4">
            <ShoppingBag size={48} className="text-[#8d5b4c]" />
          </div>
          <h3 className="text-xl font-bold text-[#432818]">Your tray is empty</h3>
          <p className="text-gray-500 mt-2">Add some coffee to get started!</p>
        </motion.div>
      ) : (
        <div className="flex flex-col">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartList;