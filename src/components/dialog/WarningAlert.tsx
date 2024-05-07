import React from 'react';

const WarningAlert = ({ message }: { message: string }) => {
  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-700/50 z-50 rounded-lg"
      role="alert"
    >
      <div className="w-96 flex flex-col bg-white">
        <p className="font-bold">Warning</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default WarningAlert;
