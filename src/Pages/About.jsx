import React, { useState } from 'react';
import { Store, Award, Users, Smile, Sparkles } from 'lucide-react';

export default function About() {
  // حالة تتبع الكارت النشط عند تمرير الماوس فوقه لإحداث التأثير المضيء
  const [hoveredCard, setHoveredFeature] = useState(null);

  const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '80px 24px', direction: 'rtl', color: '#fff', position: 'relative' },
    
    // ستايل العنوان الرئيسي مع توهج نصي خفيف واحترافي
    title: { fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '950', marginBottom: '20px', textAlign: 'center', letterSpacing: '-1px' },
    gradientText: { background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '950' },
    desc: { color: '#94a3b8', fontSize: '19px', lineHeight: 1.8, textAlign: 'center', maxWidth: '750px', margin: '0 auto 64px auto' },
    
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px', position: 'relative', zIndex: 2 },
    
    // 🌟 كود الكارت الزجاجي الشفاف المتفاعل بالكامل مع الماوس
    card: (isHovered) => ({
      background: isHovered ? 'rgba(30, 41, 59, 0.8)' : 'rgba(30, 41, 59, 0.3)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: isHovered ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
      padding: '40px 24px',
      borderRadius: '28px',
      textAlign: 'center',
      transform: isHovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
      boxShadow: isHovered ? '0 25px 50px -15px rgba(59, 130, 246, 0.25)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxSizing: 'border-box'
    }),
    
    iconWrapper: (color) => ({
      width: '72px',
      height: '72px',
      borderRadius: '22px',
      background: `rgba(${color}, 0.1)`,
      color: `rgb(${color})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px auto',
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
    })
  };
  return (
    <div style={styles.container}>
      {/* الدوائر الخلفية المضيئة للتصميم الزجاجي (Ambient Glow) */}
      <div style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* 1. رأس الصفحة */}
      <h1 style={styles.title}>
        من نحن في <span style={styles.gradientText}>NexStore</span>
      </h1>
      <p style={styles.desc}>
        نحن منصة تسوق إلكترونية رائدة تهدف إلى توفير تجربة تسوق استثنائية تجمع بين الجودة العالية، التصميم العصري، الأسعار التنافسية، وخدمة العملاء الممتازة.
      </p>

      {/* 2. شبكة الكروت الزجاجية */}
      <div style={styles.grid}>
        
        {/* الكارت الأول: عدد المنتجات */}
        <div 
          style={styles.card(hoveredCard === 1)}
          onMouseEnter={() => setHoveredFeature(1)}
          onMouseLeave={() => setHoveredFeature(null)}
        >
          <div style={styles.iconWrapper('59, 130, 246')}>
            <Store size={32} />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '8px', color: '#fff' }}>+20 منتج</h3>
          <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.5' }}>تشكيلة واسعة من أحدث الأجهزة والإكسسوارات العصرية التي تلبي كافة احتياجاتك اليومية.</p>
        </div>

        {/* الكارت الثاني: الجودة */}
        <div 
          style={styles.card(hoveredCard === 2)}
          onMouseEnter={() => setHoveredFeature(2)}
          onMouseLeave={() => setHoveredFeature(null)}
        >
          <div style={styles.iconWrapper('52, 211, 153')}>
            <Award size={32} />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '8px', color: '#fff' }}>جودة عالية</h3>
          <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.5' }}>نهتم بأدق التفاصيل ونضمن لك منتجات أصلية ومفحوصة 100% لتدوم معك طويلاً.</p>
        </div>

        {/* الكارت الثالث: العملاء */}
        <div 
          style={styles.card(hoveredCard === 3)}
          onMouseEnter={() => setHoveredFeature(3)}
          onMouseLeave={() => setHoveredFeature(null)}
        >
          <div style={styles.iconWrapper('129, 140, 248')}>
            <Users size={32} />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '8px', color: '#fff' }}>عملاء سعداء</h3>
          <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: '1.5' }}>نخدم آلاف المتسوقين بكل شغف، وراحتكم وثقتكم هي دافعنا الدائم للتطوير والتميز.</p>
        </div>

      </div>
    </div>
  );
}
