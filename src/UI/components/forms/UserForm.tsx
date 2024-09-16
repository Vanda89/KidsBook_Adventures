'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, useDisclosure } from '@nextui-org/react';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import 'react-datepicker/dist/react-datepicker.css';

import DatePickerInput from '../DatePickerInput';
import UserPasswordModale from '../modale/UserPasswordModale';

const updateUserSchema = z.object({
  name: z.string().min(1, { message: 'Un prénom est obligatoire pour la personnalisation des livres' }),
  email: z
    .string()
    .email({ message: "L'email doit être valide" })
    .min(1, { message: "L'email est obligatoire" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "L'email doit être au format exemple@domaine.fr",
    }),
  dateOfBirth: z
    .date()
    .nullable()
    .refine((val) => val !== null, {
      message: 'La date de naissance est requise',
    })
    .transform((value) => {
      if (typeof value === 'string') {
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
      }
      return value;
    })
    .refine((val) => val === null || (val instanceof Date && !isNaN(val.getTime())), {
      message: 'Date invalide',
    }),
});

type FormData = z.infer<typeof updateUserSchema>;

const UserForm = ({ user }: { user: FormData }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(updateUserSchema),
    mode: 'onChange',
    defaultValues: {
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formattedData = {
      ...data,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString().split('T')[0] : null,
    };

    try {
      const response = await fetch('/api/user/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        return <div>Vos modifications ont bien été enregistrées</div>;
      } else {
        console.error("Échec de l'inscription.");
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newPassword, setNewPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');
  const handlePasswordChange = (newPassword: string) => {
    console.log('newPassword', newPassword);
    setNewPassword(newPassword);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    setSuccessMessage('Votre mot de passe a été mis à jour avec succès !');
  };
  const labelStyle = 'font-bold mb-2 group-data-[filled-within=true]:text-content1';
  const inputStyle = 'font-600 text-base group-data-[has-value=true]:text-content1 placeholder:text-content1';
  const errorMessage = 'text-rose-500 text-xs ml-1 mt-1.5';

  return (
    <form
      id="updateUserForm"
      onSubmit={handleSubmit(onSubmit)}
      className="w-5/6 md:w-1/2 xl:w-1/3 py-12 px-12 border-2 border-secondary-200 bg-content2 rounded-xl flex flex-col gap-5 ">
      <div className="name flex flex-col gap-2">
        <Input
          autoFocus
          isRequired
          classNames={{
            label: labelStyle,
            input: inputStyle,
            errorMessage: errorMessage,
          }}
          type="text"
          label="Prénom"
          aria-label="Prénom"
          radius="md"
          variant="underlined"
          {...register('name')}
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
        />
      </div>
      <div className="email flex flex-col gap-2">
        <Input
          isRequired
          classNames={{
            label: labelStyle,
            input: inputStyle,
            errorMessage: errorMessage,
          }}
          type="email"
          label="Email"
          aria-label="Email"
          radius="md"
          variant="underlined"
          {...register('email')}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
        />
      </div>

      <div className="password flex flex-col gap-2">
        <div className="relative">
          <Input
            type="password"
            value={newPassword}
            readOnly
            classNames={{
              label: labelStyle,
              input: inputStyle,
            }}
            label="Mot de passe"
            aria-label="Mot de passe"
            placeholder="********"
            radius="md"
            variant="underlined"
          />
          <UserPasswordModale
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            email={user.email}
            onPasswordChange={handlePasswordChange}
          />
        </div>
        {successMessage && (
          <div className="text-green-700 bg-green-200 rounded-md p-1 text-xs text-center">{successMessage}</div>
        )}
      </div>

      <div className="w-full">
        <Controller
          name="dateOfBirth"
          control={control}
          rules={{ required: 'La date de naissance est requise' }}
          render={({ field: { onChange, value, onBlur } }) => (
            <DatePickerInput
              value={value ?? undefined}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.dateOfBirth?.message}
            />
          )}
        />
      </div>

      <Button
        form="updateUserForm"
        type="submit"
        variant="flat"
        size="md"
        disabled={!isValid}
        radius="md"
        className="bg-primary-500  disabled:cursor-not-allowed disabled:bg-gray-400 max-w-32 mt-12 mx-auto text-white font-bold">
        Enregistrer
      </Button>
    </form>
  );
};

export default UserForm;
