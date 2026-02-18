export interface OpenSourceProject {
  name: string;
  description: string;
  stars: string;
  link: string;
}

export const sectionDescription = 'Building tools that empower developers worldwide with 80,000+ total downloads and 500+ GitHub stars.';

const openSourceProjects: OpenSourceProject[] = [
  {
    name: 'DeepImageSearch',
    description: 'AI-based image search engine with deep transfer learning',
    stars: '467',
    link: 'https://github.com/TechyNilesh/DeepImageSearch',
  },
  {
    name: 'DeepTextSearch',
    description: 'Multilingual text search with transformer embeddings (50+ languages)',
    stars: '34',
    link: 'https://github.com/TechyNilesh/DeepTextSearch',
  },
  {
    name: 'SSEM',
    description: 'Semantic similarity evaluation for NLP text generation tasks',
    stars: '5',
    link: 'https://github.com/TechyNilesh/SSEM',
  },
  {
    name: 'Autowave',
    description: 'Audio automatic classification library with augmentation',
    stars: '1',
    link: 'https://github.com/TechyNilesh/Autowave',
  },
];

export default openSourceProjects;
