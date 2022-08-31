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
  community: CreateCommunityInput;
  company: CreateCompanyInput;
  contractor: CreateContractorInput;
  jobLegacy: CreateJobLegacyInput;
  reporter: CreateReporterInput;
  scope: CreateScopeInput;
  supplier: CreateSupplierInput;
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
  nameTranslationRequired: 'Name Translation (Spanish) is required',
  phoneRequired: 'Phone Number is required',
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

export const AddCompanyForm = {
  defaultValues: {
    name: '',
    primaryPhone: '',
    primaryEmail: '',
    primaryAddress: '',
    notes: '',
  },
  resolver: yupResolver(
    yup.object({
      name: yup.string().trim().required(messages.nameRequired),
      primaryAddress: yup.string().trim(),
      primaryEmail: yup.string().trim(),
      primaryPhone: yup.string().trim(),
      notes: yup.string().trim(),
    })
  ),
};

export const AddContractorForm = {
  defaultValues: {
    name: '',
    primaryPhone: '',
    notes: '',
  },
  resolver: yupResolver(
    yup.object({
      name: yup.string().trim().required(messages.nameRequired),
      primaryPhone: yup.string().trim().required(messages.phoneRequired),
      notes: yup.string().trim(),
    })
  ),
};

export const AddReporterForm = {
  defaultValues: {
    name: '',
    primaryPhone: '',
    primaryEmail: '',
    notes: '',
  },
  resolver: yupResolver(
    yup.object({
      name: yup.string().trim().required(messages.nameRequired),
      primaryPhone: yup.string().trim().required(messages.phoneRequired),
      primaryEmail: yup.string().trim(),
      notes: yup.string().trim(),
    })
  ),
};

export const AddScopeForm = {
  defaultValues: {
    name: '',
    nameSpanish: '',
    description: '',
    notes: '',
  },
  resolver: yupResolver(
    yup.object({
      name: yup.string().trim().required(messages.nameRequired),
      nameSpanish: yup.string().trim().required(messages.nameTranslationRequired),
      description: yup.string().trim(),
      notes: yup.string().trim(),
    })
  ),
};

export const AddSupplierForm = {
  defaultValues: {
    name: '',
    primaryPhone: '',
    notes: '',
  },
  resolver: yupResolver(
    yup.object({
      name: yup.string().trim().required(messages.nameRequired),
      primaryPhone: yup.string().trim(),
      notes: yup.string().trim(),
    })
  ),
};
