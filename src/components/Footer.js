import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <footer id="footer" style={{
      backgroundColor: 'var(--navy)',
      color: 'var(--text)',
      padding: isMobile ? '2rem 1rem' : '3rem 10%',
      textAlign: 'center',
      borderTop: '1px solid rgba(0, 245, 255, 0.1)'
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: isMobile ? '1.75rem' : '2rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: 'var(--cyan)',
          textShadow: '0 0 10px rgba(0, 245, 255, 0.3)'
        }}
      >
        Let's Connect
      </motion.h2>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: isMobile ? '1rem' : '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { label: 'Phone', value: '+92 3337941364', link: 'tel:+923337941364' },
          { label: 'Email', value: 'masadiqbal385@gmail.com', link: 'mailto:masadiqbal385@gmail.com' },
          { label: 'LinkedIn', value: 'muhammad-asad-iqbal', link: 'https://linkedin.com/in/muhammad-asad-iqbal' },
          { label: 'GitHub', value: 'm-asad-iqbal-07', link: 'https://github.com/m-asad-iqbal-07' }
        ].map((item, index) => (
          <ContactItem 
            key={item.label}
            label={item.label}
            value={item.value}
            link={item.link}
            index={index}
            isMobile={isMobile}
          />
        ))}
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          color: 'var(--text)',
          opacity: 0.7,
          fontSize: '0.875rem',
          marginTop: '1rem'
        }}
      >
        © 2025 Muhammad Asad Iqbal. All rights reserved.
      </motion.p>
    </footer>
  );
}

function ContactItem({ label, value, link, index, isMobile }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5,
        scale: 1.05
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'var(--text)',
        width: isMobile ? '120px' : 'auto'
      }}
    >
      <motion.div
        style={{
          width: isMobile ? '50px' : '60px',
          height: isMobile ? '50px' : '60px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 245, 255, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '0.5rem',
          boxShadow: '0 4px 10px rgba(0, 245, 255, 0.2)',
          border: '1px solid rgba(0, 245, 255, 0.3)'
        }}
        whileHover={{
          backgroundColor: 'rgba(0, 245, 255, 0.2)',
          boxShadow: '0 0 15px rgba(0, 245, 255, 0.4)',
          transition: { duration: 0.3 }
        }}
      >
        <span style={{ 
          fontSize: isMobile ? '1.25rem' : '1.5rem',
          color: 'var(--cyan)'
        }}>
          {getIcon(label)}
        </span>
      </motion.div>
      
      <span style={{
        fontWeight: '500',
        fontSize: isMobile ? '0.9rem' : '1rem',
        opacity: 0.9
      }}>
        {value}
      </span>
    </motion.a>
  );
}

function getIcon(label) {
  const icons = {
    'Phone': '📞',
    'Email': '✉️',
    'LinkedIn': '🔗',
    'GitHub': '🐱'
  };
  return icons[label] || '•';
}