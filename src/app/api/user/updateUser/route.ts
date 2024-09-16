import { NextResponse } from 'next/server';
import prisma from '@/libs/db/prismaClient';

export async function PUT(request: Request) {
  if (request.method !== 'PUT') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { name, email, dateOfBirth } = await request.json();

  try {
    if (!name || !email || !dateOfBirth) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { email },
      data: {
        name,
        email,
        dateOfBirth: new Date(dateOfBirth),
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
