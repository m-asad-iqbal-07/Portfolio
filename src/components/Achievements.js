import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Certificate images
const certificates = {
  codex24: require('./assets/image.png'),
  nextgen: require('./assets/image.png'),
  ict24: require('./assets/image.png'),
  frontiers: require('./assets/image.png')
};

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
    certificate: certificates.codex24
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
    color: "#4F46E5",
    certificate: certificates.nextgen
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
    color: "#10B981",
    certificate: certificates.ict24
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
    color: "#10B981",
    certificate: certificates.frontiers
  }
];

export default function Achievements() {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [direction, setDirection] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
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

  const showCertificate = (index) => {
    setCurrentIndex(index);
    setActiveCertificate(true);
  };

  return (
    <>
      {/* Achievements Grid */}
      <section 
        id="achievements" 
        ref={sectionRef}
        style={{
          padding: isMobile ? '2rem 1rem' : '5rem 10%',
          backgroundColor: '#F8FAFC',
          overflow: 'hidden'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: isMobile ? '2rem' : '3rem',
            textAlign: 'center',
            position: 'relative'
          }}>
            Key Achievements
            <motion.span 
              style={{
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
                borderRadius: '2px'
              }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </h2>
        </motion.div>
        
        {/* Cards Container */}
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
          initial="hidden"
          animate={isInView ? "visible" : {}}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
              }
            }
          }}
        >
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={achievement.id}
              achievement={achievement}
              showCertificate={() => showCertificate(index)}
              isMobile={isMobile}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </section>
      
      {/* Certificate Modal */}
      <AnimatePresence custom={direction}>
        {activeCertificate && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isMobile ? '0' : '2rem'
            }}
            onClick={() => setActiveCertificate(null)}
          >
            <motion.div
              style={{
                position: 'relative',
                width: isMobile ? '100%' : '90%',
                height: isMobile ? '100%' : '90%',
                backgroundColor: '#FFFFFF',
                borderRadius: isMobile ? 0 : '0.5rem',
                overflow: 'hidden'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Arrows */}
              <button
                style={{
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
                  zIndex: 10,
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateCertificates(-1);
                }}
              >
                ❮
              </button>
              
              <button
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  width: '40px',
                  height: '40px ',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateCertificates(1);
                }}
              >
                ❯
              </button>
              
              {/* Close Button */}
              <button
                style={{
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
                  zIndex: 10,
                  color: 'white'
                }}
                onClick={() => setActiveCertificate(null)}
              >
                ×
              </button>
              
              {/* Animated Certificate */}
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: isMobile ? '1rem' : '2rem'
                }}
              >
                <img
                  src={achievements[currentIndex].certificate}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  alt={`${achievements[currentIndex].title} Certificate`}
                />
              </motion.div>
              
              {/* Certificate Info */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: 0,
                right: 0,
                textAlign: 'center',
                padding: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }}>
                <h3 style={{
                  margin: 0,
                  color: achievements[currentIndex].color,
                  fontSize: isMobile ? '1rem' : '1.1rem'
                }}>
                  {achievements[currentIndex].title}
                </h3>
                <p style={{
                  margin: '0.25rem 0 0',
                  color: '#666',
                  fontSize: isMobile ? '0.8rem' : '0.9rem'
                }}>
                  {`${achievements[currentIndex].organization} • ${achievements[currentIndex].date}`}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const AchievementCard = ({ achievement, showCertificate, isMobile, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        maxWidth: '500px',
        backgroundColor: '#FFFFFF',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.1s ease',
        margin: isMobile ? '0 auto' : '0'
      }}
      whileHover={!isMobile ? {
        y: -5,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)'
      } : {}}
    >
      <div style={{
        backgroundColor: achievement.color,
        padding: isMobile ? '1.25rem' : '1.5rem',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <motion.div 
          style={{
            fontSize: isMobile ? '1.75rem' : '2rem',
            width: isMobile ? '50px' : '60px',
            height: isMobile ? '50px' : '60px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {achievement.icon}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <h3 style={{
            fontSize: isMobile ? '1.1rem' : '1.25rem',
            fontWeight: '600',
            marginBottom: '0.25rem'
          }}>
            {achievement.title}
          </h3>
          <p style={{
            fontSize: isMobile ? '0.8rem' : '0.875rem',
            opacity: '0.9'
          }}>
            {achievement.organization}
          </p>
        </motion.div>
      </div>
      
      <div style={{ padding: isMobile ? '1.25rem' : '1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          color: '#6B7280',
          fontSize: isMobile ? '0.8rem' : '0.875rem'
        }}>
          <span>{achievement.date}</span>
          <span>{achievement.location}</span>
        </div>
        
        <ul style={{
          listStyleType: 'none',
          paddingLeft: 0,
          marginBottom: '1.5rem'
        }}>
          {achievement.highlights.map((highlight, i) => (
            <motion.li
              key={i}
              style={{
                position: 'relative',
                paddingLeft: '1.5rem',
                marginBottom: '0.75rem',
                color: '#4B5563',
                fontSize: isMobile ? '0.9rem' : '1rem'
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <span style={{
                position: 'absolute',
                left: 0,
                color: achievement.color,
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}>•</span>
              {highlight}
            </motion.li>
          ))}
        </ul>
        
        {achievement.certificate && (
          <motion.button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: achievement.color,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: isMobile ? '0.8rem' : '0.875rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
              width: '100%',
              justifyContent: 'center'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={showCertificate}
          >
            <span>View Certificate</span>
            <span>📜</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};