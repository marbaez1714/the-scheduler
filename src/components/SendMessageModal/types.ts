import { JobLegacy } from 'src/api';

export interface SendMessageModalProps {
  open: boolean;
  onClose: () => void;
  jobLegacy?: JobLegacy;
}
