# Nilesh Verma - Portfolio Website

Personal portfolio website showcasing my research, projects, publications, and blog posts.

**Live:** [nileshverma.com](https://nileshverma.com)

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router v7
- **Deployment:** GitHub Pages

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home - Hero, About, Experience, Skills, Achievements, Education, Certifications |
| `/projects` | AI products and open-source tools |
| `/publications` | Research papers, patents, and book chapters |
| `/media` | News features, conference talks, and posters |
| `/blog` | Medium blog posts (fetched via RSS) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/TechyNilesh/Nilesh-Verma-Portfolio-Website.git
cd Nilesh-Verma-Portfolio-Website
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable components (SEO, theme, UI)
├── data/           # Static data (projects, publications, media)
├── hooks/          # Custom React hooks
├── layout/         # Navigation and Footer
├── pages/          # Page components
│   └── home/
│       └── sections/   # Home page sections
├── utils/          # Utility functions
└── App.tsx         # Root component with routes
public/
├── projects/       # Project media assets
├── publications/   # Publication media assets
├── media/          # Media page assets
├── profile.png     # Profile photo
├── sitemap.xml     # SEO sitemap
└── robots.txt      # Crawler directives
```

## License

All rights reserved.
