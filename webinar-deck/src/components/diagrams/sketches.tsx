import rough from 'roughjs';
import type { SketchDrawFn } from './RoughSketch';

export type SketchEntry = { title: string; draw: SketchDrawFn; viewBox: string; height: number };

const ROYAL = '#1c4e68';
const GOLD = '#e8a23d';
const MIST = '#e6edee';
const AMBER_WASH = '#f1e3d0';
const INK = '#182226';
const MUTED = '#5c6b70';
const GREEN = '#2e8b57';
const RED = '#c75450';
const GREEN_WASH = '#eaf7ef';
const RED_WASH = '#fbeaea';

function svgLabel(svg: SVGSVGElement, x: number, y: number, text: string, color: string, size = 12) {
  const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  t.setAttribute('x', String(x));
  t.setAttribute('y', String(y));
  t.setAttribute('text-anchor', 'middle');
  t.setAttribute('font-family', 'IBM Plex Sans, Segoe UI, Arial, sans-serif');
  t.setAttribute('font-size', String(size));
  t.setAttribute('fill', color);
  t.textContent = text;
  svg.appendChild(t);
}

/** CI/CD pipeline: Lint → Test → Build → Deploy, the last stage lit gold. */
export const drawCicdSketch: SketchDrawFn = (rc, svg) => {
  const stages = ['Lint', 'Test', 'Build', 'Deploy'];
  const boxW = 88, boxH = 52, gap = 34, startX = 12, y = 34;
  stages.forEach((label, i) => {
    const x = startX + i * (boxW + gap);
    const color = i === stages.length - 1 ? GOLD : ROYAL;
    svg.appendChild(rc.rectangle(x, y, boxW, boxH, { stroke: color, strokeWidth: 2, roughness: 1.8, fill: MIST, fillStyle: 'hachure', fillWeight: 1 }));
    svgLabel(svg, x + boxW / 2, y + boxH / 2 + 5, label, INK, 13);
    if (i < stages.length - 1) {
      svg.appendChild(rc.line(x + boxW + 4, y + boxH / 2, x + boxW + gap - 4, y + boxH / 2, { stroke: GOLD, strokeWidth: 2, roughness: 1.6 }));
    }
  });
};

/** Rollback: a bad release rolled back to the last good version. */
export const drawRollbackSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(14, 26, 110, 56, { stroke: RED, strokeWidth: 2, roughness: 1.8, fill: RED_WASH, fillStyle: 'hachure' }));
  svg.appendChild(rc.rectangle(240, 26, 130, 56, { stroke: GREEN, strokeWidth: 2, roughness: 1.8, fill: GREEN_WASH, fillStyle: 'hachure' }));
  svgLabel(svg, 69, 58, 'Bad release', RED, 12);
  svgLabel(svg, 305, 58, 'Last good version', GREEN, 12);
  svg.appendChild(rc.line(128, 54, 236, 54, { stroke: ROYAL, strokeWidth: 2, roughness: 1.6 }));
  svgLabel(svg, 182, 40, 'rollback', ROYAL, 11);
};

/** Request/response: Browser → API Server → Database, and back. */
export const drawRequestResponseSketch: SketchDrawFn = (rc, svg) => {
  const nodes = [{ x: 10, label: 'Browser' }, { x: 160, label: 'API Server' }, { x: 320, label: 'Database' }];
  const boxW = 120, boxH = 54, y = 34;
  nodes.forEach((n, i) => {
    svg.appendChild(rc.rectangle(n.x, y, boxW, boxH, { stroke: ROYAL, strokeWidth: 2, roughness: 1.8, fill: MIST, fillStyle: 'hachure' }));
    svgLabel(svg, n.x + boxW / 2, y + boxH / 2 + 5, n.label, INK, 12);
    if (i < nodes.length - 1) {
      svg.appendChild(rc.line(n.x + boxW + 2, y + 18, nodes[i + 1].x - 2, y + 18, { stroke: GOLD, strokeWidth: 2, roughness: 1.5 }));
      svg.appendChild(rc.line(nodes[i + 1].x - 2, y + 38, n.x + boxW + 2, y + 38, { stroke: GOLD, strokeWidth: 1.5, roughness: 1.5 }));
    }
  });
  svgLabel(svg, 235, y - 10, 'request', MUTED, 10);
  svgLabel(svg, 235, y + 66, 'response', MUTED, 10);
};

