import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Toast from './Components/Toast';
import ScrollToTop from './Components/ScrollToTop';
import Dashboard from './Pages/Dashboard';

import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails';
import About from './Pages/About';
import Contact from './Pages/Contact';
import NotFound from './Pages/NotFound';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0f172a', color: '#f8fafc' }}>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </Router>
    </CartProvider>
  );
}