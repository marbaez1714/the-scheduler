import { DataIdCellProps } from './types';

export const DataIdCell = ({ data }: DataIdCellProps) => {
  return (
    <>
      <p title={data.id}>{data.id}</p>
      <p className="cell-caption-text">{data.legacy ? 'legacy' : 'new'}</p>
    </>
  );
};
