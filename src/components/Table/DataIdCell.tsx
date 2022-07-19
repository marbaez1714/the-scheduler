import { DataIdCellProps } from './types';

export const DataIdCell = ({ data }: DataIdCellProps) => {
  return (
    <div>
      <p className="text-sm">{data.id}</p>
      <p className="text-xs">{data.legacy ? 'legacy' : 'new'}</p>
    </div>
  );
};
