import { TextCellProps } from '../types';

export const TextCell = ({ value }: TextCellProps) => {
  /******************************/
  /* Render                    */
  /******************************/
  return <p title={value ?? ''}>{value}</p>;
};
