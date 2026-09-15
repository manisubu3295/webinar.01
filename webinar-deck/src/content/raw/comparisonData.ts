// Auto-extracted from AAMEC_Session01_3D_WebApp.html, then hand-extended
// with a "Real-World Example" column per row — pulled from the same
// realExample facts already on each item's own tutorial slide in
// techDetails.ts / infraDetails.ts (untouched there), or, for
// architecture (which has no existing real-example source), newly
// researched, well-known systems that actually use each shape.

export const comparisonData = {
  frontend: {
    title: "Frontend Options, Side by Side",
    tagline: "All five are legitimate choices. The differences are trade-offs, not right vs. wrong.",
    columns: ["Framework","Learning Curve","Ecosystem","Performance","Best For","Real-World Example"],
    rows: [
      ["React","Moderate","Largest","Good","Most product teams","Facebook, Instagram"],
      ["Angular","Steep","Large, opinionated","Good","Large enterprise teams","Google Ads console"],
      ["Vue","Gentle","Large, growing","Good","Small-to-mid teams","Alibaba, Xiaomi"],
      ["Svelte","Gentle","Smaller","Excellent","Performance-critical apps","The New York Times"],
      ["Next.js","Moderate","Largest (React-based)","Excellent","SEO-heavy, full-stack apps","TikTok web, Twitch"]
    ]
  },
  backend: {
    title: "Backend Options, Side by Side",
    tagline: "Six real choices for a production billing system. None of them is objectively “best.”",
    columns: ["Language","Hiring Pool","Ecosystem Fit","Performance","Ops Simplicity","Real-World Example"],
    rows: [
      ["Java / Spring","Very Large","Excellent (enterprise)","Good","Moderate","HSBC, Standard Chartered"],
      ["C# / .NET","Large","Excellent (enterprise)","Good","Moderate","Stack Overflow"],
      ["Python / Django","Very Large","Good (rapid dev)","Moderate","Good","Instagram's backend"],
      ["Node / TypeScript","Very Large","Good (JS ecosystem)","Good","Good","Netflix (SSR layer)"],
      ["Go","Growing","Good (infra tools)","Excellent","Excellent","Docker, Kubernetes"],
      ["PHP / Laravel","Large","Good (SME / web)","Moderate","Good","Wikipedia (MediaWiki)"]
    ]
  },
  database: {
    title: "Database Options, Side by Side",
    tagline: "Six real choices, three different shapes. Pick by how you'll query it, not by reputation.",
    columns: ["Database","Type","Consistency","Best For","Hosting Cost","Real-World Example"],
    rows: [
      ["PostgreSQL","Relational","Strong (ACID)","Structured, correctness-critical data","Low-Moderate","Instagram"],
      ["MySQL","Relational","Strong (ACID)","SME and web apps","Low","WordPress (40%+ of the web)"],
      ["MS SQL Server","Relational","Strong (ACID)","Windows / .NET enterprises","High (licensing)","Windows-stack enterprises"],
      ["Oracle","Relational","Strong (ACID)","Large legacy enterprises","Very High (licensing)","Major airlines, banks"],
      ["MongoDB","Document","Eventual / tunable","Flexible, evolving data shapes","Low-Moderate","eBay's product catalog"],
      ["Redis","Key-Value","N/A (cache)","Caching, sessions","Low","Twitter's timeline cache"]
    ]
  },
  architecture: {
    title: "Architecture Shapes, Side by Side",
    tagline: "The hard constraint should pick the shape — not habit, and not what's trending.",
    columns: ["Shape","Team Size Fit","Deploy Complexity","Fault Isolation","Ops Cost","Real-World Example"],
    rows: [
      ["Monolith","Small (1–5)","Very Low","None (all-or-nothing)","Very Low","Basecamp, early Shopify"],
      ["Modular Monolith","Small–Medium","Low","Partial (logical only)","Low","Shopify (post-modularization)"],
      ["Microservices","Large (multi-team)","High","Strong","High","Netflix, Uber, Amazon"],
      ["Hybrid (ours)","Small–Medium","Moderate","Strong (per-store)","Moderate","Retail POS that keeps billing store-by-store offline"]
    ]
  },
  infra: {
    title: "Infrastructure & Cloud, Side by Side",
    tagline: "Seven real building blocks across four layers — pick per-layer, not all-or-nothing.",
    columns: ["Technology","Category","Best For","Operational Complexity","Real-World Example"],
    rows: [
      ["Linux","Operating System","Nearly all production servers","Low-Moderate","Google, Amazon, Netflix"],
      ["AWS","Cloud Provider","Broadest service catalog","Moderate-High","Netflix (runs almost entirely on it)"],
      ["Azure","Cloud Provider",".NET / Windows-heavy shops","Moderate-High","Walmart's e-commerce infra"],
      ["Kubernetes","Orchestration","Multi-service, auto-scaling deployments","High","Spotify's backend services"],
      ["OpenShift","Orchestration","Enterprise Kubernetes with support","High","Banks, government agencies"],
      ["Tomcat","Application Server","Simple Java web apps","Low","Mid-sized enterprise Java apps"],
      ["JBoss / WildFly","Application Server","Full Java EE enterprise apps","Moderate","Insurance claim pipelines"]
    ]
  }
} as const;
