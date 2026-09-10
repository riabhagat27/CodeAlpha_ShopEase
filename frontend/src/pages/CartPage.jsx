import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, deliveryFee, grandTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div
          className="card"
          style={{
            maxWidth: '550px',
            margin: '0 auto',
            padding: '50px 30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShoppingBag size={40} />
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Looks like you haven't added any products to your cart yet. Explore our awesome catalog and find something special!
          </p>
          <Link to="/products" className="btn btn-primary btn-lg" style={{ marginTop: '10px' }}>
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Shopping Cart</h1>
          <p style={{ color: 'var(--text-muted)' }}>Review your selected items before checkout</p>
        </div>
        <button onClick={clearCart} className="btn btn-secondary btn-sm" style={{ color: 'var(--danger)' }}>
          <Trash2 size={16} /> Clear Cart
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
        {/* Cart Item List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap'
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover',
                  backgroundColor: '#f1f5f9'
                }}
              />

              <div style={{ flex: '1 1 200px' }}>
                <Link to={`/products/${item.id}`} style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                  {item.name}
                </Link>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Category: {item.category}
                </div>
                <div style={{ fontWeight: 800, color: 'var(--primary)', marginTop: '6px' }}>
                  ₹{item.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ padding: '6px 12px', background: 'var(--bg-muted)' }}
                    title="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ padding: '6px 14px', fontWeight: 700, fontSize: '0.95rem' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    style={{ padding: '6px 12px', background: 'var(--bg-muted)' }}
                    title="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Total Item Price & Remove */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', minWidth: '80px', textAlign: 'right' }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ color: 'var(--text-light)', padding: '6px' }}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '12px' }}>
            <Link to="/products" className="btn btn-secondary btn-sm">
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="card" style={{ padding: '28px', position: 'sticky', top: '96px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Subtotal ({cart.length} items)</span>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Delivery Fee</span>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>₹{deliveryFee.toLocaleString('en-IN')}</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
              <span>Grand Total</span>
              <span style={{ color: 'var(--primary)' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
          >
            Proceed to Checkout <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
