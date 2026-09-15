'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { DustField, GlowSprite, HumanFigure, SceneIntro, useStdMaterial, useWireMaterial } from './primitives';
import { GOLD, ROYAL, ROYAL_LIGHT } from './palette';
import { Segment } from './moduleScenes';

const dust = { count: 28, spread: 4, color: GOLD, size: 0.045 } as const;

/* ---------------------------------------------------------
   Module 1 — Requirement Gathering techniques
--------------------------------------------------------- */

export function InterviewScene() {
  const group = useRef<THREE.Group>(null);
  const p1 = useRef<THREE.Group>(null);
  const p2 = useRef<THREE.Group>(null);
  const doc = useRef<THREE.Mesh>(null);
  const docMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, side: THREE.DoubleSide }), []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    if (p1.current) p1.current.rotation.y = 0.35 + Math.sin(t * 0.6) * 0.05;
    if (p2.current) p2.current.rotation.y = -0.35 - Math.sin(t * 0.6 + 1) * 0.05;
    if (doc.current) doc.current.position.y = 0.3 + Math.sin(t * 1.2) * 0.03;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <group ref={p1}>
          <HumanFigure color={ROYAL} position={[-0.85, -0.1, 0]} rotation={[0, 0.35, 0]} />
        </group>
        <group ref={p2}>
          <HumanFigure color={GOLD} position={[0.85, -0.1, 0]} rotation={[0, -0.35, 0]} />
        </group>
        <mesh ref={doc} position={[0, 0.3, 0.05]} material={docMat}>
          <planeGeometry args={[0.34, 0.44]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.65} position={[0, 0.3, 0.05]} />
        <Segment from={new THREE.Vector3(-0.6, 0.1, 0)} to={new THREE.Vector3(0.6, 0.1, 0)} opacity={0.45} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function ObservationScene() {
  const group = useRef<THREE.Group>(null);
  const pupil = useRef<THREE.Mesh>(null);
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.3 });
  const stdGold = useStdMaterial(GOLD, { metalness: 0.6, roughness: 0.2 });
  const deskMat = useStdMaterial(GOLD, { roughness: 0.4 });
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.25) * 0.15;
    if (pupil.current) pupil.current.position.x = -0.05 + Math.sin(t * 0.8) * 0.03;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <HumanFigure color={ROYAL} position={[-0.6, -0.15, 0]} />
        <mesh position={[0.7, -0.2, 0]} material={deskMat}>
          <boxGeometry args={[0.5, 0.32, 0.34]} />
        </mesh>
        <mesh position={[-0.05, 0.6, 0]} material={stdRoyal}>
          <torusGeometry args={[0.22, 0.045, 16, 40]} />
        </mesh>
        <mesh ref={pupil} position={[-0.05, 0.6, 0.06]} material={stdGold}>
          <sphereGeometry args={[0.09, 16, 16]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.55} position={[-0.05, 0.6, 0.06]} />
        <Segment from={new THREE.Vector3(-0.05, 0.42, 0)} to={new THREE.Vector3(0.6, 0.05, 0)} opacity={0.4} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function DocStudyScene() {
  const group = useRef<THREE.Group>(null);
  const royalMat = useStdMaterial(ROYAL, { roughness: 0.5 });
  const goldMat = useStdMaterial(GOLD, { roughness: 0.5 });
  const colors = [ROYAL, GOLD, ROYAL, GOLD, ROYAL];
  const mats = [royalMat, goldMat, royalMat, goldMat, royalMat];
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.25;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        {colors.map((_, i) => (
          <mesh
            key={i}
            position={[i % 2 ? 0.03 : -0.03, i * 0.09 - 0.2, i % 2 ? -0.02 : 0.02]}
            rotation={[0, i % 2 ? 0.08 : -0.08, 0]}
            material={mats[i]}
          >
            <boxGeometry args={[0.9 - i * 0.04, 0.06, 0.65 - i * 0.03]} />
          </mesh>
        ))}
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function PrototypeScene() {
  const group = useRef<THREE.Group>(null);
  const cursor = useRef<THREE.Mesh>(null);
  const wireGold = useWireMaterial(GOLD);
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.4, transparent: true, opacity: 0.9 });
  const stdGold = useStdMaterial(GOLD, { roughness: 0.4, transparent: true, opacity: 0.9 });
  const cursorMat = useStdMaterial(GOLD, { metalness: 0.6 });
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.3) * 0.2;
    if (cursor.current) {
      cursor.current.position.x = 0.3 + Math.sin(t * 0.9) * 0.15;
      cursor.current.position.y = -0.2 + Math.cos(t * 0.7) * 0.1;
    }
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh material={wireGold}>
          <boxGeometry args={[1.1, 0.75, 0.05]} />
        </mesh>
        <mesh position={[0, 0.25, 0.03]} material={stdRoyal}>
          <boxGeometry args={[0.9, 0.14, 0.02]} />
        </mesh>
        <mesh position={[-0.25, 0, 0.03]} material={stdGold}>
          <boxGeometry args={[0.5, 0.14, 0.02]} />
        </mesh>
        <mesh ref={cursor} rotation={[0, 0, -Math.PI / 2.2]} position={[0.3, -0.2, 0.06]} material={cursorMat}>
          <coneGeometry args={[0.05, 0.14, 3]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.4} position={[0.3, -0.2, 0.06]} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function WorkshopScene() {
  const group = useRef<THREE.Group>(null);
  const tableMat = useStdMaterial(GOLD, { roughness: 0.4 });
  const colors = [ROYAL, GOLD, ROYAL];
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh material={tableMat}>
          <cylinderGeometry args={[0.4, 0.4, 0.06, 24]} />
        </mesh>
        {colors.map((c, i) => {
          const angle = (i / 3) * Math.PI * 2;
          return (
            <HumanFigure
              key={i}
              color={c}
              position={[Math.cos(angle) * 0.75, -0.1, Math.sin(angle) * 0.75]}
              rotation={[0, -angle + Math.PI, 0]}
            />
          );
        })}
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

/* ---------------------------------------------------------
   Module 2 — How to Choose
--------------------------------------------------------- */

export function HireScene() {
  const group = useRef<THREE.Group>(null);
  const handGroup = useRef<THREE.Group>(null);
  const stdGold = useStdMaterial(GOLD, { metalness: 0.55, roughness: 0.25 });
  const handMat = useStdMaterial(GOLD);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    if (handGroup.current) handGroup.current.rotation.z = -t * 0.6;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <HumanFigure color={ROYAL} position={[-0.35, -0.1, 0]} />
        <mesh position={[0.5, 0.15, 0]} material={stdGold}>
          <torusGeometry args={[0.28, 0.035, 16, 40]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.75} position={[0.5, 0.15, 0]} />
        <group ref={handGroup} position={[0.5, 0.15, 0.01]}>
          <mesh position={[0, 0.09, 0]} material={handMat}>
            <boxGeometry args={[0.02, 0.18, 0.02]} />
          </mesh>
        </group>
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function TeamSkillScene() {
  const group = useRef<THREE.Group>(null);
  const star = useRef<THREE.Mesh>(null);
  const stdGold = useStdMaterial(GOLD, { metalness: 0.6, roughness: 0.2 });
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.3) * 0.2;
    if (star.current) {
      star.current.rotation.y = t * 0.8;
      star.current.position.y = 0.78 + Math.sin(t * 1.1) * 0.05;
    }
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <HumanFigure color={ROYAL} position={[0, -0.15, 0]} />
        <mesh ref={star} position={[0, 0.78, 0]} material={stdGold}>
          <octahedronGeometry args={[0.18, 0]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.85} position={[0, 0.78, 0]} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function EcosystemScene() {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Mesh[]>([]);
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.4 });
  const stdGold = useStdMaterial(GOLD, { roughness: 0.4 });
  const nodeCount = 6;
  const positions = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, i) => {
        const angle = (i / nodeCount) * Math.PI * 2;
        const r = 0.55 + (i % 2) * 0.15;
        return new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r * 0.6, Math.sin(angle * 0.6) * 0.3);
      }),
    [],
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.22;
    nodes.current.forEach((n, i) => {
      if (n) n.rotation.y = t * 0.5 + i;
    });
  });
  return (
    <SceneIntro>
      <group ref={group}>
        {positions.map((p, i) => (
          <mesh key={i} ref={(el) => { if (el) nodes.current[i] = el; }} position={p.toArray()} material={i % 2 === 0 ? stdRoyal : stdGold}>
            <boxGeometry args={[0.18, 0.18, 0.18]} />
          </mesh>
        ))}
        {positions.map((p, i) => (
          <Segment key={i} from={p} to={positions[(i + 1) % positions.length]} opacity={0.35} />
        ))}
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function OperateScene() {
  const group = useRef<THREE.Group>(null);
  const needleGroup = useRef<THREE.Group>(null);
  const wireGold = useWireMaterial(GOLD);
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.35 });
  const stdGold = useStdMaterial(GOLD, { metalness: 0.6 });
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.25) * 0.1;
    if (needleGroup.current) needleGroup.current.rotation.z = -0.8 + Math.sin(t * 0.6) * 0.6;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh rotation={[0, 0, Math.PI * 0.75]} material={wireGold}>
          <torusGeometry args={[0.5, 0.05, 16, 48, Math.PI * 1.5]} />
        </mesh>
        <group ref={needleGroup}>
          <mesh position={[0, 0.2, 0]} material={stdRoyal}>
            <coneGeometry args={[0.04, 0.42, 8]} />
          </mesh>
        </group>
        <mesh material={stdGold}>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.55} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

