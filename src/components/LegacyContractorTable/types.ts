import { JobLegacy } from 'src/api';

export interface LegacyContractorTableProps {
  contractor: { name: string; id: string };
}

export interface ReassignModalProps {
  open: boolean;
  onClose: () => void;
  jobLegacy?: JobLegacy;
}
