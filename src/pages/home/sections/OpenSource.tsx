import { motion } from 'framer-motion';
import { Github, Star } from 'lucide-react';
import SectionWrapper from '../../../components/SectionWrapper';
import { sectionCardBase } from '../../../components/SectionCard';
import CTALink from '../../../components/CTALink';
import projects, { opensourceSectionDescription } from '../../../data/projects';
import { useAllGitHubStars } from '../../../hooks/useGitHubStars';

const osProjects = projects.filter(p => p.type === 'opensource');
const githubUrls = osProjects.filter(p => p.github).map(p => p.github!);

export default function OpenSource() {
  const starsMap = useAllGitHubStars(githubUrls);

  return (
    <SectionWrapper id="opensource" title="Open Source">
      <p className="body-text mb-6">
        {opensourceSectionDescription}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {osProjects.map((project, index) => {
          const stars = project.github ? starsMap.get(project.github) : null;

          return (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={sectionCardBase}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {stars && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                    <Star className="w-3 h-3 fill-primary" />
                    {stars}
                  </div>
                )}
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors flex-grow">
                {project.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                <Github className="w-3 h-3" />
                <span>GitHub Repository</span>
              </div>
            </motion.a>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 flex justify-center md:justify-start"
      >
        <CTALink href="https://github.com/TechyNilesh" icon={<Github className="w-4 h-4" />}>
          View GitHub Profile
        </CTALink>
      </motion.div>
    </SectionWrapper>
  );
}
