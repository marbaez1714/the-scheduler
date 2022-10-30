import { Transition, Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

import { RowMenuCellProps } from '../types';

export const RowActionCell = <TData extends Record<string, unknown>>({
  menuActions,
  data,
}: RowMenuCellProps<TData>) => {
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Menu as="td" className="relative w-4 px-4 py-2">
      <Menu.Button className="flex items-center w-4 h-4">
        <EllipsisVerticalIcon />
      </Menu.Button>

      <Transition
        as={Menu.Items}
        className="absolute top-0 z-50 flex flex-col overflow-hidden transition-all border divide-y rounded shadow left-full bg-app-light border-app-medium divide-app-medium"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {menuActions.map((action) => (
          <Menu.Item key={action.label}>
            <button
              className="flex items-center gap-4 px-4 py-2 text-sm transition-all text-app-darkest hover:text-app-altText hover:bg-app"
              onClick={() => action.onClick(data)}
            >
              <div className="w-4 h-4">{action.icon}</div>
              {action.label}
            </button>
          </Menu.Item>
        ))}
      </Transition>
    </Menu>
  );
};
