import type { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  title: string;
  children: ReactNode;
  contentClassName?: string;
  hideDivider?: boolean;
}

export default function SectionWrapper({ id, title, children, contentClassName, hideDivider }: SectionWrapperProps) {
  return (
    <section id={id} className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-16">
        {/* Label */}
        <div>
          <h2 className="section-label">{title}</h2>
        </div>

        {/* Content */}
        <div className={contentClassName}>
          {children}
        </div>
      </div>

      {/* Divider */}
      {!hideDivider && (
        <div className="elegant-divider">
          <div className="elegant-divider-dot" />
        </div>
      )}
    </section>
  );
}
