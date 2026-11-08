import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    container: { maxWidth: '800px', margin: '0 auto', padding: '120px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', color: '#fff', direction: 'rtl' },
    
    // 🌟 بطاقة عرض خطأ زجاجية شفافة فخمة جداً متفاعلة مع الماوس
    card: {
      background: 'rgba(30, 41, 59, 0.3)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: isHovered ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
      padding: '60px 40px',
      borderRadius: '36px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: isHovered ? '0 30px 60px -15px rgba(244, 63, 94, 0.15)' : '0 20px 40px rgba(0,0,0,0.3)',
      transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      maxWidth: '600px',
      boxSizing: 'border-box',
      zIndex: 2
    },
    
    // أيقونة التحذير المتوهجة بنظام النيون
    iconBox: {
      background: 'rgba(244, 63, 94, 0.15)',
      border: '1px solid rgba(244, 63, 94, 0.4)',
      width: '88px',
      height: '88px',
      borderRadius: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '28px',
      color: '#f43f5e',
      boxShadow: '0 12px 30px rgba(244, 63, 94, 0.25)',
      transform: isHovered ? 'rotate(12px) scale(1.05)' : 'rotate(0) scale(1)',
      transition: 'all 0.3s ease'
    },
    
    title: { fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: '950', color: '#fff', marginBottom: '16px', letterSpacing: '-1px' },
    description: { color: '#94a3b8', fontSize: '17px', maxWidth: '460px', marginBottom: '36px', lineHeight: 1.65 },
    
    btn: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: '#fff',
      padding: '16px 36px',
      borderRadius: '16px',
      fontWeight: 'bold',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.container}>
      {/* هالة نيون حمراء خلفية مشعة ناعمة (Ambient Glow) */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(244,63,94,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div 
        style={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.iconBox}>
          <AlertTriangle size={44} />
        </div>
        <h1 style={styles.title}>404 - الصفحة غير موجودة</h1>
        <p style={styles.description}>
          عذراً، الصفحة التي تحاول الوصول إليها غير موجودة في سجلات المتجر أو تم تعديل مسارها. دعنا نُعيدك إلى المسار الآمن!
        </p>
        <Link 
          to="/" 
          style={styles.btn}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Home size={18} /> العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  );
}
