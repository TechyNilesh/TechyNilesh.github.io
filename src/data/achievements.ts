export interface Achievement {
  title: string;
  category: string;
}

export const sectionDescription = 'Hackathon wins, national-level recognitions, and academic honors earned along the way.';

const achievements: Achievement[] = [
  {
    title: 'Awarded the Research and Enterprise Scholarship by the University of Waikato for Ph.D. studies.',
    category: 'Scholarship',
  },
  {
    title: 'Recognition of being placed 3rd in AppScript, a 48-Hour Hackathon conducted by IEEE APSIT on 6-7th Feb 2021.',
    category: 'Hackathon',
  },
  {
    title: 'Secured 1st rank in The Great Indian Hiring Hackathon (Nov 2020) based on Foretelling the Retail Price, hosted by MachineHack.',
    category: 'Hackathon',
  },
  {
    title: 'Achieved 1st rank in Data Sprint #16: Electronic Products Pricing Hackathon (December 2020) hosted by DPhi.',
    category: 'Hackathon',
  },
  {
    title: '1st rank in Robotics, Big Data, and Android Application Development university-level workshop.',
    category: 'Workshop',
  },
  {
    title: 'Various state-level news covers the development of real-time COVID-19 detection through CT-Scan software.',
    category: 'Media',
  },
  {
    title: 'Cleared NTA-NET exam on the first attempt and eligible for Assistant Professor in all over India.',
    category: 'Exam',
  },
];

export default achievements;
