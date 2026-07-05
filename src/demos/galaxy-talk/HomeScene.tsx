'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Stars, useGLTF, useTexture } from '@react-three/drei';
import type { Group, Mesh } from 'three';
import { useMotionSafe } from '@/hooks/useMotionSafe';

const MODEL_PATH = '/models/galaxy-talk/';

useGLTF.preload(`${MODEL_PATH}snow_house.glb`);
useGLTF.preload(`${MODEL_PATH}satellite_dish_1k.glb`);
useGLTF.preload(`${MODEL_PATH}walkie_talkie.glb`);

function RotatingStars() {
  const groupRef = useRef<Group>(null);
  const motionSafe = useMotionSafe();

  useFrame((_, delta) => {
    if (groupRef.current && motionSafe) {
      groupRef.current.rotation.x += delta * 0.02;
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

function Ground() {
  const snowTexture = useTexture(`${MODEL_PATH}snow.webp`);
  return (
    <mesh position={[0, -3, 0]} receiveShadow>
      <cylinderGeometry args={[10, 10, 0.5, 100]} />
      <meshStandardMaterial toneMapped={false} map={snowTexture} color="#cccccc" />
    </mesh>
  );
}

interface ClickableModelProps {
  path: string;
  label: string;
  scale: number;
  position: [number, number, number];
  rotationY: number;
  htmlPosition: [number, number, number];
  onClick: () => void;
  prominent?: boolean;
}

function ClickableModel({
  path,
  label,
  scale,
  position,
  rotationY,
  htmlPosition,
  onClick,
  prominent = false,
}: ClickableModelProps) {
  const { scene } = useGLTF(path);
  const groupRef = useRef<Group>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    groupRef.current?.traverse((child) => {
      const mesh = child as Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <>
      {hover && (
        <Html position={htmlPosition} center style={{ pointerEvents: 'none' }}>
          <div
            className={
              prominent
                ? 'rounded-full bg-accent-600 px-4 py-2 font-body text-sm font-semibold text-white whitespace-nowrap shadow-lg'
                : 'rounded-full bg-slate-950/85 px-3 py-1 font-body text-xs text-white whitespace-nowrap'
            }
          >
            {label}
          </div>
        </Html>
      )}
      <group
        ref={groupRef}
        position={position}
        rotation={[0, rotationY, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHover(false);
          document.body.style.cursor = 'default';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <primitive object={scene} scale={scale} dispose={null} />
      </group>
    </>
  );
}

interface HomeSceneProps {
  onOpenMatchingForm: () => void;
  onOpenFeedbackForm: () => void;
  onOpenMyPageNotice: () => void;
}

export function HomeScene({
  onOpenMatchingForm,
  onOpenFeedbackForm,
  onOpenMyPageNotice,
}: HomeSceneProps) {
  return (
    <div className="w-full h-full bg-slate-950">
      <Canvas shadows camera={{ fov: 60, near: 0.01, far: 10000, position: [0, 0, 12] }}>
        <RotatingStars />
        <OrbitControls
          enableDamping
          minAzimuthAngle={-2}
          maxAzimuthAngle={2.5}
          minPolarAngle={0.7}
          maxPolarAngle={1.6}
          minDistance={10}
          maxDistance={14}
          enablePan={false}
        />
        <ambientLight intensity={2} />
        <directionalLight
          position={[-4, 7, 6]}
          intensity={6}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <Suspense fallback={null}>
          <Ground />
          <ClickableModel
            path={`${MODEL_PATH}snow_house.glb`}
            label="마이페이지"
            scale={0.4}
            position={[-4.2, -2.8, 3]}
            rotationY={(11 * Math.PI) / 180}
            htmlPosition={[-4.2, -1, 3]}
            onClick={onOpenMyPageNotice}
          />
          <ClickableModel
            path={`${MODEL_PATH}satellite_dish_1k.glb`}
            label="클릭해서 매칭 시작하기"
            scale={0.3}
            position={[0, -2.8, 5]}
            rotationY={180}
            htmlPosition={[0, 0, 5]}
            onClick={onOpenMatchingForm}
            prominent
          />
          <ClickableModel
            path={`${MODEL_PATH}walkie_talkie.glb`}
            label="피드백"
            scale={0.1}
            position={[3.8, -2.8, 3]}
            rotationY={(-45 * Math.PI) / 180}
            htmlPosition={[3.8, -0.7, 3]}
            onClick={onOpenFeedbackForm}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
