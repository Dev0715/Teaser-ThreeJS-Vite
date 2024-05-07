import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import React from 'react';
import { suspend } from 'suspend-react';
import * as THREE from 'three';

import createAudio from '@/lib/createAudio';
import audioVertexShader from '@/shaders/vertex.glsl';
import audioFragmentShader from '@/shaders/audio/fragment.glsl';

const Analyzer1 = () => {
  return (
    <React.Suspense fallback={null}>
      <Track
        position-z={0}
        url="/audio/Return_2A_Soundtrack_2024-01-10.wav"
        vertexShader={audioVertexShader}
        fragmentShader={audioFragmentShader}
      />
    </React.Suspense>
  );
};

interface TrackProps {
  url: string;
  vertexShader: string;
  fragmentShader: string;
}

function Track({ url, vertexShader, fragmentShader }: TrackProps) {
  const mesh = React.useRef<THREE.Mesh>(null);
  let counter = 0;

  const { gain, context, update, data } = suspend(
    () => createAudio(url),
    [url],
  );

  React.useEffect(() => {
    gain.connect(context.destination);
    return () => gain.disconnect();
  }, [gain, context]);

  useFrame((state) => {
    let avg = update();

    let time = state.clock.getElapsedTime();

    if (mesh.current?.material instanceof THREE.ShaderMaterial) {
      mesh.current.material.uniforms.iTime.value = time;
      mesh.current.material.uniforms.iFrequency.value = avg;
      mesh.current.material.uniforms.iFrame.value = counter++;
    }
  });

  const AnalyzerMaterial = shaderMaterial(
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

  extend({ AnalyzerMaterial });

  return (
    <mesh ref={mesh} scale={[230, 8, 0]} position={[0, 0, 0]}>
      <planeGeometry />
      <analyzerMaterial side={THREE.DoubleSide} attach="material" />
    </mesh>
  );
}

export default Analyzer1;
