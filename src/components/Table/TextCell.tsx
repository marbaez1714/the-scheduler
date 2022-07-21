import { TextCellProps } from './types';

export const TextCell = ({ text }: TextCellProps) => {
  return <span className="text-sm">{text || '-'}</span>;
};
