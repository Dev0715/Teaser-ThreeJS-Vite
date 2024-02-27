import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import explorerVertexShader from '../../shaders/vertex.glsl';
import explorerFragmentShader from '../../shaders/explorer/fragment.glsl';

const Explorer = () => {
  const mesh = useRef();
  const lightsMaterial = useRef();

  // Shader Material
  const texture1 = useTexture('/textures/Explorer.png');
  const ExplorerMaterial = shaderMaterial(
    { 
      iChannel0: texture1
    },
    explorerVertexShader,
    explorerFragmentShader
  );

  extend({ ExplorerMaterial });

  // Fit mesh to viewport
  const { viewport, camera } = useThree();
  // (target coordinates as second parameter)
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
