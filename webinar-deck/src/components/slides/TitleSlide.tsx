import { title } from '@/content/title';

export function TitleSlide() {
  return (
    <div className="text-pane">
      <div className="brand-line">{title.brandLine}</div>
      <div className="brand-sub">{title.brandSub}</div>
      <div className="hero-title">{title.heroTitle}</div>
      <div className="hero-sub">{title.heroSub}</div>
      <div className="hero-tag">{title.heroTag}</div>
      <div className="slide-desc" style={{ maxWidth: '56ch' }}>
        {title.desc}
      </div>
      <div className="panel-strip">
        {title.panel.map((p, i) => (
          <div className="panel-chip" key={i}>
            <div className="chip-circle">{p.initials}</div>
            <div>
              <div className="chip-name">{p.name}</div>
              <div className="chip-role">{p.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
