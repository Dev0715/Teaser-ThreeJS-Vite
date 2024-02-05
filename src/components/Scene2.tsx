import { Canvas } from '@react-three/fiber';
import Analizer2 from './audio/Analizer2';

function Scene3({ play }) {
  return (
    <Canvas
      className="webgl2"
      camera={{
        fov: 75,
        near: 0.1,
        far: 200,
        position: [0, 0, 6.6],
      }}
    >
      {/* Music bars effect: includes bars animation */}
      {play && <Analizer2 />}

      <ambientLight intensity={1} />
    </Canvas>
  );
}

export default Scene3;
