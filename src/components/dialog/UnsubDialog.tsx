import axios from 'axios';
import React, { useState } from 'react';

const UnsubDialog = ({
  email,
  onCancel,
}: {
  email: string;
  onCancel: () => void;
}) => {
  const [otp, setOtp] = useState<string>('');

  const onOK = () => {
    const base_url = import.meta.env.VITE_MAILMANJS_API_URL as string;
    const url = base_url + '/subscriber/unsub/' + email;

    axios.post(url).then((res) => {
      console.log(res);
    });
  };

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-700/50 z-50 rounded-lg"
      role="alert"
    >
      <div className="w-[480px] flex flex-col gap-y-4 px-6 py-4 bg-white rounded-xl">
        <div className="flex flex-col gap-y-2">
          <p className="text-xl font-bold">Unsubscription</p>
          <p>Are you sure to unsubscribe from this site?</p>
        </div>
        <div className="flex gap-x-8 self-center">
          <button
            className="px-2 border border-gray-500 hover:drop-shadow rounded-sm"
            onClick={onOK}
          >
            Unsubscribe
          </button>
          <button
            className="px-2 border border-gray-500 hover:drop-shadow rounded-sm"
            onClick={onCancel}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsubDialog;
