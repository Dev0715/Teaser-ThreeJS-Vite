import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial, useTexture, useVideoTexture } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';

import auroraVertexShader from '../../shaders/vertex.glsl';
import auroraFragmentShader from '../../shaders/aurora/fragment.glsl';
import React from 'react';

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

    if (mesh.current) {
      (mesh.current as any).material.uniforms.iTime.value = time;
      (mesh.current as any).material.uniforms.iResolution.value =
        new THREE.Vector2(size.width, size.height);
    }
  });

  // const auroraControls = {
  //   iSaturation: {
  //     min: 0,
  //     max: 10,
  //     value: 0.2,
  //     step: 0.01,
  //     label: 'saturation',
  //   },
  //   iColorShift: {
  //     min: 0,
  //     max: 10,
  //     value: -1,
  //     step: 0.01,
  //     label: 'color',
  //   },
  //   iIntensity: {
  //     min: 0,
  //     max: 3,
  //     value: 0.75,
  //     step: 0.01,
  //     label: 'intensity',
  //   },
  //   iVerticalOffset: {
  //     min: 0.1,
  //     max: 0.5,
  //     value: 0.2,
  //     step: 0.01,
  //     label: 'vertical',
  //   },
  //   iHorizontalOffset: {
  //     min: 0,
  //     max: 5,
  //     value: 1.0,
  //     step: 0.01,
  //     label: 'horizontal',
  //   },
  //   iSpeed: {
  //     min: 0,
  //     max: 10,
  //     value: 7.0,
  //     step: 0.01,
  //     label: 'speed',
  //   },
  // };

  const cloudsControls = {
    icIntensity: {
      min: 0,
      max: 3,
      value: 0.8,
      step: 0.001,
      label: 'intensity',
    },
    icTop: {
      min: -0.5,
      max: 0.5,
      value: -0.02,
      step: 0.01,
      label: 'top',
    },
    icBottom: {
      min: -0.5,
      max: 0.5,
      value: -0.11,
      step: 0.01,
      label: 'bottom',
    },
    icScale: {
      min: 0.0,
      max: 5.0,
      value: 1.9,
      step: 0.01,
      label: 'scale',
    },
    icSpeed: {
      min: -0.5,
      max: 0.5,
      value: -0.04,
      step: 0.001,
      label: 'speed',
    },
    icDirection: {
      min: -1.0,
      max: 1.0,
      value: -0.23,
      step: 0.01,
      label: 'direction',
    },
    icCover: {
      min: 0.0,
      max: 2.0,
      value: 0.27,
      step: 0.001,
      label: 'cover',
    },
  };

  const materialProps = useControls('sky shader', {
    // aurora: folder(auroraControls),
    clouds: folder(cloudsControls),
  });

  const AuroraMaterial = shaderMaterial(
    {
      iTime: 1.0,
      iResolution: new THREE.Vector2(size.width, size.height),
      iMouse: new THREE.Vector4(),
      // iSaturation: auroraControls.iSaturation.value, // Aurora's saturation
      // iColorShift: auroraControls.iColorShift.value, // Aurora's color changer by one value
      // iIntensity: auroraControls.iIntensity.value, // Aurora's light intensity
      // iVerticalOffset: auroraControls.iVerticalOffset.value, // Aurora's vertical shift
      // iHorizontalOffset: auroraControls.iHorizontalOffset.value, // Aurora's far distance
      // iSpeed: auroraControls.iSpeed.value, // Aurora's flow speed
      icIntensity: cloudsControls.icIntensity.value, // Clouds' light intensity
      icTop: cloudsControls.icTop.value, // Clouds' top fading edge
      icBottom: cloudsControls.icBottom.value, // Clouds' bottom fading edge
      icScale: cloudsControls.icScale.value, // Clouds' scale
      icSpeed: cloudsControls.icSpeed.value, // Clouds' speed (negative - left->right, positive - right->left)
      icDirection: cloudsControls.icDirection.value, // Clouds' angle multiplier (-1 with negative speed - up, +1 with negative speed - completely left->right)
      icCover: cloudsControls.icCover.value, // Clouds' filling of the sky
      iChannel0: texture1,
      iChannel1: vTexture,
      iChannel2: texture2,
      iChannelResolution0: new THREE.Vector2(236, 121),
      iChannelResolution1: new THREE.Vector2(236, 124),
    },
    auroraVertexShader,
    auroraFragmentShader,
  );

  extend({ AuroraMaterial });

  // Fit mesh to viewport
  const { viewport, camera } = useThree();
  //(target coordinates as second parameter)
  const dimensions = viewport.getCurrentViewport(camera, [0, 0, 0]);

  const { perfVisible } = useControls('debug', {
    perfVisible: false,
  });

  return (
    <>
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
  );
};

export default Aurora;
