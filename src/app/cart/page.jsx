// import CartList from "../../components/CartList";
import CartSummary from "@/components/Cart/CartSummary";
export default function CartPage() {
  const cartItems = [
    { id: 1, name: "Latte", price: 8000, quantity: 2 },
    { id: 2, name: "Cappuccino", price: 7000, quantity: 1 },
    { id: 3, name: "Espresso", price: 5000, quantity: 3 },
    { id: 4, name: "Mocha", price: 9000, quantity: 1 },
    { id: 5, name: "Americano", price: 6000, quantity: 2 },
  ];

  return (
    <>
      {/* <CartList /> */}
      <CartSummary cartItems={cartItems} />
    </>
  );
}
