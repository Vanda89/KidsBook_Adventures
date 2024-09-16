import { auth } from '@/app/api/auth/auth';
import RegisterForm from '@/UI/components/forms/RegisterForm';
import UserForm from '@/UI/components/forms/UserForm';
import React from 'react';

const fetchUser = async (userId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${baseUrl}/api/user/${userId}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const data = await response.json();
  return data;
};

const UserPage = async () => {
  const session = await auth();
  if (!session) {
    return <div>Veuillez vous connecter</div>;
  }

  const userId = session?.user?.id || 'Default Id';
  const user = await fetchUser(userId);

  return (
    <div className="userPage w-full flex justify-center">
      <UserForm user={user} />
    </div>
  );
};

export default UserPage;
