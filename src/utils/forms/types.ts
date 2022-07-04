import { LineItem, StoreDocument } from '../cloudFunctionTypes';

export interface AddFormData {
  builder: StoreDocument['Builder'];
  company: StoreDocument['Company'];
  community: StoreDocument['Community'];
  contractor: StoreDocument['Contractor'];
  reporter: StoreDocument['Reporter'];
  area: StoreDocument['Area'];
  supplier: StoreDocument['Supplier'];
  scope: StoreDocument['Scope'];
}

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
