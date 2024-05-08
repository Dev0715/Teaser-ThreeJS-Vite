import axios from 'axios';
import React, { useRef, useState } from 'react';

const STEP_UNSUBCRIBE = 'step_unsubscribe';
const STEP_OTP = 'step_otp';

const LINE1_TEXT: Record<string, string> = {
  [STEP_UNSUBCRIBE]: 'Email already exists.',
  [STEP_OTP]: 'OTP sent to your email.',
};

const LINE2_TEXT: Record<string, string> = {
  [STEP_UNSUBCRIBE]: 'Do you want to unsubscribe from this site?',
  [STEP_OTP]: 'Please input OTP to unsubscribe successfully.',
};

const BUTTON_TEXT: Record<string, string>[] = [
  {
    [STEP_UNSUBCRIBE]: 'Unsubscribe',
    [STEP_OTP]: 'Confirm',
  },
  {
    [STEP_UNSUBCRIBE]: 'Unsubscribing...',
    [STEP_OTP]: 'Confirmimg...',
  },
];

const NUMBER_OF_DIGIT = 6;

const UnsubDialog = ({
  email,
  onCancel,
}: {
  email: string;
  onCancel?: () => void;
}) => {
  const [isPending, setPending] = useState<boolean>(false);
  const [step, setStep] = useState<string>(STEP_UNSUBCRIBE);

  const [otp, setOtp] = useState<string[]>(new Array(NUMBER_OF_DIGIT).fill(''));
  const optRef = useRef(new Array(NUMBER_OF_DIGIT).fill(HTMLInputElement));

  function handleChange(value: string, index: number) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < NUMBER_OF_DIGIT - 1) {
      optRef.current[index + 1].focus();
    }
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
      index < NUMBER_OF_DIGIT - 1
    ) {
      optRef.current[index + 1].focus();
    }
  }

  const unsubscribe = () => {
    const base_url = import.meta.env.VITE_MAILMANJS_API_URL as string;
    const url = base_url + '/subscriber/unsub/' + email;
  };

  const onOK = () => {
    if (step === STEP_UNSUBCRIBE) {
      unsubscribe();
    } else if (step === STEP_OTP) {
      confirmOtp();
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-700/50 z-50 rounded-lg"
      role="alert"
    >
      <div className="w-[480px] flex flex-col gap-y-8 px-6 py-6 bg-white rounded-xl">
        <div className="flex flex-col gap-y-4">
          <p className="text-xl text-black font-bold">Unsubscription</p>
          <div className="flex flex-col gap-y-0">
            <p>{LINE1_TEXT[step]}</p>
            <p>{LINE2_TEXT[step]}</p>
          </div>
        </div>
        {step === STEP_OTP && (
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
        )}
        <div className="flex gap-x-8 self-center">
          <button
            disabled={isPending}
            className="px-4 py-1 border border-gray-500 rounded-sm text-black hover:drop-shadow disabled:text-gray-500"
            onClick={onOK}
          >
            {BUTTON_TEXT[Number(isPending)][step]}
          </button>
          <button
            disabled={isPending}
            className="px-4 py-1 border border-gray-500 rounded-sm text-black hover:drop-shadow disabled:text-gray-500"
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
