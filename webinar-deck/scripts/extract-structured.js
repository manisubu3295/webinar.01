// Turns staticSections.json into clean typed content: title slide, overview
// slide, 8 module dividers, and every "anchor"/segment slide (with its
// tech-list, meta row, callout, compare link, and inline sketch if any).
const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, '..', 'src', 'content', 'raw');
const sections = JSON.parse(fs.readFileSync(path.join(RAW_DIR, 'staticSections.json'), 'utf8'));

function decode(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&middot;/g, '·')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&rarr;/g, '→')
    .replace(/&rsaquo;/g, '›')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}
function stripTags(s) {
  return decode(s.replace(/<[^>]+>/g, ''));
}
function titleWithBreaks(h1inner) {
  return decode(h1inner.replace(/<br\s*\/?>/g, '\n'));
}

function matchAll(re, str) {
  const out = [];
  let m;
  const r = new RegExp(re, 'g');
  while ((m = r.exec(str))) out.push(m);
  return out;
}

function parseTechList(inner) {
  const block = inner.match(/<div class="tech-list">([\s\S]*?)<\/div>\s*(?:<div class="callout"|<div class="meta-row"|<div class="back-link|<h3|$)/);
  const listHtml = block ? block[1] : '';
  const items = matchAll(/<div class="tech-item([^"]*)"(?:\s+data-tech="([^"]+)")?>\s*<div class="tech-num">(\d+)<\/div>\s*<div><div class="tech-name">([\s\S]*?)<\/div><div class="tech-desc">([\s\S]*?)<\/div><\/div>\s*<\/div>/, listHtml)
    .map(m => {
      const classes = m[1] || '';
      const key = m[2];
      let name = m[4];
      const tutorial = /<span class="tech-hint">tutorial<\/span>/.test(name);
      name = name.replace(/\s*<span class="tech-hint">tutorial<\/span>/, '');
      return {
        num: m[3],
        name: stripTags(name),
        desc: stripTags(m[5]),
        clickable: /tech-clickable/.test(classes),
        key: key || undefined,
        tutorial: tutorial || undefined,
      };
    });
  return items;
}

function parseMeta(inner) {
  const block = inner.match(/<div class="meta-row"[^>]*>([\s\S]*?)<\/div>\s*(?:<div class="back-link|<\/div>\s*<div class="canvas-pane|$)/);
  if (!block) return [];
  return matchAll(/<div class="meta-label">([\s\S]*?)<\/div><div class="meta-value">([\s\S]*?)<\/div>/, block[1])
    .map(m => ({ label: stripTags(m[1]), value: stripTags(m[2]) }));
}

function parseCallout(inner) {
  const m = inner.match(/<div class="callout">\s*(?:<strong>([\s\S]*?)<\/strong>)?([\s\S]*?)<\/div>/);
  if (!m) return undefined;
  return { label: m[1] ? stripTags(m[1]).replace(/:$/, '') : undefined, body: stripTags(m[2]) };
}

function parseCompareGroup(inner) {
  const m = inner.match(/data-compare-group="([^"]+)"/);
  return m ? m[1] : undefined;
}

function parseSketch(inner) {
  const m = inner.match(/<h3[^>]*>([\s\S]*?)<\/h3>\s*<svg id="([^"]+)"/);
  return m ? { title: stripTags(m[1]), svgId: m[2] } : undefined;
}

function parseSceneId(inner) {
  const m = inner.match(/data-scene-id="([^"]+)"/);
  return m ? m[1] : undefined;
}

