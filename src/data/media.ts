export type MediaType = 'news' | 'poster' | 'presentation';

export interface MediaItem {
  title: string;
  type: MediaType;
  date: string;
  description: string;
  source?: string; // e.g. "NDTV", "KDD 2025"
  image?: string; // thumbnail/screenshot path in /public/media/
  video?: string; // YouTube or external video URL
  link?: string; // article URL or external link
  file?: string; // PDF path in /public/media/ (poster PDF, slides PDF)
  tags?: string[];
}

export const pageDescription = 'News features, conference poster sessions, and paper presentations from research and industry work.';

const mediaItems: MediaItem[] = [
  // ── News Coverage ──────────────────────────────────────
  {
    title: 'Real-Time COVID-19 Detection Through CT-Scan Software',
    type: 'news',
    date: '2021',
    description: 'State-level news coverage featuring the development of a real-time COVID-19 detection system using deep learning on CT-scan images.',
    source: 'State News',
    tags: ['COVID-19', 'Deep Learning', 'Healthcare'],
    // image: '/media/news/covid-ct-scan-news.jpg',
    // link: 'https://example.com/news-article',
    // video: 'https://www.youtube.com/watch?v=...',
  },

  // ── Conference Posters ─────────────────────────────────
  {
    title: 'Bayesian Stream Tuner — KDD 2025 Poster',
    type: 'poster',
    date: 'August 2025',
    description: 'Poster presentation at KDD 2025 on dynamic hyperparameter optimization for real-time data streams using Bayesian techniques.',
    source: 'KDD 2025',
    tags: ['Bayesian Optimization', 'Data Streams', 'AutoML'],
    // image: '/media/posters/kdd-2025-poster.jpg',
    // file: '/media/posters/kdd-2025-poster.pdf',
  },
  {
    title: 'Auto-Reg — PAKDD 2025 Poster',
    type: 'poster',
    date: 'April 2025',
    description: 'Poster presentation at PAKDD 2025 showcasing a dynamic AutoML framework for streaming regression tasks.',
    source: 'PAKDD 2025',
    tags: ['AutoML', 'Streaming Regression', 'Concept Drift'],
    // image: '/media/posters/pakdd-2025-poster.jpg',
    // file: '/media/posters/pakdd-2025-poster.pdf',
  },

  // ── Paper Presentations ────────────────────────────────
  {
    title: 'ASML-REG — ACM SAC 2025 Paper Presentation',
    type: 'presentation',
    date: 'March 2025',
    description: 'Paper presentation at the 40th ACM/SIGAPP Symposium on Applied Computing on automated machine learning for data stream regression.',
    source: 'ACM SAC 2025',
    tags: ['AutoML', 'Data Streams', 'Regression'],
    // file: '/media/presentations/acm-sac-2025-slides.pdf',
    // video: 'https://www.youtube.com/watch?v=...',
  },
  {
    title: 'ASML — AutoML 2024 Paper Presentation',
    type: 'presentation',
    date: 'September 2024',
    description: 'Presentation at AutoML 2024 on a scalable and efficient AutoML solution for data streams with adaptive learning strategies.',
    source: 'AutoML 2024',
    tags: ['AutoML', 'Scalability', 'Data Streams'],
    // file: '/media/presentations/automl-2024-slides.pdf',
    // video: 'https://www.youtube.com/watch?v=...',
  },
  {
    title: 'COVIS-Health — ICAIHC 2025 Presentation',
    type: 'presentation',
    date: 'February 2025',
    description: 'Presentation at the International Conference on Ambient Intelligence in Health Care on a deep learning and explainable AI-based COVID-19 decision support system.',
    source: 'ICAIHC 2025',
    tags: ['Deep Learning', 'Explainable AI', 'COVID-19'],
    // file: '/media/presentations/icaihc-2025-slides.pdf',
  },
];

export default mediaItems;
