"use client";
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center justify-between p-4 mb-4 bg-white rounded-2xl shadow-sm border border-[#e6ccb2]"
    >
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
        <div>
          <h3 className="font-bold text-[#432818]">{item.name}</h3>
          <p className="text-sm text-[#8d5b4c]">{item.price.toLocaleString()} MMK</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center bg-[#f9f7f5] rounded-full p-1 border border-gray-200">
          <button onClick={onDecrease} className="p-1.5 hover:bg-white rounded-full transition-all">
            <Minus size={14} strokeWidth={3} />
          </button>
          <span className="mx-4 font-bold text-[#432818]">{item.quantity}</span>
          <button onClick={onIncrease} className="p-1.5 hover:bg-white rounded-full transition-all">
            <Plus size={14} strokeWidth={3} />
          </button>
        </div>
        
        <button onClick={onRemove} className="p-2 text-gray-300 hover:text-red-500 transition-all">
          <Trash2 size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;