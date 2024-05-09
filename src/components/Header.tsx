import React from 'react';

import Scene1 from './Scene1';

const Divider = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="470"
      height="6"
      viewBox="0 0 470 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.5" preserveAspectRatio="xMinYMid">
        <path
          d="M3.26999 5.1901C4.60652 5.1901 5.68997 4.10663 5.68997 2.7701C5.68997 1.43357 4.60652 0.350098 3.26999 0.350098C1.93346 0.350098 0.849976 1.43357 0.849976 2.7701C0.849976 4.10663 1.93346 5.1901 3.26999 5.1901Z"
          fill="white"
        />
        <path
          d="M466.62 5.1901C467.956 5.1901 469.04 4.10663 469.04 2.7701C469.04 1.43357 467.956 0.350098 466.62 0.350098C465.283 0.350098 464.2 1.43357 464.2 2.7701C464.2 4.10663 465.283 5.1901 466.62 5.1901Z"
          fill="white"
        />
        <path
          d="M3.5 2.77008H465.74"
          stroke="white"
          stroke-width="0.3"
          stroke-miterlimit="10"
        />
      </g>
    </svg>
  );
};

const FrequencyBox = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="422"
    height="16"
    viewBox="0 0 422 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMid"
  >
    <path
      opacity="0.2"
      d="M420.9 1.16003H0.589966V14.65H420.9V1.16003Z"
      stroke="white"
      stroke-miterlimit="10"
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
        <div className="freq-line-svg w-[380px] h-[16px] mx-2 bg-no-repeat bg-cover bg-center bg-[url('../img/FreqlineBox.svg')]">
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
