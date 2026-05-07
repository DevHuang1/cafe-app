"use client";

import React from "react";
import { Minus, Plus, Trash2, Coffee } from "lucide-react";
import { motion } from "framer-motion";

const CartItem = ({ item }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-4 mb-4 bg-white rounded-2xl shadow-sm border border-[#e6ccb2] transition-all hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        {/* Coffee Icon - Team Theme Color */}
        <div className="w-16 h-16 bg-[#f5ebe0] rounded-xl flex items-center justify-center text-[#8d5b4c]">
          <Coffee size={28} />
        </div>
        
        <div className="space-y-1">
          <h3 className="font-bold text-[#432818] text-lg">{item.name}</h3>
          <p className="text-sm text-gray-500 font-medium">
            {item.price.toLocaleString()} MMK
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Quantity Controls */}
        <div className="flex items-center bg-[#f9f7f5] rounded-full p-1 border border-gray-200 shadow-inner">
          <button className="p-1.5 hover:bg-white rounded-full transition-all text-[#8d5b4c]">
            <Minus size={14} strokeWidth={3} />
          </button>
          <span className="mx-4 font-bold text-[#432818] min-w-[1.5rem] text-center">
            {item.quantity}
          </span>
          <button className="p-1.5 hover:bg-white rounded-full transition-all text-[#8d5b4c]">
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>
        
        {/* Remove Button */}
        <button className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
          <Trash2 size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;