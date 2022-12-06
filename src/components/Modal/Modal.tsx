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
          className="fixed inset-0 bg-app-darkest/75 backdrop-blur transition-all"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            className="flex min-h-full items-start justify-center p-32 transition-all"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          >
            {/* The actual dialog panel  */}
            <Dialog.Panel className="mx-auto max-h-full rounded bg-app-light shadow">
              {!!title && (
                <Dialog.Title className="rounded-t bg-app py-4 pl-4 pr-12 text-2xl font-semibold uppercase tracking-wide text-app-altText">
                  {title}
                </Dialog.Title>
              )}
              <div className="p-4">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
