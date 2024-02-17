import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import explorerVertexShader from '../../shaders/vertex.glsl';
import explorerFragmentShader from '../../shaders/explorer/fragment.glsl';

const Explorer = () => {
  const mesh = useRef();
  const lightsMaterial = useRef();

  const texture1 = useTexture('/textures/Explorer.png');

  useFrame((state) => {
    let time = state.clock.getElapsedTime();

    mesh.current.material.uniforms.iTime.value = time;
  });

  const { size } = useThree();

  const ExplorerMaterial = shaderMaterial(
    {
      iTime: 1.0,
      iFrame: 1.0,
      iResolution: new THREE.Vector2(size.width, size.height),
      iMouse: new THREE.Vector4(),
      iChannel0: texture1,
    },
    explorerVertexShader,
    explorerFragmentShader
  );

  extend({ ExplorerMaterial });

  // Fit mesh to viewport
  const { viewport, camera } = useThree();
  //(target coordinates as second parameter)
  const dimensions = viewport.getCurrentViewport(camera, [0, 0, 0]);

  return (
    <mesh
      ref={mesh}
      scale={[dimensions.width * 0.6, dimensions.height * 0.6, 1]}
      position={[0, -0.1, 2.3]}
    >
      <planeGeometry />
      <explorerMaterial
        side={THREE.DoubleSide}
        ref={lightsMaterial}
        attach="material"
        opacity={0.5}
        transparent
      />
    </mesh>
  );
};

export default Explorer;
