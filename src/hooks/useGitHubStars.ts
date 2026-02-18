import { useState, useEffect } from 'react';

const cache = new Map<string, string>();

function extractRepoPath(url: string): string | null {
  const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
  return match ? match[1] : null;
}

export function useGitHubStars(githubUrl?: string): string | null {
  const [stars, setStars] = useState<string | null>(() => {
    if (!githubUrl) return null;
    return cache.get(githubUrl) ?? null;
  });

  useEffect(() => {
    if (!githubUrl) return;
    if (cache.has(githubUrl)) {
      setStars(cache.get(githubUrl)!);
      return;
    }

    const repo = extractRepoPath(githubUrl);
    if (!repo) return;

    fetch(`https://api.github.com/repos/${repo}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.stargazers_count != null) {
          const count = String(data.stargazers_count);
          cache.set(githubUrl, count);
          setStars(count);
        }
      })
      .catch(() => {});
  }, [githubUrl]);

  return stars;
}

// Batch hook for multiple URLs
export function useAllGitHubStars(githubUrls: string[]): Map<string, string> {
  const [starsMap, setStarsMap] = useState<Map<string, string>>(() => {
    const initial = new Map<string, string>();
    for (const url of githubUrls) {
      const cached = cache.get(url);
      if (cached) initial.set(url, cached);
    }
    return initial;
  });

  useEffect(() => {
    const uncached = githubUrls.filter(url => !cache.has(url));
    if (uncached.length === 0) return;

    let cancelled = false;

    Promise.all(
      uncached.map(url => {
        const repo = extractRepoPath(url);
        if (!repo) return Promise.resolve(null);
        return fetch(`https://api.github.com/repos/${repo}`)
          .then(res => res.ok ? res.json() : null)
          .then(data => {
            if (data?.stargazers_count != null) {
              const count = String(data.stargazers_count);
              cache.set(url, count);
              return [url, count] as [string, string];
            }
            return null;
          })
          .catch(() => null);
      })
    ).then(results => {
      if (cancelled) return;
      setStarsMap(prev => {
        const next = new Map(prev);
        for (const result of results) {
          if (result) next.set(result[0], result[1]);
        }
        return next;
      });
    });

    return () => { cancelled = true; };
  }, [githubUrls.join(',')]);

  return starsMap;
}
