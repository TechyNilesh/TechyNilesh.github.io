export type PublicationType = 'conference' | 'journal' | 'book-chapter' | 'patent' | 'book';

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  date: string;
  abstract: string;
  keywords: string[];
  doi?: string;
  paperLink?: string;
  type: 'conference' | 'journal' | 'book-chapter' | 'patent' | 'book';
  mediaFolder?: string; // folder name under /public/publications/ — images, PDFs, PPTs auto-discovered
}

export const sectionDescription = 'Discover relevant content by exploring my research papers in AutoML, data streaming, and machine learning applications.';

export const pageDescription = 'Research papers in AutoML, data streaming, NLP, and machine learning applications.';

const publications: Publication[] = [
  {
    title: 'Bayesian Stream Tuner: Dynamic Hyperparameter Optimization for Real-Time Data Streams',
    authors: ['Nilesh Verma', 'Albert Bifet', 'Bernhard Pfahringer', 'Maroua Bahri'],
    venue: 'KDD 2025 — Proceedings of the 31st ACM SIGKDD Conference on Knowledge Discovery and Data Mining',
    year: 2025,
    date: 'January 2025',
    abstract:
      'This paper presents Bayesian Stream Tuner, a novel framework for dynamic hyperparameter optimization in real-time data stream environments. Traditional hyperparameter optimization methods are inadequate for streaming scenarios due to concept drift and the need for continuous adaptation. Our approach leverages Bayesian optimization techniques to dynamically adjust hyperparameters as data characteristics evolve, ensuring optimal model performance throughout the stream lifecycle. The framework incorporates uncertainty quantification and adaptive exploration strategies specifically designed for non-stationary environments.',
    keywords: ['Hyperparameter Optimization', 'Data Streams', 'Concept Drift', 'Bayesian Optimization', 'Real-Time ML'],
    paperLink: 'https://nileshverma.com/publication/bayesian-stream-tuner/',
    type: 'conference',
    mediaFolder: '2025-bayesian-stream-tuner',
  },
  {
    title: 'Auto-Reg: A Dynamic AutoML Framework for Streaming Regression',
    authors: ['Nilesh Verma', 'Albert Bifet', 'Bernhard Pfahringer', 'Maroua Bahri'],
    venue: 'PAKDD 2025 — Pacific-Asia Conference on Knowledge Discovery and Data Mining',
    year: 2025,
    date: 'April 2025',
    abstract:
      'Auto-Reg introduces a comprehensive AutoML framework tailored for streaming regression scenarios with capabilities for dynamic adaptation to changing data patterns. The framework features intelligent model selection, automated feature engineering, and real-time hyperparameter tuning. Key innovations include a concept drift detection mechanism designed specifically for regression tasks and an adaptive ensemble method that sustains prediction performance as data distributions evolve. The research demonstrates measurable gains in both predictive accuracy and computational performance across various streaming regression applications.',
    keywords: ['AutoML', 'Streaming Regression', 'Concept Drift Detection', 'Adaptive Ensemble', 'Feature Engineering'],
    paperLink: 'https://nileshverma.com/publication/auto-reg/',
    type: 'conference',
    mediaFolder: '2025-auto-reg',
  },
  {
    title: 'ASML-REG: Automated Machine Learning for Data Stream Regression',
    authors: ['Nilesh Verma', 'Albert Bifet', 'Bernhard Pfahringer', 'Maroua Bahri'],
    venue: 'ACM SAC 2025 — Proceedings of the 40th ACM/SIGAPP Symposium on Applied Computing',
    year: 2025,
    date: 'March 2025',
    abstract:
      'ASML-REG extends automated machine learning capabilities to data stream regression tasks. This work addresses the unique challenges of regression in streaming environments, including concept drift detection, adaptive model selection, and real-time performance optimization. The system automatically selects and configures regression algorithms, handles feature engineering, and maintains prediction accuracy as data distributions evolve over time. Experimental evaluation demonstrates superior performance compared to static AutoML approaches on various streaming regression benchmarks.',
    keywords: ['AutoML', 'Data Streams', 'Regression', 'Concept Drift', 'Model Selection'],
    paperLink: 'https://nileshverma.com/publication/asml-reg/',
    type: 'conference',
    mediaFolder: '2025-asml-reg',
  },
  {
    title: 'COVIS-Health: A Deep Learning and Explainable AI-Based Decision Support System for Identification of COVID-19',
    authors: ['RK Sharma', 'Nilesh Verma', 'RK Hota'],
    venue: 'ICAIHC 2025 — International Conference on Ambient Intelligence in Health Care',
    year: 2025,
    date: 'February 2025',
    abstract:
      'COVIS-Health presents an advanced decision support system for COVID-19 identification using deep learning and explainable AI techniques. The system analyzes chest CT-scan images to classify positive and negative cases with high accuracy while providing transparent explanations for medical professionals. Key features include a robust deep learning architecture achieving 99% accuracy, integration of explainable AI techniques to highlight infection areas, and a user-friendly web-based interface. The system demonstrates significant potential for clinical deployment and aids healthcare professionals in rapid COVID-19 diagnosis.',
    keywords: ['Deep Learning', 'Explainable AI', 'COVID-19', 'CT-Scan', 'Decision Support System'],
    paperLink: 'https://nileshverma.com/publication/covis-health/',
    type: 'conference',
    mediaFolder: '2025-covis-health',
  },
  {
    title: 'ASML: A Scalable and Efficient AutoML Solution for Data Streams',
    authors: ['Nilesh Verma', 'Albert Bifet', 'Bernhard Pfahringer', 'Maroua Bahri'],
    venue: 'AutoML 2024 — International Conference on Automated Machine Learning',
    year: 2024,
    date: 'September 2024',
    abstract:
      'ASML introduces a scalable automated machine learning system designed for streaming data environments. It addresses key challenges including concept drift, limited computational resources, and the need for real-time processing through adaptive learning algorithms and resource-aware optimization strategies. Comprehensive evaluation demonstrates that ASML achieves competitive performance on multiple streaming benchmarks while maintaining computational efficiency suitable for real-time deployment.',
    keywords: ['AutoML', 'Data Streams', 'Scalability', 'Concept Drift', 'Real-Time Processing'],
    paperLink: 'https://nileshverma.com/publication/asml-scalable-automl/',
    type: 'conference',
    mediaFolder: '2024-asml',
  },
  {
    title: 'Design and Development of Machine Learning-Based Depression Identification Decision Support System',
    authors: ['Nilesh Verma', 'RK Hota'],
    venue: 'Machine Learning for Real World Applications — Springer',
    year: 2024,
    date: 'January 2024',
    abstract:
      'This work presents a comprehensive decision support system for depression identification using machine learning techniques. The framework integrates actigraphy data, social media text analysis, and behavioral patterns to provide multi-modal depression detection. It utilizes advanced NLP techniques for social media sentiment analysis and time-series analysis for activity data. The system achieves high accuracy in depression detection while providing interpretable outputs suitable for clinical use and early intervention programs.',
    keywords: ['Depression Detection', 'Machine Learning', 'NLP', 'Decision Support System', 'Mental Health'],
    paperLink: 'https://nileshverma.com/publication/depression-identification/',
    type: 'book-chapter',
    mediaFolder: '2024-depression-identification',
  },
  {
    title: 'Integration of Deep Learning Techniques for Sentiment and Emotion Analysis of Social Media Data',
    authors: ['H.S. Hota', 'D.K. Sharma', 'Nilesh Verma'],
    venue: 'International Journal of Intelligent Systems Technologies and Applications',
    year: 2023,
    date: '2023',
    abstract:
      'This paper explores the integration of deep learning techniques for comprehensive sentiment and emotion analysis on social media data. The work examines various neural network architectures for text classification, comparing their effectiveness in detecting nuanced emotional states beyond simple positive/negative sentiment.',
    keywords: ['Deep Learning', 'Sentiment Analysis', 'Emotion Analysis', 'Social Media', 'NLP'],
    type: 'journal',
    mediaFolder: '2023-sentiment-emotion-analysis',
  },
  {
    title: 'COVID-19: Machine Learning Methods Applied for Twitter Sentiment Analysis of Indians Before, During and After Lockdown',
    authors: ['H.S. Hota', 'D.K. Sharma', 'Nilesh Verma'],
    venue: 'International Journal of Computing Science and Mathematics 17 (1), 95-105',
    year: 2023,
    date: '2023',
    abstract:
      'This study applies machine learning methods to analyze Twitter sentiment among Indian users across three distinct phases: before, during, and after the COVID-19 lockdown. The research tracks the evolution of public sentiment through these critical periods, providing insights into how lockdown policies impacted public opinion and emotional responses.',
    keywords: ['COVID-19', 'Sentiment Analysis', 'Twitter', 'Machine Learning', 'Lockdown'],
    type: 'journal',
    mediaFolder: '2023-covid-twitter-sentiment',
  },
  {
    title: 'Python Adventures: A Beginner\'s Guide for Young Coders',
    authors: ['Nilesh Verma'],
    venue: 'Google Books',
    year: 2023,
    date: '2023',
    abstract:
      'A beginner-friendly book designed to introduce young learners to the world of programming through Python. The book covers fundamental programming concepts with engaging examples and hands-on exercises, making coding accessible and fun for young coders.',
    keywords: ['Python', 'Programming', 'Education', 'Beginner', 'Coding'],
    paperLink: 'https://books.google.co.in/books?id=VJCnEAAAQBAJ',
    type: 'book',
    mediaFolder: '2023-python-adventures',
  },
  {
    title: 'Analyzing the Sentiments by Classifying the Tweets Based on COVID-19 Using Machine Learning Classifiers',
    authors: ['D. Dangi', 'D.K. Dixit', 'A. Bhagat', 'R. Nair', 'Nilesh Verma'],
    venue: '2021 IEEE International Conference on Technology, Research, and Innovation for Betterment of Society (TRIBES)',
    year: 2022,
    date: '2022',
    abstract:
      'This paper analyzes public sentiments by classifying COVID-19 related tweets using various machine learning classifiers. The study compares the performance of multiple classification algorithms on tweet datasets, evaluating their effectiveness in capturing the diverse range of public opinions during the pandemic.',
    keywords: ['COVID-19', 'Tweet Classification', 'Machine Learning', 'Sentiment Analysis'],
    type: 'conference',
    mediaFolder: '2022-covid-tweet-classification',
  },
  {
    title: 'A Device for the Production of Ethanol from Lignocellulosic Biomass',
    authors: ['Latika Bhatia', 'Dipankar Ghosh', 'Dilip Kumar Sahu', 'Prakash Kumar Sarangi', 'Nilesh Verma'],
    venue: 'DE Patent 202,022,102,746',
    year: 2022,
    date: '2022',
    abstract:
      'A patented device designed for the efficient production of ethanol from lignocellulosic biomass. The invention addresses the conversion of plant-based cellulosic materials into bioethanol through an optimized production process.',
    keywords: ['Ethanol', 'Lignocellulosic Biomass', 'Biofuel', 'Patent', 'Renewable Energy'],
    type: 'patent',
    mediaFolder: '2022-ethanol-patent',
  },
  {
    title: 'Lexicon-based Sentiment Analysis Using Twitter Data — A Case of COVID-19 Outbreak in India and Abroad',
    authors: ['HS Hota', 'DK Sharma', 'Nilesh Verma'],
    venue: 'Data Science for COVID-19 — Elsevier',
    year: 2021,
    date: 'September 2021',
    abstract:
      'This research applies lexicon-based and VADER sentiment analysis methods to Twitter data collected from March 15 to April 15, 2020 across six countries. Results indicate varying levels of negativity across nations, with the UK showing the highest negativity at 23.03% using the simple lexicon approach while India showed the lowest at 18.39%. VADER-based analysis revealed higher negativity rates across all nations. Analysis of India-specific data demonstrated increasing negativity post-lockdown with slight decreases during lockdown 2.0.',
    keywords: ['Sentiment Analysis', 'Lexicon-based', 'VADER', 'COVID-19', 'Twitter'],
    doi: 'https://doi.org/10.1016/B978-0-12-824536-1.00015-0',
    paperLink: 'https://nileshverma.com/publication/lexicon-based-sentiment-analysis/',
    type: 'book-chapter',
    mediaFolder: '2021-lexicon-sentiment-analysis',
  },
  {
    title: 'Deep Image Search — AI-Based Image Search Engine',
    authors: ['Nilesh Verma'],
    venue: 'GitHub — Open Source Software',
    year: 2021,
    date: '2021',
    abstract:
      'An AI-based image search engine leveraging deep transfer learning for visual similarity search. The library enables efficient reverse image search using pre-trained deep learning models to extract visual features and find similar images from large datasets.',
    keywords: ['Image Search', 'Deep Learning', 'Transfer Learning', 'Computer Vision', 'Open Source'],
    paperLink: 'https://github.com/TechyNilesh/DeepImageSearch',
    type: 'journal',
    mediaFolder: '2021-deep-image-search',
  },
  {
    title: 'Classification of Pima Indian Diabetes Dataset Using Decision Tree Techniques',
    authors: ['Nilesh Verma'],
    venue: 'IJSRD — International Journal for Scientific Research & Development',
    year: 2020,
    date: '2020',
    abstract:
      'This paper applies decision tree classification techniques to the Pima Indian Diabetes dataset for predicting diabetes onset. The study evaluates various decision tree algorithms and their effectiveness in medical diagnosis, providing a comparative analysis of classification accuracy and interpretability.',
    keywords: ['Decision Tree', 'Diabetes Prediction', 'Classification', 'Machine Learning', 'Healthcare'],
    type: 'journal',
    mediaFolder: '2020-pima-diabetes-classification',
  },
];

export default publications;
