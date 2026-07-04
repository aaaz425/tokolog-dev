'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// https://github.com/o2bomb/space-warp
const COUNT = 100;
const generatePos = () => (Math.random() - 0.5) * 10;

function SpaceWarp() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const temp = useMemo(() => new THREE.Matrix4(), []);
  const tempPos = useMemo(() => new THREE.Vector3(), []);
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    if (!ref.current) return;

    const t = new THREE.Object3D();
    for (let i = 0; i < COUNT; i++) {
      t.position.x = generatePos();
      t.position.y = generatePos();
      t.position.z = (Math.random() - 0.5) * 10;
      t.updateMatrix();
      ref.current.setMatrixAt(i, t.matrix);

      tempColor.setHSL(Math.random(), 0.6, 0.6 + Math.random() * 0.3);
      ref.current.setColorAt(i, tempColor);
    }

    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [tempColor]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    for (let i = 0; i < COUNT; i++) {
      ref.current.getMatrixAt(i, temp);
      tempObject.scale.set(1, 1, Math.max(1, Math.pow(0.5, state.clock.elapsedTime) * 100));

      tempPos.setFromMatrixPosition(temp);
      if (tempPos.z > 7) {
        tempPos.z = -4;
      } else {
        tempPos.z += Math.max(delta, Math.pow(0.5, state.clock.elapsedTime));
      }
      tempObject.position.set(tempPos.x, tempPos.y, tempPos.z);
      tempObject.updateMatrix();
      ref.current.setMatrixAt(i, tempObject.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]} matrixAutoUpdate>
      <sphereGeometry args={[0.02]} />
      <meshBasicMaterial color={[1.5, 1.5, 1.5]} toneMapped={false} />
    </instancedMesh>
  );
}

export function WarpScene() {
  return (
    <div className="w-full h-full bg-black">
      <Canvas camera={{ fov: 100, near: 0.2, far: 200 }}>
        <SpaceWarp />
      </Canvas>
    </div>
  );
}
