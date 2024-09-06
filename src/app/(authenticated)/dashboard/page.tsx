import { auth } from '@/app/api/auth/auth';
import BooksList from '@/UI/components/BooksList';
import WelcomeMessage from '@/UI/components/WelcomeMessage';

const fetchBooks = async (authorId: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${baseUrl}/api/books/author/${authorId}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  const data = await response.json();

  return data;
};

const Dashboard = async () => {
  const session = await auth();

  if (!session) {
    return <div>Veuillez vous reconnecter</div>;
  }

  const userName = session?.user?.name || 'Default User';
  const userId = session?.user?.id || 'Default Id';
  const books = await fetchBooks(userId);

  return (
    <div className="flex flex-col items-center gap-24 lg:mx-24">
      <WelcomeMessage userName={userName} />
      <BooksList books={books} />
    </div>
  );
};

export default Dashboard;
