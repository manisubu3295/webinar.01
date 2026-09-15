import { overview } from '@/content/overview';
import { Eyebrow, MultilineText } from '@/components/shared/Misc';

export function OverviewSlide() {
  return (
    <div className="text-pane">
      <Eyebrow>{overview.eyebrow}</Eyebrow>
      <h1 className="slide-title" style={{ fontSize: 'clamp(28px,3.6vw,44px)' }}>
        <MultilineText text={overview.title} />
      </h1>
      <div className="tech-list">
        {overview.items.map((item, i) => (
          <div className="tech-item" key={i}>
            <div className="tech-num">{item.num}</div>
            <div>
              <div className="tech-name">{item.name}</div>
              <div className="tech-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
