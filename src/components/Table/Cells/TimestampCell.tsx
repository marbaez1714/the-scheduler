import { format } from 'date-fns';

import { TimestampCellProps } from '../types';

export const TimestampCell = ({ data }: TimestampCellProps) => {
  /******************************/
  /* Data                       */
  /******************************/
  const createdDate = new Date(data.createdTime);
  const updatedDate = new Date(data.updatedTime);

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <>
      <p className="w-auto text-xs">{format(updatedDate, 'P - p')}</p>
      <p className="w-auto cell-caption-text">{format(createdDate, 'P - p')}</p>
    </>
  );
};
