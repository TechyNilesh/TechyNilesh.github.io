export type MediaType = 'news' | 'poster' | 'presentation';

export interface MediaItem {
  title: string;
  type: MediaType;
  date: string;
  description: string;
  source?: string; // e.g. "NDTV", "KDD 2025"
  mediaFolder?: string; // folder name under /public/media/ — all media auto-discovered
  links?: { text: string; url: string }[];
  tags?: string[];
}

export const pageDescription = 'News features, conference poster sessions, and paper presentations from research and industry work.';

const mediaItems: MediaItem[] = [
  {
    title: 'Bayesian Stream Tuner — KDD 2025 Oral Presentation',
    type: 'presentation',
    date: 'August 2025',
    description:
      'Oral presentation at ACM SIGKDD 2025 (Toronto, Canada) on "Bayesian Stream Tuner: Dynamic Hyperparameter Optimization for Real-Time Data Streams". ' +
      'The paper introduces a Bayesian optimization framework that continuously adapts hyperparameters on-the-fly without expensive retraining cycles, ' +
      'maintaining robust performance in non-stationary streaming environments. ' +
      'Co-authored with Albert Bifet, Bernhard Pfahringer, and Maroua Bahri.',
    source: 'ACM KDD 2025',
    tags: ['Machine Learning', 'Bayesian Optimization', 'AutoML', 'Data Streams', 'Hyperparameter Optimization', 'KDD 2025'],
    mediaFolder: 'kdd-2025',
  },
  {
    title: 'Auto-Reg — PAKDD 2025 Presentation',
    type: 'presentation',
    date: 'May 2025',
    description:
      'Presented research paper "Auto-Reg: A Dynamic AutoML Framework for Streaming Regression" at PAKDD 2025 in Sydney, Australia. ' +
      'The work introduces a novel approach to automated machine learning for streaming data, addressing the critical challenge of regression in dynamic environments where data continuously evolves. ' +
      'Co-authored with Albert Bifet and Bernhard Pfahringer from the University of Waikato, and Maroua Bahri from Sorbonne University, Paris.',
    source: 'PAKDD 2025',
    tags: ['Machine Learning', 'AutoML', 'Streaming Data', 'Regression', 'Data Science', 'PAKDD 2025'],
    mediaFolder: 'pakdd-2025',
  },
  {
    title: 'ASML-REG — SAC 2025 Presentation',
    type: 'presentation',
    date: 'March 2025',
    description:
      'Presented research paper "ASML-REG: Automated Machine Learning for Data Stream Regression" at The 40th ACM/SIGAPP Symposium on Applied Computing (SAC 2025) in Catania, Sicily, Italy. ' +
      'Hosted by the University of Catania, the work focuses on automating machine learning for dynamic data stream regression. ' +
      'Co-authored with Albert Bifet, Bernhard Pfahringer, and Maroua Bahri.',
    source: 'ACM SAC 2025',
    tags: ['Machine Learning', 'Data Streams', 'AutoML', 'Regression', 'Applied Computing', 'SAC 2025'],
    mediaFolder: 'sac-2025',
  },
  {
    title: 'AutoSAD — PRICAI 2025 Poster',
    type: 'poster',
    date: 'February 2025',
    description:
      'Poster presentation at PRICAI 2025 (Wellington, New Zealand) on AutoSAD: An Adaptive Framework for Automated Streaming Anomaly Detection. ' +
      'AutoSAD introduces an automated approach to anomaly detection in data streams using multi-armed bandit optimization and evolutionary algorithms, ' +
      'addressing the challenge of adapting to evolving data patterns in real-time streaming environments. ' +
      'Co-authored with Albert Bifet, Bernhard Pfahringer, and Maroua Bahri.',
    source: 'PRICAI 2025',
    tags: ['Machine Learning', 'Anomaly Detection', 'AutoML', 'Data Streams', 'PRICAI 2025'],
    mediaFolder: 'pricai-2025',
  },
  {
    title: 'ASML — AutoML Conference 2024 Presentation & Poster',
    type: 'poster',
    date: 'September 2024',
    description:
      'Paper "ASML: A Scalable and Efficient AutoML Solution for Data Streams" selected in the main track of the AutoML Conference 2024 in Paris, France. ' +
      'Delivered a short pitch and engaged in a vibrant poster session with insightful discussions around the work. ' +
      'Co-authored with Albert Bifet, Bernhard Pfahringer, and Maroua Bahri.',
    source: 'AutoML Conference 2024',
    tags: ['Machine Learning', 'AutoML', 'Data Streams', 'AutoML 2024'],
    mediaFolder: 'automl-2024',
    links: [{ text: 'Paper', url: 'https://lnkd.in/gEeVyp88' }],
  },
  {
    title: 'Started Ph.D. at the University of Waikato',
    type: 'news',
    date: 'March 2024',
    description:
      'Began Ph.D. journey at the University of Waikato with a full scholarship, supervised by Prof. Albert Bifet (Chief Supervisor) and Prof. Bernhard Pfahringer (Co-Supervisor). ' +
      'Research focus on AI and machine learning, exploring their applications across various domains. ' +
      'Coming from a small village and a Hindi medium school, this opportunity represents a dream come true.',
    source: 'University of Waikato',
    tags: ['PhD', 'AI', 'Machine Learning', 'Research', 'Scholarship', 'University of Waikato'],
    mediaFolder: 'phd-waikato',
  },
  {
    title: 'NLP Seminar at Atal Bihari Vajpayee University, Bilaspur',
    type: 'presentation',
    date: '2023',
    description:
      'Invited seminar on Natural Language Processing at Atal Bihari Vajpayee University, Bilaspur. ' +
      'Covered topics including Transformers, Text Summarisation, and fine-tuning BERT models on downstream tasks. ' +
      'Honoured by the Vice Chancellor, HOD, and faculty members. Presented to students from multiple colleges.',
    source: 'Atal Bihari Vajpayee University',
    tags: ['NLP', 'Transformers', 'BERT', 'Text Summarisation', 'Machine Learning', 'Seminar'],
    mediaFolder: 'abv-university-seminar',
  },
  {
    title: 'M.Sc. Computer Science Gold Medal — Governor of Chhattisgarh',
    type: 'news',
    date: '2023',
    description:
      'Awarded the Gold Medal for M.Sc. Computer Science in Application by the Governor of Chhattisgarh at the convocation ceremony. ' +
      'Recognised for outstanding academic achievement in the programme.',
    source: 'Atal Bihari Vajpayee University',
    tags: ['Gold Medal', 'Computer Science', 'M.Sc.', 'Academic Excellence'],
    mediaFolder: 'msc-gold-medal-ceremony',
  },
];

export default mediaItems;
