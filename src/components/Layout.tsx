import React, { useState } from 'react';
import Scene from './Scene';
import Scene1 from './Scene1';
import Scene2 from './Scene2';
import PositionMarker from './PositionMarker';
import FadeText from './FadeText';
import Subscription from './Subscription';

type LayoutProps = {
  play: boolean;
  onPlay: (play: boolean) => void;
};

function Layout({ play, onPlay }: LayoutProps) {
  const [username, setUsername] = useState<string>('Jack Smith');
  const [email, setEmail] = useState<string>('jacksmith@gmail.com');

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
          <div className="freq-level-svg bg-no-repeat bg-center pt-5 2xl:ml-4 xl:ml-5 2xl:w-[calc(31vw-90px)] w-[calc(31vw-160px)] h-[4px] bg-contain bg-[url('../img/Nodebarsm.svg')]"></div>
        </div>
        <div className="freq-line flex flex-row w-[34vw] ml-5 2xl:ml-12 xl:ml-9">
          <div className="freq-line-svg mr-1 w-[28vw] h-[16px] bg-no-repeat bg-contain bg-center bg-[url('../img/FreqlineBox.svg')]">
            {/* Scene for line frequency animation */}
            <Scene1 play={play} />
          </div>
          <div className="freq-line-text text-[13px] 2xl:ml-0 ml-1">432 Hz</div>
        </div>
        <div className="freq-monitor flex flex-row w-[31vw]">
          <div className="freq-monitor-svg bg-no-repeat bg-center pt-5 2xl:mr-4 xl:mr-5 2xl:w-[calc(31vw-90px)] w-[calc(31vw-160px)] h-[4px] bg-contain bg-[url('../img/Nodebarsm.svg')]"></div>
          <div className="freq-monitor-text text-[13px] w-[160px]">
            <span className="opacity-[0.5]">MONITOR</span>
            <span className="light ml-1 px-1 py-0.5">ACTIVE</span>
          </div>
        </div>
      </div>
      {/* Center */}
      <FadeText />

      {/* Footer */}
      <div className="footer absolute max-w-full bottom-[22px] px-[22px] inset-x-0 flex flex-col justify-between items-center tracking-wider z-50">
        <div className="footer-receive flex justify-center w-full font-bold text-white text-[13px] tracking-widest select-none pointer-events-none">
          RECEIVE FUTURE TRANSMISSIONS
        </div>
        <div className="footer-userdata">
          <div className="mt-2 grid gap-x-5 gap-y-8 grid-cols-6">
            <div className="col-span-3 w-[290px]">
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="ENTER NAME"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block bg-black bg-opacity-[0.1] w-full border border-custom py-1 px-[15px] placeholder:text-[12px] placeholder:text-secondary border-opacity-30 tracking-wider"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="col-span-3 w-[290px]">
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="ENTER EMAIL ADDRESS"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block bg-black bg-opacity-[0.1] w-full border border-custom py-1 px-[15px] placeholder:text-[12px] placeholder:text-secondary border-opacity-30 tracking-wider"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  id="play-on"
                  className={`px-3 sm:px-[12px] py-0.2 hover:cursor-pointer ${
                    play ? 'bg-primary text-black' : 'bg-secondary text-white'
                  }`}
                  onClick={() => onPlay(!play)}
                >
                  ON
                </span>
                <span
                  id="play-off"
                  className={`ml-[0.5px] px-1 sm:px-[7px] py-0.2 hover:cursor-pointer ${
                    play ? 'bg-secondary text-white' : 'bg-primary text-black'
                  }`}
                  onClick={() => onPlay(!play)}
                >
                  OFF
                </span>
              </div>
            </div>
            <div className="footer-left-svg bg-no-repeat bg-center pt-5 w-1 2xl:mr-5 2xl:w-[calc((100vw-170px)/2-210px)] sm:mr-8 sm:w-[calc((100vw-170px)/2-190px)] h-[4px] bg-contain bg-[url('../img/Nodebarsm.svg')]"></div>
          </div>

          <Subscription username={username} email={email} />

          <div className="footer-right flex justify-between w-[calc((100vw-170px)/2)]">
            <div className="footer-right-svg bg-no-repeat bg-center pt-5 w-1 2xl:ml-6 2xl:w-[calc((100vw-170px)/2-210px)] sm:ml-8 sm:w-[calc((100vw-170px)/2-190px)] h-[4px] bg-contain bg-[url('../img/Nodebarsm.svg')]"></div>
            <div className="footer-right-svg1 z-50 select-none w-[170px] h-[19px] grid bg-chartBack ml-1">
              {/* Scene for bars frequency animation */}
              <Scene2 play={play} />
            </div>
          </div>
        </div>
      </div>

      <PositionMarker />
    </>
  );
}

export default Layout;
