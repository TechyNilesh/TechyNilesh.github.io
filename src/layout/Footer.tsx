import { ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-border/40 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-6">
          <p className="text-muted-foreground/50 text-[10px] uppercase tracking-[0.2em] text-center md:text-left flex items-center justify-center gap-1.5 flex-wrap">
            <span>&copy; {new Date().getFullYear()} Nilesh Verma</span>
            <span>&middot;</span>
            <span className="inline-flex items-center gap-1.5">
              Crafted with
              <Heart className="w-2.5 h-2.5 fill-primary text-primary" />
              curiosity
            </span>
          </p>

          {/* Tech Stack */}
          <div className="flex items-center justify-center gap-3 text-muted-foreground/30 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <span className="text-[10px] uppercase tracking-widest">Tech:</span>
            <span className="text-[10px]">React</span>
            <span className="text-[10px]">Tailwind</span>
            <span className="text-[10px]">Vite</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 hover:text-primary transition-colors group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
