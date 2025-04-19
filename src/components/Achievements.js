import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Certificate images
const certificates = {
  codex24: require('./assets/namal.jpg'),
  nextgen: require('./assets/nexgen.jpg'),
  ict24: require('./assets/ict.jpg'),
  frontiers: require('./assets/nexgen.jpg')
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
    color: "var(--cyan)",
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
    color: "var(--cyan)",
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
    color: "var(--green)",
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
    color: "var(--green)",
    certificate: certificates.frontiers
  }
];

export default function Achievements() {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [direction, setDirection] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showCertificateInfo, setShowCertificateInfo] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

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
          backgroundColor: 'var(--navy)',
          overflow: 'hidden',
          borderTop: '1px solid rgba(0, 245, 255, 0.1)',
          borderBottom: '1px solid rgba(0, 245, 255, 0.1)'
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
            color: 'var(--cyan)',
            marginBottom: isMobile ? '2rem' : '3rem',
            textAlign: 'center',
            position: 'relative',
            textShadow: '0 0 10px rgba(0, 245, 255, 0.3)'
          }}>
            Key Achievements
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
                backgroundColor: 'var(--card)',
                borderRadius: isMobile ? 0 : '0.5rem',
                overflow: 'hidden',
                border: '1px solid rgba(0, 245, 255, 0.2)'
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setShowCertificateInfo(true)}
              onMouseLeave={() => setShowCertificateInfo(false)}
            >
              {/* Navigation Arrows */}
              <button
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 245, 255, 0.2)',
                  border: '1px solid rgba(0, 245, 255, 0.4)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  color: 'var(--cyan)'
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
                  background: 'rgba(0, 245, 255, 0.2)',
                  border: '1px solid rgba(0, 245, 255, 0.4)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  color: 'var(--cyan)'
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
                  background: 'rgba(0, 245, 255, 0.2)',
                  border: '1px solid rgba(0, 245, 255, 0.4)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  color: 'var(--cyan)'
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
              
              {/* Certificate Info - Only shows on hover */}
              <AnimatePresence>
                {showCertificateInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: 0,
                      right: 0,
                      textAlign: 'center',
                      padding: '0.5rem',
                      backgroundColor: 'rgba(10, 25, 47, 0.9)',
                      borderTop: '1px solid rgba(0, 245, 255, 0.2)'
                    }}
                  >
                    <h3 style={{
                      margin: 0,
                      color: achievements[currentIndex].color,
                      fontSize: isMobile ? '1rem' : '1.1rem'
                    }}>
                      {achievements[currentIndex].title}
                    </h3>
                    <p style={{
                      margin: '0.25rem 0 0',
                      color: 'var(--text)',
                      opacity: 0.8,
                      fontSize: isMobile ? '0.8rem' : '0.9rem'
                    }}>
                      {`${achievements[currentIndex].organization} • ${achievements[currentIndex].date}`}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
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
        backgroundColor: 'var(--card)',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.1s ease',
        margin: isMobile ? '0 auto' : '0',
        border: '1px solid rgba(0, 245, 255, 0.1)'
      }}
      whileHover={!isMobile ? {
        y: -5,
        boxShadow: '0 10px 30px rgba(0, 245, 255, 0.2)'
      } : {}}
    >
      {/* Header Section - Styled like button but without hover effects */}
      <div style={{
        padding: isMobile ? '1.25rem' : '1.5rem',
        backgroundColor: 'rgba(0, 245, 255, 0.1)',
        color: achievement.color,
        border: `1px solid ${achievement.color}`,
        borderRadius: '0.5rem',
        margin: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <motion.div 
          style={{
            fontSize: isMobile ? '1.75rem' : '2rem',
            width: isMobile ? '50px' : '60px',
            height: isMobile ? '50px' : '60px',
            backgroundColor: 'rgba(10, 25, 47, 0.3)',
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
        
        <div>
          <h3 style={{
            fontSize: isMobile ? '1.1rem' : '1.25rem',
            fontWeight: '600',
            marginBottom: '0.25rem',
            color: achievement.color
          }}>
            {achievement.title}
          </h3>
          <p style={{
            fontSize: isMobile ? '0.8rem' : '0.875rem',
            opacity: '0.9',
            color: achievement.color
          }}>
            {achievement.organization}
          </p>
        </div>
      </div>
      
      <div style={{ padding: isMobile ? '0 1.25rem 1.25rem' : '0 1.5rem 1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          color: 'var(--text)',
          opacity: 0.8,
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
                color: 'var(--text)',
                opacity: 0.9,
                fontSize: isMobile ? '0.9rem' : '1rem',
                lineHeight: '1.6'
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
              backgroundColor: 'rgba(0, 245, 255, 0.1)',
              color: achievement.color,
              border: `1px solid ${achievement.color}`,
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: isMobile ? '0.8rem' : '0.875rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
              width: '100%',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            whileHover={{
              backgroundColor: achievement.color,
              color: '#000000',
              boxShadow: `0 0 15px ${achievement.color === 'var(--cyan)' ? 'rgba(0, 245, 255, 0.5)' : 'rgba(0, 255, 194, 0.5)'}`
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={showCertificate}
          >
            <span>View Certificate</span>
            <span style={{ color: 'inherit' }}>📜</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};