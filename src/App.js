import React, { Suspense, lazy } from 'react';
import Navigation from './components/Header';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Footer from './components/Footer';
import header from './components/Header';

const Hero = lazy(() => import('./components/Hero'));

export default function App() {
  return React.createElement('div', {
    style: {
      fontFamily: "'Inter', sans-serif",
      backgroundColor: 'var(--navy)',
      color: 'var(--text)',
      minHeight: '100vh',
      lineHeight: '1.6',
      scrollBehavior: 'smooth'
    }
  }, [
    React.createElement(Navigation, { key: 'nav' }),
    React.createElement('style', { key: 'global-styles' }, `
      :root {
        --navy: #0A192F;
        --cyan: #00F5FF;
        --green: #00FFC2;
        --purple: #9D00FF;
        --text: #CCD6F6;
        --card: #112240;
        --text-secondary: #8892B0;
      }
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        background: var(--navy);
        color: var(--text);
      }
      
      ::selection {
        background: rgba(0, 245, 255, 0.2);
        color: var(--cyan);
      }
      
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      
      @keyframes morph {
        0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        50% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
      }
    `),
    React.createElement(Suspense, {
      key: 'main',
      fallback: React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'var(--navy)',
          color: 'var(--cyan)'
        }
      }, 'Loading...')
    }, [
      React.createElement(Hero, { key: 'hero' }),
      React.createElement(Skills, { key: 'skills' }),
      React.createElement(Achievements, { key: 'achievements' }),
      React.createElement(Projects, { key: 'projects' }),
      React.createElement(Footer, { key: 'footer' })
    ])
  ]);
}