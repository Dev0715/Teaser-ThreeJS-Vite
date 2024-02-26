import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

import lightsVertexShader from '../../shaders/vertex.glsl';
import lightsFragmentShader from '../../shaders/lights/fragment.glsl';

const Lights = () => {
  const mesh = useRef();
  const lightsMaterial = useRef();

  useFrame((state) => {
    let time = state.clock.getElapsedTime();

    mesh.current.material.uniforms.iTime.value = time;
  });

  const { size } = useThree();

  const LightsMaterial = shaderMaterial(
    {
      iTime: 1.0,
      iFrame: 1.0,
      iResolution: new THREE.Vector2(size.width, size.height),
      iMouse: new THREE.Vector4(),
    },
    lightsVertexShader,
    lightsFragmentShader
  );

  extend({ LightsMaterial });

  // Fit mesh to viewport
  const { viewport, camera } = useThree();
  //(target coordinates as second parameter)
  const dimensions = viewport.getCurrentViewport(camera, [0, 0, 0]);

  return (
    <mesh
      ref={mesh}
      scale={[dimensions.width, dimensions.height, 1]}
      position={[0, 0.7, 3.2]}
    >
      <planeGeometry />
      <lightsMaterial
        side={THREE.DoubleSide}
        ref={lightsMaterial}
        attach="material"
        opacity={0.01}
        transparent
      />
    </mesh>
  );
};

export default Lights;
