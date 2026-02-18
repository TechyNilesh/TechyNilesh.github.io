import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FileText, ChevronDown, ChevronUp, Play, Presentation, X, ChevronLeft, ChevronRight, BookOpen, LayoutGrid, Mic, BookText, BookMarked, ScrollText, Library } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import publications, { pageDescription } from '../data/publications';
import type { PublicationType } from '../data/publications';
import { getPublicationMedia, getBibFile } from '../utils/publicationDiscovery';
import type { DiscoveredMedia } from '../utils/publicationDiscovery';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url,
).toString();

type LightboxState =
  | { type: 'image'; url: string; gallery: DiscoveredMedia[] }
  | { type: 'local-video'; url: string; gallery: DiscoveredMedia[] }
  | null;

function PdfThumbnail({
  src,
  className,
  onClick,
}: {
  src: string;
  className?: string;
  onClick?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(src).promise;
        const page = await pdf.getPage(1);
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        const viewport = page.getViewport({ scale: 1 });
        const scale = Math.max(canvas.clientWidth / viewport.width, canvas.clientHeight / viewport.height);
        const scaled = page.getViewport({ scale });

        canvas.width = scaled.width;
        canvas.height = scaled.height;

        await page.render({
          canvasContext: canvas.getContext('2d')!,
          viewport: scaled,
        }).promise;

        if (!cancelled) setLoaded(true);
      } catch {
        // PDF failed to load — leave as empty
      }
    };
    render();
    return () => { cancelled = true; };
  }, [src]);

  return (
    <div
      className={`overflow-hidden rounded-xl bg-white relative group ${onClick ? 'cursor-pointer' : 'cursor-default'} ${className}`}
      onClick={onClick}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ objectFit: 'cover' }}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
          <FileText className="w-8 h-8 text-muted-foreground/50 animate-pulse" />
        </div>
      )}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
        <span className="text-[11px] text-white/90 font-medium">PDF</span>
      </div>
    </div>
  );
}

