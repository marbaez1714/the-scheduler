import { JobLegacy } from 'src/api';

export interface ReassignModalProps {
  open: boolean;
  onClose: () => void;
  jobLegacy?: JobLegacy;
}
