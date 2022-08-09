import { AddFormData } from './formTypes';

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
  area: {
    name: '',
    nameSpanish: '',
    notes: '',
  },
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

  supplier: {
    name: '',
    primaryPhone: '',
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
  jobLegacy: {
    name: '',
    areaId: '',
    builderId: '',
    communityId: '',
    contractorId: '',
    reporterId: '',
    scopeId: '',
    startDate: null,
    notes: '',
  },
};
