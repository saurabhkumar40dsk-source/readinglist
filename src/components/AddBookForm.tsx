import { useState, useRef, useEffect } from 'react';
import { BookPlus, X } from 'lucide-react';

interface AddBookFormProps {
  onAdd: (title: string) => void;
}

export function AddBookForm({ onAdd }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle('');
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-800 hover:shadow-md active:scale-95"
      >
        <BookPlus className="h-4 w-4" />
        Add Book
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 animate-pop-in"
    >
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter book title..."
        className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => {
          setTitle('');
          setOpen(false);
        }}
        className="rounded-xl border border-gray-300 bg-white p-3 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
        aria-label="Cancel"
      >
        <X className="h-4 w-4" />
      </button>
    </form>
  );
}
