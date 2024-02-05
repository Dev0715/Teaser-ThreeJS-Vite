import { Suspense, useEffect, useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { suspend } from 'suspend-react';
import { shaderMaterial } from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three';

import createAudio from '@/lib/createAudio';
import { vertexShader } from '../../shaders/vertexShader';
import { fragmentShader } from '../../shaders/audio/fragmentShader';

const Analizer1 = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Track
          position-z={0}
          url="/audio/Return_2A_Soundtrack_2024-01-10.wav"
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </Suspense>
    </>
  );
};

function Track({ url, vertexShader, fragmentShader }) {
  const mesh = useRef();
  const portalMaterial = useRef();
  let counter = 0;

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

  useFrame((state) => {
    let avg = update();

    let time = state.clock.getElapsedTime();

    mesh.current.material.uniforms.iTime.value = time;
    mesh.current.material.uniforms.iFrequency.value = avg;
    mesh.current.material.uniforms.iFrame.value = counter++;
  });

  const AnalizerMaterial = shaderMaterial(
    {
      iTime: 1.0,
      iFrame: 1.0,
      iFrequency: 0,
      iResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      iMouse: new THREE.Vector4(),
    },
    vertexShader,
    fragmentShader
  );

  extend({ AnalizerMaterial });

  return (
    <mesh ref={mesh} scale={[230, 8, 0]} position={[0, 0, 0]}>
      <planeGeometry />
      <analizerMaterial
        side={THREE.DoubleSide}
        ref={portalMaterial}
        attach="material"
      />
    </mesh>
  );
}

export default Analizer1;
