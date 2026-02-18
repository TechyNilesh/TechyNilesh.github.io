export interface SkillCategory {
  name: string;
  skills: string[];
}

export const sectionDescription = 'Core competencies across the full AI stack — from generative models and ML frameworks to cloud infrastructure and web development.';

const skillCategories: SkillCategory[] = [
  {
    name: 'Generative AI & LLMs',
    skills: ['OpenAI GPT', 'Claude', 'Gemini', 'LangChain', 'CrewAI', 'RAG Systems', 'Prompt Engineering', 'Fine-Tuning', 'Agentic Workflows', 'Multimodal AI', 'Hugging Face', 'Multi-Agent Orchestration'],
  },
  {
    name: 'ML Frameworks',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'FastAI', 'River', 'Weka', 'AutoML', 'Computer Vision', 'NLP', 'BERT', 'YOLO'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Nginx', 'Git', 'MLOps', 'MLFlow'],
  },
  {
    name: 'Web & APIs',
    skills: ['React', 'FastAPI', 'Flask', 'Node.js', 'Tailwind CSS', 'RESTful APIs', 'WebSockets', 'WebRTC', 'HTML5', 'CSS3', 'Twilio'],
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL', 'Vector DB', 'Chroma', 'FAISS'],
  },
  {
    name: 'Languages & Tools',
    skills: ['Python', 'JavaScript', 'C++', 'LaTeX', 'VS Code', 'Anaconda', 'Google Colab', 'GitHub Copilot', 'n8n'],
  },
];

export default skillCategories;
