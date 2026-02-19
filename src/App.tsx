import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import HomePage from './pages/home/HomePage';
import Blog from './pages/Blog';
import PublicationsPage from './pages/PublicationsPage';
import MediaPage from './pages/MediaPage';
import ProjectsPage from './pages/ProjectsPage';
import NotFoundPage from './pages/NotFoundPage';
import UniversalLoader from './components/UniversalLoader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hideLoader = () => setIsLoading(false);
    const fallbackTimer = window.setTimeout(hideLoader, 1800);

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener('load', hideLoader);
    };
  }, []);

  if (isLoading) {
    return <UniversalLoader />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col w-full min-w-0 overflow-x-hidden">
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
    </div>
  );
}

export default App;
