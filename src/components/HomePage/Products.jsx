import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartSystem';
import './Products.css';

const Products = ({ onProductAdded }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products?sort=-createdAt&_=' + new Date().getTime());
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.slice(0, 6));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (onProductAdded) {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/products?sort=-createdAt&_=' + new Date().getTime());
          if (!response.ok) throw new Error('Failed to fetch products');
          const data = await response.json();
          setProducts(data.slice(0, 6));
        } catch (err) {
          setError(err.message);
        }
      };
      fetchProducts();
    }
  }, [onProductAdded]);

  if (loading) return <div className="products-empty text-center text-gray-500">Loading products...</div>;
  if (error) return <div className="products-empty text-center text-red-500">Error: {error}</div>;
  if (!products.length) return <div className="products-empty">No products available</div>;

  return (
    <div className="products-list">
      <h2>Our Latest Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <Link to={`/products/${product._id}`}>
              <img
                src={product.image ? `http://localhost:5000${product.image}` : 'https://placehold.co/300x200'}
                alt={product.title}
                className="product-card-image"
                onError={(e) => {
                  console.error(`Failed to load image: ${e.target.src}`);
                  e.target.src = 'https://placehold.co/300x200';
                }}
              />
              <h3>{product.title}</h3>
              <p>Rs. {product.price}</p>
            </Link>
            <div className="button-group">
              <button
                className="add-to-cart-btn"
                onClick={() =>
                  addToCart({
                    id: product._id,
                    name: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })
                }
              >
                Add to Cart
              </button>
              <Link
                to={`/products/${product._id}`}
                className="view-details-btn block bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;