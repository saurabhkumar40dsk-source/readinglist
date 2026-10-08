import { SlidersHorizontal } from 'lucide-react';
import { FILTER_OPTIONS, type ReadingStatus } from '@/types';

interface FilterBarProps {
  active: ReadingStatus | 'all';
  counts: Record<ReadingStatus | 'all', number>;
  onChange: (value: ReadingStatus | 'all') => void;
}

export function FilterBar({ active, counts, onChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      <div className="flex items-center gap-1.5 text-gray-400">
        <SlidersHorizontal className="h-4 w-4 shrink-0" />
      </div>
      {FILTER_OPTIONS.map((option) => {
        const isActive = active === option.value;
        const count = counts[option.value] ?? 0;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-700'
            }`}
          >
            {option.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs font-semibold tabular-nums ${
                isActive ? 'bg-teal-600/50 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
