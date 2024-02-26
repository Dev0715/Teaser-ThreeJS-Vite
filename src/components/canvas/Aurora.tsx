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

  const { size } = useThree();

  const texture1 = useTexture('/textures/Background.jpg');
  const texture2 = useTexture('/textures/Explorer.png');
  const vTexture = useVideoTexture('./textures/Clouds.mp4');

  useFrame((state) => {
    let time = state.clock.getElapsedTime();

    mesh.current.material.uniforms.iTime.value = time;
    mesh.current.material.uniforms.iResolution.value = new THREE.Vector2(size.width, size.height);
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
      value: 0.75,
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
    ibcIntensity: {
      min: 0,
      max: 20,
      value: 1.1,
      step: 0.01,
    },
    ibcEdge: {
      min: -0.5,
      max: 0.5,
      value: -0.11,
      step: 0.01,
    },
    ibcScale: {
      min: 0.0,
      max: 5.0,
      value: 1.9,
      step: 0.01,
    },
    ibcSpeed: {
      min: -0.5,
      max: 0.5,
      value: -0.04,
      step: 0.001,
    },
    ibcLayerSpeedScale: {
      min: -10.0,
      max: 10.0,
      value: -0.23,
      step: 0.01,
    },
    ibcDark: {
      min: 0.0,
      max: 1.0,
      value: 0.22,
      step: 0.001,
    },
    ibcLight: {
      min: 0.0,
      max: 1.0,
      value: 0.24,
      step: 0.001,
    },
    ibcCover: {
      min: 0.0,
      max: 5.0,
      value: 0.27,
      step: 0.001,
    },
    ibcAlpha: {
      min: 0.0,
      max: 20.0,
      value: 4.07,
      step: 0.01,
    },
    ibcColorScale: {
      min: 0.0,
      max: 10.0,
      value: 1.39,
      step: 0.01,
    },
    ibcNormalize: {
      min: 0.0,
      max: 10.0,
      value: 1.81,
      step: 0.01,
    },
    ibcCenter: {
      min: -2.0,
      max: 2.0,
      value: -0.02,
      step: 0.01,
    },
    ibcWR: {
      min: -2.0,
      max: 2.0,
      value: -0.88,
      step: 0.001,
    },
    ibcWF: {
      min: -2.0,
      max: 2.0,
      value: 2.0,
      step: 0.001,
    },
    ibcWC: {
      min: -2.0,
      max: 2.0,
      value: -1.1,
      step: 0.001,
    },
    ibcWRMultiplier: {
      min: -2.0,
      max: 2.0,
      value: -0.25,
      step: 0.001,
    },
    ibcWFMultiplier: {
      min: -2.0,
      max: 2.0,
      value: 0.23,
      step: 0.001,
    },
    ibcWCMultiplier: {
      min: -2.0,
      max: 2.0,
      value: 0.56,
      step: 0.001,
    },
    ibcAmplitudeMultiplier: {
      min: -5.0,
      max: 5.0,
      value: 0.12,
      step: 0.01,
    },
    ifcIntensity: {
      min: 0,
      max: 20,
      value: 1.1,
      step: 0.01,
    },
    ifcEdge: {
      min: -0.5,
      max: 0.5,
      value: -0.11,
      step: 0.01,
    },
    ifcScale: {
      min: 0.0,
      max: 5.0,
      value: 1.25,
      step: 0.01,
    },
    ifcSpeed: {
      min: -0.5,
      max: 0.5,
      value: -0.04,
      step: 0.001,
    },
    ifcLayerSpeedScale: {
      min: -10.0,
      max: 10.0,
      value: -0.23,
      step: 0.01,
    },
    ifcDark: {
      min: 0.0,
      max: 1.0,
      value: 0.22,
      step: 0.001,
    },
    ifcLight: {
      min: 0.0,
      max: 1.0,
      value: 0.24,
      step: 0.001,
    },
    ifcCover: {
      min: 0.0,
      max: 5.0,
      value: 0.27,
      step: 0.001,
    },
    ifcAlpha: {
      min: 0.0,
      max: 20.0,
      value: 4.07,
      step: 0.01,
    },
    ifcColorScale: {
      min: 0.0,
      max: 10.0,
      value: 1.39,
      step: 0.01,
    },
    ifcNormalize: {
      min: 0.0,
      max: 10.0,
      value: 1.81,
      step: 0.01,
    },
    ifcCenter: {
      min: -2.0,
      max: 2.0,
      value: -0.02,
      step: 0.01,
    },
    ifcWR: {
      min: -2.0,
      max: 2.0,
      value: -0.88,
      step: 0.001,
    },
    ifcWF: {
      min: -2.0,
      max: 2.0,
      value: 2.0,
      step: 0.001,
    },
    ifcWC: {
      min: -2.0,
      max: 2.0,
      value: -1.1,
      step: 0.001,
    },
    ifcWRMultiplier: {
      min: -2.0,
      max: 2.0,
      value: -0.25,
      step: 0.001,
    },
    ifcWFMultiplier: {
      min: -2.0,
      max: 2.0,
      value: 0.23,
      step: 0.001,
    },
    ifcWCMultiplier: {
      min: -2.0,
      max: 2.0,
      value: 0.45,
      step: 0.001,
    },
    ifcAmplitudeMultiplier: {
      min: -5.0,
      max: 5.0,
      value: 0.12,
      step: 0.01,
    },
  };

  const materialProps = useControls('shader', controls);

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
      ibcIntensity: controls.ibcIntensity.value,
      ibcEdge: controls.ibcEdge.value,
      ibcScale: controls.ibcScale.value,
      ibcSpeed: controls.ibcSpeed.value,
      ibcLayerSpeedScale: controls.ibcLayerSpeedScale.value,
      ibcDark: controls.ibcDark.value,
      ibcLight: controls.ibcLight.value,
      ibcCover: controls.ibcCover.value,
      ibcAlpha: controls.ibcAlpha.value,
      ibcColorScale: controls.ibcColorScale.value,
      ibcNormalize: controls.ibcNormalize.value,
      ibcCenter: controls.ibcCenter.value,
      ibcWR: controls.ibcWR.value,
      ibcWF: controls.ibcWF.value,
      ibcWC: controls.ibcWC.value,
      ibcWRMultiplier: controls.ibcWRMultiplier.value,
      ibcWFMultiplier: controls.ibcWFMultiplier.value,
      ibcWCMultiplier: controls.ibcWCMultiplier.value,
      ibcAmplitudeMultiplier: controls.ibcAmplitudeMultiplier.value,
      ifcIntensity: controls.ifcIntensity.value,
      ifcEdge: controls.ifcEdge.value,
      ifcScale: controls.ifcScale.value,
      ifcSpeed: controls.ifcSpeed.value,
      ifcLayerSpeedScale: controls.ifcLayerSpeedScale.value,
      ifcDark: controls.ifcDark.value,
      ifcLight: controls.ifcLight.value,
      ifcCover: controls.ifcCover.value,
      ifcAlpha: controls.ifcAlpha.value,
      ifcColorScale: controls.ifcColorScale.value,
      ifcNormalize: controls.ifcNormalize.value,
      ifcCenter: controls.ifcCenter.value,
      ifcWR: controls.ifcWR.value,
      ifcWF: controls.ifcWF.value,
      ifcWC: controls.ifcWC.value,
      ifcWRMultiplier: controls.ifcWRMultiplier.value,
      ifcWFMultiplier: controls.ifcWFMultiplier.value,
      ifcWCMultiplier: controls.ifcWCMultiplier.value,
      ifcAmplitudeMultiplier: controls.ifcAmplitudeMultiplier.value,
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
