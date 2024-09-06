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
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, ariaLabel, placeholder, register, error }) => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const toggleVisibility = () => setPasswordVisibility(!passwordVisibility);

  return (
    <div id="password">
      <Input
        isRequired
        classNames={{
          label: 'font-bold mb-2',
          input: 'font-600 text-base',
          errorMessage: 'text-rose-500 text-xs ml-1 mt-1.5',
        }}
        type={passwordVisibility ? 'text' : 'password'}
        label={label}
        aria-label={ariaLabel}
        placeholder={placeholder}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="Modification de la visibilité du mot de passe">
            {passwordVisibility ? (
              <FaEye className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
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