// --- Title slide (section 0) ---
const titleInner = sections[0].inner;
const title = {
  brandLine: stripTags(titleInner.match(/<div class="brand-line">([\s\S]*?)<\/div>/)[1]),
  brandSub: stripTags(titleInner.match(/<div class="brand-sub">([\s\S]*?)<\/div>/)[1]),
  heroTitle: stripTags(titleInner.match(/<div class="hero-title">([\s\S]*?)<\/div>/)[1]),
  heroSub: stripTags(titleInner.match(/<div class="hero-sub">([\s\S]*?)<\/div>/)[1]),
  heroTag: stripTags(titleInner.match(/<div class="hero-tag">([\s\S]*?)<\/div>/)[1]),
  desc: stripTags(titleInner.match(/<div class="slide-desc"[^>]*>([\s\S]*?)<\/div>/)[1]),
  panel: matchAll(/<div class="panel-chip"><div class="chip-circle">([\s\S]*?)<\/div><div><div class="chip-name">([\s\S]*?)<\/div><div class="chip-role">([\s\S]*?)<\/div><\/div><\/div>/, titleInner)
    .map(m => ({ initials: stripTags(m[1]), name: stripTags(m[2]), role: stripTags(m[3]) })),
};

// --- Overview slide (section 1) ---
const overviewInner = sections[1].inner;
const overview = {
  eyebrow: stripTags(overviewInner.match(/<div class="eyebrow">([\s\S]*?)<\/div>/)[1]),
  title: titleWithBreaks(overviewInner.match(/<h1 class="slide-title"[^>]*>([\s\S]*?)<\/h1>/)[1]),
  items: matchAll(/<div class="tech-num">(\d+)<\/div>\s*<div><div class="tech-name">([\s\S]*?)<\/div><div class="tech-desc">([\s\S]*?)<\/div><\/div>/, overviewInner)
    .map(m => ({ num: m[1], name: stripTags(m[2]), desc: stripTags(m[3]) })),
  sceneId: parseSceneId(overviewInner),
};

// --- Module dividers + anchor slides ---
const moduleDividers = [];
const anchorSlides = [];
for (const s of sections.slice(2)) {
  const { attrs, inner } = s;
  if (attrs.class.includes('module-divider')) {
    moduleDividers.push({
      id: attrs.id,
      seg: attrs['data-seg'],
      num: inner.match(/<span class="stamp-num">([\s\S]*?)<\/span>/)[1],
      title: stripTags(inner.match(/<h1 class="divider-title">([\s\S]*?)<\/h1>/)[1]),
      desc: stripTags(inner.match(/<p class="divider-desc">([\s\S]*?)<\/p>/)[1]),
      contents: matchAll(/<div class="divider-content-item">([\s\S]*?)<\/div>/, inner).map(m => stripTags(m[1])),
    });
  } else {
    anchorSlides.push({
      id: attrs.id,
      seg: attrs['data-seg'],
      expand: attrs['data-expand'] || undefined,
      eyebrow: stripTags(inner.match(/<div class="eyebrow">([\s\S]*?)<\/div>/)[1]),
      title: titleWithBreaks(inner.match(/<h1 class="slide-title"[^>]*>([\s\S]*?)<\/h1>/)[1]),
      techList: parseTechList(inner),
      callout: parseCallout(inner),
      meta: parseMeta(inner),
      compareGroup: parseCompareGroup(inner),
      sketch: parseSketch(inner),
      sceneId: parseSceneId(inner),
    });
  }
}

fs.writeFileSync(path.join(RAW_DIR, 'title.json'), JSON.stringify(title, null, 2));
fs.writeFileSync(path.join(RAW_DIR, 'overview.json'), JSON.stringify(overview, null, 2));
fs.writeFileSync(path.join(RAW_DIR, 'moduleDividers.json'), JSON.stringify(moduleDividers, null, 2));
fs.writeFileSync(path.join(RAW_DIR, 'anchorSlides.json'), JSON.stringify(anchorSlides, null, 2));

console.log('title:', title.heroTitle);
console.log('overview items:', overview.items.length);
console.log('dividers:', moduleDividers.length);
console.log('anchors:', anchorSlides.length);
anchorSlides.forEach(a => console.log(' -', a.id, a.seg, a.expand || '(none)', 'techList:', a.techList.length, 'meta:', a.meta.length, a.callout ? 'callout' : '', a.compareGroup ? 'compare:'+a.compareGroup : '', a.sketch ? 'sketch:'+a.sketch.svgId : ''));
