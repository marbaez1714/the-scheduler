import { Popover, Transition } from '@headlessui/react';
import { MoreVert } from '@mui/icons-material';
import { Icon } from '@mui/material';
import { RowMenuCellProps } from './types';

export const RowMenuCell = <TData extends Record<string, unknown>>({ menuActions, data }: RowMenuCellProps<TData>) => {
  // - HOOKS - //

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //

  // - JSX - //
  return (
    <Popover as="td" className="py-2 px-4 w-4">
      <Popover.Button className="align-middle">
        <MoreVert fontSize="inherit" />
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute top-2 flex flex-col py-2 rounded bg-slate-50 space-y-1 shadow-lg">
          {menuActions.map(({ icon, label, onClick }, key) => (
            <button
              className="transition-all flex items-center pl-2 mr-2 rounded-r-full hover:bg-slate-300 hover:shadow"
              onClick={() => onClick(data)}
              key={key}
            >
              <Icon fontSize="inherit">{icon}</Icon> <span className="pl-2 pr-8">{label}</span>
            </button>
          ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
