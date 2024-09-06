'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Book {
  id: string;
  slug: string;
  title: string;
  body: string;
  author: { name: string };
  authorId: string;
  cover: string;
  createdAt: Date;
  pages: { pageNumber: number }[];
}

const BooksList = ({ books }: { books: Book[] }) => {
  if (!books) {
    return <div>No books found</div>;
  }

  const formattedBooks = books?.map((book) => ({
    ...book,
    createdAt: book.createdAt
      ? format(new Date(book.createdAt).toISOString().split('T')[0], 'dd/MM/yyyy', { locale: fr })
      : null,
  }));

  const bookCover = '/assets/images/poster-mountain-adventure.jpg';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-28 font-nunito">
      {' '}
      {formattedBooks.map((book) => (
        <Link key={book.id} href={`/books/${book.id}`} className="flex flex-col gap-6">
          <div className="cover relative">
            <Image
              src="/assets/images/book-cover.png"
              alt="contour de la page de couverture du livre"
              width={240}
              height={240}
              style={{ width: '225px', height: '235px' }}
              priority
            />
            <Image
              src={bookCover}
              alt={`Page de couverture du livre ${book.title}`}
              width={210}
              height={225}
              style={{ width: '195px', height: '215px' }}
              priority
              className="absolute top-2.5 left-4 m-auto"
            />
          </div>
          <div className="bookHeader flex flex-col">
            <h2 className="bookTitle text-lg font-semibold">{book.title}</h2>
            <p className="bookTitle text-sm">Publié le {book.createdAt}</p>
          </div>
        </Link>
      ))}{' '}
    </div>
  );
};

export default BooksList;
