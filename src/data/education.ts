export interface Education {
  degree: string;
  institution: string;
  period: string;
  detail: string;
}

export const sectionDescription = 'Academic journey from undergraduate studies in India to doctoral research in New Zealand.';

const education: Education[] = [
  {
    degree: 'PhD in Computer Science',
    institution: 'University of Waikato, New Zealand',
    period: '2023 – Present',
    detail: 'Research & Enterprise Scholarship · AutoML for Data Streams',
  },
  {
    degree: 'M.Sc. Computer Science',
    institution: 'Atal Bihari Vajpayee Vishwavidyalaya, India',
    period: '2020',
    detail: 'Gold Medalist · 88.95% Aggregate Score',
  },
  {
    degree: 'B.Sc. Computer Science',
    institution: 'Bilaspur University, India',
    period: '2017',
    detail: 'Gold Medalist · 82.54% Aggregate Score',
  },
];

export default education;
