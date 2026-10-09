export type SkillFamily =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'AI Tools'
  | 'Tools'
  | 'CS Concepts'
  | 'Soft Skills';

export interface FamilyColorConfig {
  family: SkillFamily;
  accent: string;       // Primary black ink
  lightBg: string;      // Soft monochrome tile wash
  border: string;       // Coordinated border
  borderActive: string; // High-contrast active black border
  glow: string;         // Subtle shadow
  tagBg: string;        // Pill chip background
  tagText: string;      // Pill text color
  badgeDot: string;     // Indicator dot color
  symbolColor: string;  // Periodic table 2-letter symbol color
}

// Strictly Black & White Monochromatic Design System
export const FAMILY_COLORS: Record<SkillFamily, FamilyColorConfig> = {
  Languages: {
    family: 'Languages',
    accent: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    badgeDot: '#000000',
    symbolColor: '#000000',
  },
  Frontend: {
    family: 'Frontend',
    accent: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    badgeDot: '#000000',
    symbolColor: '#000000',
  },
  Backend: {
    family: 'Backend',
    accent: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    badgeDot: '#000000',
    symbolColor: '#000000',
  },
  Databases: {
    family: 'Databases',
    accent: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    badgeDot: '#000000',
    symbolColor: '#000000',
  },
  'AI Tools': {
    family: 'AI Tools',
    accent: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    badgeDot: '#000000',
    symbolColor: '#000000',
  },
  Tools: {
    family: 'Tools',
    accent: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    badgeDot: '#000000',
    symbolColor: '#000000',
  },
  'CS Concepts': {
    family: 'CS Concepts',
    accent: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    badgeDot: '#000000',
    symbolColor: '#000000',
  },
  'Soft Skills': {
    family: 'Soft Skills',
    accent: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    badgeDot: '#000000',
    symbolColor: '#000000',
  },
};

export interface CodeStackConfig {
  id: string;
  name: string;
  shortLabel: string;
  badge: string;
  description: string;
  primaryFamily: SkillFamily;
  color: string;           // Theme color
  lightBg: string;         // Tile wash
  border: string;          // Coordinated border
  borderActive: string;    // Active high-contrast border
  glow: string;            // Shadow
  tagBg: string;           // Pill chip background
  tagText: string;         // Pill text color
  skills: string[];        // Skill names matching SKILLS in lib/data.ts
}

export const CODE_STACKS: CodeStackConfig[] = [
  {
    id: 'all',
    name: 'All Elements',
    shortLabel: 'All Elements',
    badge: '36 Items',
    description: 'Complete periodic table catalog spanning languages, frameworks, cloud tooling, and CS concepts.',
    primaryFamily: 'Languages',
    color: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    skills: [],
  },
  {
    id: 'shopper',
    name: 'Shopper (Spring Boot Microservices)',
    shortLabel: 'Shopper Stack',
    badge: 'Enterprise Backend',
    description: '4 independently deployable microservices with Java 17, Spring Boot, JWT RBAC, MySQL, and JUnit test suites.',
    primaryFamily: 'Backend',
    color: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    skills: [
      'Java (Core & OOP)',
      'Spring Boot',
      'Spring MVC',
      'REST APIs',
      'Microservices',
      'JWT Auth (RBAC)',
      'MySQL',
      'SQL (JOINs & Opt)',
      'React.js',
      'JUnit',
      'Maven',
      'Git',
      'GitHub',
      'Postman',
      'IntelliJ IDEA',
      'GitHub Copilot',
      'OOP Design',
      'Algorithm Design',
    ],
  },
  {
    id: 'foodiego',
    name: 'FoodieGo (React SPA)',
    shortLabel: 'FoodieGo Stack',
    badge: 'Frontend SPA',
    description: 'Responsive single-page application with modular React hierarchy, REST APIs, Bootstrap/CSS3, and Netlify CI/CD.',
    primaryFamily: 'Frontend',
    color: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    skills: [
      'JavaScript (ES6+)',
      'React.js',
      'HTML5',
      'CSS3',
      'Bootstrap',
      'REST APIs',
      'Git',
      'GitHub',
      'Netlify CI/CD',
    ],
  },
  {
    id: 'genai',
    name: 'GenAI Augmented Delivery',
    shortLabel: 'GenAI Stack',
    badge: 'AI Acceleration',
    description: 'Modern developer workflow applying ChatGPT and GitHub Copilot for rapid scaffolding, unit tests, and debugging.',
    primaryFamily: 'AI Tools',
    color: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    skills: [
      'ChatGPT',
      'GitHub Copilot',
      'Java (Core & OOP)',
      'Spring Boot',
      'JUnit',
    ],
  },
  {
    id: 'hcl',
    name: 'HCL Technologies Operations',
    shortLabel: 'HCL Enterprise',
    badge: 'Enterprise Operations',
    description: '3 years enterprise data operations, complex SQL validation, process optimization, and agile cross-functional collaboration.',
    primaryFamily: 'Languages',
    color: '#000000',
    lightBg: 'rgba(0, 0, 0, 0.04)',
    border: 'rgba(0, 0, 0, 0.16)',
    borderActive: '#000000',
    glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
    tagBg: '#000000',
    tagText: '#ffffff',
    skills: [
      'SQL (JOINs & Opt)',
      'MySQL',
      'Problem Solving',
      'Process Optimization',
      'Agile Collaboration',
      'Communication',
      'ChatGPT',
    ],
  },
];

export function getFamilyColor(family: string): FamilyColorConfig {
  return (
    FAMILY_COLORS[family as SkillFamily] || {
      family: family as SkillFamily,
      accent: '#000000',
      lightBg: 'rgba(0, 0, 0, 0.04)',
      border: 'rgba(0, 0, 0, 0.16)',
      borderActive: '#000000',
      glow: '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
      tagBg: '#000000',
      tagText: '#ffffff',
      badgeDot: '#000000',
      symbolColor: '#000000',
    }
  );
}

export function getStackTheme(stackId: string): CodeStackConfig {
  return CODE_STACKS.find((s) => s.id === stackId) || CODE_STACKS[0];
}
