import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="pt-28 pb-16 px-4 sm:px-6 max-w-4xl mx-auto w-full min-w-0 flex-1 flex flex-col items-center justify-center text-center">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        noindex
      />
      <div className="space-y-6">
        <h1 className="font-serif text-7xl sm:text-9xl text-primary/20">404</h1>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
          Page not found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>
      </div>
    </main>
  );
}
