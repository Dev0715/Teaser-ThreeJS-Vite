import { Canvas } from '@react-three/fiber';
import Analizer1 from './audio/Analizer1';

function Scene1({ play }) {
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
      {play && <Analizer1 />}

      <ambientLight intensity={1} />
    </Canvas>
  );
}

export default Scene1;
