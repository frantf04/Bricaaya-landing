"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const Cart = ({isOpen, setIsOpen}) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    orderNumber,
    customerInfo,
    setCustomerInfo,
    clearCart
  } = useCart();
  

  const handleCheckout = () => {
    const phone = "18295561426";
    
    // Crear el mensaje con la plantilla solicitada
    let message = `Hola, realicé un pedido el cual me gustaría que sea entregado tomando en cuenta los siguientes datos.\n\n`;
    message += `Numero de orden: #${orderNumber}\n`;
    message += `Total de la compra: RD$${subtotal.toFixed(2)}\n`;
    message += `Lo que compré fue:\n`;
    
    cart.forEach(item => {
      message += `${item.quantity} x ${item.productName} - ${item.variantSize}\n`;
    });
    
    message += `\nPersona autorizada de recibir:\n`;
    message += `Nombre: ${customerInfo.name}\n`;
    message += `WhatsApp: ${customerInfo.phone}\n`;
    message += `Correo electronico: ${customerInfo.email}\n\n`;
    
    message += `Dirección de entrega:\n`;
    message += `${customerInfo.address}\n\n`;
    
    message += `Agradezco su pronta atención y confirmación del envío.\n\n`;
    message += `Saludos cordiales,\n${customerInfo.name}`;

    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="cart-modal">
          <div className="cart-content">
            <div className="cart-header">
              <h3>Carrito de Compras</h3>
              <button onClick={() => setIsOpen(false)}>×</button>
            </div>
            
            <div className="cart-items">
              {cart.length === 0 ? (
                <p>Tu carrito está vacío</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="cart-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.productName} />
                      </div>
                      <div className="item-details">
                        <h4>{item.productName}</h4>
                        <p>{item.variantSize}</p>
                        <p>{item.price}</p>
                        <div className="item-quantity">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button 
                        className="remove-item"
                        onClick={() => removeFromCart(item.productId, item.variantId)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  
                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>RD${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="customer-info">
                    <h4>Información del Cliente</h4>
                    <div className="form-group">
                      <label>Nombre Completo</label>
                      <input 
                        type="text" 
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>WhatsApp</label>
                      <input 
                        type="tel" 
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Correo Electrónico</label>
                      <input 
                        type="email" 
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Dirección de Entrega</label>
                      <textarea 
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <button 
                    className="checkout-button"
                    onClick={handleCheckout}
                    disabled={!customerInfo.name || !customerInfo.phone || !customerInfo.address}
                  >
                    Realizar Pedido por WhatsApp
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;