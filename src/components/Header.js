import React from 'react';
import { motion } from 'framer-motion';

function Header() {
  return (
    <header className="App-header">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Asad Iqbal
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Software Engineer | Web Developer | AI Enthusiast
      </motion.p>
    </header>
  );
}

export default Header;
