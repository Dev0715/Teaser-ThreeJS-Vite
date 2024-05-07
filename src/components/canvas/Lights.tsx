import { shaderMaterial } from '@react-three/drei';
import { useFrame, extend, useThree } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';

import lightsVertexShader from '@/shaders/vertex.glsl';
import lightsFragmentShader from '@/shaders/lights/fragment.glsl';

const Lights = () => {
  const mesh = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (mesh.current?.material instanceof THREE.ShaderMaterial)
      mesh.current.material.uniforms.iTime.value = time;
  });

  // Fit mesh to viewport
  const { viewport, camera, size } = useThree();
  //(target coordinates as second parameter)
  const dimensions = viewport.getCurrentViewport(camera, [0, 0, 0]);

  const LightsMaterial = shaderMaterial(
    {
      iTime: 1.0,
      iFrame: 1.0,
      iResolution: new THREE.Vector2(size.width, size.height),
      iMouse: new THREE.Vector4(),
    },
    lightsVertexShader,
    lightsFragmentShader,
  );

  extend({ LightsMaterial });

  return (
    <mesh
      ref={mesh}
      scale={[dimensions.width, dimensions.height, 1]}
      position={[0, 0.7, 3.2]}
    >
      <planeGeometry />
      <lightsMaterial
        side={THREE.DoubleSide}
        attach="material"
        opacity={0.01}
        transparent
      />
    </mesh>
  );
};

export default Lights;
