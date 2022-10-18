import { ContractorOptionFragment } from 'src/api';

export interface SettingsModalProps<TData = ContractorOptionFragment> {
  onAddAll: () => void;
  onRemoveAll: () => void;
  open: boolean;
  onClose: () => void;
  onContractorToggle: (contractor: TData) => void;
  contractors?: TData[];
  enabledContractors: TData[];
}
