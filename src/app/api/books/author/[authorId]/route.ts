import { NextResponse } from 'next/server';
import prisma from '@/libs/db/prismaClient';

export async function GET(request: Request, { params }: { params: { authorId: string } }) {
  const { authorId } = params;

  if (!authorId) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }
  try {
    const books = await prisma.book.findMany({
      where: {
        authorId: authorId,
      },
    });

    if (!books) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error getting book:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
