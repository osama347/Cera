import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { 
  faMicroscope, 
  faVial, 
  faVirus,
  faArrowRight,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

const ServicesSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const controls = useAnimation();

  const services = [
    {
      id: 1,
      title: "Preclinical Studies",
      description: "Ensuring new treatments are safe and effective before human trials",
      icon: faMicroscope
    },
    {
      id: 2,
      title: "Biochemical Testing",
      description: "Detailed lab analysis of compounds and samples for research insights",
      icon: faVial
    },
    {
      id: 3,
      title: "Disease Modeling",
      description: "Simulating health conditions in the lab to test therapies",
      icon: faVirus
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start("visible");
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section 
      ref={sectionRef}
      style={{
        background: 'linear-gradient(to bottom, #f8fdff 0%, #ffffff 100%)',
        padding: '1rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'radial-gradient(#44c2c722 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.3,
        zIndex: 0
      }}></div>
      
      {/* Section content */}
      <motion.div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Section header */}
        <motion.div 
          style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}
          variants={itemVariants}
        >
          <motion.h2 
            style={{
              fontSize: '2.8rem',
              fontWeight: '700',
              color: '#44c2c7',
              marginBottom: '1rem',
              position: 'relative',
              display: 'inline-block'
            }}
          >
            Our Services Highlights
            <motion.div 
              style={{
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                height: '4px',
                background: '#44c2c7',
                borderRadius: '2px'
              }}
              initial={{ width: 0 }}
              animate={inView ? { width: '80px' } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </motion.h2>
          
          <motion.p 
            style={{
              fontSize: '1.2rem',
              color: '#555',
              marginTop: '2.5rem',
              fontWeight: '500',
              maxWidth: '600px',
              margin: '2rem auto 0',
              lineHeight: '1.7'
            }}
            variants={itemVariants}
          >
            Learn more about each on the Services page
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          marginTop: '3rem'
        }}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s ease',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
                padding: '40px 30px',
                borderBottom: '5px solid #44c2c7'
              }}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 50px rgba(68, 194, 199, 0.15)'
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1.5rem',
                color: '#44c2c7',
                height: '60px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <FontAwesomeIcon icon={service.icon} />
              </div>
              
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: '#2a2a2a',
                marginBottom: '1.2rem'
              }}>
                {service.title}
              </h3>
              
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#555',
                marginBottom: '2rem',
                flexGrow: 1
              }}>
                {service.description}
              </p>
              
              <Link to="/services" style={{ textDecoration: 'none' }}>
                <motion.div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontWeight: '600',
                    fontSize: '1.05rem',
                    color: '#44c2c7',
                    cursor: 'pointer',
                    marginTop: 'auto'
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Learn More
                  <FontAwesomeIcon 
                    icon={faChevronRight} 
                    style={{ marginLeft: '8px', fontSize: '0.9rem' }} 
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA button with proper gap */}
        <motion.div 
          style={{ 
            textAlign: 'center', 
            marginTop: '5rem',
            paddingTop: '1rem'
          }}
          variants={itemVariants}
        >
          <Link to="/services" style={{ textDecoration: 'none' }}>
            <motion.button
              style={{
                background: '#44c2c7',
                color: 'white',
                border: 'none',
                marginTop: '3rem',
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '50px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.8rem',
                boxShadow: '0 5px 20px rgba(68, 194, 199, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(68, 194, 199, 0.6)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              View All Services
              <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '0.9rem' }} />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;