import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillsData = [
  {
    category: "Languages",
    skills: [
      { name: "Java", level: 90 },
      { name: "Python", level: 95 },
      { name: "C++", level: 85 },
      { name: "React", level: 92 },
      { name: "JavaScript", level: 94 },
      { name: "HTML/CSS", level: 98 }
    ]
  },
  {
    category: "Frameworks",
    skills: [
      { name: "React", level: 92 },
      { name: "Node.js", level: 88 },
      { name: "WordPress", level: 85 },
      { name: "React-Native", level: 87 },
      { name: "FastAPI", level: 90 }
    ]
  },
  {
    category: "Developer Tools",
    skills: [
      { name: "Git", level: 95 },
      { name: "Google Cloud Platform", level: 85 },
      { name: "VS Code", level: 98 },
      { name: "Visual Studio", level: 90 },
      { name: "PyCharm", level: 92 },
      { name: "IntelliJ", level: 88 },
      { name: "Eclipse", level: 85 }
    ]
  },
  {
    category: "Libraries",
    skills: [
      { name: "pandas", level: 93 },
      { name: "NumPy", level: 91 },
      { name: "Matplotlib", level: 89 },
      { name: "Tensorflow", level: 87 },
      { name: "Keras", level: 86 }
    ]
  }
];

export default function Skills() {
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

  return (
    <section 
      id="skills" 
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
          Technical Skills
        </h2>
      </motion.div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {skillsData.map((category, index) => (
          <SkillCard 
            key={category.category}
            category={category}
            index={index}
            isMobile={isMobile}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ category, index, isMobile, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={!isMobile ? { 
        y: -5,
        boxShadow: '0 10px 30px rgba(0, 245, 255, 0.2)'
      } : {}}
      style={{
        backgroundColor: 'var(--card)',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        maxWidth: '500px',
        width: '100%',
        margin: isMobile ? '0 auto' : '0',
        border: '1px solid rgba(0, 245, 255, 0.1)'
      }}
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 + index * 0.1 }}
        style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: 'var(--cyan)',
          marginBottom: '1.5rem',
          textAlign: 'center',
          textShadow: '0 0 8px rgba(0, 245, 255, 0.2)'
        }}
      >
        {category.category}
      </motion.h3>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {category.skills.map((skill, skillIndex) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.1 + skillIndex * 0.05 }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.25rem'
            }}>
              <span style={{
                fontSize: '0.9rem',
                color: 'var(--text)',
                fontWeight: '500',
                opacity: 0.9
              }}>
                {skill.name}
              </span>
              <span style={{
                fontSize: '0.9rem',
                color: 'var(--green)',
                fontWeight: '600'
              }}>
                {skill.level}%
              </span>
            </div>
            
            <div style={{
              height: '6px',
              backgroundColor: 'rgba(0, 245, 255, 0.1)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1, delay: 0.4 + index * 0.1 + skillIndex * 0.05 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--cyan) 0%, var(--green) 100%)',
                  borderRadius: '3px',
                  boxShadow: '0 0 5px rgba(0, 255, 194, 0.3)'
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}