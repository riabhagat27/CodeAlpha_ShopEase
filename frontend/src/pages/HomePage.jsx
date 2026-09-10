import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Headphones, RefreshCw, Zap } from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await api.getProducts();
        // Show first 6 products on homepage
        setFeaturedProducts(data.slice(0, 6));
      } catch (err) {
        setError('Unable to load featured products.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const categories = [
    { name: 'Electronics', icon: '⚡', count: '5 Products', color: '#111111' },
    { name: 'Fashion', icon: '👕', count: '3 Products', color: '#111111' },
    { name: 'Home', icon: '🏠', count: '3 Products', color: '#111111' },
    { name: 'Accessories', icon: '🎒', count: '3 Products', color: '#111111' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-tag">✨ Welcome to ShopEase</span>
          <h1 className="hero-title">Everything you need, all in one place.</h1>
          <p className="hero-subtitle">
            Discover curated electronics, trending fashion, home essentials, and lifestyle accessories with fast delivery and seamless checkout.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary btn-lg">
              <span>Shop Now</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/products?category=Electronics" className="btn btn-secondary btn-lg" style={{ color: '#111111', backgroundColor: '#EBE7DF', borderColor: '#E5E0D8' }}>
              Explore Electronics
            </Link>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <div className="container">
        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon"><Truck size={24} /></div>
            <div>
              <h4 className="feature-title">Fast Delivery</h4>
              <p className="feature-desc">Nominal ₹50 flat rate shipping nationwide</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon"><ShieldCheck size={24} /></div>
            <div>
              <h4 className="feature-title">100% Genuine</h4>
              <p className="feature-desc">Handpicked authentic products verified for quality</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon"><RefreshCw size={24} /></div>
            <div>
              <h4 className="feature-title">Easy Returns</h4>
              <p className="feature-desc">7-day hassle free replacement guarantee</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon"><Headphones size={24} /></div>
            <div>
              <h4 className="feature-title">24/7 Support</h4>
              <p className="feature-desc">Dedicated customer support whenever you need</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid Section */}
      <section className="container" style={{ margin: '60px auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>Shop by Category</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Browse our wide range of popular categories</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="card"
              style={{
                padding: '30px 20px',
                textAlign: 'center',
                background: 'var(--bg-card)',
                transition: 'var(--transition)',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-sm)',
                  background: cat.color,
                  color: '#F9F8F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  margin: '0 auto 16px'
                }}
              >
                {cat.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 600, marginBottom: '6px' }}>{cat.name}</h3>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container" style={{ margin: '60px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>Featured Products</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Trending items our customers love</p>
          </div>
          <Link to="/products" className="btn btn-outline">
            View All Products <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Promotional Banner */}
      <section className="container" style={{ margin: '60px auto' }}>
        <div
          style={{
            background: '#111111',
            borderRadius: 'var(--radius-md)',
            padding: '50px 40px',
            color: '#F9F8F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <span style={{ backgroundColor: 'rgba(249,248,246,0.15)', padding: '4px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Special Deal
            </span>
            <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', fontWeight: 600, marginTop: '14px', marginBottom: '12px', color: '#F9F8F6' }}>
              Upgrade Your Everyday Tech & Apparel
            </h2>
            <p style={{ opacity: 0.85, fontSize: '1rem', lineHeight: 1.6, color: '#EBE7DF' }}>
              Get unbeatable prices on premium wireless headphones, smart watches, backpacks, and stylish daily wear.
            </p>
          </div>
          <Link to="/products" className="btn btn-secondary btn-lg" style={{ backgroundColor: '#F9F8F6', color: '#111111', fontWeight: 600 }}>
            <Zap size={20} /> Shop All Deals
          </Link>
        </div>
      </section>
    </div>
  );
}
