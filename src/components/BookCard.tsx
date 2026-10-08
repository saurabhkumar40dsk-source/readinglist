import { BookOpen, Check, BookMarked, Trash2 } from 'lucide-react';
import { Book, STATUS_LABELS, STATUS_ORDER, type ReadingStatus } from '@/types';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

const STATUS_STYLES: Record<ReadingStatus, {
  badge: string;
  icon: typeof BookOpen;
}> = {
  want: {
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: BookMarked,
  },
  reading: {
    badge: 'bg-sky-100 text-sky-700 border-sky-200',
    icon: BookOpen,
  },
  finished: {
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: Check,
  },
};

export function BookCard({ book, onStatusChange, onRemove }: BookCardProps) {
  const style = STATUS_STYLES[book.status];
  const StatusIcon = style.icon;

  return (
    <div className="group animate-fade-in-up rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-gray-900">
              {book.title}
            </h3>
            <span
              className={`mt-1.5 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${style.badge}`}
            >
              <StatusIcon className="h-3 w-3" />
              {STATUS_LABELS[book.status]}
            </span>
          </div>
        </div>
        <button
          onClick={() => onRemove(book.id)}
          className="shrink-0 rounded-lg p-2 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
          aria-label="Remove book"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {STATUS_ORDER.map((status) => {
          const isCurrent = book.status === status;
          return (
            <button
              key={status}
              onClick={() => onStatusChange(book.id, status)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                isCurrent
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              {STATUS_LABELS[status]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
