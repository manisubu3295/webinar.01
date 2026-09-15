// Auto-extracted from AAMEC_Session01_3D_WebApp.html — do not hand-edit,
// re-run extract-content.js against the source deck if it changes upstream.

export const conceptDetails = {
  interview: {
    name: "Interview",
    tagline: "Prepared questions, asked one person at a time, with the answers written down.",
    explanation: "The most common technique, and the right place to always start. You sit down with the client and ask prepared questions, one at a time, and write down exactly what they say.",
    example: "Ask the store owner: \"Walk me through what happens when a regular customer wants to return an item.\" Their answer often reveals rules nobody ever wrote down.",
    whenToUse: "Always start here \u2014 it maps the territory. But remember: people describe the process they THINK they follow, not always what they actually do."
  },
  observation: {
    name: "Observation",
    tagline: "Sit and watch the real work happen. Say nothing.",
    explanation: "You sit and watch someone do the real work, for hours if needed, and say nothing. You're not there to help or ask questions \u2014 only to see.",
    example: "Watching a billing counter for half a day revealed a notebook of secret customer discounts that nobody had mentioned in any interview.",
    whenToUse: "When the work is physical and habitual. This is the highest value per hour of any technique, because people don't think to mention what feels obvious to them."
  },
  docstudy: {
    name: "Document Study",
    tagline: "Collect every form, register, spreadsheet, and printed bill currently in use.",
    explanation: "You collect every existing form, register, spreadsheet, and printed bill currently in use \u2014 even the messy, handwritten ones.",
    example: "An old paper bill book showed a discount rule for \"regular customers\" that had never been written into any requirement document.",
    whenToUse: "Always. Old documents contain rules nobody remembers deciding, and they cost nothing to collect."
  },
  prototype: {
    name: "Prototype",
    tagline: "A clickable mock-up, shown before any real code is written.",
    explanation: "You build a clickable mock-up \u2014 often with no real code behind it at all \u2014 and show it to the client before writing a single line of production code.",
    example: "Showing a fake \"cancel bill\" screen revealed the client actually wanted a manager approval step that nobody had mentioned.",
    whenToUse: "When the user can't describe what they want, but will instantly recognize it the moment they see it."
  },
  workshop: {
    name: "Workshop",
    tagline: "Get the disagreeing departments in one room, facilitated.",
    explanation: "You get the disagreeing departments in one room, with someone facilitating, until they agree on one single shared answer.",
    example: "Sales wanted instant discounts, Finance wanted an approval step \u2014 a single one-hour workshop settled it after six weeks of unanswered emails.",
    whenToUse: "When two teams want different things and email has failed to resolve it for weeks."
  },

  hire: {
    name: "Who can we hire, years from now?",
    tagline: "The system outlives its author. Hiring pool beats elegance.",
    explanation: "The system you build today will outlive the person who built it. If nobody local can be hired to maintain it later, the technology choice has already failed \u2014 no matter how elegant it looked on day one.",
    example: "A brilliant but obscure language might save a week of work now, and cost months later when the one person who understands it leaves the company.",
    whenToUse: "Every time you're choosing a language or framework for something meant to last years, not weeks."
  },
  teamskill: {
    name: "What does the team already know?",
    tagline: "A second system in a familiar language beats a first in a better one.",
    explanation: "A team writing their second system in a language they already know beats a team writing their first system in a supposedly \"better\" language, almost every time.",
    example: "Choosing React because \"it's popular\" when your whole team knows Vue deeply just adds a learning curve nobody actually asked for.",
    whenToUse: "Whenever the deadline is tight and the team's existing skill is a real, measurable asset."
  },
  ecosystem: {
    name: "Does the ecosystem fit the domain?",
    tagline: "Ready-made libraries for your exact problem remove weeks of work.",
    explanation: "A mature, battle-tested library for your exact problem \u2014 tax calculation, PDF generation, barcode scanning \u2014 can save weeks that a \"better\" language without that library would cost you.",
    example: "Choosing a language with a ready-made GST tax library beats writing your own tax engine from scratch in a supposedly faster language.",
    whenToUse: "Whenever your domain has well-known, already-solved problems \u2014 chances are someone already built the library you need."
  },
  operate: {
    name: "How hard is it to operate?",
    tagline: "Fewer moving parts, fewer 9 p.m. phone calls.",
    explanation: "Fewer moving parts means fewer things to fix at 9 p.m. This almost never makes it onto a slide, but every engineer who's been on call feels it immediately.",
    example: "A single deployable binary that just runs is far easier to operate than five microservices that each need their own monitoring and care.",
    whenToUse: "Whenever your team is small and can't afford a dedicated operations specialist."
  },

  monolith: {
    name: "Monolith",
    tagline: "Everything in one program, one database.",
    explanation: "Every part of the system \u2014 billing, pricing, tax, reports \u2014 lives in one single program, talking to one single database.",
    example: "A 3-person startup building their first version should almost always start here. It's the fastest way to get something real running and in front of users.",
    whenToUse: "Small teams, tight deadlines, and no single part of the system that needs to scale differently from the rest."
  },
  modular: {
    name: "Modular Monolith",
    tagline: "One deployable program, cleanly divided inside.",
    explanation: "Still one single deployable program \u2014 but cleanly divided inside into separate modules that don't leak into each other, like labelled drawers in one cabinet.",
    example: "Billing, Pricing, and Reports each live in their own folder with clear boundaries, but they all ship and deploy together as a single unit.",
    whenToUse: "You want a monolith's simplicity today, but expect the system to live for years and possibly split apart later."
  },
  microservices: {
    name: "Microservices",
    tagline: "Many small, independently-deployable programs.",
    explanation: "The system is broken into many small, independently-deployable programs that talk to each other over the network.",
    example: "Netflix-scale systems use this pattern to let hundreds of engineering teams ship independently, without blocking each other's releases.",
    whenToUse: "Multiple teams that genuinely block each other on releases, or one part that must scale wildly differently from the rest. Rarely the right first choice for a new project."
  },
  hybrid: {
    name: "Hybrid (what we build)",
    tagline: "One central system, plus a lightweight copy in every store.",
    explanation: "One central system handles most of the work, plus a lightweight, independent copy running inside each physical store.",
    example: "If a store's internet connection goes down, its local copy keeps billing customers, then syncs back to the central system once the connection returns.",
    whenToUse: "When one specific, hard constraint \u2014 like \"billing must never stop, even offline\" \u2014 makes a simple central system impossible on its own."
  },

  unit: {
    name: "Unit Test",
    tagline: "Checks one small piece of code, completely on its own.",
    explanation: "Checks one small function or piece of logic entirely on its own, with no database, no network, and nothing else involved.",
    example: "Does calculateTax(100, 0.18) really return 18? A unit test checks exactly that, in milliseconds, on every single save.",
    whenToUse: "On every single save. It's the cheapest, fastest test you can write \u2014 there's genuinely no excuse to skip it."
  },
  integration: {
    name: "Integration Test",
    tagline: "Checks that your code and a real database actually work together.",
    explanation: "Checks that your code and a real, running database (or another real service) actually work together \u2014 not just in an imagined, simplified version.",
    example: "Your code might insert a bill correctly against a fake in-memory test, but fail against the real database's actual constraints. Integration tests catch exactly that gap.",
    whenToUse: "Whenever your code talks to a database, an external API, or any other real system outside of itself."
  },
  concurrency: {
    name: "Concurrency Test",
    tagline: "Fires many requests at the exact same moment, on purpose.",
    explanation: "Deliberately fires many requests at the exact same instant to see if your system actually holds up under real-world timing pressure.",
    example: "20 threads all try to bill the very last unit of stock at the same moment \u2014 a concurrency test proves that only one of them actually succeeds.",
    whenToUse: "Anywhere two people could plausibly do the same action at the same instant \u2014 which, at 12,000 bills a day, happens constantly."
  },

  cicd: {
    name: "CI/CD Pipeline",
    tagline: "An automatic factory line for your code.",
    explanation: "An automatic factory line for your code. Every single change is linted, compiled, tested, and safety-checked before any human ever sees it.",
    example: "A developer pushes code at 2pm; five minutes later it's already been tested and is either ready to deploy or clearly flagged as broken \u2014 with zero manual effort.",
    whenToUse: "On every single project, from day one. The cost of setting it up is far smaller than the cost of one bad manual deploy.",
    sketch: 'cicd'
  },
  monitoring: {
    name: "Monitoring",
    tagline: "Dashboards that watch whether the system is actually healthy.",
    explanation: "Dashboards and alerts that constantly watch whether the system is actually healthy \u2014 not just whether the server process happens to still be running.",
    example: "CPU usage looking perfectly normal doesn't mean a real customer can actually complete a purchase. Good monitoring watches the thing that actually matters to a person.",
    whenToUse: "From the very moment anything goes to production. You cannot fix what you cannot see."
  },
  rollback: {
    name: "Rollback",
    tagline: "Automatically bring back the last version that worked.",
    explanation: "If a new release breaks something, the system can automatically bring back the exact previous version that was working, without waiting for a human to notice first.",
    example: "A bad deploy at 9 p.m. gets automatically reverted within seconds of the health check failing \u2014 nobody needs to be woken up to fix it.",
    whenToUse: "Every production deployment should have one. It's the safety net that makes shipping quickly actually safe.",
    sketch: 'rollback'
  }
} as const;
