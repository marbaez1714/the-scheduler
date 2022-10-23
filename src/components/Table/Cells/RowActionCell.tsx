import { Popover, Transition, Menu } from '@headlessui/react';
import { XMarkIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Button } from 'src/components/Button';
import { Modal } from 'src/components/Modal';

import { RowMenuCellProps } from '../types';

export const RowActionCell = <TData extends Record<string, unknown>>({
  menuActions,
  data,
}: RowMenuCellProps<TData>) => {
  /******************************/
  /* State                      */
  /******************************/
  const [open, setOpen] = useState(false);

  /******************************/
  /* Callbacks                  */
  /******************************/
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <>
      <td className="relative w-4 px-4 py-2">
        <button className="flex items-center w-4 h-4" onClick={handleOpen}>
          <EllipsisVerticalIcon />
        </button>
      </td>
      <Modal open={open} onClose={handleClose} title="Actions">
        <div className="flex flex-col w-64 gap-2">
          {menuActions.map(({ icon, label, onClick }) => (
            <Button
              key={label}
              leftRender={icon}
              onClick={() => onClick(data)}
              variant="outline"
            >
              {label}
            </Button>
          ))}
        </div>
      </Modal>
    </>
  );
};
