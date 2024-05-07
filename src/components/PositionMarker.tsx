import { useMouse, useWindowSize } from '@uidotdev/usehooks';
import React, { useMemo } from 'react';

function PositionMarker() {
  const [position] = useMouse();
  const { width, height } = useWindowSize();

  const [posX, posY] = useMemo(
    () => [position.x - (width || 0) / 2, (height || 0) / 2 - position.y],
    [position, width, height],
  );

  return (
    <>
      {/* Left */}
      <div className="left-node absolute flex flex-row left-10 top-[48%] z-50">
        <div className="left-node-svg w-[87px] h-[65px] bg-no-repeat bg-center pt-5 mr-5 bg-[url('../img/LeftNode.png')]"></div>
        <div className="left-node-text">{posX}</div>
      </div>

      {/* Right */}
      <div className="right-node absolute flex flex-row right-10 top-[48%] z-50">
        <div className="right-node-text">{posY}</div>
        <div className="right-node-svg w-[93px] h-[65px] bg-no-repeat bg-center pt-5 mr-5 bg-[url('../img/RightNode.png')]"></div>
      </div>
    </>
  );
}

export default PositionMarker;