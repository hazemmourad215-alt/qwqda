import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, CheckCircle, X } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      setIsSuccess(false);
      setIsCheckoutOpen(false);
    }, 3000);
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '24px 16px' : '48px 32px',
      direction: 'rtl'
    },
    title: {
      fontSize: isMobile ? '28px' : '36px',
      fontWeight: '900',
      color: '#fff',
      marginBottom: isMobile ? '24px' : '40px',
      borderRight: '4px solid #3b82f6',
      paddingRight: '16px'
    },
    grid: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '32px',
      alignItems: 'start'
    },
    cartList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      flex: 1,
      width: '100%'
    },
    cartItem: {
      background: 'rgba(30, 41, 59, 0.6)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '16px',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      width: '100%',
      boxSizing: 'border-box'
    },
    itemImage: {
      width: isMobile ? '64px' : '80px',
      height: isMobile ? '64px' : '80px',
      objectFit: 'cover',
      borderRadius: '12px',
      background: '#1e293b'
    },
    summaryCard: {
      background: 'rgba(30, 41, 59, 0.6)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: isMobile ? '20px' : '32px',
      borderRadius: '24px',
      width: '100%',
      maxWidth: isMobile ? '100%' : '380px',
      boxSizing: 'border-box'
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#cbd5e1'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '20px 0',
      fontSize: '20px',
      fontWeight: '900',
      color: '#fff'
    },
    checkoutBtn: {
      width: '100%',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: '#fff',
      border: 'none',
      padding: '16px',
      borderRadius: '16px',
      fontWeight: 'bold',
      fontSize: '18px',
      cursor: 'pointer',
      marginTop: '16px',
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
    },
    deleteBtn: {
      color: '#f43f5e',
      background: 'transparent',
      border: 'none',
      padding: '10px',
      borderRadius: '12px',
      cursor: 'pointer'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: isMobile ? 'flex-end' : 'center',
      zIndex: 1000
    },
    modalContent: {
      background: '#1e293b',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '32px',
      borderRadius: isMobile ? '24px 24px 0 0' : '24px',
      width: '100%',
      maxWidth: '450px',
      position: 'relative',
      boxSizing: 'border-box',
      maxHeight: isMobile ? '90vh' : 'auto',
      overflowY: 'auto'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '12px',
      background: '#0f172a',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#fff',
      marginTop: '8px',
      marginBottom: '16px',
      outline: 'none',
      boxSizing: 'border-box'
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: isMobile ? '64px 0' : '96px 0', direction: 'rtl' }}>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', width: '96px', height: '96px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', color: '#60a5fa' }}>
          <ShoppingBag size={48} />
        </div>
        <h2 style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: '900', color: '#fff' }}>سلة المشتريات فارغة</h2>
        <p style={{ color: '#94a3b8', marginTop: '8px', marginBottom: '32px', fontSize: isMobile ? '16px' : '18px' }}>
          يبدو أنك لم تقم بإضافة أي منتجات إلى سلتك بعد.
        </p>
        <Link to="/shop" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: '#fff', padding: '14px 32px', borderRadius: '14px', textDecoration: 'none', fontWeight: 'bold' }}>
          تصفح المنتجات الآن
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>سلة المشتريات</h1>
      <div style={styles.grid}>
        <div style={styles.cartList}>
          {cart.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 'bold', color: '#fff', fontSize: isMobile ? '16px' : '18px' }}>{item.name}</h3>
                <p style={{ color: '#60a5fa', fontWeight: '800', marginTop: '4px' }}>
                  {item.price} جنيه <span style={{ fontSize: '14px', color: '#94a3b8' }}>(الكمية: {item.quantity})</span>
                </p>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={styles.deleteBtn}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button onClick={clearCart} style={{ color: '#f43f5e', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'right', fontWeight: '600', marginTop: '8px' }}>
            إفراغ السلة بالكامل
          </button>
        </div>

        <div style={styles.summaryCard}>
          <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>ملخص الطلب</h3>
          <div style={styles.summaryRow}>
            <span>المجموع الفرعي</span>
            <span style={{ fontWeight: 'bold', color: '#fff' }}>{totalPrice} جنيه</span>
          </div>
          <div style={styles.summaryRow}>
            <span>الشحن</span>
            <span style={{ color: '#34d399', fontWeight: 'bold' }}>مجاني</span>
          </div>
          <div style={styles.totalRow}>
            <span>الإجمالي الكلي</span>
            <span style={{ color: '#60a5fa' }}>{totalPrice} جنيه</span>
          </div>
          <button onClick={() => setIsCheckoutOpen(true)} style={styles.checkoutBtn}>إتمام الشراء</button>
        </div>
      </div>

      {/* مودال الدفع الوهمي */}
      {isCheckoutOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={() => setIsCheckoutOpen(false)} style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <CheckCircle size={64} color="#34d399" style={{ margin: '0 auto 16px auto' }} />
                <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>تم الطلب بنجاح!</h2>
                <p style={{ color: '#94a3b8', marginTop: '8px' }}>شكراً لتسوقك معنا، سيتم توصيل طلبك قريباً.</p>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit}>
                <h2 style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>بيانات الشحن والدفع الوهمي</h2>
                
                <label style={{ color: '#cbd5e1', fontSize: '14px' }}>الاسم الكامل</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} style={styles.input} />

                <label style={{ color: '#cbd5e1', fontSize: '14px' }}>عنوان التوصيل</label>
                <input type="text" name="address" required value={formData.address} onChange={handleInputChange} style={styles.input} />

                <label style={{ color: '#cbd5e1', fontSize: '14px' }}>رقم الهاتف</label>
                <input type="text" name="phone" required value={formData.phone} onChange={handleInputChange} style={styles.input} />

                <button type="submit" style={styles.checkoutBtn}>
                  تأكيد ودفع {totalPrice} جنيه
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}