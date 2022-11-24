import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

import { Menu } from 'src/components/Menu';

import { RowMenuCellProps } from '../types';

export const RowActionCell = <TData extends Record<string, unknown>>({
  menuActions,
  data,
}: RowMenuCellProps<TData>) => {
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <td className="w-4 px-4 py-2">
      <Menu
        className='flex items-center'
        anchor={<EllipsisVerticalIcon className="w-6 h-6" />}
        items={menuActions.map((action) => ({
          ...action,
          onClick: () => action.onClick(data),
        }))}
        title={'Actions'}
      />
    </td>
  );
};
