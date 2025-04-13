// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add global styles
const style = document.createElement('style');
style.textContent = `
  @keyframes morph {
    0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70% }
    50% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24% }
    100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70% }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) }
    50% { transform: translateY(-20px) }
  }
  
  .dark {
    background-color: #1F2937;
    color: #F3F4F6;
  }
  
  .dark .card {
    background-color: #374151 !important;
    color: #F3F4F6 !important;
  }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(React.StrictMode, null, React.createElement(App)));