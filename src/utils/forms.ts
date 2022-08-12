import {
  CreateAreaInput,
  CreateBuilderInput,
  CreateCommunityInput,
  CreateCompanyInput,
  CreateContractorInput,
  CreateJobLegacyInput,
  CreateReporterInput,
  CreateScopeInput,
  CreateSupplierInput,
} from './../api/index';

// Types
export interface AddFormData {
  area: CreateAreaInput;
  builder: CreateBuilderInput;
  company: CreateCompanyInput;
  community: CreateCommunityInput;
  contractor: CreateContractorInput;
  reporter: CreateReporterInput;
  supplier: CreateSupplierInput;
  scope: CreateScopeInput;
  jobLegacy: CreateJobLegacyInput;
}

// Utils
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

export const AddFormDefaultData: Partial<AddFormData> = {
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
};
