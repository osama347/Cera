// InstitutionalPartners.jsx
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import '../AboutUs/Partners.css';

const InstitutionalPartners = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  // Header animation
  const headerAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    config: { tension: 120, friction: 14 }
  });

  // Logo container animation
  const containerAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    delay: 300,
    config: { tension: 180, friction: 12 }
  });

  // Partner data with logo placeholders
  const partners = [
    {
      id: 1,
      name: "Pak-Austria Fachhochschule Institute of Applied Sciences and Technology",
      location: "Haripur, PK",
      logo: "/PAF-IAST Logo.png"
    },
    {
      id: 2,
      name: "National Institutes of Health",
      location: "Islamabad, PK",
      logo: "/NIHBG.png"
    }
  ];

  return (
    <div className="institutional-partners">
      <div className="container">
        <animated.div 
          className="section-header"
          style={headerAnimation}
        >
          <h2>Institutional Partners</h2>
          <p>We are proud to collaborate with renowned institutions</p>
          <div className="divider"></div>
        </animated.div>
        
        <animated.div 
          className="partners-grid"
          style={containerAnimation}
        >
          {partners.map((partner) => (
            <div 
              key={partner.id}
              className="partner-card"
            >
              <div className="logo-container">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="partner-logo"
                />
              </div>
              <div className="partner-info">
                <h3>{partner.name}</h3>
                <p>{partner.location}</p>
              </div>
            </div>
          ))}
        </animated.div>
      </div>
    </div>
  );
};

export default InstitutionalPartners;