import { useState, useEffect } from 'react';
import '../Products/ProductsBanner.css'

const ProductsBanner = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`products-banner-container ${mounted ? 'animate-products' : ''}`}>
      <div className="products-banner-image-container">
        <img 
          src="/productsbanner.png" 
          alt="Natural Health Products" 
          className="products-banner-image" 
        />
        <div className="products-image-fade"></div>
      </div>
      <div className="products-banner-background"></div>
      <div className="products-science-background"></div>
      <div className="products-decoration-circle"></div>
      
      <div className="products-banner-content">
        <div className="products-text-container">
          <div className="products-subtitle">Our Products</div>
          <h1 className="products-title">
            <span>Natural</span> Health <span>Products</span>
          </h1>
          <p className="products-description">
            Discover our range of innovative <span>natural health products</span>. Each product includes
            a brief description, price, and an Add to Cart button, with a link to view more
            details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsBanner;