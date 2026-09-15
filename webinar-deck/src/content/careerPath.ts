export type CareerPathStep = { label: string; note?: string };
export type CareerPathItem = { label: string; desc: string };
export type CareerPathContent = {
  title: string;
  path: CareerPathStep[];
  whatToLearn: CareerPathItem[];
  resources: CareerPathItem[];
  hiringBar: string;
};

// One roadmap per content module (1-6), plus a capstone full-stack
// roadmap for module 7 (Closing already carries a short "Career
// Guidance" anchor — this is the detailed expansion next to it, not a
// replacement). Module 8 (Live Q&A) has no roadmap, same reasoning as
// AI Impact. Real, named resources throughout — not "look it up."
export const careerPath: Record<string, CareerPathContent> = {
  '1': {
    title: 'Career Path — Requirement Gathering',
    path: [{ label: 'Junior Business Analyst' }, { label: 'Business Analyst' }, { label: 'Product Owner / PM' }],
    whatToLearn: [
      { label: 'Structured interviewing', desc: 'Prepared questions, one person at a time, written down — the technique this module opened with.' },
      { label: 'User-story writing', desc: 'Turning a stakeholder\'s sentence into something a dev team can actually build from.' },
      { label: 'Basic SQL', desc: 'Enough to read a schema and ask informed questions about the data, without needing to write production queries.' },
    ],
    resources: [
      { label: 'IIBA ECBA', desc: 'The standard entry-level business analysis certification — recognized, structured, worth the study time.' },
      { label: 'Scrum.org PSPO', desc: 'Product Owner certification, the natural next step once you\'re past pure requirement-gathering.' },
      { label: 'Google Project Management (Coursera)', desc: 'A practical, project-based on-ramp if you\'re starting from zero.' },
    ],
    hiringBar: 'Can you turn one vague sentence — "make a bill, apply the right price and tax" — into a written requirement doc a dev team can actually build from? That\'s the interview test.',
  },
  '2': {
    title: 'Career Path — Technology Selection',
    path: [{ label: 'Junior Frontend / Backend Dev' }, { label: 'Full-Stack Dev' }, { label: 'Senior / Tech Lead' }],
    whatToLearn: [
      { label: 'One frontend framework, deeply', desc: 'React is the safest hiring-pool bet by this module\'s own comparison table — depth beats shallow breadth across all eleven options.' },
      { label: 'One backend language, deeply', desc: 'Same logic — pick one, ship real things in it, before sampling the rest.' },
      { label: 'Why, not just what', desc: 'Be able to explain your choice through this module\'s own lens: hiring pool, team skill, ecosystem fit, ease of operating.' },
    ],
    resources: [
      { label: 'freeCodeCamp', desc: 'Free, project-based, covers both frontend and backend fundamentals.' },
      { label: 'The Odin Project', desc: 'A full free curriculum that ends in real deployed projects, not just exercises.' },
      { label: 'Official React docs (react.dev)', desc: 'Written for beginners now — the best single source once you\'ve picked React.' },
    ],
    hiringBar: 'Three complete, original projects on GitHub — not tutorials followed step by step — plus the ability to explain why you picked your stack, out loud, under questioning.',
  },
  '3': {
    title: 'Career Path — Database',
    path: [{ label: 'Backend Dev' }, { label: 'DBA / Data Engineer' }, { label: 'Data Architect' }],
    whatToLearn: [
      { label: 'SQL, deeply, first', desc: 'Joins, indexes, transactions — before touching a NoSQL option at all.' },
      { label: 'One NoSQL option', desc: 'MongoDB is the most commonly asked-for in job postings — learn it once SQL is solid.' },
      { label: 'Schema design & normalization', desc: 'The judgment call behind every "which shape of database" decision this module walked through.' },
    ],
    resources: [
      { label: 'SQLBolt', desc: 'Free, interactive, the fastest real way to get SQL into your hands.' },
      { label: 'PostgreSQL official docs', desc: 'Dense but authoritative — worth reading directly once the basics are comfortable.' },
      { label: 'Designing Data-Intensive Applications (Kleppmann)', desc: 'The industry-standard book once you\'re past fundamentals and want the real trade-offs.' },
    ],
    hiringBar: 'Design a schema for a given scenario on a whiteboard, and defend your indexing choices out loud — that\'s the actual interview format at this level.',
  },
  '4': {
    title: 'Career Path — Architecture',
    path: [{ label: 'Senior Developer' }, { label: 'Tech Lead' }, { label: 'Solutions / Software Architect' }],
    whatToLearn: [
      { label: 'System design fundamentals', desc: 'This is explicitly not an entry-level track — architecture responsibility is earned after years of building first.' },
      { label: 'Trade-off thinking', desc: 'The same instinct this module used to compare monolith, modular, microservices, and hybrid — no shape is free.' },
    ],
    resources: [
      { label: 'AWS or Azure Solutions Architect certification', desc: 'A structured on-ramp into architecture thinking, even if you\'re not chasing the cert itself.' },
      { label: 'ByteByteGo system design content', desc: 'Widely used, visual, grounded in real company case studies.' },
    ],
    hiringBar: 'Defend a chosen architecture\'s trade-offs under direct questioning — not just define what monolith or microservices mean.',
  },
  '5': {
    title: 'Career Path — Build & Testing',
    path: [{ label: 'Manual QA' }, { label: 'SDET' }, { label: 'QA Lead', note: 'or: a baseline skill expected in any dev role now' }],
    whatToLearn: [
      { label: 'Your language\'s unit-test framework', desc: 'Jest, pytest, JUnit — whichever matches the backend you picked in Module 2.' },
      { label: 'Integration testing against a real database', desc: 'Not a fake in-memory version — the gap this module\'s own example exposed.' },
      { label: 'Concurrency thinking', desc: 'Recognizing where two people could plausibly do the same thing at the same instant.' },
    ],
    resources: [
      { label: 'Test-Driven Development by Example (Kent Beck)', desc: 'The original, still the clearest explanation of why tests come first.' },
      { label: 'Your language\'s official testing docs', desc: 'Always the most current source for the exact framework you\'re using.' },
    ],
    hiringBar: 'Write a meaningful test for a real function, and explain — clearly — what it does not cover. That second part is what separates a junior answer from a senior one.',
  },
  '6': {
    title: 'Career Path — DevOps & Infrastructure',
    path: [{ label: 'Junior DevOps / Sysadmin' }, { label: 'DevOps Engineer' }, { label: 'SRE / Platform Engineer' }],
    whatToLearn: [
      { label: 'Linux, first', desc: 'Everything else in this module runs on it.' },
      { label: 'Docker / containers', desc: 'Then CI/CD, then Kubernetes — in that order, not all at once.' },
      { label: 'One cloud provider, deeply', desc: 'AWS has the largest job market of the three named in this module.' },
    ],
    resources: [
      { label: 'AWS Certified Solutions Architect - Associate', desc: 'The single most in-demand entry-level cloud certification right now.' },
      { label: 'CKA (Certified Kubernetes Administrator)', desc: 'The recognized credential once containers and orchestration are comfortable.' },
      { label: 'KodeKloud', desc: 'Hands-on labs for exactly this stack — Linux, Docker, Kubernetes, CI/CD.' },
    ],
    hiringBar: 'Containerize an app and write a working CI/CD pipeline for it from scratch — literally what this module\'s own live demo does on stage.',
  },
  '7': {
    title: 'Full-Stack Roadmap — Zero to Hired',
    path: [
      { label: 'Frontend + Backend', note: '3-6 months, 3 projects' },
      { label: 'Database', note: '~1 month' },
      { label: 'Docker + CI/CD', note: '~1 month' },
      { label: 'Testing', note: 'ongoing habit' },
      { label: 'Deploy to Cloud', note: '~1 month' },
      { label: 'Capstone Project' },
    ],
    whatToLearn: [
      { label: 'Build, then broaden', desc: 'One frontend, one backend, three real projects — before adding database, containers, or cloud depth.' },
      { label: 'Layer in the rest of this session, in order', desc: 'Database, then Docker/CI/CD, then testing as a permanent habit, then a real cloud deployment.' },
      { label: 'One capstone project', desc: 'Mirror this session\'s own billing system — requirement, tech choice, database, architecture, tests, deploy, monitoring, all in one real project you can point to.' },
    ],
    resources: [
      { label: 'Everything named across Modules 1-6', desc: 'This roadmap is literally the sum of the six roadmaps already covered — nothing new to learn, just a sequence to follow.' },
    ],
    hiringBar: 'A deployed, tested project beats a wall of certificates. Portfolio and GitHub history is what actually gets read before an interview is ever booked.',
  },
};
