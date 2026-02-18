import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FileText, Play, Image as ImageIcon, Newspaper, Presentation, LayoutGrid, X, ChevronLeft, ChevronRight } from 'lucide-react';
import mediaItems, { pageDescription } from '../data/media';
import type { MediaItem, MediaType } from '../data/media';
import { getMediaForFolder } from '../utils/mediaDiscovery';
import type { DiscoveredMedia } from '../utils/mediaDiscovery';

type LightboxState =
  | { type: 'image'; url: string; gallery: DiscoveredMedia[] }
  | { type: 'local-video'; url: string; gallery: DiscoveredMedia[] }
  | null;

const filters: { id: MediaType | 'all'; label: string; icon: any }[] = [
  { id: 'all', label: 'All Media', icon: LayoutGrid },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'poster', label: 'Posters', icon: ImageIcon },
  { id: 'presentation', label: 'Talks', icon: Presentation },
];

function getDocIcon(ext: string) {
  if (ext === 'pdf') return FileText;
  return Presentation;
}

function getDocLabel(ext: string) {
  if (ext === 'pdf') return 'PDF';
  if (ext === 'pptx' || ext === 'ppt') return 'PPTX';
  return ext.toUpperCase();
}

function MediaCard({
  item,
  index,
  onOpenMedia
}: {
  item: MediaItem;
  index: number;
  onOpenMedia: (state: NonNullable<LightboxState>) => void;
}) {
  const allMedia = item.mediaFolder ? getMediaForFolder(item.mediaFolder) : [];
  const lightboxMedia = allMedia.filter(m => m.type !== 'document');
  const hasMedia = allMedia.length > 0;

  const openInLightbox = (media: DiscoveredMedia) => {
    if (media.type === 'document') {
      window.open(media.path, '_blank');
      return;
    }
    onOpenMedia({
      type: media.type === 'video' ? 'local-video' : 'image',
      url: media.path,
      gallery: lightboxMedia,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group hover:bg-accent/5 -mx-4 px-4 py-5 rounded-xl transition-all duration-300"
    >
      <div className={`flex ${hasMedia ? 'flex-col gap-4' : 'flex-col gap-2'}`}>

        {/* Media strip — single item shown larger; multiple shown as scrollable strip */}
        {hasMedia && allMedia.length === 1 && (
          <MediaThumbnail
            media={allMedia[0]}
            title={item.title}
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
                title={`${item.title} ${i + 1}`}
                className="shrink-0 w-52 h-40"
                onClick={() => openInLightbox(media)}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 space-y-2">
          <h3
            className="font-serif text-xl leading-snug text-foreground group-hover:text-primary transition-colors cursor-pointer"
            onClick={() => {
              if (lightboxMedia.length > 0) openInLightbox(lightboxMedia[0]);
            }}
          >
            {item.title}
          </h3>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {item.source && <span className="font-medium">{item.source}</span>}
            {item.source && <span className="w-1 h-1 rounded-full bg-border" />}
            <span>{item.date}</span>
          </div>

          <p className="text-sm text-muted-foreground/80 leading-relaxed">
            {item.description}
          </p>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-muted-foreground/60 border border-border/50 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action links */}
          {item.links && item.links.length > 0 && (
            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-wrap items-center gap-4">
                {item.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
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
        <video
          src={media.path}
          preload="metadata"
          className="w-full h-full object-cover"
          muted
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play className="w-4 h-4 text-black ml-0.5 fill-current" />
          </div>
        </div>
      </div>
    );
  }

  // Document
  const DocIcon = getDocIcon(media.ext);
  const label = getDocLabel(media.ext);

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

export default function MediaPage() {
  const [activeFilter, setActiveFilter] = useState<MediaType | 'all'>('all');
  const [selectedMedia, setSelectedMedia] = useState<LightboxState>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const filteredItems = mediaItems.filter(
    (item) => activeFilter === 'all' || item.type === activeFilter
  );

  return (
    <main className="pt-28 pb-16 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen w-full min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center sm:text-left"
      >
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">Media & Talks</h1>
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
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            const Icon = filter.icon;

            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
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
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;
              const Icon = filter.icon;

              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
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
                      layoutId="active-filter-bg"
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

      {/* Unified List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <MediaCard
                  item={item}
                  index={index}
                  onOpenMedia={setSelectedMedia}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <p className="text-muted-foreground italic text-lg">No items found for this category.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
