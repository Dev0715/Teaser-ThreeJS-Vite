import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { validateEmail } from '@/lib/validateEmail';
import WarningAlert from './dialog/AlertDialog';
import UnsubscribeDialog from './dialog/UnSubscriptionDialog';
import ValidationDialog, {
  STATUS_CREATED,
  STATUS_INVALIDATED,
} from './dialog/ValidationDialog';

export type DialogCancelParam = {
  error?: string;
  success?: string;
};

type SubscriptionProps = {
  username: string;
  email: string;
};

function Subscription({ username, email }: SubscriptionProps) {
  const [msgTitle, setMsgTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isPending, setPending] = useState<boolean>(false);
  const [isUnSubDlg, setUnSubDlg] = useState<boolean>(false);
  const [validationStatus, setValidationDlg] = useState<string>('');

  const checkFormData = () => {
    if (username.split(' ').length !== 2) {
      setMsgTitle('Error');
      setMessage('Username should be First name and Last name.');
      return false;
    } else if (!validateEmail(email)) {
      setMsgTitle('Error');
      setMessage('Email you input is incorrect.');
      return false;
    }
    return true;
  };

  const handleResponse = (response: AxiosResponse<any, any>) => {
    const data = response.data;
    if (data.error) {
      setMsgTitle('Error');
      setMessage(data.error);
    } else if (data.existing) {
      setUnSubDlg(true);
    } else if (data.invalidated) {
      setValidationDlg(STATUS_INVALIDATED);
    } else if (data.created) {
      setValidationDlg(STATUS_CREATED);
    }
  };

  const onSubmit = () => {
    if (!checkFormData()) {
      return;
    }

    const base_url = import.meta.env.VITE_MAILMANJS_API_URL as string;
    const url_new = base_url + '/subscriber/new';

    const data = {
      ownerEmail: import.meta.env.VITE_SITE_OWNER_EMAIL as string,
      firstName: username.split(' ')[0],
      lastName: username.split(' ')[1],
      subscriberEmail: email,
    };

    setPending(true);

    axios
      .post(url_new, { ...data })
      .then((res) => {
        handleResponse(res);
        setPending(false);
      })
      .catch(() => {
        setMsgTitle('Error');
        setMessage('Internal Server Error!');
        setPending(false);
      });
  };

  const onDialogCancel = ({ error, success }: DialogCancelParam) => {
    if (error) {
      setMsgTitle('Error');
      setMessage(error);
    } else if (success) {
      setMsgTitle('Success');
      setMessage(success);
    }
    setUnSubDlg(false);
    setValidationDlg('');
  };

  return (
    <div className="footer-center flex flex-col items-center justify-center">
      <button
        disabled={isPending}
        type="button"
        className="bg-primary w-[160px] h-[32px] py-1.6 text-[13px] font-bold uppercase leading-normal text-black hover:cursor-pointer z-50 tracking-widest"
        onClick={onSubmit}
      >
        {`SUBMIT${isPending ? 'TING...' : ''}`}
      </button>

      {message && (
        <WarningAlert
          title={msgTitle}
          message={message}
          setMessage={setMessage}
        />
      )}

      {isUnSubDlg && (
        <UnsubscribeDialog email={email} onCancel={onDialogCancel} />
      )}

      {validationStatus && (
        <ValidationDialog
          email={email}
          validationStatus={validationStatus}
          onCancel={onDialogCancel}
        />
      )}
    </div>
  );
}

export default Subscription;
