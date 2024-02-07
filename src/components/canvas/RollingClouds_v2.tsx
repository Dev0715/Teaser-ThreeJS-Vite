import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import { vertexShader } from '../../shaders/vertexShader';
import { fragmentShader } from '../../shaders/clouds/fragmentShader_v2';

const Clouds = () => {
  const mesh = useRef();
  const lightsMaterial = useRef();

  const texture1 = useTexture('/textures/Clouds.png');

  useFrame((state) => {
    let time = state.clock.getElapsedTime();

    mesh.current.material.uniforms.u_time.value = time;
  });

  const { size } = useThree();

  const CloudsMaterial = shaderMaterial(
    {
      u_time: 1.0,
      u_resolution: new THREE.Vector2(size.width, size.height),
      u_mouse: new THREE.Vector4(),
    },
    vertexShader,
    fragmentShader
  );

  extend({ CloudsMaterial });

  // Fit mesh to viewport
  const { viewport, camera } = useThree();
  //(target coordinates as second parameter)
  const dimensions = viewport.getCurrentViewport(camera, [0, 0, 0]);

  return (
    <mesh
      ref={mesh}
      scale={[dimensions.width, dimensions.height, 1]}
      position={[0, -0.1, 0.3]}
    >
      <planeGeometry />
      <cloudsMaterial
        side={THREE.DoubleSide}
        ref={lightsMaterial}
        attach="material"
        // opacity={[0.1]}
        transparent
      />
    </mesh>
  );
};

export default Clouds;
