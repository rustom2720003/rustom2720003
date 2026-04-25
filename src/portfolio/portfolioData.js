const advancedTaskAppUrl = `${import.meta.env.BASE_URL}advanced-task-productivity-app/`
const portfolioWebsiteUrl = 'https://rustom2720003.github.io/rustom2720003/'
const profilePhotoUrl = `${import.meta.env.BASE_URL}profile/Rustom_Profile.jpeg`
const profilePhotoFallbackUrl = `${import.meta.env.BASE_URL}profile/rustom-profile-photo.svg`

export const profile = {
  name: 'Rustom Singh Yadav',
  title: 'Full Stack Developer',
  company: 'Oracle Financial Services Software Ltd.',
  experience: 'Close to 4 years',
  location: 'Pune, India',
  phoneDisplay: '8468020998',
  phoneHref: 'tel:+918468020998',
  email: 'rustom2720003@gmail.com',
  emailHref: 'mailto:rustom2720003@gmail.com',
  linkedinDisplay: 'linkedin.com/in/rustom-singh-yadav-9a717a173',
  linkedinUrl: 'https://www.linkedin.com/in/rustom-singh-yadav-9a717a173/',
  websiteDisplay: 'rustom2720003.github.io/rustom2720003',
  websiteUrl: portfolioWebsiteUrl,
  photoSrc: profilePhotoUrl,
  photoFallbackSrc: profilePhotoFallbackUrl,
  photoAlt: 'Profile photo of Rustom Singh Yadav',
  profileBannerDescription:
    'React-focused full stack developer building enterprise interfaces, live product demos, and polished user experiences backed by clean integrations.',
  heroTitle: 'React-first interfaces for enterprise products and modern web apps.',
  heroDescription:
    'I design reusable components, routed experiences, and API-backed workflows that stay fast, maintainable, and visually polished across banking platforms and modern product builds.',
  overview:
    'Full Stack Developer with close to 4 years of experience building React-driven interfaces, enterprise banking modules, and scalable web applications using OBDX, Java, and modern frontend technologies. Skilled in component-based UI development, reusable frontend architecture, REST API integration, and designing secure, maintainable systems in Agile and Scrum environments.',
  intro:
    'Shipping React-friendly interfaces, clean integrations, and polished user experiences across enterprise banking systems and modern product builds.',
}

export const navigationLinks = [
  { label: 'Overview', to: '/', end: true },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' },
]

export const heroStats = [
  {
    value: '3.5+',
    label: 'Years of delivery',
    detail: 'Frontend, middleware, and product-focused delivery',
  },
  {
    value: '3',
    label: 'Enterprise programs',
    detail: 'ADCB, QNB, and Barclays implementation experience',
  },
  {
    value: '2',
    label: 'Oracle roles',
    detail: 'Progressed from Software Developer I to II',
  },
  {
    value: '1',
    label: 'Full-stack product',
    detail: 'React, Spring Boot, and MySQL showcase app',
  },
]

export const focusAreas = [
  'Reusable React components, routed pages, and maintainable UI architecture',
  'REST API integration, Java middleware, and validation-driven enterprise modules',
  'Responsive design, performance tuning, and production-ready delivery',
]

export const strengths = [
  {
    title: 'React-driven UI architecture',
    description:
      'Builds modular interfaces with reusable UI blocks, routed views, and data-driven rendering patterns that scale cleanly as products grow.',
  },
  {
    title: 'Enterprise API integration',
    description:
      'Connects frontend workflows with Java services and REST APIs while keeping validation, responsiveness, and delivery reliability in focus.',
  },
  {
    title: 'Ownership from build to release',
    description:
      'Takes features from implementation through release support, contributes in reviews, and helps teams move faster with cleaner code.',
  },
]

export const currentFocus = {
  title: 'ADCB Trade module delivery across OBDX workflows',
  summary:
    'Currently contributing across ADCB Trade modules in OBDX 22.2.5, building and refining customer-facing journeys, validation layers, and secure integrations with Java and KnockoutJS.',
  tags: ['ADCB Trade', 'Cross-module delivery', 'Secure integrations'],
  points: [
    'Works across multiple trade modules instead of a single isolated workflow.',
    'Handles UI customization, validations, API integration, and backend coordination for reliable delivery.',
    'Focuses on usability, performance, maintainability, and compliance across releases.',
  ],
}

