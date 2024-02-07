import { useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useControls } from 'leva'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Logo = () => {
  const group = useRef()
  const sphere = useRef()

  //** Model */
  const { nodes, materials, animations, scene } = useGLTF(
    './models/2ALogoAnimation.gltf'
  )

  //** Material */
  const glass = materials['PBR']
  glass.transparent = true
  glass.opacity = 0.9
  
  //** Animations */
  const logoAnimations = useAnimations(animations, group)
  const { animationName } = useControls({
    animationName: { options: logoAnimations.names },
  })

  // const { contextSafe} = useGSAP({scope: group})

  // const onClickGood = contextSafe(() => {
  //   gsap.to(group.current, {rotation: 180})
  // })

  useGSAP(
    () => {
      if (!group.current) return

      const action = logoAnimations.actions[animationName];
      logoAnimations.mixer.timeScale = -logoAnimations.mixer.timeScale;
      logoAnimations.mixer.loop = true;

      // Animate logo
      const rotate = () => {
        gsap
          .timeline({ repeat: -1 })
          .to(group.current.rotation, {
            y: 0,
            ease: 'none',
            duration: 6,
            onComplete: () => {
              logoAnimations.mixer.timeScale = -logoAnimations.mixer.timeScale;
              // console.log('---------1', logoAnimations.mixer.timeScale);
              // action.reset().fadeIn(4).play();
              action.reset().play();
            },
          })
      };

      rotate();
    },
    {
      dependencies: [animationName],
      scope: group,
      revertOnUpdate: true,
    }
  );

  const { envMapIntensity } = useControls('environment map', {
    envMapIntensity: { value: 7, min: 0, max: 12 },
  });

  const mouseIn = (event) => {
    console.log('Mouse Entered')
  }

  const mouseOut = (event) => {
    console.log('Mouse Left')
  }

  return <>
    {/* <mesh 
      ref={ sphere }
      position={ [ 0, 0.7, 1 ] }
      onPointerEnter={ mouseIn }
      onPointerLeave={ mouseOut }
    >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
    </mesh> */}

    <primitive
      ref={ group }
      object={ scene }
      position={ [ 0, 0.7, 1 ] }
      rotation-y={ 0.3 }
      envMapIntensity={ envMapIntensity }
    />
  </>
};

export default Logo;

useGLTF.preload('./models/2ALogoAnimation.gltf');
