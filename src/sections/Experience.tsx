import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import experiences, { sectionDescription } from '../data/experience';

export default function Experience() {
  return (
    <SectionWrapper id="experience" title="Experience" contentClassName="space-y-8">
      <p className="body-text mb-6">
        {sectionDescription}
      </p>

      <div className="relative space-y-12 pl-8 before:absolute before:inset-y-0 before:left-[3.5px] before:w-[2px] before:bg-gradient-to-b before:from-primary/40 before:via-border/40 before:to-transparent">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company + exp.period}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Dot */}
            <div className="absolute -left-[32px] top-[3px] h-[9px] w-[9px] rounded-full bg-background border-2 border-primary ring-4 ring-background transition-colors duration-300 group-hover:bg-primary" />

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <h3 className="font-serif text-2xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  {exp.role}
                </h3>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-lg font-medium text-foreground/90">
                  <span>{exp.company}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground font-light tracking-wide">
                  <span>{exp.location}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="body-text text-base leading-relaxed text-muted-foreground/90 max-w-2xl">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
