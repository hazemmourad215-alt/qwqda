import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '96px 32px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    iconBox: {
      background: 'rgba(244, 63, 94, 0.1)',
      border: '1px solid rgba(244, 63, 94, 0.3)',
      width: '96px',
      height: '96px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      color: '#f43f5e',
      boxShadow: '0 10px 25px rgba(244, 63, 94, 0.2)'
    },
    title: {
      fontSize: '48px',
      fontWeight: '900',
      color: '#fff',
      marginBottom: '16px'
    },
    description: {
      color: '#94a3b8',
      fontSize: '18px',
      maxWidth: '500px',
      marginBottom: '32px',
      lineHeight: 1.6
    },
    btn: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: '#fff',
      padding: '14px 32px',
      borderRadius: '16px',
      fontWeight: 'bold',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
      boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
      transition: '0.3s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.iconBox}>
        <AlertTriangle size={48} />
      </div>
      <h1 style={styles.title}>404 - الصفحة غير موجودة</h1>
      <p style={styles.description}>
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى رابط آخر. دعنا نُعيدك إلى الطريق الصحيح!
      </p>
      <Link to="/" style={styles.btn}>
        <Home size={20} /> العودة إلى الرئيسية
      </Link>
    </div>
  );
}