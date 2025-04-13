import React from 'react';

export default function Footer() {
  return React.createElement('footer', {
    style: {
      backgroundColor: '#1F2937',
      color: 'white',
      padding: '3rem 10%',
      textAlign: 'center'
    }
  }, [
    React.createElement('h2', {
      style: {
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '1.5rem'
      }
    }, "Let's Connect"),
    
    React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginBottom: '2rem'
      }
    }, [
      createContactItem('Phone', '+92 3337941364', 'tel:+923337941364'),
      createContactItem('Email', 'masadiqbal385@gmail.com', 'mailto:masadiqbal385@gmail.com'),
      createContactItem('LinkedIn', 'muhammad-asad-iqbal', 'https://linkedin.com/in/muhammad-asad-iqbal'),
      createContactItem('GitHub', 'm-asad-iqbal-07', 'https://github.com/m-asad-iqbal-07')
    ]),
    
    React.createElement('p', {
      style: {
        color: '#9CA3AF',
        fontSize: '0.875rem'
      }
    }, '© 2023 Muhammad Asad Iqbal. All rights reserved.')
  ]);
}

function createContactItem(label, value, link) {
  return React.createElement('a', {
    href: link,
    target: '_blank',
    rel: 'noopener noreferrer',
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textDecoration: 'none',
      color: 'white',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-3px)'
      }
    }
  }, [
    React.createElement('div', {
      style: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#4F46E5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '0.5rem'
      }
    }, React.createElement('span', {
      style: {
        fontSize: '1.5rem'
      }
    }, getIcon(label))),
    
    React.createElement('span', {
      style: {
        fontWeight: '500'
      }
    }, value)
  ]);
}

function getIcon(label) {
  const icons = {
    'Phone': '📞',
    'Email': '✉️',
    'LinkedIn': '🔗',
    'GitHub': '🐱'
  };
  return icons[label] || '•';
}