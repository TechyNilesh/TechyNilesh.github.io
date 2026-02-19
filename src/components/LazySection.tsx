import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  skeleton: ReactNode;
}

export default function LazySection({ children, skeleton }: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowContent(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={ref}>
      {!isVisible ? (
        skeleton
      ) : !showContent ? (
        <div className="animate-pulse">{skeleton}</div>
      ) : (
        <div className="animate-fadeIn">{children}</div>
      )}
    </div>
  );
}
