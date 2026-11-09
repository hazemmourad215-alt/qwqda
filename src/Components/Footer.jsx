import React from 'react';
import { Link } from 'react-router-dom';
import { Store, ShieldCheck, Truck, Clock, MapPin, Phone, Mail, Sparkles } from 'lucide-react';

export default function Footer() {
  const styles = {
    // 🌟 تذييل زجاجي شفاف فاخر ومحدد بالكامل بنعومة
    footer: {
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      marginTop: '120px',
      padding: '64px 24px 32px 24px',
      direction: 'rtl',
      color: '#cbd5e1',
      position: 'relative',
      zIndex: 5
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '40px',
      marginBottom: '48px',
      position: 'relative',
      zIndex: 2
    },
    colTitle: {
      color: '#fff',
      fontSize: '18px',
      fontWeight: '800',
      marginBottom: '20px',
      position: 'relative',
      paddingBottom: '8px',
      letterSpacing: '-0.5px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '24px',
      fontWeight: '950',
      color: '#fff',
      textDecoration: 'none',
      marginBottom: '16px',
      letterSpacing: '-1px'
    },
    logoIcon: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      padding: '8px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
    },
    desc: {
      color: '#94a3b8',
      fontSize: '14px',
      lineHeight: '1.75',
      marginBottom: '20px'
    },
    linkList: {
      listStyle: 'none',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    },
    // 🌟 روابط تنقلية شفافة تتفاعل بسلاسة عند ملامسة الماوس
    link: {
      color: '#94a3b8',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      display: 'inline-block'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '14px',
      color: '#cbd5e1',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.03)',
      padding: '10px 14px',
      borderRadius: '12px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '14px',
      marginBottom: '16px',
      color: '#cbd5e1'
    },
    bottomBar: {
      maxWidth: '1200px',
      margin: '0 auto',
      paddingTop: '24px',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      fontSize: '14px',
      color: '#64748b',
      position: 'relative',
      zIndex: 2
    }
  };

  return (
    <footer style={styles.footer}>
      {/* هالة إضاءة خلفية ناعمة ومنسابة تبرز جمالية التذييل الشفاف */}
      <div style={{ position: 'absolute', bottom: '0', left: '15%', width: '350px', height: '250px', background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={styles.container}>
        {/* العمود الأول: نبذة عن المتجر */}
        <div>
          <Link to="/" style={styles.logo}>
            <div style={styles.logoIcon}>
              <Store size={18} color="#fff" />
            </div>
            Nex<span style={{ color: '#60a5fa' }}>Store</span>
          </Link>
          <p style={styles.desc}>
            وجهتك الأولى للتسوق الإلكتروني المبتكر. نقدم لك أحدث المنتجات الملهمة بتصميم عصري شفاف، جودة فائقة الدقة، وتجربة تسوق آمنة ومريحة.
          </p>
        </div>

        {/* العمود الثاني: روابط سريعة */}
        <div>
          <h3 style={styles.colTitle}>روابط سريعة</h3>
          <ul style={styles.linkList}>
            {['الرئيسية', 'تصفح المنتجات', 'من نحن', 'اتصل بنا', 'سلة المشتريات'].map((text, idx) => {
              const paths = ['/', '/shop', '/about', '/contact', '/cart'];
              return (
                <li key={idx}>
                  <Link 
                    to={paths[idx]} 
                    style={styles.link}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.transform = 'translateX(-4px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
    <div>
          <h3 style={styles.colTitle}>لماذا NexStore؟</h3>
          <ul style={{ ...styles.linkList, gap: '10px' }}>
            <li style={styles.featureItem}><Truck size={16} color="#60a5fa" /> <span>شحن ذكي وسريع للمحافظات</span></li>
            <li style={styles.featureItem}><ShieldCheck size={16} color="#34d399" /> <span>ضمان أصالة الجودة والبيانات</span></li>
            <li style={styles.featureItem}><Clock size={16} color="#818cf8" /> <span>مساعدون فنيون على مدار الساعة</span></li>
          </ul>
        </div>

        <div>
          <h3 style={styles.colTitle}>قنوات التواصل</h3>
          <div style={styles.contactItem}>
            <MapPin size={16} color="#60a5fa" />
            <span>الفيوم، دلة</span>
          </div>
          <div style={styles.contactItem}>
            <Phone size={16} color="#34d399" />
            <span>01080091620</span>
          </div>
          <div style={styles.contactItem}>
            <Mail size={16} color="#818cf8" />
            <span>hazemmourad215@gmail.com</span>
          </div>
        </div>
      </div>

      <div style={styles.bottomBar}>
       <p>جميع الحقوق محفوظة © 2026 NexStore — تم تصميمه بكل إبداع بواسطة **حازم** بواجهات مستقبلية زجاجية فاخرة 🚀🤍</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" style={styles.link} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>سياسة الخصوصية</a>
          <a href="#" style={styles.link} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>الشروط والأحكام</a>
        </div>
      </div>
    </footer>
  );
}
