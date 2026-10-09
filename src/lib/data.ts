export interface Profile {
  name: string;
  firstName: string;
  role: string;
  subtitle: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  openToRelocate: boolean;
  resumeSummary: string;
  shortSummaryLine: string;
  quote: string;
  github: string;
  linkedin: string;
  resumePath: string;
}

export interface NavItem {
  id: string;
  label: string;
  number: string;
}

export interface SkillItem {
  number: number;
  symbol: string;
  name: string;
  family: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'AI Tools' | 'Tools' | 'CS Concepts' | 'Soft Skills';
  brandKey?: string;
  isBrand: boolean;
  projects: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  liveUrl?: string;
  illustrativeType: 'ecommerce-microservices' | 'food-delivery-spa';
}

export interface CertificationItem {
  id: string;
  number: string;
  title: string;
  issuer: string;
  details?: string;
  verifyUrl?: string;
  certId?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: 'experience' | 'internship';
  period: string;
  location: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
}

export interface AchievementItem {
  id: string;
  index: string;
  label: string;
  caption: string;
  detail: string;
  targetNumber: number;
  suffix: string;
  glowColor: string;
}

export const PROFILE: Profile = {
  name: "Lakshmi Prasanna Manthena",
  firstName: "PRASANNA",
  role: "Java Full Stack Developer",
  subtitle: "GenAI-Augmented Software Delivery · HCL Technologies",
  email: "lakshmimanthena4769@gmail.com",
  phone: "+91 9505606669",
  phoneHref: "tel:+919505606669",
  location: "Chennai, India",
  openToRelocate: true,
  resumeSummary:
    "Computer Science graduate and certified Java Full Stack Developer transitioning from an Operations Analyst role at HCL Technologies into full-time development, combining 3 years of enterprise work experience with hands-on, production-ready personal projects in Java, Spring Boot, Microservices, React.js, and MySQL. Actively applies Generative AI tools (ChatGPT, GitHub Copilot) throughout the development lifecycle — for code generation, debugging, unit test creation, and technical documentation — to accelerate delivery and improve code quality. Completed a 6-month Java Full Stack internship and delivered two end-to-end personal applications. Eager to contribute as a Java Full Stack or Backend Developer in a collaborative, growth-focused, AI-forward engineering team.",
  shortSummaryLine:
    "Transitioning from HCL Technologies with 3 years of enterprise operations into full-time Java Full Stack and backend development through independently engineered personal projects.",
  quote:
    "Combining enterprise data rigour with modern Spring Boot microservices, React interfaces, and AI-accelerated delivery.",
  github: "https://github.com/Prasanna-Srinivasu",
  linkedin: "https://www.linkedin.com/in/manthena-lakshmiprasanna/",
  resumePath: "/Manthena_Lakshmi_Prasannaa_Resume.pdf",
};

export const NAV: NavItem[] = [
  { id: "about", label: "About", number: "01" },
  { id: "skills", label: "Skills", number: "02" },
  { id: "work", label: "Work", number: "03" },
  { id: "certifications", label: "Certifications", number: "04" },
  { id: "experience", label: "Experience", number: "05" },
  { id: "achievements", label: "Achievements", number: "06" },
  { id: "contact", label: "Contact", number: "07" },
];

export const SKILL_GROUPS = [
  'All',
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'AI Tools',
  'Tools',
  'CS Concepts',
  'Soft Skills'
] as const;

