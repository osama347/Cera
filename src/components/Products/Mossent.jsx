import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartSystem';
import './Mossent.css';

const Mossent = ({ onProductAdded }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products?_=' + new Date().getTime());
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
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
          const response = await fetch('http://localhost:5000/api/products?_=' + new Date().getTime());
          if (!response.ok) throw new Error('Failed to fetch products');
          const data = await response.json();
          setProducts(data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchProducts();
    }
  }, [onProductAdded]);

  if (loading) return <div className="text-center text-gray-500">Loading products...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="product-section container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Products
      </motion.h1>
      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="product-card bg-white rounded-lg shadow-md overflow-hidden text-center p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="product-image-container bg-gray-200">
              <img
                src={product.image ? `http://localhost:5000${product.image}` : 'https://via.placeholder.com/300x200'}
                alt={product.title}
                className="product-image w-full h-full object-cover"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200')}
              />
            </div>
            <h2 className="product-name text-lg font-semibold mt-4">{product.title}</h2>
            <span className="price text-teal-600 font-semibold">Rs. {product.price}</span>
            <div className="button-group mt-4">
              <motion.button
                className="add-to-cart-btn bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition duration-300 mb-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
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
              </motion.button>
              <Link
                to={`/products/${product._id}`}
                className="view-details-btn block bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition duration-300"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Mossent;