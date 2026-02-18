export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link: string;
}

export const sectionDescription = 'AI-powered products spanning voice platforms, research tools, and accessible machine learning for everyone.';

const projects: Project[] = [
  {
    title: 'AkoDesk',
    subtitle: 'AI Voice Calling Platform',
    description: 'AI voice calling platform providing intelligent voice assistants for business communications, including inbound and outbound calling workflows.',
    tags: ['Voice AI', 'LLM', 'Telephony', 'Automation'],
    link: 'https://akodesk.com/',
  },
  {
    title: 'BhriguGPT',
    subtitle: 'AI Spiritual Guidance Platform',
    description: 'AI-powered platform combining Vedic astrology and related systems with conversational AI for personalized spiritual guidance.',
    tags: ['Generative AI', 'Astrology', 'Chatbot', 'NLP'],
    link: 'https://bhrigugpt.com/',
  },
  {
    title: 'OmniScholar',
    subtitle: 'AI Research Productivity Platform',
    description: 'AI platform that streamlines academic workflows from literature discovery to publication with summarization, note-taking, and research agents.',
    tags: ['Research AI', 'LLM Agents', 'Productivity', 'Academic'],
    link: 'https://omnischolar.pro/',
  },
  {
    title: 'Weka.ai',
    subtitle: 'Machine Learning for Everyone',
    description: 'Making machine learning and data science accessible to everyone. No complex setup, no steep learning curves — just powerful AI tools that work.',
    tags: ['AutoML', 'Weka', 'Web Platform', 'Education'],
    link: 'https://weka.ai/',
  },
];

export default projects;
