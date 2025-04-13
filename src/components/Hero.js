// components/Hero.js
import React, { useState, useEffect } from 'react';

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

  return React.createElement('section', {
    id: 'home',
    style: {
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      padding: '0 10%',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F4F8 100%)'
    }
  }, [
    // Left content
    React.createElement('div', {
      key: 'left'
    }, [
      React.createElement('h1', {
        style: {
          fontSize: '3.5rem',
          fontWeight: '700',
          background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          marginBottom: '1.5rem'
        }
      }, 'Muhammad Asad Iqbal'),
      
      React.createElement('div', {
        style: {
          height: '4rem',
          marginBottom: '1.5rem'
        }
      }, React.createElement('h2', {
        style: {
          fontSize: '1.75rem',
          color: '#4B5563',
          fontWeight: '600'
        }
      }, `${displayText}${isDeleting ? '' : '|'}`)),
      
      React.createElement('p', {
        style: {
          fontSize: '1.25rem',
          color: '#6B7280',
          maxWidth: '600px',
          marginBottom: '2.5rem'
        }
      }, '8th semester Software Engineering student at University of Mianwali with a 3.41 CGPA. Passionate about building innovative solutions through code.'),
      
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: '1rem'
        }
      }, [
        createButton('View Projects', '#4F46E5', () => {
          document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }),
        createButton('Contact Me', '#10B981', () => {
          document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        })
      ])
    ]),
    
    // Right content
    React.createElement('div', {
      key: 'right',
      style: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }
    }, [
      React.createElement('div', {
        style: {
          width: '400px',
          height: '400px',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          background: 'linear-gradient(145deg, #4F46E5 0%, #10B981 100%)',
          animation: 'morph 8s ease-in-out infinite',
          boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)'
        }
      }, [
        React.createElement('img', {
          src: '..\assets\image.png',
          alt: 'Muhammad Asad Iqbal',
          style: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'inherit',
            mixBlendMode: 'multiply',
            filter: 'grayscale(100%) contrast(1)',
            opacity: '0.8'
          }
        })
      ]),
      
      // Floating tech icons
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: '20%',
          left: '-50px',
          width: '80px',
          height: '80px',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          animation: 'float 6s ease-in-out infinite'
        }
      }, '⚛️'),
      
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: '10%',
          right: '-30px',
          width: '60px',
          height: '60px',
          backgroundColor: '#FFFFFF',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          animation: 'float 4s ease-in-out infinite 2s'
        }
      }, '🐍')
    ])
  ]);
}

function createButton(text, color, onClick) {
  return React.createElement('button', {
    onClick,
    style: {
      padding: '0.75rem 1.5rem',
      backgroundColor: color,
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: `0 4px 6px ${color}40`,
      ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: `0 6px 12px ${color}60`
      }
    }
  }, text);
}