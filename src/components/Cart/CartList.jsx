"use client";
import CartItem from "./CartItem";

export default function CartList({ cartItems, setCartItems }) {
  const handleIncrease = (id) => {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const handleDecrease = (id) => {
    setCartItems(prev => prev.map(i => i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i));
  };

  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-[#432818] mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center py-10 text-gray-400">Cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              onIncrease={() => handleIncrease(item.id)}
              onDecrease={() => handleDecrease(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}
          <div className="mt-8 pt-6 border-t border-[#e6ccb2] flex justify-between items-center font-bold text-xl">
            <span>Total:</span>
            <span>{total.toLocaleString()} MMK</span>
          </div>
        </>
      )}
    </div>
  );
}