/** Architecture comparison: one monolith block vs. four microservice blocks. */
export const drawArchComparisonSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(14, 16, 130, 96, { stroke: ROYAL, strokeWidth: 2, roughness: 1.8, fill: MIST, fillStyle: 'cross-hatch' }));
  svgLabel(svg, 79, 70, 'Monolith', ROYAL, 13);
  svgLabel(svg, 79, 128, 'one deployable', MUTED, 10);

  const positions: [number, number][] = [[190, 16], [268, 16], [190, 74], [268, 74]];
  positions.forEach((p) => {
    svg.appendChild(rc.rectangle(p[0], p[1], 58, 42, { stroke: GOLD, strokeWidth: 2, roughness: 1.8, fill: AMBER_WASH, fillStyle: 'hachure' }));
  });
  svgLabel(svg, 259, 128, 'Microservices', GOLD, 13);
  svgLabel(svg, 259, 142, 'many small ones', MUTED, 10);
};

/** New: the hybrid shape the session actually builds — one central system
 * plus a lightweight copy running in every store, so billing never fully
 * stops even if the link to head office drops. */
export const drawHybridSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(140, 12, 100, 56, { stroke: GOLD, strokeWidth: 2, roughness: 1.8, fill: AMBER_WASH, fillStyle: 'hachure' }));
  svgLabel(svg, 190, 44, 'Central system', GOLD, 12);

  const stores: [number, number][] = [[10, 100], [130, 108], [250, 100]];
  stores.forEach((p, i) => {
    svg.appendChild(rc.rectangle(p[0], p[1], 88, 44, { stroke: ROYAL, strokeWidth: 2, roughness: 1.8, fill: MIST, fillStyle: 'hachure' }));
    svgLabel(svg, p[0] + 44, p[1] + 27, `Store ${i + 1}`, INK, 11);
    svg.appendChild(rc.line(p[0] + 44, p[1] - 2, 190, 68, { stroke: ROYAL, strokeWidth: 1.5, roughness: 1.6 }));
  });
  svgLabel(svg, 190, 158, 'each store keeps billing even if the link drops', MUTED, 10);
};

/** New: unit tests check one function; integration tests check code plus
 * a real dependency (like the database); concurrency tests check what
 * happens when two people race for the same thing at once. */
export const drawTestPyramidSketch: SketchDrawFn = (rc, svg) => {
  const layers = [
    { y: 96, w: 300, label: 'Unit — one small piece of code', color: ROYAL, fill: MIST },
    { y: 52, w: 210, label: 'Integration — code + real database', color: ROYAL, fill: MIST },
    { y: 8, w: 130, label: 'Concurrency — two at once', color: GOLD, fill: AMBER_WASH },
  ];
  layers.forEach((l) => {
    const x = 170 - l.w / 2;
    svg.appendChild(rc.rectangle(x, l.y, l.w, 36, { stroke: l.color, strokeWidth: 2, roughness: 1.8, fill: l.fill, fillStyle: 'hachure' }));
    svgLabel(svg, 170, l.y + 22, l.label, l.color === GOLD ? GOLD : INK, 11);
  });
};

/** New: infrastructure is layered, not a menu of alternatives — an
 * operating system, a cloud provider on top of it, an orchestrator on
 * top of that, and an application server running inside a container. */
export const drawInfraStackSketch: SketchDrawFn = (rc, svg) => {
  const layers = [
    { label: 'Application Server', color: GOLD, fill: AMBER_WASH },
    { label: 'Orchestration (Kubernetes)', color: ROYAL, fill: MIST },
    { label: 'Cloud Provider (AWS / Azure)', color: ROYAL, fill: MIST },
    { label: 'Operating System (Linux)', color: ROYAL, fill: MIST },
  ];
  const w = 300, h = 30, x = 20;
  layers.forEach((l, i) => {
    const y = 10 + i * (h + 6);
    svg.appendChild(rc.rectangle(x, y, w, h, { stroke: l.color, strokeWidth: 2, roughness: 1.7, fill: l.fill, fillStyle: 'hachure' }));
    svgLabel(svg, x + w / 2, y + h / 2 + 4, l.label, l.color === GOLD ? GOLD : INK, 11);
  });
};

/** New: a relational schema — one customer, many invoices, each
 * invoice tied to exactly one customer. The database enforces the link. */
export const drawDbSchemaSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(20, 16, 140, 78, { stroke: ROYAL, strokeWidth: 2, roughness: 1.8, fill: MIST, fillStyle: 'hachure' }));
  svgLabel(svg, 90, 34, 'customers', ROYAL, 13);
  svgLabel(svg, 90, 56, 'id (PK)', INK, 10);
  svgLabel(svg, 90, 72, 'name, phone', INK, 10);

  svg.appendChild(rc.rectangle(220, 8, 160, 96, { stroke: GOLD, strokeWidth: 2, roughness: 1.8, fill: AMBER_WASH, fillStyle: 'hachure' }));
  svgLabel(svg, 300, 26, 'invoices', GOLD, 13);
  svgLabel(svg, 300, 48, 'id (PK)', INK, 10);
  svgLabel(svg, 300, 64, 'customer_id (FK)', INK, 10);
  svgLabel(svg, 300, 80, 'total, tax, date', INK, 10);

  svg.appendChild(rc.line(160, 55, 220, 55, { stroke: ROYAL, strokeWidth: 2, roughness: 1.5 }));
  svgLabel(svg, 190, 45, '1 → many', MUTED, 10);
};

/* ---------------------------------------------------------
   A real sequence diagram: named actors as vertical lifelines,
   numbered messages between them in time order — the one diagram
   type the flow/architecture sketches above don't cover.
--------------------------------------------------------- */
export function drawSequence(actors: string[], steps: { from: number; to: number; label: string; returns?: boolean }[]): SketchDrawFn {
  return (rc, svg) => {
    const top = 34;
    const rowH = 30;
    const laneGap = 480 / (actors.length + 0.4);
    const laneX = actors.map((_, i) => 40 + i * laneGap);
    const bottom = top + steps.length * rowH + 14;

    actors.forEach((name, i) => {
      svg.appendChild(rc.rectangle(laneX[i] - 42, 4, 84, 26, { stroke: ROYAL, strokeWidth: 1.5, roughness: 1.6, fill: MIST, fillStyle: 'hachure' }));
      svgLabel(svg, laneX[i], 21, name, ROYAL, 11);
      svg.appendChild(rc.line(laneX[i], 30, laneX[i], bottom, { stroke: MUTED, strokeWidth: 1, roughness: 1.2, strokeLineDash: [3, 4] }));
    });

    steps.forEach((step, i) => {
      const y = top + i * rowH + rowH / 2;
      const x1 = laneX[step.from];
      const x2 = laneX[step.to];
      const color = step.returns ? MUTED : GOLD;
      svg.appendChild(rc.line(x1, y, x2, y, { stroke: color, strokeWidth: 1.8, roughness: 1.4, strokeLineDash: step.returns ? [4, 3] : undefined }));
      const angle = x2 > x1 ? 0 : Math.PI;
      const s = 6;
      const tip: [number, number] = [x2, y];
      const left: [number, number] = [x2 - s * Math.cos(angle - 0.5), y - s * Math.sin(angle - 0.5)];
      const right: [number, number] = [x2 - s * Math.cos(angle + 0.5), y - s * Math.sin(angle + 0.5)];
      svg.appendChild(rc.polygon([tip, left, right], { stroke: color, fill: color, fillStyle: 'solid', roughness: 1.1 }));
      svgLabel(svg, (x1 + x2) / 2, y - 6, `${i + 1}. ${step.label}`, INK, 10);
    });
  };
}

export const drawReturnSequenceSketch: SketchDrawFn = drawSequence(
  ['Customer', 'Counter', 'App', 'Database'],
  [
    { from: 0, to: 1, label: 'wants to return an item' },
    { from: 1, to: 2, label: 'look up the original bill' },
    { from: 2, to: 3, label: 'find the invoice' },
    { from: 3, to: 2, label: 'invoice found', returns: true },
    { from: 2, to: 1, label: 'refund amount calculated' },
    { from: 1, to: 0, label: 'refund processed' },
  ],
);

/* ---------------------------------------------------------
   Shared primitives for the smaller diagrams below — a person
   as a labeled circle (matching the deck's own avatar-chip
   language), and an arrow with a real head instead of a bare line.
--------------------------------------------------------- */
type RC = ReturnType<typeof rough.svg>;

function person(rc: RC, svg: SVGSVGElement, cx: number, cy: number, r: number, label: string, color: string, fill: string) {
  svg.appendChild(rc.circle(cx, cy, r * 2, { stroke: color, strokeWidth: 2, roughness: 1.7, fill, fillStyle: 'hachure' }));
  svgLabel(svg, cx, cy + 4, label, color, Math.max(9, r * 0.55));
}

function arrowTo(rc: RC, svg: SVGSVGElement, x1: number, y1: number, x2: number, y2: number, color: string, width = 2) {
  svg.appendChild(rc.line(x1, y1, x2, y2, { stroke: color, strokeWidth: width, roughness: 1.6 }));
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const s = 7;
  const p1: [number, number] = [x2, y2];
  const p2: [number, number] = [x2 - s * Math.cos(angle - 0.5), y2 - s * Math.sin(angle - 0.5)];
  const p3: [number, number] = [x2 - s * Math.cos(angle + 0.5), y2 - s * Math.sin(angle + 0.5)];
  svg.appendChild(rc.polygon([p1, p2, p3], { stroke: color, fill: color, fillStyle: 'solid', roughness: 1.2 }));
}

/* ---------------------------------------------------------
   Module 1 — Requirement Gathering, one icon per technique,
   grounded in the same retail-billing conversation throughout.
--------------------------------------------------------- */

export const drawInterviewSketch: SketchDrawFn = (rc, svg) => {
  person(rc, svg, 60, 55, 22, 'YOU', ROYAL, MIST);
  person(rc, svg, 220, 55, 22, 'SM', GOLD, AMBER_WASH);
  svg.appendChild(rc.line(90, 55, 190, 55, { stroke: MUTED, strokeWidth: 1.5, roughness: 1.6, strokeLineDash: [4, 4] }));
  svg.appendChild(rc.ellipse(140, 22, 70, 30, { stroke: ROYAL, strokeWidth: 1.5, roughness: 1.8, fill: '#ffffff', fillStyle: 'solid' }));
  svgLabel(svg, 140, 20, '"Walk me through', INK, 10);
  svgLabel(svg, 140, 32, 'a return."', INK, 10);
  svgLabel(svg, 140, 100, 'One question at a time, written down.', MUTED, 11);
};

export const drawObservationSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(30, 40, 90, 44, { stroke: ROYAL, strokeWidth: 2, roughness: 1.8, fill: MIST, fillStyle: 'hachure' }));
  svgLabel(svg, 75, 65, 'Billing counter', ROYAL, 11);
  person(rc, svg, 200, 40, 18, 'YOU', GOLD, AMBER_WASH);
  svg.appendChild(rc.ellipse(155, 40, 26, 15, { stroke: GOLD, strokeWidth: 1.5, roughness: 1.6, fill: 'none' }));
  svg.appendChild(rc.circle(155, 40, 8, { stroke: GOLD, strokeWidth: 1.5, roughness: 1.4, fill: GOLD, fillStyle: 'solid' }));
  svgLabel(svg, 140, 100, 'Watch the real work happen. Say nothing.', MUTED, 11);
};

export const drawDocStudySketch: SketchDrawFn = (rc, svg) => {
  const sheets = [
    { x: 60, y: 55, label: 'Old bill book' },
    { x: 90, y: 42, label: 'Excel sheet' },
    { x: 120, y: 30, label: 'Discount notes' },
  ];
  sheets.forEach((s) => {
    svg.appendChild(rc.rectangle(s.x, s.y, 110, 40, { stroke: ROYAL, strokeWidth: 1.5, roughness: 1.8, fill: MIST, fillStyle: 'hachure' }));
  });
  svgLabel(svg, 60 + 55, 55 + 25, sheets[0].label, INK, 10);
  svgLabel(svg, 220, 25, 'every form and spreadsheet\ncurrently in use', MUTED, 10);
};

export const drawPrototypeSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(20, 10, 200, 90, { stroke: GOLD, strokeWidth: 2, roughness: 1.9, fill: 'none', strokeLineDash: [5, 4] }));
  svg.appendChild(rc.rectangle(34, 24, 172, 16, { stroke: ROYAL, strokeWidth: 1.5, roughness: 1.7, fill: MIST, fillStyle: 'hachure' }));
  svg.appendChild(rc.rectangle(34, 48, 100, 14, { stroke: ROYAL, strokeWidth: 1.5, roughness: 1.7, fill: MIST, fillStyle: 'hachure' }));
  svg.appendChild(rc.rectangle(150, 70, 56, 22, { stroke: GOLD, strokeWidth: 1.5, roughness: 1.7, fill: AMBER_WASH, fillStyle: 'hachure' }));
  svgLabel(svg, 178, 84, 'Cancel bill', GOLD, 10);
  svg.appendChild(rc.line(240, 105, 200, 88, { stroke: INK, strokeWidth: 2, roughness: 1.4 }));
  svgLabel(svg, 120, 118, 'A clickable mock, before any real code.', MUTED, 11);
};

export const drawWorkshopSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.ellipse(140, 55, 90, 46, { stroke: GOLD, strokeWidth: 2, roughness: 1.8, fill: AMBER_WASH, fillStyle: 'hachure' }));
  person(rc, svg, 140, 15, 16, 'YOU', ROYAL, MIST);
  person(rc, svg, 70, 80, 16, 'SALES', ROYAL, MIST);
  person(rc, svg, 210, 80, 16, 'FIN.', ROYAL, MIST);
  svgLabel(svg, 140, 130, 'Disagreeing departments, one room.', MUTED, 11);
};

/* ---------------------------------------------------------
   Module 2 — How the tech choice is really made.
--------------------------------------------------------- */

export const drawHireSketch: SketchDrawFn = (rc, svg) => {
  person(rc, svg, 60, 55, 24, 'YOU', ROYAL, MIST);
  svg.appendChild(rc.circle(200, 55, 64, { stroke: GOLD, strokeWidth: 2, roughness: 1.7, fill: 'none' }));
  svg.appendChild(rc.line(200, 55, 200, 28, { stroke: GOLD, strokeWidth: 2, roughness: 1.4 }));
  svg.appendChild(rc.line(200, 55, 218, 60, { stroke: GOLD, strokeWidth: 2, roughness: 1.4 }));
  svgLabel(svg, 200, 100, '+5 years from now', GOLD, 11);
  svgLabel(svg, 130, 130, 'Who can still maintain this?', MUTED, 11);
};

export const drawTeamSkillSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(20, 15, 140, 34, { stroke: ROYAL, strokeWidth: 2, roughness: 1.7, fill: MIST, fillStyle: 'hachure' }));
  svgLabel(svg, 90, 36, 'Team already knows ✓', ROYAL, 11);
  svg.appendChild(rc.rectangle(20, 60, 140, 34, { stroke: MUTED, strokeWidth: 1.5, roughness: 1.7, fill: 'none', strokeLineDash: [4, 3] }));
  svgLabel(svg, 90, 81, 'Newer, unfamiliar ?', MUTED, 11);
  svgLabel(svg, 90, 115, 'A familiar second system beats an unfamiliar first.', MUTED, 10);
};

export const drawEcosystemSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(115, 45, 90, 34, { stroke: GOLD, strokeWidth: 2, roughness: 1.8, fill: AMBER_WASH, fillStyle: 'hachure' }));
  svgLabel(svg, 160, 66, 'Billing system', GOLD, 11);
  const satellites = [
    { x: 10, y: 5, label: 'Payments' },
    { x: 230, y: 5, label: 'SMS' },
    { x: 10, y: 95, label: 'PDF / print' },
    { x: 230, y: 95, label: 'Tax rules' },
  ];
  satellites.forEach((s) => {
    svg.appendChild(rc.rectangle(s.x, s.y, 70, 26, { stroke: ROYAL, strokeWidth: 1.5, roughness: 1.7, fill: MIST, fillStyle: 'hachure' }));
    svgLabel(svg, s.x + 35, s.y + 17, s.label, INK, 9.5);
    svg.appendChild(rc.line(s.x < 100 ? s.x + 70 : s.x, s.y + 13, s.x < 100 ? 115 : 205, 62, { stroke: MUTED, strokeWidth: 1.2, roughness: 1.5 }));
  });
};

export const drawOperateSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.arc(140, 70, 160, 100, Math.PI, Math.PI * 2, true, { stroke: ROYAL, strokeWidth: 2, roughness: 1.7 }));
  svg.appendChild(rc.line(140, 70, 100, 25, { stroke: GOLD, strokeWidth: 2.5, roughness: 1.4 }));
  svgLabel(svg, 65, 30, 'fewer 9pm calls', GOLD, 10);
  svgLabel(svg, 215, 30, 'more 9pm calls', MUTED, 10);
  svgLabel(svg, 140, 118, 'Fewer moving parts, fewer pages at midnight.', MUTED, 10.5);
};

/* ---------------------------------------------------------
   Module 4 — Architecture, one flat diagram per shape.
--------------------------------------------------------- */

export const drawMonolithSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(70, 15, 160, 100, { stroke: ROYAL, strokeWidth: 2, roughness: 1.8, fill: MIST, fillStyle: 'cross-hatch' }));
  svgLabel(svg, 150, 60, 'Billing system', ROYAL, 13);
  svgLabel(svg, 150, 80, '(everything, one program)', MUTED, 10);
  svgLabel(svg, 150, 135, 'One bug can affect every store at once.', MUTED, 10.5);
};

export const drawModularSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(60, 10, 180, 110, { stroke: GOLD, strokeWidth: 2, roughness: 1.8, fill: 'none' }));
  ['Billing', 'Inventory', 'Reports'].forEach((label, i) => {
    const y = 10 + i * (110 / 3);
    svg.appendChild(rc.rectangle(66, y + 3, 168, 110 / 3 - 6, { stroke: ROYAL, strokeWidth: 1.5, roughness: 1.7, fill: MIST, fillStyle: 'hachure' }));
    svgLabel(svg, 150, y + 110 / 6 + 4, label, ROYAL, 11);
  });
  svgLabel(svg, 150, 138, 'One program, cleanly divided inside.', MUTED, 10.5);
};

export const drawMicroservicesSketch: SketchDrawFn = (rc, svg) => {
  const boxes = [
    { x: 20, y: 10, label: 'Billing' },
    { x: 170, y: 10, label: 'Inventory' },
    { x: 20, y: 75, label: 'Reports' },
    { x: 170, y: 75, label: 'Auth' },
  ];
  boxes.forEach((b, i) => {
    svg.appendChild(rc.rectangle(b.x, b.y, 90, 44, { stroke: i % 2 ? GOLD : ROYAL, strokeWidth: 2, roughness: 1.8, fill: i % 2 ? AMBER_WASH : MIST, fillStyle: 'hachure' }));
    svgLabel(svg, b.x + 45, b.y + 26, b.label, i % 2 ? GOLD : ROYAL, 11);
  });
  svg.appendChild(rc.line(110, 32, 170, 32, { stroke: MUTED, strokeWidth: 1.3, roughness: 1.5 }));
  svg.appendChild(rc.line(65, 54, 65, 75, { stroke: MUTED, strokeWidth: 1.3, roughness: 1.5 }));
  svg.appendChild(rc.line(110, 97, 170, 97, { stroke: MUTED, strokeWidth: 1.3, roughness: 1.5 }));
  svg.appendChild(rc.line(215, 54, 215, 75, { stroke: MUTED, strokeWidth: 1.3, roughness: 1.5 }));
  svgLabel(svg, 140, 138, 'Many small, independent programs.', MUTED, 10.5);
};

/* ---------------------------------------------------------
   Module 5 — Build & Testing, one diagram per test type.
--------------------------------------------------------- */

export const drawUnitTestSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(30, 35, 130, 40, { stroke: ROYAL, strokeWidth: 2, roughness: 1.8, fill: MIST, fillStyle: 'hachure' }));
  svgLabel(svg, 95, 59, 'calculateTax(bill)', ROYAL, 12);
  arrowTo(rc, svg, 165, 55, 210, 55, GOLD);
  svg.appendChild(rc.circle(235, 55, 26, { stroke: GREEN, strokeWidth: 2, roughness: 1.6, fill: GREEN_WASH, fillStyle: 'solid' }));
  svgLabel(svg, 235, 59, '✓', GREEN, 16);
  svgLabel(svg, 140, 100, 'Checks one small piece, alone.', MUTED, 11);
};

export const drawIntegrationTestSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(20, 35, 100, 40, { stroke: ROYAL, strokeWidth: 2, roughness: 1.8, fill: MIST, fillStyle: 'hachure' }));
  svgLabel(svg, 70, 59, 'Billing code', ROYAL, 11);
  arrowTo(rc, svg, 125, 55, 175, 55, GOLD);
  svg.appendChild(rc.ellipse(220, 55, 70, 44, { stroke: GOLD, strokeWidth: 2, roughness: 1.8, fill: AMBER_WASH, fillStyle: 'hachure' }));
  svgLabel(svg, 220, 59, 'Real database', GOLD, 11);
  svgLabel(svg, 140, 100, 'Checks your code and the real database together.', MUTED, 10.5);
};

export const drawConcurrencySketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(115, 50, 90, 40, { stroke: RED, strokeWidth: 2, roughness: 1.8, fill: RED_WASH, fillStyle: 'hachure' }));
  svgLabel(svg, 160, 66, 'Last item', RED, 11);
  svgLabel(svg, 160, 80, 'in stock', RED, 11);
  person(rc, svg, 30, 30, 18, 'C1', ROYAL, MIST);
  person(rc, svg, 30, 100, 18, 'C2', ROYAL, MIST);
  arrowTo(rc, svg, 52, 35, 112, 58, MUTED);
  arrowTo(rc, svg, 52, 95, 112, 72, MUTED);
  svgLabel(svg, 160, 115, "Two counters, one item, same second.", MUTED, 10.5);
};

export const drawMonitoringSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(20, 10, 260, 90, { stroke: ROYAL, strokeWidth: 2, roughness: 1.8, fill: '#0d1730', fillStyle: 'solid' }));
  const pts: [number, number][] = [[35, 70], [85, 60], [110, 25], [140, 75], [190, 55], [230, 40], [265, 65]];
  for (let i = 0; i < pts.length - 1; i++) {
    svg.appendChild(rc.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], { stroke: GOLD, strokeWidth: 2, roughness: 1.3 }));
  }
  svg.appendChild(rc.circle(110, 25, 10, { stroke: RED, strokeWidth: 2, roughness: 1.4, fill: RED, fillStyle: 'solid' }));
  svgLabel(svg, 110, 12, 'alert', RED, 10);
  svgLabel(svg, 150, 120, 'A checkup that runs every second, not once a year.', MUTED, 10.5);
};

/* ---------------------------------------------------------
   Database: NoSQL flexibility, contrasted with the relational
   schema sketch above.
--------------------------------------------------------- */

export const drawNoSqlSketch: SketchDrawFn = (rc, svg) => {
  const docs = [
    { x: 15, fields: ['name', 'phone'] },
    { x: 135, fields: ['name', 'phone', 'loyalty_id'] },
    { x: 255, fields: ['name'] },
  ];
  docs.forEach((d) => {
    svg.appendChild(rc.rectangle(d.x, 15, 100, 80, { stroke: GOLD, strokeWidth: 2, roughness: 1.8, fill: AMBER_WASH, fillStyle: 'hachure' }));
    d.fields.forEach((f, i) => svgLabel(svg, d.x + 50, 38 + i * 16, f, INK, 9.5));
  });
  svgLabel(svg, 185, 118, 'Each customer record can carry different fields.', MUTED, 10.5);
};

/* ---------------------------------------------------------
   Anchor-slide diagrams — module-opening visuals.
--------------------------------------------------------- */

export const drawRequirementGapSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.ellipse(80, 40, 130, 46, { stroke: ROYAL, strokeWidth: 1.5, roughness: 1.8, fill: '#ffffff', fillStyle: 'solid' }));
  svgLabel(svg, 80, 34, '"Make a bill, apply', INK, 11);
  svgLabel(svg, 80, 50, 'price and tax, print it."', INK, 11);
  arrowTo(rc, svg, 150, 60, 220, 60, GOLD, 2.5);
  svg.appendChild(rc.rectangle(230, 20, 130, 80, { stroke: GOLD, strokeWidth: 2, roughness: 1.8, fill: AMBER_WASH, fillStyle: 'hachure' }));
  svgLabel(svg, 295, 50, 'What they', GOLD, 11);
  svgLabel(svg, 295, 66, 'actually need', GOLD, 11);
  svgLabel(svg, 200, 120, 'One sentence in. A real system out.', MUTED, 11);
};

export const drawGatherOverviewSketch: SketchDrawFn = (rc, svg) => {
  const items = ['Interview', 'Observe', 'Documents', 'Prototype', 'Workshop'];
  items.forEach((label, i) => {
    const x = 35 + i * 70;
    svg.appendChild(rc.circle(x, 40, 44, { stroke: i % 2 ? GOLD : ROYAL, strokeWidth: 2, roughness: 1.7, fill: i % 2 ? AMBER_WASH : MIST, fillStyle: 'hachure' }));
    svgLabel(svg, x, 44, String(i + 1), i % 2 ? GOLD : ROYAL, 15);
    svgLabel(svg, x, 78, label, INK, 9.5);
  });
};

export const drawFrontendFlowSketch: SketchDrawFn = (rc, svg) => {
  const steps = ['Staff taps\n"New bill"', 'Frontend\nframework', 'Screen\nupdates'];
  steps.forEach((label, i) => {
    const x = 15 + i * 105;
    svg.appendChild(rc.rectangle(x, 25, 90, 50, { stroke: i === 1 ? GOLD : ROYAL, strokeWidth: 2, roughness: 1.8, fill: i === 1 ? AMBER_WASH : MIST, fillStyle: 'hachure' }));
    label.split('\n').forEach((line, j) => svgLabel(svg, x + 45, 44 + j * 14, line, i === 1 ? GOLD : INK, 10.5));
    if (i < steps.length - 1) arrowTo(rc, svg, x + 90, 50, x + 105, 50, MUTED);
  });
};

export const drawChooseScaleSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.line(150, 15, 150, 60, { stroke: ROYAL, strokeWidth: 2.5, roughness: 1.5 }));
  svg.appendChild(rc.line(60, 45, 240, 45, { stroke: GOLD, strokeWidth: 2.5, roughness: 1.5 }));
  svg.appendChild(rc.line(60, 45, 60, 75, { stroke: MUTED, strokeWidth: 1.5, roughness: 1.5 }));
  svg.appendChild(rc.line(240, 45, 240, 75, { stroke: MUTED, strokeWidth: 1.5, roughness: 1.5 }));
  svg.appendChild(rc.ellipse(60, 85, 70, 22, { stroke: ROYAL, strokeWidth: 1.8, roughness: 1.7, fill: MIST, fillStyle: 'hachure' }));
  svgLabel(svg, 60, 89, 'Familiar & proven', ROYAL, 9.5);
  svg.appendChild(rc.ellipse(240, 85, 70, 22, { stroke: MUTED, strokeWidth: 1.8, roughness: 1.7, fill: 'none', strokeLineDash: [4, 3] }));
  svgLabel(svg, 240, 89, 'New & trendy', MUTED, 9.5);
  svgLabel(svg, 150, 130, 'The reason it should not decide it: "which is fastest."', MUTED, 10);
};

export const drawDataShapesSketch: SketchDrawFn = (rc, svg) => {
  const cols = [
    { x: 20, title: 'Relational', items: 'PostgreSQL\nMySQL\nMS SQL\nOracle', color: ROYAL, fill: MIST },
    { x: 145, title: 'Document', items: 'MongoDB', color: GOLD, fill: AMBER_WASH },
    { x: 270, title: 'Key-Value', items: 'Redis', color: GOLD, fill: AMBER_WASH },
  ];
  cols.forEach((c) => {
    svg.appendChild(rc.rectangle(c.x, 10, 105, 110, { stroke: c.color, strokeWidth: 2, roughness: 1.8, fill: c.fill, fillStyle: 'hachure' }));
    svgLabel(svg, c.x + 52, 30, c.title, c.color, 12);
    c.items.split('\n').forEach((line, i) => svgLabel(svg, c.x + 52, 55 + i * 15, line, INK, 10));
  });
};

/* ---------------------------------------------------------
   Infrastructure stack — one shared sketch, with the layer
   under discussion highlighted per type-overview slide.
--------------------------------------------------------- */
export function drawInfraStackHighlighted(highlight: 'appserver' | 'orchestration' | 'cloud' | 'os'): SketchDrawFn {
  return (rc, svg) => {
    const layers: { key: typeof highlight; label: string }[] = [
      { key: 'appserver', label: 'Application Server' },
      { key: 'orchestration', label: 'Orchestration (Kubernetes)' },
      { key: 'cloud', label: 'Cloud Provider (AWS / Azure)' },
      { key: 'os', label: 'Operating System (Linux)' },
    ];
    const w = 300, h = 30, x = 20;
    layers.forEach((l, i) => {
      const on = l.key === highlight;
      const y = 10 + i * (h + 6);
      svg.appendChild(rc.rectangle(x, y, w, h, { stroke: on ? GOLD : ROYAL, strokeWidth: on ? 2.5 : 1.5, roughness: 1.7, fill: on ? AMBER_WASH : MIST, fillStyle: 'hachure' }));
      svgLabel(svg, x + w / 2, y + h / 2 + 4, l.label, on ? GOLD : INK, 11);
    });
  };
}

/* ---------------------------------------------------------
   Closing: what AI changed in this build, and what still came
   down to judgment — two columns, side by side.
--------------------------------------------------------- */
export const drawClosingSketch: SketchDrawFn = (rc, svg) => {
  svg.appendChild(rc.rectangle(15, 10, 195, 150, { stroke: GOLD, strokeWidth: 2, roughness: 1.8, fill: AMBER_WASH, fillStyle: 'hachure' }));
  svgLabel(svg, 112, 32, 'Faster now', GOLD, 13);
  ['Drafting requirements', 'Comparing tech options', 'Writing boilerplate', 'Generating tests'].forEach((t, i) => svgLabel(svg, 112, 56 + i * 22, t, INK, 10));

  svg.appendChild(rc.rectangle(230, 10, 195, 150, { stroke: ROYAL, strokeWidth: 2, roughness: 1.8, fill: MIST, fillStyle: 'hachure' }));
  svgLabel(svg, 327, 32, 'Still judgment', ROYAL, 13);
  ['What to build', 'Owning an outage', 'When to say no', 'What to check'].forEach((t, i) => svgLabel(svg, 327, 56 + i * 22, t, INK, 10));
};

/* ---------------------------------------------------------
   Module roadmap — the 8-stage journey, current stage lit.
   Shared by every module divider so the audience always knows
   where "day X" sits inside the six-month build.
--------------------------------------------------------- */
export const ROADMAP_STAGES = ['Gather', 'Tech', 'Database', 'Architect', 'Build', 'Test', 'Deploy', 'Run'];

export function drawRoadmapSketch(currentIndices: number[]): SketchDrawFn {
  return (rc, svg) => {
    const count = ROADMAP_STAGES.length;
    const margin = 30;
    const span = 360 - margin * 2;
    svg.appendChild(rc.line(margin, 40, 360 - margin, 40, { stroke: MUTED, strokeWidth: 1.5, roughness: 1.4 }));
    ROADMAP_STAGES.forEach((label, i) => {
      const x = margin + (span * i) / (count - 1);
      const on = currentIndices.includes(i);
      svg.appendChild(rc.circle(x, 40, on ? 22 : 14, { stroke: on ? GOLD : ROYAL, strokeWidth: on ? 2.5 : 1.5, roughness: 1.6, fill: on ? AMBER_WASH : MIST, fillStyle: 'solid' }));
      svgLabel(svg, x, 70, label, on ? GOLD : MUTED, on ? 11 : 9.5);
    });
  };
}
