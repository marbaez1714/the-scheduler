import { format } from 'date-fns';
import { useMemo } from 'react';
import { DateCellProps } from './types';

export const DateCell = ({ timestamp }: DateCellProps) => {
  const timestampDate = useMemo(() => new Date(timestamp), [timestamp]);

  return (
    <div>
      <p className="text-sm">{format(timestampDate, 'P')}</p>
      <p className="text-xs text-slate-500">{format(timestampDate, 'p')}</p>
    </div>
  );
};
