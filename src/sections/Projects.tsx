import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import { sectionCardBase } from '../components/SectionCard';
import projects, { sectionDescription } from '../data/projects';

export default function Projects() {
  return (
    <SectionWrapper id="projects" title="Projects">
      <p className="body-text mb-6">
        {sectionDescription}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={sectionCardBase}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              {project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground/40 hover:text-primary transition-colors duration-300" />
                </a>
              )}
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-3">
              {project.subtitle}
            </p>

            <p className="text-sm leading-relaxed text-muted-foreground/90 flex-grow mb-5 font-light">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] rounded bg-muted/50 text-muted-foreground border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
