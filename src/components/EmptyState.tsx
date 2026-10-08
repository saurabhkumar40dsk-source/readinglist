import { BookOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600">
        <BookOpen className="h-8 w-8" />
      </div>
      <p className="mt-5 text-lg font-medium text-gray-700">
        Your reading list is empty. Add your first book.
      </p>
      <p className="mt-1.5 text-sm text-gray-400">
        Track what you want to read, what you're reading, and what you've finished.
      </p>
    </div>
  );
}
