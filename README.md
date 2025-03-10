# FindYoga - Yoga Studio Directory

A Next.js website that helps users find yoga studios in their area. Built with Next.js, Tailwind CSS, and MDX for content management

## Project Structure

```
findyoga/
├── components/         # React components
├── data/               # MDX content files
│   └── schools/        # Yoga studio data files
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # CSS files
└── utils/              # Utility functions
```

## Features

- Static site generation for fast performance
- Search functionality by location and yoga style
- Featured yoga studios showcase
- City-based directory browsing
- Responsive design for all devices
- MDX-based content management

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content Management

Yoga studio data is stored in MDX files under the `data/schools/` directory. Each file follows this format:

```mdx
---
title: Studio Name
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
draft: false
summary: Brief description of the studio
gm_reviews_count: 45
gm_totalScore: 5
gym_score: 4.5
city: City Name
state: State
country: Country
url: unique-url-slug
---

Content about the yoga studio...
```

## License

[MIT](https://choosealicense.com/licenses/mit/) 