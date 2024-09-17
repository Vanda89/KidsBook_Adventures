'use client';
import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input, Button } from '@nextui-org/react';
import PasswordInput from '@/UI/components/PasswordInput';
import { isValid } from 'date-fns';

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "L'email doit être valide" })
    .min(1, { message: "L'email est obligatoire" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "L'email doit être au format exemple@domaine.fr",
    }),
  password: z.string().min(8, { message: 'Le mot de passe doit avoir au moins 8 caractères' }),
});

type FormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();

        const signInResponse = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        if (signInResponse?.ok) {
          router.push('/dashboard');
        } else {
          console.error("Échec de l'authentification après la connexion.");
        }
      } else {
        console.error('Échec de la connexion.');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const labelStyle = 'font-bold mb-2 group-data-[filled-within=true]:text-content1';
  const inputStyle =
    'font-600 text-base group-data-[has-value=true]:text-content1 input:-webkit-autofill:text-white placeholder:text-sm group-data-[filled-within=true]:text-content1';
  const clearButton = 'right-2';
  const errorMessage = 'text-rose-500 text-xs ml-1 mt-1.5';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form w-5/6 md:w-1/2 xl:w-1/3 py-12 px-12 border-2  border-secondary-200 bg-content2  rounded-xl flex flex-col gap-5 ">
      <div className="email flex flex-col gap-2 ">
        <Input
          autoFocus
          isClearable
          isRequired
          classNames={{
            label: labelStyle,
            input: inputStyle,
            clearButton: clearButton,
            errorMessage: errorMessage,
          }}
          type="email"
          label="Email"
          aria-label="Email"
          placeholder="Entrez votre adresse email"
          radius="md"
          variant="underlined"
          {...register('email')}
          errorMessage={errors.email?.message}
          aria-errormessage={errors.email?.message}
          isInvalid={!!errors.email}
        />
      </div>

      <div className="password flex flex-col gap-2">
        <PasswordInput
          label="Mot de passe"
          ariaLabel="Mot de passe"
          placeholder="Entrez votre mot de passe"
          register={register('password')}
          error={errors.password?.message}
          aria-errormessage={errors.password?.message}
        />
      </div>

      <Button
        type="submit"
        variant="flat"
        size="md"
        radius="md"
        disabled={!isValid}
        className="bg-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed max-w-32 mt-12 mx-auto text-secondary-100  font-bold">
        Se connecter
      </Button>
    </form>
  );
};

export default LoginForm;
