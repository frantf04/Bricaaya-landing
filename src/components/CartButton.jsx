"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const CartButton = ({isOpen, setIsOpen}) => {
  const {
    cart,

  } = useCart();


  return (
    <>
      <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
        <ShoppingCart /> 
        <span>
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </button>
    </>
  );
};

export default CartButton;
