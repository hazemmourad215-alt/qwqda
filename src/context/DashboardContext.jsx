import React, { createContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../Data/products';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('store_products');
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      return parsed.map(p => ({ 
        ...p, 
        costPrice: p.costPrice || Math.round(Number(p.price) * 0.7), 
        discount: Number(p.discount) || 0,
        isNewBadge: p.isNewBadge !== undefined ? p.isNewBadge : true // حفظ شارة جديد الافتراضية
      }));
    }
    return initialProducts.map(p => ({ ...p, costPrice: p.costPrice || Math.round(Number(p.price) * 0.7), discount: 0, isNewBadge: true }));
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('store_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('store_messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  useEffect(() => {
    localStorage.setItem('store_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('store_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('store_messages', JSON.stringify(messages));
  }, [messages]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, { 
      ...newProduct, 
      id: Date.now(),
      price: Number(newProduct.price),
      costPrice: Number(newProduct.costPrice),
      discount: Number(newProduct.discount) || 0,
      isNewBadge: newProduct.isNewBadge // حفظ الاختيار اليدوي للشارة
    }]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString('ar-EG'),
      customer: orderData.customer,
      products: orderData.products.map(item => ({
        id: item.id,
        name: item.name,
        price: item.discount > 0 ? Math.round(Number(item.price) * (1 - Number(item.discount) / 100)) : Number(item.price),
        costPrice: Number(item.costPrice) || Math.round(Number(item.price) * 0.7),
        quantity: item.quantity,
        category: item.category
      })),
      total: orderData.total,
      status: 'قيد المراجعة'
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const addMessage = (msgData) => {
    const newMessage = {
      id: `MSG-${Date.now()}`,
      date: new Date().toLocaleDateString('ar-EG'),
      name: msgData.name,
      email: msgData.email,
      text: msgData.text
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  return (
    <DashboardContext.Provider value={{ products, setProducts, orders, addProduct, deleteProduct, addOrder, messages, addMessage }}>
      {children}
    </DashboardContext.Provider>
  );
};
