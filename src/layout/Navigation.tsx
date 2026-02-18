import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const navItems: { name: string; href: string; route?: string }[] = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '/projects', route: '/projects' },
  { name: 'Publications', href: '/publications', route: '/publications' },
  // { name: 'Skills', href: '#skills' },
  { name: 'Media', href: '/media', route: '/media' },
  { name: 'Blog', href: '/blog', route: '/blog' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border/50'
          : 'bg-transparent'
          }`}
      >
        <nav className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/"
                onClick={() => {
                  if (location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="font-serif text-lg text-foreground hover:text-primary transition-colors"
              >
                NV
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) =>
                item.route ? (
                  <Link
                    key={item.name}
                    to={item.route}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </button>
                )
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent/10"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-30 bg-background/95 backdrop-blur-md border-b border-border/50 md:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, index) =>
                item.route ? (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Link
                      to={item.route}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors"
                  >
                    {item.name}
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
