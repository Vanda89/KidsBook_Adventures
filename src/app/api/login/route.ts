import { NextResponse } from 'next/server';
import prisma from '@/libs/db/prismaClient';
import * as bcrypt from 'bcrypt-ts';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    loginSchema.parse(body);

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user && (await bcrypt.compare(body.password, user.password))) {
      const { password, ...rest } = user;
      return NextResponse.json(rest);
    }

    return NextResponse.json(null, { status: 401 });
  } catch (error) {
    console.error('Erreur de validation ou traitement:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
