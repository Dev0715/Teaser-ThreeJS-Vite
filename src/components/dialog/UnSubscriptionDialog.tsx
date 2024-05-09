import axios from 'axios';
import React, { useRef, useState } from 'react';
import { DialogCancelParam } from '../Subscription';

const STEP_UNSUBSCRIBE = 'step_unsubscribe';
const STEP_OTP = 'step_otp';

const LINE1_TEXT: Record<string, string> = {
  [STEP_UNSUBSCRIBE]: 'Email already exists.',
  [STEP_OTP]: 'OTP sent to your email.',
};

const LINE2_TEXT: Record<string, string> = {
  [STEP_UNSUBSCRIBE]: 'Do you want to unsubscribe from this site?',
  [STEP_OTP]: 'Please input OTP to unsubscribe successfully.',
};

const BUTTON_TEXT: Record<string, string>[] = [
  {
    [STEP_UNSUBSCRIBE]: 'Unsubscribe',
    [STEP_OTP]: 'Confirm',
  },
  {
    [STEP_UNSUBSCRIBE]: 'Unsubscribing...',
    [STEP_OTP]: 'Confirming...',
  },
];

const NUMBER_OF_OTP_DIGIT = 6;

const UnsubscribeDialog = ({
  email,
  onCancel,
}: {
  email: string;
  onCancel: (params: DialogCancelParam) => void;
}) => {
  const [isPending, setPending] = useState<boolean>(false);
  const [step, setStep] = useState<string>(STEP_UNSUBSCRIBE);
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

  const unsubscribe = () => {
    const base_url = import.meta.env.VITE_MAILMANJS_API_URL as string;
    const url_unsubscribe = base_url + '/subscriber/unsubscribe';

    setPending(true);

    axios
      .post(url_unsubscribe, {
        ownerEmail: import.meta.env.VITE_SITE_OWNER_EMAIL as string,
        subscriberEmail: email,
      })
      .then((res) => {
        console.log(res);
        setPending(false);
        setStep(STEP_OTP);
      })
      .catch((error) => {
        console.error(error);
        onCancel({
          error: 'Internal Server Error!',
        });
      });
  };

  const confirmOtp = () => {
    const base_url = import.meta.env.VITE_MAILMANJS_API_URL as string;
    const url = base_url + '/subscriber/remove';
    const otp_str = otp.join('');

    setPending(true);

    axios
      .post(url, {
        ownerEmail: import.meta.env.VITE_SITE_OWNER_EMAIL as string,
        subscriberEmail: email,
        otp: otp_str,
      })
      .then((res) => {
        const data = res.data;
        if (data.error) {
          setErrMsg(data.error);
        } else if (data.removed) {
          onCancel({
            success: 'Unsubscribed successfully!',
          });
        }
        setPending(false);
      })
      .catch((error) => {
        console.error(error);
        onCancel({
          error: 'Internal Server Error!',
        });
      });
  };

  const onOK = () => {
    if (step === STEP_UNSUBSCRIBE) {
      unsubscribe();
    } else if (step === STEP_OTP) {
      confirmOtp();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-700/50 z-50 rounded-lg"
      role="alert"
    >
      <div className="w-[480px] flex flex-col gap-y-8 px-6 py-6 bg-white rounded-xl">
        <div className="flex flex-col gap-y-4">
          <p className="text-xl text-black font-bold">Un-subscription</p>
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

        {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}

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
            onClick={() => onCancel({})}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribeDialog;
