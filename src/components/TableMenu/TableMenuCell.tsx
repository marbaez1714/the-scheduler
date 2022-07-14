import { Popover, Transition } from '@headlessui/react';
import { MoreVert } from '@mui/icons-material';
import { Icon } from '@mui/material';
import { TableMenuCellProps } from './types';

const TableMenuCell = ({ menuActions }: TableMenuCellProps) => {
  // - HOOKS - //

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //

  // - JSX - //
  return (
    <td className="w-0 py-2 px-4 first:pl-6 last:pr-6">
      <Popover>
        <Popover.Button className="flex">
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
                onClick={onClick}
                key={key}
              >
                <Icon fontSize="inherit">{icon}</Icon> <span className="pl-2 pr-8">{label}</span>
              </button>
            ))}
          </Popover.Panel>
        </Transition>
      </Popover>
    </td>
  );
};

export default TableMenuCell;
