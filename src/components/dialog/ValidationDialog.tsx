import axios from 'axios';
import React, { useRef, useState } from 'react';
import { DialogCancelParam } from '../Subscription';

export const STATUS_INVALIDATED = 'invalidated';
export const STATUS_CREATED = 'created';

const LINE1_TEXT: Record<string, string> = {
  [STATUS_INVALIDATED]: 'Your email is not validated.',
  [STATUS_CREATED]: 'Your email was created successfully.',
};

const NUMBER_OF_OTP_DIGIT = 6;

type ValidationProps = {
  email: string;
  validationStatus: string;
  onCancel: (params: DialogCancelParam) => void;
};

const ValidationDialog = ({
  email,
  validationStatus,
  onCancel,
}: ValidationProps) => {
  const [isPending, setPending] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');

  const [otp, setOtp] = useState<string[]>(
    new Array(NUMBER_OF_OTP_DIGIT).fill(''),
  );
  const optRef = useRef(new Array(NUMBER_OF_OTP_DIGIT).fill(HTMLInputElement));

  function handleChange(value: string, index: number) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < NUMBER_OF_OTP_DIGIT - 1) {
      optRef.current[index + 1].focus();
    }

    setErrMsg('');
  }

  function handleBackspaceAndEnter(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      optRef.current[index - 1].focus();
    }
    if (
      e.key === 'Enter' &&
      e.currentTarget.value &&
      index < NUMBER_OF_OTP_DIGIT - 1
    ) {
      optRef.current[index + 1].focus();
    }
  }

  const confirmOtp = () => {
    const base_url = import.meta.env.VITE_MAILMANJS_API_URL as string;
    const url_validate = base_url + '/subscriber/validate';
    const otp_str = otp.join('');

    setPending(true);

    axios
      .post(url_validate, {
        ownerEmail: import.meta.env.VITE_SITE_OWNER_EMAIL as string,
        subscriberEmail: email,
        otp: otp_str,
      })
      .then((res) => {
        const data = res.data;
        if (data.error) {
          setErrMsg(data.error);
        } else if (data.validated) {
          onCancel({
            success: 'Your email is validated',
          });
        }
        setPending(false);
      })
      .catch(() => {
        onCancel({
          error: 'Internal Server Error!',
        });
      });
  };

  const onOK = () => {
    confirmOtp();
  };

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-700/50 z-50 rounded-lg"
      role="alert"
    >
      <div className="w-[480px] flex flex-col gap-y-8 px-6 py-6 bg-white rounded-xl">
        <div className="flex flex-col gap-y-4">
          <p className="text-xl text-black font-bold">Validation</p>
          <div className="flex flex-col gap-y-0">
            <p>{LINE1_TEXT[validationStatus]}</p>
            <p>Please input OTP we sent to your email to validate.</p>
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              value={digit}
              maxLength={1}
              className={`border w-12 h-auto text-black p-3 rounded-md block bg-white focus:border-2 focus:outline-none appearance-none`}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
              ref={(reference) => (optRef.current[index] = reference)}
            />
          ))}
        </div>

        {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}

        <div className="flex gap-x-8 self-center">
          <button
            disabled={isPending}
            className="px-4 py-1 border border-gray-500 rounded-sm text-black hover:drop-shadow disabled:text-gray-500"
            onClick={onOK}
          >
            Validate
          </button>
          <button
            disabled={isPending}
            className="px-4 py-1 border border-gray-500 rounded-sm text-black hover:drop-shadow disabled:text-gray-500"
            onClick={() => onCancel({})}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationDialog;
