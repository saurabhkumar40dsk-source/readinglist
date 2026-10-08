export type ReadingStatus = 'want' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  createdAt: number;
}

export const STATUS_LABELS: Record<ReadingStatus, string> = {
  want: 'Want to Read',
  reading: 'Reading',
  finished: 'Finished',
};

export const STATUS_ORDER: ReadingStatus[] = ['want', 'reading', 'finished'];

export const FILTER_OPTIONS: { value: ReadingStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'want', label: 'Want to Read' },
  { value: 'reading', label: 'Reading' },
  { value: 'finished', label: 'Finished' },
];
