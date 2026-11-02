import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Heart, Mail, Phone, MapPin, ShieldCheck, Truck, Clock } from 'lucide-react';

export default function Footer() {
  const styles = {
    footer: {
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      marginTop: '100px',
      padding: '64px 32px 32px 32px',
      direction: 'rtl',
      color: '#94a3b8'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '40px',
      marginBottom: '48px'
    },
    colTitle: {
      color: '#fff',
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '20px',
      position: 'relative',
      paddingBottom: '8px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '24px',
      fontWeight: '900',
      color: '#fff',
      textDecoration: 'none',
      marginBottom: '16px'
    },
    logoIcon: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      padding: '6px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    desc: {
      fontSize: '14px',
      lineHeight: '1.7',
      marginBottom: '20px'
    },
    linkList: {
      listStyle: 'none',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    link: {
      color: '#94a3b8',
      textDecoration: 'none',
      fontSize: '14px',
      transition: '0.3s',
      display: 'inline-block'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '14px',
      marginBottom: '14px'
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
      fontSize: '14px'
    },
    socials: {
      display: 'flex',
      gap: '16px'
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* العمود الأول: نبذة عن المتجر */}
        <div>
          <Link to="/" style={styles.logo}>
            <div style={styles.logoIcon}>
              <Store size={20} color="#fff" />
            </div>
            Nex<span style={{ color: '#60a5fa' }}>Store</span>
          </Link>
          <p style={styles.desc}>
            وجهتك الأولى للتسوق الإلكتروني الراقي. نقدم لك أحدث المنتجات بتصميم عصري، جودة عالية، وتجربة مستخدم لا تُنسى.
          </p>
        </div>

        {/* العمود الثاني: روابط سريعة */}
        <div>
          <h3 style={styles.colTitle}>روابط سريعة</h3>
          <ul style={styles.linkList}>
            <li><Link to="/" style={styles.link}>الرئيسية</Link></li>
            <li><Link to="/shop" style={styles.link}>تصفح المنتجات</Link></li>
            <li><Link to="/about" style={styles.link}>من نحن</Link></li>
            <li><Link to="/contact" style={styles.link}>اتصل بنا</Link></li>
            <li><Link to="/cart" style={styles.link}>سلة المشتريات</Link></li>
          </ul>
        </div>

        {/* العمود الثالث: خدمة العملاء والمميزات */}
        <div>
          <h3 style={styles.colTitle}>لماذا نحن؟</h3>
          <ul style={styles.linkList}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}><Truck size={16} color="#60a5fa" /> شحن سريع لجميع المحافظات</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}><ShieldCheck size={16} color="#34d399" /> ضمان الجودة والأمان</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}><Clock size={16} color="#818cf8" /> دعم فني على مدار الساعة</li>
          </ul>
        </div>

        {/* العمود الرابع: معلومات التواصل */}
        <div>
          <h3 style={styles.colTitle}>تواصل معنا</h3>
          <div style={styles.contactItem}>
            <MapPin size={18} color="#60a5fa" />
            <span>القاهرة، مصر - شارع التسوق الرئيسي</span>
          </div>
          <div style={styles.contactItem}>
            <Phone size={18} color="#34d399" />
            <span>+20 123 456 7890</span>
          </div>
          <div style={styles.contactItem}>
            <Mail size={18} color="#818cf8" />
            <span>support@nexstore.com</span>
          </div>
        </div>
      </div>

      {/* الشريط السفلي للحقوق */}
      <div style={styles.bottomBar}>
        <p>جميع الحقوق محفوظة © 2026 NexStore - تم تصميمه بكل إبداع 🤍</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" style={styles.link}>سياسة الخصوصية</a>
          <a href="#" style={styles.link}>الشروط والأحكام</a>
        </div>
      </div>
    </footer>
  );
}