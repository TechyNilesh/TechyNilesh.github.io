import { Download, ExternalLink } from 'lucide-react';
import SectionWrapper from '../../../components/SectionWrapper';

const RESUME_URL = '/Nilesh-Verma-CV-Latest.pdf';

export default function Resume() {
  return (
    <SectionWrapper id="resume" title="Resume" hideDivider>
      <div className="space-y-8">
        {/* PDF Preview - Both Pages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((page) => (
            <a
              key={page}
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-lg overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="aspect-[8.5/11] bg-muted/30">
                <iframe
                  src={`${RESUME_URL}#page=${page}&toolbar=0&navpanes=0&scrollbar=0`}
                  title={`Resume Page ${page}`}
                  className="w-full h-full pointer-events-none"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium px-4 py-2 rounded-full border border-border/50 flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Full Resume
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <a
            href={RESUME_URL}
            download
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium text-sm tracking-wide"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
