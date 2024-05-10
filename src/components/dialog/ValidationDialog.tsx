import axios from 'axios';
import React, { useState } from 'react';
import { DialogCancelParam } from '../Subscription';
import OtpInput, { NUMBER_OF_OTP_DIGIT } from '../OtpInput';

export const STATUS_INVALIDATED = 'invalidated';
export const STATUS_CREATED = 'created';

const LINE1_TEXT: Record<string, string> = {
  [STATUS_INVALIDATED]: 'Your email is not validated.',
  [STATUS_CREATED]: 'Your email was created successfully.',
};

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

  const onOtpChanged = (otp: string[]) => {
    setOtp(otp);
    setErrMsg('');
  };

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

        <OtpInput otp={otp} valueChanged={onOtpChanged} />

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
