import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
      <div
        className="card"
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          padding: '60px 30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <div
          style={{
            fontSize: '5rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          404
        </div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '10px' }}>
          <Home size={18} /> Back to Home Page
        </Link>
      </div>
    </div>
  );
}
