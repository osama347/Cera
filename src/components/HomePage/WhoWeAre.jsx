import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const WhoWeAre = () => {
  const [inView, setInView] = useState(false);
  const [stats, setStats] = useState([0, 0, 0, 0]);
  const targetStats = useRef([15, 50, 25, 10]); // Target values for the counters
  const sectionRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setInView(rect.top <= window.innerHeight * 0.75);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Counter animation
  useEffect(() => {
    if (inView) {
      const duration = 2000; // Animation duration in ms
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      
      let frame = 0;
      
      const animateCounter = () => {
        frame++;
        const progress = frame / totalFrames;
        
        const nextStats = targetStats.current.map(target => {
          return Math.floor(progress * target);
        });
        
        setStats(nextStats);
        
        if (frame < totalFrames) {
          animationRef.current = requestAnimationFrame(animateCounter);
        }
      };
      
      animationRef.current = requestAnimationFrame(animateCounter);
    } else {
      // Reset counters when out of view
      setStats([0, 0, 0, 0]);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [inView]);

  return (
    <section 
      ref={sectionRef}
      className={`who-we-are ${inView ? 'in-view' : ''}`}
    >
      <style>
        {`
          .who-we-are {
            max-width: 1200px;
            margin: 5rem auto;
            padding: 0 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .section-header {
            font-size: 2.8rem;
            font-weight: 700;
            color: #44c2c7;
            margin-bottom: 3rem;
            text-align: center;
            position: relative;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease 0.1s;
          }
          
          .section-header::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: #44c2c7;
            border-radius: 2px;
          }
          
          .content-container {
            display: flex;
            gap: 4rem;
            align-items: center;
          }
          
          .text-content {
            flex: 1;
          }
          
          .description {
            font-size: 1.15rem;
            line-height: 1.8;
            margin-bottom: 1.5rem;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease 0.3s;
          }
          
          .description span {
            color: #44c2c7;
            font-weight: 600;
          }
          
          .btn-learn-more {
            background-color: transparent;
            color: #44c2c7;
            border: 2px solid #44c2c7;
            padding: 0.8rem 2.2rem;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease 0.5s;
            display: inline-block;
            position: relative;
            overflow: hidden;
          }
          
          .btn-learn-more:hover {
            background-color: #44c2c7;
            color: white;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(68, 194, 199, 0.3);
          }
          
          .btn-learn-more:active {
            transform: translateY(0);
          }
          
          /* Button animation effect */
          .btn-learn-more::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.5);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%);
            transform-origin: 50% 50%;
          }
          
          .btn-learn-more:focus:not(:active)::after {
            animation: ripple 1s ease-out;
          }
          
          @keyframes ripple {
            0% {
              transform: scale(0, 0);
              opacity: 1;
            }
            20% {
              transform: scale(25, 25);
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: scale(40, 40);
            }
          }
          
          .dna-animation {
            flex: 0 0 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease 0.7s;
          }
          
          .dna-container {
            position: relative;
            width: 200px;
            height: 300px;
          }
          
          .dna-strand {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 100%;
            background: linear-gradient(to bottom, transparent, #44c2c7, transparent);
            opacity: 0.8;
          }
          
          .dna-node {
            position: absolute;
            width: 16px;
            height: 16px;
            background: #44c2c7;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }
          
          .dna-node::before {
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
            top: 4px;
            left: 4px;
            animation: pulse-inner 2s infinite;
          }
          
          .dna-node:nth-child(1) { top: 15%; left: 30%; animation-delay: 0s; }
          .dna-node:nth-child(2) { top: 15%; left: 70%; animation-delay: 0.2s; }
          .dna-node:nth-child(3) { top: 30%; left: 20%; animation-delay: 0.4s; }
          .dna-node:nth-child(4) { top: 30%; left: 80%; animation-delay: 0.6s; }
          .dna-node:nth-child(5) { top: 45%; left: 40%; animation-delay: 0.8s; }
          .dna-node:nth-child(6) { top: 45%; left: 60%; animation-delay: 1s; }
          .dna-node:nth-child(7) { top: 60%; left: 25%; animation-delay: 1.2s; }
          .dna-node:nth-child(8) { top: 60%; left: 75%; animation-delay: 1.4s; }
          .dna-node:nth-child(9) { top: 75%; left: 35%; animation-delay: 1.6s; }
          .dna-node:nth-child(10) { top: 75%; left: 65%; animation-delay: 1.8s; }
          
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(68, 194, 199, 0.7); }
            70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(68, 194, 199, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(68, 194, 199, 0); }
          }
          
          @keyframes pulse-inner {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
          
          .stats-container {
            display: flex;
            justify-content: space-around;
            width: 100%;
            margin-top: 3rem;
            flex-wrap: wrap;
            gap: 2rem;
          }
          
          .stat-item {
            text-align: center;
            flex: 1;
            min-width: 150px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
          }
          
          .stat-item:nth-child(1) { transition-delay: 0.9s; }
          .stat-item:nth-child(2) { transition-delay: 1.1s; }
          .stat-item:nth-child(3) { transition-delay: 1.3s; }
          .stat-item:nth-child(4) { transition-delay: 1.5s; }
          
          .stat-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: #44c2c7;
            margin-bottom: 0.5rem;
          }
          
          .stat-label {
            font-size: 1.1rem;
            color: #555;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          /* Animation when in view */
          .who-we-are.in-view .section-header,
          .who-we-are.in-view .description,
          .who-we-are.in-view .btn-learn-more,
          .who-we-are.in-view .dna-animation,
          .who-we-are.in-view .stat-item {
            opacity: 1;
            transform: translateY(0);
          }
          
          @media (max-width: 992px) {
            .content-container {
              flex-direction: column;
              text-align: center;
            }
            
            .dna-animation {
              order: -1;
            }
            
            .dna-container {
              width: 180px;
              height: 250px;
            }
          }
          
          @media (max-width: 768px) {
            .section-header {
              font-size: 2.2rem;
            }
            
            .description {
              font-size: 1.05rem;
            }
            
            .btn-learn-more {
              padding: 0.7rem 1.8rem;
              font-size: 1rem;
            }
            
            .stats-container {
              flex-direction: column;
              gap: 1.5rem;
            }
          }
        `}
      </style>
      
      <h2 className="section-header">Who We Are</h2>
      
      <div className="content-container">
        <div className="text-content">
          <p className="description">
            <span>CERA MEDICAL</span> is a leading biomedical R&D company in Pakistan dedicated to improving human health through innovative solutions. We develop evidence-based natural health products and provide cutting-edge research services to bridge the gap between laboratory discoveries and real-world health needs.
          </p>
        

        <Link to="/about">
            <button className="btn-learn-more">Learn More</button>
        </Link>

        </div>
        
        <div className="dna-animation">
          <div className="dna-container">
            <div className="dna-strand"></div>
            <div className="dna-node"></div>
            <div className="dna-node"></div>
            <div className="dna-node"></div>
            <div className="dna-node"></div>
            <div className="dna-node"></div>
            <div className="dna-node"></div>
            <div className="dna-node"></div>
            <div className="dna-node"></div>
            <div className="dna-node"></div>
          </div>
        </div>
      </div>
      
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-value">{stats[0]}+</div>
          <div className="stat-label">Years of Experience</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats[1]}+</div>
          <div className="stat-label">Research Projects</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats[2]}+</div>
          <div className="stat-label">Publications</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{stats[3]}+</div>
          <div className="stat-label">Industry Partners</div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;