import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useContext(CartContext);

  if (!toastMessage) return null;

  const styles = {
    toast: {
      position: 'fixed',
      bottom: '30px',
      left: '30px',
      background: 'rgba(16, 185, 129, 0.9)',
      backdropFilter: 'blur(10px)',
      color: '#fff',
      padding: '14px 24px',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 1000,
      fontWeight: 'bold',
      fontSize: '15px',
      animation: 'slideUp 0.3s ease'
    }
  };

  return (
    <div style={styles.toast}>
      <CheckCircle2 size={22} />
      <span>{toastMessage}</span>
    </div>
  );
}