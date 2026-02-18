import { ExternalLink } from 'lucide-react';
import SectionWrapper from '../../../components/SectionWrapper';
import { sectionCardBase } from '../../../components/SectionCard';
import certificates, { sectionDescription } from '../../../data/certifications';

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" title="Certifications">
      <p className="body-text mb-6">
        {sectionDescription}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certificates.map((cert) => (
          <a
            key={cert.name}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className={sectionCardBase}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-serif text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                {cert.name}
              </h3>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300" />
            </div>
            <p className="text-sm text-muted-foreground font-light">
              {cert.provider} &middot; {cert.year}
            </p>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
