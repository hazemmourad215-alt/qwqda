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
    // تفعيل رسالة "تمت الإضافة" لمدة ثانية ونصف ثم العودة للشكل الطبيعي
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const styles = {
    card: { 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      position: 'relative', 
      background: 'rgba(30, 41, 59, 0.6)', 
      backdropFilter: 'blur(8px)',
      border: isHovered ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)', 
      paddingBottom: '16px', 
      borderRadius: '20px', 
      overflow: 'hidden',
      transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 12px 30px -10px rgba(59, 130, 246, 0.3)' : 'none',
      transition: 'all 0.3s ease'
    },
    imageBox: { height: '240px', background: '#1e293b', overflow: 'hidden', position: 'relative' },
    image: { 
      width: '100%', 
      height: '100%', 
      objectFit: 'cover',
      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
      transition: 'transform 0.5s ease'
    },
    badge: { position: 'absolute', top: '12px', right: '12px', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)', color: '#60a5fa', padding: '4px 10px', fontSize: '11px', fontWeight: '700', borderRadius: '50px' },
    wishlist: { position: 'absolute', top: '12px', left: '12px', background: 'rgba(15, 23, 42, 0.6)', color: '#fff', padding: '8px', borderRadius: '50%', cursor: 'pointer', border: 'none', transition: '0.2s' },
    info: { padding: '16px 16px 0 16px', direction: 'rtl' },
    title: { fontSize: '18px', fontWeight: 'bold', color: '#fff', textDecoration: 'none', transition: '0.2s' },
    category: { fontSize: '12px', color: '#60a5fa', fontWeight: '600', marginBottom: '6px' },
    price: { fontSize: '18px', fontWeight: '900', color: '#60a5fa' },
    
    // زر الإضافة بيتغير لونه وشكله وقت الضغط
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
      borderRadius: '12px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '8px', 
      boxShadow: isAdded ? '0 4px 15px rgba(16, 185, 129, 0.4)' : '0 4px 15px rgba(59, 130, 246, 0.4)',
      transition: 'all 0.3s ease',
      transform: isAdded ? 'scale(0.98)' : 'scale(1)'
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
            <span style={styles.price}>{product.price * 50} ج.م</span>
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