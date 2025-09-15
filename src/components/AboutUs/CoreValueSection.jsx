// CoreValuesSection.jsx
import React from 'react';
import '../AboutUs/CoreValueSection.css';

const CoreValuesSection = () => {
  const values = [
    {
      title: "Scientific Excellence",
      description: "Commitment to the highest standards of research and development",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1112 6.006a5 5 0 117.5 6.572" />
          <path d="M12 13l-1.5-1.5" />
          <path d="M16.5 8.5V7a4 4 0 00-4-4v0a4 4 0 00-4 4v1.5" />
          <path d="M9 10h6" />
        </svg>
      )
    },
    {
      title: "Innovation",
      description: "Pioneering new solutions for better health outcomes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2v4" />
          <path d="M5.5 5.5l3 3" />
          <path d="M2 12h4" />
          <path d="M5.5 18.5l3-3" />
          <path d="M12 22v-4" />
          <path d="M18.5 18.5l-3-3" />
          <path d="M22 12h-4" />
          <path d="M18.5 5.5l-3 3" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      )
    },
    {
      title: "Collaboration",
      description: "Working together with partners to achieve common goals",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      )
    },
    {
      title: "Integrity",
      description: "Maintaining ethical standards in all our endeavors",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9.5 9.5l5 5" />
          <path d="M14.5 9.5l-5 5" />
        </svg>
      )
    }
  ];

  return (
    <div className="core-values-section">
      <div className="section-header">
        <h2>Core Values</h2>
        <p>The principles that guide everything we do</p>
        <div className="divider"></div>
      </div>
      
      <div className="values-container">
        {values.map((value, index) => (
          <div 
            key={index}
            className="value-card"
          >
            <div className="icon-wrapper">
              {value.icon}
            </div>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreValuesSection;