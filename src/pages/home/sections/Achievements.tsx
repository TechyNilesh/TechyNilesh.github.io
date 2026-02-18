import SectionWrapper from '../../../components/SectionWrapper';
import achievements, { sectionDescription } from '../../../data/achievements';

export default function Achievements() {
  return (
    <SectionWrapper id="achievements" title="Achievements">
      <p className="body-text mb-6">
        {sectionDescription}
      </p>

      <div className="space-y-0">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 hover:bg-accent/5 -mx-4 px-4 py-4 rounded-xl transition-all duration-300"
          >
            <h3 className="font-serif text-xl leading-snug text-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <span className="shrink-0 text-xs uppercase tracking-widest text-muted-foreground/60">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
