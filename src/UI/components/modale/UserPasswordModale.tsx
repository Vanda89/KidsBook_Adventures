import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import PasswordInput from '@/UI/components/PasswordInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

const passwordShema = z
  .object({
    newPassword: z
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
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Les mots de passe ne correspondent pas',
  });

type FormPassword = z.infer<typeof passwordShema>;

const UserPasswordModale = ({
  isOpen,
  onOpen,
  onOpenChange,
  email,
  onPasswordChange,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  email: string;
  onPasswordChange: (newPassword: string) => void;
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormPassword>({
    resolver: zodResolver(passwordShema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<FormPassword> = async (data) => {
    try {
      const response = await fetch('/api/user/updatePassword', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: data.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      onPasswordChange(data.newPassword);
      reset();
      onOpenChange(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="absolute top-5 right-1 ">
      <Button
        size="sm"
        radius="full"
        variant="bordered"
        onPress={onOpen}
        className="focus:outline-none text-xs border-primary-500 h-6 text-content1"
        type="button"
        aria-label="Modification du mot de passe">
        Modifier
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        className="p-4 border-2 border-secondary-200 bg-content2  ">
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)} id="updatePassword">
            <ModalHeader className="justify-center font-jua ">Modification du mot de passe</ModalHeader>
            <ModalBody className="font-nunito">
              <div className="password flex flex-col gap-2">
                <PasswordInput
                  label="Nouveau mot de passe"
                  ariaLabel="Nouveau mot de passe"
                  placeholder="Entrez votre nouveau mot de passe"
                  register={register('newPassword')}
                  error={errors.newPassword?.message}
                />
                <PasswordInput
                  label="Confirmation du mot de passe"
                  ariaLabel="Confirmation du mot de passe"
                  placeholder="Confirmez votre nouveau mot de passe"
                  register={register('confirmPassword')}
                  error={errors.confirmPassword?.message}
                />
              </div>
            </ModalBody>
            <ModalFooter className="pt-12 flex gap-4 font-nunito">
              <Button
                type="button"
                form="updatePassword"
                className="text-content1 border-secondary-300 font-bold"
                variant="bordered"
                onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button
                type="button"
                form="updatePassword"
                variant="solid"
                onClick={() => handleSubmit(onSubmit)()}
                disabled={isSubmitting}
                className="bg-primary-400 text-secondary-100 font-bold">
                {isSubmitting ? 'Enregistrement...' : 'Confirmer'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserPasswordModale;
