import React, { useState } from 'react';

import Header from './Header';
import Scene from './Scene';
import Scene2 from './Scene2';
import PositionMarker from './PositionMarker';
import FadeText from './FadeText';
import Subscription from './Subscription';
import Divider from './Divider';

type LayoutProps = {
  play: boolean;
  onPlay: (play: boolean) => void;
};

function Layout({ play, onPlay }: LayoutProps) {
  const [username, setUsername] = useState<string>('Firstname Lastname');
  const [email, setEmail] = useState<string>('username@domain.com');

  return (
    <>
      {/* Header */}
      <div className="flex flex-1 items-center h-screen">
        {/* Main scene */}
        <Scene />
      </div>

      {/* Header */}
      <Header play={play} />

      {/* Center */}
      <FadeText />
      {/* Footer */}
      <div className="footer absolute max-w-full bottom-[22px] px-[22px] inset-x-0 flex flex-col justify-between items-center tracking-wider z-50">
        <div className="footer-receive flex justify-center w-full font-bold text-white text-xs tracking-widest select-none pointer-events-none">
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
        <div className="footer-bottom w-full mt-4 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center">
          <div className="footer-left flex w-[170px]">
            <div className="footer-left-text text-xs">
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

          <Divider className="footer-left-svg w-full h-[4px]" />

          <Subscription username={username} email={email} />

          <Divider className="footer-left-svg w-full h-[4px]" />

          <div className="footer-right-svg1 z-50 select-none w-[170px] h-[19px] bg-chartBack">
            {/* Scene for bars frequency animation */}
            <Scene2 play={play} />
          </div>
        </div>
      </div>
      <PositionMarker />
    </>
  );
}

export default Layout;
