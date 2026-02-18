import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Twitter, FileText, MapPin, GraduationCap } from 'lucide-react';

const MediumIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
    <path d="M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6.6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z"/>
  </svg>
);

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/techynilesh/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/TechyNilesh', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/techynilesh', label: 'Twitter' },
  { icon: MediumIcon, href: 'https://medium.com/@techynilesh', label: 'Medium' },
  { icon: FileText, href: '/Nilesh-Verma-CV-Latest.pdf', label: 'CV' },
  { icon: Mail, href: 'mailto:me@nileshverma.com', label: 'Email' },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <div className="profile-image w-36 h-36 sm:w-44 sm:h-44 group transition-transform duration-500 hover:scale-[1.02]">
          <img
            src="/profile.png"
            alt="Nilesh Verma"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Name & Title Container */}
      <div className="text-center space-y-4 mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl text-foreground tracking-tight"
        >
          Nilesh Verma
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center space-y-3"
        >
          <p className="font-sans text-xl sm:text-2xl font-light text-foreground/90 tracking-wide">
            Research Scholar
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground/80">
            <a
              href="https://www.waikato.ac.nz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors duration-300"
            >
              <GraduationCap className="w-4 h-4 text-primary/70" />
              <span>University of Waikato</span>
            </a>
            <span className="hidden sm:inline text-border">|</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary/70" />
              <span>Hamilton, New Zealand</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-4"
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.05 }}
            whileHover={{ y: -3, scale: 1.1 }}
            className="social-icon hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
            aria-label={link.label}
          >
            <link.icon className="w-4 h-4" />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