/* ---------------------------------------------------------
   Module 4 — Architecture shapes
--------------------------------------------------------- */

export function MonolithScene() {
  const group = useRef<THREE.Group>(null);
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.35 });
  const wireGold = useWireMaterial(GOLD);
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.25;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh material={stdRoyal}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
        </mesh>
        <mesh material={wireGold}>
          <boxGeometry args={[1.36, 1.36, 1.36]} />
        </mesh>
        <GlowSprite color={GOLD} scale={1.0} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function ModularScene() {
  const group = useRef<THREE.Group>(null);
  const wireGold = useWireMaterial(GOLD);
  const royalMat = useStdMaterial(ROYAL, { roughness: 0.4 });
  const goldMat = useStdMaterial(GOLD, { roughness: 0.4 });
  const colors = [ROYAL, GOLD, ROYAL];
  const mats = [royalMat, goldMat, royalMat];
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.25;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh material={wireGold}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
        </mesh>
        {colors.map((_, i) => (
          <mesh key={i} position={[0, -0.45 + i * 0.45, 0]} material={mats[i]}>
            <boxGeometry args={[1.2, 0.34, 1.2]} />
          </mesh>
        ))}
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function MicroservicesScene() {
  const group = useRef<THREE.Group>(null);
  const boxes = useRef<THREE.Mesh[]>([]);
  const positions: [number, number, number][] = [
    [-0.7, 0.5, 0],
    [0.7, 0.5, 0.2],
    [-0.7, -0.5, 0.1],
    [0.7, -0.5, 0],
    [0, 0, 0.7],
    [0, 0, -0.7],
  ];
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.4 });
  const stdGold = useStdMaterial(GOLD, { roughness: 0.4 });
  const pairs: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3], [4, 0], [4, 1], [5, 2], [5, 3]];
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.22;
    boxes.current.forEach((b, i) => {
      if (b) b.rotation.y = t * 0.4 + i;
    });
  });
  return (
    <SceneIntro>
      <group ref={group}>
        {positions.map((p, i) => (
          <mesh key={i} ref={(el) => { if (el) boxes.current[i] = el; }} position={p} material={i % 2 === 0 ? stdRoyal : stdGold}>
            <boxGeometry args={[0.35, 0.35, 0.35]} />
          </mesh>
        ))}
        {pairs.map(([i, j], k) => (
          <Segment key={k} from={new THREE.Vector3(...positions[i])} to={new THREE.Vector3(...positions[j])} opacity={0.3} />
        ))}
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function HybridScene() {
  const group = useRef<THREE.Group>(null);
  const central = useRef<THREE.Mesh>(null);
  const sats = useRef<THREE.Mesh[]>([]);
  const stdGold = useStdMaterial(GOLD, { metalness: 0.5, roughness: 0.3 });
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.4 });
  const satCount = 5;
  const positions = useMemo(
    () =>
      Array.from({ length: satCount }, (_, i) => {
        const angle = (i / satCount) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * 0.95, Math.sin(angle) * 0.6, Math.sin(angle * 0.8) * 0.4);
      }),
    [],
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.22;
    if (central.current) central.current.rotation.y = t * 0.4;
    sats.current.forEach((s, i) => {
      if (s) s.rotation.y = t * 0.5 + i;
    });
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh ref={central} material={stdGold}>
          <boxGeometry args={[0.55, 0.55, 0.55]} />
        </mesh>
        <GlowSprite color={GOLD} scale={1.1} />
        {positions.map((p, i) => (
          <group key={i}>
            <mesh ref={(el) => { if (el) sats.current[i] = el; }} position={p.toArray()} material={stdRoyal}>
              <boxGeometry args={[0.26, 0.26, 0.26]} />
            </mesh>
            <Segment from={new THREE.Vector3(0, 0, 0)} to={p} opacity={0.4} />
          </group>
        ))}
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

