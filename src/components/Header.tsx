import React from 'react';

import Scene1 from './Scene1';
import Divider from './Divider';

const FrequencyBox = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    height="16"
    viewBox="0 0 422 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMid"
    {...props}
  >
    <path
      opacity="0.2"
      d="M420.9 1.16003H0.589966V14.65H420.9V1.16003Z"
      stroke="white"
      strokeMiterlimit="10"
    />
    <path d="M14.1 0.850098H0.589966V14.3601H14.1V0.850098Z" fill="#6EF5FA" />
    <path d="M420.41 1.51001H406.9V15.02H420.41V1.51001Z" fill="#6EF5FA" />
  </svg>
);

type HeaderProps = {
  play: boolean;
};

export default function Header({ play }: HeaderProps) {
  return (
    <div className="header absolute max-w-full w-full top-[22px] px-[22px] flex items-center justify-between tracking-wider z-50 select-none whitespace-nowrap">
      <div className="freq-level-text text-xs opacity-[0.5]">
        FREQUENCY LEVEL
      </div>
      <Divider className="freq-level-svg mx-2 xl:mx-6 flex-1" />
      <div className="freq-line flex items-center">
        <div className="freq-line-text text-xs">0 Hz</div>
        <div className="freq-line-svg relative w-[370px] h-[16px] mx-2">
          <FrequencyBox width={370} className="absolute inset-0" />
          {/* Scene for line frequency animation */}
          <Scene1 play={play} />
        </div>
        <div className="freq-line-text text-xs">432 Hz</div>
      </div>
      <Divider className="freq-monitor-svg mx-2 xl:mx-6 flex-1" />
      <div className="freq-monitor-text text-xs">
        <span className="opacity-[0.5]">MONITOR</span>
        <span className="light ml-2 px-px py-px">ACTIVE</span>
      </div>
    </div>
  );
}
