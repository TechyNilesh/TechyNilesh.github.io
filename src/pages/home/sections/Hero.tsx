import { Linkedin, Github, Mail, FileText, MapPin, GraduationCap } from 'lucide-react';

const MediumIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
    <path d="M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6.6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/techynilesh/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/TechyNilesh', label: 'GitHub' },
  { icon: XIcon, href: 'https://x.com/techynilesh', label: 'X' },
  { icon: MediumIcon, href: 'https://medium.com/@techynilesh', label: 'Medium' },
  { icon: FileText, href: '/Nilesh-Verma-CV-Latest.pdf', label: 'CV' },
  { icon: Mail, href: 'mailto:me@nileshverma.com', label: 'Email' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Profile Image */}
      <div className="relative mb-8 z-10">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-110" />
        <div className="profile-image w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 relative z-10 group transition-transform duration-500 hover:scale-[1.02]">
          <img
            src="/profile.webp"
            loading="eager"
            decoding="async"
            alt="Nilesh Verma"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name & Title Container */}
      <div className="text-center space-y-6 mb-10 z-10 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground tracking-tight leading-tight">
          Nilesh Verma
        </h1>

        <div className="flex flex-col items-center gap-4">
          <p className="font-sans text-xs sm:text-sm md:text-base font-medium text-primary tracking-[0.2em] uppercase py-2 border-y border-border/50">
            Research Scholar &nbsp;&middot;&nbsp; AI Engineer
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground/80 mt-2">
            <a
              href="https://www.waikato.ac.nz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors duration-300 group"
            >
              <GraduationCap className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
              <span>University of Waikato</span>
            </a>
            <span className="hidden sm:inline text-border">|</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary/70" />
              <span>Hamilton, New Zealand</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-4 sm:gap-6 z-10">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground hover:text-primary hover:border-primary/50 bg-background/50 backdrop-blur-sm"
            aria-label={link.label}
          >
            <link.icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
