import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Publications from './sections/Publications';
import OpenSource from './sections/OpenSource';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Achievements from './sections/Achievements';
import Education from './sections/Education';
import Certifications from './sections/Certifications';

export default function HomePage() {
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
