import { TextCellProps } from './types';

export const TextCell = ({ value }: TextCellProps) => {
  return (
    <span
      className="block text-sm max-w-sm overflow-hidden whitespace-nowrap text-ellipsis"
      title={value}
    >
      {value || '-'}
    </span>
  );
};
