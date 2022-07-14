export type ModalNames = '' | 'confirmation';

export interface ConfirmationModalParams {
  cancelAction: { title?: string; onClick?: () => void };
  confirmAction: { title?: string; onClick: () => void };
  title: string;
  content: string;
}

export interface ModalContextParams {
  openModal: ModalNames;
  confirmationModalParams?: ConfirmationModalParams;
  toggleConfirmationModal: () => void;
  closeModals: () => void;
}

export interface ModalProviderProps {
  children: React.ReactNode;
}
