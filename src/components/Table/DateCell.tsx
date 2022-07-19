import { formatTimestamp } from 'src/utils/helpers';
import { DateCellProps } from './types';

export const DateCell = ({ timestamp }: DateCellProps) => {
  return (
    <div>
      <p className="text-sm">{formatTimestamp(timestamp, 'P')}</p>
      <p className="text-xs">{formatTimestamp(timestamp, 'p')}</p>
    </div>
  );
};
