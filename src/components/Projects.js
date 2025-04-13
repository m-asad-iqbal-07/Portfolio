// components/Projects.js
import React, { useState } from 'react';

const projects = [
  {
    title: "AI Chatbot",
    description: "Developed a conversational AI using Python and TensorFlow",
    image: "chatbot.jpg",
    details: "Implemented NLP pipeline with 89% accuracy on test dataset..."
  },
  // Add other projects
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return React.createElement(React.Fragment, null, [
    // Projects grid (existing code)
    // ...
    
    // Modal
    activeProject && React.createElement('div', {
      style: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: '100',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      },
      onClick: () => setActiveProject(null)
    }, React.createElement('div', {
      style: {
        backgroundColor: '#FFFFFF',
        borderRadius: '0.5rem',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '2rem',
        position: 'relative'
      },
      onClick: (e) => e.stopPropagation()
    }, [
      React.createElement('button', {
        style: {
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer'
        },
        onClick: () => setActiveProject(null)
      }, '×'),
      
      React.createElement('h3', {
        style: {
          fontSize: '1.75rem',
          color: '#1F2937',
          marginBottom: '1rem'
        }
      }, activeProject.title),
      
      React.createElement('img', {
        src: activeProject.image,
        style: {
          width: '100%',
          height: '300px',
          objectFit: 'cover',
          borderRadius: '0.25rem',
          marginBottom: '1.5rem'
        }
      }),
      
      React.createElement('p', {
        style: {
          color: '#4B5563',
          lineHeight: '1.7'
        }
      }, activeProject.details)
    ]))
  ]);
}