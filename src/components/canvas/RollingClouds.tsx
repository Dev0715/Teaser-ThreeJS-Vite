import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// import { vertexShader } from '../../shaders/vertexShader';
import cloudsVertexShader from '../../shaders/vertex.glsl';
// import { fragmentShader } from '../../shaders/clouds/fragmentShader';
import cloudsFragmentShader from '../../shaders/clouds/fragment.glsl';

const Clouds = () => {
  const mesh = useRef();
  const lightsMaterial = useRef();

  const texture1 = useTexture('/textures/Clouds.png');

  useFrame((state) => {
    let time = state.clock.getElapsedTime();

    mesh.current.material.uniforms.iTime.value = time;
  });

  const { size } = useThree();

  const CloudsMaterial = shaderMaterial(
    {
      iTime: 1.0,
      iFrame: 1.0,
      iResolution: new THREE.Vector2(size.width, size.height),
      iMouse: new THREE.Vector4(),
      iChannel0: texture1,
    },
    cloudsVertexShader,
    cloudsFragmentShader
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
      position={[0, -0.1, 2.3]}
    >
      <planeGeometry />
      <cloudsMaterial
        side={THREE.DoubleSide}
        ref={lightsMaterial}
        attach="material"
        opacity={[0.5]}
        transparent
      />
    </mesh>
  );
};

export default Clouds;
