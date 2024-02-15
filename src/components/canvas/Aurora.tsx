import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial, useTexture, useVideoTexture } from '@react-three/drei';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';

import auroraVertexShader from '../../shaders/vertex.glsl';
import auroraFragmentShader from '../../shaders/aurora/fragment.glsl';

const Aurora = () => {
  const mesh = useRef();
  const auroraMaterial = useRef();

  let counter = 0;

  const texture1 = useTexture('/textures/Background.jpg');
  const texture2 = useTexture('/textures/Explorer.png');
  const vTexture = useVideoTexture('./textures/Clouds.mp4');

  useFrame((state) => {
    let time = state.clock.getElapsedTime();

    mesh.current.material.uniforms.iTime.value = time;
  });

  const controls = {
    iSaturation: {
      min: 0,
      max: 10,
      value: 0.2,
    },
    iAnotherSaturation: {
      min: 0,
      max: 10,
      value: 1.2,
    },
    iHowMuchGreen: {
      min: 0,
      max: 10,
      value: 1.8,
    },
    iColorShift: {
      min: 0,
      max: 10,
      value: -1,
    },
    iRepeatStripeAt: {
      min: 0,
      max: 10,
      value: 0.07,
    },
    iIntensity: {
      min: 0,
      max: 3,
      value: 0.8,
      step: 0.01,
    },
    iVerticalOffset: {
      min: 0.1,
      max: 0.5,
      value: 0.2,
      step: 0.01,
    },
    iHorizontalOffset: {
      min: 0,
      max: 5,
      value: 1.0,
      step: 0.01,
    },
    iSpeed: {
      min: 0,
      max: 10,
      value: 7.0,
      step: 0.01,
    },
  };

  const materialProps = useControls('shader', controls);

  const { size } = useThree();

  const AuroraMaterial = shaderMaterial(
    {
      iTime: 1.0,
      iResolution: new THREE.Vector2(size.width, size.height),
      iMouse: new THREE.Vector4(),
      iSaturation: controls.iSaturation.value,
      iAnotherSaturation: controls.iAnotherSaturation.value,
      iHowMuchGreen: controls.iHowMuchGreen.value,
      iColorShift: controls.iColorShift.value,
      iRepeatStripeAt: controls.iRepeatStripeAt.value,
      iIntensity: controls.iIntensity.value,
      iVerticalOffset: controls.iVerticalOffset.value,
      iHorizontalOffset: controls.iHorizontalOffset.value,
      iSpeed: controls.iSpeed.value,
      iChannel0: texture1,
      iChannel1: vTexture,
      iChannel2: texture2,
      iChannelResolution0: new THREE.Vector2(236, 121),
      iChannelResolution1: new THREE.Vector2(236, 124),
    },
    auroraVertexShader,
    auroraFragmentShader
  );

  extend({ AuroraMaterial });

  // Fit mesh to viewport
  const { viewport, camera } = useThree();
  //(target coordinates as second parameter)
  const dimensions = viewport.getCurrentViewport(camera, [0, 0, 0]);

  const { perfVisible } = useControls('debug', {
    perfVisible: false,
  });

  return <>
    <mesh ref={mesh} scale={[dimensions.width, dimensions.height, 1]}>
      {perfVisible && <Perf position="top-left" />}

      <planeGeometry
      // args={[2,2]}
      // args={[15, 8, 50, 50]}
      />
      <auroraMaterial
        side={THREE.DoubleSide}
        ref={auroraMaterial}
        {...materialProps}
        attach="material"
        opacity={0.5}
        transparent
      />
    </mesh>
  </>
};

export default Aurora;
