import { Popover, Transition } from '@headlessui/react';
import { Close, MoreVert } from '@mui/icons-material';
import { Icon } from '@mui/material';

import { RowMenuCellProps } from '../types';

export const RowMenuCell = <TData extends Record<string, unknown>>({
  menuActions,
  data,
}: RowMenuCellProps<TData>) => {
  /******************************/
  /* Render                     */
  /******************************/
  if (!menuActions) {
    return null;
  }

  return (
    <Popover as="td" className="w-4 px-4 py-2">
      {/* Button */}

      {({ open }) => (
        <>
          <Popover.Button className="flex items-center">
            <MoreVert fontSize="inherit" />
          </Popover.Button>
          <Transition
            as={Popover.Overlay}
            show={open}
            className="absolute top-0 left-0 w-full h-full bg-slate-500/40"
            enter="transition duration-100 ease-out"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
          />
          {/* Panel */}
          <Transition
            show={open}
            className="absolute top-0 left-0 h-full origin-left shadow"
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-x-0 opacity-0"
            enterTo="transform scale-x-100 opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-x-100 opacity-100"
            leaveTo="transform scale-x-0 opacity-0"
          >
            <Popover.Panel className="flex h-full rounded">
              {({ close }) => (
                <>
                  <button
                    className="flex items-center p-4 text-white transition-all border-r bg-slate-500 hover:bg-slate-600 border-r-slate-400"
                    onClick={() => close()}
                  >
                    <Close />
                  </button>

                  {menuActions.map(({ icon, label, onClick }, key) => (
                    <button
                      className="flex items-center p-4 text-white transition-all border-r bg-slate-500 hover:bg-slate-600 border-r-slate-400 last:border-r-0"
                      onClick={() => {
                        onClick(data);
                        close();
                      }}
                      key={key}
                    >
                      <Icon fontSize="inherit">{icon}</Icon>
                      <span className="pl-2">{label}</span>
                    </button>
                  ))}
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
