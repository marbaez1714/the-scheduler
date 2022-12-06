import { format } from 'date-fns';

import { TimestampCellProps } from '../types';

export const TimestampCell = ({ value }: TimestampCellProps) => {
  /******************************/
  /* Data                       */
  /******************************/
  const timestamp = value ? format(new Date(value), 'P - p') : null;

  /******************************/
  /* Render                     */
  /******************************/
  return <p className="w-auto text-xs">{timestamp}</p>;
};
