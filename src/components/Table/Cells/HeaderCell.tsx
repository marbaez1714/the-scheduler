import { HeaderCellProps } from '../types';

export const HeaderCell = ({ title, subtitle }: HeaderCellProps) => {
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <>
      <p className="w-auto text-xs">{title}</p>
      <p className="w-auto text-xs font-normal opacity-50">{subtitle}</p>
    </>
  );
};
