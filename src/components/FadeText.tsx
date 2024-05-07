import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';

export default function FadeText() {
  const container = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate text
      const timeline1 = gsap.timeline({ repeat: -1, yoyo: true });
      timeline1
        .fromTo('.inset-center-text1', 6, { opacity: 0.8 }, { opacity: 0.5 })
        .fromTo('.inset-center-text1', 8, { opacity: 0.8 }, { opacity: 0 });
      const timeline2 = gsap.timeline({ repeat: -1, yoyo: true });
      timeline2
        .fromTo('.inset-center-text2', 6, { opacity: 0 }, { opacity: 0.01 })
        .fromTo('.inset-center-text2', 8, { opacity: 0 }, { opacity: 0.8 });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="inset-center visible z-50 select-none w-[90vw] sm:w-[700px] grid text-center uppercase font-extralight text-[60px] text-custom"
    >
      <div className="inset-center-text1 col-start-1 row-start-1 w-full pt-48 animate-[colors_1s_ease-in-out_infinite_alternate] grid grid-cols-11 gap-4 opacity-[0.8]">
        <div> </div>
        <div> </div>
        <div>R</div>
        <div>E</div>
        <div>:</div>
        <div>T</div>
        <div>U</div>
        <div>R</div>
        <div>N</div>
        <div> </div>
        <div> </div>
      </div>
      <div className="inset-center-text2 col-start-1 row-start-1 w-full pt-48 animate-[colors_1s_ease-in-out_infinite_alternate] grid grid-cols-11 gap-4 opacity-[0]">
        <div> </div>
        <div>2</div>
        <div>A</div>
        <div>D</div>
        <div>V</div>
        <div>A</div>
        <div>N</div>
        <div>C</div>
        <div>E</div>
        <div>D</div>
        <div> </div>
      </div>
    </div>
  );
}
