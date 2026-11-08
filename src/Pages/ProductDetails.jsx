import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext'; // 🌟 ربط الصفحة ببيانات لوحة التحكم الحية
import { CartContext } from '../context/CartContext';
import { ShoppingBag, ArrowRight, Sparkles, Check } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  
  // 🌟 جلب المنتجات الحية لكي تعمل الصفحة مع أي منتج جديد تضيفه من اللوحة
  const { products } = useContext(DashboardContext);
  const { addToCart } = useContext(CartContext);
  
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // البحث عن المنتج مع مراعاة أنواع المعرفات (Strings أو Numbers) القادمة من الـ Router والـ Context
  const product = products ? products.find((p) => String(p.id) === String(id)) : null;

  const handleAdd = () => {
    if (product) {
      addToCart(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const styles = {
    container: { maxWidth: '1100px', margin: '0 auto', padding: '64px 24px', direction: 'rtl', position: 'relative', color: '#fff' },
    
    backLink: { display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'none', marginBottom: '32px', fontWeight: '700', fontSize: '15px', transition: 'color 0.2s ease' },
    
    // 🌟 بطاقة تفاصيل زجاجية شفافة جبارة وعميقة جداً (Glassmorphism)
    card: {
      background: 'rgba(30, 41, 59, 0.3)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      borderRadius: '40px',
      padding: '48px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '48px',
      alignItems: 'center',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      position: 'relative',
      zIndex: 2,
      boxSizing: 'border-box'
    },
    
    imageContainer: { borderRadius: '28px', overflow: 'hidden', background: '#0f172a', height: '420px', border: '1px solid rgba(255, 255, 255, 0.04)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative' },
    image: { width: '100%', height: '100%', objectFit: 'cover', transform: isHovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s ease' },
    
    category: { fontSize: '13px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '8px 18px', borderRadius: '50px', fontWeight: '700', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'inline-block', boxShadow: '0 0 15px rgba(59, 130, 246, 0.1)' },
    title: { fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: '950', color: '#fff', marginTop: '20px', lineHeight: 1.2, letterSpacing: '-1px' },
    
    // 🌟 السعر المحدث بالعملة المحلية ومطابق لستايل الكروت والداش بورد
    price: { fontSize: '32px', fontWeight: '900', color: '#60a5fa', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' },
    description: { color: '#cbd5e1', marginTop: '24px', lineHeight: 1.8, fontSize: '17px', fontWeight: '500' },
    
    btn: {
      marginTop: '40px',
      background: isAdded ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: '#fff',
      border: 'none',
      padding: '16px 40px',
      borderRadius: '16px',
      fontWeight: 'bold',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      cursor: 'pointer',
      width: '100%',
      boxShadow: isAdded ? '0 10px 25px rgba(16, 185, 129, 0.3)' : '0 10px 25px rgba(59, 130, 246, 0.3)',
      transition: 'all 0.3s ease',
      transform: isAdded ? 'scale(0.98)' : 'scale(1)'
    }
  };
  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px', direction: 'rtl', color: '#fff' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '16px' }}>المنتج غير موجود 🔍</h2>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>يبدو أن هذا المنتج تم حذفه من قِبل الإدارة أو الرابط غير صحيح.</p>
        <Link to="/shop" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: '#fff', padding: '12px 28px', borderRadius: '14px', textDecoration: 'none', fontWeight: 'bold' }}>العودة للمتجر</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* هالات الإضاءة الخلفية المشعة (Ambient Glow) */}
      <div style={{ position: 'absolute', top: '100px', right: '5%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '50px', left: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* زر العودة للمتجر */}
      <Link 
        to="/shop" 
        style={styles.backLink}
        onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
      >
        <ArrowRight size={18} /> العودة للمتجر
      </Link>
      
      {/* كارت التفاصيل الزجاجي الفاخر */}
      <div style={styles.card}>
        {/* قسم الصورة مع تأثير تفاعلي عند تحريك الماوس */}
        <div 
          style={styles.imageContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={product.image} alt={product.name} style={styles.image} />
        </div>

        {/* قسم البيانات والنصوص */}
        <div>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.title}>{product.name}</h1>
          
          <div style={styles.price}>
            <span>{product.price} جنيه</span>
          </div>
          
          <p style={styles.description}>{product.description || "استمتع بتجربة فريدة وأداء استثنائي مع هذا المنتج العصري والمصمم بأعلى جودة ليلبي كافة تطلعاتك اليومية."}</p>
          
          {/* زر إضافة للسلة التفاعلي */}
          <button onClick={handleAdd} style={styles.btn}>
            {isAdded ? (
              <>
                <Check size={20} /> تمت الإضافة بنجاح!
              </>
            ) : (
              <>
                <ShoppingBag size={20} /> إضافة إلى سلة المشتريات
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
