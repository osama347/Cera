import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isProduct = location.pathname.startsWith('/product');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const endpoint = isProduct
          ? `http://localhost:5000/api/products/${id}`
          : `http://localhost:5000/api/blogs/${id}`;
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed to fetch ${isProduct ? 'product' : 'blog'}: ${response.statusText}`);
        const data = await response.json();
        console.log(`Fetched ${isProduct ? 'product' : 'blog'}:`, data);
        setItem(data);
      } catch (error) {
        console.error(`Error fetching ${isProduct ? 'product' : 'blog'}:`, error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, isProduct]);

  if (loading) return <div className="blog-loading text-center text-gray-500">Loading {isProduct ? 'product' : 'blog'}...</div>;
  if (error) return <div className="blog-error text-center text-red-500">Error: {error}</div>;
  if (!item) return <div className="blog-error text-center text-gray-500">{isProduct ? 'Product' : 'Blog'} not found</div>;

  return (
    <div className="blog-details container mx-auto px-4 py-8">
      <button
        className="back-btn bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 mb-6"
        onClick={() => navigate(isProduct ? '/products' : '/blog')}
      >
        Back to {isProduct ? 'Products' : 'Blog'}
      </button>
      <div className="blog-details-container">
        {item.image && (
          <img
            src={item.image ? `http://localhost:5000${item.image}` : 'https://via.placeholder.com/1200x400'}
            alt={item.title}
            className="blog-details-image"
            onError={(e) => {
              console.error(`Failed to load ${isProduct ? 'product' : 'blog'} image: ${e.target.src}`);
              e.target.src = 'https://via.placeholder.com/1200x400';
            }}
          />
        )}
        <div className="blog-details-content">
          <h2 className="blog-title">{item.title}</h2>
          {!isProduct && (
            <div className="blog-meta">
              <span className="blog-category">{item.category || 'General'}</span>
              <span className="blog-date">{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          )}
          {isProduct ? (
            <>
              <p className="product-price">Rs. {item.price}</p>
              <div className="product-description" dangerouslySetInnerHTML={{ __html: item.description }} />
              <p className="product-date">Created: {new Date(item.createdAt).toLocaleDateString()}</p>
            </>
          ) : (
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: item.content }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;