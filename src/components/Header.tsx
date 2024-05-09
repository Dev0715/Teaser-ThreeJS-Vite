import React from 'react';

import Scene1 from './Scene1';

type HeaderProps = {
  play: boolean;
};

export default function Header({ play }: HeaderProps) {
  return (
    <div className="header absolute max-w-full w-full top-[22px] px-[22px] flex items-center justify-between tracking-wider z-50 select-none whitespace-nowrap">
      <div className="freq-level-text text-xs opacity-[0.5]">
        FREQUENCY LEVEL
      </div>
      <div className="freq-level-svg flex-1 bg-no-repeat bg-center mx-6 h-[4px] bg-cover bg-[url('../img/Nodebarsm.svg')]"></div>
      <div className="freq-line flex items-center">
        <div className="freq-line-text text-xs">0 Hz</div>
        <div className="freq-line-svg w-[340px] h-[16px] mx-2 bg-no-repeat bg-contain bg-center bg-[url('../img/FreqlineBox.svg')]">
          {/* Scene for line frequency animation */}
          <Scene1 play={play} />
        </div>
        <div className="freq-line-text text-xs">432 Hz</div>
      </div>
      <div className="freq-monitor-svg flex-1 bg-no-repeat bg-center mx-6 h-[4px] bg-cover bg-[url('../img/Nodebarsm.svg')]"></div>
      <div className="freq-monitor-text text-xs">
        <span className="opacity-[0.5]">MONITOR</span>
        <span className="light ml-2 px-px py-px">ACTIVE</span>
      </div>
    </div>
  );
}
