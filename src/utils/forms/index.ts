import { AddFormData, CreateJobData } from './types';

export const formatString = (value?: string) => {
  return value?.trim() || '';
};

export const formRules = {
  requiredNonEmptyString: {
    required: true,
    pattern: new RegExp('^(?!\\s*$).+'),
  },
  nonEmptyString: {
    pattern: new RegExp('^(?!\\s*$).+'),
  },
};

export const AddFormDefaultData: AddFormData = {
  builder: {
    name: '',
    primaryPhone: '',
    primaryEmail: '',
    companyId: '',
    notes: '',
  },
  company: {
    name: '',
    primaryAddress: '',
    primaryEmail: '',
    primaryPhone: '',
    notes: '',
  },
  community: {
    name: '',
    companyId: '',
    notes: '',
  },
  reporter: {
    name: '',
    primaryPhone: '',
    primaryEmail: '',
    notes: '',
  },
  area: {
    name: '',
    nameSpanish: '',
    notes: '',
  },
  supplier: {
    name: '',
    phoneNumber: '',
    notes: '',
  },
  scope: {
    name: '',
    nameSpanish: '',
    description: '',
    notes: '',
  },
  contractor: {
    name: '',
    primaryPhone: '',
    notes: '',
  },
};

export const CreateJobDefaultData: CreateJobData = {
  address: '',
  builderId: '',
  contractorId: '',
  reporterId: '',
  startDate: null,
  communityId: '',
  scopeId: '',
  areaId: '',
  notes: '',
};
