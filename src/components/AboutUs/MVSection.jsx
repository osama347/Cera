import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './MVSection.css';

const MissionVisionBackground = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const containerAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    config: { tension: 120, friction: 14 },
  });

  const backgroundAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
    delay: 300,
    config: { tension: 180, friction: 12 },
  });

  const missionAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
    delay: 500,
    config: { tension: 180, friction: 12 },
  });

  const visionAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
    delay: 700,
    config: { tension: 180, friction: 12 },
  });

  return (
    <div className="mission-vision-background">
      <animated.div className="container" style={containerAnimation}>
        <div className="section-header">
          <h2>Our Foundation</h2>
          <div className="divider"></div>
        </div>

        <div className="cards-layout">
          <animated.div className="card background-card" style={backgroundAnimation}>
            <div className="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                <path d="M12 6v12"/>
                <path d="M6 12h12"/>
              </svg>
            </div>
            <h3>CERA MEDICAL Origins</h3>
            <p>
              CERA MEDICAL pioneers preclinical research in Pakistan, specializing in rigorous drug discovery and development. Unlike traditional CROs, we integrate computational modeling with in-vivo testing to accelerate timelines and reduce costs. Founded in 2020 by molecular biologists and data scientists, we’ve partnered with global biotech firms to deliver precise, data-driven results for novel therapies.
            </p>
          </animated.div>

          <div className="bottom-cards">
            <animated.div className="card mission-card" style={missionAnimation}>
              <div className="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 002-2v-4M17 8l-5-5-5 5M12 4.2v10.3"/>
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                We streamline drug development by delivering precise preclinical data, enabling biotech firms to bring life-saving therapies to market faster and more affordably.
              </p>
            </animated.div>

            <animated.div className="card vision-card" style={visionAnimation}>
              <div className="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2a10 10 0 00-9 6 10 10 0 0018 0 10 10 0 00-9-6zm0 12a4 4 0 110-8 4 4 0 010 8z"/>
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To redefine preclinical research by merging cutting-edge science and technology, making Pakistan a global hub for biotech innovation and improving lives worldwide.
              </p>
            </animated.div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default MissionVisionBackground;