/* ---------------------------------------------------------
   Module 5 — Build & Testing
--------------------------------------------------------- */

export function UnitScene() {
  const group = useRef<THREE.Group>(null);
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.35 });
  const wireGold = useWireMaterial(GOLD);
  const checkMat = useStdMaterial(GOLD, { metalness: 0.6 });
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh material={stdRoyal}>
          <boxGeometry args={[0.55, 0.55, 0.55]} />
        </mesh>
        <mesh material={wireGold}>
          <torusGeometry args={[0.5, 0.03, 12, 40]} />
        </mesh>
        <mesh position={[-0.05, 0.85, 0]} rotation={[0, 0, Math.PI / 4]} material={checkMat}>
          <boxGeometry args={[0.05, 0.22, 0.05]} />
        </mesh>
        <mesh position={[0.08, 0.9, 0]} rotation={[0, 0, -Math.PI / 4]} material={checkMat}>
          <boxGeometry args={[0.05, 0.34, 0.05]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.55} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function IntegrationScene() {
  const group = useRef<THREE.Group>(null);
  const linkSphere = useRef<THREE.Mesh>(null);
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.35 });
  const stdGold = useStdMaterial(GOLD, { roughness: 0.35 });
  const linkMat = useStdMaterial(GOLD, { metalness: 0.6 });
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.25;
    if (linkSphere.current) linkSphere.current.position.x = Math.sin(t * 1.2) * 0.3;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh position={[-0.55, 0, 0]} material={stdRoyal}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
        </mesh>
        <mesh position={[0.55, 0, 0]} material={stdGold}>
          <cylinderGeometry args={[0.32, 0.32, 0.5, 24]} />
        </mesh>
        <Segment from={new THREE.Vector3(-0.3, 0, 0)} to={new THREE.Vector3(0.3, 0, 0)} opacity={0.6} />
        <mesh ref={linkSphere} material={linkMat}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.55} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function ConcurrencyScene() {
  const group = useRef<THREE.Group>(null);
  const racers = useRef<THREE.Mesh[]>([]);
  const stdGold = useStdMaterial(GOLD, { metalness: 0.6, roughness: 0.25 });
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.4 });
  const racerCount = 6;
  const meta = useMemo(() => Array.from({ length: racerCount }, (_, i) => ({ angle: (i / racerCount) * Math.PI * 2, radius: 0.9, offset: i * 0.3 })), []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.2;
    racers.current.forEach((r, i) => {
      if (!r) return;
      const m = meta[i];
      const cycle = (t * 0.6 + m.offset) % 2;
      const rad = cycle < 1 ? m.radius * (1 - cycle) : m.radius * (cycle - 1);
      r.position.set(Math.cos(m.angle) * rad, Math.sin(m.angle) * rad * 0.6, 0);
    });
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh material={stdGold}>
          <sphereGeometry args={[0.2, 20, 20]} />
        </mesh>
        <GlowSprite color={GOLD} scale={1.0} />
        {meta.map((_, i) => (
          <mesh key={i} ref={(el) => { if (el) racers.current[i] = el; }} material={stdRoyal}>
            <sphereGeometry args={[0.1, 14, 14]} />
          </mesh>
        ))}
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

/* ---------------------------------------------------------
   Module 6 — DevOps
--------------------------------------------------------- */

export function CicdScene() {
  const group = useRef<THREE.Group>(null);
  const stages = useRef<THREE.Mesh[]>([]);
  const stageCount = 4;
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.4 });
  const stdGold = useStdMaterial(GOLD, { roughness: 0.4 });
  const arrowMat = useStdMaterial(GOLD, { metalness: 0.5 });
  const xs = useMemo(() => Array.from({ length: stageCount }, (_, i) => (i - (stageCount - 1) / 2) * 0.5), []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    stages.current.forEach((s, i) => {
      if (s) s.rotation.y = t * 0.4 + i;
    });
  });
  return (
    <SceneIntro>
      <group ref={group}>
        {xs.map((x, i) => (
          <group key={i}>
            <mesh ref={(el) => { if (el) stages.current[i] = el; }} position={[x, 0, 0]} material={i === stageCount - 1 ? stdGold : stdRoyal}>
              <boxGeometry args={[0.32, 0.32, 0.32]} />
            </mesh>
            {i > 0 && (
              <mesh position={[x - 0.25, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={arrowMat}>
                <coneGeometry args={[0.06, 0.16, 8]} />
              </mesh>
            )}
          </group>
        ))}
        <GlowSprite color={GOLD} scale={0.7} position={[xs[xs.length - 1], 0, 0]} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function MonitoringScene() {
  const group = useRef<THREE.Group>(null);
  const dot = useRef<THREE.Mesh>(null);
  const panelMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x0d1730, roughness: 0.5, side: THREE.DoubleSide }), []);
  const dotMat = useStdMaterial(GOLD, { metalness: 0.6 });
  const lineGeo = useMemo(() => {
    const w = 1.1, h = 0.28, segs = 10;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segs; i++) {
      const x = -w / 2 + (i / segs) * w;
      let y = 0;
      if (i === 4) y = h;
      else if (i === 5) y = -h * 0.6;
      pts.push(new THREE.Vector3(x, y, 0.02));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: GOLD }), []);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.25) * 0.12;
    if (dot.current) {
      const cycle = (t * 0.5) % 1;
      dot.current.position.x = -0.55 + cycle * 1.1;
      dot.current.position.y = Math.sin(cycle * Math.PI * 6) * 0.12;
    }
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh material={panelMat}>
          <planeGeometry args={[1.3, 0.8]} />
        </mesh>
        <primitive object={new THREE.Line(lineGeo, lineMat)} />
        <mesh ref={dot} material={dotMat}>
          <sphereGeometry args={[0.04, 12, 12]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.4} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export function RollbackScene() {
  const group = useRef<THREE.Group>(null);
  const arcMat = useStdMaterial(GOLD, { metalness: 0.5, roughness: 0.3 });
  const arrowMat = useStdMaterial(GOLD, { metalness: 0.55 });
  const checkpointMat = useStdMaterial(ROYAL, { roughness: 0.35 });
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.25;
  });
  return (
    <SceneIntro>
      <group ref={group}>
        <mesh rotation={[0, 0, Math.PI * 0.3]} material={arcMat}>
          <torusGeometry args={[0.55, 0.045, 16, 48, Math.PI * 1.4]} />
        </mesh>
        <mesh position={[0.5, 0.3, 0]} rotation={[0, 0, Math.PI * 1.15]} material={arrowMat}>
          <coneGeometry args={[0.1, 0.22, 12]} />
        </mesh>
        <mesh position={[-0.5, 0.25, 0]} material={checkpointMat}>
          <sphereGeometry args={[0.14, 16, 16]} />
        </mesh>
        <GlowSprite color={GOLD} scale={0.6} position={[0.5, 0.3, 0]} />
      </group>
      <DustField {...dust} />
    </SceneIntro>
  );
}

export const conceptSceneRegistry: Record<string, React.ComponentType> = {
  interview: InterviewScene,
  observation: ObservationScene,
  docstudy: DocStudyScene,
  prototype: PrototypeScene,
  workshop: WorkshopScene,
  hire: HireScene,
  teamskill: TeamSkillScene,
  ecosystem: EcosystemScene,
  operate: OperateScene,
  monolith: MonolithScene,
  modular: ModularScene,
  microservices: MicroservicesScene,
  hybrid: HybridScene,
  unit: UnitScene,
  integration: IntegrationScene,
  concurrency: ConcurrencyScene,
  cicd: CicdScene,
  monitoring: MonitoringScene,
  rollback: RollbackScene,
};
