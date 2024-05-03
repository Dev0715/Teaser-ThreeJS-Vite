import { Canvas } from '@react-three/fiber';
import Analyzer1 from './audio/Analyzer1';
import React from 'react';

interface Scene1Props {
  play: boolean;
}

function Scene1({ play }: Scene1Props) {
  return (
    <Canvas
      className="webgl1"
      camera={{
        fov: 75,
        near: 0.1,
        far: 200,
        position: [0, 0, 6.6],
      }}
    >
      {/* Music line effect: includes line animation */}
      {play && <Analyzer1 />}

      <ambientLight intensity={1} />
    </Canvas>
  );
}

export default Scene1;
