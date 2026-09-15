// The single running example threaded through every module: an anonymized
// retail chain's billing system, from the requirement conversation to
// production. No store name is used anywhere — just "the chain" / "the
// client" / "the business." Keep new copy consistent with these facts.

export const client = {
  business: 'a regional retail chain',
  outletCount: 40,
  region: 'Tamil Nadu',
  dailyBills: '12,000',
  peakMultiplier: 'triple that in festival week',
  ask: "Make a bill, apply the right price and tax, print it, keep the record, handle returns. Nothing fancy.",
  painPoint: 'their current billing system is old, and it crashes at month end',
  teamSize: 'a tech lead, three engineers, one QA, one manager',
  deadline: 'six months',
  deadlineNote: 'a date fixed before anyone knew what the system actually needed to do',
} as const;

export const timeline = {
  gather: 'Day 1–12',
  design: 'Day 13–25',
  tech: 'Day 26–35',
  architect: 'Day 36–50',
  build: 'Day 51–130',
  test: 'Day 90–150',
  deploy: 'Day 151–165',
  run: 'Day 166+',
} as const;
