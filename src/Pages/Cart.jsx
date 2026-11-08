import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { DashboardContext } from '../context/DashboardContext'; 
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, CheckCircle, X, Plus, Minus } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantityPlus, updateQuantityMinus } = useContext(CartContext);
  const { addOrder } = useContext(DashboardContext); 
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

  // 🌟 1. المجموع الفرعي الصحيح: حساب الأسعار الأصلية (قبل الخصم) لجميع المنتجات في السلة
  const subTotal = cart.reduce((total, item) => {
    const savedProducts = JSON.parse(localStorage.getItem('store_products')) || [];
    const originalProduct = savedProducts.find(p => p.id === item.id);
    
    const discountPercent = Number(item.discount) || 0;
    const originalPrice = originalProduct 
      ? Number(originalProduct.price) 
      : (discountPercent > 0 ? Math.round(Number(item.price) / (1 - discountPercent / 100)) : Number(item.price));
      
    const qty = Number(item.quantity) || 1;
    return total + (originalPrice * qty);
  }, 0);

  // 🌟 2. إجمالي الخصم/التوفير: الفارق الحقيقي المخصوم بين السعر الأصلي والمخفض
  const totalDiscount = cart.reduce((total, item) => {
    const discountPercent = Number(item.discount) || 0;
    if (discountPercent > 0) {
      const savedProducts = JSON.parse(localStorage.getItem('store_products')) || [];
      const originalProduct = savedProducts.find(p => p.id === item.id);
      const originalPrice = originalProduct ? Number(originalProduct.price) : (Number(item.price) / (1 - discountPercent / 100));
      
      const cleanPrice = Number(item.price);
      const savingsPerItem = Math.max(0, Math.round(originalPrice - cleanPrice));
      return total + (savingsPerItem * (Number(item.quantity) || 1));
    }
    return total;
  }, 0);
  // 3. تحديد مصاريف الشحن ديناميكياً بناءً على السعر النهائي الفعلي للسلع (بعد الخصم)
  const finalItemsPrice = subTotal - totalDiscount;
  const shippingCost = finalItemsPrice >= 3000 || finalItemsPrice === 0 ? 0 : 50;

  // 🌟 4. الإجمالي الكلي النهائي الصحيح = (المجموع الفرعي الأصلي - الخصم) + الشحن
  const totalPrice = (subTotal - totalDiscount) + shippingCost;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    addOrder({
      customer: formData,
      products: cart,
      total: totalPrice
    });
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      setIsSuccess(false);
      setIsCheckoutOpen(false);
      setFormData({ name: '', address: '', phone: '' });
    }, 3000);
  };

  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '24px 16px' : '48px 32px', direction: 'rtl', position: 'relative', color: '#fff' },
    title: { fontSize: isMobile ? '28px' : '36px', fontWeight: '900', color: '#fff', marginBottom: isMobile ? '24px' : '40px', borderRight: '4px solid #3b82f6', paddingRight: '16px' },
    grid: { display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '32px', alignItems: 'start', position: 'relative', zIndex: 2 },
    cartList: { display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, width: '100%' },
    cartItem: { background: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '16px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyNavigation: 'space-between', gap: '16px', width: '100%', boxSizing: 'border-box' },
    itemImage: { width: isMobile ? '64px' : '80px', height: isMobile ? '64px' : '80px', objectFit: 'cover', borderRadius: '16px', background: '#0f172a' },
    qtyContainer: { display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(15, 23, 42, 0.6)', padding: '6px 14px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.05)' },
    qtyBtn: { background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' },
    summaryCard: { background: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: isMobile ? '24px' : '32px', borderRadius: '28px', width: '100%', maxWidth: isMobile ? '100%' : '380px', boxSizing: 'border-box' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', color: '#cbd5e1' },
    totalRow: { display: 'flex', justifyContent: 'space-between', padding: '20px 0', fontSize: '20px', fontWeight: '900', color: '#fff' },
    checkoutBtn: { width: '100%', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', marginTop: '16px', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' },
    deleteBtn: { color: '#f43f5e', background: 'transparent', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'center', alignItems: isMobile ? 'flex-end' : 'center', zIndex: 1000 },
    modalContent: { background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '32px', borderRadius: isMobile ? '24px 24px 0 0' : '28px', width: '100%', maxWidth: '450px', position: 'relative', boxSizing: 'border-box', maxHeight: isMobile ? '90vh' : 'auto', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' },
    input: { width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#fff', marginTop: '8px', marginBottom: '16px', outline: 'none', boxSizing: 'border-box' }
  };

   if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: isMobile ? '80px 0' : '120px 0', direction: 'rtl', position: 'relative' }}>
        {/* هالة إضاءة خلفية ناعمة */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* 🌟 الدائرة الزجاجية المحدثة: الأيقونة في النص الهندسي المطلق والقاتل بالملّي */}
          <div style={{ 
            background: 'rgba(59, 130, 246, 0.08)', 
            border: '1px solid rgba(59, 130, 246, 0.25)', 
            width: '96px', 
            height: '96px', 
            borderRadius: '50%', 
            margin: '0 auto 24px auto', 
            color: '#60a5fa', 
            boxShadow: '0 0 25px rgba(59, 130, 246, 0.12)',
            position: 'relative', // تمكين التموضع المطلق للأيقونة بالداخل
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)', // سنترة مطلقة تخترق أي ترحيل افتراضي
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              padding: 0,
              margin: 0,
              lineHeight: 0
            }}>
              <ShoppingBag size={42} style={{ display: 'block', margin: 0, padding: 0 }} />
            </div>
          </div>

          <h2 style={{ fontSize: isMobile ? '26px' : '32px', fontWeight: '900', color: '#fff', letterSpacing: '-0.5px' }}>سلة المشتريات فارغة</h2>
          <p style={{ color: '#94a3b8', marginTop: '12px', marginBottom: '36px', fontSize: isMobile ? '16px' : '18px', maxWidth: '400px', marginInline: 'auto', lineHeight: 1.6 }}>يبدو أنك لم تقم بإضافة أي منتجات إلى سلتك بعد. دعنا نساعدك في العثور على ما تحتاجه!</p>
          <Link to="/shop" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: '#fff', padding: '16px 36px', borderRadius: '16px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)', transition: 'all 0.3s ease' }}>تصفح المنتجات الآن</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* هالات الإضاءة الخلفية الناعمة */}
      <div style={{ position: 'absolute', top: '50px', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <h1 style={styles.title}>سلة المشتريات</h1>
      <div style={styles.grid}>
        {/* قائمة المنتجات المضافة */}
        <div style={styles.cartList}>
          {cart.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontWeight: 'bold', color: '#fff', fontSize: isMobile ? '16px' : '18px' }}>{item.name}</h3>
                  <p style={{ color: '#60a5fa', fontWeight: '800', marginTop: '4px' }}>
                    {item.price} جنيه
                  </p>
                </div>

                {/* أزرار زيادة ونقصان الكمية الذكية */}
                <div style={styles.qtyContainer}>
                  <button onClick={() => updateQuantityMinus(item.id)} style={styles.qtyBtn}>
                    <Minus size={16} />
                  </button>
                  <span style={{ fontWeight: 'bold', color: '#fff', minWidth: '20px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  <button onClick={() => updateQuantityPlus(item.id)} style={styles.qtyBtn}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button onClick={() => removeFromCart(item.id)} style={styles.deleteBtn}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button onClick={clearCart} style={{ color: '#f43f5e', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'right', fontWeight: '600', marginTop: '12px' }}>إفراغ السلة بالكامل</button>
        </div>

        {/* بطاقة ملخص الطلب الزجاجية */}
        <div style={styles.summaryCard}>
          <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>ملخص الطلب</h3>
          
          <div style={styles.summaryRow}>
            <span>المجموع الفرعي</span>
            <span style={{ fontWeight: 'bold', color: '#fff' }}>{subTotal} جنيه</span>
          </div>
          
          <div style={styles.summaryRow}>
            <span>الشحن</span>
            <span style={{ color: shippingCost === 0 ? '#34d399' : '#ff9f43', fontWeight: 'bold' }}>
              {shippingCost === 0 ? 'مجاني' : `${shippingCost} جنيه`}
            </span>
          </div>

          {/* سطر إجمالي الخصم والتوفير يظهر باللون الأحمر تحت الشحن مباشرة */}
          {totalDiscount > 0 && (
            <div style={{ ...styles.summaryRow, borderBottom: '1px solid rgba(244, 63, 94, 0.2)' }}>
              <span style={{ color: '#f43f5e', fontWeight: '600' }}>إجمالي الخصم (توفير)</span>
              <span style={{ color: '#ff4d6d', fontWeight: '900' }}>-{totalDiscount} جنيه</span>
            </div>
          )}
          
          <div style={styles.totalRow}>
            <span>الإجمالي الكلي</span>
            <span style={{ color: '#60a5fa' }}>{totalPrice} جنيه</span>
          </div>
          
          <button onClick={() => setIsCheckoutOpen(true)} style={styles.checkoutBtn}>إتمام الشراء</button>
        </div>
      </div>

      {/* مودال الدفع الزجاجي المنبثق */}
      {isCheckoutOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button onClick={() => setIsCheckoutOpen(false)} style={{ position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <CheckCircle size={64} color="#34d399" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>تمت العملية بنجاح!</h3>
                <p style={{ color: '#94a3b8', marginTop: '8px' }}>شكراً لك، تم تسجيل طلبك بنجاح في لوحة التحكم.</p>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit}>
                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold', marginBottom: '24px' }}>بيانات الشحن والدفع</h3>
                
                <label style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: '600' }}>الاسم بالكامل</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} style={styles.input} placeholder="محمد أحمد" />
                
                <label style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: '600' }}>العنوان بالتفصيل</label>
                <input type="text" name="address" required value={formData.address} onChange={handleInputChange} style={styles.input} placeholder="القاهرة، مدينة نصر" />
                
                <label style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: '600' }}>رقم الهاتف</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  style={styles.input} 
                  placeholder="01xxxxxxxxx" 
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                />
                
                <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <p style={{ color: '#94a3b8', fontSize: '14px' }}>طريقة الدفع المتاحة حالياً:</p>
                  <p style={{ color: '#fff', fontWeight: 'bold', marginTop: '4px' }}>الدفع عند الاستلام</p>
                </div>
                <button type="submit" style={styles.checkoutBtn}>تأكيد الطلب بمبلغ {totalPrice} جنيه</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
