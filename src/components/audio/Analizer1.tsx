import { Suspense, useEffect, useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { suspend } from 'suspend-react';
import { shaderMaterial } from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three';
import createAudio from '@/lib/createAudio';
import audioVertexShader from '../../shaders/vertex.glsl';
import audioFragmentShader from '@/shaders/audio/fragment.glsl';
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      analizerMaterial: any;
    }
  }
}

const Analizer1 = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Track
          position-z={0}
          url="/audio/Return_2A_Soundtrack_2024-01-10.wav"
          vertexShader={audioVertexShader}
          fragmentShader={audioFragmentShader}
        />
      </Suspense>
    </>
  );
};

interface TrackProps {
  url: string;
  vertexShader: any;
  fragmentShader: any;
}

function Track({ url, vertexShader, fragmentShader }: TrackProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const portalMaterial = useRef();
  let counter = 0;

  const { gain, context, update, data } = suspend(
    () => createAudio(url),
    [url],
  );

  useEffect(() => {
    gain.connect(context.destination);
    return () => gain.disconnect();
  }, [gain, context]);

  useFrame((state) => {
    let avg = update();

    let time = state.clock.getElapsedTime();

    if (mesh.current && mesh.current.material) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.iTime.value = time;
      material.uniforms.iFrequency.value = avg;
      material.uniforms.iFrame.value = counter++;
    }
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
    fragmentShader,
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
