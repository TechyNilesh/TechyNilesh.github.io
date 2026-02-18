import { motion } from 'framer-motion';
import SectionWrapper from '../../../components/SectionWrapper';
import { sectionCardBase } from '../../../components/SectionCard';
import skillCategories, { sectionDescription } from '../../../data/skills';

export default function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills">
      <p className="body-text mb-6">
        {sectionDescription}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={sectionCardBase}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-6 rounded-full bg-primary/40 group-hover:w-10 group-hover:bg-primary transition-all duration-300" />
              <h3 className="font-serif text-lg font-medium text-foreground tracking-wide">
                {category.name}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md bg-muted/50 text-muted-foreground border border-transparent hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-colors duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
