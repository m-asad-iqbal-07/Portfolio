import React, { Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Footer from './components/Footer';

const Hero = lazy(() => import('./components/Hero'));

export default function App() {
  return React.createElement('div', {
    style: {
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#FAFAFA',
      color: '#333333',
      minHeight: '100vh',
      lineHeight: '1.6'
    }
  }, [
    React.createElement(Navigation, { key: 'nav' }),
    React.createElement(Suspense, {
      key: 'main',
      fallback: React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
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