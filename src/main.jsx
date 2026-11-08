import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // 🌟 تأكد من وجود هذا السطر ومساره الصحيح
import { DashboardProvider } from './context/DashboardContext';
import { CartProvider } from './context/CartContext';
import './index.css'; // أو ملف الاستايل الخاص بك

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DashboardProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </DashboardProvider>
  </React.StrictMode>
);
