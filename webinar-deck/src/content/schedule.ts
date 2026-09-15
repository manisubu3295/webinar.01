// The run-of-show, in the order it actually airs: 9:50 AM to 12:10 PM,
// 140 minutes. Drives the schedule rail and the clock readout in the top
// bar. Durations are cross-checked against each anchor slide's own eyebrow.
export type ScheduleBlock = {
  seg: string;
  label: string;
  mins: number;
  clock: string;
  isBreak?: boolean;
};

export const schedule: ScheduleBlock[] = [
  { seg: '1', label: 'Requirement', mins: 20, clock: '9:50 – 10:10 AM' },
  { seg: '2', label: 'Tech Stack', mins: 20, clock: '10:10 – 10:30 AM' },
  { seg: '3', label: 'Database', mins: 20, clock: '10:30 – 10:50 AM' },
  { seg: '4', label: 'Architecture', mins: 10, clock: '10:50 – 11:00 AM' },
  { seg: '5', label: 'Build & Test', mins: 20, clock: '11:00 – 11:20 AM' },
  { seg: 'break', label: 'Break', mins: 5, clock: '11:20 – 11:25 AM', isBreak: true },
  { seg: '6', label: 'DevOps', mins: 20, clock: '11:25 – 11:45 AM' },
  { seg: '7', label: 'Closing', mins: 15, clock: '11:45 AM – 12:00 PM' },
  { seg: '8', label: 'Q&A', mins: 10, clock: '12:00 – 12:10 PM' },
];

export const scheduleTotalMins = schedule.reduce((s, b) => s + b.mins, 0);

export const segTitles: Record<string, string> = {
  '0': '',
  '1': 'Module 1 · Requirement Gathering',
  '2': 'Module 2 · Technology Selection',
  '3': 'Module 3 · Database',
  '4': 'Module 4 · Architecture',
  '5': 'Module 5 · Build & Testing',
  '6': 'Module 6 · DevOps & Infrastructure',
  '7': 'Module 7 · Closing',
  '8': 'Module 8 · Q&A',
};
