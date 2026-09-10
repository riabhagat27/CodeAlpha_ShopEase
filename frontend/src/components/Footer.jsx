import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="logo" style={{ color: '#ffffff' }}>
              <div className="logo-icon">
                <ShoppingBag size={20} />
              </div>
              <span>ShopEase</span>
            </div>
            <p>
              Everything you need, all in one place. Experience seamless online shopping with premium products, transparent prices, and fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="footer-title">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=Electronics">Electronics</Link></li>
              <li><Link to="/products?category=Fashion">Fashion</Link></li>
              <li><Link to="/products?category=Home">Home & Living</Link></li>
              <li><Link to="/products?category=Accessories">Accessories</Link></li>
            </ul>
          </div>

          {/* Internship Project Info */}
          <div>
            <h4 className="footer-title">About ShopEase</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
              Built as a Full-Stack Web Application for the <strong>CodeAlpha Full Stack Development Internship</strong>.
            </p>
            <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#94a3b8' }}>
              React.js • Node.js • Express • SQLite • JWT
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Crafted with <Heart size={14} color="#ef4444" fill="#ef4444" /> for CodeAlpha Task 1
          </p>
        </div>
      </div>
    </footer>
  );
}
