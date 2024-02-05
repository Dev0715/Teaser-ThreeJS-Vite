import React, { useRef, useEffect } from 'react';
import Scene from './Scene';
import Scene2 from './Scene1';
import Scene3 from './Scene2';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Layout({ play, parentCallback }) {
  const container = useRef();

  useEffect(() => {
    // Play music and start freq visualizer
    document.querySelector('#id-play')?.addEventListener('click', () => {
      parentCallback(play);
    });
  }, []);

  useGSAP(
    () => {
      // Animate text
      const timeline1 = new TimelineMax({ repeat: -1, yoyo: true });
      timeline1
        .fromTo('.inset-center-text1', 6, { opacity: 0.8 }, { opacity: 0.5 })
        .fromTo('.inset-center-text1', 8, { opacity: 0.8 }, { opacity: 0 });

      const timeline2 = new TimelineMax({ repeat: -1, yoyo: true });
      timeline2
        .fromTo('.inset-center-text2', 6, { opacity: 0 }, { opacity: 0.01 })
        .fromTo('.inset-center-text2', 8, { opacity: 0 }, { opacity: 0.8 });
    },
    { scope: container }
  );

  return (
    <>
      {/* Header */}
      <div className="flex flex-1 items-center h-screen">
        {/* Main scene */}
        <Scene />
      </div>
      <div className="header absolute max-w-full w-full top-[22px] px-[22px] flex justify-between tracking-wider z-50 select-none">
        <div className="freq-level flex flex-row w-[31vw]">
          <div className="freq-level-text text-[13px] opacity-[0.5] w-[160px]">
            FREQUENCY LEVEL
          </div>
          <div className="freq-level-svg bg-no-repeat bg-center pt-5 2xl:ml-4 xl:ml-5 w-1 2xl:w-[calc(31vw-90px)] w-[calc(31vw-160px)] h-[4px] bg-contain bg-[url('../img/Nodebarsm.svg')]"></div>
        </div>
        <div className="freq-line flex flex-row w-[34vw] ml-5 2xl:ml-12 xl:ml-9">
          <div className="freq-line-svg mr-1 w-[28vw] h-[16px] bg-no-repeat bg-contain bg-center  bg-[url('../img/FreqlineBox.svg')]">
            {/* Scene for line frequncy animation */}
            <Scene2 play={play} />
          </div>
          <div className="freq-line-text text-[13px] 2xl:ml-0 ml-1">432 Hz</div>
        </div>
        <div className="freq-monitor flex flex-row w-[31vw]">
          <div className="freq-monitor-svg bg-no-repeat bg-center pt-5 2xl:mr-4 xl:mr-5 w-1 2xl:w-[calc(31vw-90px)] w-[calc(31vw-160px)] h-[4px] bg-contain bg-[url('../img/Nodebarsm.svg')]"></div>
          <div className="freq-monitor-text text-[13px] w-[160px]">
            <span className="opacity-[0.5]">MONITOR</span>
            <span className="light ml-1 px-1 py-0.5">ACTIVE</span>
          </div>
        </div>
      </div>
      {/* Left */}
      <div className="left-node absolute flex flex-row left-10 top-[48%] z-50">
        <div className="left-node-svg w-[87px] h-[65px] bg-no-repeat bg-center pt-5 mr-5 bg-[url('../img/LeftNode.png')]"></div>
        <div className="left-node-text"></div>
      </div>
      {/* Center */}
      <div
        ref={container}
        className="inset-center visible z-50 select-none w-[90vw] sm:w-[700px] grid"
      >
        <div className="inset-center-text1 w-full text-center uppercase font-extralight text-[60px] text-justify text-center text-custom opacity-60 flex justify-center align-center animate-[colors_1s_ease-in-out_infinite_alternate] grid grid-cols-11 gap-4 text-custom col-start-1 row-start-1 opacity-[0.8]">
          <div>R</div>
          <div> </div>
          <div>E</div>
          <div> </div>
          <div>T</div>
          <div> </div>
          <div>U</div>
          <div> </div>
          <div>R</div>
          <div> </div>
          <div>N</div>
        </div>
        <div className="inset-center-text2 w-full text-center uppercase font-extralight text-[60px] text-justify text-center text-custom opacity-60 flex justify-center align-center animate-[colors_1s_ease-in-out_infinite_alternate] grid grid-cols-11 gap-4 text-custom col-start-1 row-start-1 opacity-[0]">
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
      {/* Right */}
      <div className="right-node absolute flex flex-row right-10 top-[48%] z-50">
        <div className="right-node-text"></div>
        <div className="right-node-svg w-[93px] h-[65px] bg-no-repeat bg-center pt-5 mr-5 bg-[url('../img/RightNode.png')]"></div>
      </div>
      {/* Footer */}
      <div className="footer absolute max-w-full bottom-[22px] px-[22px] inset-x-0 flex flex-col justify-between items-center tracking-wider z-50">
        <div className="footer-receive flex justify-center w-full font-bold text-white text-[13px] tracking-widest select-none pointer-events-none">
          RECEIVE FUTURE TRANSMISSIONS
        </div>
        <div className="footer-userdata">
          <div className="mt-2 grid grid-cols-1 gap-x-5 gap-y-8 grid-cols-6">
            <div className="col-span-3 w-[245px]">
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="ENTER NAME"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block bg-black bg-opacity-[0.1] w-full border border-custom py-1 px-[15px] placeholder:text-[12px] placeholder:text-secondary border-opacity-30 tracking-wider"
                />
              </div>
            </div>
            <div className="col-span-3 w-[245px]">
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="ENTER EMAIL ADDRESS"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block bg-black bg-opacity-[0.1] w-full border border-custom py-1 px-[15px] placeholder:text-[12px] placeholder:text-secondary border-opacity-30 tracking-wider"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom flex justify-between items-center w-full mt-4">
          <div className="footer-left flex justify-between w-[calc((100vw-170px)/2)]">
            <div className="footer-left-1 flex justify-between w-[170px]">
              <div className="footer-left-text text-[12px]">
                <span className="mr-3 pointer-events-none">AUDITORY</span>
                <span
                  id="play-off"
                  className={`${play ? 'bg-primary hover:cursor-pointer px-3 sm:px-[12px] py-0.2 text-black' : 'bg-secondary hover:cursor-pointer px-3 sm:px-[12px] py-0.2 text-white'}`}
                  onClick={() => parentCallback(play)}
                >
                  ON
                </span>
                <span
                  id="play-on"
                  className={`${play ? 'bg-secondary hover:cursor-pointer ml-[0.5px] px-1 sm:px-[7px] py-0.2 text-white' : 'bg-primary hover:cursor-pointer ml-[0.5px] px-1 sm:px-[7px] py-0.2 text-black'}`}
                  onClick={() => parentCallback(play)}
                >
                  OFF
                </span>
              </div>
            </div>
            <div className="footer-left-svg bg-no-repeat bg-center pt-5 w-1 2xl:mr-5 2xl:w-[calc((100vw-170px)/2-210px)] sm:mr-8 sm:w-[calc((100vw-170px)/2-190px)] h-[4px] bg-contain bg-[url('../img/Nodebarsm.svg')]"></div>
          </div>
          <div className="footer-center flex flex-col items-center justify-center w-[150px]">
            <button
              type="button"
              className="bg-primary w-[160px] h-[32px] py-1.6 text-[13px] font-bold uppercase leading-normal text-black hover:cursor-pointer z-50 tracking-widest"
            >
              SUBMIT
            </button>
          </div>
          <div className="footer-right flex justify-between w-[calc((100vw-170px)/2)]">
            <div className="footer-right-svg bg-no-repeat bg-center pt-5 w-1 2xl:ml-6 2xl:w-[calc((100vw-170px)/2-210px)] sm:ml-8 sm:w-[calc((100vw-170px)/2-190px)] h-[4px] bg-contain bg-[url('../img/Nodebarsm.svg')]"></div>
            {/* <div className="footer-right-svg1 bg-no-repeat bg-center pt-5 w-[170px] h-[24px] bg-contain bg-[url('../img/AudioMeter.svg')]"></div> */}
            {/* <div className="footer-right-svg1 pt-5 w-[170px] h-[34px]">
              <Scene2 play={play} />
            </div> */}
            <div className="footer-right-svg1 z-50 select-none w-[170px] h-[19px] grid bg-chartBack ml-1">
              {/* Scene for bars frequncy animation */}
              <Scene3 play={play} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
