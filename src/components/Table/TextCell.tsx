import { TextCellProps } from './types';

export const TextCell = ({ value }: TextCellProps) => {
  return <span className="text-sm max-w-sm whitespace-normal">{value || '-'}</span>;
};
