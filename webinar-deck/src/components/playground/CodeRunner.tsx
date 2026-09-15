'use client';

import { useDeckStore } from '@/lib/useDeckStore';

type TechDetail = {
  name: string;
  runnable?: string;
  runLang?: string;
};

let pyodideInstance: any = null;
let pyodideLoadingPromise: Promise<any> | null = null;

function loadPyodideOnce(): Promise<any> {
  if (pyodideInstance) return Promise.resolve(pyodideInstance);
  if (pyodideLoadingPromise) return pyodideLoadingPromise;
  pyodideLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
    script.onload = async () => {
      try {
        // @ts-expect-error — loaded globally by the script above
        const inst = await window.loadPyodide();
        pyodideInstance = inst;
        resolve(inst);
      } catch (err) {
        reject(err);
      }
    };
    script.onerror = () => reject(new Error('Could not load the Python runtime (needs internet on first use).'));
    document.head.appendChild(script);
  });
  return pyodideLoadingPromise;
}

function simulatePrintOutput(code: string): string[] {
  const patterns = [
    /System\.out\.println\(\s*"([^"]*)"\s*\)/g,
    /System\.out\.println\(\s*'([^']*)'\s*\)/g,
    /Console\.WriteLine\(\s*"([^"]*)"\s*\)/g,
    /Console\.WriteLine\(\s*'([^']*)'\s*\)/g,
    /fmt\.Println\(\s*"([^"]*)"\s*\)/g,
    /echo\s+"([^"]*)"\s*;/g,
    /echo\s+'([^']*)'\s*;/g,
    /console\.log\(\s*"([^"]*)"\s*\)/g,
    /console\.log\(\s*'([^']*)'\s*\)/g,
  ];
  const outputs: string[] = [];
  patterns.forEach((re) => {
    let m: RegExpExecArray | null;
    while ((m = re.exec(code)) !== null) outputs.push(m[1]);
  });
  return outputs;
}

/** The "Try it — edit and run" panel on each frontend/backend tutorial
 * slide: real execution for JS and Python (via a lazy-loaded Pyodide),
 * and an honest simulated fallback for everything else — it scans the
 * edited code for print statements rather than pretending to run Java,
 * C#, Go or PHP in the browser. */
export function CodeRunner({ itemKey, detail }: { itemKey: string; detail: TechDetail }) {
  const code = useDeckStore((s) => s.codeEditors[itemKey] ?? detail.runnable ?? '');
  const setCode = useDeckStore((s) => s.setCodeEditor);
  const output = useDeckStore((s) => s.codeOutputs[itemKey]);
  const setOutput = useDeckStore((s) => s.setCodeOutput);

  if (!detail.runnable) return null;

  const runLabel =
    detail.runLang?.startsWith('real') ? (
      <>
        Real execution <span className="real-badge">REAL</span>
      </>
    ) : (
      <>
        Simulated output <span className="sim-badge">SIMULATED</span>
      </>
    );

  async function run() {
    setOutput(itemKey, { text: 'Running...', status: 'running' });

    if (detail.runLang === 'real-js') {
      const logs: string[] = [];
      const fakeConsole = { log: (...args: unknown[]) => logs.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')) };
      try {
        const fn = new Function('console', code);
        fn(fakeConsole);
        setOutput(itemKey, { text: logs.length ? logs.join('\n') : '(no output printed)', status: 'idle' });
      } catch (err) {
        setOutput(itemKey, { text: 'Error: ' + (err as Error).message, status: 'error' });
      }
      return;
    }

    if (detail.runLang === 'real-python') {
      setOutput(itemKey, { text: 'Loading Python (first run only, needs internet)...', status: 'running' });
      try {
        const py = await loadPyodideOnce();
        let captured = '';
        py.setStdout({ batched: (s: string) => (captured += s + '\n') });
        py.runPython(code);
        setOutput(itemKey, { text: captured || '(no output printed)', status: 'idle' });
      } catch (err) {
        setOutput(itemKey, { text: 'Could not run Python: ' + (err as Error).message + '\n\nThis needs internet on first use to load the Python runtime.', status: 'error' });
      }
      return;
    }

    const outputs = simulatePrintOutput(code);
    setOutput(itemKey, {
      status: 'simulated',
      text: outputs.length
        ? outputs.join('\n') + `\n\n(Simulated: this page cannot run ${detail.name} directly. Your print statements were detected and echoed above.)`
        : `No recognizable print statement found.\nTry something like System.out.println("Hello");\n\n(Simulated: this page cannot run ${detail.name} directly.)`,
    });
  }

  return (
    <>
      <h3>Try it &mdash; edit and run</h3>
      <textarea className="code-editor" spellCheck={false} value={code} onChange={(e) => setCode(itemKey, e.target.value)} />
      <div className="run-row">
        <button className="run-btn" type="button" onClick={run}>
          Run
        </button>
        <span className="run-label">{runLabel}</span>
      </div>
      <div className={`output-console ${output ? output.status : 'idle'}`}>{output ? output.text : 'Not run yet. Press Run to see the output.'}</div>
    </>
  );
}
