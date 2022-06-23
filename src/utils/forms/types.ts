import { StoreDocument } from '../firebase/types';

export interface AddFormData {
  company: StoreDocument['Company'];
  reporter: StoreDocument['Reporter'];
}
