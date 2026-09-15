'use client';

import { useState } from 'react';
import { useDeckStore } from '@/lib/useDeckStore';

/** "Live demo — call the real backend": a genuine fetch() to whatever URL
 * is in the box, with real status, timing and errors. No simulated
 * responses here — if the presenter's local server isn't running, it
 * fails honestly and says so. */
export function LiveDemoPanel({ itemKey, demoUrl, demoNote }: { itemKey: string; demoUrl: string; demoNote?: string }) {
  const url = useDeckStore((s) => s.demoUrls[itemKey] ?? demoUrl);
  const setUrl = useDeckStore((s) => s.setDemoUrl);
  const result = useDeckStore((s) => s.demoResults[itemKey]);
  const setResult = useDeckStore((s) => s.setDemoResult);
  const [running, setRunning] = useState(false);

  async function run() {
    const target = url.trim();
    if (!target) return;
    setRunning(true);
    setResult(itemKey, { status: 'pending', text: `Calling ${target} ...` });
    const start = performance.now();
    try {
      const res = await fetch(target, { method: 'GET' });
      const elapsed = Math.round(performance.now() - start);
      let bodyText: string;
      try {
        const cloned = res.clone();
        const json = await cloned.json();
        bodyText = JSON.stringify(json, null, 2);
      } catch {
        bodyText = await res.text().catch(() => '(empty response body)');
      }
      setResult(itemKey, { status: res.ok ? 'success' : 'error', text: `Status: ${res.status} ${res.statusText}\nTime: ${elapsed} ms\n\n${bodyText}` });
    } catch (err) {
      const elapsed = Math.round(performance.now() - start);
      setResult(itemKey, {
        status: 'error',
        text: `Request failed after ${elapsed} ms.\n${(err as Error).message}\n\nIs the server running at this address? If your page and server are on different origins, the server needs to allow CORS.`,
      });
    }
    setRunning(false);
  }

  return (
    <div className="demo-panel">
      <div className="demo-row">
        <input type="text" className="demo-url-input" spellCheck={false} value={url} onChange={(e) => setUrl(itemKey, e.target.value)} />
        <button className="demo-run-btn" type="button" disabled={running} onClick={run}>
          Run
        </button>
      </div>
      <div className={`demo-result demo-${result ? result.status : 'idle'}`}>
        {result ? result.text : 'Not run yet. Point this at your local server (or your deployed URL later) and press Run.'}
      </div>
      <div className="demo-tip">
        Tip: if the call fails, make sure the server is actually running at this address and that CORS is enabled for this page&apos;s origin.
        {demoNote ? ' ' + demoNote : ''}
      </div>
    </div>
  );
}
