import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartSystem'; // Updated path

const TopBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Team', path: '/ourteam' }, // Fixed from /OurTeam to /ourteam
    { name: 'Contact Us', path: '/contact' },
    { name: 'Cart', path: '/cart', icon: (
      <div style={{ position: 'relative' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {getCartCount() > 0 && (
          <span style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            background: '#ff4444',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px'
          }}>
            {getCartCount()}
          </span>
        )}
      </div>
    )}
  ];

  return (
    <>
      <style>
        {`
          .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 5%;
            background-color: #fff;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
            position: fixed;
            width: 100%;
            top: 0;
            height: 5rem;
            z-index: 1000;
            transition: all 0.4s ease;
            box-sizing: border-box;
          }
          
          .top-bar.scrolled {
            padding: 0.8rem 5%;
            background-color: #44c2c7;
          }
          
          .logo-container {
            display: flex;
            align-items: center;
            flex-shrink: 0;
            height: 40px;
          }
          
          .logo-img {
            height: 100%;
            max-width: 180px;
            object-fit: contain;
            transition: all 0.3s ease;
          }
          
          .scrolled .logo-img {
            filter: brightness(0) invert(1);
          }
          
          .nav-container {
            display: flex;
            gap: 1.8rem;
            overflow-x: auto;
            -ms-overflow-style: none;
            scrollbar-width: none;
            padding: 0 0.5rem;
          }
          
          .nav-container::-webkit-scrollbar {
            display: none;
          }
          
          .nav-item {
            position: relative;
            font-weight: 500;
            color: #333;
            text-transform: capitalize;
            transition: all 0.3s ease;
            padding: 0.5rem 0;
            white-space: nowrap;
            flex-shrink: 0;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .scrolled .nav-item {
            color: rgba(255, 255, 255, 0.85);
          }
          
          .nav-item:hover {
            color: #44c2c7;
          }
          
          .scrolled .nav-item:hover {
            color: white;
          }
          
          .nav-item.active {
            color: #44c2c7;
            font-weight: 600;
          }
          
          .scrolled .nav-item.active {
            color: white;
          }
          
          .underline {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #44c2c7;
            transition: width 0.3s ease;
          }
          
          .scrolled .underline {
            background-color: white;
          }
          
          .nav-item:hover .underline,
          .nav-item.active .underline {
            width: 100%;
          }
          
          @keyframes slideDown {
            from {
              transform: translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .top-bar {
            animation: slideDown 0.5s ease-out forwards;
          }
          
          .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #44c2c7;
            z-index: 1001;
          }
          
          .scrolled .mobile-menu-btn {
            color: white;
          }
          
          .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 998;
            display: none;
          }
          
          .mobile-menu-overlay.visible {
            display: block;
          }
          
          @media (max-width: 768px) {
            .nav-container {
              position: fixed;
              top: 0;
              right: ${mobileMenuOpen ? '0' : '-100%'};
              height: 100vh;
              width: 70%;
              background: white;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              padding-top: 5rem;
              gap: 2rem;
              transition: right 0.4s ease;
              z-index: 999;
              box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
            }
            
            .scrolled .nav-container {
              background: #44c2c7;
            }
            
            .mobile-menu-btn {
              display: block;
            }
            
            .mobile-menu-overlay.visible {
              display: block;
            }
            
            .top-bar {
              padding: 1rem 5%;
            }
            
            .top-bar.scrolled {
              padding: 0.7rem 5%;
            }
          }
          
          @media (max-width: 480px) {
            .nav-container {
              width: 85%;
            }
          }
        `}
      </style>

      <header className={`top-bar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo-container">
          <NavLink to="/">
            <img 
              src="/Cera logo.png" 
              alt="CERA Medical Logo" 
              className="logo-img" 
            />
          </NavLink>
        </div>
        
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        
        <div 
          className={`mobile-menu-overlay ${mobileMenuOpen ? 'visible' : ''}`} 
          onClick={() => setMobileMenuOpen(false)}
        />
        
        <nav className={`nav-container ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => {
                if (isMobile) {
                  setMobileMenuOpen(false);
                }
              }}
            >
              {item.icon ? item.icon : item.name}
              {!item.icon && <span className="underline"></span>}
            </NavLink>
          ))}
        </nav>
      </header>
    </>
  );
};

export default TopBar;