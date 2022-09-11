import { format } from 'date-fns';
import { useMemo } from 'react';
import { DateCellProps } from './types';

export const DateCell = ({ timestamp }: DateCellProps) => {
  const timestampDate = useMemo(() => new Date(timestamp), [timestamp]);

  return (
    <>
      <p>{format(timestampDate, 'P')}</p>
      <p className="cell-caption-text">{format(timestampDate, 'p')}</p>
    </>
  );
};
