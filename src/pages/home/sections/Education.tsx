import SectionWrapper from '../../../components/SectionWrapper';
import education, { sectionDescription } from '../../../data/education';

export default function Education() {
  return (
    <SectionWrapper id="education" title="Education" contentClassName="space-y-6">
      <p className="body-text mb-6">
        {sectionDescription}
      </p>

      <div className="relative space-y-8 pl-8 before:absolute before:inset-y-0 before:left-[3.5px] before:w-[2px] before:bg-gradient-to-b before:from-primary/40 before:via-border/40 before:to-transparent">
        {education.map((edu) => (
          <div
            key={edu.degree}
            className="relative group"
          >
            {/* Dot */}
            <div className="absolute -left-[32px] top-[3px] h-[9px] w-[9px] rounded-full bg-background border-2 border-primary ring-4 ring-background transition-colors duration-300 group-hover:bg-primary" />

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <h3 className="font-serif text-xl leading-snug text-foreground group-hover:text-primary transition-colors">
                {edu.degree}
              </h3>
              <span className="shrink-0 text-xs uppercase tracking-widest text-muted-foreground/60">
                {edu.period}
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {edu.institution}
            </p>
            <p className="text-sm text-muted-foreground/70 font-light mt-1">
              {edu.detail}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
