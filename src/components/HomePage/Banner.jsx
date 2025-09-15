import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>
        {`
          .banner-container {
            position: relative;
            width: 100%;
            height: 90vh;
            min-height: 600px;
            overflow: hidden;
            padding-top: 80px; /* Space for top bar */
          }
          
          .banner-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,0.9) 40%, rgba(68, 194, 199, 0.15) 100%);
            z-index: 1;
            opacity: 0;
            transition: opacity 1.2s ease-out 0.2s;
          }
          
          .banner-image-container {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 60%;
            z-index: 0;
            overflow: hidden;
          }
          
          .banner-image {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 100%;
            object-fit: cover;
            object-position: center;
            transform: scale(1.05);
            opacity: 0;
            transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
            transition-delay: 0.1s;
          }
          
          .image-fade {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 60%);
            z-index: 2;
          }
          
          .banner-content {
            position: relative;
            z-index: 3;
            max-width: 1200px;
            margin: 0 auto;
            height: 100%;
            padding: 0 5%;
            display: flex;
            align-items: center;
          }
          
          .text-container {
            max-width: 55%;
            padding: 2rem 0;
          }
          
          .company-name {
            font-size: 2.2rem;
            font-weight: 700;
            color: #44c2c7;
            margin-bottom: 1.5rem;
            line-height: 1.2;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .tagline {
            font-size: 3.2rem;
            font-weight: 800;
            line-height: 1.15;
            color: #2a2a2a;
            margin-bottom: 1.8rem;
            opacity: 0;
            transform: translateY(25px);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
          }
          
          .tagline span {
            color: #44c2c7;
          }
          
          .description {
            font-size: 1.1rem;
            line-height: 1.7;
            color: #555;
            margin-bottom: 2.5rem;
            opacity: 0;
            transform: translateY(25px);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s;
          }
          
.btn-shop {
  background-color: #44c2c7;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(68, 194, 199, 0.3);
  opacity: 0;
  transform: translateY(25px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s;
  text-decoration: none; /* 💡 This removes the underline */
  display: inline-block;  /* ✅ Optional: ensures it's styled properly as a block-level link */
}

.btn-shop:hover {
  background-color: #3aafb4;
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(68, 194, 199, 0.4);
}

.btn-shop:active {
  transform: translateY(0);
}

          
          .science-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            opacity: 0.05;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2344c2c7'/%3E%3C/svg%3E");
            opacity: 0;
            transition: opacity 1.5s ease 0.4s;
          }
          
          .decoration-circle {
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(68,194,199,0.15) 0%, rgba(255,255,255,0) 70%);
            z-index: 1;
            right: -200px;
            top: -200px;
            opacity: 0;
            transform: scale(0.8);
            transition: all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
          }
          
          /* Animation when mounted */
          .animate .banner-background,
          .animate .science-background {
            opacity: 0.08;
          }
          
          .animate .banner-image {
            opacity: 1;
            transform: scale(1);
          }
          
          .animate .company-name,
          .animate .tagline,
          .animate .description,
          .animate .btn-shop {
            opacity: 1;
            transform: translateY(0);
          }
          
          .animate .decoration-circle {
            opacity: 1;
            transform: scale(1);
          }
          
          /* Continuous animation for background image */
          @keyframes subtleZoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          
          .animate .banner-image {
            animation: subtleZoom 20s ease-in-out infinite;
          }
          
          @media (max-width: 992px) {
            .banner-content {
              justify-content: center;
              text-align: center;
            }
            
            .text-container {
              max-width: 80%;
              background: rgba(255, 255, 255, 0.8);
              padding: 2rem;
              border-radius: 10px;
              backdrop-filter: blur(5px);
            }
            
            .banner-image-container {
              width: 100%;
              left: 0;
            }
            
            .banner-image {
              filter: brightness(0.8);
            }
            
            .image-fade {
              background: linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0) 60%);
            }
            
            .tagline {
              font-size: 2.8rem;
            }
          }
          
          @media (max-width: 768px) {
            .banner-container {
              height: auto;
              min-height: 500px;
              padding: 100px 0 60px;
            }
            
            .company-name {
              font-size: 1.8rem;
            }
            
            .tagline {
              font-size: 2.2rem;
            }
            
            .description {
              font-size: 1rem;
            }
            
            .decoration-circle {
              display: none;
            }
            
            .text-container {
              max-width: 90%;
            }
          }
          
          @media (max-width: 480px) {
            .tagline {
              font-size: 1.8rem;
            }
            
            .company-name {
              font-size: 1.5rem;
            }
            
            .text-container {
              padding: 1.5rem;
            }
          }
        `}
      </style>

      <div className={`banner-container ${mounted ? 'animate' : ''}`}>
        <div className="banner-image-container">
          <img 
            src="bannerimg.png" 
            alt="Medical Research" 
            className="banner-image" 
          />
          <div className="image-fade"></div>
        </div>
        <div className="banner-background"></div>
        <div className="science-background"></div>
        <div className="decoration-circle"></div>
        
        <div className="banner-content">
          <div className="text-container">
            <div className="company-name">Biomedical R&D Company</div>
            <h1 className="tagline">
              Advancing Health<br />
              through <span>Rigorous</span><br />
              Research and <span>Innovative</span><br />
              Solutions
            </h1>
            <p className="description">
              CERA MEDICAL is dedicated to improving human health through innovative solutions. 
              We develop evidence-based natural health products and provide cutting-edge research services.
            </p>
            <Link to="/products" className="btn-shop">
                Shop Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;