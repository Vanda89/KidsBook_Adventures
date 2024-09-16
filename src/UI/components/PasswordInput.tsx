import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Button, useDisclosure, Input, InputProps } from '@nextui-org/react';

interface PasswordInputProps extends InputProps {
  label: string;
  ariaLabel: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  ariaErrormessage?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  ariaLabel,
  placeholder,
  register,
  error,
  ariaErrormessage,
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const toggleVisibility = () => setPasswordVisibility(!passwordVisibility);

  const labelStyle = 'font-bold mb-2 group-data-[filled-within=true]:text-content1';
  const inputStyle = 'font-600 text-base group-data-[has-value=true]:text-content1  placeholder:text-sm';
  const errorMessage = 'text-rose-500 text-xs ml-1 mt-1.5';

  return (
    <div className="password flex group flex-col gap-2">
      <Input
        isRequired
        classNames={{
          label: labelStyle,
          input: inputStyle,
          errorMessage: errorMessage,
          inputWrapper: ' border-secondary-200',
        }}
        type={passwordVisibility ? 'text' : 'password'}
        label={label}
        aria-label={ariaLabel}
        placeholder={placeholder}
        aria-errormessage={ariaErrormessage}
        endContent={
          <button
            className="focus:outline-none hover:text-white"
            type="button"
            onClick={toggleVisibility}
            aria-label="Modification de la visibilité du mot de passe">
            {passwordVisibility ? (
              <FaEye className="text-2xl text-secondary-300 group-hover:fill-content1 " />
            ) : (
              <FaEyeSlash className="text-2xl text-secondary-300 group-hover:fill-content1  " />
            )}
          </button>
        }
        radius="md"
        variant="underlined"
        {...register}
        errorMessage={error}
        isInvalid={!!error}
      />
    </div>
  );
};

export default PasswordInput;
