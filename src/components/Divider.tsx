import React from 'react';

export default function Divider(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
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
          strokeMiterlimit="10"
        />
      </g>
    </svg>
  );
}
