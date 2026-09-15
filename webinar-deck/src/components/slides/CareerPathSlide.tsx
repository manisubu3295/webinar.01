import { careerPath } from '@/content/careerPath';
import { moduleDividers } from '@/content/moduleDividers';
import { Eyebrow } from '@/components/shared/Misc';

/** One roadmap slide closing out a content module (or, for module 7,
 * the full-stack capstone roadmap) — a path chain of roles/stages, an
 * ordered what-to-learn list, named resources, and one "what actually
 * gets you hired" sentence. Grounded in that module's own named items,
 * not generic career advice. */
export function CareerPathSlide({ seg }: { seg: string }) {
  const content = careerPath[seg];
  const divider = moduleDividers.find((d) => d.seg === seg);
  if (!content) return null;

  return (
    <div className="text-pane">
      <Eyebrow>MODULE {divider?.num} &middot; CAREER PATH</Eyebrow>
      <h1 className="slide-title">{content.title}</h1>

      <div className="career-path-chain">
        {content.path.map((step, i) => (
          <div className="career-path-step" key={i}>
            <div className="career-path-chip">
              {step.label}
              {step.note && <span className="career-path-note">{step.note}</span>}
            </div>
            {i < content.path.length - 1 && <span className="career-path-arrow">&rarr;</span>}
          </div>
        ))}
      </div>

      <h3 className="career-section-label">What to Learn</h3>
      <div className="tech-list">
        {content.whatToLearn.map((item, i) => (
          <div className="tech-item" key={i}>
            <div className="tech-num">{i + 1}</div>
            <div>
              <div className="tech-name">{item.label}</div>
              <div className="tech-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="career-section-label">Resources</h3>
      <div className="career-resources">
        {content.resources.map((r, i) => (
          <div className="impact-box career-resource" key={i}>
            <span className="impact-label">{r.label}</span>
            {r.desc}
          </div>
        ))}
      </div>

      <div className="callout" style={{ marginTop: 18 }}>
        <strong>What gets you hired: </strong>
        {content.hiringBar}
      </div>
    </div>
  );
}
