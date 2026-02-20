import { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Github, Star, LayoutGrid, Package, Code, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import projects, { pageDescription } from '../data/projects';
import type { ProjectType } from '../data/projects';
import { getProjectMedia } from '../utils/projectDiscovery';
import type { DiscoveredMedia } from '../utils/projectDiscovery';
import { useAllGitHubStars } from '../hooks/useGitHubStars';

type LightboxState =
  | { type: 'image'; url: string; gallery: DiscoveredMedia[] }
  | { type: 'local-video'; url: string; gallery: DiscoveredMedia[] }
  | null;

const filters: { id: ProjectType | 'all'; label: string; icon: any }[] = [
  { id: 'all', label: 'All', icon: LayoutGrid },
  { id: 'product', label: 'Products', icon: Package },
  { id: 'opensource', label: 'Open Source', icon: Code },
];

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
  const [imgLoaded, setImgLoaded] = useState(false);

  if (media.type === 'image') {
    return (
      <div
        className={`overflow-hidden rounded-xl bg-muted/30 relative cursor-zoom-in ${className}`}
        onClick={onClick}
      >
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-muted-foreground/10 rounded-xl" />
        )}
        <img
          src={media.path}
          alt={title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover hover:scale-105 transition-all duration-500 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
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

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<ProjectType | 'all'>('all');
  const [selectedMedia, setSelectedMedia] = useState<LightboxState>(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const githubUrls = projects.filter(p => p.github).map(p => p.github!);
  const starsMap = useAllGitHubStars(githubUrls);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredItems = projects.filter(
    (item) => activeFilter === 'all' || item.type === activeFilter
  );

  const navigateGallery = useCallback((direction: 'next' | 'prev') => {
    setSelectedMedia(prev => {
      if (!prev?.gallery || prev.gallery.length <= 1) return prev;
      const currentIndex = prev.gallery.findIndex(m => m.path === prev.url);
      if (currentIndex === -1) return prev;

      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= prev.gallery.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = prev.gallery.length - 1;

      const nextItem = prev.gallery[nextIndex];
      setLightboxLoaded(false);
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

  const openInLightbox = (media: DiscoveredMedia, gallery: DiscoveredMedia[]) => {
    setLightboxLoaded(false);
    setSelectedMedia({
      type: media.type === 'video' ? 'local-video' : 'image',
      url: media.path,
      gallery,
    });
  };

  return (
    <main className="pt-28 pb-16 px-4 sm:px-6 max-w-4xl mx-auto w-full min-w-0">
      <SEO
        title="Projects"
        description="AI-powered products and open-source tools spanning voice platforms, research tools, and accessible machine learning."
        path="/projects"
      />
      <div className="text-center sm:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">Projects</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          {pageDescription}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-12 flex justify-start overflow-x-auto no-scrollbar pb-1">
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
                    ? 'text-primary bg-background border border-border/40 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'opacity-60'}`} />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-4 w-full min-h-[240px]">
        {filteredItems.length > 0 ? (
          filteredItems.map((project) => {
            const allMedia = project.mediaFolder ? getProjectMedia(project.mediaFolder) : [];
            const hasMedia = allMedia.length > 0;

            return (
              <div
                key={project.title}
                className="w-full"
              >
                <div className="group hover:bg-accent/5 -mx-4 px-4 py-5 rounded-xl transition-all duration-300">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-serif text-xl leading-snug text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.github && starsMap.get(project.github) && (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                          <Star className="w-3 h-3 fill-primary" />
                          {starsMap.get(project.github)}
                        </div>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground/40 hover:text-primary transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.link && !project.github && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground/40 hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {project.subtitle && (
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary/70 mt-1">
                      {project.subtitle}
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground/80 leading-relaxed mt-2">
                    {project.description}
                  </p>

                  {/* Media thumbnails */}
                  {hasMedia && allMedia.length === 1 && (
                    <div className="mt-4">
                      <MediaThumbnail
                        media={allMedia[0]}
                        title={project.title}
                        className="w-full sm:w-64 h-48"
                        onClick={() => openInLightbox(allMedia[0], allMedia)}
                      />
                    </div>
                  )}

                  {hasMedia && allMedia.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent mt-4">
                      {allMedia.map((media, i) => (
                        <MediaThumbnail
                          key={i}
                          media={media}
                          title={`${project.title} ${i + 1}`}
                          className="shrink-0 w-52 h-40"
                          onClick={() => openInLightbox(media, allMedia)}
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-muted-foreground/60 border border-border/50 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full">
            <div className="hover:bg-accent/5 -mx-4 px-4 py-20 rounded-xl transition-all duration-300 text-center">
              <p className="text-muted-foreground italic text-lg">No items found for this category.</p>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 sm:p-10"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-[110]"
            onClick={(e) => { e.stopPropagation(); setSelectedMedia(null); }}
          >
            <X className="w-6 h-6" />
          </button>

          {selectedMedia.gallery.length > 1 && (
            <>
              <button
                className="absolute left-4 sm:left-10 p-3 rounded-full bg-muted/30 hover:bg-muted/50 text-foreground transition-colors z-[110]"
                onClick={(e) => { e.stopPropagation(); navigateGallery('prev'); }}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                className="absolute right-4 sm:right-10 p-3 rounded-full bg-muted/30 hover:bg-muted/50 text-foreground transition-colors z-[110]"
                onClick={(e) => { e.stopPropagation(); navigateGallery('next'); }}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div
            className="relative max-w-6xl w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === 'image' ? (
              <div className="relative max-w-full max-h-full flex items-center justify-center">
                {!lightboxLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-48 sm:w-96 sm:h-72 rounded-lg animate-pulse bg-muted-foreground/10" />
                  </div>
                )}
                <img
                  key={selectedMedia.url}
                  src={selectedMedia.url}
                  alt="Enlarged view"
                  onLoad={() => setLightboxLoaded(true)}
                  className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-black/50 transition-opacity duration-500 ${
                    lightboxLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            ) : (
              <video
                key={selectedMedia.url}
                src={selectedMedia.url}
                controls
                autoPlay
                className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl bg-black"
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
