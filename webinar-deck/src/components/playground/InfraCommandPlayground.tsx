'use client';

import { useDeckStore } from '@/lib/useDeckStore';

type InfraCommand = { label: string; command: string; response: unknown };

/** "Try a command — sample output": same pattern as the database
 * playground, for shell/CLI commands (systemctl, kubectl, aws, …). */
export function InfraCommandPlayground({ itemKey, commands }: { itemKey: string; commands: InfraCommand[] }) {
  const command = useDeckStore((s) => s.infraEditors[itemKey] ?? commands[0]?.command ?? '');
  const setCommand = useDeckStore((s) => s.setInfraEditor);
  const output = useDeckStore((s) => s.infraOutputs[itemKey]);
  const setOutput = useDeckStore((s) => s.setInfraOutput);

  if (!commands.length) return null;

  function run() {
    const trimmed = command.trim();
    const match = commands.find((c) => c.command.trim() === trimmed) ?? commands[0];
    if (!match) {
      setOutput(itemKey, 'No sample output available for this command.');
      return;
    }
    const body = typeof match.response === 'string' ? match.response : JSON.stringify(match.response, null, 2);
    setOutput(itemKey, body + '\n\n(Sample output — not a live command.)');
  }

  return (
    <>
      <h3>Try a command &mdash; sample output</h3>
      <div className="query-chip-row">
        {commands.map((c, i) => (
          <div key={i} className="query-chip" onClick={() => setCommand(itemKey, c.command)}>
            {c.label}
          </div>
        ))}
      </div>
      <textarea className="code-editor" style={{ minHeight: 56 }} spellCheck={false} value={command} onChange={(e) => setCommand(itemKey, e.target.value)} />
      <div className="run-row">
        <button className="run-btn" type="button" onClick={run}>
          Run Command
        </button>
        <span className="run-label">
          Sample output <span className="sim-badge">NOT LIVE</span>
        </span>
      </div>
      <div className={`output-console ${output ? 'simulated' : 'idle'}`}>{output ?? 'Not run yet. Press Run Command to see sample output.'}</div>
    </>
  );
}
