export type ProjectType = 'product' | 'opensource';

export interface Project {
  title: string;
  type: ProjectType;
  subtitle?: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  mediaFolder?: string; // folder name under /public/projects/ — images auto-discovered
}

export const pageDescription = 'AI-powered products and open-source tools spanning voice platforms, research tools, and accessible machine learning.';

export const productSectionDescription = 'AI-powered products spanning voice platforms, research tools, and accessible machine learning for everyone.';

export const opensourceSectionDescription = 'Building tools that empower developers worldwide with 80,000+ total downloads and 500+ GitHub stars.';

const projects: Project[] = [
  {
    title: 'AkoDesk',
    type: 'product',
    subtitle: 'AI Voice Calling Platform',
    description: 'AI voice calling platform providing intelligent voice assistants for business communications, including inbound and outbound calling workflows.',
    tags: ['Voice AI', 'LLM', 'Telephony', 'Automation'],
    link: 'https://akodesk.com/',
    mediaFolder: 'akodesk',
  },
  {
    title: 'BhriguGPT',
    type: 'product',
    subtitle: 'AI Spiritual Guidance Platform',
    description: 'AI-powered platform combining Vedic astrology and related systems with conversational AI for personalized spiritual guidance.',
    tags: ['Generative AI', 'Astrology', 'Chatbot', 'NLP'],
    link: 'https://bhrigugpt.com/',
    mediaFolder: 'bhrigugpt',
  },
  {
    title: 'OmniScholar',
    type: 'product',
    subtitle: 'AI Research Productivity Platform',
    description: 'AI platform that streamlines academic workflows from literature discovery to publication with summarization, note-taking, and research agents.',
    tags: ['Research AI', 'LLM Agents', 'Productivity', 'Academic'],
    link: 'https://omnischolar.pro/',
    mediaFolder: 'omnischolar',
  },
  {
    title: 'Weka.ai',
    type: 'product',
    subtitle: 'Machine Learning for Everyone',
    description: 'Making machine learning and data science accessible to everyone. No complex setup, no steep learning curves — just powerful AI tools that work.',
    tags: ['AutoML', 'Weka', 'Web Platform', 'Education'],
    link: 'https://weka.ai/',
    mediaFolder: 'weka-ai',
  },
  {
    title: 'DeepImageSearch',
    type: 'opensource',
    description: 'AI-based image search engine with deep transfer learning',
    tags: ['Computer Vision', 'Deep Learning', 'Search'],
    link: 'https://github.com/TechyNilesh/DeepImageSearch',
    github: 'https://github.com/TechyNilesh/DeepImageSearch',
    mediaFolder: 'deep-image-search',
  },
  {
    title: 'DeepTextSearch',
    type: 'opensource',
    description: 'Multilingual text search with transformer embeddings (50+ languages)',
    tags: ['NLP', 'Transformers', 'Search'],
    link: 'https://github.com/TechyNilesh/DeepTextSearch',
    github: 'https://github.com/TechyNilesh/DeepTextSearch',
    mediaFolder: 'deep-text-search',
  },
  {
    title: 'SSEM',
    type: 'opensource',
    description: 'Semantic similarity evaluation for NLP text generation tasks',
    tags: ['NLP', 'Evaluation', 'Metrics'],
    link: 'https://github.com/TechyNilesh/SSEM',
    github: 'https://github.com/TechyNilesh/SSEM',
    mediaFolder: 'ssem',
  },
  {
    title: 'Autowave',
    type: 'opensource',
    description: 'Audio automatic classification library with augmentation',
    tags: ['Audio', 'Classification', 'Augmentation'],
    link: 'https://github.com/TechyNilesh/Autowave',
    github: 'https://github.com/TechyNilesh/Autowave',
    mediaFolder: 'autowave',
  },
];

export default projects;
