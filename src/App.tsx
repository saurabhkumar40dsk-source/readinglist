import { useMemo, useState } from 'react';
import { Library } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { AddBookForm } from '@/components/AddBookForm';
import { FilterBar } from '@/components/FilterBar';
import { BookCard } from '@/components/BookCard';
import { EmptyState } from '@/components/EmptyState';
import { type Book, type ReadingStatus } from '@/types';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function App() {
  const [books, setBooks] = useLocalStorage<Book[]>('reading-list-books', []);
  const [filter, setFilter] = useState<ReadingStatus | 'all'>('all');

  const counts = useMemo(() => {
    const base: Record<ReadingStatus | 'all', number> = {
      all: books.length,
      want: 0,
      reading: 0,
      finished: 0,
    };
    for (const book of books) base[book.status]++;
    return base;
  }, [books]);

  const filteredBooks = useMemo(() => {
    const list = filter === 'all' ? books : books.filter((b) => b.status === filter);
    return [...list].sort((a, b) => b.createdAt - a.createdAt);
  }, [books, filter]);

  const addBook = (title: string) => {
    const book: Book = {
      id: generateId(),
      title,
      status: 'want',
      createdAt: Date.now(),
    };
    setBooks((prev) => [...prev, book]);
  };

  const changeStatus = (id: string, status: ReadingStatus) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const removeBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm">
              <Library className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Reading List</h1>
              <p className="text-sm text-gray-500">
                Track your books, one page at a time.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Add book */}
        <div className="mb-6">
          <AddBookForm onAdd={addBook} />
        </div>

        {books.length > 0 && (
          <>
            {/* Filter bar */}
            <div className="mb-6">
              <FilterBar active={filter} counts={counts} onChange={setFilter} />
            </div>

            {/* Book grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onStatusChange={changeStatus}
                    onRemove={removeBook}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 px-6 py-12 text-center">
                <p className="text-sm text-gray-500">
                  No books in this category yet.
                </p>
              </div>
            )}
          </>
        )}

        {books.length === 0 && <EmptyState />}
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-2xl px-4 pb-8 text-center sm:px-6">
        <p className="text-xs text-gray-400">
          Your reading list is saved on this device.
        </p>
      </footer>
    </div>
  );
}
