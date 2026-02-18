export interface Certification {
  name: string;
  provider: string;
  year: string;
  link: string;
}

export const sectionDescription = 'Professional certifications in deep learning, machine learning, and data science from leading institutions.';

const certifications: Certification[] = [
  {
    name: 'Deep Learning Specialization',
    provider: 'DeepLearning.ai',
    year: '2020',
    link: 'https://www.coursera.org/account/accomplishments/specialization/M8E9YNLQU9KJ',
  },
  {
    name: 'Machine Learning Specialization',
    provider: 'Stanford / Coursera',
    year: '2020',
    link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/HAH73BGNA8ZG',
  },
  {
    name: 'Data Science Math Skills',
    provider: 'Duke University',
    year: '2020',
    link: 'https://www.coursera.org/account/accomplishments/verify/PDRAULFZAKTH',
  },
  {
    name: 'Problem Solving',
    provider: 'HackerRank',
    year: '2020',
    link: 'https://www.hackerrank.com/certificates/fd3a96cf6181',
  },
  {
    name: 'Python 101 for Data Science',
    provider: 'IBM Cognitive Class',
    year: '2020',
    link: 'https://courses.cognitiveclass.ai/certificates/8d1b178e28d64e3681d440aeaddefcb9',
  },
];

export default certifications;
