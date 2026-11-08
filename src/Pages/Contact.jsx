import React, { useState, useContext } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle } from 'lucide-react';
import { DashboardContext } from '../context/DashboardContext'; // 🌟 ربط ديناميكي لإرسال الرسائل للآدمن

export default function Contact() {
  const { addMessage } = useContext(DashboardContext); // 🌟 دالة استقبال الرسائل في اللوحة
  const [submitted, setSubmitted] = useState(false);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 🌟 إرسال الرسالة إلى لوحة التحكم
    if (addMessage) {
      addMessage({
        name: formData.name,
        email: formData.email,
        text: formData.message
      });
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '80px 24px', direction: 'rtl', color: '#fff', position: 'relative' },
    title: { fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '950', marginBottom: '16px', textAlign: 'center', letterSpacing: '-1px' },
    gradientText: { background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '950' },
    subtitle: { color: '#94a3b8', textAlign: 'center', fontSize: '19px', maxWidth: '600px', margin: '0 auto 48px auto', lineHeight: 1.6 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', position: 'relative', zIndex: 2 },
    infoBox: { display: 'flex', flexDirection: 'column', gap: '20px' },
    infoItem: (isHovered) => ({
      display: 'flex', alignItems: 'center', gap: '20px',
      background: isHovered ? 'rgba(30, 41, 59, 0.6)' : 'rgba(30, 41, 59, 0.2)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      border: isHovered ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
      padding: '24px', borderRadius: '20px',
      transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 15px 30px -10px rgba(59, 130, 246, 0.2)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }),
    iconWrapper: (color) => ({ padding: '12px', borderRadius: '14px', background: `rgba(${color}, 0.1)`, color: `rgb(${color})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }),
    form: { background: 'rgba(30, 41, 59, 0.3)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '40px 32px', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)' },
    input: { width: '100%', padding: '14px 16px', borderRadius: '14px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#fff', marginTop: '8px', marginBottom: '20px', outline: 'none', fontSize: '15px', boxSizing: 'border-box', transition: 'all 0.3s ease' },
    textarea: { width: '100%', padding: '14px 16px', borderRadius: '14px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#fff', marginTop: '8px', marginBottom: '20px', outline: 'none', height: '130px', resize: 'none', fontSize: '15px', boxSizing: 'border-box', transition: 'all 0.3s ease' },
    btn: { width: '100%', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)', transition: 'all 0.3s ease' }
  };
  return (
    <div style={styles.container}>
      {/* هالة الإضاءة المحيطية الخلفية للتصميم الزجاجي */}
      <div style={{ position: 'absolute', top: '100px', right: '5%', width: '450px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* 1. رأس الصفحة */}
      <h1 style={styles.title}>
        تواصل مع <span style={styles.gradientText}>فريقنا</span>
      </h1>
      <p style={styles.subtitle}>نحن هنا للإجابة على أي استفسار ولتقديم الدعم الفني لك على مدار الساعة.</p>

      {/* 2. شبكة كروت التواصل والاستمارة */}
      <div style={styles.grid}>
        
        {/* صندوق معلومات التواصل الزجاجي */}
        <div style={styles.infoBox}>
          
          {/* كارت العنوان */}
          <div 
            style={styles.infoItem(hoveredInfo === 1)}
            onMouseEnter={() => setHoveredInfo(1)}
            onMouseLeave={() => setHoveredInfo(null)}
          >
            <div style={styles.iconWrapper('59, 130, 246')}>
              <MapPin size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>المقر الرئيسي</h4>
              <p style={{ color: '#cbd5e1', fontSize: '14px', marginTop: '4px' }}>الفيوم، دلة</p>
            </div>
          </div>

          {/* كارت الهاتف */}
          <div 
            style={styles.infoItem(hoveredInfo === 2)}
            onMouseEnter={() => setHoveredInfo(2)}
            onMouseLeave={() => setHoveredInfo(null)}
          >
            <div style={styles.iconWrapper('52, 211, 153')}>
              <Phone size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>رقم الهاتف</h4>
              <p style={{ color: '#cbd5e1', fontSize: '14px', marginTop: '4px' }}>01080091620</p>
            </div>
          </div>

          {/* كارت البريد الإلكتروني */}
          <div 
            style={styles.infoItem(hoveredInfo === 3)}
            onMouseEnter={() => setHoveredInfo(3)}
            onMouseLeave={() => setHoveredInfo(null)}
          >
            <div style={styles.iconWrapper('129, 140, 248')}>
              <Mail size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>البريد الإلكتروني</h4>
              <p style={{ color: '#cbd5e1', fontSize: '14px', marginTop: '4px' }}>hazemmourad215@gmail.com</p>
            </div>
          </div>

        </div>

        {/* استمارة إرسال الرسائل الزجاجية */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#34d399', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <CheckCircle size={48} />
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>تم الإرسال بنجاح!</h3>
                <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>سنتواصل معك عبر البريد الإلكتروني قريباً جداً.</p>
              </div>
            </div>
          ) : (
            <>
              <label style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: '600' }}>الاسم الكامل</label>
              <input 
                type="text" 
                name="name"
                required 
                placeholder="اسمك الكريم" 
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input} 
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
              />

              <label style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: '600' }}>البريد الإلكتروني</label>
              <input 
                type="email" 
                name="email"
                required 
                placeholder="name@example.com" 
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input} 
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
              />

              <label style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: '600' }}>الرسالة</label>
              <textarea 
                name="message"
                required 
                placeholder="كيف يمكننا مساعدتك اليوم؟" 
                value={formData.message}
                onChange={handleInputChange}
                style={styles.textarea}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
              ></textarea>

              <button 
                type="submit" 
                style={styles.btn}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                إرسال الرسالة <Send size={16} />
              </button>
            </>
          )}
        </form>

      </div>
    </div>
  );
}
