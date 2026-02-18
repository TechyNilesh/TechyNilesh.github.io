import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionWrapper from '../../../components/SectionWrapper';
import allPublications, { sectionDescription } from '../../../data/publications';

const publications = allPublications.slice(0, 7).map((pub) => ({
  title: pub.title,
  venue: pub.venue.split('—')[0].trim(),
  link: pub.paperLink || pub.doi || '#',
}));

export default function Publications() {
  return (
    <SectionWrapper id="publications" title="Publications">
      <p className="body-text mb-6">
        {sectionDescription}
      </p>

      <div className="space-y-8">
        {publications.map((pub, index) => (
          <motion.div
            key={pub.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block space-y-2 hover:bg-accent/5 -mx-4 px-4 py-4 rounded-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-serif text-xl leading-snug text-foreground group-hover:text-primary transition-colors">
                  {pub.title}
                </h3>
                <div className="shrink-0 pt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground/60 border-b border-muted-foreground/30">
                  {pub.venue.split(' ').pop()}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {pub.venue}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <span>View Publication</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 flex justify-center md:justify-start"
      >
        <Link
          to="/publications"
          className="inline-flex items-center gap-2 text-sm font-medium px-6 py-2 rounded-full border border-border bg-background hover:bg-accent/10 hover:border-primary/30 transition-all duration-300 shadow-sm"
        >
          See all publications
          <ArrowRight className="w-3 h-3" />
        </Link>
      </motion.div>
    </SectionWrapper>
  );
}
