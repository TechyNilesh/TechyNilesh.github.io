import { Routes, Route } from 'react-router-dom';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import HomePage from './pages/home/HomePage';
import Blog from './pages/Blog';
import PublicationsPage from './pages/PublicationsPage';
import MediaPage from './pages/MediaPage';
import ProjectsPage from './pages/ProjectsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
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
