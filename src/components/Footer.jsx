import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer" style={styles.footer}>
      <div className="footer-content" style={styles.footerContent}>
        {/* Company Info */}
        <div className="footer-section" style={styles.footerSection}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="footer-logo" style={styles.footerLogo}>
              <span style={{ color: '#44c2c7' }}>CERA</span> MEDICAL
            </h2>
            <p className="company-tagline" style={styles.companyTagline}>
              Advancing Health through Rigorous Research and Innovative Solutions
            </p>
          </motion.div>
        </div>

        {/* Quick Links */}
        <div className="footer-section" style={styles.footerSection}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="footer-heading" style={styles.footerHeading}>Quick Links</h3>
            <ul className="footer-links" style={styles.footerLinks}>
              <li style={styles.linkItem}>
                <Link to="/about" style={styles.link}>About Us</Link>
              </li>
              <li style={styles.linkItem}>
                <Link to="/services" style={styles.link}>Services</Link>
              </li>
              <li style={styles.linkItem}>
                <Link to="/products" style={styles.link}>Products</Link>
              </li>
              <li style={styles.linkItem}>
                <Link to="/blog" style={styles.link}>Blog</Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Products */}
        <div className="footer-section" style={styles.footerSection}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="footer-heading" style={styles.footerHeading}>Products</h3>
            <ul className="footer-links" style={styles.footerLinks}>
              <li style={styles.linkItem}>
                <Link to="/products/mossent" style={styles.link}>Mossent</Link>
              </li>
              <li style={styles.linkItem}>
                <Link to="/products/activ-p" style={styles.link}>Activ-P</Link>
              </li>
              <li style={styles.linkItem}>
                <Link to="/products/zest" style={styles.link}>Zest</Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Contact Info */}
        <div className="footer-section" style={styles.footerSection}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="footer-heading" style={styles.footerHeading}>Contact Info</h3>
            <ul className="footer-contact" style={styles.footerContact}>
              <li style={styles.contactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#44c2c7" viewBox="0 0 16 16" style={styles.contactIcon}>
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                <span>PAF-IAST Mang Haripur Pakistan</span>
              </li>
              <li style={styles.contactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#44c2c7" viewBox="0 0 16 16" style={styles.contactIcon}>
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                </svg>
                <span>medicalcera@gmail.com</span>
              </li>
              <li style={styles.contactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#44c2c7" viewBox="0 0 16 16" style={styles.contactIcon}>
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                </svg>
                <span>+92-3409052244</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright" style={styles.copyright}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p style={styles.copyrightText}>
            © 2024 CERA MEDICAL. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

// CSS Styles
const styles = {
  footer: {
    backgroundColor: '#0a2540',
    color: '#fff',
    padding: '4rem 2rem 0',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    maxWidth: '1200px',
    margin: '0 auto',
    paddingBottom: '3rem'
  },
  footerSection: {
    padding: '0.5rem'
  },
  footerLogo: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    letterSpacing: '0.5px'
  },
  companyTagline: {
    color: '#a0b1c5',
    lineHeight: '1.6',
    fontSize: '1rem',
    maxWidth: '300px'
  },
  footerHeading: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    position: 'relative',
    paddingBottom: '0.5rem'
  },
  footerLinks: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  linkItem: {
    marginBottom: '0.8rem'
  },
  link: {
    color: '#e0e7f3',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    position: 'relative',
    paddingBottom: '2px'
  },
  footerContact: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '1.2rem',
    fontSize: '1rem',
    lineHeight: '1.5'
  },
  contactIcon: {
    marginRight: '12px',
    minWidth: '20px',
    marginTop: '4px'
  },
  copyright: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1.5rem 0',
    textAlign: 'center'
  },
  copyrightText: {
    color: '#a0b1c5',
    fontSize: '0.9rem',
    margin: '0'
  },
  '@media (max-width: 768px)': {
    footerContent: {
      gridTemplateColumns: '1fr',
      gap: '2rem'
    },
    footerSection: {
      textAlign: 'center'
    },
    companyTagline: {
      maxWidth: '100%',
      margin: '0 auto'
    },
    footerLinks: {
      display: 'inline-block',
      textAlign: 'left'
    },
    footerContact: {
      display: 'inline-block',
      textAlign: 'left'
    },
    contactItem: {
      justifyContent: 'center'
    }
  },
  '@media (max-width: 480px)': {
    footer: {
      padding: '3rem 1.5rem 0'
    },
    footerLogo: {
      fontSize: '1.5rem'
    },
    footerHeading: {
      fontSize: '1.2rem'
    }
  }
};

export default Footer;