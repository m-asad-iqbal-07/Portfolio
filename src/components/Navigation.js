// components/Navigation.js
import React, { useState, useEffect } from 'react';

export default function Navigation() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return React.createElement('nav', {
    style: {
      position: 'fixed',
      width: '100%',
      backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      zIndex: '50',
      padding: '1rem 5%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.3s ease'
    }
  }, [
    React.createElement('a', {
      href: '#',
      style: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: darkMode ? '#10B981' : '#4F46E5',
        textDecoration: 'none'
      }
    }, 'Asad Iqbal'),
    
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
      }
    }, [
      React.createElement('button', {
        onClick: () => setDarkMode(!darkMode),
        style: {
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.25rem',
          color: darkMode ? '#E5E7EB' : '#1F2937'
        }
      }, darkMode ? '☀️' : '🌙'),
      
      // Smooth scroll links
      ...['Home', 'Skills', 'Achievements', 'Projects', 'Contact'].map(item => 
        React.createElement('a', {
          key: item,
          href: `#${item.toLowerCase()}`,
          onClick: (e) => {
            e.preventDefault();
            document.getElementById(item.toLowerCase()).scrollIntoView({
              behavior: 'smooth'
            });
          },
          style: {
            color: darkMode ? '#E5E7EB' : '#1F2937',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'color 0.2s ease',
            ':hover': {
              color: darkMode ? '#10B981' : '#4F46E5'
            }
          }
        }, item)
      )
    ])
  ]);
}