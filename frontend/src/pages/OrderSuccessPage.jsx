import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, Package, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  return (
    <div className="container" style={{ padding: '60px 0', display: 'flex', justifyContent: 'center' }}>
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '600px',
          padding: '40px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--success-light)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}
        >
          <CheckCircle2 size={44} />
        </div>

        <span className="badge badge-success" style={{ marginBottom: '10px' }}>
          Status: {order.status || 'Placed'}
        </span>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
          Order Placed Successfully!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
          Thank you for your purchase. Your order has been registered in the database.
        </p>

        {/* Details Box */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'var(--bg-muted)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            textAlign: 'left',
            marginBottom: '30px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
            <span style={{ fontWeight: 800 }}>#{order.id}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
            <span style={{ fontWeight: 800, color: 'var(--primary)' }}>
              ₹{order.totalAmount ? order.totalAmount.toLocaleString('en-IN') : '0'}
            </span>
          </div>

          <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Shipping Address:</span>
            <div style={{ fontWeight: 600, marginTop: '2px', color: 'var(--text-main)', fontSize: '0.85rem' }}>
              {order.shippingAddress || 'Address on file'}
            </div>
          </div>

          {order.items && order.items.length > 0 && (
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>Ordered Items:</div>
              {order.items.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span>{item.name} × {item.quantity}</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>₹{item.total || item.unitPrice * item.quantity}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: '100%' }}>
          <Link to="/orders" className="btn btn-primary" style={{ flex: 1 }}>
            <Package size={18} /> View My Orders
          </Link>
          <Link to="/products" className="btn btn-secondary" style={{ flex: 1 }}>
            <ShoppingBag size={18} /> Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
