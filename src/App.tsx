import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Publications from './sections/Publications';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Certifications from './sections/Certifications';
import OpenSource from './sections/OpenSource';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Footer from './sections/Footer';
import Blog from './pages/Blog';
import PublicationsPage from './pages/PublicationsPage';
import MediaPage from './pages/MediaPage';

function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [hash]);

  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Publications />
      <OpenSource />
      <Projects />
      <Skills />
      <Achievements />
      <Education />
      <Certifications />
    </main>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-serif text-2xl text-foreground"
            >
              NV
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-background"
        >
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/media" element={<MediaPage />} />
          </Routes>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
