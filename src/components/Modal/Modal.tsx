import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { ModalProps } from './types';

const Modal = ({ title, open, onClose, children }: ModalProps) => {
  /******************************/
  /* Render                     */
  /******************************/
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Overlay */}
        <Transition.Child
          className="fixed inset-0 transition-all bg-app-darkest/75 backdrop-blur"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            className="flex items-start justify-center min-h-full p-32 overflow-hidden"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          >
            {/* The actual dialog panel  */}
            <Dialog.Panel className="max-h-full mx-auto overflow-hidden rounded shadow bg-app-light">
              {!!title && (
                <Dialog.Title className="py-4 pl-4 pr-12 text-2xl font-semibold tracking-wide rounded-t text-app-altText bg-app">
                  {title}
                </Dialog.Title>
              )}

              <div className="p-4 overflow-auto">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
