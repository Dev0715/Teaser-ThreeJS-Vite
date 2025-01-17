import { useGSAP } from '@gsap/react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useControls } from 'leva';
import gsap from 'gsap';
import React from 'react';
import * as THREE from 'three';

const Logo = () => {
  const group = React.useRef();

  const { nodes, materials, animations, scene } = useGLTF(
    './models/2ALogoAnimation.gltf',
  );
  const glass = materials['PBR'];
  glass.transparent = true;
  glass.opacity = 0.9;

  const logoAnimations = useAnimations(animations, group);
  const { animationName } = useControls({
    animationName: { options: logoAnimations.names },
  });

  useGSAP(
    () => {
      if (!group.current) return;

      const action = logoAnimations.actions[animationName];
      logoAnimations.mixer.timeScale = -logoAnimations.mixer.timeScale;
      const logoAction = logoAnimations.actions[animationName];
      if (logoAction) {
        logoAction.loop = THREE.LoopRepeat;
      }

      // Animate logo
      const rotate = () => {
        gsap
          .timeline({ repeat: -1 })
          .to((group.current as any)?.rotation, {
            y: Math.PI,
            ease: 'none',
            duration: 6,
            onComplete: () => {
              logoAnimations.mixer.timeScale = -logoAnimations.mixer.timeScale;
              // console.log('---------1', logoAnimations.mixer.timeScale);
              if (action) {
                action.reset().fadeIn(4).play();
              }
            },
          })
          .to((group.current as any)?.rotation, {
            y: 2 * Math.PI,
            ease: 'none',
            duration: 8,
            onComplete: () => {
              // console.log('---------2', logoAnimations.mixer.timeScale);
              logoAnimations.mixer.timeScale = -logoAnimations.mixer.timeScale;
            },
          })
          .to((group.current as any)?.rotation, {
            y: 3 * Math.PI,
            ease: 'none',
            repeat: 0,
            duration: 8,
            onComplete: () => {
              // console.log('---------3', logoAnimations.mixer.timeScale);
              if (action) {
                action.reset().fadeIn(4).play();
              }
              logoAnimations.mixer.timeScale = -logoAnimations.mixer.timeScale;
            },
          })
          .to((group.current as any)?.rotation, {
            y: 4 * Math.PI,
            ease: 'none',
            repeat: 0,
            duration: 8,
            onComplete: () => {
              // console.log('---------4', logoAnimations.mixer.timeScale);
              logoAnimations.mixer.timeScale = -logoAnimations.mixer.timeScale;
            },
          });
      };

      rotate();
    },
    {
      dependencies: [animationName],
      scope: group,
      revertOnUpdate: true,
    },
  );

  const { envMapIntensity } = useControls('environment map', {
    envMapIntensity: { value: 7, min: 0, max: 12 },
  });

  return (
    <primitive
      ref={group}
      object={scene}
      // scale={0.8}
      position={[0, 0.7, 1]}
      rotation-y={0.3}
      envMapIntensity={envMapIntensity}
    />
    // Model parts
    // <group
    //   ref={group}
    //   {...props}
    //   dispose={null}
    //   scale={0.8}
    //   position={[0, 0.7, 1]}
    // >
    //   <group>
    //     <group name="2A_Logo">
    //       <mesh
    //         name="2ALogo_fracturepart23_10"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart23_10'].geometry}
    //         material={materials.PBR}
    //         position={[-1.346, 0.583, -0.009]}
    //         rotation={[1.014, -0.215, 1.973]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart23_9"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart23_9'].geometry}
    //         material={materials.PBR}
    //         position={[-0.485, 0.918, -0.009]}
    //         rotation={[1.85, 0.497, 2.842]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart23_8"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart23_8'].geometry}
    //         material={materials.PBR}
    //         position={[-0.61, 0.134, -0.009]}
    //         rotation={[0.813, 0.446, -2.945]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart23_7"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart23_7'].geometry}
    //         material={materials.PBR}
    //         position={[-0.255, -0.551, -0.009]}
    //         rotation={[0.899, 0.824, 2.876]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart23_6"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart23_6'].geometry}
    //         material={materials.PBR}
    //         position={[-0.424, -1.384, -0.009]}
    //         rotation={[2.268, 0.953, 2.648]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart23"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart23'].geometry}
    //         material={materials.PBR}
    //         position={[-1.209, -0.503, -0.009]}
    //         rotation={[1.059, 0.717, 2.974]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart24"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart24'].geometry}
    //         material={materials.PBR}
    //         position={[-0.678, 1.704, -0.009]}
    //         rotation={[1.6, 0.209, 2.897]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart27"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart27'].geometry}
    //         material={materials.PBR}
    //         position={[0.702, -1.705, -0.009]}
    //         rotation={[1.604, 0.061, 2.246]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart28_5"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart28_5'].geometry}
    //         material={materials.PBR}
    //         position={[1.197, 0.509, -0.009]}
    //         rotation={[1.19, -0.099, 2.587]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart28_4"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart28_4'].geometry}
    //         material={materials.PBR}
    //         position={[0.402, 1.381, -0.009]}
    //         rotation={[0.906, 1.041, 2.904]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart28_3"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart28_3'].geometry}
    //         material={materials.PBR}
    //         position={[0.256, 0.545, -0.009]}
    //         rotation={[2.675, 0.084, 2.376]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart28_2"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart28_2'].geometry}
    //         material={materials.PBR}
    //         position={[0.607, -0.141, -0.009]}
    //         rotation={[1.881, -0.427, 2.988]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart28_1"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart28_1'].geometry}
    //         material={materials.PBR}
    //         position={[0.484, -0.925, -0.009]}
    //         rotation={[1.022, 0.92, 2.655]}
    //       />
    //       <mesh
    //         name="2ALogo_fracturepart28"
    //         castShadow
    //         receiveShadow
    //         geometry={nodes['2ALogo_fracturepart28'].geometry}
    //         material={materials.PBR}
    //         position={[1.351, -0.574, -0.009]}
    //         rotation={[2.167, -0.094, 2.788]}
    //       />
    //     </group>
    //   </group>
    // </group>
  );
};

export default Logo;

useGLTF.preload('./models/2ALogoAnimation.gltf');
