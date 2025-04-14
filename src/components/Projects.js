import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import agriDiagnosisVideo from './assets/agridaignosis.mp4';

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeDemo, setActiveDemo] = useState(null);
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

  const projects = [
    {
      id: 1,
      title: "Agri Diagnosis: AI-Powered Crop Disease Detection",
      technologies: "React Native, Python, TensorFlow",
      date: "Nov 2024– Present",
      description: "A mobile app to detect wheat diseases (rust, mildew, blight etc) using TensorFlow Lite for offline image analysis",
      highlights: [
        "Co-developed a mobile app with React Native frontend and camera/image upload functionality",
        "Optimized for rural users with limited internet connectivity",
        "Trained CNN model (Python/Keras) on 10,000+ crop images with 97% accuracy",
        "Implemented multilingual support (English/Urdu) and offline storage",
        "Real-time disease classification with user-friendly interface"
      ],
      demoVideo: agriDiagnosisVideo,
      githubRepo: "https://github.com/yourusername/agri-diagnosis",
      color: "var(--cyan)",
      icon: "🌱"
    },
    // Add more projects here as needed
  ];

  const showDemo = (index) => {
    setActiveDemo(index);
  };

  return (
    <section 
      id="projects"
      ref={sectionRef}
      style={{
        padding: isMobile ? '4rem 1rem' : '6rem 10%',
        backgroundColor: 'var(--navy)',
        position: 'relative',
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
          Projects
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id}
            project={project}
            isMobile={isMobile}
            isInView={isInView}
            index={index}
            showDemo={() => showDemo(index)}
          />
        ))}
      </div>

      {/* Demo Video Modal */}
      <AnimatePresence>
        {activeDemo !== null && (
          <motion.div
            key="demo-modal"
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
            onClick={() => setActiveDemo(null)}
          >
            <motion.div
              style={{
                position: 'relative',
                width: isMobile ? '100%' : '90%',
                maxWidth: '900px',
                backgroundColor: 'var(--card)',
                borderRadius: isMobile ? 0 : '0.5rem',
                overflow: 'hidden',
                border: '1px solid rgba(0, 245, 255, 0.2)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0, 245, 255, 0.2)',
                  border: '1px solid rgba(0, 245, 255, 0.3)',
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
                onClick={() => setActiveDemo(null)}
              >
                ×
              </button>
              
              {/* Video Player */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                style={{
                  width: '100%',
                  paddingTop: '56.25%', // 16:9 aspect ratio
                  position: 'relative'
                }}
              >
                <video
                  controls
                  autoPlay
                  muted
                  playsInline
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000'
                  }}
                >
                  <source src={projects[activeDemo].demoVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
              
              {/* Project Info */}
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'var(--card)'
              }}>
                <h3 style={{
                  margin: 0,
                  color: 'var(--cyan)',
                  fontSize: isMobile ? '1.1rem' : '1.25rem'
                }}>
                  {projects[activeDemo].title}
                </h3>
                <p style={{
                  margin: '0.25rem 0 0',
                  color: 'var(--text)',
                  opacity: 0.8,
                  fontSize: isMobile ? '0.8rem' : '0.9rem'
                }}>
                  {projects[activeDemo].technologies}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard = ({ project, isMobile, isInView, index, showDemo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        width: '100%',
        backgroundColor: 'var(--card)',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
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
        color: project.color,
        border: `1px solid ${project.color}`,
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
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          {project.icon}
        </motion.div>
        
        <div>
          <h3 style={{
            fontSize: isMobile ? '1.1rem' : '1.25rem',
            fontWeight: '600',
            marginBottom: '0.25rem',
            color: project.color
          }}>
            {project.title}
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            fontSize: isMobile ? '0.8rem' : '0.875rem',
            opacity: '0.9',
            color: project.color
          }}>
            <span>{project.technologies}</span>
            <span>•</span>
            <span>{project.date}</span>
          </div>
        </div>
      </div>
      
      <div style={{ padding: isMobile ? '0 1.25rem 1.25rem' : '0 1.5rem 1.5rem' }}>
        <motion.p
          style={{
            color: 'var(--text)',
            opacity: 0.9,
            fontSize: isMobile ? '0.95rem' : '1rem',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          {project.description}
        </motion.p>
        
        <ul style={{
          listStyleType: 'none',
          paddingLeft: 0,
          marginBottom: '1.5rem'
        }}>
          {project.highlights.map((highlight, i) => (
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
              transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
            >
              <span style={{
                position: 'absolute',
                left: 0,
                color: 'var(--green)',
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}>•</span>
              {highlight}
            </motion.li>
          ))}
        </ul>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <motion.button
            onClick={showDemo}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(0, 245, 255, 0.1)',
              color: 'var(--cyan)',
              border: '1px solid var(--cyan)',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: isMobile ? '0.8rem' : '0.875rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{
              backgroundColor: 'var(--cyan)',
              color: '#000000',
              boxShadow: '0 0 15px rgba(0, 245, 255, 0.5)'
            }}
            whileTap={{
              scale: 0.95
            }}
          >
            <span>View Demo</span>
            <span style={{ color: 'inherit' }}>🎥</span>
          </motion.button>
          
          <motion.a
            href={project.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(0, 255, 194, 0.1)',
              color: 'var(--green)',
              border: '1px solid var(--green)',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontSize: isMobile ? '0.8rem' : '0.875rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{
              backgroundColor: 'var(--green)',
              color: '#000000',
              boxShadow: '0 0 15px rgba(0, 255, 194, 0.5)'
            }}
            whileTap={{
              scale: 0.95
            }}
          >
            <span>View Code</span>
            <span style={{ color: 'inherit' }}>💻</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;