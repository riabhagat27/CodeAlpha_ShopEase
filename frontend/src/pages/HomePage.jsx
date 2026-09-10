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
    { name: 'Electronics', icon: '⚡', count: '5 Products', color: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' },
    { name: 'Fashion', icon: '👕', count: '3 Products', color: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' },
    { name: 'Home', icon: '🏠', count: '3 Products', color: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' },
    { name: 'Accessories', icon: '🎒', count: '3 Products', color: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)' },
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
            <Link to="/products?category=Electronics" className="btn btn-secondary btn-lg" style={{ color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' }}>
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
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Shop by Category</h2>
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
                background: '#ffffff',
                transition: 'var(--transition)',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: cat.color,
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  margin: '0 auto 16px'
                }}
              >
                {cat.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>{cat.name}</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container" style={{ margin: '60px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Featured Products</h2>
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
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '50px 40px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              Special Deal
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '14px', marginBottom: '12px' }}>
              Upgrade Your Everyday Tech & Apparel
            </h2>
            <p style={{ opacity: 0.9, fontSize: '1rem', lineHeight: 1.6 }}>
              Get unbeatable prices on premium wireless headphones, smart watches, backpacks, and stylish daily wear.
            </p>
          </div>
          <Link to="/products" className="btn btn-secondary btn-lg" style={{ backgroundColor: '#ffffff', color: 'var(--primary)', fontWeight: 700 }}>
            <Zap size={20} /> Shop All Deals
          </Link>
        </div>
      </section>
    </div>
  );
}
