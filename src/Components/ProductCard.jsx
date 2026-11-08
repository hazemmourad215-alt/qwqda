import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const styles = {
    // 🌟 تحويل الكارت بالكامل لستايل الزجاج الشفاف الفاخر المتفاعل مع الماوس
    card: { 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      position: 'relative', 
      background: 'rgba(30, 41, 59, 0.3)', // خلفية زجاجية شفافة ومخففة
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: isHovered ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)', 
      paddingBottom: '16px', 
      borderRadius: '24px', 
      overflow: 'hidden',
      transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 20px 40px -15px rgba(59, 130, 246, 0.3)' : '0 10px 30px rgba(0,0,0,0.2)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    imageBox: { height: '240px', background: 'rgba(15, 23, 42, 0.4)', overflow: 'hidden', position: 'relative' },
    image: { 
      width: '100%', 
      height: '100%', 
      objectFit: 'cover',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      transition: 'transform 0.5s ease'
    },
    // شارة تميز زجاجية ناعمة
    badge: { position: 'absolute', top: '12px', right: '12px', background: 'rgba(59, 130, 246, 0.15)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '6px 12px', fontSize: '11px', fontWeight: '700', borderRadius: '50px' },
    wishlist: { position: 'absolute', top: '12px', left: '12px', background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(4px)', color: '#fff', padding: '8px', borderRadius: '50%', cursor: 'pointer', border: 'none', transition: '0.2s' },
    info: { padding: '16px 16px 0 16px', direction: 'rtl' },
    title: { fontSize: '18px', fontWeight: 'bold', color: '#fff', textDecoration: 'none', transition: '0.2s' },
    category: { fontSize: '12px', color: '#60a5fa', fontWeight: '700', marginBottom: '6px' },
    price: { fontSize: '18px', fontWeight: '900', color: '#60a5fa' },
    
    // زر الإضافة التفاعلي بتأثير مشع
    addBtn: { 
      width: 'calc(100% - 32px)', 
      margin: '16px 16px 0 16px', 
      background: isAdded ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
      color: '#fff', 
      border: 'none', 
      padding: '12px', 
      fontSize: '14px', 
      fontWeight: 'bold', 
      cursor: 'pointer', 
      borderRadius: '14px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '8px', 
      boxShadow: isAdded ? '0 8px 20px rgba(16, 185, 129, 0.3)' : '0 8px 20px rgba(59, 130, 246, 0.3)',
      transition: 'all 0.3s ease',
      transform: isAdded ? 'scale(0.97)' : 'scale(1)'
    }
  };

  return (
    <div 
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div style={styles.imageBox}>
          <span style={styles.badge}>جديد</span>
          <button style={styles.wishlist}><Heart size={16} /></button>
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} style={styles.image} />
          </Link>
        </div>
        <div style={styles.info}>
          <div style={styles.category}>{product.category}</div>
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <h3 style={styles.title}>{product.name}</h3>
          </Link>
          <div style={{ marginTop: '12px' }}>
            <span style={styles.price}>{product.price} ج.م</span>
          </div>
        </div>
      </div>

      <button onClick={handleAdd} style={styles.addBtn}>
        {isAdded ? (
          <>
            <Check size={18} /> تمت الإضافة بنجاح!
          </>
        ) : (
          <>
            <ShoppingBag size={16} /> إضافة للسلة
          </>
        )}
      </button>
    </div>
  );
}
