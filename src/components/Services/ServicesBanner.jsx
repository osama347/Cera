import { useState, useEffect } from 'react';

const ServicesBanner = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>
        {`
          .services-banner-container {
            position: relative;
            width: 100%;
            height: 80vh;
            min-height: 550px;
            overflow: hidden;
            padding-top: 80px;
            background: #f9fbfd;
          }
          
          .services-banner-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,0.95) 40%, rgba(68, 194, 199, 0.15) 100%);
            z-index: 1;
            opacity: 0;
            transition: opacity 1.2s ease-out 0.2s;
          }
          
          .services-banner-image-container {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 60%;
            z-index: 0;
            overflow: hidden;
          }
          
          .services-banner-image {
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
          
          .services-image-fade {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 60%);
            z-index: 2;
          }
          
          .services-banner-content {
            position: relative;
            z-index: 3;
            max-width: 1200px;
            margin: 0 auto;
            height: 100%;
            padding: 0 5%;
            display: flex;
            align-items: center;
          }
          
          .services-text-container {
            max-width: 55%;
            padding: 2rem 0;
          }
          
          .services-tagline {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.15;
            color: #2a2a2a;
            margin-bottom: 1.8rem;
            opacity: 0;
            transform: translateY(25px);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
          }
          
          .services-tagline span {
            color: #44c2c7;
            position: relative;
            display: inline-block;
          }
          
          .services-tagline span:after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 0;
            width: 100%;
            height: 8px;
            background: rgba(68, 194, 199, 0.25);
            z-index: -1;
            transition: height 0.3s ease;
          }
          
          .services-description {
            font-size: 1.15rem;
            line-height: 1.7;
            color: #555;
            margin-bottom: 2.5rem;
            max-width: 85%;
            opacity: 0;
            transform: translateY(25px);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s;
          }
          
          .services-cta-button {
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
          }
          
          .services-cta-button:hover {
            background-color: #3aafb4;
            transform: translateY(-3px);
            box-shadow: 0 7px 20px rgba(68, 194, 199, 0.4);
          }
          
          .services-science-background {
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
          
          .services-decoration-circle {
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
          .services-animate .services-banner-background,
          .services-animate .services-science-background {
            opacity: 0.08;
          }
          
          .services-animate .services-banner-image {
            opacity: 1;
            transform: scale(1);
          }
          
          .services-animate .services-tagline,
          .services-animate .services-description,
          .services-animate .services-cta-button {
            opacity: 1;
            transform: translateY(0);
          }
          
          .services-animate .services-decoration-circle {
            opacity: 1;
            transform: scale(1);
          }
          
          /* Continuous animation for background image */
          @keyframes subtleZoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          
          .services-animate .services-banner-image {
            animation: subtleZoom 20s ease-in-out infinite;
          }
          
          @media (max-width: 992px) {
            .services-banner-content {
              justify-content: center;
              text-align: center;
            }
            
            .services-text-container {
              max-width: 80%;
              background: rgba(255, 255, 255, 0.8);
              padding: 2rem;
              border-radius: 10px;
              backdrop-filter: blur(5px);
            }
            
            .services-banner-image-container {
              width: 100%;
              left: 0;
            }
            
            .services-banner-image {
              filter: brightness(0.8);
            }
            
            .services-image-fade {
              background: linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0) 60%);
            }
            
            .services-tagline {
              font-size: 2.8rem;
            }
            
            .services-description {
              max-width: 100%;
              margin-left: auto;
              margin-right: auto;
            }
          }
          
          @media (max-width: 768px) {
            .services-banner-container {
              height: auto;
              min-height: 500px;
              padding: 100px 0 60px;
            }
            
            .services-tagline {
              font-size: 2.2rem;
            }
            
            .services-description {
              font-size: 1rem;
            }
            
            .services-decoration-circle {
              display: none;
            }
            
            .services-text-container {
              max-width: 90%;
            }
          }
          
          @media (max-width: 480px) {
            .services-tagline {
              font-size: 1.8rem;
            }
            
            .services-text-container {
              padding: 1.5rem;
            }
          }
        `}
      </style>

      <div className={`services-banner-container ${mounted ? 'services-animate' : ''}`}>
        <div className="services-banner-image-container">
          <img 
            src="/servicesbanner.png" 
            alt="Research and Development" 
            className="services-banner-image" 
          />
          <div className="services-image-fade"></div>
        </div>
        <div className="services-banner-background"></div>
        <div className="services-science-background"></div>
        <div className="services-decoration-circle"></div>
        
        <div className="services-banner-content">
          <div className="services-text-container">
            <h1 className="services-tagline">
              Research & Development<br />
              <span>Services</span>
            </h1>
            <p className="services-description">
              Our services are designed to support researchers, pharmaceutical companies, and healthcare innovators at every stage. Each service includes comprehensive support with detailed pricing available upon request.
            </p>
            <button className="services-cta-button">Request Information</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesBanner;