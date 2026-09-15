'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { DustField, GlowSprite, SceneIntro, useStdMaterial, useWireMaterial } from './primitives';
import { GOLD, ROYAL, ROYAL_LIGHT } from './palette';

/** c1 — Agenda: eight waypoints joined in a ring, the first one lit gold. */
export function AgendaScene() {
  const count = 8;
  const radius = 2.1;
  const nodes = useRef<THREE.Mesh[]>([]);
  const group = useRef<THREE.Group>(null);
  const stdRoyal = useStdMaterial(ROYAL, { metalness: 0.5, roughness: 0.3 });
  const stdGold = useStdMaterial(GOLD, { metalness: 0.5, roughness: 0.3 });
  const positions = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        return { angle, pos: new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, Math.sin(angle * 0.7) * 0.5) };
      }),
    [],
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.2;
    nodes.current.forEach((n, i) => {
      if (!n) return;
      n.rotation.y = t * 0.5 + i;
      n.position.z = Math.sin(positions[i].angle * 0.7) * 0.5 + Math.sin(t * 0.8 + i) * 0.08;
    });
  });
  return (
    <SceneIntro>
      <group ref={group} rotation={[0.25, 0, 0]}>
        {positions.map((p, i) => (
          <mesh key={i} ref={(el) => { if (el) nodes.current[i] = el; }} position={p.pos.toArray()} material={i === 0 ? stdGold : stdRoyal}>
            <octahedronGeometry args={[i === 0 ? 0.28 : 0.2, 0]} />
          </mesh>
        ))}
        {positions.map((p, i) => {
          const next = positions[(i + 1) % count];
          return <Segment key={i} from={p.pos} to={next.pos} />;
        })}
        <GlowSprite color={GOLD} scale={1.1} position={positions[0].pos.toArray() as [number, number, number]} />
      </group>
      <DustField count={45} spread={4.5} color={ROYAL_LIGHT} size={0.05} />
    </SceneIntro>
  );
}

function Segment({ from, to, color = GOLD, opacity = 0.4 }: { from: THREE.Vector3; to: THREE.Vector3; color?: number; opacity?: number }) {
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints([from, to]), [from, to]);
  const mat = useMemo(() => new THREE.LineBasicMaterial({ color, transparent: true, opacity }), [color, opacity]);
  return <primitive object={new THREE.Line(geo, mat)} />;
}

/** c2 — Requirement core: an icosahedron core orbited by five gold satellites. */
export function RequirementCoreScene() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const sats = useRef<THREE.Mesh[]>([]);
  const stdCore = useStdMaterial(ROYAL, { roughness: 0.3 });
  const wireGold = useWireMaterial(GOLD);
  const stdGold = useStdMaterial(GOLD, { metalness: 0.6, roughness: 0.25 });
  const satMeta = useMemo(
    () => Array.from({ length: 5 }, (_, i) => ({ angle: (i / 5) * Math.PI * 2, radius: 2.4, speed: 0.4 + i * 0.05, tilt: i % 2 === 0 ? 1 : -1 })),
    [],
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.25;
    if (core.current) core.current.rotation.y = -t * 0.3;
    sats.current.forEach((s, i) => {
      if (!s) return;
      const m = satMeta[i];
      const a = m.angle + t * m.speed;
      s.position.set(Math.cos(a) * m.radius, Math.sin(a * 1.3) * 0.6 * m.tilt, Math.sin(a) * m.radius);
    });
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh ref={core} material={stdCore}>
          <icosahedronGeometry args={[1.1, 1]} />
        </mesh>
        <mesh material={wireGold}>
          <icosahedronGeometry args={[1.32, 1]} />
        </mesh>
        {satMeta.map((_, i) => (
          <group key={i}>
            <mesh ref={(el) => { if (el) sats.current[i] = el; }} material={stdGold}>
              <sphereGeometry args={[0.16, 16, 16]} />
            </mesh>
          </group>
        ))}
      </group>
      <DustField count={50} spread={4.5} color={GOLD} size={0.06} />
    </SceneIntro>
  );
}

const GATHER_TECHNIQUE_TYPES = ['interview', 'observation', 'document', 'prototype', 'workshop'] as const;

/** c3 — Five requirement-gathering techniques, iconified, orbiting a shared core. */
export function GatherTechniquesScene() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const icons = useRef<THREE.Group[]>([]);
  const stdGold = useStdMaterial(GOLD, { metalness: 0.55, roughness: 0.25 });
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.35 });
  const stdRoyal30 = useStdMaterial(ROYAL, { roughness: 0.3 });
  const stdRoyalDoc = useStdMaterial(ROYAL, { roughness: 0.35 });
  const wireGold = useWireMaterial(GOLD);
  const prototypeInnerMat = useStdMaterial(ROYAL, { roughness: 0.4, transparent: true, opacity: 0.85 });
  const radius = 2.5;
  const types = GATHER_TECHNIQUE_TYPES;
  const meta = useMemo(
    () =>
      GATHER_TECHNIQUE_TYPES.map((type, i) => {
        const angle = (i / GATHER_TECHNIQUE_TYPES.length) * Math.PI * 2 - Math.PI / 2;
        const pos = new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.55, Math.sin(angle * 0.6) * 0.6);
        return { type, angle, pos, baseY: pos.y };
      }),
    [],
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.22;
    if (core.current) core.current.rotation.y = t * 0.4;
    icons.current.forEach((icon, i) => {
      if (!icon) return;
      icon.rotation.y = t * 0.6 + i;
      icon.position.y = meta[i].baseY + Math.sin(t * 0.9 + i * 1.3) * 0.15;
    });
  });
  return (
    <SceneIntro>
      <group ref={group} rotation={[0.15, 0, 0]}>
        <mesh ref={core} material={stdGold}>
          <sphereGeometry args={[0.5, 24, 24]} />
        </mesh>
        <GlowSprite color={GOLD} scale={1.6} />
        {meta.map((m, i) => (
          <group key={m.type} ref={(el) => { if (el) icons.current[i] = el; }} position={m.pos.toArray()}>
            {m.type === 'interview' && (
              <mesh material={stdRoyal} scale={[1, 0.72, 0.9]}>
                <sphereGeometry args={[0.34, 20, 20]} />
              </mesh>
            )}
            {m.type === 'observation' && (
              <>
                <mesh material={stdRoyal30}>
                  <torusGeometry args={[0.32, 0.07, 16, 40]} />
                </mesh>
                <mesh material={stdGold}>
                  <sphereGeometry args={[0.13, 16, 16]} />
                </mesh>
              </>
            )}
            {m.type === 'document' &&
              [0, 1, 2].map((j) => (
                <mesh key={j} position={[0, j * 0.14 - 0.14, 0]} material={j === 1 ? stdGold : stdRoyalDoc}>
                  <boxGeometry args={[0.62, 0.09, 0.44]} />
                </mesh>
              ))}
            {m.type === 'prototype' && (
              <>
                <mesh material={wireGold}>
                  <boxGeometry args={[0.55, 0.55, 0.55]} />
                </mesh>
                <mesh material={prototypeInnerMat}>
                  <boxGeometry args={[0.3, 0.3, 0.3]} />
                </mesh>
              </>
            )}
            {m.type === 'workshop' && <WorkshopIcon material={stdRoyal30} />}
            <Segment from={new THREE.Vector3(0, 0, 0)} to={new THREE.Vector3(-m.pos.x, -m.pos.y, -m.pos.z)} opacity={0.35} />
          </group>
        ))}
      </group>
      <DustField count={45} spread={4.5} color={ROYAL_LIGHT} size={0.05} />
    </SceneIntro>
  );
}

function WorkshopIcon({ material }: { material: THREE.Material }) {
  const positions: [number, number, number][] = [
    [0, 0.22, 0],
    [-0.22, -0.16, 0],
    [0.22, -0.16, 0],
  ];
  return (
    <>
      {positions.map((p, i) => (
        <mesh key={i} position={p} material={material}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>
      ))}
      {[[0, 1], [0, 2], [1, 2]].map(([i, j]) => (
        <Segment key={`${i}-${j}`} from={new THREE.Vector3(...positions[i])} to={new THREE.Vector3(...positions[j])} opacity={0.7} />
      ))}
    </>
  );
}

