import React, { useState } from 'react';
import { products } from '../Data/products';
import ProductCard from '../Components/ProductCard';
import { Search } from 'lucide-react';

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', 'إلكترونيات', 'ملابس', 'إكسسوارات'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '48px 32px' },
    headerBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' },
    title: { fontSize: '36px', fontWeight: '900', color: '#fff', borderRight: '4px solid #3b82f6', paddingRight: '16px' },
    searchBox: { display: 'flex', alignItems: 'center', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '10px 16px', width: '300px', gap: '10px' },
    searchInput: { background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '16px' },
    categories: { display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' },
    catBtn: (isActive) => ({
      background: isActive ? '#3b82f6' : 'rgba(30, 41, 59, 0.6)',
      color: isActive ? '#fff' : '#94a3b8',
      border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
      padding: '8px 20px',
      borderRadius: '50px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: '0.3s'
    }),
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerBox}>
        <h1 style={styles.title}>تصفح المنتجات</h1>
        <div style={styles.searchBox}>
          <Search size={20} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="ابحث عن منتج..." 
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
          <p style={{ color: '#94a3b8', gridColumn: '1 / -1', textAlign: 'center', fontSize: '18px' }}>لا توجد منتجات مطابقة لبحثك.</p>
        )}
      </div>
    </div>
  );
}