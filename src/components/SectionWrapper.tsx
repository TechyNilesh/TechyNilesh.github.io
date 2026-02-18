import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  title: string;
  children: ReactNode;
  contentClassName?: string;
}

export default function SectionWrapper({ id, title, children, contentClassName }: SectionWrapperProps) {
  return (
    <section id={id} className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-16">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-label">{title}</h2>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={contentClassName}
        >
          {children}
        </motion.div>
      </div>

      {/* Divider */}
      <div className="elegant-divider">
        <div className="elegant-divider-dot" />
      </div>
    </section>
  );
}
