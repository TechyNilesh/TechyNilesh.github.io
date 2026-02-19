import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../../components/SEO';
import LazySection from '../../components/LazySection';
import {
  AboutSkeleton,
  ExperienceSkeleton,
  SkillsSkeleton,
  AchievementsSkeleton,
  EducationSkeleton,
  CertificationsSkeleton,
  ResumeSkeleton,
} from '../../components/SectionSkeletons';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Achievements from './sections/Achievements';
import Education from './sections/Education';
import Certifications from './sections/Certifications';
import Resume from './sections/Resume';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nilesh Verma',
  url: 'https://nileshverma.com',
  image: 'https://nileshverma.com/profile.webp',
  jobTitle: 'Research Scholar',
  affiliation: {
    '@type': 'Organization',
    name: 'University of Waikato',
  },
  sameAs: [
    'https://www.linkedin.com/in/techynilesh/',
    'https://github.com/TechyNilesh',
    'https://x.com/techynilesh',
    'https://scholar.google.com/citations?user=ymceHxcAAAAJ&hl=en',
  ],
};

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
      <SEO
        title="Nilesh Verma - Research Scholar & AI Engineer"
        description="Research Scholar at University of Waikato specializing in AutoML for Data Streams. Expertise in AI, deep learning, and open-source contributions."
        path="/"
        type="profile"
        jsonLd={personJsonLd}
      />
      <Hero />
      <LazySection skeleton={<AboutSkeleton />}>
        <About />
      </LazySection>
      <LazySection skeleton={<ExperienceSkeleton />}>
        <Experience />
      </LazySection>
      <LazySection skeleton={<SkillsSkeleton />}>
        <Skills />
      </LazySection>
      <LazySection skeleton={<AchievementsSkeleton />}>
        <Achievements />
      </LazySection>
      <LazySection skeleton={<EducationSkeleton />}>
        <Education />
      </LazySection>
      <LazySection skeleton={<CertificationsSkeleton />}>
        <Certifications />
      </LazySection>
      <LazySection skeleton={<ResumeSkeleton />}>
        <Resume />
      </LazySection>
    </main>
  );
}
