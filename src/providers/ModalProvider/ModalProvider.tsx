import { createContext, useState } from 'react';
import { ConfirmationModal } from 'src/components/ConfirmationModal';
import { ConfirmationModalParams, ModalContextParams, ModalNames, ModalProviderProps } from './types';

const initialContext: ModalContextParams = {
  openModal: '',
  confirmationModalParams: undefined,
  toggleConfirmationModal: () => {},
  closeModals: () => {},
};

export const ModalContext = createContext<ModalContextParams>(initialContext);

const ModalProvider = ({ children }: ModalProviderProps) => {
  // - HOOKS - //

  // - STATE - //
  const [openModal, setOpenModal] = useState<ModalNames>('');
  const [confirmationModalParams, setConfirmationModalParamas] = useState<ConfirmationModalParams>();

  // - EFFECTS - //

  // - ACTIONS - //
  const toggleConfirmationModal = () => {
    setOpenModal((prev) => (prev === 'confirmation' ? '' : 'confirmation'));
  };

  const closeModals = () => {
    setOpenModal('');
  };

  // - HELPERS - //

  // - JSX - //
  return (
    <ModalContext.Provider value={{ openModal, confirmationModalParams, toggleConfirmationModal, closeModals }}>
      <ConfirmationModal />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
