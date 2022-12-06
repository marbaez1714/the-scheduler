import { format } from 'date-fns';

import { TimestampCellProps } from '../types';

export const TimestampCell = ({ data }: TimestampCellProps) => {
  /******************************/
  /* Data                       */
  /******************************/
  const createdDate = data.createdTime
    ? format(new Date(data.createdTime), 'P - p')
    : null;
  const updatedDate = data.updatedTime
    ? format(new Date(data.updatedTime), 'P - p')
    : null;

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <>
      <p className="w-auto text-xs">U: {updatedDate}</p>
      <p className="cell-caption-text w-auto">C: {createdDate}</p>
    </>
  );
};
