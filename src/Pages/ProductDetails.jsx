import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../Data/products';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  
  const product = products.find((p) => p.id === parseInt(id));

  const styles = {
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '48px 32px'
    },
    backLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: '#94a3b8',
      textDecoration: 'none',
      marginBottom: '32px',
      fontWeight: '600'
    },
    card: {
      background: 'rgba(30, 41, 59, 0.6)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '32px',
      padding: '40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '48px',
      alignItems: 'center'
    },
    imageContainer: {
      borderRadius: '24px',
      overflow: 'hidden',
      background: '#1e293b',
      height: '400px'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    category: {
      fontSize: '14px',
      background: 'rgba(59, 130, 246, 0.2)',
      color: '#60a5fa',
      padding: '6px 16px',
      borderRadius: '50px',
      fontWeight: '600',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      display: 'inline-block'
    },
    title: {
      fontSize: '36px',
      fontWeight: '900',
      color: '#fff',
      marginTop: '16px'
    },
    price: {
      fontSize: '28px',
      fontWeight: 'extrabold',
      color: '#60a5fa',
      marginTop: '16px'
    },
    description: {
      color: '#cbd5e1',
      marginTop: '24px',
      lineHeight: 1.8,
      fontSize: '18px'
    },
    btn: {
      marginTop: '36px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: '#fff',
      border: 'none',
      padding: '16px 32px',
      borderRadius: '16px',
      fontWeight: 'bold',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
    }
  };

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '96px' }}>
        <h2 style={{ color: '#fff', fontSize: '24px' }}>المنتج غير موجود</h2>
        <Link to="/shop" style={{ color: '#60a5fa', textDecoration: 'underline', display: 'inline-block', marginTop: '16px' }}>العودة للمتجر</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/shop" style={styles.backLink}>
        <ArrowRight size={18} /> العودة للمتجر
      </Link>
      
      <div style={styles.card}>
        <div style={styles.imageContainer}>
          <img src={product.image} alt={product.name} style={styles.image} />
        </div>
        <div>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.price}>${product.price}</p>
          <p style={styles.description}>{product.description}</p>
          <button onClick={() => addToCart(product)} style={styles.btn}>
            <ShoppingBag size={20} /> إضافة إلى سلة المشتريات
          </button>
        </div>
      </div>
    </div>
  );
}