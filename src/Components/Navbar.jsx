import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingBag, Store, Home, ShoppingCart, Info, PhoneCall, Menu, X } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      if (window.innerWidth > 900) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    wrapper: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    },
    topBar: { 
      background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)', 
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      color: '#60a5fa', 
      fontSize: '13px', 
      textAlign: 'center', 
      padding: '8px 16px', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
      fontWeight: '700',
      letterSpacing: '0.5px'
    },
    nav: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '16px 24px', 
      background: 'rgba(15, 23, 42, 0.4)', 
      backdropFilter: 'blur(20px)', 
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)', 
      direction: 'rtl'
    },
    logo: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px', 
      fontSize: '22px', 
      fontWeight: '950', 
      color: '#fff', 
      textDecoration: 'none',
      letterSpacing: '-0.5px'
    },
    logoIcon: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      padding: '8px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
    },
    linksContainer: { 
      display: isMobile ? 'none' : 'flex', 
      gap: '6px', 
      alignItems: 'center'
    },
    getLinkStyle: ({ isActive }) => ({
      color: isActive ? '#60a5fa' : '#cbd5e1',
      background: isActive ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
      border: isActive ? '1px solid rgba(59, 130, 246, 0.25)' : '1px solid transparent',
      padding: '10px 16px',
      borderRadius: '12px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }),
    cartBtn: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px', 
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
      padding: '10px 20px', 
      borderRadius: '50px', 
      color: '#fff', 
      textDecoration: 'none', 
      fontSize: '14px', 
      fontWeight: 'bold', 
      position: 'relative',
      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
    },
    badge: { 
      background: '#f43f5e', 
      color: '#fff', 
      fontSize: '11px', 
      width: '20px', 
      height: '20px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderRadius: '50%', 
      fontWeight: 'bold'
    },
    menuBtn: {
      background: 'none',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      padding: '4px'
    },
    mobileMenu: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      padding: '24px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      direction: 'rtl',
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: '0 15px 30px rgba(0,0,0,0.4)'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.topBar}>🔥 شحن مجاني للطلبات فوق 3,000 جنيه!</div>
      <nav style={styles.nav}>
        {/* الشعار على اليمين */}
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIcon}>
            <Store size={18} color="#fff" />
          </div>
          Nex<span style={{ color: '#60a5fa' }}>Store</span>
        </Link>

        {/* روابط الشاشات الكبيرة (كمبيوتر) */}
        <div style={styles.linksContainer}>
          <NavLink to="/" style={styles.getLinkStyle} end><Home size={16} /> الرئيسية</NavLink>
          <NavLink to="/shop" style={styles.getLinkStyle}><ShoppingBag size={16} /> المنتجات</NavLink>
          <NavLink to="/about" style={styles.getLinkStyle}><Info size={16} /> من نحن</NavLink>
          <NavLink to="/contact" style={styles.getLinkStyle}><PhoneCall size={16} /> اتصل بنا</NavLink>
        </div>

        {/* الأيقونات الجانبية (زر القائمة + زر السلة) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setIsOpen(!isOpen)} style={styles.menuBtn}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/cart" style={styles.cartBtn}>
            <ShoppingCart size={16} />
            <span>السلة</span>
            {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
          </Link>
        </div>
      </nav>

      {/* قائمة الموبايل المنسدلة تظهر بانتظام وتأثير الزجاج الشفاف تحت الناف بار فوراً */}
      {isOpen && isMobile && (
        <div style={styles.mobileMenu}>
          <NavLink to="/" onClick={() => setIsOpen(false)} style={styles.getLinkStyle} end><Home size={18} /> الرئيسية</NavLink>
          <NavLink to="/shop" onClick={() => setIsOpen(false)} style={styles.getLinkStyle}><ShoppingBag size={18} /> المنتجات</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} style={styles.getLinkStyle}><Info size={18} /> من نحن</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)} style={styles.getLinkStyle}><PhoneCall size={18} /> اتصل بنا</NavLink>
        </div>
      )}
    </div>
  );
}
