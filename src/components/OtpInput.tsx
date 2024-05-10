import React, { useRef } from 'react';

export const NUMBER_OF_OTP_DIGIT = 6;

type OtpInputProps = {
  otp: string[];
  valueChanged: (otp: string[]) => void;
};

const OtpInput = ({ otp, valueChanged }: OtpInputProps) => {
  const optRef = useRef(new Array(NUMBER_OF_OTP_DIGIT).fill(HTMLInputElement));

  function handleChange(value: string, index: number) {
    let newArr = [...otp];
    newArr[index] = value;
    valueChanged(newArr);

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

  return (
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
  );
};

export default OtpInput;
