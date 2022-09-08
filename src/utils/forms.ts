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
export interface CreateInputs {
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
export const formRules = {
  requiredNonEmptyString: {
    required: true,
    pattern: new RegExp('^(?!\\s*$).+'),
  },
  nonEmptyString: {
    pattern: new RegExp('^(?!\\s*$).+'),
  },
};

export const AddFormDefaultData: Partial<CreateInputs> = {
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

interface FormObject<TInput extends keyof CreateInputs> {
  labels: { [key in keyof CreateInputs[TInput]]: string };
  defaultValues: CreateInputs[TInput];
  resolver: ReturnType<typeof yupResolver>;
}

const messages = {
  nameRequired: 'Name is required',
  nameTranslationRequired: 'Name Translation (Spanish) is required',
  phoneRequired: 'Phone Number is required',
  emailFormat: 'Must be valid email',
  companyRequired: 'Company is required',
};

const labels = {
  name: 'Name',
  nameSpanish: 'Name Translation (Spanish)',
  description: 'Description',
  company: 'Company',
  primaryPhone: 'Primary Phone Number',
  primaryEmail: 'Primary Email',
  primaryAddress: 'Primary Address',
  notes: 'Notes',
};

export const AddAreaForm: FormObject<'area'> = {
  labels: {
    name: labels.name,
    nameSpanish: labels.nameSpanish,
    notes: labels.notes,
  },
  defaultValues: {
    name: '',
    nameSpanish: '',
    notes: '',
  },
  resolver: yupResolver(
    yup.object({
      name: yup.string().trim().required(messages.nameRequired),
      nameSpanish: yup
        .string()
        .trim()
        .required(messages.nameTranslationRequired),
      notes: yup.string().trim(),
    })
  ),
};

export const AddBuilderForm: FormObject<'builder'> = {
  labels: {
    name: labels.name,
    companyId: labels.company,
    primaryPhone: labels.primaryPhone,
    primaryEmail: labels.primaryEmail,
    notes: labels.notes,
  },
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

export const AddCommunityForm: FormObject<'community'> = {
  labels: {
    name: labels.name,
    companyId: labels.company,
    notes: labels.notes,
  },
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

export const AddCompanyForm: FormObject<'company'> = {
  labels: {
    name: labels.name,
    primaryPhone: labels.primaryPhone,
    primaryEmail: labels.primaryEmail,
    primaryAddress: labels.primaryAddress,
    notes: labels.notes,
  },
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

export const AddContractorForm: FormObject<'contractor'> = {
  labels: {
    name: labels.name,
    primaryPhone: labels.primaryPhone,
    notes: labels.notes,
  },
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

export const AddReporterForm: FormObject<'reporter'> = {
  labels: {
    name: labels.name,
    primaryPhone: labels.primaryPhone,
    primaryEmail: labels.primaryEmail,
    notes: labels.notes,
  },
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

export const AddScopeForm: FormObject<'scope'> = {
  labels: {
    name: labels.name,
    nameSpanish: labels.nameSpanish,
    description: labels.description,
    notes: labels.notes,
  },
  defaultValues: {
    name: '',
    nameSpanish: '',
    description: '',
    notes: '',
  },
  resolver: yupResolver(
    yup.object({
      name: yup.string().trim().required(messages.nameRequired),
      nameSpanish: yup
        .string()
        .trim()
        .required(messages.nameTranslationRequired),
      description: yup.string().trim(),
      notes: yup.string().trim(),
    })
  ),
};

export const AddSupplierForm: FormObject<'supplier'> = {
  labels: {
    name: labels.name,
    primaryPhone: labels.primaryPhone,
    notes: labels.notes,
  },
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
