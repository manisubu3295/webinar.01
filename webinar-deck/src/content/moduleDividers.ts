import type { ModuleDividerContent } from '@/lib/types';

// Hand-authored, not auto-extracted: every module opens by putting the
// audience back inside the same retail-chain build — 40 outlets, ~12,000
// bills a day, a 6-person team, 6 months fixed before anyone knew what the
// system needed to do.
export const moduleDividers: ModuleDividerContent[] = [
  {
    id: 'divider-1',
    seg: '1',
    num: '01',
    title: 'Requirement Gathering',
    desc: "A retail chain says: make a bill, apply the right price and tax, print it, keep the record, handle returns. Forty outlets, about 12,000 bills a day. Six months — fixed before anyone knew what the system needed to do. This module is how that one sentence becomes something a team can actually build.",
    contents: ['Introduction', 'Interview', 'Observation', 'Document Study', 'Prototype', 'Workshop'],
  },
  {
    id: 'divider-2',
    seg: '2',
    num: '02',
    title: 'Technology Selection',
    desc: 'With the requirement written down, the team picks a frontend framework and a backend language meant to last eight years, not eight weeks — for a system a six-person team builds, and one engineer may still be maintaining long after everyone else has moved on.',
    contents: ['Frontend Technology', 'Backend Technology', 'How to Choose'],
  },
  {
    id: 'divider-3',
    seg: '3',
    num: '03',
    title: 'Database',
    desc: "The frontend and backend are chosen. Now forty outlets need one shared, trustworthy answer for what a customer owes and what's on the shelf — one that holds up at three times the normal load in festival week. Relational, document, and key-value databases, and when to reach for each one.",
    contents: ['Relational Databases', 'NoSQL & Distributed Databases'],
  },
  {
    id: 'divider-4',
    seg: '4',
    num: '04',
    title: 'Architecture',
    desc: 'Frontend, backend, and database are all chosen now. One head-office system, or forty independent ones — or something in between? The shape decision that outlives almost every other choice in this build.',
    contents: ['Monolith', 'Modular Monolith', 'Microservices', 'Hybrid'],
  },
  {
    id: 'divider-5',
    seg: '5',
    num: '05',
    title: 'Build & Testing',
    desc: "The shape is decided. Now the actual billing logic gets written — price, tax, discount, return — along with the tests that catch the bug that would otherwise surface at 9 p.m. on a Friday, four hundred kilometers from head office.",
    contents: ['Unit Test', 'Integration Test', 'Concurrency Test'],
  },
  {
    id: 'divider-6',
    seg: '6',
    num: '06',
    title: 'DevOps & Infrastructure',
    desc: 'The code is written and tested. Now it has to reach all 40 stores safely, stay healthy once it’s there, and run on infrastructure built for the job.',
    contents: ['CI/CD Pipeline', 'Monitoring', 'Rollback', 'Operating System', 'Cloud Providers', 'Container & Orchestration', 'Application Servers'],
  },
  {
    id: 'divider-7',
    seg: '7',
    num: '07',
    title: 'Closing',
    desc: 'Six months, one requirement, 40 stores now billing on it. What actually changed with AI in that build — and what still came down to judgment.',
    contents: ['Career Guidance'],
  },
  {
    id: 'divider-8',
    seg: '8',
    num: '08',
    title: 'Live Question & Answer',
    desc: 'Open floor. Bring your own project or question.',
    contents: ['Live Q&A'],
  },
];
