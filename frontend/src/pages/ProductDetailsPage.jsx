import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, ShieldCheck, Truck, RefreshCw, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getProductById(id);
        setProduct(data);
        if (data.stock <= 0) {
          setQuantity(0);
        }
      } catch (err) {
        setError(err.message || 'Product not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta) => {
    if (!product) return;
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    if (product && quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 0' }}>
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <div className="alert alert-danger" style={{ maxWidth: '500px', margin: '0 auto 24px' }}>
          <AlertCircle size={20} />
          <span>{error || 'Unable to display product details.'}</span>
        </div>
        <Link to="/products" className="btn btn-primary">
          <ArrowLeft size={18} /> Back to Products
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="container" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      {/* Back button */}
      <button
        onClick={() => navigate('/products')}
        className="btn btn-secondary btn-sm"
        style={{ marginBottom: '24px' }}
      >
        <ArrowLeft size={16} /> Back to Products
      </button>

      {/* Main Details Card Grid */}
      <div className="card" style={{ padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
        {/* Product Image */}
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', backgroundColor: '#f1f5f9', position: 'relative' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
          <span className="product-category-badge" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
            {product.category}
          </span>
        </div>

        {/* Product Info & Actions */}
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
            {product.name}
          </h1>

          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '20px' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
            {product.description}
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '24px' }} />

          {/* Stock Info */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
              Availability Status:
            </div>
            {isOutOfStock ? (
              <span className="badge badge-danger" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                Out of Stock
              </span>
            ) : product.stock <= 5 ? (
              <span className="badge badge-warning" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                Hurry! Only {product.stock} left in stock
              </span>
            ) : (
              <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                In Stock ({product.stock} items available)
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          {!isOutOfStock && (
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px' }}>
                Quantity:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    style={{ padding: '10px 16px', background: 'var(--bg-muted)', fontWeight: 700, fontSize: '1.1rem' }}
                  >
                    -
                  </button>
                  <span style={{ padding: '10px 20px', fontWeight: 700, fontSize: '1rem', minWidth: '48px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    style={{ padding: '10px 16px', background: 'var(--bg-muted)', fontWeight: 700, fontSize: '1.1rem' }}
                  >
                    +
                  </button>
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  (Max {product.stock})
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`btn btn-lg ${added ? 'btn-secondary' : 'btn-primary'}`}
              style={{ flex: 1, minWidth: '220px', ...(added ? { backgroundColor: 'var(--success-light)', color: 'var(--success)', borderColor: 'var(--success)' } : {}) }}
            >
              {added ? (
                <>
                  <Check size={20} /> Added to Cart ({quantity})
                </>
              ) : (
                <>
                  <ShoppingCart size={20} /> Add to Shopping Cart
                </>
              )}
            </button>
          </div>

          {/* Value Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingTop: '20px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <div>
              <Truck size={20} style={{ color: 'var(--primary)', marginBottom: '4px' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>₹50 Delivery</div>
            </div>
            <div>
              <ShieldCheck size={20} style={{ color: 'var(--primary)', marginBottom: '4px' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>100% Authentic</div>
            </div>
            <div>
              <RefreshCw size={20} style={{ color: 'var(--primary)', marginBottom: '4px' }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>Easy Returns</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
