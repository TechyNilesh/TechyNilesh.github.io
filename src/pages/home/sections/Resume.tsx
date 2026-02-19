import { useEffect, useRef, useState } from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import SectionWrapper from '../../../components/SectionWrapper';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url,
).toString();

const RESUME_URL = '/Nilesh-Verma-CV-Latest.pdf';

function ResumePagePreview({ pageNumber }: { pageNumber: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(RESUME_URL).promise;
        const page = await pdf.getPage(pageNumber);
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const viewport = page.getViewport({ scale: 1 });
        const scale = canvas.clientWidth / viewport.width;
        const scaled = page.getViewport({ scale });

        canvas.width = scaled.width;
        canvas.height = scaled.height;

        await page.render({ canvas, viewport: scaled }).promise;
        if (!cancelled) setLoaded(true);
      } catch {
        // PDF failed to load
      }
    };
    render();
    return () => { cancelled = true; };
  }, [pageNumber]);

  return (
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative rounded-lg overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="aspect-[8.5/11] bg-white relative">
        <canvas
          ref={canvasRef}
          className={`w-full h-full transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
            <FileText className="w-8 h-8 text-muted-foreground/50 animate-pulse" />
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium px-4 py-2 rounded-full border border-border/50 flex items-center gap-2">
          <ExternalLink className="w-3.5 h-3.5" />
          View Full Resume
        </span>
      </div>
    </a>
  );
}

export default function Resume() {
  return (
    <SectionWrapper id="resume" title="Resume" hideDivider>
      <div className="space-y-8">
        {/* PDF Preview - Both Pages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResumePagePreview pageNumber={1} />
          <ResumePagePreview pageNumber={2} />
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
