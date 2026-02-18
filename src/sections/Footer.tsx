import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="text-muted-foreground/50 text-xs tracking-wider">
          © {new Date().getFullYear()} · Built with care
        </p>
      </motion.div>
    </footer>
  );
}
