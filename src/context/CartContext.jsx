import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const cleanPrice = typeof product.price === 'string' 
        ? parseFloat(product.price.replace(/[^\d.]/g, '')) 
        : product.price;

      return [...prevCart, { ...product, price: cleanPrice, quantity: 1 }];
    });
    
    showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح! 🛒`);
  };
  // 🌟 دالة زيادة الكمية (+1) للمنتج داخل السلة
  const updateQuantityPlus = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 🌟 دالة نقصان الكمية (-1) وإذا وصلت لصفر يتم إزالة المنتج تلقائياً
  const updateQuantityMinus = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // حمايه: لو نقص عن 1 يحذفه من السلة فوراً
    );
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
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, toastMessage, updateQuantityPlus, updateQuantityMinus }}>
      {children}
    </CartContext.Provider>
  );
};
