'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input, Button } from '@nextui-org/react';

import 'react-datepicker/dist/react-datepicker.css';
import PasswordInput from '../PasswordInput';
import DatePickerInput from '../DatePickerInput';
import { isValid } from 'date-fns';

const registerSchema = z
  .object({
    name: z.string().min(1, { message: 'Un prénom est obligatoire pour la personnalisation des livres' }),
    email: z
      .string()
      .email({ message: "L'email doit être valide" })
      .min(1, { message: "L'email est obligatoire" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "L'email doit être au format exemple@domaine.fr",
      }),
    password: z
      .string()
      .min(8, { message: 'Le mot de passe doit avoir au moins 8 caractères' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}:;,.<>?~`_+\-|=])[A-Za-z\d!@#$%^&*()[\]{}:;,.<>?~`_+\-|=]{8,}$/,
        {
          message:
            'Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial',
        },
      ),
    confirmPassword: z
      .string()
      .min(8, { message: 'Le mot de passe doit avoir au moins 8 caractères' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}:;,.<>?~`_+\-|=])[A-Za-z\d!@#$%^&*()[\]{}:;,.<>?~`_+\-|=]{8,}$/,
        {
          message:
            'Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial',
        },
      ),
    dateOfBirth: z
      .date({
        required_error: 'La date de naissance est requise',
        invalid_type_error: 'Date invalide',
      })
      .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
        message: 'La date de naissance est invalide',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Les mots de passe ne correspondent pas',
  });
type FormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: undefined,
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formattedData = {
      ...data,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : null,
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error("Échec de l'inscription.");
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const errorStyle = `text-red-600 text-xs ml-1`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-5/6 md:w-1/2 xl:w-1/3 py-12 px-12 border-2 rounded-xl flex flex-col gap-5 ">
      <div className="name flex flex-col gap-2">
        <Input
          autoFocus
          isClearable
          isRequired
          classNames={{
            label: 'font-bold mb-2',
            input: 'font-600 text-base',
            errorMessage: 'text-rose-500 text-xs ml-1',
          }}
          type="text"
          label="Prénom"
          aria-label="Prénom"
          placeholder="Entrez le prénom de l'enfant"
          radius="md"
          variant="underlined"
          {...register('name')}
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
        />
      </div>
      <div className="email flex flex-col gap-2">
        <Input
          isClearable
          isRequired
          classNames={{
            label: 'font-bold mb-2',
            input: 'font-600 text-base ',
            clearButton: 'right-2',
            errorMessage: 'text-rose-500 text-xs ml-1',
          }}
          type="email"
          label="Email"
          aria-label="Email"
          placeholder="Entrez votre adresse email"
          radius="md"
          variant="underlined"
          {...register('email')}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
        />
      </div>

      <div className="password flex flex-col gap-2">
        <PasswordInput
          label="Mot de passe"
          ariaLabel="Mot de passe"
          placeholder="Entrez un mot de passe"
          register={register('password')}
          error={errors.password?.message}
        />
      </div>

      <div className="confirmPassword flex flex-col gap-2  ">
        <PasswordInput
          label="Confirmation du mot de passe"
          ariaLabel="Confirmation du mot de passe"
          placeholder="Confirmez votre mot de passe"
          register={register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>

      <div className="w-full">
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <DatePickerInput value={value} onChange={onChange} onBlur={onBlur} error={errors.dateOfBirth?.message} />
          )}
        />
      </div>

      <Button
        type="submit"
        variant="flat"
        size="md"
        radius="md"
        disabled={!isValid}
        className={`disabled:cursor-not-allowed disabled:bg-gray-400 max-w-32 mt-12 mx-auto text-white bg-teal-500 font-bold`}>
        S'enregistrer
      </Button>
    </form>
  );
};

export default RegisterForm;
