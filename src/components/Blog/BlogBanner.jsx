import { useEffect, useState } from 'react';

const BlogBanner = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY * 0.2); // Subtle parallax effect
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styles = {
    banner: {
      backgroundColor: '#40d1cf',
      color: '#fff',
      textAlign: 'center',
      padding: '120px 20px',
      position: 'relative',
      overflow: 'hidden',
      transform: `translateY(-${scrollOffset}px)`,
      transition: 'transform 0.3s ease',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    },
    bannerHover: {
      transform: `translateY(-${scrollOffset}px) scale(1.03)`,
    },
    heading: {
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '20px',
      opacity: 0,
      transform: 'translateY(30px)',
      animation: 'fadeInUp 0.8s ease forwards',
    },
    subtext: {
      fontSize: '22px',
      maxWidth: '700px',
      margin: '0 auto 20px',
      opacity: 0,
      transform: 'translateY(20px)',
      animation: 'fadeInUp 0.8s ease 0.2s forwards',
    },
    fillerText: {
      fontSize: '18px',
      maxWidth: '900px',
      margin: '0 auto 30px',
      lineHeight: '1.7',
      opacity: 0,
      transform: 'translateY(20px)',
      animation: 'fadeInUp 0.8s ease 0.4s forwards',
    },
    ctaButton: {
      backgroundColor: '#fff',
      color: '#40d1cf',
      fontSize: '18px',
      fontWeight: 600,
      padding: '14px 32px',
      border: 'none',
      borderRadius: '30px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      opacity: 0,
      transform: 'translateY(20px)',
      animation: 'fadeInUp 0.8s ease 0.6s forwards',
    },
    ctaButtonHover: {
      backgroundColor: '#f0f0f0',
      transform: 'scale(1.05)',
    },
    divider: {
      width: '100px',
      height: '5px',
      backgroundColor: '#fff',
      opacity: '0.7',
      margin: '30px auto',
      borderRadius: '3px',
    },
    '@media (max-width: 600px)': {
      banner: {
        padding: '80px 15px',
      },
      heading: {
        fontSize: '36px',
      },
      subtext: {
        fontSize: '18px',
        maxWidth: '90%',
      },
      fillerText: {
        fontSize: '16px',
        maxWidth: '90%',
      },
      ctaButton: {
        fontSize: '16px',
        padding: '12px 24px',
      },
    },
    '@keyframes fadeInUp': {
      from: {
        opacity: 0,
        transform: 'translateY(30px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  };

  return (
    <div
      style={styles.banner}
      onMouseOver={(e) => (e.currentTarget.style.transform = `translateY(-${scrollOffset}px) scale(1.03)`)}
      onMouseOut={(e) => (e.currentTarget.style.transform = `translateY(-${scrollOffset}px)`)}
    >
      <h1 style={styles.heading}>Welcome to Our Wellness Blog</h1>
      <p style={styles.subtext}>Discover Expert Insights and Natural Health Solutions</p>
      <div style={styles.divider}></div>
      <p style={styles.fillerText}>
        Explore a wealth of knowledge on natural remedies, holistic wellness, and sustainable living. Our blog features in-depth articles, practical tips, and inspiring stories to empower you on your journey to better health. From herbal solutions to mindfulness practices, we’ve got you covered with content designed to uplift and inform.
      </p>
      <button
        style={styles.ctaButton}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = styles.ctaButtonHover.backgroundColor;
          e.currentTarget.style.transform = styles.ctaButtonHover.transform;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = styles.ctaButton.backgroundColor;
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        Start Reading Now
      </button>
    </div>
  );
};

export default BlogBanner;