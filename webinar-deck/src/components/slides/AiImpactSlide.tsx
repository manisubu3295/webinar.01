import { aiImpact } from '@/content/aiImpact';
import { moduleDividers } from '@/content/moduleDividers';
import { Eyebrow } from '@/components/shared/Misc';

/** One reflection slide closing out a content module: what AI actually
 * sped up here, and what still comes down to a person's judgment — the
 * same "what got faster / what did not move" shape the Closing module
 * already uses, grounded in this specific module's own named items. */
export function AiImpactSlide({ seg }: { seg: string }) {
  const content = aiImpact[seg];
  const divider = moduleDividers.find((d) => d.seg === seg);
  if (!content) return null;

  return (
    <div className="text-pane">
      <Eyebrow>MODULE {divider?.num} &middot; AI IMPACT</Eyebrow>
      <h1 className="slide-title">{content.title}</h1>

      <div className="ai-impact-columns">
        <div className="ai-impact-col ai-impact-changed">
          <div className="ai-impact-col-label">What AI actually sped up</div>
          {content.changed.map((item, i) => (
            <div className="ai-impact-item" key={i}>
              <div className="ai-impact-item-label">{item.label}</div>
              <div className="ai-impact-item-desc">{item.desc}</div>
            </div>
          ))}
        </div>
        <div className="ai-impact-col ai-impact-unchanged">
          <div className="ai-impact-col-label">What still needs a person</div>
          {content.unchanged.map((item, i) => (
            <div className="ai-impact-item" key={i}>
              <div className="ai-impact-item-label">{item.label}</div>
              <div className="ai-impact-item-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {content.watch && (
        <div className="callout" style={{ marginTop: 18 }}>
          <strong>Watch for: </strong>
          {content.watch}
        </div>
      )}
    </div>
  );
}
