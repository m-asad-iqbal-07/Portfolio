import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToFooter = (e) => {
    e.preventDefault();
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'var(--navy)',
      boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
      padding: isMobile ? '1rem' : '1.5rem 2rem',
      borderBottom: '1px solid rgba(0, 245, 255, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <motion.a 
          href="#"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          style={{
            fontSize: isMobile ? '1.5rem' : '2rem',
            fontWeight: '700',
            color: 'var(--text)',
            textDecoration: 'none',
            textShadow: '0 2px 4px rgba(0, 245, 255, 0.3)'
          }}
        >
          Asad Iqbal
        </motion.a>
        
        {isMobile ? (
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--cyan)'
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </motion.button>
        ) : (
          <nav style={{
            display: 'flex',
            gap: '2rem'
          }}>
            {['Home', 'Skills', 'Achievements', 'Projects'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  scale: 1.1,
                  color: 'var(--cyan)',
                  textShadow: '0 0 8px rgba(0, 245, 255, 0.5)'
                }}
                style={{
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1rem',
                  padding: '0.5rem 0',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
              >
                {item}
                <motion.span
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '2px',
                    background: 'var(--cyan)',
                    borderRadius: '2px'
                  }}
                />
              </motion.a>
            ))}
            {/* Separate Contact link with special handling */}
            <motion.a 
              href="#footer"
              onClick={scrollToFooter}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                scale: 1.1,
                color: 'var(--green)',
                textShadow: '0 0 8px rgba(0, 255, 194, 0.5)'
              }}
              style={{
                color: 'var(--text)',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                padding: '0.5rem 0',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
            >
              Contact
              <motion.span
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '2px',
                  background: 'var(--green)',
                  borderRadius: '2px'
                }}
              />
            </motion.a>
          </nav>
        )}

        {/* Mobile Menu */}
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--navy)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderTop: '1px solid rgba(0, 245, 255, 0.1)',
              borderBottom: '1px solid rgba(0, 245, 255, 0.1)'
            }}
          >
            {['Home', 'Skills', 'Achievements', 'Projects'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.95 }}
                style={{
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(0, 245, 255, 0.05)',
                  border: '1px solid rgba(0, 245, 255, 0.1)'
                }}
                whileHover={{
                  background: 'rgba(0, 245, 255, 0.1)',
                  color: 'var(--cyan)'
                }}
              >
                {item}
              </motion.a>
            ))}
            {/* Mobile Contact link with special handling */}
            <motion.a 
              href="#footer"
              onClick={scrollToFooter}
              whileTap={{ scale: 0.95 }}
              style={{
                color: 'var(--text)',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                background: 'rgba(0, 255, 194, 0.05)',
                border: '1px solid rgba(0, 255, 194, 0.1)'
              }}
              whileHover={{
                background: 'rgba(0, 255, 194, 0.1)',
                color: 'var(--green)'
              }}
            >
              Contact
            </motion.a>
          </motion.div>
        )}
      </div>
    </header>
  );
}

export default Header;