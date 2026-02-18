import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import publications, { pageDescription } from '../data/publications';

export default function PublicationsPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const typeLabel = (type: string) => {
    switch (type) {
      case 'conference': return 'Conference';
      case 'journal': return 'Journal';
      case 'book-chapter': return 'Book Chapter';
      case 'patent': return 'Patent';
      case 'book': return 'Book';
      default: return type;
    }
  };

  return (
    <main className="pt-28 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">Publications</h1>
        <p className="text-muted-foreground mb-12">
          {pageDescription}
        </p>
      </motion.div>

      <div className="space-y-6">
        {publications.map((pub, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="hover:bg-accent/5 -mx-4 px-4 py-5 rounded-xl transition-all duration-300"
            >
              {/* Header — always visible */}
              <button
                onClick={() => toggle(index)}
                className="w-full text-left group"
              >
                <div className="flex justify-between items-start gap-4">
                  <h2 className="font-serif text-xl leading-snug text-foreground group-hover:text-primary transition-colors">
                    {pub.title}
                  </h2>
                  <div className="shrink-0 pt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {pub.authors.join(', ')}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60 border-b border-muted-foreground/30">
                      {pub.venue.split('—')[0].trim()}
                    </span>
                    <span className="text-xs text-muted-foreground/50">{pub.date}</span>
                  </div>
                  <span className="text-xs text-muted-foreground/60 border border-border/50 px-2 py-0.5 rounded-full">
                    {typeLabel(pub.type)}
                  </span>
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-5 space-y-4">
                      {/* Abstract */}
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                          Abstract
                        </h3>
                        <p className="text-sm text-muted-foreground/80 leading-relaxed">
                          {pub.abstract}
                        </p>
                      </div>

                      {/* Keywords */}
                      {pub.keywords.length > 0 && (
                        <div>
                          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                            Keywords
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {pub.keywords.map((kw) => (
                              <span
                                key={kw}
                                className="text-xs text-muted-foreground/60 border border-border/50 px-2 py-0.5 rounded-full"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        {pub.doi && (
                          <a
                            href={pub.doi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            DOI
                          </a>
                        )}
                        {pub.paperLink && (
                          <a
                            href={pub.paperLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Paper
                          </a>
                        )}
                        {pub.pdf && (
                          <a
                            href={pub.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                          >
                            <FileText className="w-3 h-3" />
                            PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Google Scholar link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <a
          href="https://scholar.google.com/citations?user=ymceHxcAAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          View full profile on Google Scholar
          <ExternalLink className="w-3 h-3" />
        </a>
      </motion.div>
    </main>
  );
}
