import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const achievements = [
  {
    id: 1,
    title: "Hackathon Participant — Code'x24",
    organization: "NAMAL University",
    date: "Feb 2023",
    location: "Mianwali, Pakistan",
    highlights: [
      "Collaborated in a team to design and develop a Graphics solution under time constraints",
      "Presented technical solutions to judges, receiving feedback on creativity and execution"
    ],
    icon: "🏆",
    color: "#4F46E5",
    certificate: "./assets/image.png"
  },
  {
    id: 2,
    title: "Organizer — NextGen Society",
    organization: "University of Mianwali",
    date: "Jan 2025 – Present",
    location: "Mianwali, Pakistan",
    highlights: [
      "Organized programming & graphic design competitions for 50+ participants",
      "Judged submissions based on technical proficiency and creativity"
    ],
    icon: "📢",
    color: "#10B981",
    certificate: "nextgen-certificate.jpg"
  },
  {
    id: 3,
    title: "Participant — ICT-24 Conference",
    organization: "University of Mianwali",
    date: "Dec 2024",
    location: "Mianwali, Pakistan",
    highlights: [
      "Attended workshops on emerging trends in science and IT",
      "Engaged in discussions about ethical AI solutions",
      "Gained insights into data-driven research methodologies"
    ],
    icon: "🌐",
    color: "#EC4899",
    certificate: "ict24-certificate.jpg"
  },
  {
    id: 4,
    title: "Frontiers in Computational Intelligence Conference",
    organization: "University of Mianwali",
    date: "Feb 2025",
    location: "Mianwali, Pakistan",
    highlights: [
      "Participated in AI and machine learning sessions",
      "Networked with researchers about computational models"
    ],
    icon: "🧠",
    color: "#F59E0B",
    certificate: "frontiers-certificate.jpg"
  }
];

export default function Achievements() {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCertificateNavigation = (newIndex) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  const navigateCertificates = (increment) => {
    const newIndex = (currentIndex + increment + achievements.length) % achievements.length;
    handleCertificateNavigation(newIndex);
  };

  return React.createElement(React.Fragment, null, [
    // Achievements Grid
    React.createElement('section', {
      id: 'achievements',
      style: {
        padding: isMobile ? '3rem 1rem' : '5rem 10%',
        backgroundColor: '#F8FAFC'
      }
    }, [
      React.createElement('h2', {
        style: {
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#1F2937',
          marginBottom: '3rem',
          textAlign: 'center',
          position: 'relative',
          ':after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
            borderRadius: '2px'
          }
        }
      }, 'Key Achievements'),
      
      // First Row (2 cards)
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: '2rem',
          marginBottom: '2rem',
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'flex-start'
        }
      }, achievements.slice(0, 2).map((achievement) => 
        createAchievementCard(achievement, setActiveCertificate, () => {
          handleCertificateNavigation(achievement.id - 1);
        }, isMobile)
      )),
      
      // Second Row (2 cards)
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'flex-start'
        }
      }, achievements.slice(2, 4).map((achievement) => 
        createAchievementCard(achievement, setActiveCertificate, () => {
          handleCertificateNavigation(achievement.id - 1);
        }, isMobile)
      ))
    ]),
    
    // Certificate Modal
    React.createElement(AnimatePresence, { custom: direction }, [
      activeCertificate && React.createElement(motion.div, {
        key: 'modal',
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        style: {
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: '1000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: isMobile ? '0' : '2rem'
        },
        onClick: () => setActiveCertificate(null)
      }, [
        React.createElement(motion.div, {
          style: {
            position: 'relative',
            width: isMobile ? '100%' : '90%',
            height: isMobile ? '100%' : '90%',
            backgroundColor: '#FFFFFF',
            borderRadius: isMobile ? '0' : '0.5rem',
            overflow: 'hidden'
          },
          onClick: (e) => e.stopPropagation()
        }, [
          // Navigation Arrows
          React.createElement('button', {
            style: {
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.8)',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: '10',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            },
            onClick: (e) => {
              e.stopPropagation();
              navigateCertificates(-1);
            }
          }, '❮'),
          
          React.createElement('button', {
            style: {
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.8)',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: '10',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            },
            onClick: (e) => {
              e.stopPropagation();
              navigateCertificates(1);
            }
          }, '❯'),
          
          // Close Button
          React.createElement('button', {
            style: {
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.5)',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: '10',
              color: 'white'
            },
            onClick: () => setActiveCertificate(null)
          }, '×'),
          
          // Animated Certificate (only the image)
          React.createElement(motion.div, {
            key: currentIndex,
            custom: direction,
            initial: { opacity: 0, x: direction > 0 ? 100 : -100 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: direction > 0 ? -100 : 100 },
            transition: { duration: 0.3 },
            style: {
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isMobile ? '1rem' : '2rem'
            }
          }, [
            React.createElement('img', {
              src: achievements[currentIndex].certificate,
              style: {
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                display: 'block'
              },
              alt: `${achievements[currentIndex].title} Certificate`
            })
          ])
        ])
      ])
    ])
  ]);
}

function createAchievementCard(achievement, setActiveCertificate, handleClick, isMobile) {
  return React.createElement(motion.div, {
    key: achievement.id,
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.1, delay: achievement.id * 0.1 },
    style: {
      width: isMobile ? '100%' : '100%',
      maxWidth: '500px',
      backgroundColor: '#FFFFFF',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.1s ease'
    },
    whileHover: {
      y: -5,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)'
    }
  }, [
    React.createElement('div', {
      style: {
        backgroundColor: achievement.color,
        padding: '1.5rem',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }
    }, [
      React.createElement('div', {
        style: {
          fontSize: '2rem',
          width: '60px',
          height: '60px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, achievement.icon),
      
      React.createElement('div', null, [
        React.createElement('h3', {
          style: {
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '0.25rem'
          }
        }, achievement.title),
        React.createElement('p', {
          style: {
            fontSize: '0.875rem',
            opacity: '0.9'
          }
        }, achievement.organization)
      ])
    ]),
    
    React.createElement('div', {
      style: {
        padding: '1.5rem'
      }
    }, [
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          color: '#6B7280',
          fontSize: '0.875rem'
        }
      }, [
        React.createElement('span', null, achievement.date),
        React.createElement('span', null, achievement.location)
      ]),
      
      React.createElement('ul', {
        style: {
          listStyleType: 'none',
          paddingLeft: '0',
          marginBottom: '1.5rem'
        }
      }, achievement.highlights.map((highlight, i) => 
        React.createElement('li', {
          key: i,
          style: {
            position: 'relative',
            paddingLeft: '1.5rem',
            marginBottom: '0.75rem',
            color: '#4B5563',
            ':before': {
              content: '"•"',
              position: 'absolute',
              left: '0',
              color: achievement.color,
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }
          }
        }, highlight)
      )),
      
      achievement.certificate && React.createElement(motion.button, {
        style: {
          padding: '0.5rem 1rem',
          backgroundColor: achievement.color,
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1rem'
        },
        whileHover: {
          scale: 1.05,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        },
        whileTap: {
          scale: 0.95
        },
        onClick: handleClick
      }, [
        React.createElement('span', null, 'View Certificate'),
        React.createElement('span', null, '📜')
      ])
    ])
  ]);
}