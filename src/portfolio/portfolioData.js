const advancedTaskAppUrl = `${import.meta.env.BASE_URL}advanced-task-productivity-app/`

export const profile = {
  name: 'Rustom Singh Yadav',
  title: 'Full Stack Developer',
  company: 'Oracle Financial Services Software Ltd.',
  experience: '3.5+ years',
  location: 'Pune, India',
  phoneDisplay: '8468020998',
  phoneHref: 'tel:+918468020998',
  email: 'rustom2720003@gmail.com',
  emailHref: 'mailto:rustom2720003@gmail.com',
  linkedinDisplay: 'linkedin.com/in/rustom-singh-yadav-9a717a173',
  linkedinUrl: 'https://www.linkedin.com/in/rustom-singh-yadav-9a717a173/',
  heroTitle: 'React-focused interfaces for scalable web products.',
  heroDescription:
    'I build component-driven user interfaces, routed application flows, and API-backed features that stay responsive, maintainable, and ready for real-world enterprise delivery.',
  overview:
    'Full Stack Developer with 3.5+ years of experience delivering high-performance banking and enterprise solutions using OBDX, Java, and modern web technologies. Skilled in designing scalable, secure, and maintainable systems. Experienced in end-to-end development, including UI optimization, API integration, and working in Agile and Scrum environments. Passionate about creating seamless user experiences and solving complex business challenges efficiently.',
  intro:
    'Building reusable interfaces, clean integrations, and dependable frontend experiences across enterprise and full-stack products.',
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
    detail: 'Frontend, middleware, and full-stack product work',
  },
  {
    value: '3',
    label: 'Enterprise programs',
    detail: 'ADCB, QNB, and Barclays delivery experience',
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
  'Reusable UI components, routed pages, and maintainable frontend structure',
  'REST API integration, Java middleware, and validation-driven module delivery',
  'Responsive UX, performance tuning, and collaborative engineering practices',
]

export const strengths = [
  {
    title: 'Component-driven frontend work',
    description:
      'Builds modular interfaces with reusable UI blocks, mapped content, routed pages, and layouts that stay maintainable as products grow.',
  },
  {
    title: 'API-backed product delivery',
    description:
      'Connects frontend workflows with Java services and REST APIs while keeping validation, responsiveness, and reliability in focus.',
  },
  {
    title: 'Ownership and collaboration',
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
      'The layout is split into small presentational components for sections, metrics, experience cards, and project cards.',
  },
  {
    title: 'Mapped data',
    detail:
      'Experience, projects, skills, and navigation are rendered from structured arrays instead of hardcoded repeated markup.',
  },
  {
    title: 'Stateful interactions',
    detail:
      'Project filtering, mobile navigation, and resume/email actions are all driven by React state and event handlers.',
  },
  {
    title: 'Conditional UI',
    detail:
      'Filter buttons, copied-state feedback, and responsive menu behavior are controlled directly from component state.',
  },
]

export const resumeColumns = [
  {
    title: 'Career focus',
    items: [
      'Full Stack Developer specializing in banking and enterprise delivery.',
      'Strong at UI optimization, backend integration, and maintainable module design.',
      'Comfortable owning features across implementation, review, and release cycles.',
    ],
  },
  {
    title: 'Delivery strengths',
    items: [
      'Trade finance, payments, exception handling, validation, reporting, and dashboard experiences.',
      'Secure REST integrations and performance-aware front-end implementation.',
      'Mentorship, collaboration, and cross-team delivery support in Agile environments.',
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
]

export const buildResumeText = () => {
  const lines = [
    profile.name,
    `${profile.phoneDisplay} | ${profile.email} | LinkedIn: ${profile.linkedinUrl}`,
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
