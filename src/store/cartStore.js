import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(persist(
  (set, get) => ({
    items: [],

    addItem: (item) => {
      const existing = get().items.find(i => i.id === item.id);
      if (existing) {
        set({
          items: get().items.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        });
      } else {
        set({ items: [...get().items, { ...item, quantity: 1 }] });
      }
    },

    removeItem: (id) =>
      set({ items: get().items.filter(i => i.id !== id) }),

    updateQty: (id, qty) => {
      if (qty < 1) return;
      set({
        items: get().items.map(i =>
          i.id === id ? { ...i, quantity: qty } : i
        )
      });
    },

    clearCart: () => set({ items: [] }),

    getTotal: () =>
      get().items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0),

    getTotalItems: () =>
      get().items.reduce((sum, i) => sum + i.quantity, 0),
  }),
  { name: 'cafe-cart' }
));