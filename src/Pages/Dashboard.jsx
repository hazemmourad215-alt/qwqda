import React, { useContext, useState, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, ShoppingBag, DollarSign, Package, ClipboardList, Check, Clock, Lock, CheckCircle, AlertTriangle, Edit3, MessageSquare } from 'lucide-react';

export default function Dashboard() {
  const { products, orders, addProduct, deleteProduct, setProducts, messages } = useContext(DashboardContext);
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [toast, setToast] = useState({ message: null, type: 'success' });
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', category: 'إلكترونيات' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const totalSales = orders ? orders.reduce((sum, order) => sum + Number(order.total), 0) : 0;
  const totalOrders = orders ? orders.length : 0;
  const totalProducts = products ? products.length : 0;
  const totalMessages = messages ? messages.length : 0; // 🌟 إحصائية عدد الرسائل

  useEffect(() => {
    const isAuth = sessionStorage.getItem('isAdminAuth') === 'true';
    if (isAuth) setIsAuthenticated(true);
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const triggerToast = (msg, type = 'success') => {
    setToast({ message: msg, type: type });
    setTimeout(() => setToast({ message: null, type: 'success' }), 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const parsedPrice = parseFloat(newProduct.price);
    
    if (isEditing) {
      if (setProducts) {
        setProducts((prev) => prev.map((p) => (p.id === editingProductId ? { ...newProduct, price: parsedPrice, id: editingProductId } : p)));
      } else {
        const savedProducts = JSON.parse(localStorage.getItem('store_products')) || [];
        const updated = savedProducts.map((p) => (p.id === editingProductId ? { ...newProduct, price: parsedPrice, id: editingProductId } : p));
        localStorage.setItem('store_products', JSON.stringify(updated));
        window.location.reload();
        return;
      }
      triggerToast(`تم تحديث بيانات "${newProduct.name}" بنجاح! ✏️`, 'info');
      setIsEditing(false);
      setEditingProductId(null);
    } else {
      addProduct({ ...newProduct, price: parsedPrice });
      triggerToast(`تمت إضافة المنتَج "${newProduct.name}" بنجاح! 🚀`, 'success');
    }
    setNewProduct({ name: '', price: '', image: '', category: 'إلكترونيات' });
  };

  const handleEditClick = (product) => {
    setNewProduct({ name: product.name, price: product.price, image: product.image || '', category: product.category || 'إلكترونيات' });
    setIsEditing(true);
    setEditingProductId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (id, name) => {
    deleteProduct(id);
    triggerToast(`تم حذف المنتَج "${name}" من المتجر 🗑️`, 'error');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setIsAuthenticated(true);
      setLoginError(false);
      sessionStorage.setItem('isAdminAuth', 'true');
    } else {
      setLoginError(true);
    }
  };

  const styles = {
    lockContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', color: '#fff', direction: 'rtl', padding: '20px' },
    lockCard: { background: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '40px 32px', borderRadius: '24px', width: '100%', maxWidth: '400px', textAlign: 'center', boxSizing: 'border-box' },
    container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', direction: 'rtl', color: '#fff', position: 'relative' },
    toastBox: (type) => ({ position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', background: type === 'success' ? '#065f46' : type === 'info' ? '#1e3a8a' : '#991b1b', border: type === 'success' ? '1px solid #059669' : type === 'info' ? '1px solid #3b82f6' : '1px solid #dc2626', color: type === 'success' ? '#34d399' : type === 'info' ? '#93c5fd' : '#fca5a5', padding: '16px 24px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', zIndex: 2000, fontWeight: 'bold', fontSize: '15px', backdropFilter: 'blur(8px)' }),
    title: { fontSize: '32px', fontWeight: '900', marginBottom: '32px', borderRight: '4px solid #3b82f6', paddingRight: '16px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' },
    statCard: { background: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px' },
    statIcon: { padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    sectionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' },
    card: { background: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '24px', borderRadius: '24px' },
    cardTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' },
    input: { width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#fff', marginTop: '6px', marginBottom: '16px', outline: 'none', boxSizing: 'border-box' },
    submitBtn: { width: '100%', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
    list: { display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto', padding: '12px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)', boxSizing: 'border-box' },
    item: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(30, 41, 59, 0.5)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.03)' }
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.lockContainer}>
        <div style={styles.lockCard}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
            <Lock size={32} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>لوحة تحكم محمية</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>الرجاء إدخال كلمة مرور الإدارة للمتابعة.</p>
          <form onSubmit={handleAdminLogin}>
            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} style={{ ...styles.input, textAlign: 'center', fontSize: '18px', letterSpacing: '4px' }} placeholder="••••••••" required />
            {loginError && <p style={{ color: '#f43f5e', fontSize: '14px', marginBottom: '16px', fontWeight: '600' }}>⚠️ كلمة المرور خاطئة!</p>}
            <button type="submit" style={styles.submitBtn}>دخول لوحة التحكم</button>
          </form>
          <button onClick={() => navigate('/shop')} style={{ background: 'none', border: 'none', color: '#94a3b8', marginTop: '20px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>العودة للمتجر</button>
        </div>
      </div>
    );
  }
  return (
    <div style={styles.container}>
      {/* هالة إضاءة خلفية ناعمة للداش بورد */}
      <div style={{ position: 'absolute', top: '50px', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* صندوق الإشعارات المنبثق المرن */}
      {toast.message && (
        <div style={styles.toastBox(toast.type)}>
          {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
          <span>{toast.message}</span>
        </div>
      )}

      <h1 style={styles.title}>لوحة تحكم المتجر</h1>
      
      {/* شبكة الإحصائيات السريعة الزجاجية */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }}>
            <DollarSign size={28} />
          </div>
          <div>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>إجمالي المبيعات</p>
            <h3 style={{ fontSize: '24px', fontWeight: '900', marginTop: '4px' }}>{totalSales} جنيه</h3>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}>
            <ShoppingBag size={28} />
          </div>
          <div>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>عدد الطلبات</p>
            <h3 style={{ fontSize: '24px', fontWeight: '900', marginTop: '4px' }}>{totalOrders} طلب</h3>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' }}>
            <Package size={28} />
          </div>
          <div>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>إجمالي المنتجات</p>
            <h3 style={{ fontSize: '24px', fontWeight: '900', marginTop: '4px' }}>{totalProducts} منتج</h3>
          </div>
        </div>

        {/* بطاقة إحصاء الرسائل الجديدة */}
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}>
            <MessageSquare size={28} />
          </div>
          <div>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>رسائل العملاء</p>
            <h3 style={{ fontSize: '24px', fontWeight: '900', marginTop: '4px' }}>{totalMessages} رسالة</h3>
          </div>
        </div>
      </div>

      <div style={styles.sectionsGrid}>
        {/* نموذج إضافة وتعديل المنتج الزجاجي */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <PlusCircle size={22} color="#3b82f6" /> 
            {isEditing ? 'تعديل بيانات المنتج الحالي' : 'إضافة منتج جديد'}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <label style={{ fontSize: '14px', color: '#cbd5e1' }}>اسم المنتج</label>
            <input type="text" name="name" required value={newProduct.name} onChange={handleInputChange} style={styles.input} placeholder="مثال: سماعة رأس لاسلكية" />

            <label style={{ fontSize: '14px', color: '#cbd5e1' }}>السعر (جنيه)</label>
            <input type="number" name="price" required value={newProduct.price} onChange={handleInputChange} style={styles.input} placeholder="مثال: 1500" />

            <label style={{ fontSize: '14px', color: '#cbd5e1' }}>رابط صورة المنتج (URL)</label>
            <input type="text" name="image" value={newProduct.image} onChange={handleInputChange} style={styles.input} placeholder="https://example.com" />

            <label style={{ fontSize: '14px', color: '#cbd5e1' }}>القسم</label>
            <select name="category" value={newProduct.category} onChange={handleInputChange} style={{ ...styles.input, color: '#fff', cursor: 'pointer' }}>
              <option value="إلكترونيات" style={{ background: '#1e293b' }}>إلكترونيات</option>
              <option value="ملابس" style={{ background: '#1e293b' }}>ملابس</option>
              <option value="أحذية" style={{ background: '#1e293b' }}>أحذية</option>
              <option value="إكسسوارات" style={{ background: '#1e293b' }}>إكسسوارات</option>
            </select>

            <button type="submit" style={styles.submitBtn}>
              {isEditing ? 'تحديث بيانات المنتج' : 'حفظ ونشر المنتج'}
            </button>

            {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setEditingProductId(null); setNewProduct({ name: '', price: '', image: '', category: 'إلكترونيات' }); }} style={{ ...styles.submitBtn, background: '#334155', marginTop: '12px' }}>إلغاء التعديل</button>
            )}
          </form>
        </div>

        {/* إدارة المنتجات الحالية داخل صندوق زجاجي محدد أنيق ومريح للتمرير */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}><Package size={22} color="#c084fc" /> المنتجات المتاحة ({products ? products.length : 0})</h2>
          <div style={styles.list}>
            {products && products.map((product) => (
              <div key={product.id} style={styles.item}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {product.image && <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }} />}
                  <div>
                    <h4 style={{ fontWeight: 'bold', fontSize: '15px' }}>{product.name}</h4>
                    <p style={{ color: '#60a5fa', fontSize: '13px', marginTop: '2px' }}>{product.price} جنيه</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => handleEditClick(product)} style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} title="تعديل"><Edit3 size={16} /></button>
                  <button onClick={() => handleDeleteProduct(product.id, product.name)} style={{ color: '#f43f5e', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} title="حذف"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* جدول طلبات العملاء الزجاجي الحقيقي */}
      <div style={{ ...styles.card, marginTop: '40px' }}>
        <h2 style={styles.cardTitle}><ClipboardList size={22} color="#34d399" /> طلبات العملاء الحية ({orders ? orders.length : 0})</h2>
        <div style={{ overflowX: 'auto', marginTop: '16px' }}>
          {!orders || orders.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '24px' }}>لا توجد طلبات مسجلة حتى الآن.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                  <th style={{ padding: '12px' }}>رقم الطلب</th>
                  <th style={{ padding: '12px' }}>العميل</th>
                  <th style={{ padding: '12px' }}>الهاتف</th>
                  <th style={{ padding: '12px' }}>العنوان</th>
                  <th style={{ padding: '12px' }}>المنتجات</th>
                  <th style={{ padding: '12px' }}>الإجمالي</th>
                  <th style={{ padding: '12px' }}>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(15,23,42,0.1)' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#60a5fa' }}>{order.id}</td>
                    <td style={{ padding: '12px' }}>{order.customer?.name}</td>
                    <td style={{ padding: '12px', direction: 'ltr', textAlign: 'right' }}>{order.customer?.phone}</td>
                    <td style={{ padding: '12px' }}>{order.customer?.address}</td>
                    <td style={{ padding: '12px', fontSize: '13px', color: '#cbd5e1' }}>{order.products?.map((p) => `${p.name} (x${p.quantity})`).join('، ')}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#34d399' }}>{order.total} جنيه</td>
                    <td style={{ padding: '12px' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(234,179,8,0.1)', color: '#eab308', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}><Clock size={12} /> {order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* جدول عرض رسائل تواصل العملاء الزجاجي الجديد */}
      <div style={{ ...styles.card, marginTop: '40px' }}>
        <h2 style={styles.cardTitle}><MessageSquare size={22} color="#f43f5e" /> بريد رسائل الزبائن الحية ({messages ? messages.length : 0})</h2>
        <div style={{ overflowX: 'auto', marginTop: '16px' }}>
          {!messages || messages.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '24px' }}>صندوق الوارد فارغ، لا توجد رسائل تواصل حالياً.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                  <th style={{ padding: '12px' }}>التاريخ</th>
                  <th style={{ padding: '12px' }}>اسم العميل</th>
                  <th style={{ padding: '12px' }}>البريد الإلكتروني</th>
                  <th style={{ padding: '12px' }}>نص ومضمون الرسالة الواردة</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(15,23,42,0.1)' }}>
                    <td style={{ padding: '12px', color: '#a78bfa', fontSize: '13px' }}>{msg.date}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{msg.name}</td>
                    <td style={{ padding: '12px', color: '#60a5fa' }}>{msg.email}</td>
                    <td style={{ padding: '12px', color: '#cbd5e1', fontSize: '14px', maxWidth: '400px', whiteSpace: 'normal', wordBreak: 'break-word' }}>{msg.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
}
