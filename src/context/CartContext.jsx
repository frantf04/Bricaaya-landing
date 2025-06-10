import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Cargar estado inicial desde localStorage
  const [cart, setCart] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
      }
      return [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  });

  const [orderNumber, setOrderNumber] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedOrder = localStorage.getItem('orderNumber');
        return savedOrder ? parseInt(savedOrder) : Math.floor(10000 + Math.random() * 90000);
      }
      return Math.floor(10000 + Math.random() * 90000);
    } catch (error) {
      console.error('Error parsing orderNumber from localStorage:', error);
      return Math.floor(10000 + Math.random() * 90000);
    }
  });

  const [customerInfo, setCustomerInfo] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedInfo = localStorage.getItem('customerInfo');
        return savedInfo ? JSON.parse(savedInfo) : {
          name: '',
          email: '',
          phone: '',
          address: ''
        };
      }
      return {
        name: '',
        email: '',
        phone: '',
        address: ''
      };
    } catch (error) {
      console.error('Error parsing customerInfo from localStorage:', error);
      return {
        name: '',
        email: '',
        phone: '',
        address: ''
      };
    }
  });

  // Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orderNumber', orderNumber.toString());
  }, [orderNumber]);

  useEffect(() => {
    localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
  }, [customerInfo]);

  const addToCart = (product, variant, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.productId === product.id && item.variantId === variant.id
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product.id && item.variantId === variant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [
        ...prevCart,
        {
          productId: product.id,
          productName: product.name,
          variantId: variant.id,
          variantSize: variant.size,
          price: variant.price,
          quantity,
          image: product.src
        }
      ];
    });
  };

  const removeFromCart = (productId, variantId) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.productId === productId && item.variantId === variantId)
    ));
  };

  const updateQuantity = (productId, variantId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    
    setCart(prevCart => prevCart.map(item =>
      item.productId === productId && item.variantId === variantId
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    const newOrderNumber = Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(newOrderNumber);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = cart.reduce((sum, item) => {
    // Extraer el valor numérico del precio (ejemplo: "RD$1750" → 1750)
    const priceStr = item.price.replace(/[^0-9.]/g, '');
    const price = parseFloat(priceStr) || 0;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      orderNumber,
      customerInfo,
      setCustomerInfo
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);