export const experience = [
  {
    role: 'Software Developer II',
    company: 'Oracle Financial Services Software Ltd.',
    location: 'Pune, India',
    period: 'Sep 2024 - Present',
    summary:
      'Driving scalable module delivery while taking ownership of design quality, end-to-end execution, and better engineering practices.',
    highlights: [
      'Delivered high-quality, scalable solutions while owning modules from implementation through handoff.',
      'Led code reviews and mentorship sessions that helped junior developers adopt stronger coding practices.',
      'Worked across teams to improve system design, deployment efficiency, performance, and reliability.',
    ],
  },
  {
    role: 'Software Developer I',
    company: 'Oracle Financial Services Software Ltd.',
    location: 'Pune, India',
    period: 'Aug 2022 - Aug 2024',
    summary:
      'Enhanced front-end and middleware capabilities for banking applications with a strong focus on responsiveness, maintainability, and integration quality.',
    highlights: [
      'Enhanced front-end and middleware using OBDX, Java, and KnockoutJS to improve reliability, responsiveness, and user satisfaction.',
      'Built custom modules for payments, dashboards, and data validation with seamless REST API integration.',
      'Refactored legacy code with cross-functional teams, reducing defects and making future enhancements easier to deliver.',
    ],
  },
]

export const education = {
  institute: 'Army Institute of Technology',
  degree: 'B.E. in Computer Engineering',
  score: 'CGPA: 8.25 / 10',
  location: 'Pune, India',
  period: 'Jul 2018 - Jul 2022',
}

export const projectFilters = [
  'All',
  'Banking Platforms',
  'API Integration',
  'Leadership',
  'Full Stack',
  'React Product',
]

export const projects = [
  {
    name: 'Abu Dhabi Commercial Bank (ADCB) - Trade LC Module',
    client: 'ADCB Trade',
    period: 'Jan 2025 - Present',
    stack: ['OBDX 22.2.5', 'Java', 'KnockoutJS', 'JavaScript', 'REST APIs'],
    filters: ['Banking Platforms', 'API Integration'],
    summary:
      'Developed and customized the Initiate Letter of Credit module covering LC Details, LC Shipment, and LC Attachment journeys for trade workflows.',
    highlights: [
      'Built dynamic MVVM-based frontend interfaces for responsive and interactive user workflows.',
      'Implemented and integrated custom backend REST APIs for LC data processing, validation, and persistence.',
      'Improved frontend-backend integration with secure data handling and optimized runtime performance.',
      'Worked with cross-functional teams to enhance usability, compliance, and trade process efficiency.',
    ],
  },
  {
    name: 'Qatar National Bank (QNB) - UI Rebranding and Modules',
    client: 'QNB',
    period: 'Jul 2024 - Dec 2024',
    stack: ['Java', 'OBDX', 'JavaScript', 'HTML', 'CSS'],
    filters: ['Banking Platforms', 'Leadership'],
    summary:
      'Led a major UI rebranding initiative while building new modules for payments, exception handling, and reporting.',
    highlights: [
      'Aligned the full interface with client branding guidelines to improve consistency and adoption.',
      'Delivered new modules that matched regulatory standards and client requirements.',
      'Optimized frontend performance to reduce load times and improve overall user engagement.',
    ],
  },
  {
    name: 'Barclays - DDS, Bulk, and IBAN Converter',
    client: 'Barclays',
    period: 'Feb 2023 - Feb 2024',
    stack: ['OBDX', 'Java', 'JavaScript', 'KnockoutJS', 'Validation APIs'],
    filters: ['Banking Platforms', 'API Integration'],
    summary:
      'Delivered complex banking modules and validation-heavy payment utilities across multiple environments.',
    highlights: [
      'Built DDS and Bulk modules with advanced search, amendment, and deletion flows aligned to client business needs.',
      'Designed and implemented an IBAN Converter for international payments using multiple validation APIs.',
      'Resolved UI, integration, and performance issues to improve transactional reliability and system robustness.',
    ],
  },
  {
    name: 'Advanced Task Productivity App',
    client: 'React Product Project',
    period: 'Live Demo',
    stack: ['React.js', 'Vite', 'CSS Modules', 'localStorage', 'Lucide React'],
    filters: ['React Product'],
    summary:
      'Built a polished productivity board inspired by Jira and Trello patterns, focused on reusable React components, modern hooks, and a clean task-management experience.',
    highlights: [
      'Implemented task creation, editing, deletion, filtering, status updates, and search with responsive feedback across the board.',
      'Used custom hooks, derived state, and localStorage persistence to keep the UI architecture modular and easy to extend.',
      'Built a card-based dashboard with clear visual hierarchy, stats, due-date insights, and a mobile-friendly layout.',
    ],
    links: [{ href: advancedTaskAppUrl, label: 'Live Demo', newTab: true }],
  },
]

