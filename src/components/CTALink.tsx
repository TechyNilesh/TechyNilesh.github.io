import { ExternalLink } from 'lucide-react';
import type { ReactNode } from 'react';

interface CTALinkProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}

export default function CTALink({ href, children, icon }: CTALinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-medium px-6 py-2 rounded-full border border-border bg-background hover:bg-accent/10 hover:border-primary/30 transition-all duration-300 shadow-sm"
    >
      {icon}
      {children}
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}
