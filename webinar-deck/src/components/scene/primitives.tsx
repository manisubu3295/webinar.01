'use client';

import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { ROYAL, ROYAL_LIGHT, GOLD } from './palette';

/**
 * The lighting rig every scene shares — mounted once at the Canvas root,
 * never per-slide. Upgraded from the original ambient+key+rim+fill setup
 * with a fourth, lower rim light for better shape definition on the far
 * side of hero meshes, plus a small procedural (offline, no HDRI fetch)
 * environment so metal surfaces pick up a soft, on-brand reflection
 * instead of reading as flat.
 */
export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 6]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-5, -3, -4]} intensity={0.5} color={GOLD} />
      <directionalLight position={[-3, -4.5, 2]} intensity={0.22} color={ROYAL_LIGHT} />
      <pointLight position={[-3, 2, 3]} intensity={0.6} distance={20} color={ROYAL_LIGHT} />
      <Environment resolution={256} frames={1}>
        <group rotation={[0, Math.PI / 3, 0]}>
          <Lightformer form="ring" intensity={2.2} color={GOLD} position={[3, 2, -2]} scale={3} />
          <Lightformer form="rect" intensity={1.2} color={ROYAL_LIGHT} position={[-4, -1, 2]} scale={4} rotation={[0, Math.PI / 2, 0]} />
          <Lightformer form="rect" intensity={0.6} color="#ffffff" position={[0, 4, 3]} scale={5} rotation={[-Math.PI / 2, 0, 0]} />
        </group>
      </Environment>
    </>
  );
}

/** Standard mesh material: matches the deck's original stdMat() — subtle
 * metalness/roughness, with gold surfaces given a soft self-glow. Upgraded
 * to MeshPhysicalMaterial with a touch of clearcoat for a more premium,
 * less flat sheen on metal elements. */
export function useStdMaterial(color: number, opts: { metalness?: number; roughness?: number; transparent?: boolean; opacity?: number } = {}) {
  return useMemo(() => {
    const isGold = color === GOLD;
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: opts.metalness ?? 0.35,
      roughness: opts.roughness ?? 0.4,
      clearcoat: 0.35,
      clearcoatRoughness: 0.3,
      emissive: isGold ? new THREE.Color(GOLD) : new THREE.Color(0x000000),
      emissiveIntensity: isGold ? 0.2 : 0,
      transparent: opts.transparent,
      opacity: opts.opacity ?? 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, opts.metalness, opts.roughness, opts.transparent, opts.opacity]);
}

export function useWireMaterial(color: number) {
  return useMemo(
    () => new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.55 }),
    [color],
  );
}

function useGlowTexture(hex: number) {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const c = new THREE.Color(hex);
    const r = Math.floor(c.r * 255);
    const g = Math.floor(c.g * 255);
    const b = Math.floor(c.b * 255);
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, `rgba(${r},${g},${b},0.95)`);
    grad.addColorStop(0.4, `rgba(${r},${g},${b},0.35)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, [hex]);
}

/** A soft additive-blended glow billboard behind a hero mesh. */
export function GlowSprite({ color = GOLD, scale = 1, position }: { color?: number; scale?: number; position?: [number, number, number] }) {
  const tex = useGlowTexture(color);
  return (
    <sprite scale={[scale, scale, 1]} position={position}>
      <spriteMaterial map={tex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
}

/** A field of soft glowing dust particles, floating in the scene's space —
 * the deck's signature ambient texture behind every 3D moment. */
export function DustField({ count = 40, spread = 5, color = GOLD, size = 0.05 }: { count?: number; spread?: number; color?: number; size?: number }) {
  const tex = useGlowTexture(color);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * spread * 2;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread * 1.2;
    }
    return arr;
  }, [count, spread]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={size} map={tex} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation />
    </points>
  );
}

/** The abstract human figure used across the requirement-gathering scenes:
 * a head, a tapered body, a small base — same three primitives, recolored
 * per person. */
export function HumanFigure({ color, position, rotation }: { color: number; position?: [number, number, number]; rotation?: [number, number, number] }) {
  const mat = useStdMaterial(color, { roughness: 0.42 });
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.52, 0]} material={mat}>
        <sphereGeometry args={[0.14, 16, 16]} />
      </mesh>
      <mesh position={[0, 0.16, 0]} material={mat}>
        <cylinderGeometry args={[0.08, 0.15, 0.46, 12]} />
      </mesh>
      <mesh position={[0, -0.1, 0]} material={mat}>
        <cylinderGeometry args={[0.17, 0.19, 0.05, 16]} />
      </mesh>
    </group>
  );
}

/** A thin line between two points — used for network / connector graphics. */
export function LineBetween({ from, to, color = GOLD, opacity = 0.4 }: { from: [number, number, number]; to: [number, number, number]; color?: number; opacity?: number }) {
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...from), new THREE.Vector3(...to)]), [from, to]);
  return (
    // eslint-disable-next-line react/no-unknown-property
    <primitive object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity }))} />
  );
}

/**
 * Wraps a scene's root group with a settle-in easing on mount: scales up
 * from slightly small with a damped spring instead of popping to full
 * size instantly. Runs once per scene mount (i.e. once per slide change),
 * the one deliberate, orchestrated motion moment per scene rather than
 * scattered per-element transitions.
 */
export function SceneIntro({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const born = useRef(0);
  useEffect(() => {
    born.current = performance.now();
  }, []);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const age = (performance.now() - born.current) / 1000;
    const target = 1;
    const start = 0.82;
    const k = Math.min(1, age / 0.6);
    const eased = start + (target - start) * (1 - Math.pow(1 - k, 3));
    ref.current.scale.setScalar(THREE.MathUtils.damp(ref.current.scale.x, eased, 6, delta));
  });
  return <group ref={ref}>{children}</group>;
}