export const SKILLS: SkillItem[] = [
  // Languages
  { number: 1, symbol: "Ja", name: "Java (Core & OOP)", family: "Languages", brandKey: "java", isBrand: true, projects: ["Shopper", "Datapro Internship"] },
  { number: 2, symbol: "Js", name: "JavaScript (ES6+)", family: "Languages", brandKey: "javascript", isBrand: true, projects: ["FoodieGo", "Datapro Internship"] },
  
  // Frontend
  { number: 3, symbol: "Re", name: "React.js", family: "Frontend", brandKey: "react", isBrand: true, projects: ["Shopper", "FoodieGo"] },
  { number: 4, symbol: "Ng", name: "Angular", family: "Frontend", brandKey: "angular", isBrand: true, projects: ["Frontend Toolkit"] },
  { number: 5, symbol: "H5", name: "HTML5", family: "Frontend", brandKey: "html5", isBrand: true, projects: ["FoodieGo", "Datapro Internship"] },
  { number: 6, symbol: "C3", name: "CSS3", family: "Frontend", brandKey: "css3", isBrand: true, projects: ["FoodieGo", "Datapro Internship"] },
  { number: 7, symbol: "Bs", name: "Bootstrap", family: "Frontend", brandKey: "bootstrap", isBrand: true, projects: ["FoodieGo"] },
  { number: 8, symbol: "Tw", name: "Tailwind CSS", family: "Frontend", brandKey: "tailwindcss", isBrand: true, projects: ["Responsive Portfolio"] },

  // Backend
  { number: 9, symbol: "Sb", name: "Spring Boot", family: "Backend", brandKey: "spring", isBrand: true, projects: ["Shopper"] },
  { number: 10, symbol: "Sm", name: "Spring MVC", family: "Backend", brandKey: "spring", isBrand: true, projects: ["Shopper"] },
  { number: 11, symbol: "Ra", name: "REST APIs", family: "Backend", isBrand: false, projects: ["Shopper", "FoodieGo"] },
  { number: 12, symbol: "Ms", name: "Microservices", family: "Backend", isBrand: false, projects: ["Shopper"] },
  { number: 13, symbol: "Jw", name: "JWT Auth (RBAC)", family: "Backend", brandKey: "jwt", isBrand: true, projects: ["Shopper"] },

  // Databases
  { number: 14, symbol: "My", name: "MySQL", family: "Databases", brandKey: "mysql", isBrand: true, projects: ["Shopper", "Datapro Internship"] },
  { number: 15, symbol: "Sq", name: "SQL (JOINs & Opt)", family: "Databases", brandKey: "mysql", isBrand: true, projects: ["HCL Technologies", "Shopper"] },

  // AI Tools
  { number: 16, symbol: "Gpt", name: "ChatGPT", family: "AI Tools", brandKey: "chatgpt", isBrand: true, projects: ["Development Lifecycle", "HCL Operations"] },
  { number: 17, symbol: "Cp", name: "GitHub Copilot", family: "AI Tools", brandKey: "copilot", isBrand: true, projects: ["Shopper", "Datapro Apprenticeship"] },

  // Tools
  { number: 18, symbol: "Gt", name: "Git", family: "Tools", brandKey: "git", isBrand: true, projects: ["Shopper", "FoodieGo"] },
  { number: 19, symbol: "Gh", name: "GitHub", family: "Tools", brandKey: "github", isBrand: true, projects: ["Shopper", "FoodieGo"] },
  { number: 20, symbol: "Pm", name: "Postman", family: "Tools", brandKey: "postman", isBrand: true, projects: ["Shopper API Testing"] },
  { number: 21, symbol: "Ij", name: "IntelliJ IDEA", family: "Tools", brandKey: "intellij", isBrand: true, projects: ["Shopper", "Datapro Apprenticeship"] },
  { number: 22, symbol: "Ec", name: "Eclipse", family: "Tools", brandKey: "eclipse", isBrand: true, projects: ["Datapro Apprenticeship"] },
  { number: 23, symbol: "Mv", name: "Maven", family: "Tools", brandKey: "maven", isBrand: true, projects: ["Shopper"] },
  { number: 24, symbol: "Nt", name: "Netlify CI/CD", family: "Tools", brandKey: "netlify", isBrand: true, projects: ["FoodieGo"] },
  { number: 25, symbol: "Dk", name: "Docker (Familiar)", family: "Tools", brandKey: "docker", isBrand: true, projects: ["Containerized Deployments"] },
  { number: 26, symbol: "Ju", name: "JUnit", family: "Tools", brandKey: "junit", isBrand: true, projects: ["Shopper Test Suites"] },

  // CS Concepts
  { number: 27, symbol: "Oo", name: "OOP Design", family: "CS Concepts", isBrand: false, projects: ["Shopper", "Datapro Apprenticeship"] },
  { number: 28, symbol: "Ds", name: "Data Structures", family: "CS Concepts", isBrand: false, projects: ["Algorithm & Cache Design"] },
  { number: 29, symbol: "Ad", name: "Algorithm Design", family: "CS Concepts", isBrand: false, projects: ["Shopper Pricing Engine"] },
  { number: 30, symbol: "Ps", name: "Problem Solving", family: "CS Concepts", isBrand: false, projects: ["HCL Billing & Microservices"] },
  { number: 31, symbol: "Ca", name: "Complexity Analysis", family: "CS Concepts", isBrand: false, projects: ["Query & Algorithm Optimization"] },

  // Soft Skills
  { number: 32, symbol: "Cm", name: "Communication", family: "Soft Skills", isBrand: false, projects: ["Stakeholder & Team Alignment"] },
  { number: 33, symbol: "Ad", name: "Adaptability", family: "Soft Skills", isBrand: false, projects: ["Operations to Full Stack Transition"] },
  { number: 34, symbol: "Pl", name: "Passion for Learning", family: "Soft Skills", isBrand: false, projects: ["AI Augmentation & Frameworks"] },
  { number: 35, symbol: "Ag", name: "Agile Collaboration", family: "Soft Skills", isBrand: false, projects: ["HCL Cross-Functional Squads"] },
  { number: 36, symbol: "Po", name: "Process Optimization", family: "Soft Skills", isBrand: false, projects: ["Healthcare Billing Data Workflows"] },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "shopper",
    index: "01",
    title: "Shopper — E-Commerce Platform",
    kicker: "Personal Project · Distributed Microservices",
    description:
      "A distributed e-commerce backend and platform built with 4 independently deployable microservices (Product, Cart, Order, User) using Core Java and Spring Boot, applying clean OOP principles and normalized MySQL data storage.",
    features: [
      "Architected 4 independently deployable microservices (product, cart, order, user) with Spring Boot.",
      "Designed and exposed 15+ scalable RESTful APIs with normalized MySQL schema and cart pricing logic.",
      "Secured all endpoints using JWT authentication with Role-Based Access Control (RBAC) across user and admin routes.",
      "Diagnosed and resolved distributed service communication failures with end-to-end debugging across multi-tiered architecture.",
      "Accelerated controller & DTO scaffolding with GitHub Copilot and ChatGPT, validating all code before merging.",
      "Authored JUnit test suites for core business logic with AI-assisted test scaffolds under Git version control."
    ],
    tech: ["Java", "Spring Boot", "Microservices", "MySQL", "JWT", "REST APIs", "React.js", "JUnit"],
    github: "https://github.com/Prasanna-Srinivasu/shopper-store",
    illustrativeType: "ecommerce-microservices",
  },
  {
    id: "foodiego",
    index: "02",
    title: "FoodieGo — Food Delivery Platform",
    kicker: "Personal Project · Mobile-First React SPA",
    description:
      "A mobile-first responsive single-page application built with React.js featuring modular component architecture, a real-time order tracking user interface, a functional admin dashboard, and continuous delivery via Netlify CI/CD.",
    features: [
      "Built mobile-first responsive SPA with modular component hierarchy, real-time tracking, and admin dashboard.",
      "Crafted responsive layouts using CSS3 and Bootstrap, guaranteeing consistent UX across desktop and mobile screens.",
      "Configured automated CI/CD pipeline on Netlify triggering builds and deployments on every Git commit.",
      "Integrated REST APIs connecting order workflows to backend services with seamless loading states and error handling.",
      "Deployed live production app via Netlify CI/CD with continuous release automation."
    ],
    tech: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "REST APIs", "CI/CD", "Netlify"],
    github: "https://github.com/Prasanna-Srinivasu/FoodieGo-",
    liveUrl: "https://online-restaurant-ordering.netlify.app",
    illustrativeType: "food-delivery-spa",
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-java",
    number: "01",
    title: "Java Full Stack Developer",
    issuer: "Skill It Academy",
    details: "Core Java, Spring Boot, Microservices, React.js, MySQL",
    verifyUrl: "https://skillit.co.in/certificate/verify/69ebc03c53beffdc663b1353/684f88cdad115ade3bdc2e9c",
    certId: "69ebc03c53beffdc663b1353",
  },
  {
    id: "cert-ai",
    number: "02",
    title: "HCL Yuva AI Program",
    issuer: "HCL Technologies · GUVI",
    details: "Enterprise Generative AI, AI-assisted workflows & delivery acceleration",
    verifyUrl: "https://www.guvi.in/verify-certificate?id=4473586yq4QVA716hm",
    certId: "4473586yq4QVA716hm",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "hcl",
    role: "Customer Service Representative | Technical / Application Experience",
    company: "HCL Technologies",
    type: "experience",
    period: "Aug 2023 – Apr 2026",
    location: "Chennai, India",
    bullets: [
      "Worked extensively with SQL queries (JOINs, aggregations, data validation) to analyze and process large-scale healthcare billing datasets — directly applicable to backend data management and API design.",
      "Collaborated with technical teams to identify and resolve 200+ monthly data discrepancies, improving billing accuracy and reducing escalations to client stakeholders.",
      "Mapped end-to-end data flow across enterprise billing systems, identifying process bottlenecks and proposing structured improvements to backend data pipelines and reporting workflows.",
      "Improved data accuracy and reporting efficiency through structured query optimization and validation workflows, reducing processing errors across daily billing cycles.",
      "Explored Generative AI tools (ChatGPT, enterprise AI platforms) for knowledge discovery, technical documentation, and process analysis, building early familiarity with AI-assisted operational workflows.",
      "Coordinated cross-functional data operations in a fast-paced enterprise environment, building Agile collaboration skills directly transferable to developer teams."
    ],
  },
  {
    id: "datapro",
    role: "Java Full Stack Developer Intern",
    company: "Datapro",
    type: "internship",
    period: "Oct 2022 – Mar 2023",
    location: "Visakhapatnam, India",
    bullets: [
      "Built structured Java applications applying Core OOP principles (encapsulation, inheritance, polymorphism) as part of a 6-month full stack apprenticeship, using IntelliJ IDEA and Eclipse as primary development environments.",
      "Developed responsive web pages using HTML5, CSS3, and JavaScript; practiced MySQL database operations including table design, data insertion, and SQL query writing.",
      "Used GitHub Copilot and ChatGPT to accelerate boilerplate code generation, debug logic errors, and draft inline documentation, reinforcing AI-assisted coding habits early in the development lifecycle.",
      "Used Git for version control and developed a foundational understanding of full stack development workflows in a professional team environment."
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: "aditya",
    degree: "B.Sc. Computer Science",
    institution: "Aditya Group of Institutions",
    period: "2020 – 2023",
    location: "Andhra Pradesh, India",
    details: "Foundational computer science, programming fundamentals, algorithms and software development.",
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-1",
    index: "01 / 06",
    label: "Enterprise Experience",
    caption: "HCL Technologies",
    detail: "Cross-functional enterprise data operations and backend query validation.",
    targetNumber: 3,
    suffix: " Yrs",
    glowColor: "rgba(13, 13, 13, 0.08)",
  },
  {
    id: "ach-2",
    index: "02 / 06",
    label: "Monthly Data Fixes",
    caption: "Enterprise Billing Integrity",
    detail: "Monthly discrepancies identified and resolved with backend teams.",
    targetNumber: 200,
    suffix: "+",
    glowColor: "rgba(13, 13, 13, 0.08)",
  },
  {
    id: "ach-3",
    index: "03 / 06",
    label: "Scalable REST APIs",
    caption: "Shopper E-Commerce",
    detail: "Normalized MySQL relational schemas with pricing and order workflows.",
    targetNumber: 15,
    suffix: "+",
    glowColor: "rgba(13, 13, 13, 0.08)",
  },
  {
    id: "ach-4",
    index: "04 / 06",
    label: "Microservices",
    caption: "Distributed Architecture",
    detail: "Independently deployable modules (Product, Cart, Order, User) with JWT RBAC.",
    targetNumber: 4,
    suffix: "",
    glowColor: "rgba(13, 13, 13, 0.08)",
  },
  {
    id: "ach-5",
    index: "05 / 06",
    label: "Personal Projects",
    caption: "Full-Stack Applications",
    detail: "Built and deployed Shopper and FoodieGo independently with CI/CD releases.",
    targetNumber: 2,
    suffix: "",
    glowColor: "rgba(13, 13, 13, 0.08)",
  },
  {
    id: "ach-6",
    index: "06 / 06",
    label: "Certifications",
    caption: "Java Full Stack & AI",
    detail: "Certified in Core Java/Spring Boot/React and HCL Yuva AI Program.",
    targetNumber: 2,
    suffix: "",
    glowColor: "rgba(13, 13, 13, 0.08)",
  },
];
