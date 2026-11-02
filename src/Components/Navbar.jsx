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
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    },
    topBar: { 
      background: 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)', 
      color: '#60a5fa', 
      fontSize: '12px', 
      textAlign: 'center', 
      padding: '8px 16px', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      fontWeight: '600'
    },
    nav: { 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '16px 24px', 
      background: 'rgba(15, 23, 42, 0.95)', 
      backdropFilter: 'blur(16px)', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
      direction: 'rtl'
    },
    logo: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px', 
      fontSize: '22px', 
      fontWeight: '900', 
      color: '#fff', 
      textDecoration: 'none'
    },
    logoIcon: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      padding: '6px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    linksContainer: { 
      display: isMobile ? 'none' : 'flex', 
      gap: '8px', 
      alignItems: 'center'
    },
    getLinkStyle: ({ isActive }) => ({
      color: isActive ? '#60a5fa' : '#cbd5e1',
      background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
      border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
      padding: '8px 14px',
      borderRadius: '10px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: '0.3s'
    }),
    cartBtn: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px', 
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
      padding: '8px 16px', 
      borderRadius: '50px', 
      color: '#fff', 
      textDecoration: 'none', 
      fontSize: '14px', 
      fontWeight: 'bold', 
      position: 'relative'
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
      gap: '10px',
      background: 'rgba(15, 23, 42, 0.98)',
      backdropFilter: 'blur(16px)',
      padding: '20px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      direction: 'rtl',
      width: '100%',
      boxShadow: '0 15px 30px rgba(0,0,0,0.5)'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.topBar}>🔥 شحن مجاني للطلبات فوق 3,000 جنيه!</div>
      <nav style={styles.nav}>
        {/* الشعار على اليمين */}
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIcon}>
            <Store size={20} color="#fff" />
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
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          <Link to="/cart" style={styles.cartBtn}>
            <ShoppingCart size={16} />
            <span>السلة</span>
            {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
          </Link>
        </div>
      </nav>

      {/* قائمة الموبايل المنسدلة تظهر بانتظام تحت الناف بار فوراً */}
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