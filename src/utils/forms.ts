import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  WriteAreaInput,
  WriteBuilderInput,
  WriteCommunityInput,
  WriteCompanyInput,
  WriteContractorInput,
  CreateJobLegacyInput,
  WriteReporterInput,
  WriteScopeInput,
  WriteSupplierInput,
  LineItemLegacyInput,
} from './../api/index';
import { inputMessages } from './inputMessages';

/******************************/
/* Types                      */
/******************************/
export interface CreateInputs {
  area: WriteAreaInput;
  builder: WriteBuilderInput;
  community: WriteCommunityInput;
  company: WriteCompanyInput;
  contractor: WriteContractorInput;
  jobLegacy: CreateJobLegacyInput;
  reporter: WriteReporterInput;
  scope: WriteScopeInput;
  supplier: WriteSupplierInput;
}

interface FormObject<TInput extends keyof CreateInputs> {
  labels: { [key in keyof CreateInputs[TInput]]: string };
  defaultValues: CreateInputs[TInput];
  resolver: ReturnType<typeof yupResolver>;
}

/******************************/
/* Helpers                    */
/******************************/
const labels = {
  address: 'Address',
  community: 'Community',
  name: 'Name',
  nameSpanish: 'Name Translation (Spanish)',
  description: 'Description',
  company: 'Company',
  primaryPhone: 'Primary Phone Number',
  primaryEmail: 'Primary Email',
  primaryAddress: 'Primary Address',
  notes: 'Notes',
  startDate: 'Start Date',
  builder: 'Builder',
  contractor: 'Contractor',
  reporter: 'Reporter',
  scope: 'Scope of Work',
  area: 'Area',
  order: 'Order Information',
};

const validators = {
  addressRequired: yup.string().trim().required(inputMessages.addressRequired),
  nameRequired: yup.string().trim().required(inputMessages.nameRequired),
  nameSpanishRequired: yup
    .string()
    .trim()
    .required(inputMessages.nameTranslationRequired),
  primaryPhoneRequired: yup
    .string()
    .trim()
    .required(inputMessages.phoneRequired),
  primaryEmail: yup.string().trim().email(inputMessages.emailFormat),
  companyIdRequired: yup
    .string()
    .trim()
    .required(inputMessages.companyRequired),
  string: yup.string().trim(),
};

export const placeholderMap = {
  phone: '123-456-7890',
};

export const maskMap = {
  phone: '999-999-9999',
};

/******************************/
/* Forms                      */
/******************************/
export const WriteAreaForm: FormObject<'area'> = {
  labels: {
    name: labels.name,
    nameSpanish: labels.nameSpanish,
    notes: labels.notes,
  },
  defaultValues: {
    name: '',
    nameSpanish: '',
    notes: undefined,
  },
  resolver: yupResolver(
    yup.object({
      name: validators.nameRequired,
      nameSpanish: validators.nameSpanishRequired,
      notes: validators.string,
    })
  ),
};

export const WriteBuilderForm: FormObject<'builder'> = {
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
    primaryEmail: undefined,
    companyId: '',
    notes: undefined,
  },
  resolver: yupResolver(
    yup.object({
      name: validators.nameRequired,
      primaryPhone: validators.primaryPhoneRequired,
      primaryEmail: validators.primaryEmail,
      companyId: validators.companyIdRequired,
      notes: validators.string,
    })
  ),
};

export const WriteCommunityForm: FormObject<'community'> = {
  labels: {
    name: labels.name,
    companyId: labels.company,
    notes: labels.notes,
  },
  defaultValues: {
    name: '',
    companyId: '',
    notes: undefined,
  },
  resolver: yupResolver(
    yup.object({
      name: validators.nameRequired,
      companyId: validators.companyIdRequired,
      notes: validators.string,
    })
  ),
};

export const WriteCompanyForm: FormObject<'company'> = {
  labels: {
    name: labels.name,
    primaryPhone: labels.primaryPhone,
    primaryEmail: labels.primaryEmail,
    primaryAddress: labels.primaryAddress,
    notes: labels.notes,
  },
  defaultValues: {
    name: '',
    primaryPhone: undefined,
    primaryEmail: undefined,
    primaryAddress: undefined,
    notes: undefined,
  },
  resolver: yupResolver(
    yup.object({
      name: validators.nameRequired,
      primaryAddress: validators.string,
      primaryEmail: validators.primaryEmail,
      primaryPhone: validators.string,
      notes: validators.string,
    })
  ),
};

