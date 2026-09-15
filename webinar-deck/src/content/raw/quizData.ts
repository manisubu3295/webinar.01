// Auto-extracted from AAMEC_Session01_3D_WebApp.html — do not hand-edit,
// re-run extract-content.js against the source deck if it changes upstream.

export const quizData = {
  gather: {
    title: "Module 1 Quiz: Requirement Gathering",
    questions: [
      {
        prompt: "Which technique involves sitting and watching someone do their real work, without interrupting?",
        options: ["Interview", "Observation", "Workshop", "Prototype"],
        correct: 1,
        explanation: "Observation finds things people don't think to mention, because it feels obvious to them."
      },
      {
        prompt: "Why should you always collect old documents and forms during requirement gathering?",
        options: ["They're legally required", "They often contain rules nobody remembers deciding", "They're faster than interviews", "They replace the need for interviews"],
        correct: 1,
        explanation: "Old paper bill books and spreadsheets often encode business rules that were never written down anywhere else."
      },
      {
        prompt: "When is a Workshop the right technique to use?",
        options: ["At the very start of every project", "When two teams disagree and email hasn't resolved it for weeks", "Only for technical requirements", "Instead of an interview"],
        correct: 1,
        explanation: "Workshops are best when disagreeing departments need a facilitated space to reach one shared answer."
      }
    ]
  },
  choose: {
    title: "Module 2 Quiz: Technology Selection",
    questions: [
      {
        prompt: "What should mainly drive a technology choice for a long-lived system?",
        options: ["Which language is fastest", "Who can be hired to maintain it years from now", "What's trending online", "The cheapest hosting option"],
        correct: 1,
        explanation: "A system outlives its author \u2014 hiring pool beats elegance."
      },
      {
        prompt: "Which frontend framework compiles components into small, plain JavaScript at build time instead of shipping a framework to the browser?",
        options: ["React", "Angular", "Svelte", "Next.js"],
        correct: 2,
        explanation: "Svelte is a compiler, not a runtime framework, resulting in the smallest bundle sizes."
      },
      {
        prompt: "Which backend language compiles to a single binary and is used to build Docker and Kubernetes themselves?",
        options: ["Python", "PHP", "Go", "Java"],
        correct: 2,
        explanation: "Go's simplicity and performance made it the language of choice for core infrastructure tools."
      }
    ]
  },
  database: {
    title: "Module 3 Quiz: Database",
    questions: [
      {
        prompt: "What type of database is PostgreSQL?",
        options: ["Document", "Key-Value", "Relational", "Distributed cache"],
        correct: 2,
        explanation: "PostgreSQL stores data in strict tables with enforced relationships and full ACID transactions."
      },
      {
        prompt: "Why might you choose MongoDB over PostgreSQL for a specific dataset?",
        options: ["MongoDB is always faster", "MongoDB allows records to have different shapes without redesigning a schema", "MongoDB is a caching layer", "MongoDB doesn't require a server"],
        correct: 1,
        explanation: "Document databases like MongoDB trade some structure for flexibility with data that varies or changes often."
      },
      {
        prompt: "What is Redis primarily used for?",
        options: ["The main source of truth for a billing system", "Caching and fast lookups by a known key", "Running SQL joins across tables", "Storing large binary files"],
        correct: 1,
        explanation: "Redis is an in-memory key-value store; it should never be your only source of truth."
      }
    ]
  },
  architecture: {
    title: "Module 4 Quiz: Architecture",
    questions: [
      {
        prompt: "In a Monolith architecture, what happens if one part of the system has a bug?",
        options: ["Only that part goes down", "It can affect the entire system, since everything ships together", "Nothing, monoliths are fault-isolated", "It automatically triggers a rollback"],
        correct: 1,
        explanation: "Everything in a monolith is one deployable unit \u2014 one bad bug can bring down the whole thing."
      },
      {
        prompt: "What is the key difference between Microservices and the Hybrid architecture used in this project?",
        options: ["Microservices has no database", "Microservices connects services in a mesh; Hybrid connects satellites to one central hub", "They are the same thing", "Hybrid doesn't scale at all"],
        correct: 1,
        explanation: "The mesh (many-to-many) vs. star (hub-and-spoke) topology reflects genuinely different trade-offs."
      },
      {
        prompt: "When is a Modular Monolith the right choice?",
        options: ["When you have hundreds of independent teams", "When you want a monolith's simplicity today but expect to split it apart later", "Only for small scripts", "When fault isolation doesn't matter at all"],
        correct: 1,
        explanation: "A Modular Monolith keeps things simple now while enforcing clean internal boundaries for the future."
      }
    ]
  },
  testing: {
    title: "Module 5 Quiz: Build &amp; Testing",
    questions: [
      {
        prompt: "What does a Unit Test check?",
        options: ["The entire system end-to-end", "One small piece of code, completely on its own", "Whether the UI looks correct", "Server uptime"],
        correct: 1,
        explanation: "Unit tests are cheap and fast because they isolate one function or piece of logic with nothing else involved."
      },
      {
        prompt: "Why do you need a Concurrency Test specifically?",
        options: ["To check spelling in the code", "To make sure two people can't both succeed at the same action at the same instant", "To test on multiple browsers", "To measure code coverage"],
        correct: 1,
        explanation: "At scale, two people racing for the same last item happens constantly \u2014 concurrency tests catch that."
      },
      {
        prompt: "What does an Integration Test verify that a Unit Test cannot?",
        options: ["That the code compiles", "That your code and a real database (or service) actually work together", "That the code is well documented", "That the UI is accessible"],
        correct: 1,
        explanation: "Your code might pass in isolation but fail against a real database's actual constraints."
      }
    ]
  },
  devops: {
    title: "Module 6 Quiz: DevOps &amp; Infrastructure",
    questions: [
      {
        prompt: "What is the main purpose of a CI/CD pipeline?",
        options: ["To replace the need for testing", "To automatically test and ship every code change safely", "To write code for you", "To design the database schema"],
        correct: 1,
        explanation: "It's an automatic factory line \u2014 lint, test, build, deploy \u2014 catching problems before a human sees them."
      },
      {
        prompt: "Why might good monitoring show everything is \"healthy\" even when customers can't complete a purchase?",
        options: ["Monitoring is always wrong", "Basic metrics like CPU don't reflect whether the actual business function is working", "Customers don't affect monitoring", "It never happens in practice"],
        correct: 1,
        explanation: "Good monitoring watches what a person actually feels, not just whether a process is technically running."
      },
      {
        prompt: "What is the key difference between Kubernetes and OpenShift?",
        options: ["OpenShift is unrelated to Kubernetes", "OpenShift is Red Hat's enterprise version of Kubernetes, adding tooling, security defaults, and support", "Kubernetes only runs on Windows", "OpenShift doesn't use containers"],
        correct: 1,
        explanation: "OpenShift runs real Kubernetes underneath, with extra enterprise features layered on top."
      }
    ]
  }
} as const;
