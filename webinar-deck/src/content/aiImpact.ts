export type AiImpactItem = { label: string; desc: string };
export type AiImpactContent = {
  title: string;
  changed: AiImpactItem[];
  unchanged: AiImpactItem[];
  watch?: string;
};

// One reflection slide per content module (1-6) — deliberately not added
// to Closing (module 7, which already is the deck's AI-impact wrap-up)
// or Live Q&A (module 8, no content to reflect on). Each entry is tied
// to the specific techniques/technologies that module actually named,
// not generic AI commentary.
export const aiImpact: Record<string, AiImpactContent> = {
  '1': {
    title: 'AI Impact — Requirement Gathering',
    changed: [
      { label: 'Interview prep', desc: 'A first draft of interview questions, in seconds, instead of starting from a blank page.' },
      { label: 'Document Study', desc: 'Summarizing a stack of old paper bills and registers for patterns — AI reads faster than a person can skim.' },
    ],
    unchanged: [
      { label: 'Observation', desc: 'AI cannot sit at the billing counter for half a day and notice the secret discount notebook nobody mentioned. That only comes from a person being there.' },
      { label: 'Workshop', desc: 'Getting Sales and Finance to agree in one room is a human negotiation, not a drafting task.' },
    ],
    watch: 'A generated interview question list still reflects what the requirement is assumed to be — it can quietly bake in the wrong assumption before anyone has watched the real work.',
  },
  '2': {
    title: 'AI Impact — Technology Selection',
    changed: [
      { label: 'First-pass comparison', desc: 'A draft comparison table across React, Angular, Vue, Svelte, and Next.js — or Java, Python, Node, Go — in minutes, not hours.' },
      { label: 'Boilerplate scaffolding', desc: 'A starter project in any of the eleven candidate stacks, generated on demand, to see roughly what each would feel like.' },
    ],
    unchanged: [
      { label: 'Hiring pool', desc: 'AI does not know who this team can actually hire, in this city, years from now.' },
      { label: 'Operate', desc: 'How hard a stack is to run at 9 p.m. is felt, not generated — that judgment comes from having been on call.' },
    ],
    watch: '"Which one is fastest?" is exactly the reason that should not decide it — and it is the question AI answers most confidently.',
  },
  '3': {
    title: 'AI Impact — Database',
    changed: [
      { label: 'First schema draft', desc: 'A starting table design for invoices, customers, and stock — in seconds, from a plain description.' },
      { label: 'Index suggestions', desc: 'A first guess at which columns need an index, based on the schema alone.' },
    ],
    unchanged: [
      { label: 'Real query patterns', desc: 'AI does not know how this database actually gets hit at 12,000 bills a day, three times that in festival week — only measurement tells you that.' },
    ],
    watch: 'A suggested index that looks reasonable on paper can be actively wrong once real traffic arrives — optimizing before measuring is a trap AI makes easy to fall into.',
  },
  '4': {
    title: 'AI Impact — Architecture',
    changed: [
      { label: 'Scaffolding any shape', desc: 'A starting project for a monolith, a modular monolith, or a microservices split — generated in minutes, for any of the four.' },
    ],
    unchanged: [
      { label: 'The shape itself', desc: 'Whether billing must keep working when a store\'s internet drops is a business constraint, not a technical one — no model can make that call for this build.' },
    ],
    watch: 'AI can make any of the four shapes look equally well-engineered on the page — the deciding factor here was never code quality, it was "what happens when a store goes offline."',
  },
  '5': {
    title: 'AI Impact — Build & Testing',
    changed: [
      { label: 'Unit tests', desc: 'Solid, fast unit tests for a function like calculateTax — written correctly, most of the time, without being asked twice.' },
      { label: 'Obvious bugs in review', desc: 'Catching the typo-level mistakes before a human reviewer even opens the file.' },
    ],
    unchanged: [
      { label: 'Concurrency Test', desc: 'Twenty threads racing for the same last unit of stock is a scenario AI rarely thinks to test for — it takes someone who has been burned by one before.' },
    ],
    watch: 'A green test suite is not the same as a safe one — the bug that only shows up under real, simultaneous traffic is exactly the kind AI-generated tests tend to miss.',
  },
  '6': {
    title: 'AI Impact — DevOps & Infrastructure',
    changed: [
      { label: 'CI/CD pipeline YAML', desc: 'A working lint-test-build-deploy pipeline definition, generated from a description, in minutes.' },
      { label: 'Infrastructure as code', desc: 'A first-pass Kubernetes manifest or Terraform file for a standard deployment.' },
    ],
    unchanged: [
      { label: 'Pulling the rollback trigger', desc: 'Deciding, mid-incident, that a bad deploy needs to be reverted right now — that call is made under pressure, by a person, watching a real dashboard.' },
    ],
    watch: 'AI can generate the pipeline that ships the bug just as confidently as the one that catches it — the monitoring and judgment layer around it still has to be human.',
  },
};
