import React, { createContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../Data/products';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('store_products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('store_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // 🌟 إدارة رسائل العملاء الحية القادمة من صفحة اتصل بنا
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

  // 🌟 مزامنة الرسائل مع الـ LocalStorage
  useEffect(() => {
    localStorage.setItem('store_messages', JSON.stringify(messages));
  }, [messages]);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, { ...newProduct, id: Date.now() }]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString('ar-EG'),
      customer: orderData.customer,
      products: orderData.products,
      total: orderData.total,
      status: 'قيد المراجعة'
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  // 🌟 دالة استقبال وحفظ الرسائل الجديدة
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
