import { NextResponse } from 'next/server';
import prisma from '@/libs/db/prismaClient';
import * as bcrypt from 'bcrypt-ts';
import { sign } from 'jsonwebtoken';

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { name, email, password, dateOfBirth } = await request.json();

  try {
    if (!name || !email || !password || !dateOfBirth) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        dateOfBirth: new Date(dateOfBirth),
      },
    });

    const token = sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    return NextResponse.json({ message: 'User created successfully', user, token }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Error creating user', error: (error as Error).message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