export const WriteContractorForm: FormObject<'contractor'> = {
  labels: {
    name: labels.name,
    primaryPhone: labels.primaryPhone,
    notes: labels.notes,
  },
  defaultValues: {
    name: '',
    primaryPhone: '',
    notes: undefined,
  },
  resolver: yupResolver(
    yup.object({
      name: validators.nameRequired,
      primaryPhone: validators.primaryPhoneRequired,
      notes: validators.string,
    })
  ),
};

export const WriteReporterForm: FormObject<'reporter'> = {
  labels: {
    name: labels.name,
    primaryPhone: labels.primaryPhone,
    primaryEmail: labels.primaryEmail,
    notes: labels.notes,
  },
  defaultValues: {
    name: '',
    primaryPhone: '',
    primaryEmail: undefined,
    notes: undefined,
  },
  resolver: yupResolver(
    yup.object({
      name: validators.nameRequired,
      primaryPhone: validators.primaryPhoneRequired,
      primaryEmail: validators.primaryEmail,
      notes: validators.string,
    })
  ),
};

export const WriteScopeForm: FormObject<'scope'> = {
  labels: {
    name: labels.name,
    nameSpanish: labels.nameSpanish,
    description: labels.description,
    notes: labels.notes,
  },
  defaultValues: {
    name: '',
    nameSpanish: '',
    description: undefined,
    notes: undefined,
  },
  resolver: yupResolver(
    yup.object({
      name: validators.nameRequired,
      nameSpanish: validators.nameSpanishRequired,
      description: validators.string,
      notes: validators.string,
    })
  ),
};

export const WriteSupplierForm: FormObject<'supplier'> = {
  labels: {
    name: labels.name,
    primaryPhone: labels.primaryPhone,
    notes: labels.notes,
  },
  defaultValues: {
    name: '',
    primaryPhone: undefined,
    notes: undefined,
  },
  resolver: yupResolver(
    yup.object({
      name: validators.nameRequired,
      primaryPhone: validators.string,
      notes: validators.string,
    })
  ),
};

export const CreateJobForm: FormObject<'jobLegacy'> = {
  labels: {
    name: labels.address,
    communityId: labels.community,
    startDate: labels.startDate,
    builderId: labels.builder,
    contractorId: labels.contractor,
    reporterId: labels.reporter,
    scopeId: labels.scope,
    areaId: labels.area,
    notes: labels.notes,
    lineItems: labels.order,
  },
  defaultValues: {
    name: '',
    communityId: undefined,
    startDate: undefined,
    builderId: undefined,
    contractorId: undefined,
    reporterId: undefined,
    scopeId: undefined,
    areaId: undefined,
    notes: undefined,
    lineItems: [] as LineItemLegacyInput[],
  },
  resolver: yupResolver(
    yup.object({
      name: validators.addressRequired,
      areaId: validators.string,
      builderId: validators.string,
      communityId: validators.string,
      contractorId: validators.string,
      notes: validators.string,
      reporterId: validators.string,
      scopeId: validators.string,
      startDate: validators.string,
    })
  ),
};

export const EditJobForm = {
  labels: {
    name: labels.address,
    communityId: labels.community,
    startDate: labels.startDate,
    builderId: labels.builder,
    contractorId: labels.contractor,
    reporterId: labels.reporter,
    scopeId: labels.scope,
    areaId: labels.area,
    notes: labels.notes,
    lineItems: labels.order,
  },
  defaultValues: {
    name: '',
    communityId: undefined,
    startDate: undefined,
    builderId: undefined,
    contractorId: undefined,
    reporterId: undefined,
    scopeId: undefined,
    areaId: undefined,
    notes: undefined,
    lineItems: [] as LineItemLegacyInput[],
  },
  resolver: yupResolver(
    yup.object({
      name: validators.addressRequired,
      areaId: validators.string,
      builderId: validators.string,
      communityId: validators.string,
      contractorId: validators.string,
      notes: validators.string,
      reporterId: validators.string,
      scopeId: validators.string,
      startDate: validators.string,
    })
  ),
};
