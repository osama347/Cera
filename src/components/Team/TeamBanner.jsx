import { useState, useEffect } from 'react';

const TeamBanner = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>
        {`
          .team-banner-container {
            position: relative;
            width: 100%;
            height: 90vh;
            min-height: 600px;
            overflow: hidden;
            padding-top: 80px;
            background: #f9fbfd;
          }
          
          .team-banner-background {
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
          
          .team-banner-image-container {
            position: absolute;
            top: 0;
            right: 0;
            height: 100%;
            width: 60%;
            z-index: 0;
            overflow: hidden;
          }
          
          .team-banner-image {
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
          
          .team-image-fade {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 60%);
            z-index: 2;
          }
          
          .team-banner-content {
            position: relative;
            z-index: 3;
            max-width: 1200px;
            margin: 0 auto;
            height: 100%;
            padding: 0 5%;
            display: flex;
            align-items: center;
          }
          
          .team-text-container {
            max-width: 55%;
            padding: 2rem 0;
          }
          
          .team-tagline {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.15;
            color: #2a2a2a;
            margin-bottom: 1.8rem;
            opacity: 0;
            transform: translateY(25px);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
          }
          
          .team-tagline span {
            color: #44c2c7;
            position: relative;
            display: inline-block;
          }
          
          .team-tagline span:after {
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
          
          .team-description {
            font-size: 1.25rem;
            line-height: 1.7;
            color: #555;
            margin-bottom: 2.5rem;
            max-width: 85%;
            opacity: 0;
            transform: translateY(25px);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s;
          }
          
          .team-cta-button {
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
          
          .team-cta-button:hover {
            background-color: #3aafb4;
            transform: translateY(-3px);
            box-shadow: 0 7px 20px rgba(68, 194, 199, 0.4);
          }
          
          .team-science-background {
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
          
          .team-decoration-circle {
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
          .team-animate .team-banner-background,
          .team-animate .team-science-background {
            opacity: 0.08;
          }
          
          .team-animate .team-banner-image {
            opacity: 1;
            transform: scale(1);
          }
          
          .team-animate .team-tagline,
          .team-animate .team-description,
          .team-animate .team-cta-button {
            opacity: 1;
            transform: translateY(0);
          }
          
          .team-animate .team-decoration-circle {
            opacity: 1;
            transform: scale(1);
          }
          
          /* Continuous animation for background image */
          @keyframes subtleZoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          
          .team-animate .team-banner-image {
            animation: subtleZoom 20s ease-in-out infinite;
          }
          
          /* Team member icons */
          .team-icons {
            display: flex;
            gap: 20px;
            margin-top: 30px;
          }
          
          .team-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }
          
          .team-icon:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }
          
          .team-icon img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          @media (max-width: 992px) {
            .team-banner-content {
              justify-content: center;
              text-align: center;
            }
            
            .team-text-container {
              max-width: 80%;
              background: rgba(255, 255, 255, 0.8);
              padding: 2rem;
              border-radius: 10px;
              backdrop-filter: blur(5px);
            }
            
            .team-banner-image-container {
              width: 100%;
              left: 0;
            }
            
            .team-banner-image {
              filter: brightness(0.8);
            }
            
            .team-image-fade {
              background: linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0) 60%);
            }
            
            .team-tagline {
              font-size: 2.8rem;
            }
            
            .team-description {
              max-width: 100%;
              margin-left: auto;
              margin-right: auto;
            }
            
            .team-icons {
              justify-content: center;
            }
          }
          
          @media (max-width: 768px) {
            .team-banner-container {
              height: auto;
              min-height: 500px;
              padding: 100px 0 60px;
            }
            
            .team-tagline {
              font-size: 2.2rem;
            }
            
            .team-description {
              font-size: 1.1rem;
            }
            
            .team-decoration-circle {
              display: none;
            }
            
            .team-text-container {
              max-width: 90%;
            }
          }
          
          @media (max-width: 480px) {
            .team-tagline {
              font-size: 1.8rem;
            }
            
            .team-text-container {
              padding: 1.5rem;
            }
            
            .team-icons {
              flex-wrap: wrap;
            }
          }
        `}
      </style>

      <div className={`team-banner-container ${mounted ? 'team-animate' : ''}`}>
        <div className="team-banner-image-container">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80" 
            alt="CERA MEDICAL Team" 
            className="team-banner-image" 
          />
          <div className="team-image-fade"></div>
        </div>
        <div className="team-banner-background"></div>
        <div className="team-science-background"></div>
        <div className="team-decoration-circle"></div>
        
        <div className="team-banner-content">
          <div className="team-text-container">
            <h1 className="team-tagline">
              Meet Our <span>Experts</span>
            </h1>
            <p className="team-description">
              Meet the passionate team behind CERA MEDICAL. Our strength lies in our people
              — experts dedicated to advancing science and health.
            </p>
            
            <div className="team-icons">
              <div className="team-icon">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Scientist" />
              </div>
              <div className="team-icon">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Researcher" />
              </div>
              <div className="team-icon">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Doctor" />
              </div>
              <div className="team-icon">
                <img src="https://images.unsplash.com/photo-1590086782792-42dd2350140d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Lab Technician" />
              </div>
            </div>
            
            <button className="team-cta-button">Meet Our Team</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamBanner;