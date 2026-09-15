// One-off extraction script: pulls the big data-object literals out of
// AAMEC_Session01_3D_WebApp.html and writes each to its own .ts file,
// so the Next.js rewrite can import real content instead of re-typing it.
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', '..', 'AAMEC_Session01_3D_WebApp.html');
const OUT_DIR = path.join(__dirname, '..', 'src', 'content', 'raw');
fs.mkdirSync(OUT_DIR, { recursive: true });

const src = fs.readFileSync(SRC, 'utf8');

// Find the character offset of a line starting with `needle`.
function findDeclOffset(needle) {
  const idx = src.indexOf(needle);
  if (idx === -1) throw new Error('Not found: ' + needle);
  return idx;
}

// Starting at `startIdx` (which points at the opening { or [ of a literal),
// walk forward counting brace/bracket depth (respecting strings, template
// literals, and comments) until it returns to zero. Returns the index just
// after the matching close.
function findBalancedEnd(str, startIdx) {
  const openCh = str[startIdx];
  const closeCh = openCh === '{' ? '}' : openCh === '[' ? ']' : null;
  if (!closeCh) throw new Error('Not an opening brace at ' + startIdx);
  let depth = 0;
  let i = startIdx;
  let mode = null; // null | 'squote' | 'dquote' | 'template' | 'linecomment' | 'blockcomment'
  for (; i < str.length; i++) {
    const c = str[i];
    const prev = str[i - 1];
    if (mode === 'squote') {
      if (c === "'" && prev !== '\\') mode = null;
      continue;
    }
    if (mode === 'dquote') {
      if (c === '"' && prev !== '\\') mode = null;
      continue;
    }
    if (mode === 'template') {
      if (c === '`' && prev !== '\\') mode = null;
      continue;
    }
    if (mode === 'linecomment') {
      if (c === '\n') mode = null;
      continue;
    }
    if (mode === 'blockcomment') {
      if (c === '/' && prev === '*') mode = null;
      continue;
    }
    if (c === "'") { mode = 'squote'; continue; }
    if (c === '"') { mode = 'dquote'; continue; }
    if (c === '`') { mode = 'template'; continue; }
    if (c === '/' && str[i + 1] === '/') { mode = 'linecomment'; continue; }
    if (c === '/' && str[i + 1] === '*') { mode = 'blockcomment'; continue; }
    if (c === openCh) depth++;
    else if (c === closeCh) {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  throw new Error('Unbalanced literal starting at ' + startIdx);
}

function extract(varName, exportName, filename) {
  const declNeedle = `const ${varName} = `;
  const declIdx = findDeclOffset(declNeedle);
  const literalStart = declIdx + declNeedle.length;
  const literalEnd = findBalancedEnd(src, literalStart);
  const literal = src.slice(literalStart, literalEnd);
  const ts = `// Auto-extracted from AAMEC_Session01_3D_WebApp.html — do not hand-edit,\n// re-run extract-content.js against the source deck if it changes upstream.\n\nexport const ${exportName} = ${literal} as const;\n`;
  fs.writeFileSync(path.join(OUT_DIR, filename), ts, 'utf8');
  console.log('wrote', filename, literal.length, 'chars');
}

extract('techDetails', 'techDetails', 'techDetails.ts');
extract('conceptDetails', 'conceptDetails', 'conceptDetails.ts');
extract('infraDetails', 'infraDetails', 'infraDetails.ts');
extract('infraTypeGroups', 'infraTypeGroups', 'infraTypeGroups.ts');
extract('comparisonData', 'comparisonData', 'comparisonData.ts');
extract('dbTypeGroups', 'dbTypeGroups', 'dbTypeGroups.ts');
extract('quizData', 'quizData', 'quizData.ts');
extract('segTitles', 'segTitles', 'segTitles.ts');
extract('schedule', 'schedule', 'schedule.ts');
