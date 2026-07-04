'use client';

import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Html, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { Group, Mesh } from 'three';
import type { WaitingCandidate } from './mockData';

const STAR_MODEL_PATH = '/models/galaxy-talk/star.glb';
const SKYBOX_PATH = '/models/galaxy-talk/skybox/';

useGLTF.preload(STAR_MODEL_PATH);

const GALAXY_SIZE = 1.8;
const GALAXY_COLOR_INSIDE = '#ffffff';
const GALAXY_COLOR_OUTSIDE = '#311599';
const GALAXY_COUNT = 10_000;
const GALAXY_BRANCHES = 5;
const GALAXY_TIME_WARMUP = 9;

const GALAXY_VERTEX_SHADER = `
  uniform float uTime;
  uniform float uSize;
  uniform vec3 uColorInside;
  uniform vec3 uColorOutside;

  attribute float aRadiusRatio;
  attribute float aAngle;
  attribute vec3 aRandomOffset;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float radius = pow(aRadiusRatio, 1.5) * 5.0;
    float currentAngle = aAngle + uTime * (1.0 - aRadiusRatio);

    vec3 basePosition = vec3(
      cos(currentAngle),
      sin(uTime * 0.5 + aRadiusRatio * 2.0) * 0.3,
      sin(currentAngle)
    ) * radius;

    vec3 finalPosition = basePosition + aRandomOffset;

    vec4 modelPosition = modelMatrix * vec4(finalPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    gl_PointSize = uSize * 15.0;
    gl_PointSize *= (1.0 / -viewPosition.z);

    float colorMix = 1.0 - pow(1.0 - aRadiusRatio, 2.0);
    vColor = mix(uColorInside, uColorOutside, colorMix);
    vAlpha = 0.8;
  }
`;

const GALAXY_FRAGMENT_SHADER = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float strength = 1.0 - length(gl_PointCoord - 0.5) * 2.0;
    strength = smoothstep(0.0, 0.2, strength);

    gl_FragColor = vec4(vColor, strength * vAlpha);
  }
`;

function Galaxy() {
  const { positions, attributes } = useMemo(() => {
    const positions = new Float32Array(GALAXY_COUNT * 3);
    const radiusRatios = new Float32Array(GALAXY_COUNT);
    const angles = new Float32Array(GALAXY_COUNT);
    const randomOffsets = new Float32Array(GALAXY_COUNT * 3);

    for (let i = 0; i < GALAXY_COUNT; i++) {
      const radiusRatio = Math.random();
      const branch = Math.floor(Math.random() * GALAXY_BRANCHES);
      const angle = (branch * Math.PI * 2) / GALAXY_BRANCHES;
      const randomOffset = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      )
        .normalize()
        .multiplyScalar(radiusRatio * 0.2 + 0.1);

      radiusRatios[i] = radiusRatio;
      angles[i] = angle;
      randomOffsets.set([randomOffset.x, randomOffset.y, randomOffset.z], i * 3);
      positions.set([0, 0, 0], i * 3);
    }

    return {
      positions,
      attributes: {
        aRadiusRatio: new THREE.BufferAttribute(radiusRatios, 1),
        aAngle: new THREE.BufferAttribute(angles, 1),
        aRandomOffset: new THREE.BufferAttribute(randomOffsets, 3),
      },
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: GALAXY_TIME_WARMUP },
      uSize: { value: GALAXY_SIZE },
      uColorInside: { value: new THREE.Color(GALAXY_COLOR_INSIDE) },
      uColorOutside: { value: new THREE.Color(GALAXY_COLOR_OUTSIDE) },
    }),
    []
  );

  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    uniforms.uTime.value = GALAXY_TIME_WARMUP + state.clock.getElapsedTime() * 0.5;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={GALAXY_COUNT}
          />
          <bufferAttribute
            attach="attributes-aRadiusRatio"
            args={[attributes.aRadiusRatio.array, 1]}
            count={GALAXY_COUNT}
          />
          <bufferAttribute
            attach="attributes-aAngle"
            args={[attributes.aAngle.array, 1]}
            count={GALAXY_COUNT}
          />
          <bufferAttribute
            attach="attributes-aRandomOffset"
            args={[attributes.aRandomOffset.array, 3]}
            count={GALAXY_COUNT}
          />
        </bufferGeometry>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={GALAXY_VERTEX_SHADER}
          fragmentShader={GALAXY_FRAGMENT_SHADER}
          transparent={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function CandidateStar({ candidate }: { candidate: WaitingCandidate }) {
  const { scene } = useGLTF(STAR_MODEL_PATH);
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const [randomPosition] = useState<[number, number, number]>(() => [
    Math.random() * 3 - 1.5,
    Math.random() * 3 - 1.5,
    Math.random() * 3 - 1.5,
  ]);
  const rotationSpeed = useMemo(() => Math.random() * 0.005 + 0.005, []);
  const oscillationSpeed = useMemo(() => Math.random() * 0.005 + 0.002, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || hovered) return;
    const t = clock.elapsedTime;
    const oscillation = Math.sin(t * oscillationSpeed) * 0.2;
    meshRef.current.position.lerp(
      new THREE.Vector3(
        randomPosition[0] + oscillation,
        randomPosition[1] + oscillation,
        randomPosition[2] + oscillation
      ),
      0.1
    );
    meshRef.current.rotation.y += rotationSpeed;
    meshRef.current.rotation.x += rotationSpeed;
  });

  return (
    <mesh
      ref={meshRef}
      position={randomPosition}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      <primitive object={scene.clone()} />
      {hovered && (
        <Html center style={{ pointerEvents: 'none', width: '240px' }}>
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <p className="font-body text-xs font-semibold text-slate-800 mb-1.5">상대방의 고민</p>
            <p className="font-body text-xs text-slate-600 mb-1.5">{candidate.concern}</p>
            <p className="font-body text-xs text-slate-400">상대방의 MBTI : {candidate.mbti}</p>
          </div>
        </Html>
      )}
    </mesh>
  );
}

interface MatchSceneProps {
  candidates: WaitingCandidate[];
}

export function MatchScene({ candidates }: MatchSceneProps) {
  return (
    <div className="w-full h-full bg-slate-950">
      <Canvas camera={{ position: [4, 2, 5], fov: 40 }}>
        <ambientLight intensity={2.5} />
        <Suspense fallback={null}>
          <Environment
            files={[
              `${SKYBOX_PATH}right.png`,
              `${SKYBOX_PATH}left.png`,
              `${SKYBOX_PATH}top.png`,
              `${SKYBOX_PATH}bottom.png`,
              `${SKYBOX_PATH}front.png`,
              `${SKYBOX_PATH}back.png`,
            ]}
            background
          />
          <Galaxy />
          {candidates.map((candidate) => (
            <CandidateStar key={candidate.userId} candidate={candidate} />
          ))}
        </Suspense>
        <OrbitControls enableDamping minDistance={3} maxDistance={10} enablePan={false} />
      </Canvas>
    </div>
  );
}
