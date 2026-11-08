import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, ShieldCheck, Truck, Headphones, ArrowUpRight } from 'lucide-react';
import { DashboardContext } from '../context/DashboardContext'; // 🌟 ربط الصفحة بلوحة التحكم الحية
import ProductCard from '../Components/ProductCard';

export default function Home() {
  // جلب المنتجات المحدثة ديناميكياً من الداش بورد
  const { products } = useContext(DashboardContext);
  
  // حالات تفاعلية لحركات الماوس على كروت الميزات
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px', direction: 'rtl', color: '#fff', position: 'relative' },
    
    // 🌟 واجهة هيرو ترحيبية بتصميم مستقبلي مضيء
    hero: { padding: '120px 0 60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' },
    tag: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(129, 140, 248, 0.15) 100%)', border: '1px solid rgba(96, 165, 250, 0.3)', color: '#60a5fa', padding: '10px 24px', borderRadius: '50px', fontSize: '14px', fontWeight: '700', marginBottom: '32px', boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)', backdropFilter: 'blur(4px)' },
    title: { fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '950', color: '#fff', lineHeight: 1.15, maxWidth: '950px', letterSpacing: '-1px' },
    gradientText: { background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '950' },
    description: { color: '#94a3b8', fontSize: '19px', marginTop: '24px', maxWidth: '700px', lineHeight: 1.7 },
    btn: { marginTop: '40px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: '#fff', padding: '18px 44px', borderRadius: '20px', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', boxShadow: '0 12px 35px rgba(59, 130, 246, 0.4)', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
    
    // 🌟 شبكة ميزات بتأثير الزجاج الشفاف الفاخر (Glassmorphism)
    featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', margin: '60px 0 80px 0' },
    featureCard: (isHovered) => ({
      background: isHovered ? 'rgba(30, 41, 59, 0.8)' : 'rgba(30, 41, 59, 0.3)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: isHovered ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
      padding: '28px',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
      boxShadow: isHovered ? '0 20px 40px -15px rgba(59, 130, 246, 0.2)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }),
    iconWrapper: (color) => ({ padding: '14px', borderRadius: '18px', background: `rgba(${color}, 0.1)`, color: `rgb(${color})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }),

    // 🌟 بنر الفلسفة بتصميم زجاجي مشع وخلاب جداً
    banner: {
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.7) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '40px',
      padding: '90px 40px',
      textAlign: 'center',
      margin: '80px 0',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
    },
    bannerGlow: { position: 'absolute', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', top: '-100px', left: '-100px', pointerEvents: 'none' },
    bannerSubtitle: { fontSize: '14px', letterSpacing: '2px', color: '#60a5fa', marginBottom: '20px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
    bannerTitle: { fontSize: 'clamp(28px, 4.5vw, 46px)', fontWeight: '950', color: '#fff', lineHeight: '1.3', marginBottom: '24px', maxWidth: '850px', marginInline: 'auto' },
    bannerDesc: { color: '#94a3b8', fontSize: '17px', maxWidth: '650px', margin: '0 auto 40px auto', lineHeight: '1.7' },
    bannerBtn: { background: 'rgba(255, 255, 255, 0.03)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(8px)', padding: '16px 40px', borderRadius: '16px', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },

    // شبكة المخرجات المميزة
    sectionHeader: { marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' },
    sectionTitle: { fontSize: '32px', fontWeight: '950', color: '#fff', position: 'relative' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px', marginBottom: '100px' }
  };
  return (
    <div style={styles.container}>
      {/* الدوائر الخلفية المضيئة للتصميم الزجاجي (Ambient Glow) */}
      <div style={{ position: 'absolute', top: '100px', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '400px', right: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* 1. الواجهة الترحيبية المستقبلية */}
      <div style={styles.hero}>
        <div style={styles.tag}>
          <Sparkles size={16} /> أحدث صيحات التجارة الإلكترونية المستقبلية
        </div>
        <h1 style={styles.title}>
          اكتشف منتجاتك المفضلة بتصميم <br />
          <span style={styles.gradientText}>عصري وخرافي فريد</span>
        </h1>
        <p style={styles.description}>
          متجرك الأول للتسوق السريع والآمن. تجربة مستخدم سلسة، مؤثرات بصرية مذهلة نابعة من دقة التصميم، وكل ما تحتاجه في مكان واحد.
        </p>
        <Link 
          to="/shop" 
          style={styles.btn}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4)';
          }}
        >
          تسوق الآن <ArrowLeft size={20} />
        </Link>
      </div>

      {/* 2. شبكة الميزات الزجاجية الفاخرة */}
      <div style={styles.featuresGrid}>
        <div 
          style={styles.featureCard(hoveredFeature === 1)}
          onMouseEnter={() => setHoveredFeature(1)}
          onMouseLeave={() => setHoveredFeature(null)}
        >
          <div style={styles.iconWrapper('59, 130, 246')}>
            <Truck size={28} />
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: '800', fontSize: '18px' }}>شحن سريع ومجاني</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>توصيل فوري مجاني للطلبات فوق 3000 جنيه</p>
          </div>
        </div>

        <div 
          style={styles.featureCard(hoveredFeature === 2)}
          onMouseEnter={() => setHoveredFeature(2)}
          onMouseLeave={() => setHoveredFeature(null)}
        >
          <div style={styles.iconWrapper('52, 211, 153')}>
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: '800', fontSize: '18px' }}>دفع آمن 100%</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>تشفير وحماية كاملة لمعلوماتك وبياناتك</p>
          </div>
        </div>

        <div 
          style={styles.featureCard(hoveredFeature === 3)}
          onMouseEnter={() => setHoveredFeature(3)}
          onMouseLeave={() => setHoveredFeature(null)}
        >
          <div style={styles.iconWrapper('129, 140, 248')}>
            <Headphones size={28} />
          </div>
          <div>
            <h4 style={{ color: '#fff', fontWeight: '800', fontSize: '18px' }}>دعم فني متواصل</h4>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>مساعدون لك ومهتمون بطلباتك على مدار الساعة</p>
          </div>
        </div>
      </div>

      {/* 3. قسم الفلسفة المشع بتصميم زجاجي فاخر */}
      <div style={styles.banner}>
        <div style={styles.bannerGlow} />
        <div style={styles.bannerSubtitle}>
          <Sparkles size={16} /> فلسفة NexStore
        </div>
        <h2 style={styles.bannerTitle}>
          أقل، ولكن أفضل. قطع تدوم معك، تعبر عن أسلوبك وشغفك الاستثنائي.
        </h2>
        <p style={styles.bannerDesc}>
          نقدم لك نهجاً مدروساً للتسوق اليومي، حيث يلتقي التصميم الراقي بالبساطة والتميز الفردي ليعطيك طابعاً فريداً.
        </p>
        <Link 
          to="/shop" 
          style={styles.bannerBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.2)';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          اكتشف المتجر بالكامل <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* 4. قسم أبرز المنتجات المميزة المربوط ديناميكياً بالداش بورد */}
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>أبرز المنتجات المميزة</h2>
        <Link to="/shop" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          عرض الكل <ArrowLeft size={16} />
        </Link>
      </div>

      <div style={styles.grid}>
        {products && products.length > 0 ? (
          products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p style={{ color: '#94a3b8', gridColumn: '1 / -1', textAlign: 'center', fontSize: '18px' }}>لا توجد منتجات متاحة حالياً.</p>
        )}
      </div>
    </div>
  );
}