/** c4 — Frontend: a component tree, root to children to leaves. */
export function FrontendTreeScene() {
  const group = useRef<THREE.Group>(null);
  const root = useRef<THREE.Mesh>(null);
  const children = useRef<THREE.Mesh[]>([]);
  const stdGold = useStdMaterial(GOLD, { metalness: 0.55, roughness: 0.25 });
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.35 });
  const childCount = 5;
  const layout = useMemo(() => {
    const rootPos = new THREE.Vector3(0, 1.5, 0);
    return Array.from({ length: childCount }, (_, i) => {
      const spread = (i - (childCount - 1) / 2) * 1.15;
      const childPos = new THREE.Vector3(spread, -1.1, Math.sin(i * 1.3) * 0.4);
      const leafPos = new THREE.Vector3(spread, -1.9, childPos.z);
      return { rootPos, childPos, leafPos, spread };
    });
  }, []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.22;
    if (root.current) root.current.rotation.y = t * 0.5;
    children.current.forEach((c, i) => {
      if (!c) return;
      c.rotation.y = t * 0.4 + i;
      c.position.x = layout[i].spread + Math.sin(t * 0.7 + i) * 0.06;
    });
  });
  return (
    <SceneIntro>
      <group ref={group} rotation={[0.2, 0, 0]} position={[0, 0.3, 0]} scale={0.72}>
        <mesh ref={root} position={layout[0].rootPos.toArray()} material={stdGold}>
          <octahedronGeometry args={[0.34, 0]} />
        </mesh>
        <GlowSprite color={GOLD} scale={1.3} position={layout[0].rootPos.toArray() as [number, number, number]} />
        {layout.map((l, i) => (
          <group key={i}>
            <mesh ref={(el) => { if (el) children.current[i] = el; }} position={l.childPos.toArray()} material={stdRoyal}>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
            </mesh>
            <Segment from={l.rootPos} to={l.childPos} />
            <mesh position={l.leafPos.toArray()} material={stdGold}>
              <sphereGeometry args={[0.13, 14, 14]} />
            </mesh>
            <Segment from={l.childPos} to={l.leafPos} />
          </group>
        ))}
      </group>
      <DustField count={45} spread={4.5} color={ROYAL_LIGHT} size={0.05} />
    </SceneIntro>
  );
}

/** c5 — Backend: a rotating layered stack of slabs. */
export function BackendStackScene() {
  const group = useRef<THREE.Group>(null);
  const boxes = useRef<THREE.Mesh[]>([]);
  const layers = 5;
  const stdRoyal = useStdMaterial(ROYAL, { metalness: 0.4, roughness: 0.35 });
  const stdGold = useStdMaterial(GOLD, { metalness: 0.4, roughness: 0.35 });
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.35;
    boxes.current.forEach((b, i) => {
      if (!b) return;
      b.position.y = i * 0.5 - 1.0 + Math.sin(t * 1.2 + i) * 0.04;
    });
  });
  return (
    <SceneIntro>
      <group ref={group} rotation={[0.35, 0, 0]}>
        {Array.from({ length: layers }, (_, i) => (
          <mesh key={i} ref={(el) => { if (el) boxes.current[i] = el; }} position={[0, i * 0.5 - 1.0, 0]} material={i % 2 === 0 ? stdRoyal : stdGold}>
            <boxGeometry args={[2.2 - i * 0.18, 0.32, 2.2 - i * 0.18]} />
          </mesh>
        ))}
      </group>
      <DustField count={45} spread={4} color={ROYAL_LIGHT} size={0.05} />
    </SceneIntro>
  );
}

/** c6 — How to choose: a weighing scale, balancing trade-offs. */
export function ChooseScaleScene() {
  const outer = useRef<THREE.Group>(null);
  const beam = useRef<THREE.Group>(null);
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.35 });
  const stdRoyal30 = useStdMaterial(ROYAL, { roughness: 0.3 });
  const stdGold = useStdMaterial(GOLD, { metalness: 0.55, roughness: 0.25 });
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outer.current) outer.current.rotation.y = t * 0.22;
    if (beam.current) beam.current.rotation.z = Math.sin(t * 0.8) * 0.16;
  });
  const Pan = ({ x }: { x: number }) => (
    <group position={[x, 0, 0]}>
      <Segment from={new THREE.Vector3(0, 0, 0)} to={new THREE.Vector3(0, -0.6, 0)} opacity={0.55} />
      <mesh position={[0, -0.62, 0]} material={stdRoyal30}>
        <cylinderGeometry args={[0.4, 0.32, 0.08, 24]} />
      </mesh>
      <mesh position={[0, -0.42, 0]} material={stdGold}>
        <sphereGeometry args={[0.16, 16, 16]} />
      </mesh>
    </group>
  );
  return (
    <SceneIntro>
      <group ref={outer} rotation={[0.1, 0, 0]}>
        <mesh position={[0, -0.2, 0]} material={stdRoyal}>
          <cylinderGeometry args={[0.05, 0.07, 2.4, 16]} />
        </mesh>
        <mesh position={[0, -1.38, 0]} material={stdRoyal}>
          <cylinderGeometry args={[0.55, 0.55, 0.08, 24]} />
        </mesh>
        <group ref={beam} position={[0, 0.9, 0]}>
          <mesh material={stdGold}>
            <boxGeometry args={[2.6, 0.08, 0.08]} />
          </mesh>
          <mesh material={stdGold}>
            <sphereGeometry args={[0.09, 16, 16]} />
          </mesh>
          <GlowSprite color={GOLD} scale={0.7} />
          <Pan x={-1.2} />
          <Pan x={1.2} />
        </group>
      </group>
      <DustField count={40} spread={4.2} color={GOLD} size={0.05} />
    </SceneIntro>
  );
}

/** c7 — Database: stacked, rotating disks. */
export function DatabaseDisksScene() {
  const group = useRef<THREE.Group>(null);
  const disks = useRef<THREE.Mesh[]>([]);
  const count = 4;
  const stdGold = useStdMaterial(GOLD, { metalness: 0.5, roughness: 0.3 });
  const stdRoyal = useStdMaterial(ROYAL, { metalness: 0.5, roughness: 0.3 });
  const wireGold = useWireMaterial(GOLD);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.3;
    disks.current.forEach((d, i) => {
      if (d) d.rotation.y = t * (0.5 + i * 0.1);
    });
  });
  return (
    <SceneIntro>
      <group ref={group} rotation={[0.3, 0, 0]}>
        {Array.from({ length: count }, (_, i) => (
          <group key={i}>
            <mesh ref={(el) => { if (el) disks.current[i] = el; }} position={[0, i * 0.5 - 0.75, 0]} material={i === 0 ? stdGold : stdRoyal}>
              <cylinderGeometry args={[1.15, 1.15, 0.28, 40]} />
            </mesh>
            <mesh position={[0, i * 0.5 - 0.75 + 0.15, 0]} rotation={[Math.PI / 2, 0, 0]} material={wireGold}>
              <torusGeometry args={[1.15, 0.02, 8, 60]} />
            </mesh>
          </group>
        ))}
      </group>
      <DustField count={40} spread={4} color={GOLD} size={0.05} />
    </SceneIntro>
  );
}

/** c8 — Architecture: a connected node graph (service boundaries). */
export function ArchitectureGraphScene() {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Mesh[]>([]);
  const stdGold = useStdMaterial(GOLD, { metalness: 0.5, roughness: 0.3 });
  const stdRoyal = useStdMaterial(ROYAL, { metalness: 0.5, roughness: 0.3 });
  const positions: [number, number, number][] = [
    [0, 0, 0],
    [1.8, 1.0, 0.3],
    [-1.8, 1.0, -0.3],
    [1.6, -1.2, 0.5],
    [-1.6, -1.2, -0.5],
    [0, 1.9, -0.8],
  ];
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.3;
    nodes.current.forEach((n, i) => {
      if (n) n.position.y = positions[i][1] + Math.sin(t * 1.1 + i) * 0.12;
    });
  });
  return (
    <SceneIntro>
      <group ref={group}>
        {positions.map((p, i) => (
          <mesh key={i} ref={(el) => { if (el) nodes.current[i] = el; }} position={p} material={i === 0 ? stdGold : stdRoyal}>
            <octahedronGeometry args={[i === 0 ? 0.42 : 0.28, 0]} />
          </mesh>
        ))}
        <GlowSprite color={GOLD} scale={1.4} position={positions[0]} />
        {positions.slice(1).map((p, i) => (
          <Segment key={i} from={new THREE.Vector3(...positions[0])} to={new THREE.Vector3(...p)} opacity={0.5} />
        ))}
      </group>
      <DustField count={45} spread={4.5} color={ROYAL_LIGHT} size={0.05} />
    </SceneIntro>
  );
}

/** c9 — Build & Testing: an interlocking torus knot with an orbiting check ring. */
export function TestingKnotScene() {
  const knot = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const stdRoyal = useStdMaterial(ROYAL, { metalness: 0.45, roughness: 0.3 });
  const wireGold = useWireMaterial(GOLD);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (knot.current) {
      knot.current.rotation.x = t * 0.4;
      knot.current.rotation.y = t * 0.55;
    }
    if (ring.current) ring.current.rotation.z = t * 0.25;
  });
  return (
    <SceneIntro>
      <group>
        <mesh ref={knot} material={stdRoyal}>
          <torusKnotGeometry args={[0.95, 0.28, 128, 16]} />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2.3, 0, 0]} material={wireGold}>
          <torusGeometry args={[1.9, 0.02, 8, 80]} />
        </mesh>
      </group>
      <DustField count={45} spread={4.5} color={GOLD} size={0.05} />
    </SceneIntro>
  );
}

/** c10 — DevOps: a pipeline ring orbited by six release nodes. */
export function DevOpsPipelineScene() {
  const group = useRef<THREE.Group>(null);
  const pipeline = useRef<THREE.Mesh>(null);
  const nodes = useRef<THREE.Mesh[]>([]);
  const stdRoyal = useStdMaterial(ROYAL, { metalness: 0.4, roughness: 0.35 });
  const stdGold = useStdMaterial(GOLD, { metalness: 0.6, roughness: 0.25 });
  const nCount = 6;
  const angles = useMemo(() => Array.from({ length: nCount }, (_, i) => (i / nCount) * Math.PI * 2), []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.3;
    if (pipeline.current) pipeline.current.rotation.z = t * 0.15;
    nodes.current.forEach((s, i) => {
      if (!s) return;
      const a = angles[i] + t * 0.6;
      s.position.set(Math.cos(a) * 1.3, 0, Math.sin(a) * 1.3);
    });
  });
  return (
    <SceneIntro>
      <group ref={group} rotation={[0.55, 0, 0]}>
        <mesh ref={pipeline} rotation={[Math.PI / 2, 0, 0]} material={stdRoyal}>
          <torusGeometry args={[1.3, 0.16, 24, 100]} />
        </mesh>
        {angles.map((_, i) => (
          <group key={i}>
            <mesh ref={(el) => { if (el) nodes.current[i] = el; }} material={stdGold}>
              <sphereGeometry args={[0.2, 20, 20]} />
            </mesh>
          </group>
        ))}
      </group>
      <DustField count={40} spread={4} color={ROYAL_LIGHT} size={0.05} />
    </SceneIntro>
  );
}

/** c11 — Closing: a rising cone (growth) with two orbiting rings. */
export function ClosingConeScene() {
  const group = useRef<THREE.Group>(null);
  const cone = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const stdGold = useStdMaterial(GOLD, { metalness: 0.5, roughness: 0.3 });
  const wireRoyalLight = useWireMaterial(ROYAL_LIGHT);
  const wireGold = useWireMaterial(GOLD);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.3;
    if (cone.current) cone.current.position.y = Math.sin(t * 0.9) * 0.15;
    if (ring1.current) ring1.current.rotation.z = t * 0.3;
    if (ring2.current) ring2.current.rotation.z = -t * 0.2;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh ref={cone} material={stdGold}>
          <coneGeometry args={[0.95, 1.9, 6]} />
        </mesh>
        <GlowSprite color={GOLD} scale={1.6} position={[0, 0.2, 0]} />
        <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} material={wireRoyalLight}>
          <torusGeometry args={[1.4, 0.03, 8, 60]} />
        </mesh>
        <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.7, 0]} material={wireGold}>
          <torusGeometry args={[1.7, 0.025, 8, 60]} />
        </mesh>
      </group>
      <DustField count={45} spread={4.5} color={GOLD} size={0.05} />
    </SceneIntro>
  );
}

/** c12 — Q&A: an orbiting core with three loose, open arcs around it. */
export function QaOrbScene() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const arcs = useRef<THREE.Mesh[]>([]);
  const stdRoyal = useStdMaterial(ROYAL, { metalness: 0.4, roughness: 0.35 });
  const wireGold = useWireMaterial(GOLD);
  const offsets = [0, 1.2, 2.4];
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.25;
    if (core.current) core.current.rotation.y = -t * 0.3;
    arcs.current.forEach((a, i) => {
      if (!a) return;
      a.rotation.z = t * (0.3 + i * 0.12) + offsets[i];
      a.rotation.x = 0.3;
    });
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh ref={core} material={stdRoyal}>
          <sphereGeometry args={[0.85, 32, 32]} />
        </mesh>
        <GlowSprite color={ROYAL_LIGHT} scale={2.6} />
        {offsets.map((_, i) => (
          <mesh key={i} ref={(el) => { if (el) arcs.current[i] = el; }} material={wireGold}>
            <torusGeometry args={[1.5 + i * 0.28, 0.025, 8, 64, Math.PI * 1.4]} />
          </mesh>
        ))}
      </group>
      <DustField count={45} spread={4.5} color={GOLD} size={0.05} />
    </SceneIntro>
  );
}

export { Segment };
