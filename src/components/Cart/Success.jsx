"use client";

import React, {useState}from "react";
import { useSearchParams } from "next/navigation";

const Success = () => {
  const searchParams = useSearchParams();
  const [orderId] = useState(()=>{
    Math.floor(Math.random()*1000000)
  })
  const total = searchParams.get("total");
  const method = searchParams.get("method");

  return (
    <div className="min h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center space-y-4 max-w-sm">
        <h1 className="text-2xl font-bold text-green-600">Order Successful</h1>
        <p className="text-gray-700">
          Thank you for your purchase!
          <br />
          Your order has been placed successfully.
        </p>

        <div className="text-sm space-y-2">
            <p>
                <strong>Order ID:</strong> #{orderId}
            </p>
          <p>
            <strong>Total:</strong> ${total}
          </p>
          <p>
            <strong>Payment Method:</strong>{" "}
            {method === "card" ? "Credit/Debit Card" : "Cash on Delivery"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
