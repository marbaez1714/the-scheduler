import { TextCellProps } from './types';

export const TextCell = ({ value }: TextCellProps) => {
  return <p title={value}>{value}</p>;
};