export const skillGroups = [
  {
    title: 'Languages',
    items: ['Java', 'JavaScript', 'Python', 'C/C++', 'SQL', 'HTML/CSS'],
  },
  {
    title: 'Frameworks and Libraries',
    items: [
      'Spring Boot Web',
      'React.js',
      'KnockoutJS',
      'Node.js',
      'Lombok',
    ],
  },
  {
    title: 'Tools and Platforms',
    items: [
      'Git',
      'SVN',
      'IntelliJ',
      'Eclipse',
      'Visual Studio',
      'Postman',
      'Maven',
      'npm',
    ],
  },
  {
    title: 'Databases',
    items: ['MySQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Core Skills',
    items: [
      'REST API Integration',
      'AJAX',
      'JSON',
      'WebSockets',
      'Agile/Scrum',
      'Unit Testing',
      'JUnit',
      'Mockito',
    ],
  },
]

export const reactConcepts = [
  {
    title: 'Reusable components',
    detail:
      'The site is split into focused building blocks for navigation, hero content, metrics, experience cards, project cards, and contact sections.',
  },
  {
    title: 'Routed and data-driven pages',
    detail:
      'Navigation, experience, projects, skills, and resume content are rendered from structured data instead of repeated hardcoded markup.',
  },
  {
    title: 'Modern React interactions',
    detail:
      'Project filtering, mobile navigation, copy actions, and resume downloads are powered by React state, handlers, and utility functions.',
  },
  {
    title: 'Responsive presentation logic',
    detail:
      'Responsive layouts, animated sections, active states, and conditional UI feedback are handled directly in the component layer.',
  },
]

export const resumeColumns = [
  {
    title: 'Career focus',
    items: [
      'React-focused Full Stack Developer for banking and enterprise delivery.',
      'Strong in reusable UI architecture, API integration, and maintainable module design.',
      'Comfortable owning features across implementation, review, release, and optimization cycles.',
    ],
  },
  {
    title: 'Delivery strengths',
    items: [
      'Trade finance, payments, dashboards, validation, reporting, and interactive workflow experiences.',
      'Secure REST integrations, responsive UI implementation, and performance-aware frontend delivery.',
      'Mentorship, collaboration, and cross-team engineering support in Agile environments.',
    ],
  },
]

export const contactCards = [
  {
    label: 'Email',
    value: 'rustom2720003@gmail.com',
    href: 'mailto:rustom2720003@gmail.com',
    hint: 'Best for project discussions and hiring conversations',
  },
  {
    label: 'Phone',
    value: '8468020998',
    href: 'tel:+918468020998',
    hint: 'Available for direct communication and quick follow-up',
  },
  {
    label: 'LinkedIn',
    value: 'rustom-singh-yadav-9a717a173',
    href: profile.linkedinUrl,
    hint: 'Open the live LinkedIn profile in a new tab',
    newTab: true,
  },
  {
    label: 'Website',
    value: 'Portfolio Website',
    href: profile.websiteUrl,
    hint: 'Explore the live portfolio, projects, and downloadable resume',
    newTab: true,
  },
]

export const buildResumeText = () => {
  const lines = [
    profile.name,
    `${profile.phoneDisplay} | ${profile.email} | LinkedIn: ${profile.linkedinUrl} | Portfolio: ${profile.websiteUrl}`,
    '',
    'PROFESSIONAL OVERVIEW',
    profile.overview,
    '',
    'EDUCATION',
    `${education.institute} - ${education.degree}`,
    `${education.location} | ${education.period} | ${education.score}`,
    '',
    'EXPERIENCE',
    ...experience.flatMap((item) => [
      `${item.role} - ${item.company}`,
      `${item.location} | ${item.period}`,
      item.summary,
      ...item.highlights.map((highlight) => `- ${highlight}`),
      '',
    ]),
    'PROJECTS',
    ...projects.flatMap((project) => [
      `${project.name}`,
      `${project.client} | ${project.period}`,
      `Stack: ${project.stack.join(', ')}`,
      project.summary,
      ...project.highlights.map((highlight) => `- ${highlight}`),
      '',
    ]),
    'TECHNICAL SKILLS',
    ...skillGroups.flatMap((group) => [
      `${group.title}: ${group.items.join(', ')}`,
    ]),
  ]

  return lines.join('\n')
}
