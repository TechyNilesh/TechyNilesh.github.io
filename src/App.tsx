import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import HomePage from './pages/home/HomePage';
import Blog from './pages/Blog';
import PublicationsPage from './pages/PublicationsPage';
import MediaPage from './pages/MediaPage';
import ProjectsPage from './pages/ProjectsPage';
import NotFoundPage from './pages/NotFoundPage';

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
          className="min-h-screen bg-background flex flex-col w-full min-w-0 overflow-x-hidden"
        >
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
