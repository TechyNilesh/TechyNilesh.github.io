import SectionWrapper from '../components/SectionWrapper';

export default function About() {
  return (
    <SectionWrapper id="about" title="About" contentClassName="space-y-6">
      <div className="space-y-8 font-sans">
        <p className="text-xl leading-relaxed text-foreground/90 font-light tracking-wide">
          PhD Candidate in Computer Science at the{' '}
          <a href="https://www.waikato.ac.nz/" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary border-b border-primary/30 hover:border-primary transition-all duration-300">
            University of Waikato
          </a>
          , New Zealand, specializing in <span className="font-normal text-primary/90">AutoML for Data Streams</span> under the Research and Enterprise Scholarship.
        </p>

        <p className="text-lg leading-relaxed text-muted-foreground">
          As an experienced AI Developer, I have worked across multiple industries including{' '}
          <span className="text-foreground/80">AI communication platforms</span>,{' '}
          <span className="text-foreground/80">SaaS solutions</span>, automotive analytics, and{' '}
          <span className="text-foreground/80">natural language processing</span> for regional languages.
        </p>

        <p className="text-lg leading-relaxed text-muted-foreground">
          My expertise spans the complete AI development lifecycle — from research and development to deployment
          of production systems. I have contributed to open-source projects with{' '}
          <span className="font-medium text-foreground">80k+ downloads</span>, published research
          papers in top-tier conferences (KDD, PAKDD), and developed AI solutions for healthcare, finance, and
        </p>
      </div>
    </SectionWrapper>
  );
}
