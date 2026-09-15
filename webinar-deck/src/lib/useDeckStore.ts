'use client';

import { create } from 'zustand';
import { buildDeck } from './buildDeck';
import type { Slide } from './types';

const { slides, jumpIndex } = buildDeck();

type QuizAnswer = { optIdx: number; correct: boolean };

type DeckState = {
  slides: Slide[];
  jumpIndex: typeof jumpIndex;
  current: number;
  leaving: number | null;
  goTo: (idx: number) => void;
  next: () => void;
  prev: () => void;
  jumpToItem: (groupKey: string, itemKey: string) => void;

  // Which slide indices have been visited this session — in-session
  // only, same lifetime as the rest of this store's interactive state
  // (this is a live-presenter tool, not a multi-user LMS with accounts).
  visited: Record<number, boolean>;
  sidebarOpen: boolean;
  toggleSidebar: () => void;

  // Persisted per-item interactive state, keyed so it survives a slide's
  // component unmounting when the user navigates away and back.
  codeEditors: Record<string, string>;
  setCodeEditor: (key: string, value: string) => void;
  codeOutputs: Record<string, { text: string; status: 'idle' | 'running' | 'simulated' | 'error' }>;
  setCodeOutput: (key: string, output: { text: string; status: 'idle' | 'running' | 'simulated' | 'error' }) => void;

  dbQueryEditors: Record<string, string>;
  setDbQueryEditor: (key: string, value: string) => void;
  dbQueryOutputs: Record<string, string>;
  setDbQueryOutput: (key: string, value: string) => void;

  infraEditors: Record<string, string>;
  setInfraEditor: (key: string, value: string) => void;
  infraOutputs: Record<string, string>;
  setInfraOutput: (key: string, value: string) => void;

  demoUrls: Record<string, string>;
  setDemoUrl: (key: string, value: string) => void;
  demoResults: Record<string, { status: 'idle' | 'pending' | 'success' | 'error'; text: string }>;
  setDemoResult: (key: string, value: { status: 'idle' | 'pending' | 'success' | 'error'; text: string }) => void;

  quizAnswers: Record<string, Record<number, QuizAnswer>>;
  answerQuiz: (moduleKey: string, qIdx: number, optIdx: number, correct: boolean) => void;
};

let leavingTimer: ReturnType<typeof setTimeout> | null = null;

export const useDeckStore = create<DeckState>((set, get) => ({
  slides,
  jumpIndex,
  current: 0,
  leaving: null,

  goTo: (idx) => {
    const { current, slides: all } = get();
    if (idx < 0 || idx >= all.length || idx === current) return;
    if (leavingTimer) clearTimeout(leavingTimer);
    set((s) => ({ leaving: current, current: idx, visited: { ...s.visited, [idx]: true } }));
    leavingTimer = setTimeout(() => set({ leaving: null }), 700);
  },
  next: () => get().goTo(get().current + 1),
  prev: () => get().goTo(get().current - 1),
  jumpToItem: (groupKey, itemKey) => {
    const idx = get().jumpIndex[groupKey]?.[itemKey];
    if (typeof idx === 'number') get().goTo(idx);
  },

  visited: { 0: true },
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  codeEditors: {},
  setCodeEditor: (key, value) => set((s) => ({ codeEditors: { ...s.codeEditors, [key]: value } })),
  codeOutputs: {},
  setCodeOutput: (key, output) => set((s) => ({ codeOutputs: { ...s.codeOutputs, [key]: output } })),

  dbQueryEditors: {},
  setDbQueryEditor: (key, value) => set((s) => ({ dbQueryEditors: { ...s.dbQueryEditors, [key]: value } })),
  dbQueryOutputs: {},
  setDbQueryOutput: (key, value) => set((s) => ({ dbQueryOutputs: { ...s.dbQueryOutputs, [key]: value } })),

  infraEditors: {},
  setInfraEditor: (key, value) => set((s) => ({ infraEditors: { ...s.infraEditors, [key]: value } })),
  infraOutputs: {},
  setInfraOutput: (key, value) => set((s) => ({ infraOutputs: { ...s.infraOutputs, [key]: value } })),

  demoUrls: {},
  setDemoUrl: (key, value) => set((s) => ({ demoUrls: { ...s.demoUrls, [key]: value } })),
  demoResults: {},
  setDemoResult: (key, value) => set((s) => ({ demoResults: { ...s.demoResults, [key]: value } })),

  quizAnswers: {},
  answerQuiz: (moduleKey, qIdx, optIdx, correct) =>
    set((s) => ({
      quizAnswers: {
        ...s.quizAnswers,
        [moduleKey]: { ...s.quizAnswers[moduleKey], [qIdx]: { optIdx, correct } },
      },
    })),
}));
