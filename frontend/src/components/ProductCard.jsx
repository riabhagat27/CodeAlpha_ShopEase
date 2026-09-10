import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.stock > 0) {
      addToCart(product, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="card product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <span className="product-category-badge">{product.category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        {/* Stock Tag */}
        <div style={{ marginBottom: '12px' }}>
          {isOutOfStock ? (
            <span className="badge badge-danger">Out of Stock</span>
          ) : isLowStock ? (
            <span className="badge badge-warning">Only {product.stock} Left</span>
          ) : (
            <span className="badge badge-success">In Stock ({product.stock})</span>
          )}
        </div>

        <div className="product-footer">
          <div className="product-price">₹{product.price.toLocaleString('en-IN')}</div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              to={`/products/${product.id}`}
              className="btn btn-secondary btn-sm"
              title="View Product Details"
            >
              <Eye size={16} />
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`btn btn-sm ${added ? 'btn-secondary' : 'btn-primary'}`}
              title={isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              style={added ? { backgroundColor: 'var(--success-light)', color: 'var(--success)', borderColor: 'var(--success)' } : {}}
            >
              {added ? (
                <>
                  <Check size={16} /> Added
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
