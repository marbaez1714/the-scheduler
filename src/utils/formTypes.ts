import { CreateAreaInput } from './../api/index';
import { StoreDocument } from './cloudFunctionTypes';

export interface AddFormData {
  area: CreateAreaInput;
  builder: StoreDocument['Builder'];
  company: StoreDocument['Company'];
  community: StoreDocument['Community'];
  contractor: StoreDocument['Contractor'];
  reporter: StoreDocument['Reporter'];
  supplier: StoreDocument['Supplier'];
  scope: StoreDocument['Scope'];
  jobLegacy: {
    name: string;
    areaId: string;
    builderId: string;
    communityId: string;
    contractorId: string;
    reporterId: string;
    scopeId: string;
    startDate: Date | null;
    notes: string;
  };
}
