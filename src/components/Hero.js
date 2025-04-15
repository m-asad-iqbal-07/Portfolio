import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CV from './assets/CV.pdf';
import profileImage from './assets/image.png';

const roles = [
  "Software Engineer",
  "AI Enthusiast",
  "Full-Stack Developer",
  "Open Source Contributor"
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = roles[currentRole];
      
      if (isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length - 1));
      } else {
        setDisplayText(fullText.substring(0, displayText.length + 1));
      }

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = CV;
    link.download = 'Asad_Iqbal_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactClick = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '2rem 1rem' : '0 10%',
        background: 'var(--navy)',
        gap: isMobile ? '2rem' : '0',
        textAlign: 'center',
        color: 'var(--text)'
      }}
    >
      {/* Image Section - Comes first on mobile */}
      <motion.div 
        style={{
          order: isMobile ? 0 : 1,
          paddingTop:'50px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: isMobile ? '100%' : '50%',
          padding: isMobile ? '0' : '2rem',
          margin: '0 auto'
        }}
        initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          style={{
            width: isMobile ? '320px' : '420px',
            height: isMobile ? '320px' : '420px',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            background: 'linear-gradient(145deg, var(--cyan) 0%, var(--green) 100%)',
            animation: 'morph 8s ease-in-out infinite',
            boxShadow: '0 20px 40px rgba(0, 245, 255, 0.2)',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            border: '2px solid rgba(0, 245, 255, 0.3)'
          }}
          whileHover={!isMobile ? { scale: 1.02 } : {}}
        >
          <img
            src={profileImage}
            alt="Muhammad Asad Iqbal"
            style={{
              width: '110%',
              height: '110%',
              objectFit: 'cover',
              objectPosition: 'center top',
              borderRadius: 'inherit',
              position: 'absolute',
              top: '-5%',
              left: '-5%'
            }}
          />
        </motion.div>
        
        {/* Floating tech icons */}
        {!isMobile && (
          <>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                position: 'absolute',
                top: '15%',
                left: '5%',
                width: '80px',
                height: '80px',
                backgroundColor: 'var(--card)',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                animation: 'float 6s ease-in-out infinite',
                border: '1px solid rgba(0, 245, 255, 0.2)'
              }}
              whileHover={{ scale: 1.1, rotate: 20 }}
            >
              ⚛️
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{
                position: 'absolute',
                top: '70%',
                right: '5%',
                width: '60px',
                height: '60px',
                backgroundColor: 'var(--card)',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                animation: 'float 4s ease-in-out infinite 2s',
                border: '1px solid rgba(0, 255, 194, 0.2)'
              }}
              whileHover={{ scale: 1.1, rotate: -20 }}
            >
              🐍
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Text Content - Comes second on mobile */}
      <motion.div
        style={{
          order: isMobile ? 1 : 0,
          width: isMobile ? '100%' : '50%',
          padding: isMobile ? '0' : '2rem',
          margin: '0 auto',
          maxWidth: '600px'
        }}
        initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          style={{
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: '700',
            color: 'var(--text)',
            marginBottom: '1.5rem',
            textAlign: isMobile ? 'center' : 'left',
            textShadow: '0 2px 10px rgba(0, 245, 255, 0.3)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Muhammad Asad Iqbal
        </motion.h1>
        
        <div style={{ 
          height: isMobile ? '3rem' : '4rem', 
          marginBottom: '1.5rem',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <motion.h2
            style={{
              fontSize: isMobile ? '1.5rem' : '1.75rem',
              color: 'var(--cyan)',
              fontWeight: '600'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {displayText}<span style={{ color: 'var(--green)' }}>{isDeleting ? '' : '|'}</span>
          </motion.h2>
        </div>
        
        <motion.p
          style={{
            fontSize: isMobile ? '1.1rem' : '1.25rem',
            color: 'var(--text)',
            opacity: 0.9,
            maxWidth: '600px',
            marginBottom: '2.5rem',
            textAlign: isMobile ? 'center' : 'left',
            lineHeight: '1.6'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          8th semester Software Engineering student at University of Mianwali with a 3.41 CGPA. Passionate about building innovative solutions through code.
        </motion.p>
        
        <motion.div
  style={{ 
    display: 'flex', 
    gap: '1rem',
    justifyContent: isMobile ? 'center' : 'flex-start',
    flexWrap: 'wrap'
  }}
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ delay: 0.8, duration: 0.6 }}
>
  <motion.button
    whileHover={{ 
      scale: 1.05, 
      boxShadow: '0 8px 20px rgba(0, 245, 255, 0.4)',
      backgroundColor: 'var(--cyan)',
      color: '#000000' // Black text on hover
    }}
    whileTap={{ scale: 0.95 }}
    onClick={handleDownloadCV}
    style={{
      padding: isMobile ? '0.6rem 1.2rem' : '0.75rem 1.5rem',
      backgroundColor: 'rgba(0, 245, 255, 0.1)',
      color: 'var(--cyan)',
      border: '1px solid var(--cyan)',
      borderRadius: '0.5rem',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(0, 245, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s ease'
    }}
  >
    Download CV
    <span style={{ marginLeft: '0.5rem', color: 'inherit' }}>📄</span>
  </motion.button>
  
  <motion.button
    whileHover={{ 
      scale: 1.05, 
      boxShadow: '0 8px 20px rgba(0, 255, 194, 0.4)',
      backgroundColor: 'var(--green)',
      color: '#000000' // Black text on hover
    }}
    whileTap={{ scale: 0.95 }}
    onClick={handleContactClick}
    style={{
      padding: isMobile ? '0.6rem 1.2rem' : '0.75rem 1.5rem',
      backgroundColor: 'rgba(0, 255, 194, 0.1)',
      color: 'var(--green)',
      border: '1px solid var(--green)',
      borderRadius: '0.5rem',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(0, 255, 194, 0.2)',
      transition: 'all 0.3s ease'
    }}
  >
    Contact Me
  </motion.button>
</motion.div>
      </motion.div>
    </section>
  );
}