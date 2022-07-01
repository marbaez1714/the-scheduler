import { StoreDocument } from '../firebase/types';

export interface AddFormData {
  builder: StoreDocument['Builder'];
  company: StoreDocument['Company'];
  community: StoreDocument['Community'];
  contractor: Omit<StoreDocument['Contractor'], 'assignedJobs'>;
  reporter: StoreDocument['Reporter'];
  area: StoreDocument['Area'];
  supplier: StoreDocument['Supplier'];
  scope: StoreDocument['Scope'];
}

export type LineItem = {
  orderNumber: string;
  supplierId: string;
};

export interface CreateJobData {
  address: string;
  builderId?: string;
  contractorId?: string;
  reporterId?: string;
  startDate: Date | null;
  communityId?: string;
  scopeId?: string;
  areaId?: string;
  lineItems?: LineItem[];
  notes?: string;
}
