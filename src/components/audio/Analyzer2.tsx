import { useFrame } from '@react-three/fiber';
import React from 'react';
import { suspend } from 'suspend-react';
import * as THREE from 'three';

import createAudio from '@/lib/createAudio';

const Analyzer2 = () => {
  return (
    <React.Suspense fallback={null}>
      <Track position-z={0} url="/audio/Return_2A_Soundtrack_2024-01-10.wav" />
    </React.Suspense>
  );
};

function Track({
  url,
  y = 2500,
  space = 3.6,
  width = 0.01,
  height = 0.1,
  obj = new THREE.Object3D(),
  obj2 = new THREE.Object3D(),
  ...props
}: {
  url: string;
  y?: number;
  space?: number;
  width?: number;
  height?: number;
  obj?: THREE.Object3D;
  obj2?: THREE.Object3D;
  props?: any;
}) {
  const barsRef = React.useRef<THREE.InstancedMesh>(null);
  const backgroundRef = React.useRef<THREE.InstancedMesh>(null);

  // Get data from the audio analyzer
  // suspend-react is the library that r3f uses internally for useLoader
  const { gain, context, update, data } = suspend(
    () => createAudio(url),
    [url],
  );

  React.useEffect(() => {
    // Connect the gain node, which plays the audio
    gain.connect(context.destination);
    // Disconnect it on unmount
    return () => gain.disconnect();
  }, [gain, context]);

  useFrame(() => {
    // let avg = update();

    // Distribute the instanced planes according to the frequency data
    for (let i = 0; i < data.length; i++) {
      // Background
      obj.position.set(
        i * width * space - data.length * width * space,
        0.18,
        0,
      );
      obj.scale.set(1, 1, 1);
      obj.updateMatrix();
      if (backgroundRef.current) {
        backgroundRef.current.setMatrixAt(i, obj.matrix);
      }
      // Foreground
      obj2.position.set(
        i * width * space - data.length * width * space,
        0.1 + data[i] / y / 2,
        0,
      );
      obj2.scale.set(1, (data[i] / y) * 10, 1);
      obj2.updateMatrix();
      if (barsRef.current) {
        barsRef.current.setMatrixAt(i, obj2.matrix);
      }
    }

    if (backgroundRef.current?.material instanceof THREE.MeshBasicMaterial) {
      backgroundRef.current.material.color = new THREE.Color('#474747');
      backgroundRef.current.instanceMatrix.needsUpdate = true;
    }
    if (barsRef.current?.material instanceof THREE.MeshBasicMaterial) {
      barsRef.current.material.color = new THREE.Color('#3ECEE5');
      barsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <instancedMesh
        ref={backgroundRef}
        position={[36, -9, 0]}
        scale={[120, 55, 70]}
        castShadow
        args={[undefined, undefined, data.length]}
        {...props}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <instancedMesh
        ref={barsRef}
        position={[36, -9, 0]}
        scale={[120, 55, 70]}
        castShadow
        args={[undefined, undefined, data.length]}
        {...props}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export default Analyzer2;
