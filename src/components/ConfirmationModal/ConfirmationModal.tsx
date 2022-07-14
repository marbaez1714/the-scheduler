import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useModal } from 'src/hooks/useModal';
import { Button } from '@mui/material';

const ConfirmationModal = () => {
  // - HOOKS - //
  const { openModal, toggleConfirmationModal, closeModals } = useModal();

  // - STATE - //

  // - EFFECTS - //

  // - ACTIONS - //

  // - HELPERS - //

  // - JSX - //
  return (
    <Transition show={openModal === 'confirmation'} as={React.Fragment}>
      <Dialog onClose={closeModals}>
        {/* Backdrop */}
        <Transition.Child
          className="fixed inset-0 bg-black/30"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
        />
        {/* Panel */}
        <Transition.Child
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className="flex flex-col p-6 bg-slate-100 rounded-lg space-y-2">
            {/* Title */}
            <Dialog.Title className="text-lg font-medium">Are you sure?</Dialog.Title>
            {/* Content */}
            <Dialog.Description className="text-gray-700">
              This will permanently deactivate your account
            </Dialog.Description>
            {/* Actions */}
            <div className="flex justify-end space-x-2">
              <Button>Cancel</Button>
              <Button variant="contained">Confirm</Button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default ConfirmationModal;
