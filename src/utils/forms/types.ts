import { StoreDocument } from '../firebase/types';

export interface AddFormData {
  company: StoreDocument['Company'];
  contractor: Omit<StoreDocument['Contractor'], 'assignedJobs'>;
  reporter: StoreDocument['Reporter'];
  area: StoreDocument['Area'];
  supplier: StoreDocument['Supplier'];
  scope: StoreDocument['Scope'];
}
