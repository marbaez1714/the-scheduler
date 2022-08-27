import { useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MoreVert } from '@mui/icons-material';
import { Icon } from '@mui/material';

import { RowMenuCellProps } from './types';
import classNames from 'classnames';

export const RowMenuCell = <TData extends Record<string, unknown>>({ menuActions, data }: RowMenuCellProps<TData>) => {
  /******************************/
  /* Custom Hooks               */
  /******************************/

  /******************************/
  /* Refs                       */
  /******************************/

  /******************************/
  /* State                      */
  /******************************/

  /******************************/
  /* Context                    */
  /******************************/

  /******************************/
  /* Data                       */
  /******************************/

  /******************************/
  /* Memos                      */
  /******************************/

  /******************************/
  /* Effects                    */
  /******************************/

  /******************************/
  /* Callbacks                  */
  /******************************/

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Popover as="td" className="relative py-2 px-4 w-4">
      {/* Button */}
      <Popover.Button className="flex items-center">
        <MoreVert fontSize="inherit" />
      </Popover.Button>
      {/* Panel */}
      <Transition
        className="absolute top-0 left-0 h-full origin-left shadow"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-x-0 opacity-0"
        enterTo="transform scale-x-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-x-100 opacity-100"
        leaveTo="transform scale-x-0 opacity-0"
      >
        <Popover.Panel className="flex h-full rounded bg-slate-100">
          {menuActions.map(({ icon, label, onClick }, key) => (
            <button
              className="transition-all flex items-center p-4 text-white bg-slate-500 hover:bg-slate-600"
              onClick={() => onClick(data)}
              key={key}
            >
              <Icon fontSize="inherit">{icon}</Icon>
              <span className="pl-2">{label}</span>
            </button>
          ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
