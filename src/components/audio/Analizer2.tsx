import { Suspense, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { suspend } from 'suspend-react';
import * as THREE from 'three';

import createAudio from '@/lib/createAudio';

const Analizer2 = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Track
          position-z={0}
          url="/audio/Return_2A_Soundtrack_2024-01-10.wav"
        />
      </Suspense>
    </>
  );
};

function Track({
  url,
  y = 2500,
  space = 1.5,
  width = 0.03,
  height = 0.1,
  obj = new THREE.Object3D(),
  obj2 = new THREE.Object3D(),
  ...props
}) {
  const barsRef = useRef();
  const backgroundRef = useRef();

  // Get data from the audio analyzer
  // suspend-react is the library that r3f uses internally for useLoader
  const { gain, context, update, data } = suspend(
    () => createAudio(url),
    [url]
  );

  useEffect(() => {
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
        0
      );
      obj.scale.set(1, 1, 1);
      obj.updateMatrix();
      backgroundRef.current.setMatrixAt(i, obj.matrix);
      // Foreground
      obj2.position.set(
        i * width * space - data.length * width * space,
        0.1 + data[i] / y / 2,
        0
      );
      obj2.scale.set(1, (data[i] / y) * 10, 1);
      obj2.updateMatrix();
      barsRef.current.setMatrixAt(i, obj2.matrix);
    }

    backgroundRef.current.material.color = new THREE.Color('#474747');
    backgroundRef.current.instanceMatrix.needsUpdate = true;
    barsRef.current.material.color = new THREE.Color('#3ECEE5');
    barsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh
        position={[46, -9, 0]}
        scale={[120, 55, 70]}
        castShadow
        ref={backgroundRef}
        args={[null, null, data.length]}
        {...props}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <instancedMesh
        position={[46, -9, 0]}
        scale={[120, 55, 70]}
        castShadow
        ref={barsRef}
        args={[null, null, data.length]}
        {...props}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export default Analizer2;
