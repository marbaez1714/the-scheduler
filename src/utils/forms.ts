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

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

const messages = {
  nameRequired: 'Name is required',
  nameTranslationRequired: 'Name translation (Spanish) is required',
  phoneRequired: 'Phone number is required',
  emailFormat: 'Must be valid email',
  companyRequired: 'Company is required',
};

export const AddAreaForm = {
  defaultValues: {
    name: '',
    nameSpanish: '',
    notes: '',
  },
  resolver: yupResolver(
    yup.object({
      name: yup.string().trim().required(messages.nameRequired),
      nameSpanish: yup.string().trim().required(messages.nameTranslationRequired),
      notes: yup.string().trim(),
    })
  ),
};

export const AddBuilderForm = {
  defaultValues: {
    name: '',
    primaryPhone: '',
    primaryEmail: '',
    companyId: '',
    notes: '',
  },
  resolver: yupResolver(
    yup.object({
      name: yup.string().trim().required(messages.nameRequired),
      primaryPhone: yup.string().trim().required(messages.phoneRequired),
      primaryEmail: yup.string().trim().email(messages.emailFormat),
      companyId: yup.string().trim().required(messages.companyRequired),
      notes: yup.string().trim(),
    })
  ),
};

export const AddCommunityForm = {
  defaultValues: {
    name: '',
    companyId: '',
    notes: '',
  },
  resolver: yupResolver(
    yup.object({
      name: yup.string().trim().required(messages.nameRequired),
      companyId: yup.string().trim().required(messages.companyRequired),
      notes: yup.string().trim(),
    })
  ),
};
