import React from 'react';

const WarningAlert = ({
  message,
  setMessage,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const onOK = () => {
    setMessage('');
  };

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-700/50 z-50 rounded-lg"
      role="alert"
    >
      <div className="w-96 flex flex-col gap-y-4 p-6 bg-white rounded-xl">
        <p className="text-xl text-black font-bold">Warning</p>
        <p>{message}</p>
        <button
          className="w-fit flex self-center text-black border px-4 rounded-md hover:drop-shadow"
          onClick={onOK}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default WarningAlert;
