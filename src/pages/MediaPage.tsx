import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Play, Image as ImageIcon, Newspaper, Presentation } from 'lucide-react';
import mediaItems, { pageDescription } from '../data/media';
import type { MediaItem, MediaType } from '../data/media';

const sections: { type: MediaType; title: string; icon: typeof Newspaper }[] = [
  { type: 'news', title: 'News Coverage', icon: Newspaper },
  { type: 'poster', title: 'Conference Posters', icon: ImageIcon },
  { type: 'presentation', title: 'Paper Presentations', icon: Presentation },
];

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const hasImage = !!item.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group hover:bg-accent/5 -mx-4 px-4 py-5 rounded-xl transition-all duration-300"
    >
      <div className={`flex ${hasImage ? 'flex-col sm:flex-row gap-5' : 'flex-col gap-2'}`}>
        {/* Thumbnail */}
        {hasImage && (
          <div className="shrink-0 w-full sm:w-48 h-36 sm:h-32 overflow-hidden rounded-lg bg-muted/30 relative">
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {item.video && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-4 h-4 text-black ml-0.5" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 space-y-2">
          <h3 className="font-serif text-xl leading-snug text-foreground group-hover:text-primary transition-colors">
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
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-wrap items-center gap-4">
              {item.video && (
                <a
                  href={item.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                >
                  <Play className="w-3 h-3" />
                  Watch Video
                </a>
              )}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Article
                </a>
              )}
              {item.file && (
                <a
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                >
                  <FileText className="w-3 h-3" />
                  {item.type === 'poster' ? 'View Poster' : 'View Slides'}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MediaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-28 pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">Media & Talks</h1>
        <p className="text-muted-foreground mb-12">
          {pageDescription}
        </p>
      </motion.div>

      {sections.map((section) => {
        const items = mediaItems.filter((item) => item.type === section.type);
        if (items.length === 0) return null;

        return (
          <motion.section
            key={section.type}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <section.icon className="w-5 h-5 text-primary/70" />
              <h2 className="font-serif text-2xl text-foreground">{section.title}</h2>
            </div>

            <div className="space-y-2">
              {items.map((item, index) => (
                <MediaCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </motion.section>
        );
      })}
    </main>
  );
}
