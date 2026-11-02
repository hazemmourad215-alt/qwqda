import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '64px 32px', direction: 'rtl', color: '#fff' },
    title: { fontSize: '40px', fontWeight: '900', marginBottom: '16px', textAlign: 'center' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginTop: '48px' },
    infoBox: { display: 'flex', flexDirection: 'column', gap: '24px' },
    infoItem: { display: 'flex', alignItems: 'center', gap: '16px', color: '#94a3b8', fontSize: '16px' },
    form: { background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '32px', borderRadius: '24px' },
    input: { width: '100%', padding: '14px 16px', borderRadius: '12px', background: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', marginTop: '8px', marginBottom: '20px', outline: 'none' },
    textarea: { width: '100%', padding: '14px 16px', borderRadius: '12px', background: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', marginTop: '8px', marginBottom: '20px', outline: 'none', height: '120px', resize: 'none' },
    btn: { width: '100%', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)' }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>تواصل معنا</h1>
      <p style={{ color: '#94a3b8', textAlign: 'center', fontSize: '18px' }}>نحن هنا للإجابة على أي استفسار ولتقديم المساعدة دائماً.</p>

      <div style={styles.grid}>
        <div style={styles.infoBox}>
          <div style={styles.infoItem}><MapPin size={24} color="#60a5fa" /> <span>القاهرة، مصر - شارع التسوق الرئيسي</span></div>
          <div style={styles.infoItem}><Phone size={24} color="#34d399" /> <span>+20 123 456 7890</span></div>
          <div style={styles.infoItem}><Mail size={24} color="#818cf8" /> <span>support@nexstore.com</span></div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#34d399', fontWeight: 'bold', fontSize: '20px' }}>
              تم ارسال رسالتك بنجاح! سنتواصل معك قريباً.
            </div>
          ) : (
            <>
              <label style={{ color: '#cbd5e1', fontSize: '14px' }}>الاسم الكامل</label>
              <input type="text" required placeholder="اسمك الكريم" style={styles.input} />

              <label style={{ color: '#cbd5e1', fontSize: '14px' }}>البريد الإلكتروني</label>
              <input type="email" required placeholder="name@example.com" style={styles.input} />

              <label style={{ color: '#cbd5e1', fontSize: '14px' }}>الرسالة</label>
              <textarea required placeholder="كيف يمكننا مساعدتك؟" style={styles.textarea}></textarea>

              <button type="submit" style={styles.btn}>إرسال الرسالة</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}