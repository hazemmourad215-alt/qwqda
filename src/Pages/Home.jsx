import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { products } from '../Data/products';
import ProductCard from '../Components/ProductCard';

export default function Home() {
  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '0 32px', direction: 'rtl' },
    
    // الواجهة الترحيبية
    hero: { padding: '80px 0 40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
    tag: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '8px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: '600', marginBottom: '24px' },
    title: { fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: '900', color: '#fff', lineHeight: 1.2, maxWidth: '900px' },
    gradientText: { background: 'linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    description: { color: '#94a3b8', fontSize: '18px', marginTop: '20px', maxWidth: '650px', lineHeight: 1.6 },
    btn: { marginTop: '36px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: '#fff', padding: '16px 36px', borderRadius: '16px', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)' },
    
    // مميزات المتجر
    featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', margin: '40px 0 60px 0' },
    featureCard: { background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px' },
    
    // قسم الفلسفة (اللي طلبته بناءً على الصورة)
    banner: {
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '32px',
      padding: '80px 40px',
      textAlign: 'center',
      margin: '60px 0',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },
    bannerSubtitle: {
      fontSize: '13px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      color: '#60a5fa',
      marginBottom: '16px',
      fontWeight: '700',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    bannerTitle: {
      fontSize: 'clamp(26px, 4vw, 42px)',
      fontWeight: '900',
      color: '#fff',
      lineHeight: '1.3',
      marginBottom: '20px',
      maxWidth: '800px',
      marginInline: 'auto'
    },
    bannerDesc: {
      color: '#94a3b8',
      fontSize: '16px',
      maxWidth: '600px',
      margin: '0 auto 36px auto',
      lineHeight: '1.6'
    },
    bannerBtn: {
      background: 'transparent',
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '14px 36px',
      borderRadius: '14px',
      fontSize: '14px',
      fontWeight: 'bold',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease'
    },

    // شبكة المنتجات
    sectionTitle: { fontSize: '32px', fontWeight: '900', color: '#fff', marginBottom: '32px', textAlign: 'center' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px', marginBottom: '80px' }
  };

  return (
    <div style={styles.container}>
      {/* 1. الواجهة الترحيبية */}
      <div style={styles.hero}>
        <div style={styles.tag}>
          <Sparkles size={16} /> أحدث صيحات التجارة الإلكترونية 2026
        </div>
        <h1 style={styles.title}>
          اكتشف منتجاتك المفضلة بتصميم <span style={styles.gradientText}>عصري وخرافي</span>
        </h1>
        <p style={styles.description}>
          متجرك الأول للتسوق السريع والآمن. تجربة مستخدم سلسة، مؤثرات بصرية مذهلة، وكل ما تحتاجه في مكان واحد.
        </p>
        <Link to="/shop" style={styles.btn}>
          تسوق الآن <ArrowLeft size={20} />
        </Link>
      </div>

      {/* 2. مميزات المتجر */}
      <div style={styles.featuresGrid}>
        <div style={styles.featureCard}>
          <Truck size={32} color="#60a5fa" />
          <div>
            <h4 style={{ color: '#fff', fontWeight: 'bold' }}>شحن سريع ومجاني</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>للطلبات فوق 3000 جنيه</p>
          </div>
        </div>
        <div style={styles.featureCard}>
          <ShieldCheck size={32} color="#34d399" />
          <div>
            <h4 style={{ color: '#fff', fontWeight: 'bold' }}>دفع آمن 100%</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>حماية كاملة لمعلوماتك</p>
          </div>
        </div>
        <div style={styles.featureCard}>
          <Headphones size={32} color="#818cf8" />
          <div>
            <h4 style={{ color: '#fff', fontWeight: 'bold' }}>دعم فني متواصل</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>متاحون على مدار الساعة</p>
          </div>
        </div>
      </div>

      {/* 3. قسم الفلسفة الراقي (اللي طلبته من الصورة) */}
      <div style={styles.banner}>
        <div style={styles.bannerSubtitle}>
          <Sparkles size={16} /> فلسفة NexStore
        </div>
        <h2 style={styles.bannerTitle}>
          أقل، ولكن أفضل. قطع تدوم معك، تعبر عن أسلوبك وشغفك.
        </h2>
        <p style={styles.bannerDesc}>
          نقدم لك نهجاً مدروساً للتسوق اليومي، حيث يلتقي التصميم الراقي بالبساطة والتميز الفردي.
        </p>
        <Link 
          to="/shop" 
          style={styles.bannerBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#3b82f6';
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          اكتشف المتجر بالكامل
        </Link>
      </div>

      {/* 4. أبرز المنتجات المميزة */}
      <h2 style={styles.sectionTitle}>أبرز المنتجات المميزة</h2>
      <div style={styles.grid}>
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}