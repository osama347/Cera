import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const styles = {
    section: {
      margin: '3rem auto',
      padding: '0 1.5rem',
      position: 'relative',
      maxWidth: '1400px',
      fontFamily: "'Nunito', sans-serif",
    },
    header: {
      textAlign: 'center',
      marginBottom: '3.5rem',
    },
    title: {
      fontSize: '3rem',
      fontWeight: '800',
      color: '#44c2c7',
      marginBottom: '1.2rem',
      position: 'relative',
      display: 'inline-block',
    },
    titleUnderline: {
      position: 'absolute',
      bottom: '-15px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: inView ? '100px' : '0',
      height: '5px',
      background: '#44c2c7',
      borderRadius: '3px',
      transition: 'width 0.8s ease 0.4s',
    },
    subtitle: {
      fontSize: '1.3rem',
      color: '#555',
      marginTop: '2.5rem',
      fontWeight: '500',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2.5rem',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    contactInfo: {
      background: 'white',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '600px',
    },
    contactCard: {
      marginBottom: '2rem',
      padding: '1rem',
      borderLeft: '4px solid #44c2c7',
      borderRadius: '5px',
    },
    contactName: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#2a2a2a',
      marginBottom: '0.8rem',
    },
    contactDetail: {
      fontSize: '1.1rem',
      color: '#555',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem',
    },
    mapWrapper: {
      marginTop: 'auto',
      borderRadius: '20px',
      overflow: 'hidden',
      height: '500px', // Large map
      border: '3px solid #e0e0e0',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
    },
    availability: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#44c2c7',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    '@media (max-width: 768px)': {
      container: {
        maxWidth: '90%',
      },
      contactInfo: {
        padding: '2rem',
        maxWidth: '100%',
      },
      mapWrapper: {
        height: '350px', // Adjusted for mobile
      },
      title: {
        fontSize: '2.5rem',
      },
      subtitle: {
        fontSize: '1.1rem',
      },
    },
  };

  const contact = {
    name: 'Habab Ali Ahmad',
    email: 'habab.ali@example.com',
    phone: '+92 300 987 6543',
  };

  return (
    <section ref={sectionRef} style={styles.section} itemScope itemType="http://schema.org/ContactPage">
      <div style={styles.header}>
        <h2 style={styles.title}>
          Contact Us
          <div style={styles.titleUnderline} />
        </h2>
        <p style={styles.subtitle}>
          We’re available 24/7! Reach out to our team for any queries or support.
        </p>
      </div>

      <div style={styles.container}>
        <motion.div
          style={styles.contactInfo}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#2a2a2a', marginBottom: '1.8rem' }}>
            Our Team
          </h3>
          <p style={styles.availability}>Available 24/7 for your queries!</p>
          <div style={styles.contactCard}>
            <div style={styles.contactName}>{contact.name}</div>
            <div style={styles.contactDetail}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#555" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-6.297 3.778a1 1 0 0 1-1.406 0L1 5.383V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5.383z"/>
              </svg>
              {contact.email}
            </div>
            <div style={styles.contactDetail}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#555" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z"/>
              </svg>
              {contact.phone}
            </div>
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#2a2a2a', marginBottom: '1.5rem' }}>
            Our Location
          </h3>
          <div style={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1657.1172918131725!2d72.93377631513193!3d33.99459498061684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e12b7f8c3f2b2b%3A0x7b3e3e3e3e3e3e3e!2sPAF-IAST%20(Pak-Austria%20Fachhochschule%20Institute%20of%20Applied%20Sciences%20and%20Technology)!5e0!3m2!1sen!2s!4v1698765432109!5m2!1sen!2s&zoom=17&t=m&marker=title:PAF-IAST|33.99459498061684,72.93377631513193"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;