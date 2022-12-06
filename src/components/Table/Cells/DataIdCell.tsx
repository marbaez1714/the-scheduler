import { DataIdCellProps } from '../types';

export const DataIdCell = ({ value }: DataIdCellProps) => {
  return (
    <p className="text-xs" title={value}>
      {value}
    </p>
  );
};
