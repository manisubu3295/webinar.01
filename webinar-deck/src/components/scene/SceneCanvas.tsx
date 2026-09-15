'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneLighting } from './primitives';
import { resolveScene } from './registry';

/**
 * The one shared Three.js renderer for the whole deck. Mounted exactly
 * once — never re-created per slide — so 80+ slides never come close to
 * the browser's WebGL context limit. Which content renders inside it is
 * decided purely by React reconciliation: swapping `sceneId` swaps the
 * mounted scene group, and the canvas, camera and renderer underneath
 * never change.
 */
export function SceneCanvas({ sceneId }: { sceneId: string | undefined }) {
  const scene = resolveScene(sceneId);
  if (!scene) return null;
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
    >
      <Suspense fallback={null}>
        <SceneLighting />
        {scene}
      </Suspense>
    </Canvas>
  );
}
