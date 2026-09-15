'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { DustField, SceneIntro, useStdMaterial } from './primitives';
import { GOLD, ROYAL } from './palette';

/** A grid of tiles sized to the comparison table it sits beside — one tile
 * per cell, alternating color, each gently bobbing on its own phase. */
export function ComparisonScene({ rowCount, colCount }: { rowCount: number; colCount: number }) {
  const group = useRef<THREE.Group>(null);
  const cubes = useRef<THREE.Mesh[]>([]);
  const stdRoyal = useStdMaterial(ROYAL, { roughness: 0.4 });
  const stdGold = useStdMaterial(GOLD, { roughness: 0.4 });
  const spacingX = 0.42, spacingY = 0.32;
  const cells = useMemo(() => {
    const out: { r: number; c: number }[] = [];
    for (let r = 0; r < rowCount; r++) for (let c = 0; c < colCount; c++) out.push({ r, c });
    return out;
  }, [rowCount, colCount]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.2;
    cubes.current.forEach((cb, i) => {
      if (cb) cb.position.z = Math.sin(t * 0.8 + i * 0.3) * 0.06;
    });
  });
  return (
    <SceneIntro>
      <group ref={group} rotation={[0.35, 0, 0]}>
        {cells.map(({ r, c }, i) => (
          <mesh
            key={i}
            ref={(el) => { if (el) cubes.current[i] = el; }}
            position={[(c - (colCount - 1) / 2) * spacingX, (r - (rowCount - 1) / 2) * spacingY, 0]}
            material={(r + c) % 2 === 0 ? stdRoyal : stdGold}
          >
            <boxGeometry args={[0.32, 0.22, 0.06]} />
          </mesh>
        ))}
      </group>
      <DustField count={30} spread={4.2} color={GOLD} size={0.045} />
    </SceneIntro>
  );
}
