import { NextResponse } from 'next/server';
import prisma from '@/libs/db/prismaClient';
import * as bcrypt from 'bcrypt-ts';

export async function PATCH(request: Request) {
  if (request.method !== 'PATCH') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { password, email } = await request.json();

  try {
    if (!password) {
      return NextResponse.json({ message: 'The password is required' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'User updated successfully', user }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Error updating user', error: (error as Error).message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
