// Extracts every top-level static <section class="slide ..."> block from
// AAMEC_Session01_3D_WebApp.html (sections do not nest in this file) into
// structured JSON: tag attributes + inner HTML, in document order.
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', '..', 'AAMEC_Session01_3D_WebApp.html');
const OUT = path.join(__dirname, '..', 'src', 'content', 'raw', 'staticSections.json');

const src = fs.readFileSync(SRC, 'utf8');

// Only look within the <body> ... first <script> region (the static markup),
// to avoid matching anything that looks like a section tag inside JS strings.
const bodyStart = src.indexOf('<body>');
const firstScript = src.indexOf('<script', bodyStart);
const markup = src.slice(bodyStart, firstScript);

const sections = [];
const openRe = /<section\b([^>]*)>/g;
let m;
while ((m = openRe.exec(markup))) {
  const attrsRaw = m[1];
  const contentStart = m.index + m[0].length;
  const closeIdx = markup.indexOf('</section>', contentStart);
  if (closeIdx === -1) break;
  const inner = markup.slice(contentStart, closeIdx);
  // Parse attributes (class, id, data-*)
  const attrs = {};
  const attrRe = /([a-zA-Z0-9_-]+)="([^"]*)"/g;
  let am;
  while ((am = attrRe.exec(attrsRaw))) {
    attrs[am[1]] = am[2];
  }
  sections.push({ attrs, inner: inner.trim() });
  // Advance regex lastIndex past this section's close tag so we don't
  // rescan its interior for nested <section (there are none, but safe).
  openRe.lastIndex = closeIdx + '</section>'.length;
}

fs.writeFileSync(OUT, JSON.stringify(sections, null, 2), 'utf8');
console.log('wrote', sections.length, 'sections to', OUT);
sections.forEach((s, i) => console.log(i, s.attrs.id || '(no id)', s.attrs.class, s.attrs['data-seg'], s.attrs['data-expand'] || ''));