function MediaThumbnail({
  media,
  title,
  className,
  onClick,
}: {
  media: DiscoveredMedia;
  title: string;
  className?: string;
  onClick: () => void;
}) {
  if (media.type === 'document' && media.ext === 'pdf') {
    return (
      <PdfThumbnail
        src={media.path}
        className={className}
        onClick={onClick}
      />
    );
  }

  if (media.type === 'document') {
    const DocIcon = media.ext === 'pdf' ? FileText : Presentation;
    const label = media.ext === 'pptx' || media.ext === 'ppt' ? 'PPTX' : media.ext.toUpperCase();
    return (
      <div
        className={`overflow-hidden rounded-xl bg-muted/20 border border-border/40 relative cursor-pointer flex flex-col items-center justify-center gap-2 hover:bg-muted/40 transition-colors ${className}`}
        onClick={onClick}
      >
        <DocIcon className="w-8 h-8 text-muted-foreground/70" />
        <span className="text-xs text-muted-foreground/80 font-medium truncate max-w-[90%] px-2">
          {media.filename}
        </span>
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">{label}</span>
      </div>
    );
  }

  if (media.type === 'image') {
    return (
      <div
        className={`overflow-hidden rounded-xl bg-muted/30 relative cursor-zoom-in ${className}`}
        onClick={onClick}
      >
        <img
          src={media.path}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    );
  }

  if (media.type === 'video') {
    return (
      <div
        className={`overflow-hidden rounded-xl bg-muted/30 relative cursor-pointer ${className}`}
        onClick={onClick}
      >
        <video src={media.path} preload="metadata" className="w-full h-full object-cover" muted />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play className="w-4 h-4 text-black ml-0.5 fill-current" />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const pubFilters: { id: PublicationType | 'all'; label: string; icon: any }[] = [
  { id: 'all', label: 'All', icon: LayoutGrid },
  { id: 'conference', label: 'Conference', icon: Mic },
  { id: 'journal', label: 'Journal', icon: BookText },
  { id: 'book-chapter', label: 'Book Chapter', icon: BookMarked },
  { id: 'patent', label: 'Patent', icon: ScrollText },
  { id: 'book', label: 'Book', icon: Library },
];

export default function PublicationsPage() {
  const [activeFilter, setActiveFilter] = useState<PublicationType | 'all'>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<LightboxState>(null);
  const filteredPublications = publications.filter(
    (p) => activeFilter === 'all' || p.type === activeFilter
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const navigateGallery = useCallback((direction: 'next' | 'prev') => {
    setSelectedMedia(prev => {
      if (!prev?.gallery || prev.gallery.length <= 1) return prev;
      const currentIndex = prev.gallery.findIndex(m => m.path === prev.url);
      if (currentIndex === -1) return prev;

      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= prev.gallery.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = prev.gallery.length - 1;

      const nextItem = prev.gallery[nextIndex];
      return {
        type: nextItem.type === 'video' ? 'local-video' : 'image',
        url: nextItem.path,
        gallery: prev.gallery,
      };
    });
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedMedia(null);
    if (e.key === 'ArrowLeft') navigateGallery('prev');
    if (e.key === 'ArrowRight') navigateGallery('next');
  }, [navigateGallery]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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
    <main className="pt-28 pb-16 px-4 sm:px-6 max-w-4xl mx-auto w-full min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center sm:text-left"
      >
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">Publications</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          {pageDescription}
        </p>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="grid grid-cols-2 gap-2 sm:hidden">
          {pubFilters.map((filter) => {
            const isActive = activeFilter === filter.id;
            const Icon = filter.icon;

            return (
              <button
                key={filter.id}
                onClick={() => { setActiveFilter(filter.id); setExpandedIndex(null); }}
                className={`
                  flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border/50 bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }
                `}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'opacity-70'}`} />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex justify-start overflow-x-auto no-scrollbar pb-1">
          <div className="inline-flex items-center p-1.5 bg-muted/40 backdrop-blur-md border border-border/50 rounded-2xl shadow-sm shrink-0">
            {pubFilters.map((filter) => {
              const isActive = activeFilter === filter.id;
              const Icon = filter.icon;

              return (
                <button
                  key={filter.id}
                  onClick={() => { setActiveFilter(filter.id); setExpandedIndex(null); }}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl
                    ${isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pub-filter-bg"
                      className="absolute inset-0 bg-background border border-border/40 shadow-sm rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-primary' : 'opacity-60'}`} />
                  <span className="relative z-10">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <div className="w-full min-h-[240px]">
        <AnimatePresence mode="popLayout">
        {filteredPublications.length > 0 ? (
          filteredPublications.map((pub, index) => {
          const isExpanded = expandedIndex === index;
          const allMedia = pub.mediaFolder ? getPublicationMedia(pub.mediaFolder) : [];
          const bibFile = pub.mediaFolder ? getBibFile(pub.mediaFolder) : null;
          const lightboxMedia = allMedia.filter(m => m.type !== 'document');
          const hasMedia = allMedia.length > 0;
          const pdfPreview = allMedia.find(
            (m) => m.type === 'document' && m.ext.toLowerCase() === 'pdf'
          );

          const openInLightbox = (media: DiscoveredMedia) => {
            if (media.type === 'document') {
              window.open(media.path, '_blank');
              return;
            }
            setSelectedMedia({
              type: media.type === 'video' ? 'local-video' : 'image',
              url: media.path,
              gallery: lightboxMedia,
            });
          };

          return (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full mb-6"
            >
            <div className="hover:bg-accent/5 -mx-4 px-4 py-5 rounded-xl transition-all duration-300">
              {/* Header — always visible */}
              <button
                onClick={() => toggle(index)}
                className="w-full text-left group"
              >
                <div className={`flex flex-col gap-4 ${pdfPreview ? 'sm:flex-row sm:items-start' : ''}`}>
                  {pdfPreview && (
                    <PdfThumbnail
                      src={pdfPreview.path}
                      className="w-full h-40 sm:w-28 sm:h-36 sm:shrink-0 pointer-events-none"
                    />
                  )}

                  <div className="min-w-0 flex-1">
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
                  </div>
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
                      {/* Media thumbnails (images, videos, PDF first-page previews) */}
                      {hasMedia && allMedia.length === 1 && (
                        <MediaThumbnail
                          media={allMedia[0]}
                          title={pub.title}
                          className="w-full sm:w-64 h-48"
                          onClick={() => openInLightbox(allMedia[0])}
                        />
                      )}

                      {hasMedia && allMedia.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                          {allMedia.map((media, i) => (
                            <MediaThumbnail
                              key={i}
                              media={media}
                              title={`${pub.title} ${i + 1}`}
                              className="shrink-0 w-52 h-40"
                              onClick={() => openInLightbox(media)}
                            />
                          ))}
                        </div>
                      )}

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
                        {bibFile && (
                          <a
                            href={bibFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                          >
                            <BookOpen className="w-3 h-3" />
                            BibTeX
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </motion.div>
          );
          })
        ) : (
          <motion.div
            key="no-publications"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <div className="hover:bg-accent/5 -mx-4 px-4 py-20 rounded-xl transition-all duration-300 text-center">
              <p className="text-muted-foreground italic text-lg">
                No publications found for this category.
              </p>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
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

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 sm:p-10"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMedia(null);
              }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {selectedMedia.gallery.length > 1 && (
              <>
                <button
                  className="absolute left-4 sm:left-10 p-3 rounded-full bg-muted/30 hover:bg-muted/50 text-foreground transition-colors z-[110]"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateGallery('prev');
                  }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  className="absolute right-4 sm:right-10 p-3 rounded-full bg-muted/30 hover:bg-muted/50 text-foreground transition-colors z-[110]"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateGallery('next');
                  }}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-6xl w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.url}
                  alt="Enlarged view"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-black/50"
                />
              ) : (
                <video
                  key={selectedMedia.url}
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl bg-black"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
