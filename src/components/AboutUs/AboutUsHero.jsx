import { useState, useEffect } from 'react';

const AboutUsHero = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>
        {`
          .about-us-banner {
            position: relative;
            width: 100%;
            height: 90vh;
            min-height: 600px;
            overflow: hidden;
            display: flex;
            align-items: center;
          }
          
          .about-us-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(10, 37, 64, 0.9) 40%, rgba(10, 37, 64, 0.6) 100%);
            z-index: 1;
            opacity: 0;
            transition: opacity 1.2s ease-out 0.2s;
          }
          
          .about-us-image-container {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 60%;
            z-index: 0;
            overflow: hidden;
          }
          
          .about-us-image {
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
          
          .about-us-image-fade {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 60%);
            z-index: 2;
          }
          
          .about-us-content {
            position: relative;
            z-index: 3;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
            padding: 0 5%;
          }
          
          .about-us-text-container {
            max-width: 55%;
            padding: 2rem 0;
          }
          
          .about-us-title {
            font-size: 3.5rem;
            font-weight: 700;
            line-height: 1.15;
            color:rgba(0, 0, 0, 0.9);
            margin-bottom: 1.8rem;
            opacity: 0;
            transform: translateY(25px);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
          }
          
          .about-us-title span {
            color: #44c2c7;
          }
          
          .about-us-divider {
            height: 4px;
            background: #44c2c7;
            width: 80px;
            margin: 0 0 2rem;
            border-radius: 2px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s;
          }
          
          .about-us-description {
            font-size: 1.5rem;
            line-height: 1.7;
            color: rgba(0, 0, 0, 0.9);
            margin-bottom: 2.5rem;
            max-width: 600px;
            opacity: 0;
            transform: translateY(25px);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s;
          }
            
          .about-us-description span {
           color: #44c2c7;
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
             background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 60%);
            z-index: 1;
            right: -200px;
            top: -200px;
            opacity: 0.8;
            transform: scale(0.8);
            transition: all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s;
          }
          
          /* Animation when mounted */
          .animate-about-us .about-us-background,
          .animate-about-us .science-background {
            opacity: 0;
          }
          
          .animate-about-us .about-us-image {
            opacity: 1;
            transform: scale(1);
          }
          
          .animate-about-us .about-us-title,
          .animate-about-us .about-us-divider,
          .animate-about-us .about-us-description {
            opacity: 1;
            transform: translateY(0);
          }
          
          .animate-about-us .decoration-circle {
            opacity: 0;
            transform: scale(1);
          }
          
          /* Continuous animation for background image */
          @keyframes subtleZoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          
          .animate-about-us .about-us-image {
            animation: subtleZoom 20s ease-in-out infinite;
          }
          
          @media (max-width: 992px) {
            .about-us-banner {
              height: 80vh;
            }
            
            .about-us-text-container {
              max-width: 80%;
            }
            
            .about-us-image-container {
              width: 100%;
              left: 0;
            }
            
            .about-us-title {
              font-size: 3rem;
            }
          }
          
          @media (max-width: 768px) {
            .about-us-banner {
              height: 70vh;
              min-height: 500px;
            }
            
            .about-us-text-container {
              max-width: 90%;
              text-align: center;
              margin: 0 auto;
            }
            
            .about-us-divider {
              margin: 0 auto 2rem;
            }
            
            .about-us-title {
              font-size: 2.5rem;
            }
            
            .about-us-description {
              font-size: 1.1rem;
            }
            
            .decoration-circle {
              display: none;
            }
          }
          
          @media (max-width: 480px) {
            .about-us-title {
              font-size: 2rem;
            }
            
            .about-us-description {
              font-size: 1rem;
            }
          }
        `}
      </style>

      <div className={`about-us-banner ${mounted ? 'animate-about-us' : ''}`}>
        <div className="about-us-image-container">
          <img 
            src="/aboutusbanner.png" 
            alt="Biomedical Research" 
            className="about-us-image" 
          />
          <div className="about-us-image-fade"></div>
        </div>
        <div className="about-us-background"></div>
        <div className="science-background"></div>
        <div className="decoration-circle"></div>
        
        <div className="about-us-content">
          <div className="about-us-text-container">
            <h1 className="about-us-title">
              About & <span>Cera Medical</span>
            </h1>
            <div className="about-us-divider"></div>
            <p className="about-us-description">
              Founded by passionate scientists, <span>CERA MEDICAL</span> was established to bring <span>cutting-edge</span> biomedical research to Pakistan and beyond.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsHero;