'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { DustField, GlowSprite, SceneIntro, useStdMaterial, useWireMaterial } from './primitives';
import { GOLD, ROYAL } from './palette';
import { Segment } from './moduleScenes';

const dust = { count: 30, spread: 4.2, color: GOLD, size: 0.045 } as const;

/** Relational databases — a strict grid of cells (rows, columns, a schema). */
export function RelationalTypeScene() {
  const group = useRef<THREE.Group>(null);
  const cells = useRef<THREE.Mesh[]>([]);
  const cols = 4, rows = 3;
  const stdGold = useStdMaterial(GOLD, { roughness: 0.4 });
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.4 });
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.22;
    cells.current.forEach((cb, i) => {
      if (cb) cb.position.z = Math.sin(t * 0.7 + i * 0.2) * 0.04;
    });
  });
  return (
    <SceneIntro>
      <group ref={group} rotation={[0.3, 0, 0]}>
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const i = r * cols + c;
            return (
              <mesh
                key={i}
                ref={(el) => { if (el) cells.current[i] = el; }}
                position={[(c - (cols - 1) / 2) * 0.4, (r - (rows - 1) / 2) * 0.4, 0]}
                material={r === 0 ? stdGold : stdRoyal}
              >
                <boxGeometry args={[0.32, 0.32, 0.06]} />
              </mesh>
            );
          }),
        )}
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

/** NoSQL & distributed — a loose, shape-varied cluster of nodes (schema-less, scattered). */
export function NoSqlTypeScene() {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Mesh[]>([]);
  const nodeCount = 9;
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.4 });
  const stdGold = useStdMaterial(GOLD, { roughness: 0.4 });
  const meta = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, i) => {
        const angle = (i / nodeCount) * Math.PI * 2 + (i % 2) * 0.3;
        const r = 0.55 + (i % 3) * 0.2;
        return { shape: i % 3, angle, r, pos: new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r * 0.75, Math.sin(angle * 1.3) * 0.35) };
      }),
    [],
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.2;
    nodes.current.forEach((n, i) => {
      if (!n) return;
      n.rotation.y = t * 0.4 + i;
      n.position.z = Math.sin(meta[i].angle * 1.3 + t * 0.6) * 0.35;
    });
  });
  return (
    <SceneIntro>
      <group ref={group}>
        {meta.map((m, i) => (
          <mesh key={i} ref={(el) => { if (el) nodes.current[i] = el; }} position={m.pos.toArray()} material={i % 2 === 0 ? stdRoyal : stdGold}>
            {m.shape === 0 && <sphereGeometry args={[0.14, 16, 16]} />}
            {m.shape === 1 && <octahedronGeometry args={[0.16, 0]} />}
            {m.shape === 2 && <boxGeometry args={[0.22, 0.22, 0.22]} />}
          </mesh>
        ))}
        {meta.map((m, i) => (
          <Segment key={i} from={m.pos} to={meta[(i + 2) % meta.length].pos} opacity={0.28} />
        ))}
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

/** Operating systems — a hub-and-teeth ring (the kernel, orchestrating everything above it). */
export function OsTypeScene() {
  const group = useRef<THREE.Group>(null);
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.35 });
  const stdGold = useStdMaterial(GOLD, { metalness: 0.5, roughness: 0.3 });
  const coreMat = useStdMaterial(GOLD, { metalness: 0.6, roughness: 0.25 });
  const toothCount = 10;
  const teeth = useMemo(() => Array.from({ length: toothCount }, (_, i) => (i / toothCount) * Math.PI * 2), []);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = state.clock.elapsedTime * 0.3;
      group.current.rotation.x = 0.15;
    }
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh material={stdRoyal}>
          <torusGeometry args={[0.45, 0.14, 16, 32]} />
        </mesh>
        {teeth.map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 0.62, Math.sin(angle) * 0.62, 0]} material={stdGold}>
            <boxGeometry args={[0.14, 0.14, 0.14]} />
          </mesh>
        ))}
        <mesh material={coreMat}>
          <sphereGeometry args={[0.2, 20, 20]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.9} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

/** Cloud providers — soft cloud-puff spheres with two provider badges. */
export function CloudTypeScene() {
  const group = useRef<THREE.Group>(null);
  const badge1 = useRef<THREE.Mesh>(null);
  const badge2 = useRef<THREE.Mesh>(null);
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.4 });
  const badgeMat = useStdMaterial(GOLD, { metalness: 0.6, roughness: 0.25 });
  const puffs: { pos: [number, number, number]; r: number }[] = [
    { pos: [-0.5, 0, 0], r: 0.42 },
    { pos: [0.3, 0.15, 0.1], r: 0.5 },
    { pos: [0.85, -0.05, 0], r: 0.36 },
    { pos: [-0.05, -0.2, 0.2], r: 0.4 },
  ];
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.25) * 0.2;
    if (badge1.current) badge1.current.position.y = 0.5 + Math.sin(t * 0.9) * 0.04;
    if (badge2.current) badge2.current.position.y = 0.45 + Math.sin(t * 0.9 + 1) * 0.04;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        {puffs.map((p, i) => (
          <mesh key={i} position={p.pos} material={stdRoyal}>
            <sphereGeometry args={[p.r, 20, 20]} />
          </mesh>
        ))}
        <mesh ref={badge1} position={[-0.5, 0.5, 0.3]} material={badgeMat}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
        </mesh>
        <mesh ref={badge2} position={[0.8, 0.45, 0.3]} material={badgeMat}>
          <octahedronGeometry args={[0.13, 0]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.5} position={[-0.5, 0.5, 0.3]} />
        <GlowSprite color={GOLD} scale={0.5} position={[0.8, 0.45, 0.3]} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

/** Orchestration — a hub with six containers scheduled in orbit. */
export function OrchestrationTypeScene() {
  const group = useRef<THREE.Group>(null);
  const hub = useRef<THREE.Mesh>(null);
  const containers = useRef<THREE.Mesh[]>([]);
  const hubMat = useStdMaterial(GOLD, { metalness: 0.55, roughness: 0.25 });
  const containerMat = useStdMaterial(ROYAL, { roughness: 0.4 });
  const containerCount = 6;
  const angles = useMemo(() => Array.from({ length: containerCount }, (_, i) => (i / containerCount) * Math.PI * 2), []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.2;
    if (hub.current) hub.current.rotation.y = t * 0.5;
    containers.current.forEach((c, i) => {
      if (!c) return;
      const a = angles[i] + t * 0.35;
      c.position.set(Math.cos(a) * 0.9, Math.sin(a) * 0.6, Math.sin(a * 1.4) * 0.2);
      c.rotation.y = t * 0.6 + i;
    });
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh ref={hub} material={hubMat}>
          <octahedronGeometry args={[0.3, 0]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.9} />
        {angles.map((angle, i) => (
          <group key={i}>
            <mesh ref={(el) => { if (el) containers.current[i] = el; }} material={containerMat}>
              <boxGeometry args={[0.34, 0.2, 0.2]} />
            </mesh>
            <Segment from={new THREE.Vector3(0, 0, 0)} to={new THREE.Vector3(Math.cos(angle) * 0.9, Math.sin(angle) * 0.55, 0)} opacity={0.3} />
          </group>
        ))}
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

/** Application servers — a rack of slotted boxes with status LEDs. */
export function AppServerTypeScene() {
  const group = useRef<THREE.Group>(null);
  const rackWidth = 0.9, slotHeight = 0.16, slots = 5;
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.4 });
  const stdGold = useStdMaterial(GOLD, { roughness: 0.4 });
  const ledMat = useStdMaterial(GOLD, { metalness: 0.6 });
  useFrame((state) => {
    if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.18;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        {Array.from({ length: slots }, (_, i) => {
          const y = (i - (slots - 1) / 2) * slotHeight * 1.15;
          return (
            <group key={i}>
              <mesh position={[0, y, 0]} material={i % 2 === 0 ? stdRoyal : stdGold}>
                <boxGeometry args={[rackWidth, slotHeight * 0.8, 0.5]} />
              </mesh>
              <mesh position={[rackWidth / 2 - 0.06, y, 0.26]} material={ledMat}>
                <sphereGeometry args={[0.025, 8, 8]} />
              </mesh>
              {i === 0 && <GlowSprite color={GOLD} scale={0.3} position={[rackWidth / 2 - 0.06, y, 0.26]} />}
            </group>
          );
        })}
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export const dbTypeSceneRegistry: Record<string, React.ComponentType> = {
  relational: RelationalTypeScene,
  nosql: NoSqlTypeScene,
};

export const infraTypeSceneRegistry: Record<string, React.ComponentType> = {
  os: OsTypeScene,
  cloud: CloudTypeScene,
  orchestration: OrchestrationTypeScene,
  appserver: AppServerTypeScene,
};
