import React from 'react';

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
  return React.createElement('section', {
    id: 'skills',
    style: {
      padding: '5rem 10%',
      backgroundColor: '#FFFFFF'
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
    }, 'Technical Skills'),
    
    // First Row (2 cards)
    React.createElement('div', {
      style: {
        display: 'flex',
        gap: '2rem',
        marginBottom: '2rem'
      }
    }, skillsData.slice(0, 2).map(category => 
      createSkillCard(category)
    )),
    
    // Second Row (2 cards)
    React.createElement('div', {
      style: {
        display: 'flex',
        gap: '2rem'
      }
    }, skillsData.slice(2, 4).map(category => 
      createSkillCard(category)
    ))
  ]);
}

function createSkillCard({ category, skills }) {
  return React.createElement('div', {
    key: category,
    style: {
      flex: '1',
      backgroundColor: '#F9FAFB',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }
    }
  }, [
    React.createElement('h3', {
      style: {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#4F46E5',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }
    }, category),
    
    React.createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }
    }, skills.map(skill => 
      React.createElement('div', {
        key: skill.name
      }, [
        React.createElement('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.25rem'
          }
        }, [
          React.createElement('span', {
            style: {
              fontSize: '0.9rem',
              color: '#4B5563',
              fontWeight: '500'
            }
          }, skill.name),
          React.createElement('span', {
            style: {
              fontSize: '0.9rem',
              color: '#4F46E5',
              fontWeight: '600'
            }
          }, `${skill.level}%`)
        ]),
        
        React.createElement('div', {
          style: {
            height: '6px',
            backgroundColor: '#E5E7EB',
            borderRadius: '3px',
            overflow: 'hidden'
          }
        }, React.createElement('div', {
          style: {
            height: '100%',
            width: `${skill.level}%`,
            background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
            borderRadius: '3px',
            transition: 'width 0.5s ease'
          }
        }))
      ])
    ))
  ]);
}