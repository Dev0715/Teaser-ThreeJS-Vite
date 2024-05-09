import React from 'react';

type EnterScreenProps = {
  onClick?: () => void;
};

export default function EnterScreen({ onClick }: EnterScreenProps) {
  const [show, setShow] = React.useState(true);

  const handleClick = () => {
    setShow(false);
    onClick?.();
  };

  return (
    <div
      className={`fixed inset-0 bg-black z-[9999]${show ? '' : ' hide-fade'}`}
    >
      <button
        type="button"
        className="absolute w-[100px] h-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full ring shadow-2xl shadow-blue-500/50"
        onClick={handleClick}
      >
        Click to Enter
      </button>
    </div>
  );
}
