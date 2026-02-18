import { motion } from 'framer-motion';
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
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground/50 text-[10px] uppercase tracking-[0.2em] flex items-center gap-1.5"
          >
            <span>© {new Date().getFullYear()} Nilesh Verma · Crafted with</span>
            <Heart className="w-2.5 h-2.5 fill-primary text-primary" />
            <span>curiosity</span>
          </motion.div>

          {/* Tech Stack Subtle Shoutout */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-muted-foreground/30 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <span className="text-[10px] uppercase tracking-widest mr-2">Tech:</span>
            <span className="text-[10px]">React</span>
            <span className="text-[10px]">Tailwind</span>
            <span className="text-[10px]">Framer</span>
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
