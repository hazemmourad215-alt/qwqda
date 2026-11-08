import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useContext(CartContext);
  const [isVisible, setIsVisible] = useState(false);

  // تأثير حركي ناعم لظهور واختفاء الإشعار
  useEffect(() => {
    if (toastMessage) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [toastMessage]);

  if (!toastMessage) return null;

  const styles = {
    // 🌟 تصميم زجاجي شفاف فاخر باللون الأخضر الزمردي المشع
    toast: {
      position: 'fixed',
      bottom: '30px',
      left: '30px',
      background: 'rgba(6, 95, 70, 0.4)', // خلفية زجاجية خضراء شفافة ومخففة
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(52, 211, 153, 0.3)', // إطار أخضر مضيء
      color: '#34d399', // لون نص أخضر نيون مريح للعين
      padding: '16px 24px',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(4, 120, 87, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 2000,
      fontWeight: 'bold',
      fontSize: '15px',
      direction: 'rtl', // ضبط الاتجاه للغة العربية
      transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }
  };

  return (
    <div style={styles.toast}>
      <CheckCircle2 size={20} color="#34d399" />
      <span>{toastMessage}</span>
    </div>
  );
}
