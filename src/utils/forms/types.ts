import { StoreDocument } from '../firebase/types';

export interface AddFormData {
  company: StoreDocument['Company'];
  reporter: StoreDocument['Reporter'];
  area: StoreDocument['Area'];
  supplier: StoreDocument['Supplier'];
}
