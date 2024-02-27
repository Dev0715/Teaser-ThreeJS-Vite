import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva'
import { Perf } from 'r3f-perf'

import Aurora from './canvas/Aurora';
import Explorer from './canvas/Explorer';
import Lights from './canvas/Lights';
import Logo from './canvas/Logo';
import React from 'react';

function Scene() {
  return <>
    {/* Debug panel */}
    <Leva collapsed />
    <Canvas
      className="webgl"
      camera={{
        fov: 75,
        near: 0.1,
        far: 200,
        position: [0, 0, 6.5],
      }}
    >
      {/* Aurora effect: includes background, clouds, colored fog */}
      <Aurora />
      {/* Logo: loads model and animates it */}
      <Logo />
      {/* Lights effect: includes colored fog over the model; disabled for now */}
      <Lights />
      {/* Explorer effect: includes the silhouette of a man */}
      <Explorer />

      <ambientLight intensity={1} />
      <Environment files="./environmentMaps/HDRI_Ultimate_Skies_4k_0048.hdr" />
      {/* Comment out to navigate into the scene */}
      {/* <OrbitControls makeDefault /> */}
    </Canvas>
  </>
}

export default Scene;
