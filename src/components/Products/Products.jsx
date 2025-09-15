import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartSystem';
import './Mossent.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Product ID is undefined');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch product: ${response.statusText} (${response.status}) - ${errorText}`);
        }
        const data = await response.json();
        console.log('Fetched product:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="product-loading text-center text-gray-500">Loading product...</div>;
  if (error) return <div className="product-loading text-center text-red-500">Error: {error}</div>;
  if (!product) return <div className="product-loading text-center text-gray-500">Product not found</div>;

  return (
    <div className="product-details container mx-auto px-4 py-8">
      <button
        className="back-btn mb-4 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
        onClick={() => navigate('/products')}
      >
        Back to Products
      </button>
      <div className="product-details-container flex flex-col md:flex-row gap-6">
        {product.image && (
          <img
            src={product.image ? `http://localhost:5000${product.image}` : 'https://dummyimage.com/300x200'}
            alt={product.title}
            className="product-details-image w-[300px] h-[200px] object-cover rounded-lg"
            onError={(e) => {
              console.error(`Failed to load image: ${e.target.src}`);
              e.target.onerror = null; // Prevent potential infinite loop
              e.target.src = 'https://dummyimage.com/300x200';
            }}
          />
        )}
        <div className="product-details-info">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <div className="product-description prose" dangerouslySetInnerHTML={{ __html: product.description }} />
          <p className="product-price text-lg font-semibold mt-4">Rs. {product.price}</p>
          <button
            className="add-to-cart-btn mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300"
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;