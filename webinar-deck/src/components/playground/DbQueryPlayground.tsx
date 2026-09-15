'use client';

import { useDeckStore } from '@/lib/useDeckStore';

type DbQuery = { label: string; query: string; response: unknown };

/** "Try a query — sample response": pick a preset chip or edit the query
 * text directly; Run matches it against the known sample responses for
 * this database (never a live query — clearly labeled as such). */
export function DbQueryPlayground({ itemKey, queries }: { itemKey: string; queries: DbQuery[] }) {
  const query = useDeckStore((s) => s.dbQueryEditors[itemKey] ?? queries[0]?.query ?? '');
  const setQuery = useDeckStore((s) => s.setDbQueryEditor);
  const output = useDeckStore((s) => s.dbQueryOutputs[itemKey]);
  const setOutput = useDeckStore((s) => s.setDbQueryOutput);

  if (!queries.length) return null;

  function run() {
    const trimmed = query.trim();
    const match = queries.find((q) => q.query.trim() === trimmed) ?? queries[0];
    setOutput(itemKey, match ? JSON.stringify(match.response, null, 2) + '\n\n(Sample response — not a live database query.)' : 'No sample response available for this query.');
  }

  return (
    <>
      <h3>Try a query &mdash; sample response</h3>
      <div className="query-chip-row">
        {queries.map((q, i) => (
          <div key={i} className="query-chip" onClick={() => setQuery(itemKey, q.query)}>
            {q.label}
          </div>
        ))}
      </div>
      <textarea className="code-editor" style={{ minHeight: 64 }} spellCheck={false} value={query} onChange={(e) => setQuery(itemKey, e.target.value)} />
      <div className="run-row">
        <button className="run-btn" type="button" onClick={run}>
          Run Query
        </button>
        <span className="run-label">
          Sample response <span className="sim-badge">NOT LIVE</span>
        </span>
      </div>
      <div className={`output-console ${output ? 'simulated' : 'idle'}`}>{output ?? 'Not run yet. Press Run Query to see a sample response.'}</div>
    </>
  );
}
