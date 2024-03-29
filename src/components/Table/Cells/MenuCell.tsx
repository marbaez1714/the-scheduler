import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

import { Menu } from 'src/components/Menu';
import { MenuCellProps } from '../types';

export const MenuCell = ({ items }: MenuCellProps) => {
  return (
    <Menu
      className="flex items-center"
      anchor={<EllipsisVerticalIcon className="h-6 w-6" />}
      items={items}
      title={'Actions'}
    />
  );
};
