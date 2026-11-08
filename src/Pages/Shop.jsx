import React, { useState, useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext'; // ربط الصفحة ببيانات لوحة التحكم الحية
import ProductCard from '../Components/ProductCard';
import { Search, Sparkles } from 'lucide-react';

export default function Shop() {
  // جلب المنتجات الحية والمحدثة التي تضيفها أو تحذفها من الـ Dashboard
  const { products } = useContext(DashboardContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', 'إلكترونيات', 'ملابس', 'إكسسوارات'];

  const filteredProducts = products ? products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '64px 24px', direction: 'rtl', position: 'relative', color: '#fff' },
    headerBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: 2 },
    title: { fontSize: '36px', fontWeight: '950', color: '#fff', borderRight: '4px solid #3b82f6', paddingRight: '16px', letterSpacing: '-1px' },
    
    // 🌟 صندوق البحث بتصميم زجاجي ناعم يضيء عند التفاعل
    searchBox: { display: 'flex', alignItems: 'center', background: 'rgba(30, 41, 59, 0.3)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '20px', padding: '12px 20px', width: '320px', gap: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', transition: 'all 0.3s ease' },
    searchInput: { background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '16px' },
    
    categories: { display: 'flex', gap: '12px', marginBottom: '48px', flexWrap: 'wrap', position: 'relative', zIndex: 2 },
    
    // 🌟 أزرار الأقسام الزجاجية والمشعة بلون أزرق فخم عند التفعيل
    catBtn: (isActive) => ({
      background: isActive ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'rgba(30, 41, 59, 0.3)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      color: isActive ? '#fff' : '#94a3b8',
      border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.06)',
      padding: '10px 24px',
      borderRadius: '50px',
      fontWeight: '700',
      cursor: 'pointer',
      boxShadow: isActive ? '0 10px 20px rgba(59, 130, 246, 0.3)' : 'none',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      transform: isActive ? 'scale(1.03)' : 'scale(1)'
    }),
    
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px', position: 'relative', zIndex: 2 }
  };

  return (
    <div style={styles.container}>
      {/* هالات النيون المشعة بالخلفية لإعطاء عمق رقمي فخم (Ambient Glow) */}
      <div style={{ position: 'absolute', top: '50px', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '100px', left: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={styles.headerBox}>
        <h1 style={styles.title}>تصفح المنتجات</h1>
        <div style={styles.searchBox} onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'} onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'}>
          <Search size={20} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="ابحث عن منتج متاح..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={styles.searchInput} 
          />
        </div>
      </div>

      <div style={styles.categories}>
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setSelectedCategory(cat)} 
            style={styles.catBtn(selectedCategory === cat)}
            onMouseEnter={(e) => { if (selectedCategory !== cat) e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)'; }}
            onMouseLeave={(e) => { if (selectedCategory !== cat) e.currentTarget.style.background = 'rgba(30, 41, 59, 0.3)'; }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p style={{ color: '#94a3b8', gridColumn: '1 / -1', textAlign: 'center', fontSize: '18px', padding: '40px 0' }}>لا توجد منتجات مطابقة لبحثك حالياً.</p>
        )}
      </div>
    </div>
  );
}
