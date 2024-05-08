import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { validateEmail } from '@/lib/validateEmail';
import WarningAlert from './dialog/WarningAlert';
import UnsubDialog, { UnsubCancelParam } from './dialog/UnsubDialog';

type SubscriptionProps = {
  username: string;
  email: string;
};

function Subscription({ username, email }: SubscriptionProps) {
  const [errMsg, setErrMsg] = useState<string>('');
  const [isUnsub, setUnsub] = useState<boolean>(false);

  const checkFormData = () => {
    if (username.split(' ').length !== 2) {
      setErrMsg('Username should be First name and Last name.');
      return false;
    } else if (!validateEmail(email)) {
      setErrMsg('Email you input is incorrect.');
      return false;
    }
    return true;
  };

  const handleResponse = (response: AxiosResponse<any, any>) => {
    const data = response.data;
    console.log(data);
    if (data.error) {
      setErrMsg(data.error);
      return;
    } else if (data.existingSubscriber) {
      setUnsub(true);
    }
  };

  const onSubmit = () => {
    if (!checkFormData()) {
      return;
    }

    const base_url = import.meta.env.VITE_MAILMANJS_API_URL as string;
    const url = base_url + '/subscriber/new';

    const data = {
      ownerEmail: import.meta.env.VITE_SITE_OWNER_EMAIL as string,
      firstName: username.split(' ')[0],
      lastName: username.split(' ')[1],
      subscriberEmail: email,
    };

    axios
      .post(url, { ...data })
      .then((res) => {
        handleResponse(res);
      })
      .catch((error) => {
        console.error(error);
        setErrMsg('Internal Server Error!');
      });
  };

  const onUnsubCancel = ({ error }: UnsubCancelParam) => {
    if (error) {
      setUnsub(false);
      setErrMsg(error);
    }
  };

  return (
    <div className="footer-center flex flex-col items-center justify-center w-[150px]">
      <button
        type="button"
        className="bg-primary w-[160px] h-[32px] py-1.6 text-[13px] font-bold uppercase leading-normal text-black hover:cursor-pointer z-50 tracking-widest"
        onClick={onSubmit}
      >
        SUBMIT
      </button>

      {errMsg && <WarningAlert message={errMsg} setMessage={setErrMsg} />}

      {isUnsub && <UnsubDialog email={email} onCancel={onUnsubCancel} />}
    </div>
  );
}

export default Subscription;
