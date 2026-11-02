import React from 'react';
import { Store, Award, Users, Smile } from 'lucide-react';

export default function About() {
  const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '64px 32px', direction: 'rtl', color: '#fff' },
    title: { fontSize: '40px', fontWeight: '900', marginBottom: '24px', textAlign: 'center' },
    desc: { color: '#94a3b8', fontSize: '18px', lineHeight: 1.8, textAlign: 'center', marginBottom: '48px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' },
    card: { background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '32px', borderRadius: '24px', textAlign: 'center' }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>من نحن في NexStore</h1>
      <p style={styles.desc}>
        نحن منصة تسوق إلكترونية رائدة تهدف إلى توفير تجربة تسوق استثنائية تجمع بين الجودة العالية، التصميم العصري، الأسعار التنافسية، وخدمة العملاء الممتازة.
      </p>
      <div style={styles.grid}>
        <div style={styles.card}>
          <Store size={40} color="#60a5fa" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>+20 منتج</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>تشكيلة واسعة تلبي كافة احتياجاتك</p>
        </div>
        <div style={styles.card}>
          <Award size={40} color="#34d399" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>جودة عالية</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>منتجات أصلية ومضمونة 100%</p>
        </div>
        <div style={styles.card}>
          <Users size={40} color="#818cf8" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>عملاء سعداء</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>نخدم آلاف العملاء بكل شغف</p>
        </div>
      </div>
    </div>
  );
}