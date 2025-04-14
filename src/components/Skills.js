import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="skills" style={{
      padding: isMobile ? '3rem 1rem' : '5rem 10%',
      backgroundColor: '#FFFFFF'
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: isMobile ? '2rem' : '2.5rem',
          fontWeight: '700',
          color: '#1F2937',
          marginBottom: isMobile ? '2rem' : '3rem',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        Technical Skills
        <span style={{
          content: '""',
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '4px',
          background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
          borderRadius: '2px'
        }}></span>
      </motion.h2>
      
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
          />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ category, index, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={!isMobile ? { 
        y: -5,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)'
      } : {}}
      style={{
        backgroundColor: '#F9FAFB',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        maxWidth: '500px',
        width: '100%',
        margin: isMobile ? '0 auto' : '0'
      }}
    >
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#4F46E5', // Changed back to original blue
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        {category.category}
      </h3>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {category.skills.map(skill => (
          <div key={skill.name}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.25rem'
            }}>
              <span style={{
                fontSize: '0.9rem',
                color: '#4B5563',
                fontWeight: '500'
              }}>
                {skill.name}
              </span>
              <span style={{
                fontSize: '0.9rem',
                color: '#4F46E5', // Changed back to original blue
                fontWeight: '600'
              }}>
                {skill.level}%
              </span>
            </div>
            
            <div style={{
              height: '6px',
              backgroundColor: '#E5E7EB',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)', // Original gradient
                  borderRadius: '3px'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}