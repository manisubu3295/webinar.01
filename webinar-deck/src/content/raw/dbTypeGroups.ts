// Auto-extracted from AAMEC_Session01_3D_WebApp.html — do not hand-edit,
// re-run extract-content.js against the source deck if it changes upstream.

export const dbTypeGroups = [
  {
    key: 'relational',
    title: 'Relational Databases',
    tagline: "Data lives in structured tables with fixed columns, and the database itself enforces the relationships between them.",
    explanation: "The oldest and most battle-tested category. You define a strict schema up front \u2014 tables, columns, foreign keys \u2014 and the database guarantees your data stays consistent through ACID transactions. This is the safe default whenever correctness matters more than flexibility.",
    example: "A billing system's invoices table can enforce that every invoice must reference a real, existing customer \u2014 the database itself rejects anything that would break that rule.",
    whenToUse: "When your data has a clear, stable structure and you need strong guarantees that it stays correct \u2014 money, inventory, anything that must always add up.",
    items: ['postgresql','mysql','mssql','oracle']
  },
  {
    key: 'nosql',
    title: 'NoSQL & Distributed Databases',
    tagline: "Data doesn't have to fit neat tables \u2014 and it doesn't have to live on one machine either.",
    explanation: "NoSQL databases trade some of a relational database's strict structure and guarantees for flexibility and horizontal scale. Many are built to run distributed across many machines from the ground up, so they keep working even as data grows far beyond what one server could hold.",
    example: "MongoDB lets each customer record carry different fields without changing a schema. Redis spreads cache data across memory for near-instant lookups \u2014 and both can run as distributed clusters across multiple nodes in production.",
    whenToUse: "When your data shape varies or changes often, or needs to scale out horizontally across many servers rather than up on a single one.",
    items: ['mongodb','redis']
  }
] as const;
