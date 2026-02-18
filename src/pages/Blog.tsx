import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

interface BlogPost {
  title: string;
  pubDate: string;
  link: string;
  description: string;
  categories: string[];
  thumbnail: string;
}

interface RSSResponse {
  status: string;
  items: BlogPost[];
}

function stripHtml(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@techynilesh')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch blog posts');
        return res.json();
      })
      .then((data: RSSResponse) => {
        if (data.status === 'ok') {
          setPosts(data.items);
        } else {
          throw new Error('Invalid RSS feed response');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCoverImage = (post: BlogPost): string | null => {
    if (post.thumbnail) return post.thumbnail;
    return extractFirstImage(post.description);
  };

  return (
    <main className="pt-28 pb-16 px-4 sm:px-6 max-w-4xl mx-auto w-full min-w-0">
      <SEO
        title="Blog"
        description="Thoughts on machine learning, AI, and software engineering by Nilesh Verma, published on Medium."
        path="/blog"
      />
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">Blog</h1>
        <p className="text-muted-foreground mb-12">
          Thoughts on machine learning, AI, and software engineering — published on Medium.
        </p>
      </div>

      {isLoading && (
        <div className="space-y-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse flex gap-5 py-4">
              <div className="shrink-0 w-32 h-24 sm:w-44 sm:h-28 bg-muted/50 rounded-lg" />
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-muted/50 rounded w-3/4" />
                <div className="h-4 bg-muted/30 rounded w-1/4" />
                <div className="h-4 bg-muted/30 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">Unable to load blog posts.</p>
          <a
            href="https://medium.com/@techynilesh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            Visit Medium directly
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="space-y-8">
            {posts.map((post) => {
              const cover = getCoverImage(post);
              return (
                <div key={post.link}>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col sm:flex-row gap-5 hover:bg-accent/5 -mx-4 px-4 py-4 rounded-xl transition-all duration-300"
                  >
                    {cover && (
                      <div className="shrink-0 w-full sm:w-44 h-40 sm:h-28 overflow-hidden rounded-lg">
                        <img
                          src={cover}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <h2 className="font-serif text-xl leading-snug text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(post.pubDate)}
                      </p>
                      <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-2">
                        {stripHtml(post.description).slice(0, 200)}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        {post.categories.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {post.categories.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-muted-foreground/60 border border-border/50 px-2 py-0.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div />
                        )}
                        <div className="shrink-0 flex items-center gap-1.5 text-xs text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <span>Read on Medium</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Showing the 10 most recent posts.
            </p>
            <a
              href="https://medium.com/@techynilesh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              See all posts on Medium
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </>
      )}
    </main>
  );
}
