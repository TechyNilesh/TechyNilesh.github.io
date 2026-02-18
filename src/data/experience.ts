export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
}

export const sectionDescription = 'Over 5 years of industry and research experience across AI platforms, NLP systems, and cloud-based ML solutions.';

const experiences: Experience[] = [
  {
    role: 'Project Assistant',
    company: 'TAIAO, AI Institute, University of Waikato',
    period: 'Jan 2025 – Present',
    location: 'Hamilton, New Zealand',
    description: 'Contributing to Weka Web and Weka Copilot to make machine learning accessible to millions. Building end-to-end ML pipelines and helping companies integrate AI solutions.',
  },
  {
    role: 'Research Visitor',
    company: 'CNRS Labs, Sorbonne Université',
    period: 'Sep 2025 – Oct 2025',
    location: 'Paris, France',
    description: 'Conducted research on AutoML and model selection for streaming ML workloads. Worked on Bayesian optimization methods for hyperparameter tuning under resource constraints.',
  },
  {
    role: 'AI Consultant',
    company: 'Moana Digital Solutions',
    period: 'Nov 2023 – Aug 2024',
    location: 'Auckland, New Zealand',
    description: 'Developed AI micro SaaS products including APIs for grammar checking, text completion, and web search bots. Built comprehensive law AI Solution and AI Coach audio bot.',
  },
  {
    role: 'Data Scientist',
    company: 'Amlgo Labs',
    period: 'May 2022 – Jun 2023',
    location: 'Gurugram, India',
    description: 'Created end-to-end AI analytical applications on AWS Cloud for automotive industry. Extracted information from unstructured text using NLP predictive modeling.',
  },
  {
    role: 'Data Scientist',
    company: 'Xceedance Inc',
    period: 'May 2021 – May 2022',
    location: 'Gurugram, India',
    description: 'Developed deep learning and ML models for NLP and computer vision tasks (BERT, YOLO). Worked on data extraction from unstructured raw data.',
  },
  {
    role: 'ML Developer',
    company: 'Ganani.ai',
    period: 'May 2020 – May 2021',
    location: 'Bangalore, India',
    description: 'Worked on speech/text analytics and created NLP models for regional languages (Hindi, Tamil, Marathi). Built Conversation AI solution for multiple languages.',
  },
];

export default experiences;
