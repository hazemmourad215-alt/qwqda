import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // حالة الإشعار (الرسالة اللي هتظهر)
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500); // تختفي بعد ثوانٍ معدودة
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // إظهار رسالة النجاح
    showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح! 🛒`);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showToast("تم إزالة المنتج من السلة");
  };

  const clearCart = () => {
    setCart([]);
    showToast("تم إفراغ السلة بالكامل");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, toastMessage }}>
      {children}
    </CartContext.Provider>
  );
};